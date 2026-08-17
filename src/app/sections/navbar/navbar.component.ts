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
        style({ height: 0, opacity: 0 }),
        animate('250ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ height: 0, opacity: 0 }))
      ])
    ])
  ],
  template: `
    <header
      class="fixed inset-x-0 top-0 z-50 transition-all duration-350"
      [class.glass]="scrolled()"
      [class.py-3]="scrolled()"
      [class.py-5]="!scrolled()"
    >
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a
          href="#home"
          class="group flex items-center gap-2 font-mono text-lg font-semibold text-heading"
          (click)="closeMenu()"
        >
          <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
            <ng-icon name="heroCommandLine" size="20" />
          </span>
          MA<span class="text-primary">.</span>
        </a>

        <!-- Desktop Links -->
        <nav class="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          @for (link of navLinks; track link.href) {
            <a
              [href]="link.href"
              class="rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
              [class.text-primary]="activeSection() === link.href"
              [class.bg-primary/10]="activeSection() === link.href"
              [class.text-muted]="activeSection() !== link.href"
              [class.hover:text-heading]="activeSection() !== link.href"
            >
              {{ link.label }}
            </a>
          }
          <a
            href="#contact"
            class="ml-3 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-primary/20 hover:brightness-110 cursor-pointer"
          >
            Hire Me
          </a>
        </nav>

        <!-- Mobile Menu Toggle Button -->
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-lg text-heading md:hidden focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
          [attr.aria-expanded]="menuOpen()"
          aria-label="Toggle menu"
          (click)="toggleMenu()"
        >
          <ng-icon [name]="menuOpen() ? 'heroXMark' : 'heroBars3'" size="24" />
        </button>
      </div>

      <!-- Mobile Dropdown Menu -->
      @if (menuOpen()) {
        <nav
          class="glass mx-4 mt-2 rounded-xl p-4 md:hidden"
          aria-label="Mobile navigation"
          @slideDown
        >
          @for (link of navLinks; track link.href) {
            <a
              [href]="link.href"
              class="block rounded-lg px-4 py-3 text-sm font-medium transition-colors"
              [class.text-primary]="activeSection() === link.href"
              [class.bg-primary/10]="activeSection() === link.href"
              [class.text-muted]="activeSection() !== link.href"
              (click)="closeMenu()"
            >
              {{ link.label }}
            </a>
          }
          <a
            href="#contact"
            class="mt-2 block rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-white"
            (click)="closeMenu()"
          >
            Hire Me
          </a>
        </nav>
      }
    </header>
  `,
})
export class NavbarComponent implements OnInit, OnDestroy {
  protected readonly navLinks = PORTFOLIO.navLinks;
  protected menuOpen = signal(false);
  protected scrolled = signal(false);
  protected activeSection = signal('#home');

  private observer!: IntersectionObserver;

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
  }

  ngOnInit() {
    this.setupScrollspy();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  private setupScrollspy(): void {
    const options = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies center/top of viewport
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.activeSection.set(`#${entry.target.id}`);
        }
      });
    }, options);

    this.navLinks.forEach((link) => {
      const id = link.href.slice(1);
      const element = document.getElementById(id);
      if (element) {
        this.observer.observe(element);
      }
    });
  }
}
