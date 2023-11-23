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
import ClearText from '@/components/ClearText';

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

  //clear
  const [isClearTextModalOpen, setClearTextModalOpen] = useState(false);

  //const handleCloseAlert = () => {
  //setAlert(null);
  //};

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

  const handleClearText = () => {
    setClearTextModalOpen(true);
  };

  const handleClearTextClose = () => {
    setClearTextModalOpen(false);
  };

  const handleClearTextConfirm = () => {
    setInputText('');
    setOutputText('');
    setLoadedScript('');
    setResponse('');
    setSelectedSuggestion('');
    setSuggestions([]);
    setClearTextModalOpen(false);
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

  const handleCloseAlert = () => {
    setAlert(null);
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
        body: JSON.stringify({ text: inputText, fileName: fileName }),
      });

      if (!response.ok) {
        throw new Error('La solicitud no tuvo éxito.');
      }

      const { message, result, file } = await response.json();


      setOutputText(`${result}`);
      handleSendResultToProlog(result);

    } catch (error) {
      console.error('Error sending data to server:', error);
    }

  };


  const handleSendResultToProlog = async (result: String) => {
    try {
      const response = await fetch('http://localhost:8000/test_output', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ result }),
      });

      if (!response.ok) {
        throw new Error('La solicitud no tuvo éxito.');
      }

      const responseData = await response.json();

      // Mostrar la respuesta del servidor Prolog en la consola
      console.log('Respuesta del servidor Prolog:', responseData);

    } catch (error) {
      console.error('Error sending result to Prolog server:', error);
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
      const response = await fetch(`${API_SERVER_URL}/scripts/${scriptId}`, { method: 'GET' });

      if (!response.ok) {
        setAlert({ type: 'error', message: `Error. No se encontró el archivo con el nombre ${scriptId}` });
        throw new Error('La solicitud no tuvo éxito.');
      }

      const { content } = await response.json();

      setInputText(content); // Establece el contenido del script en el área editable (EA)
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
        body: JSON.stringify({ script: fileName }), // Envía el contenido del script para evaluación
      });

      if (!response.ok) {
        throw new Error('La solicitud de evaluación no tuvo éxito.');
      }

      const { result } = await response.json();

      // Extrae el contenido del archivo "ra_fake.txt"

      setResponse(result); // Establece el resultado de la evaluación en el área de respuesta (RA)
    } catch (error) {
      console.error('Error al enviar el script para evaluación:', error);
    }
  };

  const handleSaveScript = async () => {
    if (handleError('guardar el script. ')) return;

    try {
      const response = await fetch(`${API_SERVER_URL}/scripts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Cambia el tipo de contenido a JSON
        },
        body: JSON.stringify({
          fileName: fileName, // Agrega el nombre personalizado al cuerpo de la solicitud
          content: inputText, // Agrega el contenido del script
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
        <button className={styles.button} onClick={handleClearText}>
          Clear All
        </button>
        {isClearTextModalOpen && (
          <ClearText onClose={handleClearTextClose} onConfirm={handleClearTextConfirm} />
        )}
        <button className={styles.buttonSend} onClick={handleSendToServer}>
          Compile
        </button>
        <button className={styles.buttonSend} onClick={handleSaveScript}>
          Save Script
        </button>
        <button className={styles.buttonSend} onClick={handleEvaluateScript}>
          Eval
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
        <TranspilateTextArea value={outputText} />
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
