import { Directive, ElementRef, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appScrollFade]',
  standalone: true
})
export class ScrollFadeDirective implements OnInit, OnDestroy {
  @Output() visible = new EventEmitter<boolean>();
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.visible.emit(true);
        this.observer.disconnect(); // Animate once when it enters the viewport
      }
    }, { threshold: 0.1 });
    
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
