import React, { lazy, Suspense, useEffect, createContext, useReducer, Fragment } from 'react';
import classNames from 'classnames';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';
import { Transition, TransitionGroup, config as transitionConfig } from 'react-transition-group';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useLocalStorage, usePrefersReducedMotion } from 'hooks';
import { initialState, reducer } from 'app/reducer';
import { tokens, createThemeProperties } from 'app/theme';
import { media, msToNum } from 'utils/style';
import { reflow } from 'utils/transition';
import montserratLight from 'assets/fonts/montserrat-light.woff2';
import montserratRegular from 'assets/fonts/montserrat-regular.woff2';
import montserratMedium from 'assets/fonts/montserrat-medium.woff2';
import montserratSemiBold from 'assets/fonts/montserrat-semibold.woff2';
import montserratBold from 'assets/fonts/montserrat-bold.woff2';
import './index.css';

const Home = lazy(() => import('pages/Home'));
const About = lazy(() => import('pages/About'));
const Lectures = lazy(() => import('pages/Lectures'));
const Blog = lazy(() => import('pages/Blog'));
const NotFound = lazy(() => import('pages/NotFound'));

export const AppContext = createContext();
export const TransitionContext = createContext();

export const fontStyles = `
  @font-face {
    font-family: 'Montserrat';
    font-weight: 300;
    src: url(${montserratLight}) format('woff2');
    font-display: swap;
  }

  @font-face {
    font-family: 'Montserrat';
    font-weight: 400;
    src: url(${montserratRegular}) format('woff2');
    font-display: swap;
  }

  @font-face {
    font-family: 'Montserrat';
    font-weight: 500;
    src: url(${montserratMedium}) format('woff2');
    font-display: swap;
  }

  @font-face {
    font-family: 'Montserrat';
    font-weight: 600;
    src: url(${montserratSemiBold}) format('woff2');
    font-display: swap;
  }

  @font-face {
    font-family: 'Montserrat';
    font-weight: 700;
    src: url(${montserratBold}) format('woff2');
    font-display: swap;
  }
`;

function App() {
  const [storedEvents] = useLocalStorage('events', null);
  const [storedUser] = useLocalStorage('user', null);
  const [storedRedirect] = useLocalStorage('redirect', null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { menuOpen } = state;

  useEffect(() => {
    if (prefersReducedMotion) {
      transitionConfig.disabled = true;
    } else {
      transitionConfig.disabled = false;
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    dispatch({ type: 'setEvents', value: storedEvents });
  }, [storedEvents]);

  useEffect(() => {
    dispatch({ type: 'setUser', value: storedUser });
  }, [storedUser]);

  useEffect(() => {
    dispatch({ type: 'setRedirect', value: storedRedirect });
  }, [storedRedirect]);

  return (
    <HelmetProvider>
      <AppContext.Provider value={{ ...state, dispatch }}>
        <BrowserRouter>
          <AppRoutes menuOpen={menuOpen} />
        </BrowserRouter>
      </AppContext.Provider>
    </HelmetProvider>
  );
}

function AppRoutes({ menuOpen }) {
  const location = useLocation();
  const { pathname } = location;

  return (
    <Fragment>
      <Helmet>
        <link rel="canonical" href={`https://ml.mbhs.edu${pathname}`} />
        <link rel="preload" href={montserratLight} as="font" crossorigin="" />
        <link rel="preload" href={montserratRegular} as="font" crossorigin="" />
        <link rel="preload" href={montserratMedium} as="font" crossorigin="" />
        <link rel="preload" href={montserratSemiBold} as="font" crossorigin="" />
        <link rel="preload" href={montserratBold} as="font" crossorigin="" />
        <style>{fontStyles}</style>
        <style>{globalStyles}</style>
      </Helmet>
      <a className="skip-to-main" href="#MainContent">
        Skip to main content
      </a>
      <TransitionGroup
        component="main"
        className={classNames('app', { 'app--menuOpen': menuOpen })}
        tabIndex={-1}
        id="MainContent"
        role="main"
      >
        <Transition
          key={pathname}
          timeout={msToNum(tokens.base.durationS)}
          onEnter={reflow}
        >
          {status => (
            <TransitionContext.Provider value={{ status }}>
              <div className={classNames('app__page', `app__page--${status}`)}>
                <Suspense fallback={<Fragment />}>
                  <Switch location={location}>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/lectures" component={Lectures} />
                    <Route path="/blog" component={Blog} />
                    <Route component={NotFound} />
                  </Switch>
                </Suspense>
              </div>
            </TransitionContext.Provider>
          )}
        </Transition>
      </TransitionGroup>
    </Fragment>
  );
}

export const globalStyles = `
  :root {
    ${createThemeProperties(tokens.base)}
  }

  @media (max-width: ${media.laptop}px) {
    :root {
      ${createThemeProperties(tokens.laptop)}
    }
  }

  @media (max-width: ${media.tablet}px) {
    :root {
      ${createThemeProperties(tokens.tablet)}
    }
  }

  @media (max-width: ${media.mobile}px) {
    :root {
      ${createThemeProperties(tokens.mobile)}
    }
  }
`;

export default App;
