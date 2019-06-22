import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
} from 'react-bootstrap';

const Dialog = ({
  translationType, isDialogShown, handleDialogYesClick, handleDialogCloseClick,
}) => {
  let sectionLabel;

  if (translationType === 'add') {
    sectionLabel = 'Add Translation';
  } else if (translationType === 'update') {
    sectionLabel = 'Update Translation';
  } else {
    sectionLabel = 'Delete Translation';
  }

  return (
    <Modal show={isDialogShown} onHide={handleDialogCloseClick}>
      <Modal.Header closeButton>
        <Modal.Title>{sectionLabel}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Would you like to continue?</Modal.Body>
      <Modal.Footer>
        <Button variant="manatee" onClick={handleDialogCloseClick}>
          Cancel
        </Button>
        <Button variant="rpurp" onClick={handleDialogYesClick}>
          {sectionLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

Dialog.propTypes = {
  translationType: PropTypes.string.isRequired,
  isDialogShown: PropTypes.bool.isRequired,
  handleDialogYesClick: PropTypes.func.isRequired,
  handleDialogCloseClick: PropTypes.func.isRequired,
};

export default Dialog;
