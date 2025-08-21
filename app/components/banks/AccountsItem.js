import { faDeleteLeft, faPenToSquare, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import Theme from '../../theme';

const AccountsItem = (props) => {
  const {item} = props;

  const [isHovered, setIsHovered] = useState(false);

  const iconSize = 25;
 
  return <>
    <View style={{ flex: 1, width: '100%',backgroundColor: ''}}>
        <View style={[Theme.CardGeral, {marginBottom: 5, marginTop: 5}]}>
            <View style={[Theme.ElementoCardGeral, {flex: 15}]}>
                <props.FontAwesomeIcon size={iconSize} icon={ faWallet } style={{color: Theme.Colors.FontColor1}}/>
            </View>
            <View style={[Theme.ElementoCardGeral, {flex: 50}]}>
                <Text style={[Theme.CardFontPrimary, {color: Theme.Colors.FontColor1}]}>{item.name}</Text>
            </View>
            <View style={[Theme.ElementoCardGeral, {flex: 50}]}>
                {/*<Text style={[Theme.CardFontPrimary, {color: Theme.Colors.FontColor1}]}>Saldo</Text>*/}
                {/*<Text style={[{color: Theme.Colors.FontColor1}]}>R$ {item.amount_avaliable}</Text>*/}
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
    </View>
  </>
};

const styles = StyleSheet.create(Theme.BtnHover);

export default AccountsItem;