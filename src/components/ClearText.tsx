import React from 'react';
import styles from '../styles/Dialog.module.css'


const ClearText: React.FC<ClearTextProps> = ({ onClose ,onConfirm}) => {
  return (
    <div className= {styles.dialog_modal}>
      <div className={styles.dialog_content}>
        <h2>Are you sure you want to clear the text?</h2>  
        <button onClick={onConfirm}>Confirm</button>  
        <button onClick={onClose}>Close</button>
       
      </div>
    </div>
  );
};

export default ClearText;