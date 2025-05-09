class SearchResultsPage {
  elements = {
    resultLayout: () => cy.get(".ui-search-layout"),
    paginationLinks: () => cy.get(".andes-pagination__link"),
    productItems: () => cy.get(".ui-search-layout__item"),
  };

  verifyResultsVisible() {
    this.elements.resultLayout().should("be.visible");
    return this;
  }

  goToPage(pageNumber: number) {
    this.elements
      .paginationLinks()
      .should("exist", { message: "Only one page was found" })
      .filter(`:contains("${pageNumber}")`)
      .should("be.visible")
      .click();
    return this;
  }

  scrollToBottom() {
    cy.scrollTo("bottom");
    return this;
  }

  selectProductWithFreeShipping() {
    this.elements.productItems().then(($items) => {
      const freeShippingItems = $items.filter((index, el) => el.innerText.includes("Envío gratis"));

      if (freeShippingItems.length > 1) {
        cy.log("Selecting second Free shipping product");
        cy.wrap(freeShippingItems[1]).scrollIntoView().click();
      } else if ($items.length > 1) {
        cy.log("Fallback: clicking second available product");
        cy.wrap($items[1]).scrollIntoView().click();
      } else {
        throw new Error("No sufficient items to click.");
      }
    });

    return this;
  }
}

export default SearchResultsPage;
