import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PORTFOLIO } from '../../core/portfolio.constants';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { heroEntrance } from '../../shared/animations/animations';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [heroEntrance],
  styles: [`
    .hero-bg {
      background:
        radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59, 130, 246, 0.15) 0%, transparent 60%),
        radial-gradient(ellipse 50% 40% at 80% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
        var(--color-bg-base);
    }

    .badge-float {
      animation: float-badge 8s ease-in-out infinite;
    }

    .badge-one { left: 12%; top: 28%; }
    .badge-two { right: 14%; top: 34%; }
    .badge-three { left: 18%; bottom: 24%; }
    .badge-four { right: 20%; bottom: 18%; }

    .badge-float:nth-child(2) {
      animation-delay: 1.2s;
    }

    .badge-float:nth-child(3) {
      animation-delay: 2.1s;
    }

    .badge-float:nth-child(4) {
      animation-delay: 3s;
    }

    .scroll-indicator {
      animation: scroll-fade 700ms ease 1000ms both, scroll-bounce 2.3s ease-in-out 1200ms infinite;
    }

    @keyframes float-badge {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-12px);
      }
    }

    @keyframes scroll-fade {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes scroll-bounce {
      0%, 100% {
        transform: translateX(-50%) translateY(0);
      }
      50% {
        transform: translateX(-50%) translateY(8px);
      }
    }
  `],
  template: `
    <section
      id="home"
      class="hero-bg relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 pt-24"
    >
      <div class="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
        @for (badge of techBadges; track badge.label) {
          <span
            class="badge-float absolute rounded-full border border-border bg-bg-elevated px-3 py-1 text-[12px] font-medium text-text-secondary opacity-70"
            [class.badge-one]="$index === 0"
            [class.badge-two]="$index === 1"
            [class.badge-three]="$index === 2"
            [class.badge-four]="$index === 3"
          >
            {{ badge.label }}
          </span>
        }
      </div>

      <div class="portfolio-container relative z-10 text-center" [@heroEntrance]="true">
        <div class="hero-reveal mx-auto inline-flex items-center rounded-full border border-border-glow bg-primary-glow px-4 py-1.5 text-[12px] font-semibold text-primary">
          {{ portfolio.availability }}
        </div>

        <h1 class="hero-reveal mx-auto mt-7 max-w-5xl font-display text-[clamp(48px,8vw,80px)] font-extrabold leading-none text-text-primary">
          {{ portfolio.name }}
        </h1>

        <p class="hero-reveal mt-4 font-display text-[clamp(28px,5vw,48px)] font-bold leading-tight gradient-text">
          {{ portfolio.title }}
        </p>

        <p class="hero-reveal mx-auto mt-6 max-w-xl text-[18px] leading-8 text-text-secondary">
          {{ portfolio.tagline }}
        </p>

        <div class="hero-reveal mt-10 flex flex-wrap items-center justify-center gap-3">
          <app-button variant="primary" href="#projects">
            View Projects
          </app-button>
          <app-button variant="outline" [href]="portfolio.cvUrl" target="_blank" rel="noopener noreferrer">
            Download CV
          </app-button>
          <app-button variant="outline" href="#contact">
            Contact Me
          </app-button>
        </div>
      </div>

      <a
        href="#about"
        class="scroll-indicator absolute bottom-8 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center text-text-muted"
        aria-label="Scroll to about section"
      >
        <span class="h-3 w-3 rotate-45 border-b-2 border-r-2 border-current"></span>
      </a>
    </section>
  `,
})
export class HeroComponent {
  protected readonly portfolio = PORTFOLIO;
  protected readonly techBadges = [
    { label: 'ASP.NET Core' },
    { label: '.NET' },
    { label: 'Redis' },
    { label: 'Docker' },
  ];
}
