import { Component, Input } from '@angular/core';
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

  get classes(): string {
    const base = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
    
    const sizes = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-7 py-3.5 text-base'
    };

    const variants = {
      primary: 'bg-primary text-white hover:brightness-110 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30',
      secondary: 'bg-secondary text-white hover:brightness-110 shadow-sm',
      outline: 'border border-primary text-primary hover:bg-primary/5'
    };

    return `${base} ${sizes[this.size]} ${variants[this.variant]}`;
  }
}
