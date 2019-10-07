export interface IDog {
  id?: number;
  name?: string;
  color?: string;
}

export class Dog implements IDog {
  constructor(public id?: number, public name?: string, public color?: string) {}
}
