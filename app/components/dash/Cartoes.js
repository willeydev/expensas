import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { useMyContext } from '../../context/MyProvider';
import Theme from '../../theme';
import CardsItem from '../cards/CardsItem';

const Cartoes = (props) => {
  
  const FontAwesomeIcon = props.FontAwesomeIcon;
  const {setCurrentModal} = useMyContext();
  const navigation = useNavigation();
  const openCard = () => {
    setCurrentModal('new-credit-card');
  }
  const [isHovered, setIsHovered] = useState(false);
  const iconSize= 25;
  

  useEffect(() => {

  }, [props]);



  return <>
  <Card style={{ marginTop: 10, marginBottom: 5, marginLeft: 10, marginRight: 10, backgroundColor: '#fff'}}>
    <View style={[Theme.CardGeral, {marginTop: 15}]}>
      <View style={[Theme.TitleCard, Theme.TitleCardLeft]}>
        <Text style={[Theme.TitleCardText, {color: Theme.Colors.FontColor1}]}>
        <Text style={{color: Theme.FontColor1, fontWeight: 'bold'}}>
            Cartões
          </Text>
        </Text>
      </View>
      <TouchableOpacity
            style={[styles.button, isHovered && styles.buttonHovered]}
            onPressIn={() => setIsHovered(true)}
            onPressOut={() => setIsHovered(false)}
            onPress={() => {
              props.setModal(true);
            }}
        >
        <View style={[Theme.TitleCard, Theme.TitleCardRight]} >
          
          <FontAwesomeIcon size={iconSize} icon={ faPlus } style={{color: Theme.Colors.FontColor1}}/>
      </View>
      </TouchableOpacity>        
    </View>
    <Card.Content>
      {props.cards.map((item) => (
          <CardsItem 
            key={item.id} 
            item={item}
            FontAwesomeIcon={FontAwesomeIcon}
            modalPayment={props.modalPayment}
            setModalPayment={props.setModalPayment}
            fetchData={props.fetchData}
          />
        )) }
        {props.cards.length == 0 ? 
          <Text style={{textAlign: 'center', padding: 15    }}>Nenhum cartão cadastrado...</Text>
        : null } 
        <Button 
          style={{backgroundColor: Theme.Colors.Green1, marginTop: 10}} 
          mode="contained" 
          onPress={() => navigation.navigate('Cards')}
        >
          Ver todos
        </Button>
    </Card.Content>
  </Card>
  </>
};

const styles = StyleSheet.create(Theme.BtnHover);

export default Cartoes;