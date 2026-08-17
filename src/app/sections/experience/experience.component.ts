import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { PORTFOLIO } from '../../core/portfolio.constants';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { ScrollFadeDirective } from '../../shared/directives/scroll-fade.directive';
import { NgIcon } from '@ng-icons/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [SectionTitleComponent, ScrollFadeDirective, NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('timelineStagger', [
      transition('void => visible', [
        query('.timeline-item', [
          style({ opacity: 0, transform: 'translateX(-24px)' }),
          stagger(150, [
            animate('600ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ],
  template: `
    <section
      id="experience"
      class="py-20 bg-surface"
      appScrollFade
      (visible)="animateState.set('visible')"
      [@timelineStagger]="animateState()"
    >
      <div class="mx-auto max-w-4xl px-6">
        <app-section-title title="Work Experience" subtitle="My professional journey as a software developer" />

        <div class="relative border-l border-border ml-4 md:ml-6 mt-12 space-y-12">
          @for (item of portfolio.experience; track item.company) {
            <div class="timeline-item relative pl-8 md:pl-10">
              <!-- Timeline Dot -->
              <span class="absolute -left-[9px] top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-surface border-2 border-primary text-primary">
                <ng-icon name="heroBriefcase" size="9" />
              </span>

              <!-- Content Card -->
              <div class="bg-surface-card border border-border/80 backdrop-blur-md rounded-xl p-6 shadow-sm hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <span class="text-xs font-mono font-semibold text-primary">
                    {{ item.period }}
                  </span>
                  <span class="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {{ item.type }}
                  </span>
                </div>
                <h3 class="text-lg font-bold text-heading mt-1">
                  {{ item.role }}
                </h3>
                <h4 class="text-sm font-semibold text-muted">
                  {{ item.company }}
                </h4>
                <ul class="mt-4 space-y-2.5">
                  @for (pt of item.points; track pt) {
                    <li class="flex items-start gap-2.5 text-sm text-muted">
                      <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60"></span>
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
  protected animateState = signal('void');
}
