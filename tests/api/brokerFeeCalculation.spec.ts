import { test, expect } from '@playwright/test';
import { quoteResponses }  from '../../mocks/quoteResponses';

quoteResponses.forEach((quote) => {

test(`Verify quote response contains all mandatory fields for ${quote.brand}`, async () => {
  expect(quote).toHaveProperty('brand');
  expect(quote).toHaveProperty('customerType');
  expect(quote).toHaveProperty('premium');
  expect(quote).toHaveProperty('brokerFee');
  expect(quote).toHaveProperty('total');
});

test(`Verify quote response fields are not null for ${quote.brand}`, async () => {
  expect(quote.brand).not.toBeNull()
  expect(quote.customerType).not.toBeNull()
  expect(quote.premium).not.toBeNull()
  expect(quote.brokerFee).not.toBeNull()
  expect(quote.total).not.toBeNull()
});

test(`Verify financial fields are numeric for ${quote.brand}`, () => {
    expect(typeof quote.premium).toBe('number');
    expect(typeof quote.brokerFee).toBe('number');
    expect(typeof quote.total).toBe('number');
});

test(`Verify if the broker fee in the response is NEW BIND then broker fee has to be 1.25 for ${quote.brand}`, async () => {
if(quote.customerType === 'NEW_BIND'){
   expect(quote.brokerFee).toBe(1.25);
}
});

test(`Verify if the broker fee in the response is RENEWAL then broker fee has to be 1.25 ${quote.brand}` , async () => {
if(quote.customerType === 'RENEWAL'){
   expect(quote.brokerFee).toBe(1.25);
}
});

test(`Verify if the broker fee in the response is EXISTING_CUSTOMER then broker fee has to be 0 for ${quote.brand}`, async () => {
if(quote.customerType === 'EXISTING_CUSTOMER'){
   expect(quote.brokerFee).toBe(0);
}
});

test(`Verify total calculation with api ${quote.customerType} - ${quote.brand}`, async () => {
expect(quote.total)
 .toBe(quote.premium + quote.brokerFee);
});

test(`Verify the premium fee, broker fee and total are not negatives for ${quote.brand}`, async () => {
expect(quote.brokerFee).toBeGreaterThanOrEqual(0);
expect(quote.premium).toBeGreaterThan(0);
});

test(`Verify the total fee is always equal to or greater than premium fee for ${quote.brand}`, async () => {
expect(quote.total)
  .toBeGreaterThanOrEqual(quote.premium);
});

})