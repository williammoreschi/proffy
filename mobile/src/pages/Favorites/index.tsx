import React, {useCallback, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import PageHeader from '../../components/PageHeader';
import TeacherItem, {ITeacher} from '../../components/TeacherItem';

import styles from './styles';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = useCallback(async () => {
    const response = await AsyncStorage.getItem('favorites');
    console.log(response);
    if (response) {
      const favoritedTeachers = JSON.parse(response);
      setFavorites(favoritedTeachers);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [loadFavorites]),
  );

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffs favoritos" />
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}>
        {favorites.map((teacher: ITeacher) => (
          <TeacherItem key={teacher.id} favorited teacher={teacher} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Favorites;
