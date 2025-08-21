import { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { Button, Divider, HelperText } from 'react-native-paper';
import Theme from '../../theme';
import InputSelect from '../inputSelect';
import { avaliableBanks } from './banksSelect';

const NewBank = (props) => {
  const [name, setName] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [validateForm, setValidateForm] = useState(false);
  const [modalTitle, setModalTitle] = useState();

  const modalId = 'new-account'; 

  const setInfo = () => {
    switch(props.type) {
      case 'create': 
      setModalTitle('Nova Conta'); 
      break;

      case 'edit': 
      setModalTitle('Editar Conta'); 
      fillData();
      break;
    }
  }

  fillData = () => {
    setName(props.choosedItem?.name);
    setSelectedBank(props.choosedItem?.selectedBank);
  }

  const closeModal = () => {
    props.setCurrentModal('');
  }

  const action = () => {
    closeModal();

  }

  if(props.currentModal != modalId) {
    return null;
  }
  
  return (
    <>
        <View style={Theme.ModalOpacity} onClick={closeModal}>
        </View>
        <View style={Theme.ModalBody}>
            <Text style={[Theme.ModalTitle, {color: Theme.Colors.FontColor1}]}>{modalTitle}</Text>
            <Divider/>
            <ScrollView>
            
            <TextInput
                autoFocus
                style={[Theme.TextInput, {marginLeft: 18}]}
                label="Nome"
                placeholder="Nome"
                placeholderTextColor={Theme.Colors.FontColor1}
                value={name}
                onChangeText={name => setName(name)}
            />
            { validateForm && name?.length < 3 ? <HelperText type="error">
              Digite ao menos 3 caracteres.
            </HelperText> : null}

            <InputSelect 
                items={avaliableBanks} 
                type='text'
                label="Selecione o banco"
                setValue={setSelectedBank}
                mode={props.type}
                customStyle={{maxHeight: 200}}
                selected={
                  props.type == 'edit' ? { 
                      label: findLabelByValue(selectedBank),
                      value: selectedBank
                  } : {
                    label: avaliableBanks[avaliableBanks.length - 1].label,
                    value: avaliableBanks[avaliableBanks.length - 1].value,
                  }
                }
            />

            { validateForm && selectedBank.length == 0 ? <HelperText type="error">
              Escolha uma instituição.
            </HelperText> : null}
            <View style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                <Button style={[Theme.ModalInput, Theme.ModalButtonSecondary]} textColor={Theme.Colors.FontColor1} mode="outlined" onPress={closeModal}>
                    Cancelar
                </Button>
                <Button style={[Theme.ModalInput, Theme.ModalButtonPrimary]} mode="contained" onPress={() => action()}>
                    Salvar
                </Button>
            </View>
            </ScrollView>
        </View>
    </>
  );
};

export default NewBank;