import { Component, Input} from '@angular/core';
import { Hyperlink } from 'src/app/models/entities/Hyperlinks';
import { fade } from 'src/app/animations/animations';

@Component({
  selector: 'app-hp-links',
  templateUrl: './hp-links.component.html',
  styleUrls: ['./hp-links.component.css'],
  animations:[
    fade
  ]
})
export class HpLinksComponent  {
  @Input() links: Hyperlink[] = [];
  language:string | null= localStorage.getItem('lang') || "";
  constructor() {}
}
