import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusEs',
  standalone: true,
})
export class StatusEsPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }
    const normalized = value.toLowerCase().trim();
    const map: Record<string, string> = {
      finished: 'Finalizado',
      'disqualified': 'Descalificado',
      'not classified': 'No clasificado',
      'did not qualify': 'No clasificó',
      'did not start': 'No tomó la salida',
      'withdrawn': 'Retirado',
      'retired': 'Retirado',
      'accident': 'Accidente',
      'collision': 'Colisión',
      'engine': 'Motor',
      'gearbox': 'Caja de cambios',
      'transmission': 'Transmisión',
      'brakes': 'Frenos',
      'electrical': 'Eléctrico',
      'hydraulics': 'Hidráulico',
      'suspension': 'Suspensión',
      'steering': 'Dirección',
      'oil leak': 'Fuga de aceite',
      'fuel pump': 'Bomba de combustible',
      'fuel leak': 'Fuga de combustible',
      'fuel pressure': 'Presión de combustible',
      'spun off': 'Trompo',
      'puncture': 'Pinchazo',
      'damage': 'Daños',
      'wheel': 'Rueda',
      'tyre': 'Neumático',
      'clutch': 'Embrague',
      'overheating': 'Sobrecalentamiento',
      'power unit': 'Unidad de potencia',
      'battery': 'Batería',
      'mechanical': 'Mecánico',
      'lapped': 'Doblado',
    };

    return map[normalized] ?? value;
  }
}
