import React from 'react';
import { mount } from 'enzyme';
import App from './App';

describe('App', () => {
  let app = mount(<App />);

  it('renders the App titel', () => {
    // console.log(app.debug());
    expect(app.find('h2').text()).toEqual('Note to self');
  });

  it('renders the clear button', () => {
    expect(app.find('.btn').at(1).text()).toEqual('Clear notes');
  })

  describe('when rendering the form', () => {
    it('creates a Form component', () => {
      expect(app.find('Form').exists()).toBe(true);
    });

    it('renders a FormControl component', () => {
      expect(app.find('FormControl').exists()).toBe(true);
    });

    it('render a submit button', () => {
      expect(app.find('.btn').at(0).text()).toEqual('Submit');
    })
  });

  describe('when creating a note', () => {
    let testNote = 'test note';

    beforeEach(() => {
      app.find('FormControl').simulate('change', {
        target: { value: testNote }
      })
    })

    it('updates the text in state', () => {
      expect(app.state().text).toEqual(testNote);
    })

    describe('and submitting the new note', () => {
      beforeEach(() => {
        app.find('.btn').at(0).simulate('click');
      })

      it('adds the new note to state', () => {
        expect(app.state().notes[0].text).toEqual(testNote);
      })
    })
  })
})