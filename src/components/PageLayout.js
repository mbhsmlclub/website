import React, { Fragment } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';

function PageLayout(props) {
  const { dark, children } = props;

  return (
    <Fragment>
      <Header dark={dark} />
      {children}
      <Footer />
    </Fragment>
  );
}

export default PageLayout;
