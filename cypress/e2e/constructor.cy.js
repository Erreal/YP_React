describe('service is available', () => {
  const email = 'erreal@yandex.ru';
  const password = '159753';
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should open ingredient modal', () => {
    cy.get('[data-test-id="ingredient-link"]').first().click();
    cy.get('[data-test-id="modal-overlay"]').should('exist');
    cy.get('[data-test-id="close-modal"]').click();
    cy.get('[data-test-id="modal-overlay"]').should('not.exist');
  });

  it('should drag & drop and order works', () => {
    cy.get('[data-test-id="empty-bun"]').should('exist');
    cy.get('[data-test-id="constructor-inner"]').should('be.empty');
    cy.get('[data-test-id="ingredient-link"]').first().trigger('dragstart');
    cy.get('[data-test-id="ingredient-link"]').first().trigger('dragleave');
    cy.get('[data-test-id="drop-container"]').trigger('drop');
    cy.get('[data-test-id="drop-container"]').trigger('dragend');
    cy.get('[data-test-id="ingredient-link"]:nth-child(6)').trigger(
      'dragstart'
    );
    cy.get('[data-test-id="ingredient-link"]:nth-child(6)').trigger(
      'dragleave'
    );
    cy.get('[data-test-id="drop-container"]').trigger('drop');
    cy.get('[data-test-id="drop-container"]').trigger('dragend');
    cy.get('[data-test-id="empty-bun"]').should('not.exist');
    cy.get('[data-test-id="constructor-inner"]').should('be.not.empty');
    cy.get('[data-test-id="order-button"]').click();
    cy.get('[data-test-id="login-form"]').should('exist');
    cy.get('[data-test-id="email-input"]').type(`${email}`);
    cy.get('[data-test-id="password-input"]').type(`${password}`);
    cy.get('[data-test-id="login-button"]').click();
    cy.get('[data-test-id="login-form"]').should('not.exist');
    cy.get('[data-test-id="order-button"]').click();
    cy.get('[data-test-id="modal-overlay"]').should('exist');
    cy.get('[data-test-id="order-number"]', { timeout: 16000 }).should('exist');
    cy.get('[data-test-id="close-modal"]').click();
    cy.get('[data-test-id="modal-overlay"]').should('not.exist');
  });
});
