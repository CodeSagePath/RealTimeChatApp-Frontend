import React from 'react'
import ActiveUsers from './ActiveUsers'

describe('<ActiveUsers />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ActiveUsers />)
  })
})