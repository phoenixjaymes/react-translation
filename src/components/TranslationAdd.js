import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TranslationForm from './TranslationForm';

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
    const { context } = this.props;
    const { currentTranslationId } = context;

    this.setState({
      id: currentTranslationId,
    });
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

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleButtonClick = () => {
    if (!this.isValid()) {
      this.setState({ response: 'Please fill in all feilds' });
      return;
    }

    this.setState({ isDialogShown: true });
  }

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
    const { context } = this.props;
    const { actions } = context;
    const translationList = JSON.parse(localStorage.getItem('translationList'));
    const translations = translationList.data;

    const linesToObjects = (text) => {
      const arrText = text.split(/\n|\r/);
      const arrObjects = [];
      for (let i = 0; i < arrText.length; i += 1) {
        arrObjects.push({ id: `${i}`, line: arrText[i] });
      }

      return arrObjects;
    };

    const newTranslation = {
      id,
      title,
      source,
      foreign: linesToObjects(foreign),
      english: linesToObjects(english),
    };

    translations.push(newTranslation);

    translationList.data = translations;

    localStorage.setItem('translationList', JSON.stringify(translationList));

    actions.updateTranslationList(translationList);

    actions.viewTranslation(id, true);

    this.setState({ response: 'Your translation was added' });
  }

  render() {
    const {
      title, source, foreign, english, response, isDialogShown,
    } = this.state;

    return (
      <TranslationForm
        title={title}
        source={source}
        foreign={foreign}
        english={english}
        response={response}
        isDialogShown={isDialogShown}
        sectionLabel="Add Translation"
        translationType="add"
        handleChange={this.handleChange}
        handleButtonClick={this.handleButtonClick}
        handleDialogYesClick={this.handleDialogYesClick}
        handleDialogCloseClick={this.handleDialogCloseClick}
      />
    );
  }
}

TranslationUpdate.propTypes = {
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
  viewTranslation: PropTypes.func,
};

export default TranslationUpdate;
