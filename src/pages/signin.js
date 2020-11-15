import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../context/firebase';
import { HeaderContainer } from '../containers/header';
import { FooterContainer } from '../containers/footer';
import { Form } from '../components';
import * as ROUTES from '../constants/routes';

export default function Signin() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Todo: validation
  const isInvalid =
    password === '' ||
    (password.length <= 7 && emailAddress) ||
    '' ||
    !emailAddress.includes('@');

  const handleSignin = (event) => {
    event.preventDefault();

    // Firebase auth
    firebase
      .auth()
      .signInWithEmailAndPassword(emailAddress, password)
      .then(() => {
        // Push to home page
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setEmailAddress('');
        setPassword('');
        setError(error.message);
        console.log('sign in error');
      });
  };

  document.title = 'Sign in - WhatWas';
  return (
    <>
      <HeaderContainer route="sign-up" />
      <Form>
        <Form.Title>Sign In</Form.Title>
        {error && <Form.Error>{error}</Form.Error>}

        <Form.Base onSubmit={handleSignin} method="POST">
          <Form.TextSmall>Email Adress</Form.TextSmall>
          <Form.Input
            placeholder="Email Address"
            value={emailAddress}
            onChange={({ target }) => setEmailAddress(target.value)}
            aria-label="Email Address"
          />
          <Form.TextSmall>Password</Form.TextSmall>
          <Form.Input
            type="password"
            autoComplete="off"
            placeholder="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            aria-label="Password"
          />
          <Form.Submit disabled={isInvalid} type="submit">
            Sign In
          </Form.Submit>
        </Form.Base>
        <Form.TextSmall>
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
        </Form.TextSmall>
      </Form>
      <FooterContainer></FooterContainer>
    </>
  );
}