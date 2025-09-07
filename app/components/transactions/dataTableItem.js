import { faCreditCard, faDeleteLeft, faPenToSquare, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
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
    <Text style={{color: Theme.Colors.FontColor1, fontSize: 18, color: Theme.Colors.FontColor1}}>
        {item.name?.length > 0 ? item.name: category_name }
         
    </Text>
    <Text style={{color: Theme.Colors.FontColor1, fontSize: 17, color: item.type === 'receipt' ? Theme.Colors.Green1 : Theme.Colors.Red1 }}>
        R$ {item.isDivided ? item.installmentValue : item.amount}
    </Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
    <View style={{color: Theme.Colors.FontColor1, display: 'flex', flexDirection: 'row'}}>
        {item.credit_card_id ? 
        
        <>
            <FontAwesomeIcon
                size={20}
                icon={faCreditCard}
                style={{color: Theme.Colors.FontColor1, marginRight: 5}}
            />

        </>  
        :
        <>
        <FontAwesomeIcon
            size={20}
            icon={faWallet}
            style={{color: Theme.Colors.FontColor1, marginRight: 5}}
        />
        </>
        }
        <Text style={{marginTop: 2}}>
            {category_name} {item.isDivided ? '| Parcelada' : null} {item.fixed ? '| Fixa' : null}
        </Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', color: Theme.Colors.FontColor2}}>
    { 
        !item.isCard ?
            <Switch 
                style={
                    {marginRight: 12, marginTop: 8}
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
        
        onPressIn={() => setIsHovered(true)}
        onPressOut={() => setIsHovered(false)}
        onPress={() => props.confirmDelete(item)}
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

export default DataTableItem;