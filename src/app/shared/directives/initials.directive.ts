import { prepareSyntheticListenerFunctionName } from '@angular/compiler/src/render3/util';
import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Intern } from 'src/app/core/models/intern';
import { BubbleConfig } from './configs/bubble-config';

@Directive({
  selector: '[appInitials]'
})
export class InitialsDirective implements OnInit {
  @Input() public intern!: Intern | null;

   @Input() config: any = {
   height : '2em',
    width: '2em',
    lineHeight: '2em',
    backgroundColor: 'rgba(127, 127, 127, 0.7)',
    borderRadius: '50%',
    verticalAlign: 'middle',
    textAlign: 'center',
    color: '#fff',
    //en camelCase => pas de tiret
  }

  private nativeElement: HTMLElement;  //dans l'enveloppe => div en question
  private stylesMap: Map<string, string> = new Map<string, string>();

  constructor(
    private renderer: Renderer2,
    elementRef: ElementRef   //rel  à la div où est appliqué la directive eneveloppe
  ) {
    this.nativeElement = elementRef.nativeElement;

    //Sets styles as a Map
    // this.stylesMap
    //   .set ('height', '2em')
    //   .set ('width', '2em')
    //   .set ('line-height', '2em')
    //   .set ('background-color', 'rgba(127, 127, 127, 0.7')
    //   .set ('font-weight', 'bold')
    //   .set ('border-radius', '50%')
    //   .set('vertical-align', 'middle')
    //   .set ('text-align', 'center');
      //chainage de méthodes car le type de retour est le même
  }


  public ngOnInit(): void {

    const config: BubbleConfig = new BubbleConfig().deserialize(this.config)

    for (const property in this.config){
      this.renderer.setStyle(this.nativeElement, property, this.config[property]);
    }

    const initials: string = this.intern!.name!.charAt(0).toUpperCase() + this.intern!.firstname!.charAt(0).toUpperCase();

    this.nativeElement.innerHTML = initials;

  }
}
