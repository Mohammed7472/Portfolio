import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { PORTFOLIO } from '../../core/portfolio.constants';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { ScrollFadeDirective } from '../../shared/directives/scroll-fade.directive';
import { CardComponent } from '../../shared/components/card/card.component';
import { TagComponent } from '../../shared/components/tag/tag.component';
import { NgIcon } from '@ng-icons/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SectionTitleComponent, ScrollFadeDirective, CardComponent, TagComponent, NgIcon],
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
      id="skills"
      class="py-20 bg-surface"
      appScrollFade
      (visible)="animateState.set('visible')"
      [@fadeInUp]="animateState()"
    >
      <div class="mx-auto max-w-6xl px-6">
        <app-section-title title="Technical Skills" subtitle="My backend engineering toolkit and proficiency levels" />

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          @for (cat of portfolio.skills; track cat.category) {
            <app-card>
              <div class="flex items-center gap-3 mb-4 pb-3 border-b border-border">
                <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ng-icon [name]="cat.icon" size="20" />
                </span>
                <h3 class="text-base font-bold text-heading">
                  {{ cat.category }}
                </h3>
              </div>
              <div class="flex flex-wrap gap-2">
                @for (item of cat.items; track item) {
                  <app-tag>{{ item }}</app-tag>
                }
              </div>
            </app-card>
          }
        </div>
      </div>
    </section>
  `,
})
export class SkillsComponent {
  protected readonly portfolio = PORTFOLIO;
  protected animateState = signal('void');
}
