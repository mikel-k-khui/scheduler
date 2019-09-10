import { createVerify } from "crypto";

describe("Appointments", () => {
  before(function () {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  })

  it("should book an interview", () => {
    cy.get("[alt=Add]")
    .first()
    .click();

    cy.get("[data-testid=student-name-input]").type("Doctor Stephen Strange");
    cy.get("[alt='Sylvia Palmer']")
      .click();

    cy.get("button")
      .contains("Save")
      .click();

    cy.contains(".appointment__card--show", "Doctor Stephen Strange");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

    cy.contains("[data-testid=day]", "Monday")
    .find("h3")
    .should($h3 => expect($h3).to.contain("no spots remaining"));
  });

  it("should edit an interview", () => {

    cy.get(".appointment__card--show")
      .contains(".appointment__card--show", "Doctor Stephen Strange")
      .find("[alt=Edit]")
      .click({ force: true});
      
    cy.get("[data-testid=student-name-input]").clear()
      .type("Steve 'Captain America' Rogers");
    cy.get("[alt='Tori Malcolm']")
      .click();

    cy.get("button")
      .contains("Save")
      .click();

    cy.contains(".appointment__card--show", "Steve 'Captain America' Rogers");
    cy.contains(".appointment__card--show", "Tori Malcolm");

    cy.contains("[data-testid=day]", "Monday")
    .find("h3")
    .should($h3 => expect($h3).to.contain("no spots remaining"));
  });

  it("should cancel an interview", () => {
    cy.get(".appointment__card--show")
      .contains(".appointment__card--show", "Steve 'Captain America' Rogers")
      .find("[alt=Delete]")
      .click({ force: true});

    cy.get(".appointment__card--confirm")
      .find("h1")
      .should($h1 => expect($h1).to.contain("Delete the appointment?"));

    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
  
    cy.contains(".appointment__card--show", "Steve 'Captain America' Rogers")
      .should("not.exist");
    cy.contains("[data-testid=day]", "Monday")
      .find("h3")
      .should($h3 => expect($h3).to.contain("1 spot remaining"));
    
  });    
});