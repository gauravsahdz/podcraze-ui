import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../css/alert.css';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const AlertComponent = ({ alert }) => {
    return (
        <>
            <figure className="notification"
                style={{ display: alert.show ? 'block' : 'none', backgroundColor: alert.color }}
            >
                <div className="notification__body">
                    <FontAwesomeIcon icon={alert.icon === 'faCircleCheck' ? faCircleCheck : faCircleXmark} className="notification__icon" />
                    {alert.message}! &#128640;
                </div>
                <div className="notification__progress"
                    style={{
                        background: `linear-gradient(to right, ${alert.background})`
                    }}
                ></div>
            </figure>
        </>
    );
};

export default AlertComponent;
