import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Button,
  Navbar,
} from 'react-bootstrap';

const Header = ({ context }) => {
  const { actions } = context;

  return (
    <Navbar className="navBar py-0" variant="purp" expand="lg" fixed="top">
      <Container>
        <Row className="w-100">
          <Col xs="10">
            <h2><span href="#" onClick={actions.handleTitleClick} role="presentation">Translations</span></h2>
          </Col>
          <Col xs="2" className="align-self-center text-right pr-0">
            <Button className="btn-sm" variant="rpurp" onClick={actions.handleAddClick}>Add</Button>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

Header.propTypes = {
  context: PropTypes.shape(),
};


export default Header;
