import { BASE_URL } from "../support/constants";

class HomePage {
  elements = {
    logo: () => cy.get(".nav-header-plus-logo"),
    searchInput: () => cy.get(".nav-search-input"),
  };

  visit() {
    cy.visit(BASE_URL);
    return this;
  }

  verifyLogoVisible() {
    this.elements.logo().should("be.visible");
    return this;
  }

  search(query: string) {
    this.elements.searchInput().type(`${query}{enter}`);
    return this;
  }
}

export default HomePage;
