import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { PORTFOLIO } from '../../core/portfolio.constants';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { ScrollFadeDirective } from '../../shared/directives/scroll-fade.directive';
import { CardComponent } from '../../shared/components/card/card.component';
import { TagComponent } from '../../shared/components/tag/tag.component';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SectionTitleComponent, ScrollFadeDirective, CardComponent, TagComponent, NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .skill-card {
      opacity: 0;
      transform: translateY(20px);
      transition:
        opacity var(--dur-slow) var(--ease-out-quart),
        transform var(--dur-slow) var(--ease-out-quart);
    }

    .skills-visible .skill-card {
      opacity: 1;
      transform: translateY(0);
    }

    .skill-card:nth-child(2) {
      transition-delay: 80ms;
    }

    .skill-card:nth-child(3) {
      transition-delay: 160ms;
    }

    .skill-card:nth-child(4) {
      transition-delay: 240ms;
    }

    .skill-card:nth-child(5) {
      transition-delay: 320ms;
    }

    .skill-card:nth-child(6) {
      transition-delay: 400ms;
    }
  `],
  template: `
    <section
      id="skills"
      class="section-shell bg-bg-subtle"
      appScrollFade
      (visible)="visible.set(true)"
    >
      <div class="portfolio-container" [class.skills-visible]="visible()">
        <app-section-title
          eyebrow="Technical Skills"
          title="What I Work With"
          subtitle="A focused backend toolkit shaped around scalable APIs, data consistency, and maintainable delivery."
        />

        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          @for (cat of portfolio.skills; track cat.category) {
            <div class="skill-card">
              <app-card>
                <div class="mb-5 flex items-center gap-3">
                  <span class="flex h-10 w-10 items-center justify-center rounded-[10px] bg-bg-subtle text-accent">
                    <ng-icon [name]="cat.icon" size="20" />
                  </span>
                  <h3 class="text-[16px] font-semibold text-text-primary">
                    {{ cat.category }}
                  </h3>
                </div>

                <div class="flex flex-wrap gap-2">
                  @for (item of cat.items; track item) {
                    <app-tag>{{ item }}</app-tag>
                  }
                </div>
              </app-card>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class SkillsComponent {
  protected readonly portfolio = PORTFOLIO;
  protected visible = signal(false);
}
