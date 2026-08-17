import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { PORTFOLIO } from '../../core/portfolio.constants';
import { Project, ProjectModalState } from '../../core/types';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { ScrollFadeDirective } from '../../shared/directives/scroll-fade.directive';
import { CardComponent } from '../../shared/components/card/card.component';
import { TagComponent } from '../../shared/components/tag/tag.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ProjectModalComponent } from '../../shared/components/project-modal/project-modal.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    SectionTitleComponent,
    ScrollFadeDirective,
    CardComponent,
    TagComponent,
    ButtonComponent,
    ProjectModalComponent
  ],
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
      id="projects"
      class="py-20 bg-surface relative overflow-hidden"
      appScrollFade
      (visible)="animateState.set('visible')"
      [@fadeInUp]="animateState()"
    >
      <div class="absolute top-1/4 right-1/10 -z-10 h-[250px] w-[250px] rounded-full bg-primary/5 blur-[90px]"></div>
      <div class="mx-auto max-w-6xl px-6 relative z-10">
        <app-section-title title="Featured Projects" subtitle="A collection of microservices and backend API systems I have built" />

        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          @for (project of portfolio.projects; track project.id) {
            <app-card>
              <div class="flex flex-col h-full justify-between">
                <div>
                  <span class="text-xs font-mono font-semibold tracking-wider text-primary uppercase">Backend / API</span>
                  <h3 class="mt-2 text-xl font-bold text-heading group-hover:text-primary transition-colors">
                    {{ project.name }}
                  </h3>
                  <p class="mt-3 text-sm text-muted line-clamp-3">
                    {{ project.description }}
                  </p>
                </div>

                <div class="mt-6">
                  <div class="flex flex-wrap gap-1.5 mb-6">
                    @for (tech of project.tech.slice(0, 3); track tech) {
                      <app-tag>{{ tech }}</app-tag>
                    }
                    @if (project.tech.length > 3) {
                      <app-tag>+{{ project.tech.length - 3 }} more</app-tag>
                    }
                  </div>

                  <div class="flex items-center gap-3">
                    <button
                      type="button"
                      class="inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer border border-primary text-primary hover:bg-primary/5 px-4 py-2 text-xs"
                      (click)="openModal(project)"
                    >
                      View Details
                    </button>
                    @if (project.github) {
                      <app-button variant="primary" size="sm" [href]="project.github" icon="heroGlobeAltSolid" iconPosition="left" target="_blank" rel="noopener noreferrer">
                        GitHub
                      </app-button>
                    }
                  </div>
                </div>
              </div>
            </app-card>
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
  protected animateState = signal('void');

  protected modalState = signal<ProjectModalState>({
    isOpen: false,
    selectedProject: null
  });

  openModal(project: Project): void {
    this.modalState.set({
      isOpen: true,
      selectedProject: project
    });
  }

  closeModal(): void {
    this.modalState.set({
      isOpen: false,
      selectedProject: null
    });
  }
}
