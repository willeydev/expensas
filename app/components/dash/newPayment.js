import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, Divider, HelperText } from 'react-native-paper';
import Theme from '../../theme';

import { getAccounts } from '../../services/accountService';
import InputSelect from '../inputSelect';



const NewPayment = (props) => {

  const [amount, setAmount] = useState('');
  const [amountHandled, setAmountHandled] = useState('');
  const [selectedBankAccount, setSelectedBankAccount] = useState('');
  const [accounts, setAccounts] = useState([]);
  const scrollView = useRef();

  const handleAmount = (text) => {

    const numeric = text.replace(/\D/g, "");

    if (!numeric) {
      setAmount("");
      return;
    }

    const value = parseFloat(numeric) / 100;

    const formatted = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    
    let finalFormatted = formatted.replace('.', '');
    finalFormatted = finalFormatted.replace(',', '');
    finalFormatted = finalFormatted.replace('R$', '');

    setAmountHandled(parseFloat(finalFormatted) / 100);
    console.log(amountHandled)
    setAmount(formatted);
  };

  const validateForm = () => {

  }


  const defAccounts = async () => {
    const response = await getAccounts(2, 0);
    const dataReadyToSelect = response.data.data.map(item => ({
      value: item.id,
      label: item.name
    }));

    setAccounts(dataReadyToSelect)
  }

  useEffect(() => {
      defAccounts();
  }, []);

  const closeModal = () => {
    setAmount('');
    setAmountHandled('');
    setSelectedBankAccount('');
    props.setModal(false)
  }

  if(props.modal === false) {
    return null;
  }

  return (
    <>
        <View style={[Theme.ModalOpacity]} onTouchStart={() => closeModal()}>
        </View>
        <View style={[Theme.ModalBody, {minHeight: '65%', maxHeight: '65%', position: 'absolute', zIndex: 10000}]}>

            <Text style={[Theme.ModalTitle, {color: Theme.Colors.FontColor1}]}>
              Pagar Fatura
            </Text>
            <Divider style={Theme.ModalDivider}></Divider>
            <ScrollView ref={scrollView}>
            <TextInput
                autoFocus
                keyboardType="numeric"
                mode="contained"
                label="valor"
                placeholder="Valor"
                style={[Theme.TextInput]}
                value={amount}
                onChangeText={amount => handleAmount(amount)}
            />
            { amountHandled.length === 0 || amountHandled === 0 ? <HelperText style={{textAlign: 'center'}} type="error">
                Digite um valor.
            </HelperText> : null}

              <InputSelect
                  items={accounts}
                  label="Selecione a conta"
                  setValue={setSelectedBankAccount}
                  mode='create'
                  customStyle={{marginLeft: -5, maxHeight: '50%'}}
              />

            { selectedBankAccount?.length == 0 ? <HelperText style={{textAlign: 'center'}} type="error">
              Escolha uma conta.
            </HelperText> : null}

            </ScrollView> 
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Button style={[Theme.ModalInput, Theme.ModalButtonSecondary]} textColor={Theme.Colors.FontColor1} mode="outlined" onPress={() => closeModal()}>
                    Cancelar
                </Button>
                <Button style={[Theme.ModalInput, Theme.ModalButtonPrimary]} mode="contained" onPress={
                  () => {
                    action();
                  }
                }>
                    Salvar
                </Button>
            </View>
        </View>
    </>
  );
};

const styles = StyleSheet.create(Theme.BtnHover);

export default NewPayment;