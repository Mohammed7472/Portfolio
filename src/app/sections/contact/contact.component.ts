import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { PORTFOLIO } from '../../core/portfolio.constants';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { fadeIn, fadeInUp } from '../../shared/animations/animations';
import { ScrollFadeDirective } from '../../shared/directives/scroll-fade.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgIcon, ButtonComponent, ScrollFadeDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn, fadeInUp],
  template: `
    <section id="contact" class="section-shell bg-bg-subtle" appScrollFade (visible)="visible.set(true)">
      <div class="portfolio-container grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-start md:gap-16">
        <div [@fadeIn]="visible()" class="pt-2">
          <p class="text-[12px] font-bold uppercase tracking-[0.22em] text-accent">Get In Touch</p>
          <h2 class="mt-4 max-w-md font-display text-[clamp(36px,5vw,56px)] font-extrabold leading-[1.05] text-text-primary">Let's build something great.</h2>
          <p class="mt-6 max-w-md text-[16px] leading-7 text-text-secondary">Have a backend challenge, a product idea, or a team that needs a reliable .NET engineer? I would love to hear about it.</p>
          <div class="mt-10 space-y-6">
            <div class="flex items-start gap-4"><span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bg-elevated text-accent"><ng-icon name="heroMapPin" size="19" /></span><div><p class="text-[12px] uppercase tracking-[0.15em] text-text-muted">Location</p><p class="mt-1 text-[15px] text-text-primary">{{ portfolio.location }}</p></div></div>
            <div class="flex items-start gap-4"><span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bg-elevated text-accent"><ng-icon name="heroEnvelope" size="19" /></span><div><p class="text-[12px] uppercase tracking-[0.15em] text-text-muted">Email</p><a class="mt-1 block text-[15px] text-text-primary transition-colors hover:text-accent" [href]="'mailto:' + portfolio.email">{{ portfolio.email }}</a></div></div>
            <div class="flex items-start gap-4"><span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bg-elevated text-accent"><ng-icon name="heroBriefcase" size="19" /></span><div><p class="text-[12px] uppercase tracking-[0.15em] text-text-muted">Availability</p><p class="mt-1 text-[15px] text-text-primary">{{ portfolio.rolePreference }}</p></div></div>
          </div>
        </div>

        <form [formGroup]="contactForm" (ngSubmit)="submit()" [@fadeInUp]="visible()" class="rounded-[20px] border border-border bg-bg-elevated p-7 md:p-10">
          <div class="grid gap-5 sm:grid-cols-2">
            <label class="block"><span class="mb-2 block text-[13px] font-medium text-text-secondary">Name</span><input formControlName="name" type="text" placeholder="Your name" class="w-full rounded-[10px] border border-border bg-bg-subtle px-4 py-3 text-[15px] text-text-primary placeholder-text-muted outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary-glow" /><span class="mt-1 block text-[12px] text-red-400" [class.invisible]="!showError('name')">Please enter your name.</span></label>
            <label class="block"><span class="mb-2 block text-[13px] font-medium text-text-secondary">Email</span><input formControlName="email" type="email" placeholder="you@example.com" class="w-full rounded-[10px] border border-border bg-bg-subtle px-4 py-3 text-[15px] text-text-primary placeholder-text-muted outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary-glow" /><span class="mt-1 block text-[12px] text-red-400" [class.invisible]="!showError('email')">Enter a valid email.</span></label>
          </div>
          <label class="mt-2 block"><span class="mb-2 block text-[13px] font-medium text-text-secondary">Message</span><textarea formControlName="message" rows="6" placeholder="Tell me a little about your project..." class="w-full resize-y rounded-[10px] border border-border bg-bg-subtle px-4 py-3 text-[15px] leading-6 text-text-primary placeholder-text-muted outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary-glow"></textarea><span class="mt-1 block text-[12px] text-red-400" [class.invisible]="!showError('message')">Please add a short message.</span></label>
          <app-button variant="primary" type="submit" class="mt-4 w-full" [disabled]="formSubmitting() || formSubmitted()"><ng-icon [name]="formSubmitted() ? 'heroCheckCircle' : 'heroPaperAirplane'" class="mr-2" size="18" />{{ formSubmitted() ? 'Message sent!' : (formSubmitting() ? 'Sending...' : 'Send Message') }}</app-button>
        </form>
      </div>
    </section>
  `,
})
export class ContactComponent {
  protected readonly portfolio = PORTFOLIO;
  protected readonly visible = signal(false);
  protected readonly formSubmitting = signal(false);
  protected readonly formSubmitted = signal(false);
  protected readonly contactForm;

  constructor(private readonly formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  protected showError(controlName: 'name' | 'email' | 'message'): boolean {
    const control = this.contactForm.controls[controlName];
    return control.invalid && control.touched;
  }

  protected submit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.formSubmitting.set(true);
    window.setTimeout(() => {
      this.formSubmitting.set(false);
      this.formSubmitted.set(true);
    }, 900);
  }
}
