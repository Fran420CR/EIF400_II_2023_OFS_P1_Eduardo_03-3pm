import React from 'react';
import styles from '../../styles/TextEditor.module.css';

const EditableTextArea: React.FC<EditableTextAreaProps> = ({ value, onChange }) => {
  return (
    <textarea
      id={styles.TI}
      value={value}
      onChange={onChange}
      rows={10}
      cols={50}
      placeholder="Write your code..."
    />
  );
};

export default EditableTextArea;
