import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import Theme from '../theme';

import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons/faCreditCard';
import { faSquareMinus } from '@fortawesome/free-solid-svg-icons/faSquareMinus';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons/faSquarePlus';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
const BOTTOM_APPBAR_HEIGHT = 80;
const MEDIUM_FAB_HEIGHT = 56;

const BottomBar = (props) => {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const navigation = useNavigation();

  const [modal, setModal] = useState('');
  const [modalType, setModalType] = useState('');

  const iconSize = 30;

  const openNewTransaction = (type) => {
    props.setModal(true);
    props.setModalType(type)
  }

  return (
    <>
    {/* <NewTransaction 
      type={modalType} 
      setCurrentModal={setModal} 
      currentModal={modal} 
      fetchData={props.fetchData}  
      fetchCards={props.fetchCards}  
    /> */}
    <Appbar
      style={[
        styles.bottom,
        {
          height: BOTTOM_APPBAR_HEIGHT + bottom,
          backgroundColor: "white",
          alignItems: 'center',
          justifyContent: 'center',
          borderTopColor: 'lightgray',
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30
        },
      ]}
      safeAreaInsets={{ bottom }}
    >

      

        <TouchableOpacity
          style={[styles.button, isHovered && styles.buttonHovered]}
          onPressIn={() => setIsHovered(true)}
          onPressOut={() => setIsHovered(false)}
          onPress={() => openNewTransaction('receipt')}
        >
          <View style={[Theme.BottomBar.contemFab]}> 
            
            <FontAwesomeIcon size={iconSize} icon={ faSquarePlus } style={{color: 'gray'}}/>
            <Text style={[Theme.BottomBar.textFab, {color: Theme.Colors.FontColor1, fontWeight: 'bold'}]}>
              Receita
            </Text>
          </View>
      </TouchableOpacity>

      <TouchableOpacity
          style={[styles.button, isHovered && styles.buttonHovered]}
          onPressIn={() => setIsHovered(true)}
          onPressOut={() => setIsHovered(false)}
          onPress={() => openNewTransaction('expense')}
        >
        <View style={[Theme.BottomBar.contemFab]}> 
            <FontAwesomeIcon size={iconSize} icon={ faSquareMinus } style={{color: 'gray'}}/>
            <Text style={[Theme.BottomBar.textFab, {color: Theme.Colors.FontColor1, fontWeight: 'bold'}]}>
              Despesa
            </Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
          style={[styles.button, isHovered && styles.buttonHovered]}
          onPressIn={() => setIsHovered(true)}
          onPressOut={() => setIsHovered(false)}
          onPress={() => openNewTransaction('card-expense')}
        >
        <View style={[Theme.BottomBar.contemFab, {textAlign: 'center'}]}> 
          <FontAwesomeIcon size={iconSize} icon={ faCreditCard } style={{color: 'gray'}}/>
            <Text style={[Theme.BottomBar.textFab, {color: Theme.Colors.FontColor1, fontWeight: 'bold'}]}>
              Des. Cart.
            </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
          style={[styles.button, isHovered && styles.buttonHovered]}
          onPressIn={() => setIsHovered(true)}
          onPressOut={() => setIsHovered(false)}
          onPress={() => {navigation.navigate('Transactions')}}
        >
        <View style={[Theme.BottomBar.contemFab]}> 
            <FontAwesomeIcon size={iconSize} icon={ faReceipt } style={{color: 'gray'}}/>
            <Text style={[Theme.BottomBar.textFab, {color: Theme.Colors.FontColor1, fontWeight: 'bold'}]}>
              Transações
            </Text>
        </View>
      </TouchableOpacity>
    </Appbar>
    </>
  );
};

const styles = StyleSheet.create(Theme.BtnHover);

export default BottomBar;