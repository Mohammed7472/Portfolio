import { Component } from '@angular/core';

@Component({
  selector: 'app-tag',
  standalone: true,
  template: `
    <span class="inline-flex items-center rounded-md border border-border bg-bg-subtle px-2.5 py-1 text-[13px] font-medium text-text-secondary transition-colors duration-150 hover:border-accent hover:text-accent">
      <ng-content></ng-content>
    </span>
  `,
})
export class TagComponent {}
