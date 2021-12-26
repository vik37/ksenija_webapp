import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tranformEnum'
})

export class TranformEnumPipe implements PipeTransform {
  transform(value: Object) {
    return Object.keys(value).filter(e => !isNaN(+e)).map(o => { return {index: +o, name: value[o]}});
  }
}
