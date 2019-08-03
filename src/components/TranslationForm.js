import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';

import Dialog from './Dialog';

const TranslationForm = ({
  sectionLabel, title, source, foreign, english, handleChange, translationType, response,
  isDialogShown, handleButtonClick, handleDialogYesClick, handleDialogCloseClick,
}) => {
  return (
    <Form>
      <h1>{sectionLabel}</h1>
      <Row className="border-bottom pb-1">
        <Col sm={6}>
          <Form.Control className="mb-1 mb-sm-0" type="text" placeholder="Title" name="title" value={title} onChange={handleChange} />
        </Col>
        <Col sm={6}>
          <Form.Control className="mb-1 mb-sm-0" type="text" placeholder="Source" name="source" value={source} onChange={handleChange} />
        </Col>
      </Row>

      <Row className="pt-3">
        <Col md={6}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className="mb-2 font-weight-bold">Foreign</Form.Label>
            <Form.Control className="textArea" as="textarea" rows="3" name="foreign" value={foreign} onChange={handleChange} />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className="mb-2 font-weight-bold">English</Form.Label>
            <Form.Control className="textArea" as="textarea" rows="3" name="english" value={english} onChange={handleChange} />
          </Form.Group>
        </Col>
      </Row>
      <p>{response}</p>
      <Button variant="rpurp" onClick={handleButtonClick}>{sectionLabel}</Button>
      <Dialog
        translationType={translationType}
        isDialogShown={isDialogShown}
        handleDialogYesClick={handleDialogYesClick}
        handleDialogCloseClick={handleDialogCloseClick}
      />
    </Form>
  );
};

TranslationForm.propTypes = {
  sectionLabel: PropTypes.string,
  title: PropTypes.string,
  source: PropTypes.string,
  foreign: PropTypes.string,
  english: PropTypes.string,
  handleChange: PropTypes.func,
  translationType: PropTypes.string,
  response: PropTypes.string,
  isDialogShown: PropTypes.bool,
  handleButtonClick: PropTypes.func,
  handleDialogYesClick: PropTypes.func,
  handleDialogCloseClick: PropTypes.func,
};

export default TranslationForm;
