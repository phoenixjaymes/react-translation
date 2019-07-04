import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TranslationHome from './TranslationHome';
import TranslationView from './TranslationView';
import TranslationUpdate from './TranslationUpdate';
import TranslationAll from './TranslationAll';

class TranslationBox extends Component {
  state = {
  }

  render() {
    const {
      boxType, currentTranslation, currentTranslationId,
      handleAddClick, handleUpdateClick, updateTranslationList, viewTranslation, viewMessage,
    } = this.props;

    if (boxType === 'view') {
      return (
        <TranslationView
          currentTranslation={currentTranslation}
          currentTranslationId={currentTranslationId}
          handleUpdateClick={handleUpdateClick}
          updateTranslationList={updateTranslationList}
          viewMessage={viewMessage}
        />
      );
    }

    if (boxType === 'update') {
      return (
        <TranslationUpdate
          currentTranslation={currentTranslation}
          currentTranslationId={currentTranslationId}
          updateTranslationList={updateTranslationList}
          viewTranslation={viewTranslation}
        />
      );
    }

    if (boxType === 'all') {
      return (
        <TranslationAll
          currentTranslation={currentTranslation}
          currentTranslationId={currentTranslationId}
          updateTranslationList={updateTranslationList}
          viewTranslation={viewTranslation}
        />
      );
    }

    return <TranslationHome handleAddClick={handleAddClick} />;
  }
}

TranslationBox.propTypes = {
  boxType: PropTypes.string.isRequired,
  currentTranslation: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    source: PropTypes.string,
    foreign: PropTypes.arrayOf(PropTypes.object),
    english: PropTypes.arrayOf(PropTypes.object),
  }),
  currentTranslationId: PropTypes.string,
  handleAddClick: PropTypes.func,
  handleUpdateClick: PropTypes.func,
  updateTranslationList: PropTypes.func,
  viewTranslation: PropTypes.func,
  viewMessage: PropTypes.string,
};

export default TranslationBox;
