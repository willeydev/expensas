import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import logo from '../../../assets/images/logo.png';

import Theme from '../../theme';

export default function Login({ setIsLoggedIn }) {
  const apiUrl = 'https://expensas.waantec.com.br/expensas-php/public/api';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigation = useNavigation();

  

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}/login`, { email, password });
      setIsLoggedIn(true);
      navigation.navigate('Dash');
    } catch (error) {
      toast.show(error.response?.status === 401 ? 'Credenciais incorretas' : 'Erro ao conectar', { type: 'danger' });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: Theme.Colors.Green1 }]}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Entrar</Text>
      <Text style={styles.subtitle}>Gerencie suas finanças no melhor app de Gestão Financeira</Text>

      {/* <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor={Theme.Colors.FontColor1}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={Theme.Colors.FontColor1}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      /> */}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar com o google</Text>
      </TouchableOpacity>

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  logo: { width: 100, height: 100, marginBottom: 20 },
  title: { fontSize: 20, color: Theme.Colors.FontColorSec, marginBottom: 10 },
  subtitle: { fontSize: 14, color: Theme.Colors.FontColorSec, marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: 'white', width: '100%', padding: 10, marginBottom: 10, borderRadius: 8 },
  button: { backgroundColor: Theme.Colors.Red1, padding: 10, borderRadius: 8, width: '100%', alignItems: 'center', marginBottom: 15 },
  buttonText: { color: 'white', fontSize: 16 }
});
