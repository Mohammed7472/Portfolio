import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  standalone: true,
  template: `
    <div class="mb-12 text-center">
      <h2 class="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
        {{ title }}
      </h2>
      @if (subtitle) {
        <p class="mx-auto mt-4 max-w-2xl text-base text-muted md:text-lg">
          {{ subtitle }}
        </p>
      }
      <div class="mt-4 flex justify-center">
        <div class="h-1.5 w-16 rounded bg-gradient-to-r from-primary to-accent"></div>
      </div>
    </div>
  `,
})
export class SectionTitleComponent {
  @Input({ required: true }) title!: string;
  @Input() subtitle?: string;
}
