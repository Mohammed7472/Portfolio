import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideIcons } from '@ng-icons/core';
import {
  heroArrowDown,
  heroArrowRight,
  heroArrowTopRightOnSquare,
  heroBars3,
  heroBriefcase,
  heroCheckCircle,
  heroCircleStack,
  heroCodeBracket,
  heroCommandLine,
  heroCube,
  heroEnvelope,
  heroMapPin,
  heroPaperAirplane,
  heroSparkles,
  heroWrenchScrewdriver,
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
      heroArrowRight,
      heroArrowTopRightOnSquare,
      heroBars3,
      heroBriefcase,
      heroCheckCircle,
      heroCircleStack,
      heroCodeBracket,
      heroCommandLine,
      heroCube,
      heroEnvelope,
      heroEnvelopeSolid,
      heroGlobeAltSolid,
      heroMapPin,
      heroPaperAirplane,
      heroSparkles,
      heroWrenchScrewdriver,
      heroXMark,
    }),
  ],
};
