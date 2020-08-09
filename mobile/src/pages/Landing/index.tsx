/* eslint-disable react/jsx-closing-bracket-location */
import React, {useCallback, useState, useEffect} from 'react';
import {View, Text, Image, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler';

import landingImg from '../../assets/image/landing.png';
import studyImg from '../../assets/image/icons/study.png';
import giveClassesImg from '../../assets/image/icons/give-classes.png';
import heartImg from '../../assets/image/icons/heart.png';

import api from '../../services/api';

import styles from './styles';

const Landing: React.FC = () => {
  const navigation = useNavigation();
  const [totalConnections, setTotalConnections] = useState(0);

  const handleNavigationGiveClassesPage = useCallback(() => {
    navigation.navigate('GiveClasses');
  }, [navigation]);

  const handleNavigationToStudyPage = useCallback(() => {
    navigation.navigate('Study');
  }, [navigation]);

  useEffect(() => {
    try {
      api.get('/connections').then((response) => {
        const {total} = response.data;
        setTotalConnections(total);
      });
    } catch (err) {
      Alert.alert('Erro', 'Desculpe não foi possível conectar ao servidor');
    }
  }, []);

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} />

      <Text style={styles.title}>
        Seja bem-vindo,{'\n'}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton
          onPress={handleNavigationToStudyPage}
          style={[styles.button, styles.buttonPrimary]}>
          <Image source={studyImg} />
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton
          onPress={handleNavigationGiveClassesPage}
          style={[styles.button, styles.buttonSecondary]}>
          <Image source={giveClassesImg} />
          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de {totalConnections} conexões ja realizadas{' '}
        <Image source={heartImg} />
      </Text>
    </View>
  );
};
export default Landing;
