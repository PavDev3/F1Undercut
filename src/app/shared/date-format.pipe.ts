import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(2);

    return `${day}/${month}/${year}`;
  }
}

@Pipe({
  standalone: true,
  name: 'timeFormat',
})
export class HoraFormatoPipe implements PipeTransform {
  transform(hora: string | undefined): string {
    if (!hora) {
      return '-';
    }
    const horaSinZona = hora.split('Z')[0];
    return horaSinZona.substr(0, 5);
  }
}
