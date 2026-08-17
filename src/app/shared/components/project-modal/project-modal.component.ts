import { Component, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Project } from '../../../core/types';
import { TagComponent } from '../tag/tag.component';
import { ButtonComponent } from '../button/button.component';
import { NgIcon } from '@ng-icons/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [TagComponent, ButtonComponent, NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('modalTransition', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('contentTransition', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95) translateY(8px)' }),
        animate('300ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.95) translateY(8px)' }))
      ])
    ])
  ],
  template: `
    <div
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      [attr.aria-labelledby]="project?.name"
      @modalTransition
    >
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-secondary/60 backdrop-blur-xs"
        (click)="close.emit()"
      ></div>

      <!-- Modal Content -->
      <div
        #modalContainer
        class="relative w-full max-w-2xl overflow-y-auto max-h-[90vh] rounded-2xl border border-border bg-[#0F172A] shadow-2xl transition-all"
        @contentTransition
      >
        <button
          #closeButton
          type="button"
          class="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-surface text-muted hover:text-heading hover:bg-border/50 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
          aria-label="Close modal"
          (click)="close.emit()"
        >
          <ng-icon name="heroXMark" size="18" />
        </button>

        <div class="p-6 md:p-8">
          <div class="mb-4">
            <span class="text-xs font-mono font-semibold tracking-wider text-primary uppercase">Project Details</span>
            <h3 class="mt-1 text-2xl font-bold text-heading md:text-3xl">
              {{ project?.name }}
            </h3>
          </div>

          <p class="mb-6 text-sm leading-relaxed text-muted md:text-base">
            {{ project?.longDescription }}
          </p>

          @if (project?.highlights?.length) {
            <div class="mb-6">
              <h4 class="mb-2.5 text-xs font-mono font-semibold tracking-wider text-muted uppercase">Key Highlights</h4>
              <ul class="space-y-2">
                @for (hl of project?.highlights; track hl) {
                  <li class="flex items-start gap-2.5 text-sm text-muted">
                    <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/65"></span>
                    <span>{{ hl }}</span>
                  </li>
                }
              </ul>
            </div>
          }

          <div class="mb-6">
            <h4 class="mb-2.5 text-xs font-mono font-semibold tracking-wider text-muted uppercase">Technologies</h4>
            <div class="flex flex-wrap gap-2">
              @for (tech of project?.tech; track tech) {
                <app-tag>{{ tech }}</app-tag>
              }
            </div>
          </div>

          <div class="flex items-center gap-3">
            @if (project?.github) {
              <app-button
                variant="outline"
                [href]="project?.github"
                icon="heroGlobeAltSolid"
                iconPosition="left"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repo
              </app-button>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProjectModalComponent implements AfterViewInit {
  @Input({ required: true }) project!: Project | null;
  @Output() close = new EventEmitter<void>();

  @ViewChild('modalContainer') modalContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('closeButton') closeButton!: ElementRef<HTMLButtonElement>;

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: any) {
    this.close.emit();
  }

  @HostListener('document:keydown.tab', ['$event'])
  onTabKey(event: any) {
    if (!this.modalContainer) return;
    const focusableElements = this.modalContainer.nativeElement.querySelectorAll<HTMLElement>(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length === 0) return;
    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstEl) {
        lastEl.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastEl) {
        firstEl.focus();
        event.preventDefault();
      }
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.closeButton) {
        this.closeButton.nativeElement.focus();
      }
    }, 100);
  }
}
