import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideIcons } from '@ng-icons/core';
import {
  heroArrowDown,
  heroArrowTopRightOnSquare,
  heroBars3,
  heroBriefcase,
  heroCheckCircle,
  heroCommandLine,
  heroEnvelope,
  heroMapPin,
  heroXMark,
} from '@ng-icons/heroicons/outline';
import {
  heroEnvelopeSolid,
  heroGlobeAltSolid,
} from '@ng-icons/heroicons/solid';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimations(),
    provideIcons({
      heroArrowDown,
      heroArrowTopRightOnSquare,
      heroBars3,
      heroBriefcase,
      heroCheckCircle,
      heroCommandLine,
      heroEnvelope,
      heroEnvelopeSolid,
      heroGlobeAltSolid,
      heroMapPin,
      heroXMark,
    }),
  ],
};
