import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { PORTFOLIO } from '../../core/portfolio.constants';
import { ScrollFadeDirective } from '../../shared/directives/scroll-fade.directive';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { NgIcon } from '@ng-icons/core';
import { fadeInUp } from '../../shared/animations/animations';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [ScrollFadeDirective, ButtonComponent, NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUp],
  styles: [`
    .resume-card {
      background: linear-gradient(135deg, var(--color-bg-elevated) 0%, rgba(59, 130, 246, 0.05) 100%);
    }
  `],
  template: `
    <section
      id="resume"
      class="section-shell-sm bg-bg-base"
      appScrollFade
      (visible)="animateState.set('visible')"
    >
      <div class="portfolio-container">
        <div
          class="resume-card mx-auto max-w-[720px] rounded-[24px] border border-border-glow px-6 py-12 text-center md:px-12 md:py-14"
          [@fadeInUp]="animateState()"
        >
          <p class="mb-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-accent">
            Resume
          </p>
          <h2 class="font-display text-[32px] font-bold leading-tight text-text-primary">
            Ready to contribute from day one.
          </h2>
          <p class="mx-auto mt-4 max-w-[480px] text-[16px] leading-7 text-text-secondary">
            Download my CV for the full project details, education, certificates, and backend engineering background.
          </p>

          <div class="mt-8">
            <app-button
              variant="primary"
              size="lg"
              [href]="portfolio.cvUrl"
              icon="heroArrowDown"
              iconPosition="right"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV
            </app-button>
          </div>

          <div class="mt-8 flex flex-wrap items-center justify-center gap-8">
            @for (link of portfolio.socialLinks; track link.label) {
              <a
                [href]="link.href"
                class="flex items-center gap-2 text-[14px] font-medium text-text-muted transition-colors hover:text-text-primary"
                [attr.aria-label]="link.label"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ng-icon [name]="link.icon" size="18" />
                {{ link.label }}
              </a>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ResumeComponent {
  protected readonly portfolio = PORTFOLIO;
  protected animateState = signal('void');
}
