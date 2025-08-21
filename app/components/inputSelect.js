import { useEffect, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';
import Theme from '../theme';

const InputSelect = (props) => {
    const [selected, setSelected] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const chooseItem = (item) => {
        setSelected(item);
        //set exteral property
        props.setValue(item.value);
        setModalVisible(!modalVisible);
    }

    useEffect(() => {
        if(props.selected) {
            setSelected({
                label: props.selected.label,
                value: props.selected.value   
            });
        }
    }, [props])


    return (
        <View style={[stylesPage.container, {marginLeft: props.customStyle.marginLeft ? props.customStyle.marginLeft : -7}]} >
        {/* Outros elementos aqui */}
        
        <TouchableOpacity
            style={[styles.button, isHovered && styles.buttonHovered, Theme.TextInput, 
            {
                flexDirection: props.customStyle.flexDirection ? props.customStyle.flexDirection : Theme.TextInput.flexDirection,
                backgroundColor: props.customStyle.backgroundColor ? props.customStyle.backgroundColor : Theme.TextInput.backgroundColor,
                justifyContent: props.customStyle.justifyContent ? props.customStyle.justifyContent : Theme.TextInput.justifyContent,
                width: props.customStyle.width ? props.customStyle.width : Theme.TextInput.width,
            }]}
            onPressIn={() => setIsHovered(true)}
            onPressOut={() => setIsHovered(false)}
            onPress={() => setModalVisible(true)}
        >
        
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
                style={{
                    backgroundColor: selected?.value ? selected?.value : 'white',
                    borderColor: Theme.Colors.FontColor1,
                    borderWidth: !selected ? 1 : 0,
                    borderRadius: 50,
                    width: 18,
                    height: 18,
                    display: props.type == 'color' || props.type == 'image' ? 'flex' : 'none',
                    marginRight: 10
                }}
            />
            <Text
                style={{
                    color: props.customStyle.color
                        ? props.customStyle.color
                        : Theme.Colors.FontColor1
                }}
            >
                {selected ? selected?.label : props.label}
            </Text>
        </View>

        
        </TouchableOpacity>
        {/* Elemento flutuante */}
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}
        >
            <View style={stylesPage.modalBackground}>
                <View style={[stylesPage.modalContent, {
                    maxHeight: props.customStyle.maxHeight ? props.customStyle.maxHeight : '50%',
                }]}>
                    <View>
                    <Text style={
                        {
                            color: Theme.Colors.FontColor1, 
                            textAlign: 'center', 
                            fontWeight: 'bold',
                        }}
                    >
                        {props.label}
                    </Text>
                    <ScrollView>
                    { props.items.map((item) => (
                        <View key={item.value}>
                            <TouchableOpacity
                                style={[styles.button, isHovered && styles.buttonHovered]}
                                onPressIn={() => setIsHovered(true)}
                                onPressOut={() => setIsHovered(false)}
                                onPress={() => chooseItem(item)}
                            >
                            <View style={{
                                    flexDirection: 'row',
                                    padding: 10,                             
                                }}
                            >  
                                <View style={{
                                        backgroundColor: props.type == 'color' ? item.value : null,
                                        borderRadius: 50,
                                        width: 25,
                                        height: 25,
                                        display: props.type == 'color' || props.type == 'image' ? 'flex' : 'none'
                                }}>
                                </View>
                                
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{color: Theme.Colors.FontColor1, marginTop: 2, fontSize: 15}}>{item.label}</Text>
                                </View>
                            </View>
                            <Divider></Divider>
                            </TouchableOpacity>
                        </View>
                    )) }
                    </ScrollView>
                    </View>
                    <View onTouchStart={() => setModalVisible(!modalVisible)} style={{bottom: -2}}>
                        <Text style={
                            {
                                color: Theme.Colors.FontColor1, 
                                textAlign: 'center', 
                                marginTop: 10, 
                                fontWeight: 'bold',
                                fontSize: 20
                            }
                        }
                        >x</Text>
                    </View>
                </View>
            </View>
        </Modal>
        </View>
    );
};

const stylesPage = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 15,
    paddingBottom: 40,
    borderRadius: 10,
    elevation: 5,
    minWidth: '70%'
  },
});

const styles = StyleSheet.create(Theme.BtnHover);

export default InputSelect;
