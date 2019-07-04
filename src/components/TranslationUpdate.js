import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';

import Dialog from './Dialog';

class TranslationUpdate extends Component {
  state = {
    id: '',
    title: '',
    source: '',
    foreign: '',
    english: '',
    response: '',
    isDialogShown: false,
  }

  componentDidMount() {
    const { currentTranslation, currentTranslationId } = this.props;

    if (currentTranslation !== undefined) {
      this.setState({
        id: currentTranslationId,
        title: currentTranslation.title,
        source: currentTranslation.source,
        foreign: currentTranslation.foreign.join('\n'),
        english: currentTranslation.english.join('\n'),
      });
    } else {
      this.setState({
        id: currentTranslationId,
        title: '',
        source: '',
        foreign: '',
        english: '',
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { currentTranslation } = this.props;
    if (prevProps.currentTranslation !== currentTranslation) {
      this.setState({
        title: '',
        source: '',
        foreign: '',
        english: '',
      });
    }
  }

  handleDialogYesClick = () => {
    this.setState({
      isDialogShown: false,
    });
    this.submitForm();
  }

  handleDialogCloseClick = () => {
    this.setState({
      isDialogShown: false,
    });
  }

  handleTitle = e => this.setState({ title: e.target.value });

  handleSource = e => this.setState({ source: e.target.value });

  handleForeign = e => this.setState({ foreign: e.target.value });

  handleEnglish = e => this.setState({ english: e.target.value });

  handleButtonClick = () => {
    if (!this.isValid()) {
      this.setState({ response: 'Please fill in all feilds' });
      return;
    }

    this.setState({ isDialogShown: true });
  }

  // Validate the form
  isValid = () => {
    const {
      title, source, foreign, english,
    } = this.state;

    if (title === '' || source === '' || foreign === '' || english === '') {
      return false;
    }
    return true;
  }

  // Submit form
  submitForm = () => {
    const {
      id, title, source, foreign, english,
    } = this.state;
    const { currentTranslation, updateTranslationList, viewTranslation } = this.props;
    const translationList = JSON.parse(localStorage.getItem('translationList'));
    const translations = translationList.data;
    const newTranslation = {
      id,
      title,
      source,
      foreign: foreign.split(/\n|\r/),
      english: english.split(/\n|\r/),
    };

    if (currentTranslation === undefined) {
      translations.push(newTranslation);
    } else {
      const index = translations.findIndex(
        translation => parseInt(translation.id, 10) === parseInt(id, 10),
      );
      translations.splice(index, 1, newTranslation);
    }

    translationList.data = translations;

    // Stringify translation list and add to storage
    localStorage.setItem('translationList', JSON.stringify(translationList));

    updateTranslationList(translationList);

    if (currentTranslation === undefined) {
      viewTranslation(id, true);
    }

    this.setState({ response: 'Your translation was updated'});
  }

  render() {
    const {
      title, source, foreign, english, response, isDialogShown,
    } = this.state;
    const {
      currentTranslation,
    } = this.props;
    const sectionLabel = currentTranslation === undefined ? 'Add Translation' : 'Update Translation';
    const translationType = currentTranslation === undefined ? 'add' : 'update';

    return (
      <Form>
        <h1>{sectionLabel}</h1>
        <Row className="border-bottom pb-1">
          <Col sm={6}>
            <Form.Control className="mb-1 mb-sm-0" type="text" placeholder="Title" value={title} onChange={this.handleTitle} />
          </Col>
          <Col sm={6}>
            <Form.Control className="mb-1 mb-sm-0" type="text" placeholder="Source" value={source} onChange={this.handleSource} />
          </Col>
        </Row>

        <Row className="pt-3">
          <Col md={6}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label className="mb-2 font-weight-bold">Foreign</Form.Label>
              <Form.Control className="textArea" as="textarea" rows="3" value={foreign} onChange={this.handleForeign} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label className="mb-2 font-weight-bold">English</Form.Label>
              <Form.Control className="textArea" as="textarea" rows="3" value={english} onChange={this.handleEnglish} />
            </Form.Group>
          </Col>
        </Row>
        <p>{response}</p>
        <Button variant="rpurp" onClick={this.handleButtonClick}>{sectionLabel}</Button>
        <Dialog
          translationType={translationType}
          isDialogShown={isDialogShown}
          handleDialogYesClick={this.handleDialogYesClick}
          handleDialogCloseClick={this.handleDialogCloseClick}
        />
      </Form>
    );
  }
}

TranslationUpdate.propTypes = {
  currentTranslation: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    source: PropTypes.string,
    foreign: PropTypes.arrayOf(PropTypes.string),
    english: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  currentTranslationId: PropTypes.string.isRequired,
  updateTranslationList: PropTypes.func.isRequired,
  viewTranslation: PropTypes.func.isRequired,
};

export default TranslationUpdate;