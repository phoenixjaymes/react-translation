import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Jumbotron,
} from 'react-bootstrap';

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <Container className="pt-2 pt-sm-4 pt-md-5">
          <Jumbotron className="text-center jumbo">
            <h1>Translations</h1>
            <p>
              This is a simple study tool for doing text translations.
              <br />
              So, if you simply want text translated, I suggest Google for that.
            </p>
            <h2>Looks like there was an error. We&apos;ll fix it lickety split.</h2>
          </Jumbotron>
          <h3>English</h3>
          <p className="mb-0">
            <q>
              Dreams come true.
              <br />
              Without that possibility, nature would not incite us to have them.
            </q>
          </p>
          <p className="text-right mt-0 font-italic">John Updike</p>
          <h3>Deutsche</h3>
          <p className="mb-0">
            <q>
              Träume werden wahr.
              <br />
              Ohne diese Möglichkeit würde uns die Natur nicht dazu auffordern, sie zu haben.
            </q>
          </p>
          <p className="text-right mt-0 font-italic">John Updike</p>
          <h3>Nederlands</h3>
          <p className="mb-0">
            <q>
              Dromen komen uit.
              <br />
              Zonder die mogelijkheid zou de natuur ons niet aansporen om ze te hebben.
            </q>
          </p>
          <p className="text-right mt-0 font-italic">John Updike</p>
        </Container>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
};
