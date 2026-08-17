import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  standalone: true,
  template: `
    <div
      class="mb-12"
      [class.text-center]="align === 'center'"
      [class.text-left]="align === 'left'"
    >
      @if (eyebrow) {
        <p class="mb-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-accent">
          {{ eyebrow }}
        </p>
      }
      <h2 class="font-display text-[36px] font-bold leading-tight text-text-primary md:text-[40px]">
        {{ title }}
      </h2>
      @if (subtitle) {
        <p
          class="mt-4 max-w-2xl text-[16px] leading-7 text-text-secondary"
          [class.mx-auto]="align === 'center'"
        >
          {{ subtitle }}
        </p>
      }
    </div>
  `,
})
export class SectionTitleComponent {
  @Input({ required: true }) title!: string;
  @Input() subtitle?: string;
  @Input() eyebrow?: string;
  @Input() align: 'left' | 'center' = 'center';
}
