import React, {useCallback, ReactNode} from 'react';
import {View, Image, Text} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import backImg from '../../assets/image/icons/back.png';
import logoImg from '../../assets/image/logo.png';

import styles from './styles';

interface IPageHeaderProps {
  title: string;
  headerRight?: ReactNode;
}

const PageHeader: React.FC<IPageHeaderProps> = ({
  title,
  headerRight,
  children,
}) => {
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    navigation.navigate('Landing');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleGoBack}>
          <Image source={backImg} resizeMode="contain" />
        </BorderlessButton>

        <Image source={logoImg} resizeMode="contain" />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {headerRight}
      </View>

      {children}
    </View>
  );
};

export default PageHeader;
