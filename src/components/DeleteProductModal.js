import React from 'react';

import Modal from './Modal';

function DeleteProductModal(props) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div className="DeleteProductModal">
        <h1>Are You Sure?</h1>
        <p>You are about to delete this library.</p>

        <div>
          <button onClick={props.onDeleteProduct} className="btn btn-danger mr-4">
            Delete
          </button>
          <button onClick={props.onClose} className="btn btn-primary">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteProductModal;
