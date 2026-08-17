import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PORTFOLIO } from '../../core/portfolio.constants';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="bg-secondary text-white py-12">
      <div class="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-2 font-mono text-lg font-semibold">
          MA<span class="text-primary">.</span>
        </div>
        
        <p class="text-xs md:text-sm text-slate-400 text-center">
          &copy; {{ currentYear }} {{ portfolio.name }}. All rights reserved. Built with Angular & Tailwind.
        </p>

        <div class="flex items-center gap-4">
          @for (link of portfolio.socialLinks; track link.label) {
            <a
              [href]="link.href"
              class="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-primary transition-all duration-300"
              [attr.aria-label]="link.label"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ng-icon [name]="link.icon" size="18" />
            </a>
          }
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  protected readonly portfolio = PORTFOLIO;
  protected readonly currentYear = new Date().getFullYear();
}
