import React, {useState,useEffect} from 'react';
import styles from '../../styles/TextEditor.module.css';

const TranspilateTextArea: React.FC<TranspilateTextAreaProps> = ({ value }) => {
  const [text, setText] = useState(value);
  const [lineCount, setLineCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    setText(value);

    // Contar las líneas y palabras cada vez que el valor se actualice
    const lines = value.split('\n').filter((line) => line.trim() !== '');
    const words = value.split(/\s+/).filter((word) => word.trim() !== '');

    setLineCount(lines.length);
    setWordCount(words.length);
  }, [value]);

  return (
    <div>
    <div id={styles.TextWrapper}>
      <textarea
        id={styles.TO}
        value={text}
        readOnly
        rows={10}
        cols={50}
      />
      </div> 
      <div> Ln: {lineCount} Words: {wordCount}</div>
    </div>
  );
};


export default TranspilateTextArea;
