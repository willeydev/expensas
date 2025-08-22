import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import Theme from '../../theme';
import AppBar from '../AppBar';
import BottomBar from '../BottomBar';
import NewBank from '../banks/newBank';
import Cartoes from './Cartoes';
import Contas from './Contas';
import Resumo from './Resumo';

import { getDashboard } from '../../services//dashService';
import { getMonth, getYear } from '../../utils/data';
import NewCreditCard from '../cards/newCreditCard';

const Dash = () => {
  
  const [modalCard, setModalCard] = useState(false);
  const [modalBank, setModalBank] = useState(false);
  const [dashData, setDashData] = useState({});
  const [modalType, setModalType] = useState('');
  const [cardSelectedUuid, setCardSelectedUuid] = useState('');
  const [filteredMonth, setFilteredMonth] = useState(getMonth('string'));
  const [filteredYear, setFilteredYear] = useState(getYear('string'));
  
  const [stateTotalPredictedReceipt, setStateTotalPredictedReceipt] = useState('0,00');
  const [stateTotalPredictedExpense, setStateTotalPredictedExpense] = useState('0,00');
  const [balancePredicted, setBalancePredicted] = useState('0,00');
  
  const [stateTotalEffectedReceipt, setStateTotalEffectedReceipt] = useState('0,00');
  const [stateTotalEffectedExpense, setStateTotalEffectedExpense] = useState('0,00');
  const [balanceEffected, setBalanceEffected] = useState('0,00');
    
  const [cards, setCards] = useState([]);
  const [accounts, setAccounts] = useState([]);
  
  const [modalSignature, setModalSignature] = useState(false);

  const openNewBank = (type) => { 
    setModalSignature(true);
    return;
  }
  const openNewCreditCard = (type) => {
    setModal('new-credit-card')
    setModalType(type);
  }
  
  const openNewPayment = (type, uuid) => {
    setModal('new-payment-card')
    setModalType(type);
    setCardSelectedUuid(uuid);
  }

  useEffect(() => {
    
    if(filteredMonth && filteredYear) {
      fetchData();
    } 

    fetchCards();
    fetchAccounts();
    
  }, [filteredMonth, filteredYear]);

  useFocusEffect(
    useCallback(() => {
      fetchAll();
      // Se precisar limpar algo, pode retornar uma função de cleanup
      return () => {};
    }, [])
  );

  const fetchData = async () => {
    const response = await getDashboard({
      startDate: filteredYear+'-'+filteredMonth+'-01',
      endDate: filteredYear+'-'+filteredMonth+'-31',
    });
    
    setDashData(response.data);
  }

  const fetchCards = () => {
    return {};
  }

  const fetchAccounts = () => {
    return {};
  }

  const fetchAll = () =>{
    fetchData();
    fetchCards();
    fetchAccounts();

  }

  return <>

    <NewBank 
      FontAwesomeIcon={FontAwesomeIcon}
      setModal={setModalBank} 
      modal={modalBank} 
      fetchData={fetchAll}
    />  
    <NewCreditCard
      FontAwesomeIcon={FontAwesomeIcon}
      modal={modalCard}
      setModal={setModalCard}
      fetchData={fetchAll}
    /> 
    <AppBar fetchData={fetchData} />
    <ScrollView style={{paddingBottom: 100}}>
      <View style={Theme.MainView}>
          
          <Resumo 
            FontAwesomeIcon={FontAwesomeIcon} 
            balancePredicted={new Intl.NumberFormat("pr-BR").format(dashData.balance_preview)}
            totalPredictedReceipt={new Intl.NumberFormat("pr-BR").format(dashData.receipt_preview)}
            totalPredictedExpense={new Intl.NumberFormat("pr-BR").format(dashData.expense_preview)}

            totalEffectedReceipt={new Intl.NumberFormat("pr-BR").format(dashData.receipt_effected)}
            totalEffectedExpense={new Intl.NumberFormat("pr-BR").format(dashData.expense_effected)}
            balanceEffected={ new Intl.NumberFormat("pr-BR").format(dashData.balance_effected)}
          ></Resumo>
          <Cartoes setModal={setModalCard} openNewPayment={openNewPayment} cards={cards} FontAwesomeIcon={FontAwesomeIcon} openNewCreditCard={() => openNewCreditCard('create')}></Cartoes>
          <Contas setModal={setModalBank} accounts={accounts} FontAwesomeIcon={FontAwesomeIcon} openNewBank={() => openNewBank('create')}></Contas>
      </View>
    </ScrollView>
    <BottomBar fetchCards={fetchCards} fetchData={fetchData}/>
  </>
};

export default Dash;