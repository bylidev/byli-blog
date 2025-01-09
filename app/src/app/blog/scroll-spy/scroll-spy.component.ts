import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-scroll-spy',
  templateUrl: './scroll-spy.component.html',
  styleUrls: ['./scroll-spy.component.scss']
})
export class ScrollSpyComponent implements OnChanges, OnDestroy, AfterViewInit {

  @Input() headings: any[] | undefined;
  private observer: IntersectionObserver | null = null;
  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['headings']) {
      this.updateHeadings();
    }
  }

  ngAfterViewInit(): void {
    this.initIntersectionObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private initIntersectionObserver(): void {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.updateActiveLink(entry.target as HTMLElement);
          }
        });
      }, {root: null, rootMargin: '0px 0px -90% 0px', threshold: 0});
      this.updateHeadings();
  }

  private updateHeadings(): void {
    if (this.observer && this.headings) {
      // Disconnect previously observed elements
      this.headings.forEach(heading => {
        const element = document.getElementById(heading.id);
        if (element) {
          this.observer?.unobserve(element);
        }
      });

      // Observe new elements
      this.headings.forEach(heading => {
        const element = document.getElementById(heading.id);
        if (element) {
          this.observer?.observe(element);
        }
      });
    }
  }

  private updateActiveLink(activeElement: HTMLElement): void {
    if (this.headings) {
      this.headings.forEach(heading => {
        heading.active = heading.id === activeElement.id;
        this.cdr.detectChanges();
      });
    }
  }

  scrollToFragment(id: string): void {
    const target = document.querySelector('#' + id);
    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }


}
