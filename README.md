# Crombie QA Automation Challenge

This project implements automated tests for Mercado Libre e-commerce website using Cypress and TypeScript, following Page Object Model (POM) design pattern and Object-Oriented Programming principles.

## Overview

This solution addresses the Crombie QA Automation Challenge for testing an e-commerce application. The automated test suite follows these specific steps from the challenge requirements:

1. Navigate to Mercado Libre's website
2. Search for a specific product in the search engine
3. Scroll to the bottom and navigate to the second page of results
4. Select a product with "Free Shipping" that is not the first one in the list
5. Change the default quantity and attempt to add it to the shopping cart
6. Validate that the account creation section appears (if applicable)

## Requirements

- Node.js (>= 18.20.8)
- npm (>= 10.8.2)

## Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/JMartinezTest/challenge.git
   cd challenge
   git checkout test
2. **Install dependencies**:

```bash
npm install
```

## Running Tests

### Open Cypress Test Runner

To open Cypress in interactive mode:

```bash
npm run cy:open
```

Then select E2E Testing and choose your preferred browser to run the tests.

### Run Tests in Headless Mode

To run tests in headless mode

```bash
npx test
```

## Code Quality

This project uses ESLint to maintain code quality and consistent style:

```bash
npm run lint
```

## Test Implementation Details

### Page Objects

The tests follow the Page Object Model pattern:

- **HomePage**: Manages interactions with the Mercado Libre homepage
- **SearchResultsPage**: Handles search results pagination and product selection
- **ProductDetailPage**: Manages product details and shopping cart interactions

### Test Flow

1. **Navigation to Mercado Libre**: Opens the website and verifies the page is loaded
2. **Product Search**: Searches for a specified product
3. **Pagination**: Scrolls to the bottom and navigates to the second page of results
4. **Product Selection**: Selects a product with "Free Shipping" (not the first one)
5. **Quantity Modification**: Changes the product quantity and attempts to add to cart

### Technical Notes

#### Cross-Origin Handling with cy.origin()

This project uses Cypress's `cy.origin()` command to handle cross-origin navigation between different Mercado Libre domains. This is necessary because the application flow navigates from the main domain (`mercadolibre.com.ar`) to the listing domain (`listado.mercadolibre.com.ar`).

The `cy.origin()` command allows the test to:

- Continue test execution across different origins
- Maintain context and state across domain changes
- Handle the search results page which exists on a different subdomain

Implementation challenges with `cy.origin()` include:

- Page objects must be required within the origin callback using `Cypress.require()`
- The implementation requires the `experimentalOriginDependencies` flag in Cypress configuration

## Author

Jorge Mario Martinez
