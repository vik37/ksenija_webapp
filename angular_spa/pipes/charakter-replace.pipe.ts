import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'charakterReplace'
})
export class CharakterReplacePipe implements PipeTransform {
  transform(value: string): string {
    const replace = value.replace('_',' ');
    return replace;
  }

}
