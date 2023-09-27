import React, { useState } from 'react';

// URL API
import { API_SERVER_URL } from './Url';

// ESTILOS
import styles from '../styles/TextEditor.module.css';

// COMPONENTES
import { renderLineNumbers } from './TextUtils';
import EditableTextArea from '@/components/TextAreas/EditableTextArea';
import ResponseTextArea from '@/components/TextAreas/ResponseTextArea';
import TranspilateTextArea from '@/components/TextAreas/TranspilateTextArea';
import Dialog from '@/components/Dialog';
import KeywordChecker from './KeywordChecker';
import SuccessAlert from '@/components/Alerts/SuccessAlert';
import ErrorAlert from '@/components/Alerts/ErrorAlert';

// Interfaces
import { TextEditorProps, Alert, AboutData } from '../interfaces/TextEditorProps'

const TextEditor: React.FC<TextEditorProps> = ({ keywordsList }) => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [response, setResponse] = useState('');
  const [fileName, setFileName] = useState(`Untitled-1`);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState('');
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);

  // about
  const [aboutData, setAboutData] = useState<any | null>(null);

  // textoCargado
  const [loadedScript, setLoadedScript] = useState('');

  const handleCloseAlert = () => {
    setAlert(null);
  };

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };

  const handleError = (evento: string) => {
    const isFileNameEmpty = fileName.trim() === '';
    const isInputTextEmpty = inputText.trim() === '';
    evento = `Fallo al ${evento}`;

    const errorMessage =
      isFileNameEmpty && isInputTextEmpty
        ? evento + 'Tanto el nombre del archivo como el contenido están vacíos.'
        : isFileNameEmpty
        ? evento + 'El nombre del archivo está vacío.'
        : isInputTextEmpty
        ? evento + 'El contenido del archivo está vacío.'
        : null;

    if (errorMessage) {
      setAlert({ type: 'error', message: errorMessage });
      return true;
    }
    return false;
  };

  const handleClear = () => {
    const confirmed = window.confirm('Are you sure you want to clear the text?');
    if (confirmed) {
      setInputText('');
      setOutputText('');
      setLoadedScript('');
      setResponse('');
      setSelectedSuggestion('');
      setSuggestions([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);

    const words = newText.split(/\s+/);

    const processedWords = words.map((word) => word.trim()).filter((trimmedWord) => keywordsList.includes(trimmedWord));

    const matchingSuggestions = keywordsList.filter((keyword) =>
      keyword.toLowerCase().includes(newText.toLowerCase())
    );

    setSuggestions(newText.trim() ? matchingSuggestions : []);

    const processedText = processedWords.join(' ');

    // Actualizar el outputText según el valor actual del inputText
    setOutputText(processedText);
  };

  const handleSuggestionSelected = (suggestion: string) => {
    setInputText(suggestion);
    setSelectedSuggestion(suggestion);
    setSuggestions([]); // Ocultar sugerencias al seleccionar una

    // Actualizar el outputText cuando se selecciona una sugerencia
    setOutputText(suggestion);
  };

  const handleSendToServer = async () => {
    if (handleError('enviar al servidor. ')) return;

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

      const responseData = await response.json();

      // Formatear la respuesta JSON como una cadena legible
      const formattedResponse = JSON.stringify(responseData, null, 2);
      setSelectedSuggestion(formattedResponse); // Primero guarda el valor en una variable
      setOutputText(formattedResponse); // Luego actualiza el estado de outputText
      
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };

  const handleAboutClick = async () => {
    try {
      const response = await fetch(`${API_SERVER_URL}/about`);
      if (!response.ok) {
        throw new Error('La solicitud no tuvo éxito.');
      }
      const data = await response.json();
      setAboutData(data);
    } catch (error) {
      console.error('Error al obtener datos de About:', error);
    }
  };

  const handleCloseDialog = () => {
    setAboutData(null);
  };

  const handleLoadScript = async (scriptId: string) => {
    try {
      const response = await fetch(`${API_SERVER_URL}/script?id=${scriptId}`, { method: 'GET' });

      if (!response.ok) {
        setAlert({ type: 'error', message: `Error. No se encontró el archivo con el nombre ${scriptId}` });
        throw new Error('La solicitud no tuvo éxito.');
      }

      const scriptContent = await response.text();

      setInputText(scriptContent); // Establece el contenido del script en el área editable (EA)
    } catch (error) {
      console.error('Error al cargar el script:', error);
    }
  };

  const handleNewArchive = () => {
    setFileName('Untitled-1');
    setInputText('');
  };

  const handleEvaluateScript = async () => {
    handleSendToServer();

    if (handleError('evaluar el script. ')) return;

    try {
      const response = await fetch(`${API_SERVER_URL}/eval`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ script: inputText }), // Envía el contenido del script para evaluación
      });

      if (!response.ok) {
        throw new Error('La solicitud de evaluación no tuvo éxito.');
      }

      const result = await response.json();

      // Extrae el contenido del archivo "ra_fake.txt"
      const content = result.result;
      setResponse(result.result); // Establece el resultado de la evaluación en el área de respuesta (RA)
    } catch (error) {
      console.error('Error al enviar el script para evaluación:', error);
    }
  };

  const handleSaveScript = async () => {
    const partes = fileName.split('.');
    const name = partes[0];
    const extension = partes[partes.length - 1];

    if (handleError('guardar el script. ')) return;

    try {
      const response = await fetch(`${API_SERVER_URL}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Cambia el tipo de contenido a JSON
        },
        body: JSON.stringify({
          extension,
          fileName: name, // Agrega el nombre personalizado al cuerpo de la solicitud
          scriptContent: inputText, // Agrega el contenido del script
        }),
      });

      if (response.ok) {
        setAlert({ type: 'success', message: 'Archivo guardado con éxito.' });
        console.log('Archivo guardado exitosamente.');
      } else {
        console.error('Error al guardar el archivo.');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <div>
      <div className={styles.customButtons}>
        <button className={styles.button} onClick={handleClear}>
          Clear All
        </button>
        <button className={styles.buttonSend} onClick={handleSendToServer}>
          Send to Server
        </button>
        <button className={styles.buttonSend} onClick={handleSaveScript}>
          Save Script
        </button>
        <button className={styles.buttonSend} onClick={handleEvaluateScript}>
          Compile
        </button>
        <button className={styles.buttonSend} onClick={() => handleLoadScript(fileName)}>
          Load Script
        </button>
        <button className={styles.buttonSend} onClick={handleAboutClick}>
          About
        </button>
        {aboutData && <Dialog data={aboutData} onClose={handleCloseDialog} />}
      </div>

      <input
        type="text"
        placeholder="File name"
        value={fileName}
        onChange={handleFileNameChange}
      />
      <button className={styles.buttonSend} onClick={handleNewArchive}>
        New File
      </button>

      <div className={styles.customContainer}>
        {/* AREA EDITABLE (EA) */}
        <div className={styles.lineNumbers}>{renderLineNumbers(inputText)}</div>
        <EditableTextArea value={loadedScript || inputText} onChange={handleInputChange} />

        {suggestions.length > 0 && (
          <div className={styles.suggestions_container}>
            {suggestions.map((suggestion) => (
              <div
                key={suggestion}
                className={styles.suggestion_item}
                onClick={() => handleSuggestionSelected(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}

        {/* AREA DE SALIDA (TA) */}
        <div className={styles.lineNumbers}>{renderLineNumbers(inputText)}</div>
        <TranspilateTextArea value={selectedSuggestion || outputText} />
      </div>

      <div className={styles.compile_area}>
        {/* AREA DE RESPUESTA (RA) */}
        <ResponseTextArea value={response} />
      </div>

      {/* Mostrar la alerta de error si hay un error */}
      {alert && alert.type === 'error' && <ErrorAlert message={alert.message} onClose={handleCloseAlert} />}
      {alert && alert.type === 'success' && <SuccessAlert message={alert.message} onClose={handleCloseAlert} />}

      <KeywordChecker text={inputText} />
    </div>
  );
};

export default TextEditor;
