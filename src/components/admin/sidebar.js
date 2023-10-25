import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faDesktop, faCog, faClapperboard, faDatabase } from '@fortawesome/free-solid-svg-icons';
import "../css/sidebar.css";
import { Link } from "react-router-dom";

const SidebarComponent = () => {

    return (
        <div className="sidebar">
            <ul className="nav flex-column pt-2">
                <li className="nav-item">
                    <Link to="/admin/dashboard">
                        <FontAwesomeIcon icon={faDesktop} className="me-2" />
                        Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/dashboard/users">
                        <FontAwesomeIcon icon={faUsers} className="me-2" />
                        Manage users
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/dashboard/podcasts">
                        <FontAwesomeIcon icon={faClapperboard} className="me-2" />
                        Manage Podcasts
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/database">
                        <FontAwesomeIcon icon={faDatabase} className="me-2" />
                        Database
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/settings">
                        <FontAwesomeIcon icon={faCog} className="me-2" />
                        Settings
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default SidebarComponent;
