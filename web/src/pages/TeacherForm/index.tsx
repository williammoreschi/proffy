import React, {useState, FormEvent} from 'react'

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import api from '../../services/api';

import warningImg from '../../assets/images/icons/warning.svg';

import './styles.css';

function TeacherForm(){
  const [name,setName] = useState('');
  const [avatar,setAvatar] = useState('');
  const [whatsapp,setWhatsapp] = useState('');
  const [bio,setBio] = useState('');
  const [subject,setSubject] = useState('');
  const [cost,setCost] = useState('');

  const [scheduleItems,setScheduleItems] = useState([
    {week_day: 0, from: '', to: ''},
  ]);

  function handleAddNewScheduleItem(){
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: ''}
    ])
  }

  function handleCreateClass(e:FormEvent){
    e.preventDefault();
    console.log(
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost
    );
  }

  return (
    <div id="page-teacher-form" className="container">
    <PageHeader 
    title="Que incrível que você quer dar aula"
    description="O primeiro passo, é preencher esse formulário de inscrição"
    />
    <main>
      <form onSubmit={handleCreateClass}>
        <fieldset>
          <legend>Seus dados</legend>
          <Input 
          name="name"
          label="Nome Completo"
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          />
          <Input 
          name="avatar"
          label="Avatar" 
          type="text"
          value={avatar} 
          onChange={(e) => setAvatar(e.target.value)}
          />
          <Input 
          name="whatsapp"
          label="WhatsApp" 
          type="text"
          value={whatsapp} 
          onChange={(e) => setWhatsapp(e.target.value)}
          />        
          <Textarea
          name="bio"
          label="Biografia"
          value={bio} 
          onChange={(e) => setBio(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <legend>Sobre a aula</legend>
          <Select
          name="subject"
          label="Matéria"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          options={[
            { value: 'Artes', label: 'Artes' },
            { value: 'Geografia', label: 'Geografia' },
            { value: 'Matemática', label: 'Matemática' },
          ]}
          />
          <Input
          name="cost"
          label="Custo de sua hora por aula"
          type="text"
          value={cost}
          onChange={(e)=> setCost(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <legend>
            Horário disponíveis
            <button type='button' onClick={handleAddNewScheduleItem}>+ Novo Horário</button>
          </legend>
          { scheduleItems.map((scheduleItem,index) => {
            return(
              <div  key={index} className="schedule-item">
                <Select
                name="week_day"
                label="Dia da Semana"
                options={[
                  { value: '0', label: 'Domingo' },
                  { value: '1', label: 'Segunda-Feira' },
                  { value: '2', label: 'Terça-Feira' },
                  { value: '3', label: 'Quarta-Feira' },
                  { value: '4', label: 'Quinta-Feira' },
                  { value: '5', label: 'Sexta-Feira' },
                  { value: '6', label: 'Sábado-Feira' },
                ]}
                />
                <Input name="from" label="Das" type="time" />
                <Input name="to" label="Até" type="time" />
              </div>
            );
          }) }
        </fieldset>
        
        <footer>
          <p>
            <img src={warningImg} alt="Aviso Importante"/>
            Importante!<br/>
            Preencha todos os dados
          </p>
          <button type="submit">Salvar Cadastro</button>
        </footer>
      </form>
    </main>
    </div>
  );
  
}

export default TeacherForm;