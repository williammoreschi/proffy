/* eslint-disable react/jsx-closing-bracket-location */
import React, {useState, useCallback} from 'react';
import {View, ScrollView, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  TextInput,
  BorderlessButton,
  RectButton,
} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import TeacherItem, {ITeacher} from '../../components/TeacherItem';
import PageHeader from '../../components/PageHeader';

import api from '../../services/api';

import styles from './styles';

const TeacherList: React.FC = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const loadFavorites = useCallback(async () => {
    const response = await AsyncStorage.getItem('favorites');
    if (response) {
      const favoritedTeachers = JSON.parse(response);
      const favoritedTeachersIds = favoritedTeachers.map(
        (favoritedTeacher: ITeacher) => {
          return favoritedTeacher.id;
        },
      );
      setFavorites(favoritedTeachersIds);
    }
  }, []);

  const handleFilterSubmit = useCallback(async () => {
    loadFavorites();
    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      },
    });
    setIsFilterVisible(false);
    setTeachers(response.data);
  }, [subject, week_day, time]);

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffs disponíveis"
        headerRight={
          <BorderlessButton>
            <Ionicons
              name="funnel-outline"
              size={20}
              color="#fff"
              onPress={() => {
                setIsFilterVisible(!isFilterVisible);
              }}
            />
          </BorderlessButton>
        }>
        {isFilterVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              placeholderTextColor="#c1bccc"
              style={styles.input}
              placeholder="Qual a matéria?"
              value={subject}
              onChangeText={(text) => setSubject(text)}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da Semana</Text>
                <TextInput
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  placeholder="Qual o dia?"
                  value={week_day}
                  onChangeText={(text) => setWeekDay(text)}
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  placeholder="Qual horário?"
                  value={time}
                  onChangeText={(text) => setTime(text)}
                />
              </View>
            </View>
            <RectButton
              style={styles.submitButton}
              onPress={handleFilterSubmit}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}>
        {teachers.map((teacher: ITeacher) => (
          <TeacherItem
            favorited={favorites.includes(teacher.id)}
            key={teacher.id}
            teacher={teacher}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
