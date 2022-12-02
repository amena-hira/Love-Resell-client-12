import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillWarning } from "react-icons/ai";

const LoginModal = () => {
    return (
        <div>
            <input type="checkbox" id="modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg flex justify-center"><span className='mr-1 text-warning' style={{paddingTop: '5px'}} ><AiFillWarning></AiFillWarning></span> Please Login At First! <Link to='/login' htmlFor="modal" className="btn-link text-pink-800">Login</Link></h3>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;