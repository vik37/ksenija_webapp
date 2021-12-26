import { Pipe, PipeTransform } from '@angular/core';
import { Genre } from '../models/enums/Genre';

@Pipe({
  name: 'enumToString'
})
export class EnumToStringPipe implements PipeTransform {

  transform(value: Genre|undefined): string {
    var genre: string = Genre[value?value:0];
    return genre;
  }

}
