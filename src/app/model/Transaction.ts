import { InputData } from "./InputData";

export interface Transaction {
    tName: string;
    tStatus:string;
    inputData:InputData[];
  }