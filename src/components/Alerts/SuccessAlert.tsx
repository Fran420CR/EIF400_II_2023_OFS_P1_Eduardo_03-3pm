import React, { useEffect, useState } from 'react';
import styles from '../../styles/SuccessAlert.module.css'; // Importa los estilos CSS módulo

interface SuccessAlertProps {
  message: string;
  onClose: () => void;
}

const SuccessAlert: React.FC<SuccessAlertProps> = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      // Establece un temporizador para ocultar el mensaje después de 2 segundos
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose(); // Cierra la alerta después de ocultarla
      }, 3000);

      // Limpia el temporizador cuando el componente se desmonta
      return () => {
        clearTimeout(timer);
      };
    }
  }, [message, onClose]); // Agrega onClose como una dependencia

  return (
    <div className={`${styles.successAlert} ${isVisible ? styles.active : ''}`}>
      <p>{message}</p>
    </div>
  );
};

export default SuccessAlert;
