import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../api.service';
import { categoryEmoji } from '../emoji';
import { Sandwich } from '../models';
import { StatusService } from '../status.service';

@Component({
  selector: 'app-menu',
  imports: [FormsModule, CurrencyPipe, RouterLink],
  templateUrl: './menu.html',
})
export class Menu implements OnInit {
  private readonly api = inject(ApiService);
  private readonly status = inject(StatusService);

  protected readonly sandwiches = signal<Sandwich[]>([]);
  protected readonly categories = signal<string[]>([]);
  protected readonly loading = signal(true);
  protected readonly empty = computed(() => !this.loading() && this.sandwiches().length === 0);
  protected category = '';
  protected name = '';
  protected readonly emoji = categoryEmoji;
  private searchTimer?: ReturnType<typeof setTimeout>;

  async ngOnInit(): Promise<void> {
    await this.load(true);
  }

  protected pick(category: string): void {
    this.category = category;
    void this.load();
  }

  protected search(): void {
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => this.load(), 250);
  }

  protected async load(refreshCategories = false): Promise<void> {
    this.loading.set(true);
    try {
      const list = await firstValueFrom(this.api.findSandwiches(this.category, this.name.trim()));
      this.sandwiches.set(list);
      if (refreshCategories || this.categories().length === 0) {
        this.categories.set([...new Set(list.map((s) => s.category).filter(Boolean))].sort());
      }
      this.status.clear();
    } catch (e) {
      this.sandwiches.set([]);
      this.status.error(e);
    } finally {
      this.loading.set(false);
    }
  }

}
