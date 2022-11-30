import React from 'react';

const Modal = ({ title, confirmAction, successButtonName, modalData }) => {
    return (
        <div>
            <input type="checkbox" id="modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <h3 className="text-lg font-bold text-center">
                        <p className='pt-2 pb-5'>{title}</p>
                        <label
                        onClick={()=>confirmAction(modalData)}
                         htmlFor="modal" className="btn bg-pink-800 border-none btn-sm mr-3">{successButtonName}</label>
                        <label
                         htmlFor="modal" className="btn bg-pink-800 border-none btn-sm">cancel</label>
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default Modal;