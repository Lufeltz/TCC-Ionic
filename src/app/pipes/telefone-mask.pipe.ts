import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefoneMask',
  standalone: true,
})
export class TelefoneMaskPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const cleaned = value.replace(/\D/g, '');

    const match = cleaned.match(/^(\d{2})(\d{1})(\d{4})(\d{4})$/);

    if (match) {
      return `(${match[1]}) ${match[2]} ${match[3]}-${match[4]}`;
    }

    return value;
  }
}
