import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../api.service';
import { categoryEmoji } from '../emoji';
import { BreadType, Sandwich, SandwichOrderDetail } from '../models';
import { StatusService } from '../status.service';

@Component({
  selector: 'app-order',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './order.html',
})
export class Order implements OnInit {
  private readonly api = inject(ApiService);
  private readonly status = inject(StatusService);
  private readonly route = inject(ActivatedRoute);

  protected readonly sandwiches = signal<Sandwich[]>([]);
  protected readonly placed = signal<SandwichOrderDetail[]>([]);
  protected readonly sending = signal(false);
  protected readonly emoji = categoryEmoji;

  protected firstName = '';
  protected lastName = '';
  protected course = '';
  protected sandwichId: number | null = null;
  protected amount = 1;
  protected breadType: BreadType = 'WHITE';
  protected vegetables = true;
  protected comment = '';

  async ngOnInit(): Promise<void> {
    try {
      const list = await firstValueFrom(this.api.findSandwiches());
      this.sandwiches.set(list);
      const wanted = Number(this.route.snapshot.queryParamMap.get('sandwich'));
      this.sandwichId = list.find((s) => s.id === wanted)?.id ?? list[0]?.id ?? null;
    } catch (e) {
      this.status.error(e);
    }
  }

  protected selected(): Sandwich | undefined {
    return this.sandwiches().find((s) => s.id === Number(this.sandwichId));
  }

  protected async submit(): Promise<void> {
    const sandwich = this.selected();
    if (!sandwich) return;
    const detail: SandwichOrderDetail = {
      sandwich,
      amount: Number(this.amount),
      breadType: this.breadType,
      vegetables: this.vegetables,
      comment: this.comment.trim(),
      person: { firstName: this.firstName.trim(), lastName: this.lastName.trim() },
      sandwichOrder: {
        orderDate: new Date().toLocaleDateString('sv-SE'), // yyyy-MM-dd
        course: { title: this.course.trim() },
      },
    };
    this.sending.set(true);
    try {
      await firstValueFrom(this.api.addOrderDetail(detail));
      this.placed.update((p) => [detail, ...p]);
      this.status.ok('Order placed. Enjoy! 🥪');
      this.comment = '';
    } catch (e) {
      this.status.error(e);
    } finally {
      this.sending.set(false);
    }
  }
}
