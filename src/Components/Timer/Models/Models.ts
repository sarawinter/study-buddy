export interface TimerProps {
  timerArgs?: number[];
  someFunc?: (str: string) => void;
  stuff?: IStuff[];
  myEnumType?: EMyEnum;
}

interface IStuff {
  srt: string;
  num: number;
  strArr: string[];
}

export enum EMyEnum {
  ONE,
  TWO,
  THREE,
}