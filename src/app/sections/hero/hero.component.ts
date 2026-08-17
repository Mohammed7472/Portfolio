import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PORTFOLIO } from '../../core/portfolio.constants';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('heroEntrance', [
      transition(':enter', [
        query('.animate-item', [
          style({ opacity: 0, transform: 'translateY(24px)' }),
          stagger(120, [
            animate('800ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ],
  styles: [`
    .grid-bg {
      background-color: #0B1120;
      background-image: 
        radial-gradient(rgba(56, 189, 248, 0.04) 1.2px, transparent 1.2px);
      background-size: 24px 24px;
    }
    .cursor-blink {
      border-right: 3px solid #38BDF8;
      animation: blink 0.75s step-end infinite;
    }
    @keyframes blink {
      from, to { border-color: transparent }
      50% { border-color: #38BDF8; }
    }
    .typing-text {
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      animation: typing 2.5s steps(22, end) forwards;
      animation-delay: 0.5s;
      width: 0;
    }
    @keyframes typing {
      from { width: 0 }
      to { width: 100% }
    }
  `],
  template: `
    <section
      id="home"
      class="grid-bg relative flex min-h-screen items-center justify-center overflow-hidden py-20"
    >
      <!-- Background Ambient Glows -->
      <div class="absolute top-1/4 left-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[100px] animate-pulse-glow"></div>
      <div class="absolute bottom-1/4 right-1/4 -z-10 h-[350px] w-[350px] rounded-full bg-accent/5 blur-[120px] animate-pulse-glow animate-float-delayed"></div>

      <div 
        class="mx-auto max-w-4xl px-6 text-center z-10"
        [@heroEntrance]="true"
      >
        <span class="animate-item inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3.5 py-1 text-xs font-semibold text-accent">
          <span class="h-1.5 w-1.5 rounded-full bg-accent animate-ping"></span>
          {{ portfolio.location }}
        </span>

        <h1 class="animate-item mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
          Hi, I'm <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{{ portfolio.name }}</span>
        </h1>

        <div class="animate-item mt-4 h-12 flex items-center justify-center">
          <p class="text-xl font-bold text-accent sm:text-2xl cursor-blink typing-text">
            Backend (.NET) Developer
          </p>
        </div>

        <p class="animate-item mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
          {{ portfolio.tagline }}
        </p>

        <div class="animate-item mt-10 flex flex-wrap items-center justify-center gap-4">
          <app-button variant="primary" href="#projects">
            View Projects
          </app-button>
          <app-button variant="outline" [href]="portfolio.cvUrl" class="!border-white/20 !text-white hover:!bg-white/10" target="_blank" rel="noopener noreferrer">
            Download CV
          </app-button>
          <app-button variant="outline" href="#contact" class="!border-white/20 !text-white hover:!bg-white/10">
            Contact Me
          </app-button>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {
  protected readonly portfolio = PORTFOLIO;
}
