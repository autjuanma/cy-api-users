// api-manage.js

const Cypress = require('cypress');


function getAuthHeader() {
  return {
    'authorization': 'Bearer ' + Cypress.env('ACCESS_TOKEN'),
  };
}

function getApiEndpoint(endpoint) {
  return Cypress.config().e2e.baseUrl + endpoint;
}

Cypress.Commands.add('apiRequest', (method, endpoint, body) => {
  const headers = getAuthHeader();
  const url = getApiEndpoint(endpoint);

  cy.request({
    method,
    url,
    headers,
    body,
  });
});

Cypress.Commands.add('apiGet', (endpoint) => {
  cy.apiRequest('GET', endpoint);
});

Cypress.Commands.add('apiPost', (endpoint, body) => {
  cy.apiRequest('POST', endpoint, body);
});

Cypress.Commands.add('apiPut', (endpoint, body) => {
  cy.apiRequest('PUT', endpoint, body);
});

Cypress.Commands.add('apiDelete', (endpoint) => {
  cy.apiRequest('DELETE', endpoint);
});