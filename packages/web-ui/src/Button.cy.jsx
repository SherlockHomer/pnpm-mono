import * as React from 'react';
import { Button } from './Button.jsx';
import { mount } from 'cypress/react';
// todo: test support mount

describe('<Button />', () => {
  it('mounts', () => {
    mount(<Button>sherlock</Button>);
    cy.get('[data-cy="button"]').should('have.text', 'sherlock');
  });
});
