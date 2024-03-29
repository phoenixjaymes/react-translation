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
    response: '',
    isDialogShown: false,
  }

  componentDidMount() {
    const { context } = this.props;
    const { viewMessage } = context;

    this.setState({ response: viewMessage });
  }

  handleDialogYesClick = () => {
    this.setState({
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
    const { context } = this.props;
    const { currentTranslationId, actions } = context;
    const translationList = JSON.parse(localStorage.getItem('translationList'));
    const translations = translationList.data;
    const newTranslations = translations.filter(translation => (
      parseInt(translation.id, 10) !== parseInt(currentTranslationId, 10)
    ));

    translationList.data = newTranslations;
    localStorage.setItem('translationList', JSON.stringify(translationList));
    actions.updateTranslationList(translationList);
  }

  getTranslation = (currentTranslation) => {
    if (currentTranslation !== undefined) {
      return (
        {
          title: currentTranslation.title,
          source: currentTranslation.source,
          foreign: currentTranslation.foreign.map(line => (
            <span key={line.id} data-id={line.id} className={line.highlight ? 'highlight' : ''}>
              {line.line}
              <br />
            </span>
          )),
          english: currentTranslation.english.map(line => (
            <span key={line.id} data-id={line.id} className={line.highlight ? 'highlight' : ''}>
              {line.line}
              <br />
            </span>
          )),
        }
      );
    }

    return (
      {
        title: '',
        source: '',
        foreign: '',
        english: '',
      }
    );
  };

  render() {
    const { context } = this.props;
    const { currentTranslationId, actions, currentTranslation } = context;
    const { response, isDialogShown } = this.state;

    const {
      title, source, foreign, english,
    } = this.getTranslation(currentTranslation);

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
            <div className="textBox" onClick={actions.addHighlightProp}>{foreign}</div>
          </Col>
          <Col md={6}>
            <h3 className="textBoxLabel mb-2 font-weight-bold">English</h3>
            <div className="textBox" onClick={actions.addHighlightProp}>{english}</div>
          </Col>
        </Row>

        <p>{response}</p>
        <Button variant="rpurp" onClick={() => actions.handleUpdateClick(currentTranslationId)}>Update</Button>
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
  context: PropTypes.shape(),
  currentTranslation: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    source: PropTypes.string,
    foreign: PropTypes.arrayOf(PropTypes.object),
    english: PropTypes.arrayOf(PropTypes.object),
  }),
  currentTranslationId: PropTypes.string,
  updateTranslationList: PropTypes.func,
  handleUpdateClick: PropTypes.func,
  viewMessage: PropTypes.string,
};

export default TranslationView;
