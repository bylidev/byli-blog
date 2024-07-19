import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
// @ts-ignore
import Gumshoe from 'gumshoejs';

@Component({
  selector: 'app-scroll-spy',
  templateUrl: './scroll-spy.component.html',
  styleUrls: ['./scroll-spy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollSpyComponent implements AfterViewInit{

  @Input()
  headings: Element[] | undefined;
  @ViewChild('scrollContainer', { static: true }) scrollContainer: ElementRef | undefined;

  private scrollSpy: Gumshoe | undefined;
  ngAfterViewInit(): void {
    // Inicializar Gumshoe
    this.scrollSpy = new Gumshoe('.scrollspy-nav a', {
      offset: 60, // Ajusta según la altura de tu header
      scrollDelay: 0,
      callback: (e:any) => {
        console.log('Navegación activa:', e);
      }
    });

    // Configurar el comportamiento de scrollToFragment
    // Puedes llamar a esta función según sea necesario en tu componente
  }
   scrollToFragment(fragment: string): void {
     const container = this.scrollContainer?.nativeElement;
     const target = container.querySelector('#' + fragment);

     if (target) {
       container.scrollTop = target.offsetTop;
     }
  }


}
