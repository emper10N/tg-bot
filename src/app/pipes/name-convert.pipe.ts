import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameConvert',
  standalone: true,
})
export class NameConvertPipe implements PipeTransform {
  transform(str: string): string {
    str = str.replace('_', '\n').replace('.jpg', '');
    return str;
  }
}
