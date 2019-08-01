import React from 'react';
import PropTypes from 'prop-types';

import TranslationHome from './TranslationHome';
import TranslationView from './TranslationView';
import TranslationUpdate from './TranslationUpdate';
import TranslationAll from './TranslationAll';

import withContext from '../Context';

const TransHomeWithContext = withContext(TranslationHome);
const TransViewWithContext = withContext(TranslationView);
const TransUpdateWithContext = withContext(TranslationUpdate);
const TransAllWithContext = withContext(TranslationAll);

const TranslationBox = ({ context }) => {
  const { boxType } = context;

  if (boxType === 'view') {
    return (
      <TransViewWithContext />
    );
  }

  if (boxType === 'update') {
    return (
      <TransUpdateWithContext />
    );
  }

  if (boxType === 'all') {
    return (
      <TransAllWithContext />
    );
  }

  return <TransHomeWithContext />;
}

TranslationBox.propTypes = {
  context: PropTypes.shape(),
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
