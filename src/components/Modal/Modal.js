import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root')

const Modal = ({children, modalIsOpen, closeModal, compact}) => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            width: compact ? '50%' : '83%',
            height: compact ? '47%' : '82%',
            padding: '20px',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    return (
        <div>
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"

            >
                {children}
            </ReactModal>
        </div>
    );
}

export default Modal;