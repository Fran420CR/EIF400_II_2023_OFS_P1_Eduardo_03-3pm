import React from 'react';
import styles from '../styles/Dialog.module.css'


const Dialog: React.FC<DialogProps> = ({ data, onClose }) => {
  return (
    <div className= {styles.dialog_modal}>
      <div className={styles.dialog_content}>
        <h2>About Us</h2>
        <ul>
          <li>Team Members:</li>
          <ul>
            {data.teamMembers.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
          <li>Course: {data.course}</li>
          <li>Project: {data.project}</li>
          <li>Semester: {data.semester}</li>
          <li>Year: {data.year}</li>
          <li>School: {data.school}</li>
          <li>University: {data.university}</li>
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Dialog;
