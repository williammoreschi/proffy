import React, { useState, FormEvent } from 'react'

import PageHeader from '../../components/PageHeader';
import TeacherItem, { ITeacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';

import searchImg from '../../assets/images/icons/search.svg';

import './styles.css';

function TeacherList(){

  const [teachers,setTeachers] = useState([]);
  const [subject,setSubject] = useState('');
  const [week_day,setWeekDay] = useState('');
  const [time,setTime] = useState('');

  async function handleSearchTeacher(e:FormEvent){
    e.preventDefault();

    const response = await api.get('/classes',{
      params:{
        subject,
        week_day,
        time
      }
    });
    
    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
    <PageHeader title="Estes são os proffys disponíveis.">
      <form id="search-teachers" onSubmit={handleSearchTeacher}>
      <Select
        name="subject"
        label="Matéria"
        defaultValue={subject}
        onChange={(e) => setSubject(e.target.value) }
        options={[
          { value: 'Artes', label: 'Artes' },
          { value: 'Geografia', label: 'Geografia' },
          { value: 'Matemática', label: 'Matemática' },
        ]}
        />
        <Select
        name="week_day"
        label="Dia da Semana"
        defaultValue={week_day}
        onChange={(e) => setWeekDay(e.target.value) }
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
        <Input
        name="time"
        label="Hora"
        type="time"
        defaultValue={time}
        onChange={(e) => setTime(e.target.value)}
        />
        <button type="submit"><img src={searchImg} alt="Pesquisar"/></button>
      </form>    
    </PageHeader>
    <main>
      {teachers.map((teacher:ITeacher) => {
        return <TeacherItem key={teacher.id} teacher={teacher} />
      })}
    </main>
    </div>
  );
  
}

export default TeacherList;