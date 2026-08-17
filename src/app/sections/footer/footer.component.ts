import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { PORTFOLIO } from '../../core/portfolio.constants';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="section-shell-sm border-t border-border bg-bg-base">
      <div class="portfolio-container">
        <div class="flex flex-col items-center justify-between gap-6 md:flex-row">
          <a href="#home" class="flex items-center gap-3 text-text-primary" aria-label="Back to home">
            <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-violet text-[12px] font-extrabold text-white shadow-[0_0_20px_var(--color-primary-glow)]">MA</span>
            <span class="font-display text-[16px] font-bold">Mohammed Ashraf</span>
          </a>
          <div class="flex items-center gap-5">
            @for (link of portfolio.socialLinks; track link.label) {
              <a [href]="link.href" class="text-text-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-primary" [attr.aria-label]="link.label" target="_blank" rel="noopener noreferrer">
                <ng-icon [name]="link.icon" size="20" />
              </a>
            }
          </div>
        </div>
        <p class="mt-8 text-center text-[13px] text-text-muted">&copy; {{ currentYear }} Mohammed Ashraf &middot; Built with Angular &hearts;</p>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  protected readonly portfolio = PORTFOLIO;
  protected readonly currentYear = new Date().getFullYear();
}
