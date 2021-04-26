import React, { useRef } from 'react';
import classes from './Modal.module.scss';
import PropTypes from 'prop-types';
import { useOnClickOutside } from '../../utils/hooks';

const Modal = props => {
  const { open, children, onClose } = props;

  const ref = useRef();
  useOnClickOutside(ref, () => (open ? handleClose() : null));

  const handleClose = () => (onClose ? onClose(true) : null);

  return (
    <div role="button" className={`${classes.modal} ${open ? classes.open: '' }`}>
      <div className={classes['modal-dialog']} ref={ref}>
        <div
          className={classes['modal-content']}
        >
          <div
            className={classes['modal-header']}
          >
            <h2 className={classes['modal-title']}>Alarma</h2>
            <button className={classes['close']} onClick={() => handleClose()}>
              &times;
            </button>
          </div>
          <div className={classes['modal-body']}>
            {children}
          </div>
          <div className={classes['modal-footer']}>
            <button className="button-primary" onClick={() => handleClose()}>Cerrar</button>
          </div>
        </div>
      </div>
      <div className={classes['modal-backdrop']}></div>
    </div>
  );
};

Modal.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.any,
  onClose: PropTypes.func,
};
export default Modal;
