import { Attribute, Component, Input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgTemplateOutlet, NgIcon],
  template: `
    @if (href) {
      <a
        [href]="href"
        [class]="classes"
        [attr.aria-label]="ariaLabel"
        [attr.target]="target"
        [attr.rel]="rel"
      >
        <ng-container *ngTemplateOutlet="buttonContent"></ng-container>
      </a>
    } @else {
      <button
        [type]="type"
        [class]="classes"
        [disabled]="disabled"
        [attr.aria-label]="ariaLabel"
      >
        <ng-container *ngTemplateOutlet="buttonContent"></ng-container>
      </button>
    }

    <ng-template #buttonContent>
      @if (icon && iconPosition === 'left') {
        <ng-icon [name]="icon" class="mr-2" size="18" />
      }
      <ng-content></ng-content>
      @if (icon && iconPosition === 'right') {
        <ng-icon [name]="icon" class="ml-2" size="18" />
      }
    </ng-template>
  `,
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'outline' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() href?: string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'right';
  @Input() disabled = false;
  @Input() ariaLabel?: string;
  @Input() target?: string;
  @Input() rel?: string;

  constructor(@Attribute('class') private readonly hostClass = '') {}

  get classes(): string {
    const base = 'inline-flex items-center justify-center rounded-[10px] font-semibold transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-border-glow disabled:pointer-events-none disabled:opacity-50';

    const sizes = {
      sm: 'px-4 py-2 text-[13px]',
      md: 'px-7 py-3 text-[15px]',
      lg: 'px-9 py-3.5 text-[16px]'
    };

    const variants = {
      primary: 'border border-primary bg-primary text-white shadow-[0_0_0_var(--color-primary-glow)] hover:-translate-y-0.5 hover:bg-primary-muted hover:shadow-[0_8px_24px_var(--color-primary-glow)]',
      secondary: 'border border-border bg-bg-elevated text-text-primary hover:-translate-y-0.5 hover:border-primary',
      outline: 'border border-border bg-transparent text-text-primary hover:-translate-y-0.5 hover:border-primary'
    };

    return `${base} ${sizes[this.size]} ${variants[this.variant]} ${this.hostClass}`.trim();
  }
}
