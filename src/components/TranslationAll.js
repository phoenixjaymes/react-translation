import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Jumbotron,
  Button
} from 'react-bootstrap';

class  TranslationAll extends Component {
    
  render() {

    return (
      <Container>
        <Jumbotron className="text-center jumbo">
          <h1>Translations</h1>
          <p>
            This is a simple study tool for doing text translation.<br />So, if you simple want text translated, I suggest Google for that
          </p>
          <p>
            <Button variant="rpurp" onClick={this.props.handleAddClick}>Add Translation</Button>
          </p>
        </Jumbotron>
      </Container>
    )
  }

}

TranslationAll.propTypes = {
  handleAddClick: PropTypes.func
}

export default TranslationAll;
