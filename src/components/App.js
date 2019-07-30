import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Navbar,
} from 'react-bootstrap';

import TranslationList from './TranslationList';
import TranslationBox from './TranslationBox';
import ErrorBoundary from './ErrorBoundary';

import initTranslations from '../data/translations';
import '../App.css';

class App extends Component {
  state = {
    boxType: 'home',
    translations: [],
    currentTranslationId: undefined,
    currentTranslation: undefined,
    viewMessage: '',
  }

  componentDidMount() {
    // If no song list add two songs to storage
    const translationList = JSON.parse(localStorage.getItem('translationList'));

    if (!translationList) {
      // Stringify translation list add to storage
      localStorage.setItem('translationList', JSON.stringify(initTranslations));
      this.setState({ translations: initTranslations.data });
    } else {
      this.setState({ translations: translationList.data });
    }
  }

  handleTitleClick = () => {
    this.setState({ boxType: 'home' });
  }

  // View translation
  viewTranslation = (id, isNew = false) => {
    let currTranslation;

    if (isNew) {
      const translationList = JSON.parse(localStorage.getItem('translationList'));
      currTranslation = translationList.data.filter(item => item.id === id);
      this.setState({ translations: translationList.data });
      this.setState({
        boxType: 'view',
        translations: translationList.data,
        currentTranslationId: id,
        currentTranslation: currTranslation[0],
        viewMessage: isNew ? 'Your translation was added' : '',
      });
    } else {
      const { translations } = this.state;
      currTranslation = translations.filter(item => item.id === id);
      this.setState({
        boxType: 'view',
        currentTranslationId: id,
        currentTranslation: currTranslation[0],
        viewMessage: isNew ? 'Your translation was added' : '',
      });
    }
  }

  handleAddClick = () => {
    const translations = JSON.parse(localStorage.getItem('translationList')).data;
    const ids = translations.map(translation => translation.id).sort((a, b) => a - b).reverse();
    const newId = (parseInt(ids[0], 10) + 1).toString();

    this.setState({
      boxType: 'update',
      currentTranslationId: newId,
      currentTranslation: undefined,
    });
  }

  handleUpdateClick = (id) => {
    const { translations } = this.state;
    const currTranslation = translations.filter(translation => translation.id === id);
    this.setState({
      boxType: 'update',
      currentTranslation: currTranslation[0],
    });
  }

  updateTranslationList = (translationList) => {
    this.setState({ translations: translationList.data });
  }

  render() {
    const {
      boxType, translations, currentTranslationId, currentTranslation, viewMessage,
    } = this.state;

    return (
      <ErrorBoundary>
        <div className="mb-3 mt-4 pt-2 pt-sm-3 pt-md-4 mt-lg-5">
          <Navbar className="navBar py-0" variant="purp" expand="lg" fixed="top">
            <Container>
              <Row className="w-100">
                <Col xs="10">
                  <h2><span href="#" onClick={this.handleTitleClick} role="presentation">Translations</span></h2>
                </Col>
                <Col xs="2" className="align-self-center text-right pr-0">
                  <Button className="btn-sm" variant="rpurp" onClick={this.handleAddClick}>Add</Button>
                </Col>
              </Row>
            </Container>
          </Navbar>

          <Container className="pt-4">
            <Row>
              <Col sm={12} lg={3}>
                <TranslationList
                  translations={translations}
                  viewTranslation={this.viewTranslation}
                />
              </Col>
              <Col sm={12} lg={9} className="pt-0 pt-sm-3 pt-lg-0">
                <TranslationBox
                  boxType={boxType}
                  currentTranslation={currentTranslation}
                  currentTranslationId={currentTranslationId}
                  handleAddClick={this.handleAddClick}
                  handleUpdateClick={this.handleUpdateClick}
                  updateTranslationList={this.updateTranslationList}
                  handleDeleteClick={this.handleDeleteClick}
                  viewTranslation={this.viewTranslation}
                  viewMessage={viewMessage}
                />
              </Col>
            </Row>
          </Container>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
