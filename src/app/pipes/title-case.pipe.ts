import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCase',
  standalone: true
})
export class TitleCasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    return value
      .replace(/_/g, ' ') // Substitui os underlines por espaços
      .toLowerCase() // Transforma tudo em minúsculas
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Coloca a primeira letra de cada palavra em maiúscula
  }
}
