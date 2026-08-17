import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { PORTFOLIO } from '../../core/portfolio.constants';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { ScrollFadeDirective } from '../../shared/directives/scroll-fade.directive';
import { CardComponent } from '../../shared/components/card/card.component';
import { NgIcon } from '@ng-icons/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SectionTitleComponent, ScrollFadeDirective, CardComponent, NgIcon],
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
      id="about"
      class="py-20 bg-secondary relative overflow-hidden"
      appScrollFade
      (visible)="animateState.set('visible')"
      [@fadeInUp]="animateState()"
    >
      <!-- Background Ambient Glows -->
      <div class="absolute top-1/3 left-1/10 -z-10 h-[250px] w-[250px] rounded-full bg-primary/5 blur-[90px] animate-pulse-glow"></div>
      <div class="absolute bottom-1/3 right-1/10 -z-10 h-[250px] w-[250px] rounded-full bg-accent/5 blur-[90px] animate-pulse-glow animate-float-delayed"></div>

      <div class="mx-auto max-w-5xl px-6 relative z-10">
        <app-section-title title="About Me" subtitle="A quick introduction to my background and backend philosophy" />

        <div class="grid gap-12 lg:grid-cols-12 items-center">
          <!-- Text Column -->
          <div class="lg:col-span-7">
            <div class="flex items-center gap-4 mb-6">
              <!-- Initials Avatar -->
              <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-white font-mono text-xl font-bold shadow-md shadow-primary/20 hover:scale-105 transition-transform duration-300 animate-float">
                MA
              </div>
              <div>
                <h3 class="text-xl font-bold text-heading">Mohammed Ashraf</h3>
                <p class="text-sm text-primary font-medium">Backend .NET Engineer</p>
              </div>
            </div>

            <p class="text-base leading-relaxed text-muted mb-6">
              {{ portfolio.about.summary }}
            </p>
            
            <div class="border-l-4 border-primary pl-4 py-1.5 italic text-muted mb-6">
              "Clean code always looks like it was written by someone who cares." — Michael Feathers
            </div>

            <ul class="grid gap-3.5 sm:grid-cols-2">
              @for (highlight of portfolio.about.highlights; track highlight) {
                <li class="flex items-start gap-2.5">
                  <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                    <ng-icon name="heroCheckCircle" size="14" />
                  </span>
                  <span class="text-sm font-medium text-foreground">{{ highlight }}</span>
                </li>
              }
            </ul>
          </div>

          <!-- Visual/Stats Card Column -->
          <div class="lg:col-span-5 space-y-6">
            <app-card class="!p-8 bg-surface">
              <h4 class="text-xs font-mono font-semibold tracking-wider text-primary uppercase mb-6">Professional Stats</h4>
              <div class="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
                @for (stat of portfolio.about.stats; track stat.label) {
                  <div class="flex items-center gap-4 border-b border-border pb-4 last:border-0 last:pb-0">
                    <div class="text-3xl font-extrabold text-primary">
                      {{ stat.value }}
                    </div>
                    <div>
                      <p class="text-xs font-semibold text-muted uppercase tracking-wider">
                        {{ stat.label }}
                      </p>
                    </div>
                  </div>
                }
              </div>
            </app-card>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {
  protected readonly portfolio = PORTFOLIO;
  protected animateState = signal('void');
}
