class ProductDetailPage {
  static clickAddToCartButton() {
    throw new Error("Method not implemented.");
  }

  elements = {
    title: () => cy.get(".ui-pdp-title"),
    quantitySelector: () => cy.get("#buybox_available_quantity"),
    quantityDropdown: () => cy.get('[data-testid="popper"]'),
    quantityOption: (index: number) => cy.get(`[data-testid="quantity-selector-item-${index}"]`),
    addToCartButton: () => cy.contains("button", "Agregar al carrito"),
    createAccountSection: () => cy.contains("h3", "Crear cuenta"),
    loginModal: () => cy.get('[data-testid="modal-container"]'),
    body: () => cy.get("body"),
    bodyContainAddToCart: (body) => body.find('button:contains("Agregar al carrito")').length > 0,
    addToCart: () => cy.contains("button", "Agregar al carrito"),
    bodyContainBuyNow: (body) => body.find('button:contains("Comprar ahora")').length > 0,
    buyNow: () => cy.contains("button", "Comprar ahora"),
  };

  verifyTitleVisible() {
    this.elements.title().should("be.visible", { timeout: 10000 });
    return this;
  }

  openQuantitySelector() {
    this.elements.quantitySelector().contains("Cantidad:").should("be.enabled").click({ force: true });
    return this;
  }

  verifyQuantityDropdownVisible() {
    this.elements.quantityDropdown().should("be.visible", { timeout: 10000 });
    return this;
  }

  selectQuantity(index: number) {
    this.elements.quantityOption(index).click();
    return this;
  }

  clickToAddCart() {
    this.elements.body().then(($body) => {
      if (this.elements.bodyContainAddToCart($body)) {
        this.elements.addToCart().scrollIntoView().should("be.visible").click({ force: true });
      } else if (this.elements.bodyContainBuyNow($body)) {
        this.elements.buyNow().scrollIntoView().should("be.visible").click({ force: true });
      } else {
        throw new Error("No se encontró ningún botón para agregar al carrito ni comprar ahora");
      }
    });

    return this;
  }

  verifyCreateAccountButton() {
    return cy.get('[data-testid="login-link"]').should("be.visible").and("contain.text", "Crear cuenta");
  }
}

export default ProductDetailPage;
