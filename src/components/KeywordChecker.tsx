import { API_SERVER_URL } from './Url';
import React, { useState, useEffect } from 'react';
import KeywordCheckerProps from '../interfaces/KeywordCheckerProps';

const KeywordChecker: React.FC<KeywordCheckerProps> = ({ text }) => {
  const [isKeyword, setIsKeyword] = useState(false);
  useEffect(() => {
    const checkKeyword = async () => {
      try {
        const response = await fetch(`${API_SERVER_URL}/word?key=${text}`);

        if (!response.ok) {
          throw new Error('La solicitud no tuvo éxito.');
        }

        const data = await response.json();
        setIsKeyword(data.isKeyword);
      } catch (error) {
        console.error('Error al verificar si el texto es una palabra clave:', error);
      }
    };

    text ? checkKeyword() : setIsKeyword(false);
  }, [text]);

  return null;
};

export default KeywordChecker;
