import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { PORTFOLIO } from '../../core/portfolio.constants';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { ScrollFadeDirective } from '../../shared/directives/scroll-fade.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [SectionTitleComponent, ScrollFadeDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .timeline::before {
      content: '';
      position: absolute;
      inset-block: 0;
      left: 8px;
      width: 2px;
      background: linear-gradient(to bottom, var(--color-primary), var(--color-violet));
    }

    .timeline-item {
      opacity: 0;
      transform: translateX(-40px);
      transition:
        opacity var(--dur-slow) var(--ease-out-quart),
        transform var(--dur-slow) var(--ease-out-quart);
    }

    .timeline-visible .timeline-item {
      opacity: 1;
      transform: translateX(0);
    }

    .timeline-item:nth-child(2) {
      transition-delay: 120ms;
    }

    .timeline-item:nth-child(3) {
      transition-delay: 240ms;
    }

    @media (min-width: 1024px) {
      .timeline::before {
        left: 50%;
      }

      .timeline-item:nth-child(odd) {
        transform: translateX(-40px);
      }

      .timeline-item:nth-child(even) {
        transform: translateX(40px);
      }

      .timeline-visible .timeline-item {
        transform: translateX(0);
      }

      .timeline-left .timeline-panel {
        grid-column: 1;
      }

      .timeline-right .timeline-panel {
        grid-column: 2;
      }
    }
  `],
  template: `
    <section
      id="experience"
      class="section-shell bg-bg-subtle"
      appScrollFade
      (visible)="visible.set(true)"
    >
      <div class="portfolio-container" [class.timeline-visible]="visible()">
        <app-section-title
          eyebrow="Experience"
          title="A Practical Engineering Path"
          subtitle="Training and production work shaped around backend systems that need to hold up under real use."
        />

        <div class="timeline relative mt-14 space-y-10">
          @for (item of portfolio.experience; track item.company) {
            <div
              class="timeline-item relative pl-10 lg:grid lg:grid-cols-2 lg:gap-16 lg:pl-0"
              [class.timeline-left]="$even"
              [class.timeline-right]="$odd"
            >
              <span class="absolute left-0 top-7 z-10 h-4 w-4 rounded-full bg-primary shadow-[0_0_20px_var(--color-primary-glow)] lg:left-1/2 lg:-translate-x-1/2"></span>

              <div
                class="timeline-panel rounded-[16px] border border-border bg-bg-elevated px-7 py-6 transition-all duration-300 hover:border-border-glow hover:shadow-[0_0_30px_var(--color-primary-glow)]"
              >
                <span class="inline-flex rounded-full border border-border-glow bg-primary-glow px-3 py-1 text-[12px] font-semibold text-primary">
                  {{ item.period }}
                </span>
                <h3 class="mt-4 text-[18px] font-bold text-text-primary">
                  {{ item.role }}
                </h3>
                <p class="mt-1 text-[14px] font-medium text-accent">
                  {{ item.company }} · {{ item.type }}
                </p>
                <ul class="mt-5 space-y-2.5">
                  @for (pt of item.points; track pt) {
                    <li class="flex items-start gap-3 text-[14px] leading-6 text-text-secondary">
                      <span class="text-primary">→</span>
                      <span>{{ pt }}</span>
                    </li>
                  }
                </ul>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class ExperienceComponent {
  protected readonly portfolio = PORTFOLIO;
  protected visible = signal(false);
}
