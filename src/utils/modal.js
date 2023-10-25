import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

import { deletePodcast as deletePodcastService } from "../api/podcastService";

const ModalDialog = ({ modalActions, closeModal, actionToPerfrom }) => {
  const actionBtn = () => {
    if (modalActions.action === "Delete") {
      actionToPerfrom();
      closeModal();
    }
  };
  return (
    <Modal show={modalActions.show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{modalActions.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalActions.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={actionBtn}>
          {modalActions.action}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDialog;
