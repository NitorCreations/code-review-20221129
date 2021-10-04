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
