import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PORTFOLIO } from '../../core/portfolio.constants';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { ScrollFadeDirective } from '../../shared/directives/scroll-fade.directive';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { NgIcon } from '@ng-icons/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SectionTitleComponent, ScrollFadeDirective, ButtonComponent, CardComponent, NgIcon, ReactiveFormsModule],
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
      id="contact"
      class="py-20 bg-surface"
      appScrollFade
      (visible)="animateState.set('visible')"
      [@fadeInUp]="animateState()"
    >
      <div class="mx-auto max-w-5xl px-6">
        <app-section-title title="Get in Touch" subtitle="Have a project in mind or want to talk backend architecture?" />

        <div class="grid gap-8 md:grid-cols-12 items-start max-w-4xl mx-auto">
          <!-- Info Details -->
          <div class="md:col-span-5 space-y-6">
            <app-card>
              <h3 class="text-lg font-bold text-heading mb-4">Contact Info</h3>
              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ng-icon name="heroEnvelope" size="18" />
                  </span>
                  <div>
                    <h4 class="text-xs font-mono font-semibold tracking-wider text-muted uppercase">Email</h4>
                    <a [href]="'mailto:' + portfolio.email" class="text-sm font-semibold text-heading hover:text-primary transition-colors">
                      {{ portfolio.email }}
                    </a>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ng-icon name="heroMapPin" size="18" />
                  </span>
                  <div>
                    <h4 class="text-xs font-mono font-semibold tracking-wider text-muted uppercase">Location</h4>
                    <p class="text-sm font-semibold text-heading">
                      {{ portfolio.location }}
                    </p>
                  </div>
                </div>
              </div>
            </app-card>
          </div>

          <!-- Contact Form -->
          <div class="md:col-span-7">
            <app-card>
              @if (formSubmitted()) {
                <div class="text-center py-8">
                  <span class="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mx-auto mb-4">
                    <ng-icon name="heroCheckCircle" size="28" />
                  </span>
                  <h3 class="text-xl font-bold text-heading">Message Sent!</h3>
                  <p class="text-muted text-sm mt-2 max-w-xs mx-auto">
                    Thank you for reaching out. I will get back to you as soon as possible.
                  </p>
                  <button
                    type="button"
                    class="mt-6 text-sm font-semibold text-primary hover:underline cursor-pointer"
                    (click)="resetForm()"
                  >
                    Send another message
                  </button>
                </div>
              } @else {
                <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-4">
                  <div>
                    <label for="name" class="block text-xs font-mono font-semibold tracking-wider text-muted uppercase mb-1.5">Name</label>
                    <input
                      type="text"
                      id="name"
                      formControlName="name"
                      class="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder-muted/65 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                      placeholder="Your Name"
                    />
                    @if (contactForm.get('name')?.touched && contactForm.get('name')?.invalid) {
                      <span class="text-xs text-rose-500 mt-1 block">Name is required.</span>
                    }
                  </div>

                  <div>
                    <label for="email" class="block text-xs font-mono font-semibold tracking-wider text-muted uppercase mb-1.5">Email</label>
                    <input
                      type="email"
                      id="email"
                      formControlName="email"
                      class="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder-muted/65 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                      placeholder="email@example.com"
                    />
                    @if (contactForm.get('email')?.touched && contactForm.get('email')?.invalid) {
                      <span class="text-xs text-rose-500 mt-1 block">Please enter a valid email address.</span>
                    }
                  </div>

                  <div>
                    <label for="message" class="block text-xs font-mono font-semibold tracking-wider text-muted uppercase mb-1.5">Message</label>
                    <textarea
                      id="message"
                      formControlName="message"
                      rows="4"
                      class="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder-muted/65 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                      placeholder="What would you like to discuss?"
                    ></textarea>
                    @if (contactForm.get('message')?.touched && contactForm.get('message')?.invalid) {
                      <span class="text-xs text-rose-500 mt-1 block">Message must be at least 10 characters long.</span>
                    }
                  </div>

                  <div class="pt-2">
                    <app-button
                      type="submit"
                      variant="primary"
                      [disabled]="contactForm.invalid || formSubmitting()"
                      class="w-full"
                    >
                      {{ formSubmitting() ? 'Sending...' : 'Send Message' }}
                    </app-button>
                  </div>
                </form>
              }
            </app-card>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  protected readonly portfolio = PORTFOLIO;
  protected animateState = signal('void');
  protected contactForm: FormGroup;
  protected formSubmitting = signal(false);
  protected formSubmitted = signal(false);

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.formSubmitting.set(true);
      setTimeout(() => {
        this.formSubmitting.set(false);
        this.formSubmitted.set(true);
      }, 1000);
    }
  }

  resetForm(): void {
    this.contactForm.reset();
    this.formSubmitted.set(false);
  }
}
