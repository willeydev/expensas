import { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { Button, Divider, HelperText } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
import { createAccount } from '../../services/accountService';
import Theme from '../../theme';
import InputSelect from '../inputSelect';
import { avaliableBanks } from './banksSelect';

const NewBank = (props) => {
  const [name, setName] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const toast = useToast();

  const action = async () => {
      if (!validateForm()) {
        console.log('invalid');
        return false;
      }
  
      const obj = {
        name: name,
        bankCode: selectedBank,
        amount: 0
      }
      const response = await createAccount(obj);
  
      if(response.status === 201) {
        toast.show('Conta Salva.', { type: 'success' });
        props.setModal(false);
        props.fetchData();
        resetState();
      }else {
        toast.show('Erro ao salvar a conta.', { type: 'error' });
      }
    }
  
    const validateForm = () => {
  
      if(name.length < 3) {
        return false;
      }
  
      if(selectedBank.length < 1) {
        return false;
      }
  
      return true;
    }
  
    const resetState = () => {
      setName('');
      setSelectedBank('');
    }

  if(props.modal !== true) {
    return null;
  }

  return (
    <>
        <View style={Theme.ModalOpacity}>
        </View>
        <View style={Theme.ModalBody}>
            <Text style={[Theme.ModalTitle, {color: Theme.Colors.FontColor1}]}>Conta</Text>
            <Divider/>
            <ScrollView>
            
            <TextInput
                autoFocus
                style={[Theme.TextInput, {marginLeft: 18}]}
                label="Descrição"
                placeholder="Descrição"
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
                label="Banco"
                setValue={setSelectedBank}
                mode={props.type}
                customStyle={{maxHeight: 200}}
            />
            { selectedBank.length == 0 ? <HelperText type="error">
              Escolha uma instituição.
            </HelperText> : null}

            <View style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                <Button style={[Theme.ModalInput, Theme.ModalButtonSecondary]} textColor={Theme.Colors.FontColor1} mode="outlined" onPress={() => props.setModal(false)}>
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