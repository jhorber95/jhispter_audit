export interface ICar {
  id?: number;
  color?: string;
  engine?: string;
  typeFuel?: string;
}

export class Car implements ICar {
  constructor(public id?: number, public color?: string, public engine?: string, public typeFuel?: string) {}
}
