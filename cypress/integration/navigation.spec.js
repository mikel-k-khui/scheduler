describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should nvaigate to Tuesday", () => {
    beforeEach(function () {
      cy.request("/api/debug/reset");
    })

    cy.visit("/");

    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.css", "day-list__item--selected");
  });
});