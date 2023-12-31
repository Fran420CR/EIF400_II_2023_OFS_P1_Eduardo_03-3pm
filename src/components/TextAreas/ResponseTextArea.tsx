import React from 'react';
import styles from '../../styles/TextEditor.module.css';

const ResponseTextArea: React.FC<ResponseTextAreaProps> = ({ value }) => {
  return (
    <textarea
      id={styles.TA}
      value={value}
      readOnly
      rows={10}
      cols={50}
    />
  );
};

export default ResponseTextArea;
