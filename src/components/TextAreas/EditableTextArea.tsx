import React from 'react';
import styles from '../../styles/TextEditor.module.css';

interface EditableTextAreaProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const EditableTextArea: React.FC<EditableTextAreaProps> = ({ value, onChange }) => {
  return (
    <textarea
      id={styles.TI}
      value={value}
      onChange={onChange}
      rows={10}
      cols={50}
      placeholder="Escribe tu código aquí..."
    />
  );
};

export default EditableTextArea;
