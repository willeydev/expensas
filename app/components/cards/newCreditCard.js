import { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { Button, Divider, HelperText } from 'react-native-paper';
import Theme from '../../theme';
import InputSelect from '../inputSelect';

const NewCreditCard = (props) => {

  
  const [name, setName] = useState('');
  const [limit, setLimit] = useState('');
  const [dueDay, setDueDay] = useState('');
  const [closeDay, setCloseDay] = useState('');
  const [selectedFlag, setSelectedFlag] = useState('');

  flags = [
    { label: 'Visa', value: 'visa' },
    { label: 'Master', value: 'master' },
    { label: 'Elo', value: 'elo' },
    { label: 'American Express', value: 'american_express' },
    { label: 'Hipercard', value: 'hipercard' },
    { label: 'Alelo', value: 'alelo' },
  ]

  const action = async () => {
    if (!validateForm()) {
      console.log('invalid');
      return false;
    }
    console.log('send data');
  }

  const validateForm = () => {
    console.log(closeDay);
    if(name.length < 3) {
      return false;
    }
    
    if(limit.length < 1) {
      return false;
    }

    if(dueDay.length < 1) {
      return false;
    }

    if(closeDay.length < 1) {
      return false;
    }

    if(selectedFlag.length < 1) {
      return false;
    }

    return true;
  }
  
  if(props.modal === false) {
    return null;
  }

  return (
    <>
        <View style={Theme.ModalOpacity}>
        </View>
        <View style={[Theme.ModalBody, {minHeight: '83%', maxHeight: '83%',}]}>
            <Text style={[Theme.ModalTitle, {color: Theme.Colors.FontColor1}]}>Novo Cartão</Text>
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
            { name?.length < 3 ? <HelperText type="error">
              Digite ao menos 3 caracteres.
            </HelperText> : null}
            <TextInput
                
                keyboardType="numeric"
                style={[Theme.TextInput, {marginLeft: 18}]}
                label="Limite inicial"
                placeholder="Limite inicial"
                placeholderTextColor={Theme.Colors.FontColor1}
                value={limit}
                onChangeText={limit => setLimit(limit)}
            />
            { limit?.length < 1 ? <HelperText type="error">
              Digite o limite.
            </HelperText> : null}

            <InputSelect 
                items={[
                  { label: '01', value: '01' },
                  { label: '02', value: '02' },
                  { label: '03', value: '03' },
                  { label: '04', value: '04' },
                  { label: '05', value: '05' },
                  { label: '06', value: '06' },
                  { label: '07', value: '07' },
                  { label: '08', value: '08' },
                  { label: '09', value: '09' },
                  { label: '10', value: '10' },
                  { label: '11', value: '11' },
                  { label: '12', value: '12' },
                  { label: '13', value: '13' },
                  { label: '14', value: '14' },
                  { label: '15', value: '15' },
                  { label: '16', value: '16' },
                  { label: '17', value: '17' },
                  { label: '18', value: '18' },
                  { label: '19', value: '19' },
                  { label: '20', value: '20' },
                  { label: '21', value: '21' },
                  { label: '22', value: '22' },
                  { label: '23', value: '23' },
                  { label: '24', value: '24' },
                  { label: '25', value: '25' },
                  { label: '26', value: '26' },
                  { label: '27', value: '27' },
                  { label: '28', value: '28' },
                  { label: '29', value: '29' },
                  { label: '30', value: '30' },
                  { label: '31', value: '31' },
                  
                ]}
                type='text'
                label="Dia de vencimento"
                setValue={setDueDay}
                mode={props.type}
                customStyle={{maxHeight: 200}}
                selected={
                  props.type == 'edit' ? { 
                      label: dueDay,
                      value: dueDay
                  } : null
                }
            />
            { dueDay?.length == 0 ? <HelperText type="error">
              Selecione o dia de vencimento.
            </HelperText> : null}
            
            <InputSelect 
                items={[
                  { label: '01', value: '01' },
                  { label: '02', value: '02' },
                  { label: '03', value: '03' },
                  { label: '04', value: '04' },
                  { label: '05', value: '05' },
                  { label: '06', value: '06' },
                  { label: '07', value: '07' },
                  { label: '08', value: '08' },
                  { label: '09', value: '09' },
                  { label: '10', value: '10' },
                  { label: '11', value: '11' },
                  { label: '12', value: '12' },
                  { label: '13', value: '13' },
                  { label: '14', value: '14' },
                  { label: '15', value: '15' },
                  { label: '16', value: '16' },
                  { label: '17', value: '17' },
                  { label: '18', value: '18' },
                  { label: '19', value: '19' },
                  { label: '20', value: '20' },
                  { label: '21', value: '21' },
                  { label: '22', value: '22' },
                  { label: '23', value: '23' },
                  { label: '24', value: '24' },
                  { label: '25', value: '25' },
                  { label: '26', value: '26' },
                  { label: '27', value: '27' },
                  { label: '28', value: '28' },
                  { label: '29', value: '29' },
                  { label: '30', value: '30' },
                  { label: '31', value: '31' },
                  
                ]}
                type='text'
                label="Dia de fechamento"
                setValue={setCloseDay}
                mode={props.type}
                customStyle={{maxHeight: 200}}
                selected={
                  props.type == 'edit' ? { 
                      label: closeDay,
                      value: closeDay
                  } : null
                }
            />
            { closeDay?.length < 1 ? <HelperText type="error">
              Selecione o dia de fechamento.
            </HelperText> : null}

            <InputSelect 
                items={flags}
                type='text'
                label="Bandeira"
                setValue={setSelectedFlag}
                mode={props.type}
                customStyle={{maxHeight: 200}}
                selected={
                  props.type == 'edit' ? { 
                      label: findLabelByValue(selectedFlag),
                      value: selectedFlag
                  } : null
                }
            />
            { selectedFlag?.length == 0 ? <HelperText type="error">
              Escolha a bandeira.
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

export default NewCreditCard;