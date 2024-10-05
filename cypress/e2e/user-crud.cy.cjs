import { faker } from '@faker-js/faker';
describe('User   CRUD Operations', () => {
  let userId;
  let userName;
  let emailId;

  before(() => {
    userName = faker.internet.userName();
    emailId = `${userName}@${faker.internet.domainName()}`;
  });

  describe('Create a new user', () => {
    context('POST /public/v2/users', () => {
      it('successfully creates a new user', () => {
        const body = {
          "name": userName,
          "gender": "male",
          "email": emailId,
          "status": "active"
        };

        cy.apiPost('/public/v2/users', body).then((response) => {
          expect(response).to.have.property('status').to.equal(201);
          expect(response.body).to.have.property('id').to.not.be.oneOf([null, ""]);
          expect(response.body).to.have.property('name').to.equal(userName);
          expect(response.body).to.have.property('email').to.equal(emailId);
          expect(response.body).to.have.property('gender').to.equal('male');
          expect(response.body).to.have.property('status').to.equal('active');
          userId = response.body.id;
          cy.task('log', 'Created a new user with id: ' + userId);
        });
      });
    });
  });

  describe('Get a user by ID', () => {
    context('GET /public/v2/users/:id', () => {
      it('successfully retrieves a user by ID', () => {
        cy.apiGet(`/public/v2/users/${userId}`).then((response) => {
          expect(response).to.have.property('status').to.equal(200);
          expect(response.body).to.have.property('id').to.equal(userId);
          expect(response.body).to.have.property('name').to.equal(userName);
          expect(response.body).to.have.property('email').to.equal(emailId);
          expect(response.body).to.have.property('gender').to.equal('male');
          expect(response.body).to.have.property('status').to.equal('active');
        });
      });
    });
  });

  describe('Update a user', () => {
    context('PUT /public/v2/users/:id', () => {
      it('successfully updates a user', () => {
        const body = {
          "name": userName + ' updated',
          "gender": 'female',
          "email": emailId,
          "status": 'inactive'
        };

        cy.apiPut(`/public/v2/users/${userId}`, body).then((response) => {
          expect(response).to.have.property('status').to.equal(200);
          expect(response.body).to.have.property('id').to.equal(userId);
          expect(response.body).to.have.property('name').to.equal(userName + ' updated');
          expect(response.body).to.have.property('email').to.equal(emailId);
          expect(response.body).to.have.property('gender').to.equal('female');
          expect(response.body).to.have.property('status').to.equal('inactive');
        });
      });
    });
  });

  describe('Delete a user', () => {
    context('DELETE /public/v2/users/:id', () => {
      it('successfully deletes a user', () => {
        cy.apiDelete(`/public/v2/users/${userId}`).then((response) => {
          expect(response).to.have.property('status').to.equal(204);
        });
      });
    });
  });
});