import HomePage from "../../../pages/home.page";
import ProductDetailPage from "../../../pages/product-detail.page";

import { API_STATS_URL, LISTADO_URL, REGISTRATION_URL } from "../../../support/constants";

describe("E-commerce Shopping Cart Test - Mercado Libre", () => {
  const productName = "google nest";
  const pageNumber = 2;
  const quantity = 2;

  beforeEach(() => {
    cy.intercept("GET", `${LISTADO_URL}/**`).as("listado");
    cy.intercept("POST", `${API_STATS_URL}**`).as("detail");
    cy.intercept("GET", `${REGISTRATION_URL}/**`).as("registration");
  });

  it("Should navigate to Mercado Libre's website and search for a product", () => {
    const homePage = new HomePage();

    homePage.visit();
    homePage.verifyLogoVisible();
    homePage.search(productName);
  });

  it("Should scroll to the bottom and navigate to the second page", () => {
    cy.origin(LISTADO_URL, { args: { pageNumber } }, ({ pageNumber }) => {
      const SearchResultsPage = Cypress.require("../../../pages/search-result.page").default;
      const searchResultsPage = new SearchResultsPage();
      searchResultsPage.verifyResultsVisible();
      searchResultsPage.scrollToBottom();
      searchResultsPage.goToPage(pageNumber);
    });

    cy.wait("@listado").its("response.statusCode").should("eq", 200);
  });

  it("Should select a product with free shipping that is not the first one", () => {
    cy.origin(LISTADO_URL, () => {
      const SearchResultsPage = Cypress.require("../../../pages/search-result.page").default;
      const searchResultsPage = new SearchResultsPage();
      searchResultsPage.verifyResultsVisible();
      searchResultsPage.selectProductWithFreeShipping();
    });

    cy.wait("@detail");
  });

  it("Should change product quantity and attempt to add it to shopping cart", () => {
    const productDetailPage = new ProductDetailPage();
    productDetailPage.verifyTitleVisible();
    productDetailPage.openQuantitySelector();
    productDetailPage.verifyQuantityDropdownVisible();
    productDetailPage.selectQuantity(quantity);
    productDetailPage.clickToAddCart();
  });
});
