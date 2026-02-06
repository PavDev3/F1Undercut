import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flagClass',
  standalone: true,
})
export class FlagClassPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }
    const normalized = this.normalize(value);
    const mapped = this.mapSpecial(normalized);
    return mapped.replaceAll(' ', '');
  }

  private normalize(value: string) {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  private mapSpecial(value: string) {
    const key = value.toLowerCase();
    const map: Record<string, string> = {
      argentina: 'Argentine',
      'united states': 'UnitedStates',
      usa: 'UnitedStates',
      american: 'American',
      'united kingdom': 'UK',
      uk: 'UK',
      british: 'British',
      england: 'UK',
      'great britain': 'UK',
      'united arab emirates': 'UAE',
      uae: 'UAE',
      'saudi arabia': 'SaudiArabia',
      netherlands: 'Netherlands',
      dutch: 'Dutch',
      mexico: 'Mexico',
      mexican: 'Mexican',
      belgium: 'Belgium',
      belgian: 'Belgium',
      denmark: 'Danish',
      danish: 'Danish',
      finland: 'Finnish',
      finnish: 'Finnish',
      sweden: 'Swedish',
      swedish: 'Swedish',
      norway: 'NO',
      norwegian: 'NO',
      portugal: 'PT',
      portuguese: 'PT',
      ireland: 'IE',
      irish: 'IE',
      poland: 'PL',
      polish: 'PL',
      romania: 'RO',
      romanian: 'RO',
      russia: 'RU',
      russian: 'RU',
      turkey: 'TR',
      turkish: 'TR',
      latvia: 'LV',
      latvian: 'LV',
      lithuania: 'LT',
      lithuanian: 'LT',
      croatia: 'HR',
      croatian: 'HR',
      slovenia: 'SI',
      slovenian: 'SI',
      slovakia: 'SK',
      slovak: 'SK',
      'czech republic': 'CZ',
      czech: 'CZ',
      china: 'China',
      chinese: 'Chinese',
      india: 'IN',
      indian: 'IN',
      japan: 'Japan',
      japanese: 'Japanese',
      spain: 'Spain',
      spanish: 'Spanish',
      france: 'France',
      french: 'French',
      germany: 'Germany',
      german: 'German',
      italy: 'Italy',
      italian: 'Italian',
      australia: 'Australia',
      australian: 'Australian',
      canada: 'Canada',
      canadian: 'Canadian',
      brazil: 'Brazil',
      brazilian: 'Brazilian',
      austria: 'Austria',
      austrian: 'Austrian',
      monaco: 'Monaco',
      monegasque: 'Monegasque',
      switzerland: 'Swiss',
      swiss: 'Swiss',
      thailand: 'Thai',
      thai: 'Thai',
      'new zealand': 'NewZealander',
      'new zealander': 'NewZealander',
      'south africa': 'ZA',
      'south african': 'ZA',
    };
    return map[key] ?? value;
  }
}
