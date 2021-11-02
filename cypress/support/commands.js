Cypress.Commands.add('addUserRoot', () => {
  cy.request('POST', 'http://localhost:3003/api/testing/reset');
  cy.request('POST', 'http://localhost:3003/api/users/', {
    name: 'Superuser', username: 'root', password: 'salainen'
  }).then(() => {
    cy.visit('http://localhost:3000');
  });
});