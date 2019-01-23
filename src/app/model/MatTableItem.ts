import { Transaction } from "./Transaction";

export interface MatTableItem {
    id: string;
    name: string;
    userSystem:string;
    user:string;
    status:string;
    date:string;
    transactions:Transaction[];
  }