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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'salainen' });
    });

    it('A blog can be created', function() {
      cy.contains('create new blog').click();
      cy.get('#title').type('title created by cypress');
      cy.get('#author').type('Cypress Author');
      cy.get('#url').type('urlby.cypress');
      cy.get('#blogform-button').click();
      cy.contains('title created by cypress Cypress Author');
    });

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'title created by cypress',
          author: 'Cypress Author',
          url: 'urlby.cypress'
        });
      });

      it('it can be made important', function () {
        cy.contains('title created by cypress Cypress Author').parent().contains('button', 'view').as('viewButton');
        cy.get('@viewButton').click();
        cy.contains('urlby.cypress').parent().contains('button', 'like').as('likeButton');
        cy.contains('urlby.cypress').parent().contains('likes 0');
        cy.get('@likeButton').click();
        cy.contains('urlby.cypress').parent().contains('likes 1');
      });

      it('it can be deleted by the user who created it', function () {
        cy.contains('title created by cypress Cypress Author').parent().contains('button', 'view').as('viewButton');
        cy.get('@viewButton').click();
        cy.contains('urlby.cypress').parent().contains('button', 'remove').as('removeButton');
        cy.get('@removeButton').click();

        cy.get('.success')
          .should('contain', 'blog deleted successfully')
          .and('have.css', 'color', 'rgb(0, 128, 0)');
      });

      it('it cannot be deleted by other users', function () {
        cy.addUserAbc();

        cy.contains('title created by cypress Cypress Author').parent().contains('button', 'view').as('viewButton');
        cy.get('@viewButton').click();
        cy.contains('urlby.cypress').parent().contains('button', 'remove').as('removeButton');

        cy.contains('button', 'logout').as('logoutButton');
        cy.get('@logoutButton').click();

        cy.get('.success')
          .should('contain', 'logged out successfully')
          .and('have.css', 'color', 'rgb(0, 128, 0)');

        cy.login({ username: 'abc', password: 'abc' });

        cy.get('@viewButton').click();
        cy.contains('urlby.cypress').parent().should('not.contain', '@removeButton');
      });
    });
  });
});