import React, { useState, useContext, useEffect, useRef } from 'react';
import { Header } from '../components';
import { SidebarToggleContainer } from './header/sidebar-toogle';
import { ToggleThemeContainer } from './header/toggle-theme';
import * as ROUTES from '../constants/routes';
import { FirebaseContext } from '../context/firebase';
import { useThemeModeValue } from '../context';
import logo from '../logo-black.svg';
import logoWhite from '../logo-white.svg';
import { useAuthListener } from '../hooks';

export function HeaderContainer({ children, route }) {
  // const [searchTerm, setSearchTerm] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const { firebase } = useContext(FirebaseContext);
  const { user } = useAuthListener();

  const { theme } = useThemeModeValue();

  useEffect(() => {
    const listener = () => {
      const currentScroll = window.pageYOffset;
      const width = window.innerWidth;

      if (currentScroll < 450) {
        document.getElementById('header').style.height = '50px';
        return;
      } else {
        document.getElementById('header').style.height =
          width < 800 ? '35px' : '25px';
      }
    };
    if (!user) {
      window.addEventListener('scroll', listener);
      return () => window.removeEventListener('scroll', listener);
    }
  }, []);

  useEffect(() => {
    if (user !== null && user.photoURL !== null) {
      return () => setProfilePicture(user.photoURL);
    }
  }, [user]);

  let ctaText;
  if (window.location.pathname === '/signin') {
    ctaText = "Don't have an account?";
  } else if (window.location.pathname === '/signup') {
    ctaText = 'Already have an account?';
  } else {
    ctaText = null;
  }

  return user === null ? (
    <Header>
      <Header.Frame>
        <Header.Logo
          to={ROUTES.HOME}
          src={theme === 'light' ? logo : logoWhite}
          alt="WhatWas"
        />
        <Header.Group>
          <ToggleThemeContainer />
          <Header.Text>{ctaText}</Header.Text>
          <Header.ButtonLink
            to={route === 'sign-in' ? ROUTES.SIGN_IN : ROUTES.SIGN_UP}
          >
            {route === 'sign-in' ? 'Sign in' : 'Sign up'}
          </Header.ButtonLink>
        </Header.Group>
      </Header.Frame>
      {children}
    </Header>
  ) : (
    <Header>
      <Header.Frame className="signed-in">
        <Header.LeftGroup>
          <SidebarToggleContainer />
          <Header.Logo
            width="172"
            height="62"
            to={ROUTES.DASHBOARD}
            src={theme === 'light' ? logo : logoWhite}
            alt="WhatWas"
          />
        </Header.LeftGroup>
        {/* <Header.CenterGroup>
          <Header.Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </Header.CenterGroup> */}
        <Header.RightGroup>
          <ToggleThemeContainer />
          <Header.Profile>
            <Header.Picture
              aria-label={`Picture of ${user.displayName}`}
              size="40"
              src={user !== null && user.photoURL}
            />
            <Header.Dropdown>
              <Header.LeftGroup>
                {user.photoURL && (
                  <Header.Picture
                    aria-label={`Profile of ${user.displayName}`}
                    size="30"
                    width="30"
                    height="30"
                    src={user.photoURL}
                  />
                )}
                <Header.TextLink>{user.displayName}</Header.TextLink>
              </Header.LeftGroup>
              <Header.Group>
                <Header.SignoutLink
                  onClick={() =>
                    firebase
                      .auth()
                      .signOut()
                      .catch((error) => console.error(error.message))
                  }
                >
                  Sign out
                </Header.SignoutLink>
              </Header.Group>
            </Header.Dropdown>
          </Header.Profile>
        </Header.RightGroup>
      </Header.Frame>
    </Header>
  );
}
