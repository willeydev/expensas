import { faCreditCard, faDeleteLeft, faPenToSquare, faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Switch } from 'react-native-paper';
import Theme from '../../theme';

const DataTableItem = (props) => {  

const [isHovered, setIsHovered] = useState(false);
const [isEffected, setIsEffected] = useState(null);

const {item} = props;
const FontAwesomeIcon = props.FontAwesomeIcon;
const [checked, setChecked] = useState(false);
const category_name = item.category_name ? item.category_name : 'Outras';

  return (
    <>
    <View style={{flex: 1, marginTop: 10}}>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
    <Text style={[Theme.Colors.FontColor1, {fontSize: 18, color: Theme.Colors.FontColor1}]}>
        {item.name.length > 0 ? item.name: category_name }
         
    </Text>
    <Text style={[Theme.Colors.FontColor1, { fontSize: 17, color: item.isReceipt ? Theme.Colors.Green1 : Theme.Colors.Red1 }]}>
        R$ {item.isDivided ? item.installmentValue : item.amount}
    </Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
    <Text style={{color: Theme.Colors.FontColor1}}>
        {item.card_name.lenth > 0 ? 
        
        <>
            <FontAwesomeIcon
                size={20}
                icon={faCreditCard}
                style={{color: Theme.Colors.FontColor1,}}
            />
        {item.card_name}
        </>  
        :
        <>
        <FontAwesomeIcon
            size={20}
            icon={faPiggyBank}
            style={{color: Theme.Colors.FontColor1, marginRight: 5}}
        />
        </>
        } {item.card_name.length == 0 ? item.account_name : null } - {category_name} {item.isDivided ? '| Parcelada' : null} {item.isRecurrent ? '| Recorrente' : null}
    </Text>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', color: Theme.Colors.FontColor2}}>
    { 
        !item.isCard ?
            <Switch 
                style={
                    {marginRight: 8, marginTop: 3}
                }
                onTouchStart={() => {
                    setIsEffected(!item.isEffected);
                    item.isEffected = !item.isEffected;
                    props.confirmChangeEffected(item)
                }} 
                value={item.isEffected} 
                color={Theme.Colors.Green1} 
            />

        : null
    
    }
    <TouchableOpacity
        style={[styles.button, isHovered && styles.buttonHovered]}
        onPressIn={() => setIsHovered(true)}
        onPressOut={() => setIsHovered(false)}
        onPress={() => props.editItem(item)}
        >
        <Text style={{color: Theme.Colors.FontColor1, marginTop: 7, marginRight: 10}}>
            <FontAwesomeIcon
                size={20}
                icon={faPenToSquare}
                style={{color: Theme.Colors.FontColor1}}
            />
        </Text>
    </TouchableOpacity>
    <TouchableOpacity
        style={[styles.button, isHovered && styles.buttonHovered]}
        onPressIn={() => setIsHovered(true)}
        onPressOut={() => setIsHovered(false)}
        onPress={() => deleteTransaction(item)}
        >
        <Text style={{color: Theme.Colors.FontColor1, marginTop: 7, marginRight: 10}}>
            <FontAwesomeIcon
                size={20}
                icon={faDeleteLeft}
                style={{color: Theme.Colors.FontColor1}}
            />
        </Text>
    </TouchableOpacity>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        
    </View>
    </View>
    </View>
    </View>
    <View>

    </View>
    </>
  );
};

const styles = StyleSheet.create(Theme.BtnHover);

export default DataTableItem;