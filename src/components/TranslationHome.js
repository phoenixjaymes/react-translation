import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Jumbotron,
  Button,
} from 'react-bootstrap';

const TranslationHome = ({ context }) => {
  const { actions } = context;
  return (
    <Container>
      <Jumbotron className="text-center jumbo">
        <h1>Translations</h1>
        <p>
          This is a simple study tool for doing text translations.
          <br />
          So, if you simply want text translated, I suggest Google for that.
        </p>
        <p>
          <Button variant="rpurp" onClick={actions.handleAddClick}>Add Translation</Button>
        </p>
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
};

TranslationHome.propTypes = {
  context: PropTypes.shape(),
  handleAddClick: PropTypes.func.isRequired,
};

export default TranslationHome;
