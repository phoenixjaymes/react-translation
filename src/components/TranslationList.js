/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

const TranslationList = ({ context }) => {
  const { translations, actions } = context;
  const titles = translations.map((item) => {
    let { title } = item;

    if (item.title.length > 12) {
      let trimmedText = item.title.substring(0, 12);
      trimmedText = trimmedText.substring(0, trimmedText.lastIndexOf(' '));
      title = `${trimmedText} ...`;
    }

    return (
      <li
        key={item.id}
        onClick={() => actions.viewTranslation(item.id)}
        onKeyPress={() => actions.viewTranslation(item.id)}
      >
        {title}
      </li>
    );
  });

  return (
    <ul className="translationList text-center list-unstyled">
      {titles}
    </ul>
  );
};

TranslationList.propTypes = {
  context: PropTypes.shape(),
};

export default TranslationList;
