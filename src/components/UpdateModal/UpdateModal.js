import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root')

const UpdateModal = ({children, updateModalIsOpen, closeUpdateModal, compact}) => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            width: compact ? '65%' : '95%',
            height: compact ? '65%' : '95%',
            padding: '20px',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    return (
        <div>
            <ReactModal
                isOpen={updateModalIsOpen}
                onRequestClose={closeUpdateModal}
                style={customStyles}
                contentLabel="Example Modal"

            >
                {children}
            </ReactModal>
        </div>
    );
}

export default UpdateModal;