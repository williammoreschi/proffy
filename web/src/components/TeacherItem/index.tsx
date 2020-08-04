import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

const TeacherItem = () => {
  return(
    <article className="teacher-item">
      <header>
        <img src="https://avatars2.githubusercontent.com/u/2512512" alt="William Moreschi"/>
        <div>
          <strong>William Moreschi</strong>
          <span>Matemática</span>
        </div>
      </header>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.<br/>
        Impedit sit perferendis possimus debitis eius reiciendis, voluptatibus deserunt quas porro veritatis,a nisi eveniet esse ratione, dolor rerum nesciunt non! Commodi.
      </p>
      <footer>
        <p>
          Preço/hora
          <strong>R$ 25,00</strong>  
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp"/>
          Entrar em contato
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;