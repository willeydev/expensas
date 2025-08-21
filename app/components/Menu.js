import {
  faChartLine,
  faCreditCard,
  faSignOutAlt,
  faTags,
  faTimes,
  faWallet
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Theme from '../theme';


const { width } = Dimensions.get('window');

// GoogleSignin.configure({
// 	webClientId: '150804640085-t6vrqtpcega0g6bhmscdas27ldmsqpgm.apps.googleusercontent.com',
// 	androidClientId: '150804640085-v1lt85jjc6t7dsgg9j6o4002388so7ur.apps.googleusercontent.com',
// 	iosClientId: '150804640085-dm35ktshqultlim48cm887qv8gqhk124.apps.googleusercontent.com',
// 	scopes: ['profile', 'email'],
// });

const Menu = ({ isVisible, setIsVisible }) => {
  const navigation = useNavigation();
  const [translateX] = useState(new Animated.Value(-width)); // Inicia fora da tela

  // Animação de entrada e saída
  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: isVisible ? 0 : -width * 0.6, // Controla até onde o menu se move
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  const navigateTo = (page) => {
    setIsVisible(false); // Fecha o menu
    navigation.navigate(page);
  };

  const logout = async (route) => {

    // clearItem();

    try {
      // await GoogleSignin.revokeAccess();
      // await GoogleSignin.signOut(); 
      navigateTo(route);
    } catch (error) {
      if(error[0] == 'SIGN_IN_REQUIRED') {
        navigateTo(route);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateX }] }, // Transição suave
        ]}
      >
        {/* Botão de Colapsar */}
        <TouchableOpacity style={styles.collapseButton} onPress={() => setIsVisible(false)}>
          <FontAwesomeIcon icon={faTimes} size={28} style={styles.icon} />
        </TouchableOpacity>

        {/* Itens do Menu */}
        <View style={styles.menu}>
          <MenuButton label="Dashboard" icon={faChartLine} onPress={() => navigateTo('Dash')} />
          <MenuButton label="Categorias" icon={faTags} onPress={() => navigateTo('Categories')} />
          <MenuButton label="Cartões" icon={faCreditCard} onPress={() => navigateTo('Cards')} />
          <MenuButton label="Contas" icon={faWallet} onPress={() => navigateTo('Accounts')} />
        </View>

        {/* Botão de Sair em destaque */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => logout('Login')}>
          <FontAwesomeIcon icon={faSignOutAlt} size={20} color="white" style={styles.icon} />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const MenuButton = ({ label, icon, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <FontAwesomeIcon icon={icon} size={20} style={{ color: Theme.Colors.Green1, marginRight: 8 }} />
    <Text style={styles.text}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: width * 0.6, // Menu ocupa 60% da largura da tela
    backgroundColor: 'white',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    paddingHorizontal: 10,
  },
  collapseButton: {
    alignSelf: 'flex-end',
    padding: 15,
    marginTop: 20,
  },
  menu: {
    flex: 1,
    paddingTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: Theme.Colors.Green2, // Cor normal
    padding: 10,
    borderRadius: 8,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    color: 'black', // Cor do texto do menu
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.Colors.Red1, // Cor do botão de logout
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Menu;
