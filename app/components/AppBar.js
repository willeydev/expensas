import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import Theme from '../theme';

import { faArrowLeft, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Menu from './Menu';

function AppBar(props) {
  const {name} = useRoute();
  const [barTitle, setBarTitle] = useState('Dashboard');
  const [backRoute, setBackRoute] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  
  const [menuOpen, setMenuOpen] = useState(false);

  const navigation = useNavigation();

  const openMenu = () => {
    setMenuOpen(!menuOpen);
  }

  function setBarInfo() {
    switch(name) {
      case 'Dash': setBarTitle('Dashboard'); 
      break;
      case 'Transactions': setBarTitle('Transações'); setBackRoute('Dash')
      break;
      case 'Categories': setBarTitle('Categorias'); setBackRoute('Dash')
      break;
      case 'Accounts': setBarTitle('Contas'); setBackRoute('Dash')
      break;
      case 'Cards': setBarTitle('Cartões'); setBackRoute('Dash')
      break;
    }
  }

  useEffect(() => {
    setBarInfo()
  })

  return <>
  { menuOpen && <Menu FontAwesomeIcon={FontAwesomeIcon} isVisible={menuOpen} setIsVisible={setMenuOpen} />}
  <Appbar.Header style={{backgroundColor: Theme.Colors.Green1, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
    <View style={{flex: 1, marginLeft: 10}}>
      { barTitle != 'Dashboard' ?
        <TouchableOpacity
          style={[styles.button, isHovered && styles.buttonHovered]}
          onPressIn={() => setIsHovered(true)}
          onPressOut={() => setIsHovered(false)}
          onPress={() => {
            navigation.navigate(backRoute);
            props.fetchData;

          }} 
        >
          
          <FontAwesomeIcon size={20} icon={ faArrowLeft } style={{color: Theme.Colors.White}}/>
        </TouchableOpacity>
          : 
          
          <TouchableOpacity
          style={[styles.button, isHovered && styles.buttonHovered]}
          onPressIn={() => setIsHovered(true)}
          onPressOut={() => setIsHovered(false)}
          onPress={openMenu}
          >
            
            <FontAwesomeIcon size={20} icon={ faEllipsisVertical } style={{color: Theme.Colors.White}}/>
          </TouchableOpacity>
      }
    </View>
    
    <View style={{flex: 1, marginTop: 20, minWidth: 5}}>
      <Appbar.Content title={barTitle} color={Theme.Colors.White} style={{color: Theme.Colors.White}}/>
      
    </View>

    <View style={{flex: 1, alignItems: 'flex-end', marginRight: 10}}>
      <View style={
        {
          minWidth: 37,
          minHeight: 37,
          borderRadius: 50,
          backgroundColor: Theme.Colors.White,
        }
      }>
        <Text style={
          {
            textAlign: 'center',
            fontSize: 20,
            paddingTop: 5,
            fontWeight: 'bold',
            color: Theme.Colors.FontColor1
          }
        }>
          W
        </Text>
      </View>
    </View>
  </Appbar.Header>
  </>
}

const styles = StyleSheet.create(Theme.BtnHover);

export default AppBar;