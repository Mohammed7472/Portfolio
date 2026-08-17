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
    <div class="min-h-screen overflow-x-hidden bg-bg-base text-text-primary">
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
