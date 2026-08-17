import { Component } from '@angular/core';
import { NavbarComponent } from './sections/navbar/navbar.component';
import { HeroComponent } from './sections/hero/hero.component';
import { AboutComponent } from './sections/about/about.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { ExperienceComponent } from './sections/experience/experience.component';
import { ResumeComponent } from './sections/resume/resume.component';
import { ContactComponent } from './sections/contact/contact.component';
import { FooterComponent } from './sections/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    ResumeComponent,
    ContactComponent,
    FooterComponent
  ],
  template: `
    <div class="relative min-h-screen overflow-x-hidden bg-surface">
      <!-- Background Ambient Glows -->
      <div class="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <div class="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
        <div class="absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl"></div>
        <div class="absolute -bottom-40 right-1/3 h-72 w-72 rounded-full bg-primary/5 blur-3xl"></div>
      </div>

      <app-navbar />
      <main>
        <app-hero />
        <app-about />
        <app-skills />
        <app-projects />
        <app-experience />
        <app-resume />
        <app-contact />
      </main>
      <app-footer />
    </div>
  `,
})
export class AppComponent {}
