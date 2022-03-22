import React from 'react';
import { createContainer } from './domManipulators';
import {CustomerForm} from "../CustomerForm";
import ReactTestUtils from 'react-dom/test-utils';


describe('CustomerForm', () => {
  let render, container;

  const form = id => container.querySelector(`form[id="${id}"]`);

  const labelFor = formElement =>
    container.querySelector(`label[for="${formElement}"]`);

  const field = name => form('customer').elements[name];

  const itRendersAsTextBox = (fieldName) => {
    it('renders the first name field as a text box', () => {
      render(<CustomerForm />);
      expectToBeInputFieldOfTypeText(field(fieldName));
    });
  }

  const itIncludesExistingValue = (fieldName) => {
    it('includes the existing value for the first name', () => {
      render(<CustomerForm {...{[fieldName]: 'value'}} />);
      expect(field(fieldName).value).toEqual('value');
    })
  }

  const itRendersALabel = (fieldName, text) => {
    it('renders a label for the first name field', () => {
      render(<CustomerForm />);
      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName).textContent).toEqual(text);
    });
  }

  const itAssignsAnIdThatMatchesTheLabelId = (fieldName) => {
    it('assigns an id that matches the label id to the first name field', () => {
      render(<CustomerForm/>);
      expect(field(fieldName).id).toEqual(fieldName);
    });
  };

  const itSubmitsExistingValue = (fieldName, value) => {
    it('saves existing value when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{[fieldName]: value}}
          onSubmit={ props =>
            expect(props[fieldName]).toEqual(value)
          }
        />
      )
      await ReactTestUtils.Simulate.submit(form('customer'));
    });
  }

  const itSubmitsNewValue = (fieldName, value) => {
    it('saves new value when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [fieldName]: 'existingValue' }}
          onSubmit={props =>
            expect(props[fieldName]).toEqual(value)
          }
        />
      );
      await ReactTestUtils.Simulate.change(field(fieldName), {
        target: { value }
      });
      await ReactTestUtils.Simulate.submit(form('customer'));
    });
  }

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  const expectToBeInputFieldOfTypeText = formElement => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual('INPUT');
    expect(formElement.type).toEqual('text');
  }

  it('renders a form', () => {
    render(<CustomerForm />);
    expect(form('customer')).not.toBeNull();
  })

  describe('first name field', () => {
    itRendersAsTextBox('firstName');
    itIncludesExistingValue('firstName')
    itRendersALabel('firstName', 'First name');
    itAssignsAnIdThatMatchesTheLabelId('firstName')
    itSubmitsExistingValue('firstName', 'value');
    itSubmitsNewValue('firstName', 'newValue');
  });

  describe('last name field', () => {
    itRendersAsTextBox('lastName');
    itIncludesExistingValue('lastName')
    itRendersALabel('lastName', 'Last name');
    itAssignsAnIdThatMatchesTheLabelId('lastName')
    itSubmitsExistingValue('lastName', 'value');
    itSubmitsNewValue('lastName', 'newValue');
  });
});

