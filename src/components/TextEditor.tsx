import React, { useState, ChangeEvent } from 'react';
import { API_SERVER_URL } from './Url';
import KeywordChecker from './KeywordChecker';
import styles from '../styles/TextEditor.module.css';
import { renderLineNumbers } from './TextUtils';
import TextEditorProps from '../interfaces/TextEditorProps';

const TextEditor: React.FC<TextEditorProps> = ({ keywordsList }) => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>('');

  const handleClear = () => {
    const confirmed = window.confirm('Are you sure you want to clear the text?');
    if (confirmed) {
      setInputText('');
      setOutputText('');
      setIsSaved(false);
      setSelectedSuggestion('');
      setSuggestions([]);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    const words = newText.split(/\s+/);

    const processedWords = words
      .map((word) => word.trim())
      .filter((trimmedWord) => keywordsList.includes(trimmedWord));

    const matchingSuggestions = keywordsList.filter((keyword) =>
      keyword.toLowerCase().includes(newText.toLowerCase())
    );

    setSuggestions(newText.trim() ? matchingSuggestions : []);

    const processedText = processedWords.join(' ');

    // Actualizar el outputText según el valor actual del inputText
    setOutputText(processedText);

    setIsSaved(false);
  };

  const handleSuggestionSelected = (suggestion: string) => {
    setInputText(suggestion);
    setSelectedSuggestion(suggestion);
    setSuggestions([]); // Ocultar sugerencias al seleccionar una

    // Actualizar el outputText cuando se selecciona una sugerencia
    setOutputText(suggestion);
  };

  const handleSendToServer = async () => {
    try {
      const response = await fetch(`${API_SERVER_URL}/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error('La solicitud no tuvo éxito.');
      }

      const data = await response.json();
      setSelectedSuggestion(data.result);
      setOutputText(data.result);

      setIsSaved(true);
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };

  return (
    <div>
      <div className={styles.customContainer}>
        <div className={styles.lineNumbers}>{renderLineNumbers(inputText)}</div>
        <textarea
          id={styles.TI}
          className={`${styles.customTextarea}`}
          value={inputText}
          onChange={handleInputChange}
          placeholder=""
        />
        {suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion}
                className="suggestion-item"
                onClick={() => handleSuggestionSelected(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
        <div className={styles.lineNumbers}>{renderLineNumbers(outputText)}</div>
        <textarea
          id={styles.TO}
          className={`${styles.customTextarea}`}
          readOnly
          value={selectedSuggestion || outputText}
        />
        <KeywordChecker text={inputText} />
      </div>
      <div className={styles.customButtons}>
        <button className={styles.button} onClick={handleClear}>
          Clear All
        </button>
        <button className={styles.buttonSend} onClick={handleSendToServer}>
          Send to Server
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
