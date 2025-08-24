import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import Theme from '../../theme';

import { faCreditCard, faDeleteLeft, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const CardsItem = (props) => {
  const {item} = props;

  const [isHovered, setIsHovered] = useState(false);
  const iconSize = 25;
  return <>
    <View style={{ flex: 1, width: '100%',backgroundColor: ''}}>
        <View style={[Theme.CardGeral, {marginTop: 15}]}>
            <View style={[Theme.ElementoCardGeral, {flex: 15}]}>
                <props.FontAwesomeIcon size={iconSize} icon={ faCreditCard } style={{color: Theme.Colors.FontColor1}}/>
            </View>
            <View style={[Theme.ElementoCardGeral, {flex: 50}]}>
                <Text style={[Theme.CardFontPrimary, {color: Theme.Colors.FontColor1}]}>{item.name}</Text>
                <Text style={[{color: Theme.Colors.FontColor1}]}>vencimento: {item.dueDay}</Text>
            </View>
            <View style={[Theme.ElementoCardGeral, {flex: 50}]}>
                <Text style={[Theme.CardFontPrimary, {color: Theme.Colors.FontColor1}]}>Disponível</Text>
                <Text style={[{color: Theme.Colors.FontColor1}]}>R$ {new Intl.NumberFormat("pr-BR").format(item.calculated_limit)}</Text>
            </View>
            { props.edit ? <View style={[Theme.ElementoCardGeral, {flex: 0, flexDirection: 'row'}]}>
                <TouchableOpacity
                    style={[styles.button, isHovered && styles.buttonHovered]}
                    onPressIn={() => setIsHovered(true)}
                    onPressOut={() => setIsHovered(false)}
                    onPress={() => props.editItem(item)}
                >
                    <props.FontAwesomeIcon
                        size={22}
                        icon={faPenToSquare}
                        style={{color: Theme.Colors.FontColor1, marginRight: 15}}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, isHovered && styles.buttonHovered]}
                    onPressIn={() => setIsHovered(true)}
                    onPressOut={() => setIsHovered(false)}
                    onPress={() => props.confirmDelete(item)}
                >
                    <props.FontAwesomeIcon
                        size={22}
                        icon={faDeleteLeft}
                        style={{color: Theme.Colors.FontColor1}}
                    />
                </TouchableOpacity>
            </View> : null }
        </View>
            <TouchableOpacity
                    style={[styles.button, isHovered && styles.buttonHovered]}
                    onPressIn={() => setIsHovered(true)}
                    onPressOut={() => setIsHovered(false)}
                    onPress={() => props.setModalPayment(true)}
            >
            <View style={{padding: 10, display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
                <Text 
                    style={
                        {
                            width: 80, 
                            height: 30, 
                            padding: 5, 
                            backgroundColor: Theme.Colors.FontColor1,
                            color: Theme.Colors.White,
                            textAlign: 'center',
                            borderRadius: 50
                        }
                    } 
                >
                    Pagar
                </Text>
            </View>
            </TouchableOpacity>
    </View>
  </>
};

const styles = StyleSheet.create(Theme.BtnHover);

export default CardsItem;