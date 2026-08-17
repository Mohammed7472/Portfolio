import { Component, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Project } from '../../../core/types';
import { TagComponent } from '../tag/tag.component';
import { ButtonComponent } from '../button/button.component';
import { NgIcon } from '@ng-icons/core';
import { fadeIn, modalAnimation } from '../../animations/animations';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [TagComponent, ButtonComponent, NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn, modalAnimation],
  styles: [`
    .modal-backdrop {
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(8px);
    }
  `],
  template: `
    <div
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      [attr.aria-label]="project?.name"
    >
      <button
        type="button"
        class="modal-backdrop fixed inset-0"
        aria-label="Close modal backdrop"
        (click)="close.emit()"
        @fadeIn
      ></button>

      <div
        #modalContainer
        class="relative max-h-[90vh] w-full max-w-[680px] overflow-y-auto rounded-[24px] border border-border bg-bg-elevated p-8 shadow-2xl md:p-10"
        @modalAnimation
      >
        <button
          #closeButton
          type="button"
          class="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-bg-subtle text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-border-glow"
          aria-label="Close modal"
          (click)="close.emit()"
        >
          <ng-icon name="heroXMark" size="18" />
        </button>

        <div class="pr-10">
          <p class="mb-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-accent">
            Project Details
          </p>
          <h3 class="text-[32px] font-bold leading-tight text-text-primary">
            {{ project?.name }}
          </h3>
        </div>

        <p class="mt-6 text-[16px] leading-8 text-text-secondary">
          {{ project?.longDescription }}
        </p>

        @if (project?.highlights?.length) {
          <div class="mt-8">
            <h4 class="mb-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-text-muted">Key Highlights</h4>
            <ul class="space-y-3">
              @for (hl of project?.highlights; track hl) {
                <li class="flex items-start gap-3 text-[14px] leading-6 text-text-secondary">
                  <span class="mt-0.5 text-accent">▸</span>
                  <span>{{ hl }}</span>
                </li>
              }
            </ul>
          </div>
        }

        <div class="mt-8">
          <h4 class="mb-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-text-muted">Technologies</h4>
          <div class="flex flex-wrap gap-2">
            @for (tech of project?.tech; track tech) {
              <app-tag>{{ tech }}</app-tag>
            }
          </div>
        </div>

        @if (project?.github) {
          <div class="mt-8">
            <app-button
              variant="primary"
              [href]="project?.github"
              icon="heroGlobeAltSolid"
              iconPosition="left"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repo
            </app-button>
          </div>
        }
      </div>
    </div>
  `
})
export class ProjectModalComponent implements AfterViewInit {
  @Input({ required: true }) project!: Project | null;
  @Output() close = new EventEmitter<void>();

  @ViewChild('modalContainer') modalContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('closeButton') closeButton!: ElementRef<HTMLButtonElement>;

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    this.close.emit();
  }

  @HostListener('document:keydown.tab', ['$event'])
  onTabKey(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    if (!this.modalContainer) return;

    const focusableElements = this.modalContainer.nativeElement.querySelectorAll<HTMLElement>(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    if (keyboardEvent.shiftKey && document.activeElement === firstEl) {
      lastEl.focus();
      keyboardEvent.preventDefault();
    } else if (!keyboardEvent.shiftKey && document.activeElement === lastEl) {
      firstEl.focus();
      keyboardEvent.preventDefault();
    }
  }

  ngAfterViewInit() {
    setTimeout(() => this.closeButton?.nativeElement.focus(), 100);
  }
}
