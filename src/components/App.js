import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

// import initTranslations from '../data/translations';
import '../App.css';

import Header from './Header';
import TranslationList from './TranslationList';
import TranslationBox from './TranslationBox';
import ErrorBoundary from './ErrorBoundary';

import withContext from '../Context';

const HeaderWithContext = withContext(Header);
const TransListWithContext = withContext(TranslationList);
const TransBoxWithContext = withContext(TranslationBox);

const App = () => (
  <ErrorBoundary>
    <div className="mb-3 mt-4 pt-2 pt-sm-3 pt-md-4 mt-lg-5">
      <HeaderWithContext />

      <Container className="pt-4">
        <Row>
          <Col sm={12} lg={3}>
            <TransListWithContext />
          </Col>
          <Col sm={12} lg={9} className="pt-0 pt-sm-3 pt-lg-0">
            <TransBoxWithContext />
          </Col>
        </Row>
      </Container>
    </div>
  </ErrorBoundary>
);

export default App;
