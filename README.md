# Wrisk Broker Fee Validation - Playwright Automation POC

## Overview

This repository contains a Playwright-based automation proof of concept (POC) created for the Wrisk Broker Fee rollout assessment.

The objective is to validate the business rule associated with the introduction of a mandatory Broker Fee of £1.25 and ensure that quote calculations behave correctly for different customer types.

---

## Business Requirements

Wrisk is introducing a mandatory Broker Fee of £1.25 per month.

### Rules

* Broker Fee applies to all supported brands.
* Broker Fee applies to:

  * New Bind customers
  * Renewal customers
* Existing customers must not be charged the Broker Fee during the rollout phase.
* Broker Fee must be included in the monthly premium calculation when applicable.
* Broker Fee must be disclosed separately in quote and invoice breakdowns.

---

## Solution Approach

As no live application, API endpoint, Swagger specification, or UI URL was provided as part of the exercise, mocked quote responses were created to simulate backend behaviour.

The automation framework validates the business rules against these mocked responses.

The solution focuses on:

* Calculation validation
* Broker Fee applicability validation
* Response structure validation
* Customer type validation
* Multi-brand coverage

---

## Technology Stack

* Playwright
* TypeScript
* Node.js
* dotenv

---

## Project Structure

```text
.
├── mocks
│   └── quoteResponses.ts
│
├── pages
│   └── LoginPage.ts
│
├── tests
│   ├── api
│   │   └── brokerFeeCalculation.spec.ts
│   │
│   └── ui
│       ├── existingCustomerQuote.spec.ts
│       ├── renewalCustomerQuote.spec.ts
│       └── newBindCustomerQuote.spec.ts
│
├── playwright.config.ts
├── package.json
└── README.md
```

---

## Mock Data

Mock quote responses have been created for multiple brands and customer types.

Example:

```typescript
{
  brand: 'Volvo',
  customerType: 'NEW_BIND',
  premium: 100,
  tax: 5,
  brokerFee: 1.25,
  total: 106.25
}
```

Supported customer types:

* NEW_BIND
* RENEWAL
* EXISTING_CUSTOMER

Supported brands:

* Volvo
* BMW
* Jaguar
* Land Rover

---

## API Test Coverage

The API test suite validates:

### Response Validation

* Mandatory fields are present
* Response fields are not null
* Valid customer type values are returned

### Broker Fee Validation

* NEW_BIND receives £1.25 Broker Fee
* RENEWAL receives £1.25 Broker Fee
* EXISTING_CUSTOMER receives no Broker Fee

### Calculation Validation

For applicable customers:

```text
Total = Premium + Broker Fee
```

For existing customers:

```text
Total = Premium 
```

### Multi-Brand Validation

The same business rules are validated across all supported brands.

---

## UI Automation Approach

As no application URL, UI design, credentials, or DOM structure were provided, UI automation examples have been included for demonstration purposes only.

The UI tests demonstrate:

* Page Object Model implementation
* Login workflow
* Quote page validation
* Existing customer validation
* Renewal customer validation
* New Bind customer validation

### Important

UI tests are intentionally skipped and are not executed as part of the automated run.

This prevents failures caused by unavailable environments while still demonstrating the proposed automation approach.

---

## Assumptions

The following assumptions were made during implementation:

* Quote API returns:

  * brand
  * customerType
  * premium
  * brokerFee
  * total

* All fields are mandatory.

* Financial fields are expected to contain valid numeric values.

* Broker Fee amount is fixed at £1.25 whenever applicable.

* Existing customers are not charged the Broker Fee.

* Total value represents the final amount payable.

---

## Running The Tests

Install dependencies:

```bash
npm install
```

Install Playwright Browsers

```bash
npx playwright install
```

Execute Playwright tests:

```bash
npx playwright test
```

Execute a specific test file:

```bash
npx playwright test tests/api/brokerFeeCalculation.spec.ts
```

Generate and Open Report
```bash
npx playwright show-report
---

## Notes
* Mocked responses were used as permitted by the assessment requirements.
* No production data, credentials, or sensitive information are stored within this repository.
* The framework can be extended to consume real API responses with minimal changes if live endpoints become available.

---

## Author

Sakshi Shrivastav

Senior QA Automation Engineer
