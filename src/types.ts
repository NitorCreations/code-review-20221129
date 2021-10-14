export interface Datum {
  timeStamp: string;
  value: number;
  measurementPoint: {
    id: string;
    name: string;
  };
  isNotValidData?: boolean;
}

export type Data = Array<Datum>;

export interface CatFact {
  id: string;
  fact: string;
}
