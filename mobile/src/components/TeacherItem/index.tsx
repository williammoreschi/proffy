import React, {useCallback, useState} from 'react';
import {View, Text, Image, Linking} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {RectButton} from 'react-native-gesture-handler';
import heartOutlineIcon from '../../assets/image/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/image/icons/unfavorite.png';
import whatsappIcon from '../../assets/image/icons/whatsapp.png';

import styles from './styles';
import api from '../../services/api';

export interface ITeacher {
  id: number;
  name: string;
  avatar: string;
  bio: string;
  cost: number;
  subject: string;
  whatsapp: number;
}
interface ITeacherProps {
  teacher: ITeacher;
  favorited: boolean;
}

const TeacherItem: React.FC<ITeacherProps> = ({teacher, favorited}) => {
  const [isFavorited, setIsFavorited] = useState(favorited);

  const handleLinkToWhatsapp = useCallback(() => {
    api.post('connections', {
      user_id: teacher.id,
    });

    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  }, [teacher.whatsapp]);

  const handleToggleFavorite = useCallback(async () => {
    const favorites = await AsyncStorage.getItem('favorites');

    let favoritesArray = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavorited) {
      const favoriteIndex = favoritesArray.findIndex(
        (teacherItem: ITeacher) => {
          return teacherItem.id === teacher.id;
        },
      );
      favoritesArray.splice(favoriteIndex, 1);
    } else {
      favoritesArray.push(teacher);
    }
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    setIsFavorited(!isFavorited);
  }, [isFavorited]);

  return (
    <View style={styles.constainer}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{uri: teacher.avatar}} />
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.name}>{teacher.name}</Text>
        <Text style={styles.subject}>{teacher.subject}</Text>
      </View>

      <Text style={styles.bio}>{teacher.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.prece}>
          Preço/Hora {'   '}
          <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}
            onPress={handleToggleFavorite}>
            <Image source={isFavorited ? unfavoriteIcon : heartOutlineIcon} />
          </RectButton>
          <RectButton
            style={styles.contactButton}
            onPress={handleLinkToWhatsapp}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};
export default TeacherItem;
