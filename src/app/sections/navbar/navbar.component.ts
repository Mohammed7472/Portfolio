import { Component, HostListener, OnInit, OnDestroy, signal, ChangeDetectionStrategy } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { PORTFOLIO } from '../../core/portfolio.constants';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-12px)' }),
        animate('180ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(-12px)' }))
      ])
    ])
  ],
  styles: [`
    header {
      background: rgba(7, 11, 20, 0.85);
      backdrop-filter: blur(20px);
    }
  `],
  template: `
    <header class="fixed inset-x-0 top-0 z-50 h-16 border-b border-border">
      <div class="portfolio-container flex h-full items-center justify-between">
        <a href="#home" class="flex items-center gap-3" (click)="closeMenu()">
          <span class="flex h-8 min-w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet px-3 text-[14px] font-bold text-white">
            MA
          </span>
          <span class="hidden text-[15px] font-medium text-text-primary sm:inline">
            Mohammed Ashraf
          </span>
        </a>

        <nav class="hidden h-full items-center gap-6 md:flex" aria-label="Main navigation">
          @for (link of navLinks; track link.href) {
            <a
              [href]="link.href"
              class="flex h-full items-center border-b-2 px-0 text-[14px] font-medium transition-colors duration-150"
              [class.border-primary]="activeSection() === link.href"
              [class.border-transparent]="activeSection() !== link.href"
              [class.text-text-primary]="activeSection() === link.href"
              [class.text-text-secondary]="activeSection() !== link.href"
              [class.hover:text-text-primary]="activeSection() !== link.href"
            >
              {{ link.label }}
            </a>
          }
          <a
            href="#contact"
            class="rounded-[10px] border border-primary px-4 py-2 text-[14px] font-semibold text-primary transition-all duration-150 hover:bg-primary hover:text-white"
          >
            Hire Me
          </a>
        </nav>

        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-[10px] text-text-primary transition-colors hover:bg-bg-hover md:hidden"
          [attr.aria-expanded]="menuOpen()"
          aria-label="Toggle menu"
          (click)="toggleMenu()"
        >
          <ng-icon [name]="menuOpen() ? 'heroXMark' : 'heroBars3'" size="24" />
        </button>
      </div>
    </header>

    @if (menuOpen()) {
      <button
        type="button"
        class="fixed inset-0 z-40 bg-black/60 md:hidden"
        aria-label="Close navigation menu"
        (click)="closeMenu()"
      ></button>
      <nav
        class="fixed inset-x-4 top-20 z-50 rounded-[16px] border border-border bg-bg-elevated p-3 shadow-2xl md:hidden"
        aria-label="Mobile navigation"
        @slideDown
      >
        @for (link of navLinks; track link.href) {
          <a
            [href]="link.href"
            class="flex min-h-12 items-center rounded-[10px] px-4 text-[15px] font-medium transition-colors"
            [class.bg-bg-hover]="activeSection() === link.href"
            [class.text-text-primary]="activeSection() === link.href"
            [class.text-text-secondary]="activeSection() !== link.href"
            (click)="closeMenu()"
          >
            {{ link.label }}
          </a>
        }
        <a
          href="#contact"
          class="mt-2 flex min-h-12 items-center justify-center rounded-[10px] border border-primary text-[15px] font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          (click)="closeMenu()"
        >
          Hire Me
        </a>
      </nav>
    }
  `,
})
export class NavbarComponent implements OnInit, OnDestroy {
  protected readonly navLinks = PORTFOLIO.navLinks;
  protected menuOpen = signal(false);
  protected activeSection = signal('#home');

  private observer!: IntersectionObserver;

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.menuOpen()) {
      this.closeMenu();
    }
  }

  ngOnInit() {
    this.setupScrollspy();
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  private setupScrollspy(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.activeSection.set(`#${entry.target.id}`);
        }
      });
    }, {
      rootMargin: '-30% 0px -55% 0px',
      threshold: 0
    });

    this.navLinks.forEach((link) => {
      const element = document.getElementById(link.href.slice(1));
      if (element) {
        this.observer.observe(element);
      }
    });
  }
}
