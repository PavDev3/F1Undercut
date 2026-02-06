import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { animate, inView, stagger } from '@motionone/dom';

@Directive({
  selector: '[motionReveal]',
  standalone: true,
})
export class MotionRevealDirective implements OnInit, OnDestroy {
  @Input() motionRevealDelay = 0;
  @Input() motionRevealChildren = 'tbody tr, .card, .wiki-card, .standings-section';
  private cleanup?: () => void;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this.cleanup = inView(this.el.nativeElement, () => {
      const root = this.el.nativeElement;
      const children = Array.from(root.querySelectorAll(this.motionRevealChildren));
      if (children.length > 0) {
        children.forEach((el) => {
          (el as HTMLElement).style.opacity = '0';
          (el as HTMLElement).style.transform = 'translateY(16px)';
        });
        animate(
          children,
          { opacity: 1, transform: 'translateY(0px)' },
          {
            duration: 0.55,
            easing: 'ease-out',
            delay: stagger(0.04, { start: this.motionRevealDelay }),
          }
        );
      } else {
        root.style.opacity = '0';
        root.style.transform = 'translateY(16px)';
        animate(
          root,
          { opacity: 1, transform: 'translateY(0px)' },
          { duration: 0.55, easing: 'ease-out', delay: this.motionRevealDelay }
        );
      }
      return () => {};
    }, { amount: 0.12 });
  }

  ngOnDestroy() {
    if (this.cleanup) {
      this.cleanup();
    }
  }
}
