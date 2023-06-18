import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

import { deletePodcast as deletePodcastService } from "../../api/podcastService";
import AlertComponent from "../../utils/alert";


const ModalDialog = ({ modalActions, closeModal, actionToPerfrom }) => {

    const [alert, setAlert] = useState({ icon: "", message: "", color: "", background: "", show: false });
    const [key, setKey] = useState(0);

    const actionBtn = () => {
        if (modalActions.action === "Delete") {
            actionToPerfrom()
                .then((response) => {
                    closeModal();
                })
                .catch((error) => {
                    setAlert({ icon: 'faCircleXmark', message: error.response.data.message, color: "#e87474", show: true });
                    setKey((prevKey) => prevKey + 1);
                });
        }
    }
    return (

        <Modal
            show={modalActions.show}
            onHide={closeModal}
        >
            <Modal.Header closeButton>
                <Modal.Title>{modalActions.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalActions.body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary"
                    onClick={closeModal}
                >Close</Button>
                <Button variant="primary"
                    onClick={actionBtn}
                >{modalActions.action}</Button>
            </Modal.Footer>
            <AlertComponent key={key} alert={alert} />
        </Modal>

    );
};

export default ModalDialog;
