import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
import api from '../../services/api';

export interface ITeacher {
  id: number;
  name: string;
  avatar:string;
  bio: string;
  cost: number;
  subject: string;
  whatsapp: number;
}
interface ITeacherProps{
  teacher: ITeacher
}

const TeacherItem:React.FC<ITeacherProps> = ({ teacher }) => {
  
  function handleCreateNewConnection(){
    api.post('connections',{
      user_id: teacher.id
    });
  }

  return(
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>
      <p>{teacher.bio}</p>
      <footer>
        <p>
          Preço/hora
          <strong>R$ {teacher.cost}</strong>  
        </p>
        <a
        href={`https://wa.me/${teacher.whatsapp}`}
        onClick={handleCreateNewConnection}
        target="_blank"
        >
          <img src={whatsappIcon} alt="Whatsapp"/>
          Entrar em contato
        </a>
      </footer>
    </article>
  );
}

export default TeacherItem;