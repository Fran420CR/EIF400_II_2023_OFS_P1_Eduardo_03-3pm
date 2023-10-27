import React, {useState,useEffect,useRef} from 'react';
import styles from '../../styles/TextEditor.module.css';



const EditableTextArea: React.FC<EditableTextAreaProps> = ({ value, onChange }) => {
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const [wordCount, setWordCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const calculateWordCount = (text: string) => {
    const words = text.split(/\s+/).filter((word) => word !== '').length;
    setWordCount(words);
  };

  const calculateCursorPosition = () => {
    if (textareaRef.current) {
      const selectionStart = textareaRef.current.selectionStart;
      const lines = textareaRef.current.value.substr(0, selectionStart).split('\n');
      const line = lines.length;
      // @ts-ignore
      const column = lines.pop().length + 1;
      setCursorPosition({ line, column });
    }
  };

  useEffect(() => {
    calculateWordCount(value);
  }, [value]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);
    calculateCursorPosition();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 37 && cursorPosition.column > 1) {
      // Move left
      setCursorPosition({
        ...cursorPosition,
        column: cursorPosition.column - 1,
      });
    } else if (e.keyCode === 39) {
      // Move right
      setCursorPosition({
        ...cursorPosition,
        column: cursorPosition.column + 1,
      });
    } else if (e.keyCode === 38 && cursorPosition.line > 1) {
      // Move up
      setCursorPosition({
        line: cursorPosition.line - 1,
        column: Math.min(
          cursorPosition.column,
            // @ts-ignore
          textareaRef.current?.value.split('\n')[cursorPosition.line - 2].length + 1 || 1
        ),
      });
    } else if (e.keyCode === 40) {
      // Move down
      const nextLineLength =
        // @ts-ignore 
        textareaRef.current?.value.split('\n')[cursorPosition.line].length + 1 || 1;
      setCursorPosition({
        line: cursorPosition.line + 1,
        column: Math.min(cursorPosition.column, nextLineLength),
      });
    }
  };

  const handleTextareaClick = () => {
    calculateCursorPosition();
  };

  return (
    <div>
      <div id={styles.TextWrapper}>
        <textarea
          ref={textareaRef}
          id={styles.TI}
          value={value}
          onChange={handleTextareaChange}
          onClick={handleTextareaClick}
          onKeyDown={handleKeyDown}
          rows={10}
          cols={50}
          placeholder="Write your code..."
        />
      </div>
      <div> Ln: {cursorPosition.line} Column: {cursorPosition.column} Words: {wordCount}</div>
    </div>
  );
  };

  export default EditableTextArea;