import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nationalityEs',
  standalone: true,
})
export class NationalityEsPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }
    const normalized = value.toLowerCase().trim();
    const map: Record<string, string> = {
      american: 'Estadounidense',
      british: 'Británico',
      german: 'Alemán',
      spanish: 'Español',
      french: 'Francés',
      italian: 'Italiano',
      dutch: 'Neerlandés',
      belgian: 'Belga',
      mexican: 'Mexicano',
      canadian: 'Canadiense',
      australian: 'Australiano',
      brazilian: 'Brasileño',
      finnish: 'Finlandés',
      danish: 'Danés',
      swedish: 'Sueco',
      norwegian: 'Noruego',
      portuguese: 'Portugués',
      irish: 'Irlandés',
      polish: 'Polaco',
      romanian: 'Rumano',
      russian: 'Ruso',
      turkish: 'Turco',
      latvian: 'Letón',
      lithuanian: 'Lituano',
      croatian: 'Croata',
      slovenian: 'Esloveno',
      slovak: 'Eslovaco',
      czech: 'Checo',
      chinese: 'Chino',
      indian: 'Indio',
      japanese: 'Japonés',
      swiss: 'Suizo',
      thai: 'Tailandés',
      austrian: 'Austriaco',
      monegasque: 'Monegasco',
      newzealander: 'Neozelandés',
      argentine: 'Argentino',
      ukrainian: 'Ucraniano',
      hungarian: 'Húngaro',
      southafrican: 'Sudafricano',
      qatar: 'Catarí',
      saudiarabia: 'Saudí',
      uae: 'Emiratí',
    };

    const compact = normalized.replace(/\s+/g, '');
    return map[normalized] ?? map[compact] ?? value;
  }
}
