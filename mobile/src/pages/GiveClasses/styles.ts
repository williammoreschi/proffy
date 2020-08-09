import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8257e5',
    justifyContent: 'center',
    padding: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Archivo-Bold',
    fontSize: 32,
    lineHeight: 37,
    color: '#fff',
    maxWidth: 180,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 26,
    color: '#d4c2ff',
    marginTop: 24,
    maxWidth: 240,
  },
  okButton: {
    marginVertical: 40,
    backgroundColor: '#04d361',
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  okButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Archivo-Bold',
  },
});

export default styles;
