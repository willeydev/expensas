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

import { getCards } from '../../services//cardService';
import { getDashboard } from '../../services//dashService';
import { getMonth, getYear } from '../../utils/data';
import NewCreditCard from '../cards/newCreditCard';

const Dash = () => {
  
  const [modalCard, setModalCard] = useState(false);
  const [modalBank, setModalBank] = useState(false);
  const [dashData, setDashData] = useState({});

  const [filteredMonth, setFilteredMonth] = useState(getMonth('string'));
  const [filteredYear, setFilteredYear] = useState(getYear('string'));
    
  const [cards, setCards] = useState([]);
  const [accounts, setAccounts] = useState([]);
  
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

  const fetchCards = async () => {
    const response = await getCards(2, 0);
    setCards(response.data.data);
    console.log(cards);

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
          <Cartoes setModal={setModalCard} openNewPayment={openNewPayment} cards={cards} FontAwesomeIcon={FontAwesomeIcon}></Cartoes>
          <Contas setModal={setModalBank} accounts={accounts} FontAwesomeIcon={FontAwesomeIcon}></Contas>
      </View>
    </ScrollView>
    <BottomBar fetchCards={fetchCards} fetchData={fetchData}/>
  </>
};

export default Dash;