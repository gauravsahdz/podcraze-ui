import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { getAllUsers, deleteUser } from "../api/authService";
import AlertComponent from "../utils/alert";
import ModalDialog from "./utilities/modal";

const ManageUsers = ({ setLoading }) => {
    const navigate = useNavigate();
    const [usersList, setUsersList] = useState([]);
    const [alert, setAlert] = useState({ icon: "", message: "", color: "", background: "", show: false });
    const [key, setKey] = useState(0);

    const [searchText, setSearchText] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setUserIdtoDelete] = useState("");

    useEffect(() => {
        setLoading(true); // Start loading
        fetchUsers()
            .finally(() => setLoading(false)); // Stop loading when API call is finished
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await getAllUsers();
            const users = response.data.users;
            if (users) {
                setUsersList(users);
            }
        } catch (error) {
            setAlert({ icon: 'faCircleXmark', message: error.response.data.message, color: "#e87474", show: true });
            setKey((prevKey) => prevKey + 1);
        }

    };

    const addUser = (e) => {
        e.preventDefault();
        navigate("/admin/dashboard/users/action?id=new");
    };

    useEffect(() => {
        if (searchText) {
            const filteredUsers = usersList.filter((user) => {
                return user.username.toLowerCase().includes(searchText.toLowerCase());
            });
            setUsersList(filteredUsers);
        } else {
            fetchUsers();
        }
    }, [searchText]);

    const openModalDialog = (id) => (e) => {
        setShowModal(true);
        setUserIdtoDelete(id);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const editUser = (id) => (e) => {
        navigate(`/admin/dashboard/users/action?id=${id}`);
    };

    const deleteUserHandler = () => {
        setLoading(true);
        return deleteUser(userIdToDelete)
            .then((response) => {
                closeModal();
                setAlert({ icon: 'faCircleCheck', message: 'User deleted successfully', color: "#aaec8a", background: "#313e2c, #aaec8a", show: true });
                setKey((prevKey) => prevKey + 1);
                fetchUsers();
                setLoading(false);
            })
            .catch((error) => {
                setAlert({ icon: 'faCircleXmark', message: error.response.data.message, color: "#e87474", show: true });
                setKey((prevKey) => prevKey + 1);
                setLoading(false);
            });
    };


    return (
        <Container>
            <Row className="manage-podcasts-header">
                <Col>
                    <h1>Manage Users</h1>
                </Col>
            </Row>
            <Row className="manage-podcasts-actions">
                <Col xs={12} md={6} lg={3} className="add-podcast-col">
                    <Button
                        variant="primary"
                        className="add-podcast-button"
                        onClick={addUser}
                        type="button"
                    >
                        Add User
                    </Button>
                </Col>
                <Col xs={12} md={6} lg={9} className="search-podcasts-col">
                    <Form.Control
                        type="text"
                        placeholder="Search Podcasts"
                        className="search-podcasts-input"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </Col>
            </Row>
            <Table responsive>
                <thead>
                    <tr>
                        <th>SN.</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Deleted</th>
                        <th>Create Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {usersList.length === 0 && (
                        <tr>
                            <td colSpan="7"
                                style={{ color: 'black' }}
                            >No user found</td>
                        </tr>
                    )}
                    {usersList.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td style={{ textTransform: "capitalize" }}>{user.role}</td>
                                <td>{user.deleted ? "Yes" : "No"}</td>
                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        className="edit-icon"
                                        style={{
                                            marginRight: "10px",
                                        }}
                                        onClick={editUser(user._id)}
                                    />
                                    <FontAwesomeIcon icon={faTrashAlt} className="delete-icon"
                                        onClick={openModalDialog(user._id)}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            {showModal && (
                <ModalDialog
                    modalActions={{
                        title: "Delete User",
                        body: "Are you sure you want to delete this user?",
                        action: "Delete",
                        show: showModal,
                        id: userIdToDelete,
                    }}
                    closeModal={() => setShowModal(false)}
                    actionToPerfrom={deleteUserHandler}
                />
            )}
            <AlertComponent key={key} alert={alert} />
        </Container>
    );
};

export default ManageUsers;
