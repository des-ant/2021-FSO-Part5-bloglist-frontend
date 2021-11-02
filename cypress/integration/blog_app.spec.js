describe('Blog app', function() {
  beforeEach(function() {
    cy.addUserRoot();
  });

  it('Login form is shown', function() {
    cy.get('#username');
    cy.contains('username');
    cy.get('#password');
    cy.contains('password');
    cy.get('#login-button');
    cy.contains('login');
  });

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();

      cy.contains('Superuser logged in');
    });

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');

      cy.get('html').should('not.contain', 'Superuser logged in');
    });
  });
});