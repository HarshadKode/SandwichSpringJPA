import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StatusService {
  readonly message = signal<{ text: string; ok: boolean } | null>(null);
  private timer?: ReturnType<typeof setTimeout>;

  ok(text: string): void {
    this.message.set({ text, ok: true });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.clear(), 4000);
  }

  error(error: unknown): void {
    clearTimeout(this.timer);
    this.message.set({ text: error instanceof Error ? error.message : String(error), ok: false });
  }

  clear(): void {
    this.message.set(null);
  }
}
