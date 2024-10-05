// cypress/support/commands.js

import { cy } from 'cypress';

cy.Commands.add('apiRequest', (method, endpoint, body) => {
    const headers = {
        'authorization': 'Bearer ' + Cypress.env('ACCESS_TOKEN'),
    };
    const url = Cypress.config().e2e.baseUrl + endpoint;

    cy.request({
        method,
        url,
        headers,
        body,
    });
});

cy.Commands.add('apiGet', (endpoint) => {
    cy.apiRequest('GET', endpoint);
});

cy.Commands.add('apiPost', (endpoint, body) => {
    cy.apiRequest('POST', endpoint, body);
});

cy.Commands.add('apiPut', (endpoint, body) => {
    cy.apiRequest('PUT', endpoint, body);
});

cy.Commands.add('apiDelete', (endpoint) => {
    cy.apiRequest('DELETE', endpoint);
});