import { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { Button, Divider, HelperText } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
import { updateAccount } from '../../services/accountService';
import Theme from '../../theme';
import InputSelect from '../inputSelect';
import { avaliableBanks } from './banksSelect';

const EditBank = (props) => {
  const [name, setName] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedBankObj, setSelectedBankObj] = useState('');
  const toast = useToast();


  function getBankByCode(code) {
    return avaliableBanks.find(bank => String(bank.value) == String(code))?.label || null;
  }

  const action = async () => {
      if (!validateForm()) {

        return false;
      }
      
      const obj = {
        id: props.item.id,
        name: name,
        bankCode: selectedBank,
        amount: 0
      }

      const response = await updateAccount(obj);
  
      if(response.status === 200) {
        toast.show('Conta Salva.', { type: 'success' });
        props.setModal(false);
        props.fetchData();
        resetState();
      }else {
        toast.show('Erro ao atualizar a conta.', { type: 'error' });
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

  useEffect(() => {
    console.log(props.item)
    setName(props.item.name)
    setSelectedBank(props.item.bankCode)
  }, [props.item]);

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
                label={getBankByCode(props.item.bankCode)}
                setValue={setSelectedBank}
                mode={props.type}
                customStyle={{maxHeight: 200}}
                
            />
            

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

export default EditBank;