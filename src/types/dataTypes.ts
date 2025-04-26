export interface SpendData {
    current: number;
    reference: number;
    absoluteChange: number;
    percentChange: number;
  }
  
  export interface UserData {
    country: string;
    state: string;
    city: string;
    sector: string;
    category: string;
    startDate: string;
    endDate: string;
    mySpend: SpendData;
    sameStoreSpend: SpendData;
    newStoreSpend: SpendData;
    lostStoreSpend: SpendData;
  }
  