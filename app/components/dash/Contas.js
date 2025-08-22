import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import Theme from '../../theme';
import AccountsItem from '../banks/AccountsItem';

const Contas = (props) => {

  const iconSize = 25;
  const FontAwesomeIcon = props.FontAwesomeIcon;

  const [isHovered, setIsHovered] = useState(false);

  const navigation = useNavigation();
  
  useEffect(() => {

  }, [props])

  return <>
  
  <Card style={{ marginTop: 10, marginBottom: 5, marginLeft: 10, marginRight: 10, backgroundColor: '#fff'}}>
    <View style={[Theme.CardGeral]}>
      <View style={[Theme.TitleCard, Theme.TitleCardLeft]}>
        <Text style={[Theme.TitleCardText, {color: Theme.Colors.FontColor1}]}>
          <Text style={{color: Theme.FontColor1, fontWeight: 'bold'}}>
            Contas
          </Text>
        </Text>
      </View>
      <TouchableOpacity
            style={[styles.button, isHovered && styles.buttonHovered]}
            onPressIn={() => setIsHovered(true)}
            onPressOut={() => setIsHovered(false)}
            onPress={() => props.setModal(true)}
        >
        <View style={[Theme.TitleCard, Theme.TitleCardRight]} >
        <FontAwesomeIcon size={iconSize} icon={ faPlus } style={{color: Theme.Colors.FontColor1}}/>
      </View>
      </TouchableOpacity>        
    </View>
    <Card.Content style={{paddingTop: 10}}>
        {props.accounts.map((item) => (
          <AccountsItem 
            key={item._id} 
            item={item}
            FontAwesomeIcon={FontAwesomeIcon}
          />
        ))}
        {props.accounts.length == 0 ? 
          <Text style={{textAlign: 'center', padding: 15    }}>Nenhuma conta cadastrada...</Text>
        : null } 
      <Button 
        style={{backgroundColor: Theme.Colors.Green1, marginTop: 10}} 
        mode="contained" 
        onPress={() => navigation.navigate('Accounts')}>
        Ver todos
      </Button>
    </Card.Content>
  </Card>
  </>
};

const styles = StyleSheet.create(Theme.BtnHover);

export default Contas;