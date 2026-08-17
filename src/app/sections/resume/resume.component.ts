import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { PORTFOLIO } from '../../core/portfolio.constants';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { ScrollFadeDirective } from '../../shared/directives/scroll-fade.directive';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { NgIcon } from '@ng-icons/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [SectionTitleComponent, ScrollFadeDirective, ButtonComponent, CardComponent, NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInUp', [
      transition('void => visible', [
        style({ opacity: 0, transform: 'translateY(24px)' }),
        animate('600ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  template: `
    <section
      id="resume"
      class="py-20 bg-secondary"
      appScrollFade
      (visible)="animateState.set('visible')"
      [@fadeInUp]="animateState()"
    >
      <div class="mx-auto max-w-4xl px-6">
        <app-section-title title="Resume & CV" subtitle="Download my full credentials or connect directly" />

        <div class="max-w-2xl mx-auto">
          <app-card>
            <div class="text-center py-6">
              <h3 class="text-2xl font-bold text-heading mb-3">Want to know more?</h3>
              <p class="text-muted text-sm md:text-base mb-8 max-w-md mx-auto">
                Download my comprehensive CV to see details on projects, education, certificates, and methodologies.
              </p>

              <app-button
                variant="primary"
                [href]="portfolio.cvUrl"
                icon="heroArrowDown"
                iconPosition="right"
                class="mb-10"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
              </app-button>

              <div class="border-t border-border pt-8 mt-6">
                <h4 class="text-xs font-mono font-semibold tracking-wider text-muted uppercase mb-4">Connect Directly</h4>
                <div class="flex flex-wrap items-center justify-center gap-6">
                  @for (link of portfolio.socialLinks; track link.label) {
                    <a
                      [href]="link.href"
                      class="flex items-center gap-2 text-sm font-medium text-muted hover:text-primary transition-colors cursor-pointer"
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
          </app-card>
        </div>
      </div>
    </section>
  `,
})
export class ResumeComponent {
  protected readonly portfolio = PORTFOLIO;
  protected animateState = signal('void');
}
