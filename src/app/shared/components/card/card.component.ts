import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div 
      class="group relative h-full flex flex-col overflow-hidden rounded-xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
      [class]="theme === 'light' 
        ? 'border border-slate-200 bg-white shadow-md shadow-slate-100/50 hover:shadow-slate-200/80 hover:border-primary/40' 
        : 'border border-border bg-surface-card shadow-sm backdrop-blur-md hover:shadow-primary/20 hover:border-primary/50'"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {
  @Input() theme: 'light' | 'dark' = 'dark';
}
