import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

const easeOutQuart = 'cubic-bezier(0.25, 1, 0.5, 1)';
const easeSpring = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

export const fadeInUp = trigger('fadeInUp', [
  transition(':enter, void => visible', [
    style({ opacity: 0, transform: 'translateY(24px)' }),
    animate(`500ms ${easeOutQuart}`, style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('400ms ease', style({ opacity: 1 }))
  ])
]);

export const slideInLeft = trigger('slideInLeft', [
  transition(':enter, void => visible', [
    style({ opacity: 0, transform: 'translateX(-40px)' }),
    animate(`500ms ${easeOutQuart}`, style({ opacity: 1, transform: 'translateX(0)' }))
  ])
]);

export const slideInRight = trigger('slideInRight', [
  transition(':enter, void => visible', [
    style({ opacity: 0, transform: 'translateX(40px)' }),
    animate(`500ms ${easeOutQuart}`, style({ opacity: 1, transform: 'translateX(0)' }))
  ])
]);

export const modalAnimation = trigger('modalAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.92) translateY(16px)' }),
    animate(`300ms ${easeSpring}`, style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.95) translateY(8px)' }))
  ])
]);

export const staggerChildren = trigger('staggerChildren', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      stagger(80, [
        animate(`400ms ${easeOutQuart}`, style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true })
  ])
]);


export const heroEntrance = trigger('heroEntrance', [
  transition(':enter', [
    query('.hero-reveal', [
      style({ opacity: 0, transform: 'translateY(24px)' }),
      stagger(100, [animate(`500ms ${easeOutQuart}`, style({ opacity: 1, transform: 'translateY(0)' }))])
    ], { optional: true })
  ])
]);
