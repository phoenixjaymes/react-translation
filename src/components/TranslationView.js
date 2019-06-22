import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Button,
  Form,
} from 'react-bootstrap';

import Dialog from './Dialog';

class TranslationView extends Component {
  state = {
    title: '',
    source: '',
    english: '',
    foreign: '',
    response: '',
    isDialogShown: false,
  }

  componentDidMount() {
    const {
      currentTranslation, viewMessage,
    } = this.props;
    this.setState({
      title: currentTranslation.title,
      source: currentTranslation.source,
      foreign: currentTranslation.foreign.map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      )),
      english: currentTranslation.english.map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      )),
      response: viewMessage,
    });
  }

  componentDidUpdate(prevProps) {
    const { currentTranslation } = this.props;
    if (prevProps.currentTranslation !== currentTranslation) {
      this.setState({
        title: currentTranslation.title,
        source: currentTranslation.source,
        foreign: currentTranslation.foreign.map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        )),
        english: currentTranslation.english.map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        )),
        response: '',
      });
    }
  }

  handleDialogYesClick = () => {
    this.setState({
      title: '',
      source: '',
      foreign: '',
      english: '',
      response: 'The translation has been deleted',
      isDialogShown: false,
    });
    this.deleteTranslation();
  }

  handleDialogCloseClick = () => {
    this.setState({
      isDialogShown: false,
    });
  }

  handleDeleteClick = () => {
    this.setState({ isDialogShown: true });
  }

  deleteTranslation = () => {
    const { currentTranslationId, updateTranslationList } = this.props;
    const translationList = JSON.parse(localStorage.getItem('translationList'));
    const translations = translationList.data;
    const newTranslations = translations.filter((translation) => {
      return parseInt(translation.id, 10) !== parseInt(currentTranslationId, 10);
    });

    translationList.data = newTranslations;

    // Stringify translation list add to storage
    localStorage.setItem('translationList', JSON.stringify(translationList));

    updateTranslationList(translationList);
  }

  render() {
    const {
      currentTranslationId, handleUpdateClick,
    } = this.props;
    const {
      title, source, foreign, english, response, isDialogShown,
    } = this.state;

    return (
      <Form>
        <h2>{title}</h2>
        <Row className="border-bottom pb-1">
          <Col sm={6}>
            <p className="textBoxSm mb-1 mb-sm-0">{title}</p>
          </Col>
          <Col sm={6}>
            <p className="textBoxSm mb-1 mb-sm-0">{source}</p>
          </Col>
        </Row>

        <Row className="pt-3">
          <Col md={6}>
            <h3 className="textBoxLabel mb-2 font-weight-bold">Foreign</h3>
            <div className="textBox">{foreign}</div>
          </Col>
          <Col md={6}>
            <p className="textBoxLabel mb-2 font-weight-bold">English</p>
            <div className="textBox">{english}</div>
          </Col>
        </Row>
        <p>{response}</p>
        <Button variant="rpurp" onClick={() => handleUpdateClick(currentTranslationId)}>Update</Button>
        &nbsp;
        <Button variant="rpurp" onClick={() => this.handleDeleteClick(currentTranslationId)}>Delete</Button>
        <Dialog
          translationType="delete"
          isDialogShown={isDialogShown}
          handleDialogYesClick={this.handleDialogYesClick}
          handleDialogCloseClick={this.handleDialogCloseClick}
        />
      </Form>
    );
  }
}

TranslationView.propTypes = {
  currentTranslation: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    source: PropTypes.string,
    foreign: PropTypes.arrayOf(PropTypes.string),
    english: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  currentTranslationId: PropTypes.string.isRequired,
  updateTranslationList: PropTypes.func.isRequired,
  handleUpdateClick: PropTypes.func.isRequired,
  viewMessage: PropTypes.string.isRequired,
};

export default TranslationView;
