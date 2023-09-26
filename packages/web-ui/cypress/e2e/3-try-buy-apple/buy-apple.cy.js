/// <reference types="cypress" />
import config from '../../../../../self-configs/password.json';

describe('whether there is a pro max in shenzhen apple store', () => {
  beforeEach(() => {
    cy.visit('https://www.apple.com.cn/');
  });

  it('login', () => {
    cy.get('#globalnav-menubutton-link-bag').click();
    cy.get('[data-autom="sign-in"]').click();
    // checkbox check
    cy.get('.form-checkbox-indicator').click({ multiple: true });
    cy.get('#consent-overlay-accept-button').click();

    // write account and password
    cy.get('#aid-auth-widget-iFrame')
      .iframeOnload()
      .find('#account_name_text_field')
      .type('shaoweizhou@hotmail.com');

    cy.get('#aid-auth-widget-iFrame')
      .iframeDirect()
      .find('#password_text_field')
      .type(`${config.mac}{enter}`, { force: true });
  });

  it('see collection', () => {
    cy.visit('https://www.apple.com.cn/shop/buy-iphone/iphone-15-pro/MU2U3CH/A');
    // cy.request('https://');
  });
});
