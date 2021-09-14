import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'components/Link';
import PageLayout from 'components/PageLayout';
import Hero from 'pages/Hero';
import { useScrollRestore } from 'hooks';

function NotFound(props) {
  useScrollRestore();

  return (
    <Fragment>
      <Helmet
        title="Page Not Found - MBHS ML Club"
      />
      <PageLayout dark>
        <Hero
          dark
          center
          label="Page Not Found"
          title="Error 404"
          button={{ as: Link, to: '/', label: 'Go Back' }}
        />
      </PageLayout>
    </Fragment>
  );
}

export default NotFound;
