import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { PORTFOLIO } from '../../core/portfolio.constants';
import { Project, ProjectModalState } from '../../core/types';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { ScrollFadeDirective } from '../../shared/directives/scroll-fade.directive';
import { CardComponent } from '../../shared/components/card/card.component';
import { TagComponent } from '../../shared/components/tag/tag.component';
import { ProjectModalComponent } from '../../shared/components/project-modal/project-modal.component';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    SectionTitleComponent,
    ScrollFadeDirective,
    CardComponent,
    TagComponent,
    ProjectModalComponent,
    NgIcon
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .project-card {
      opacity: 0;
      transform: translateY(22px);
      transition:
        opacity var(--dur-slow) var(--ease-out-quart),
        transform var(--dur-slow) var(--ease-out-quart);
    }

    .projects-visible .project-card {
      opacity: 1;
      transform: translateY(0);
    }

    .project-card:nth-child(2) {
      transition-delay: 120ms;
    }

    .project-card:nth-child(3) {
      transition-delay: 240ms;
    }
  `],
  template: `
    <section
      id="projects"
      class="section-shell bg-bg-base"
      appScrollFade
      (visible)="visible.set(true)"
    >
      <div class="portfolio-container" [class.projects-visible]="visible()">
        <app-section-title
          eyebrow="Featured Projects"
          title="Backend Systems in Practice"
          subtitle="Production-minded APIs, commerce workflows, concurrency control, and AI integration."
          align="left"
        />

        <div class="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
          @for (project of portfolio.projects; track project.id) {
            <div class="project-card">
              <app-card radius="lg">
                <div class="pointer-events-none absolute left-0 top-0 h-[60px] w-[60px] rounded-br-[60px] bg-gradient-to-br from-primary-glow to-transparent"></div>
                <div class="relative flex h-full flex-col gap-4">
                  <span class="absolute right-0 top-0 text-[13px] font-semibold text-text-muted">
                    {{ projectNumber($index) }}
                  </span>

                  <div class="pr-10">
                    <h3 class="text-[20px] font-bold leading-snug text-text-primary">
                      {{ project.name }}
                    </h3>
                    <p class="mt-3 line-clamp-3 text-[14px] leading-6 text-text-secondary">
                      {{ project.description }}
                    </p>
                  </div>

                  <div class="flex flex-wrap gap-2">
                    @for (tech of project.tech.slice(0, 5); track tech) {
                      <app-tag>{{ tech }}</app-tag>
                    }
                  </div>

                  <div class="mt-auto flex items-center justify-between gap-4 pt-2">
                    @if (project.github) {
                      <a
                        [href]="project.github"
                        class="inline-flex items-center gap-2 text-[14px] font-semibold text-primary transition-colors hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ng-icon name="heroGlobeAltSolid" size="18" />
                        GitHub
                      </a>
                    } @else {
                      <span class="text-[13px] text-text-muted">Private repo</span>
                    }

                    <button
                      type="button"
                      class="group/action inline-flex items-center gap-2 text-[14px] font-semibold text-primary transition-colors hover:underline"
                      (click)="openModal(project)"
                    >
                      View Details
                      <ng-icon name="heroArrowRight" class="transition-transform group-hover/action:translate-x-1" size="16" />
                    </button>
                  </div>
                </div>
              </app-card>
            </div>
          }
        </div>
      </div>
    </section>

    @if (modalState().isOpen) {
      <app-project-modal
        [project]="modalState().selectedProject"
        (close)="closeModal()"
      />
    }
  `,
})
export class ProjectsComponent {
  protected readonly portfolio = PORTFOLIO;
  protected visible = signal(false);

  protected modalState = signal<ProjectModalState>({
    isOpen: false,
    selectedProject: null
  });

  protected projectNumber(index: number): string {
    return String(index + 1).padStart(2, '0');
  }

  protected openModal(project: Project): void {
    this.modalState.set({
      isOpen: true,
      selectedProject: project
    });
  }

  protected closeModal(): void {
    this.modalState.set({
      isOpen: false,
      selectedProject: null
    });
  }
}
