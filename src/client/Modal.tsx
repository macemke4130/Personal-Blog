import * as React from "react";
import { Link } from 'react-router-dom';

export interface ModalProps {
    display: boolean,
    displayFunction?: VoidFunction,
    destroyFunction?: VoidFunction,
    btns?: MB
};

export interface MB {
    close: boolean,
    home: boolean,
    destroy?: boolean
};

const Modal: React.FC<ModalProps> = (props) => {
    switch (props.display) {
        case true:
            return (
                <>
                    <div className="modal-container">
                        <div className="my-pop-up">
                            <h3>{props.children}</h3>
                            <div className="d-flex justify-content-around full-width">
                                {props.btns.close ? <button className="btn btn-primary" onClick={props.displayFunction}>Fine...</button> : ""}
                                {props.btns.home ? <Link to={"/"}><button className="btn btn-info">Return Home</button></Link> : ""}
                                {props.btns.destroy ? <button className="btn btn-danger" onClick={props.destroyFunction}>Delete</button> : ""}
                            </div>
                        </div>
                    </div>
                </>
            );
            break;
        case false:
            return (<> </>);
            break;
    }
};

export default Modal;