import { Component } from '@angular/core';

@Component({
  selector: 'app-tag',
  standalone: true,
  template: `
    <span class="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary border border-primary/20 transition-colors duration-300 hover:bg-primary/20">
      <ng-content></ng-content>
    </span>
  `,
})
export class TagComponent {}
