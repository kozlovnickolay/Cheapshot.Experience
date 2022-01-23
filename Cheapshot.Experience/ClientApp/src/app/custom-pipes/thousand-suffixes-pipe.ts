import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandSuff'
})
export class ThousandSuffixesPipe implements PipeTransform {

  transform(input: any, fractionDigits?: any): any {
    const suffixes = ['K', 'M', 'B', 'T', 'P', 'E'];

    if (Number.isNaN(input)) {
      return null;
    }

    if (input < 1000)
      return input;

    const exp = Math.floor(Math.log(input) / Math.log(1000));
    const value = input / Math.pow(1000, exp);
    return value.toFixed((value ^ 0) === value ? 0 : fractionDigits) + suffixes[exp - 1];
  }
}