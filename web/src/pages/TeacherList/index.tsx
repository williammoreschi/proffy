import React from 'react'

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';

function TeacherList(){
  return (
    <div id="page-teacher-list" className="container">
    <PageHeader title="Estes são os proffys disponíveis.">
      <form id="search-teachers">
      <Select
        name="subject"
        label="Matéria"
        options={[
          { value: 'Artes', label: 'Artes' },
          { value: 'Geografia', label: 'Geografia' },
          { value: 'Matemática', label: 'Matemática' },
        ]}
        />
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
        <Input name="time" label="Hora" type="time" />
      </form>    
    </PageHeader>
    <main>
      <TeacherItem />
      <TeacherItem />
      <TeacherItem />
    </main>
    </div>
  );
  
}

export default TeacherList;