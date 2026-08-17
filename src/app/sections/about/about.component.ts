import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { PORTFOLIO } from '../../core/portfolio.constants';
import { ScrollFadeDirective } from '../../shared/directives/scroll-fade.directive';
import { CardComponent } from '../../shared/components/card/card.component';
import { slideInLeft, slideInRight } from '../../shared/animations/animations';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ScrollFadeDirective, CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInLeft, slideInRight],
  template: `
    <section
      id="about"
      class="section-shell bg-bg-base"
      appScrollFade
      (visible)="animateState.set('visible')"
    >
      <div class="portfolio-container grid items-center gap-12 lg:grid-cols-[1fr_420px]">
        <div [@slideInLeft]="animateState()">
          <p class="mb-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-accent">
            About Me
          </p>
          <h2 class="font-display text-[36px] font-bold leading-tight text-text-primary md:text-[40px]">
            Crafting Robust Backend Systems
          </h2>
          <div class="mt-6 space-y-5 text-[16px] leading-8 text-text-secondary">
            <p>{{ portfolio.about.summary }}</p>
            <p>{{ portfolio.about.philosophy }}</p>
          </div>

          <ul class="mt-8 space-y-3">
            @for (highlight of portfolio.about.highlights; track highlight) {
              <li class="flex items-start gap-3 text-[15px] text-text-secondary">
                <span class="mt-2 text-accent">•</span>
                <span>{{ highlight }}</span>
              </li>
            }
          </ul>
        </div>

        <div [@slideInRight]="animateState()">
          <app-card padding="lg" radius="md">
            <div class="grid grid-cols-3 divide-x divide-border text-center lg:grid-cols-1 lg:divide-x-0 lg:divide-y">
              @for (stat of portfolio.about.stats; track stat.label) {
                <div class="px-4 py-5 first:pt-0 last:pb-0 lg:px-0">
                  <div class="font-display text-[40px] font-extrabold leading-none gradient-text">
                    {{ stat.value }}
                  </div>
                  <p class="mt-2 text-[13px] font-medium text-text-muted">
                    {{ stat.label }}
                  </p>
                </div>
              }
            </div>
          </app-card>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {
  protected readonly portfolio = PORTFOLIO;
  protected animateState = signal('void');
}
