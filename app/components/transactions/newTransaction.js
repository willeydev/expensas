import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Divider, HelperText, Switch } from 'react-native-paper';
import Theme from '../../theme';

import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useToast } from 'react-native-toast-notifications';
import { getCardDueDate, getCurrentDate } from '../../utils/data';
import InputSelect from '../inputSelect';

import { getCards } from '../../services//cardService';
import { getCategories } from '../../services//categoryService';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createTransaction } from '../../services/transactionService';

import { dateToServer } from '../../utils/data';



const NewTransaction = (props) => {

  const insets = useSafeAreaInsets();
    
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date().getDate()+'/'+String(new Date().getMonth() + 1).padStart(2, "0")+'/'+new Date().getFullYear());

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (selectedDate) => {
    setDate(selectedDate.getDate()+'/'+String(selectedDate.getMonth() + 1).padStart(2, "0")+'/'+selectedDate.getFullYear());
    hideDatePicker();
  };

  const [name, setName] = useState('');
  
  const [amount, setAmount] = useState('R$ 0,00');
  const [amountHandled, setAmountHandled] = useState(0);
  

  const [selectedBankAccount, setSelectedBankAccount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCard, setSelectedCard] = useState('');
  const [selectedInstallments, setSelectedinstallments] = useState('2');
  const [installmentValue, setInstallmentValue] = useState('');

  const defInstallments= (value) => {
    if(!Number.isNaN(Number(value)) && /\b[1-9]\d*\b/.test(value)) {
      let number = parseInt(value);
      if(number > 120) {
        setSelectedinstallments(120);
      } else {
        setSelectedinstallments(String(value));
      }
    } else {
      setSelectedinstallments('');
    }
  }

  const [dueDate, setDueDate] = useState(null);
  const [isRecurrent, setIsRecurrent] = useState(false);
  const [isEffected, setIsEffected] = useState(false);
  const [isDivided, setIsDivided] = useState(false);
  const [isCard, setIsCard] = useState(false);
  const [validateForm, setValidateForm] = useState(false);

  const resetState = () => {
    setName('');
    setAmount('')
    setSelectedBankAccount('');
    setSelectedCategory('');
    setSelectedCard('');
    setSelectedinstallments('1');
    setDate(getCurrentDate());
    setIsRecurrent(false);
    setIsEffected(false);
    setIsDivided(false);
    setIsCard(false);
    setValidateForm(false);
    setInstallmentValue('');

    let newDate = new Date();
    let newDueDate = "05/"+String(newDate.getMonth() + 1).padStart(2, '0')+"/"+String(newDate.getFullYear())
    setDueDate(newDueDate);
  }

  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [cards, setCards] = useState([]);

  const toast = useToast();

  const action = async () => {
    const transaction = {
      name: name ? name : '',
      amount: amountHandled,
      category_id: selectedCategory.value,
      date: dateToServer(date),
      dueDate: dateToServer(date),
      effectedDate: isEffected ? dateToServer(date) : null,
      credit_card_id: null,
      account_id: null,
      minDate: dateToServer(date),
      maxDate: dateToServer(date),
      credit_card_payment: false,
      type: "receipt",
      installments: selectedInstallments,
      recurrent: isDivided || isRecurrent,
      fixed: isRecurrent
    };
    const response = await createTransaction(transaction)
    
    if(response.status === 201) {
      toast.show('Transação registrada.', { type: 'success' });
      props.setModal(false);
      resetState();
      props.fetchData();
    } else {
      toast.show('Erro ao registrar transação.', { type: 'error' });
    }
  }

  const getSelectedCard = (uuid) => {

  }

  const chooseCard = (value) => {
    setSelectedCard(value);
    let item = getSelectedCard(value);
    setDueDate(getCardDueDate(item, date));
    
  }
  
  const scrollView = useRef();
  
  const onToggleEffected = () => setIsEffected(!isEffected);
  const onToggleIsCard = () => setIsCard(!isCard);
  
  const onToggleRecurrent = () => {
    setIsRecurrent(!isRecurrent);
    scrollView.current.scrollToEnd({ animated: true });
  }

  const onToggleDivided = () => {
    setIsDivided(!isDivided);
    scrollView.current.scrollToEnd({ animated: true });
  }

  const [modalTitle, setModalTitle] = useState();
  const [isHovered, setIsHovered] = useState(false);

  const [acordeonOpened, setAcordeonOpened] = useState(true);

    const defCards = async () => {
        const response = await getCards(100, 0);
        const dataReadyToSelect = response.data.data.map(item => ({
        value: item.id,
        label: item.name
        }));

        setCards(dataReadyToSelect)
    }

    const defCategories = async () => {
        const response = await getCategories(100, 0);
        
        const dataReadyToSelect = response.data.data.map(item => ({
        value: item.id,
        label: item.name
        }));
        setSelectedCategory(dataReadyToSelect[0]);
        setCategories(dataReadyToSelect);
    }

  useEffect(() => {
    defCategories();
    defCards();
  
    if(props.type == 'receipt') {
        setModalTitle('Nova Receita');
    } else if(props.type == 'expense') {
        setModalTitle('Nova Despesa');
    } else if(props.type == 'card-expense') {
        setModalTitle('Despesa de Cartão');
    }

  }, [props.type])

  const handleAmount = (text, fromServer = false) => {
    if(!text) {
      return;
    }
    text = text.toString();

    const numeric = text.replace(/\D/g, "");

    if (!numeric) {
      setAmount("");
      return;
    }

    let value = parseFloat(numeric);
    
    if(!fromServer) {
      value = parseFloat(numeric) / 100;
    }
  
    const formatted = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    
    let finalFormatted = formatted.replace('.', '');
    finalFormatted = finalFormatted.replace(',', '');
    finalFormatted = finalFormatted.replace('R$', '');
    console.log(finalFormatted);
    setAmountHandled(parseFloat(finalFormatted) / 100);

    setAmount(formatted);
  };

  const closeModal = () => {
    resetState();
    props.setModal(false);
  }

  if(!props.modal) {
   return null;
  }
  
  return (
    <>
        <View style={[Theme.ModalOpacity, {paddingBottom: insets.bottom + 16}]} onTouchStart={closeModal}>
        </View>
        <View style={[Theme.ModalBody, {flex: 1, minHeight: '70%', maxHeight: '70%',}]}>
            <Text style={[Theme.ModalTitle, {color: Theme.Colors.FontColor1}]}>{modalTitle}</Text>
            <Divider style={Theme.ModalDivider}></Divider>
            <ScrollView ref={scrollView}>
            <TextInput
                autoFocus={true}
                keyboardType="numeric"
                mode="contained"
                label="valor"
                placeholder="Valor"
                style={[Theme.TextInput]}
                placeholderTextColor={Theme.Colors.FontColor1}
                value={amount}
                onChangeText={amount => handleAmount(amount)}

            />
            { validateForm && amount.length == 0 ? <HelperText style={{textAlign: 'center'}} type="error">
                Digite um valor.
            </HelperText> : null}
            
            <TextInput
                mode="contained"
                label="Descrição"
                placeholder="Descrição"
                style={[Theme.TextInput]}
                placeholderTextColor={Theme.Colors.FontColor1}
                value={name}
                onChangeText={name => setName(name)}

            />
            

            {/* { 
              !isCard ? 
              <InputSelect 
                  items={accounts}
                  label="Selecione a conta"
                  setValue={setSelectedBankAccount}
                  mode='create'
                  customStyle={{marginLeft: -5, maxHeight: '50%'}}
              /> : null

            }

            { validateForm && !isCard && (!selectedBankAccount || selectedBankAccount?.length == 0) ? <HelperText style={{textAlign: 'center'}} type="error">
              Escolha uma conta.
            </HelperText> : null} */}

            { 
            isCard ? 
              <InputSelect 
                items={cards}
                label="Selecione o cartão"
                setValue={chooseCard}
                mode='create'
                customStyle={{marginLeft: -5, maxHeight: '50%'}}
                
              /> : null

            }


            { validateForm && isCard && (!selectedCard || selectedCard?.length == 0) ? <HelperText style={{textAlign: 'center'}} type="error">
                Escolha um cartão.
            </HelperText> : null}

            {(props.type !== 'receipt') ? <View style={[Theme.TextInput, {color: Theme.Colors.FontColor1, marginLeft: 15, flexDirection: 'row', justifyContent: 'space-between'}]}>
              <Text style={{color: Theme.Colors.FontColor1}}>No cartão</Text> 
              <Switch value={isCard} onValueChange={onToggleIsCard} color={Theme.Colors.Green1} />
            </View> : null}
          
          <View onTouchEnd={showDatePicker} style={[Theme.TextInput, {color: Theme.Colors.FontColor1, marginLeft: 20, flexDirection: 'row', justifyContent: 'space-between'}]}>
            <Text >
                 {date ? date : "Selecione uma data"}
            </Text>

            <DateTimePickerModal
            
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            </View>

            <TouchableOpacity
                style={[styles.button, isHovered && styles.buttonHovered]}
                onPressIn={() => setIsHovered(true)}
                onPressOut={() => setIsHovered(false)}
                onPress={() => setAcordeonOpened(!acordeonOpened)}
            >
              <View style={{padding: 22, flexDirection: 'row', justifyContent: 'space-between'}}
              >
                <Text>Mais opções {acordeonOpened} </Text>
                <FontAwesomeIcon size={15} icon={!acordeonOpened ? faArrowDown : faArrowUp } style={{color: 'gray'}}/>
              </View>
            </TouchableOpacity>

            { acordeonOpened ? 
              <>
              <View>

              <View>

              <View>

              { selectedCategory?.length > 0 ? <Text style={[Theme.LabelInput]}>Categoria </Text> : null }

               
              <InputSelect 
                  items={categories}
                  label="Selecione a categoria"
                  setValue={setSelectedCategory}
                  mode='create'
                  selected={selectedCategory}
                  customStyle={{marginLeft: -2, maxHeight: '50%'}}
              />
              </View>
              {/* <View>
              { date ? <Text style={Theme.LabelInput}>Data de lançamento</Text> : null }

              <TextInput
                mode="contained"
                label="data"
                placeholder=""
                style={[Theme.TextInput, {marginLeft: 20}]}
                value={date}
                onTouchStart={null}
                showSoftInputOnFocus={false}
              />
              </View> */}
              </View>

              {!isCard ? <View style={[Theme.TextInput, {color: Theme.Colors.FontColor1, marginLeft: 20, flexDirection: 'row', justifyContent: 'space-between'}]}>
                <Text style={{color: Theme.Colors.FontColor1}}>Efetivada</Text> 
                <Switch value={isEffected} onValueChange={onToggleEffected} color={Theme.Colors.Green1} />
              </View>

              : null
              }
              
              
              {!isDivided ? <View style={[Theme.TextInput, {color: Theme.Colors.FontColor1, marginLeft: 20, flexDirection: 'row', justifyContent: 'space-between'}]}>
                <Text style={{color: Theme.Colors.FontColor1}}>Recorrente</Text> 
                <Switch label="Recorrente" value={isRecurrent} onValueChange={onToggleRecurrent} color={Theme.Colors.Green1}/>  
              </View> : null }
               
              {!isRecurrent ? <View style={[Theme.TextInput, {color: Theme.Colors.FontColor1, marginLeft: 20, flexDirection: 'row', justifyContent: 'space-between'}]}>
                <Text style={{color: Theme.Colors.FontColor1}}>Parcelada</Text> 
                <Switch value={isDivided} onValueChange={onToggleDivided} color={Theme.Colors.Green1}/> 
              </View> : null }

              { isDivided || isRecurrent ?
                <TextInput
                  keyboardType="numeric"
                  mode="contained"
                  label="Parcelas"
                  placeholder="Parcelas"
                  style={[Theme.TextInput, {marginLeft: 20}]}
                  value={selectedInstallments}
                  onChangeText={selectedInstallments => defInstallments(selectedInstallments)}
                />
              : null}

              </View>
              </>            
              : null 
              
              }

            { !isRecurrent && isDivided && (selectedInstallments == '1' || selectedInstallments == '0' || selectedInstallments.length == 0)  ? <HelperText style={{textAlign: 'center'}} type="error">
                Digite o número de parcelas.
            </HelperText> : null}


            </ScrollView> 
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Button style={[Theme.ModalInput, Theme.ModalButtonSecondary]} textColor={Theme.Colors.FontColor1} mode="outlined" onPress={closeModal}>
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

export default NewTransaction;