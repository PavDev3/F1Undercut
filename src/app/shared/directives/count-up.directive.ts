import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[countUp]',
  standalone: true,
})
export class CountUpDirective implements OnChanges {
  @Input('countUp') value: number | string | null = null;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['value']) {
      return;
    }
    const target = Number(this.value);
    if (!Number.isFinite(target)) {
      this.el.nativeElement.textContent = `${this.value ?? ''}`;
      return;
    }
    const duration = 500;
    const start = performance.now();
    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const current = Math.floor(progress * target);
      this.el.nativeElement.textContent = `${current}`;
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }
}
