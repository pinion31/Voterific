import React from 'react';
import {shallow} from 'enzyme';
import {SignUp} from '../src/components/SignUp';
import {Row, Col, Button, FormGroup, FormControl, Alert} from 'react-bootstrap';

const emptyProps =  {
  newUser: {name: '', email: '', password: '', polls: []},
  showingValidation: false,
  validationMessage: null,
};

describe('SignUp', () => {
  const signup = shallow(<SignUp {...emptyProps} />);

  it('initializes to empty State', () => {
    expect(signup.state()).toEqual(emptyProps);
  });

  it('has a header div with class, header', () => {
    expect(signup.find('div').at(1).hasClass('header')).toBe(true);
  });

  it('has a header with title and subtitle', () => {
    expect(signup.find('h1').at(0).text()).toEqual('Voterific');
    expect(signup.find('h1').at(0).hasClass('titleLogin')).toBe(true);
    expect(signup.find('h2').at(0).text()).toEqual('Create polls and have your friends vote.');
    expect(signup.find('h2').at(0).hasClass('subtitleLogin')).toBe(true);
  });

  describe('username field', () => {
    it('has a placeholder, `Username`', ()=> {
      expect(signup.find(FormControl).at(0).props().placeholder).toEqual('Username');
    });

    it('is of type: text', ()=> {
      expect(signup.find(FormControl).at(0).props().type).toEqual('text');
    });

    it('has name property of `username`', ()=> {
      expect(signup.find(FormControl).at(0).props().name).toEqual('name');
    });
  });

  describe('email field', () => {
    it('has a placeholder, `Email`', ()=> {
      expect(signup.find(FormControl).at(1).props().placeholder).toEqual('Email');
    });

    it('is of type: text', ()=> {
      expect(signup.find(FormControl).at(1).props().type).toEqual('text');
    });

    it('has name property of `email`', ()=> {
      expect(signup.find(FormControl).at(1).props().name).toEqual('email');
    });
  });

  describe('password field', () => {
    it('has a placeholder, `Password`', ()=> {
      expect(signup.find(FormControl).at(2).props().placeholder).toEqual('Password');
    });

    it('is of type: password', ()=> {
      expect(signup.find(FormControl).at(2).props().type).toEqual('password');
    });

    it('has name property of `password`', ()=> {
      expect(signup.find(FormControl).at(2).props().name).toEqual('password');
    });
  });

  describe('Create Account Button', () => {
    it('has a label of `Create Account', () => {
      expect(signup.find(Button).at(0).props().children).toEqual('Create Account');
    });

    it('is of type: Submit', () => {
      expect(signup.find(Button).at(0).props().type).toEqual('submit');
    });
  });
});
