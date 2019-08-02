import React, { Component } from 'react';
import PropTypes from 'prop-types';

import initTranslations from './data/translations';

const Context = React.createContext();
export const { Consumer } = Context;

export class Provider extends Component {
  state = {
    boxType: 'home',
    translations: [],
    currentTranslationId: undefined,
    currentTranslation: undefined,
    viewMessage: '',
  }

  componentDidMount() {
    // If no song list add songs to storage

    const translationList = JSON.parse(localStorage.getItem('translationList'));

    const highlightedList = this.addHighLightedProp();

    if (!translationList) {
      // Stringify translation list add to storage
      localStorage.setItem('translationList', JSON.stringify(highlightedList));
      this.setState({ translations: highlightedList.data });
    } else {
      this.setState({ translations: translationList.data });
    }
  }

  addHighLightedProp = () => (
    {
      name: 'translations',
      data: initTranslations.data.map(item => (
        {
          ...item,
          english: item.english.map(lyric => ({ ...lyric, highlight: 'false' })),
          foreign: item.foreign.map(lyric => ({ ...lyric, highlight: 'false' })),
        }
      )),
    }
  );

  handleTitleClick = () => {
    this.setState({ boxType: 'home' });
  }

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

  resetCurrentTranslation = () => {
    this.setState({
      currentTranslationId: undefined,
      currentTranslation: undefined,
    });
  }

  render() {
    const {
      boxType, translations, currentTranslationId, currentTranslation, viewMessage,
    } = this.state;
    const { children } = this.props;
    const value = {
      boxType,
      translations,
      currentTranslationId,
      currentTranslation,
      viewMessage,
      actions: {
        handleTitleClick: this.handleTitleClick,
        viewTranslation: this.viewTranslation,
        handleAddClick: this.handleAddClick,
        handleUpdateClick: this.handleUpdateClick,
        updateTranslationList: this.updateTranslationList,
        resetCurrentTranslation: this.resetCurrentTranslation,
      },
    };

    return (
      <Context.Provider value={value}>
        {children}
      </Context.Provider>
    );
  }
}

Provider.propTypes = {
  children: PropTypes.element,
};


/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} WrappedComponent - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(WrappedComponent) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <WrappedComponent {...props} context={context} />}
      </Context.Consumer>
    );
  }
}
