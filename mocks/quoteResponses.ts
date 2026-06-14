export interface QuoteResponse {
  brand: string;
  customerType: 'NEW_BIND' | 'RENEWAL' | 'EXISTING_CUSTOMER';
  premium: number;
  brokerFee: number;
  total: number;
}

const BROKER_FEE = 1.25;

export const quoteResponses : QuoteResponse[] = [
  {
    brand: 'Volvo',
    customerType: 'NEW_BIND',
    premium: 100,
    brokerFee: BROKER_FEE,
    total: 101.25
  },
  {
    brand: 'BMW',
    customerType: 'RENEWAL',
    premium: 100,
    brokerFee: BROKER_FEE,
    total: 101.25
  },
  {
    brand: 'Jaguar',
    customerType: 'EXISTING_CUSTOMER',
    premium: 100,
    brokerFee: 0,
    total: 100
  },
  {
    brand: 'Land Rover',
    customerType: 'NEW_BIND',
    premium: 100,
    brokerFee: BROKER_FEE,
    total: 101.25
  }
];