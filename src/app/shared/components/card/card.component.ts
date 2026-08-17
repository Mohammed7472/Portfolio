import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  styles: [`
    .card-surface.radius-md { border-radius: 16px; }
    .card-surface.radius-lg { border-radius: 20px; }
    .card-surface.radius-xl { border-radius: 24px; }
  `],
  template: `
    <div
      class="card-surface group relative flex h-full flex-col overflow-hidden border border-border bg-bg-elevated transition-all duration-300 ease-out hover:-translate-y-1 hover:border-border-glow hover:shadow-[0_0_40px_var(--color-primary-glow)]"
      [class]="paddingClass"
      [class.radius-md]="radius === 'md'"
      [class.radius-lg]="radius === 'lg'"
      [class.radius-xl]="radius === 'xl'"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {
  @Input() padding: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() radius: 'md' | 'lg' | 'xl' = 'md';

  get paddingClass(): string {
    const classes = {
      sm: 'p-4',
      md: 'p-7',
      lg: 'p-8',
      xl: 'px-12 py-14',
    };

    return classes[this.padding];
  }
}
