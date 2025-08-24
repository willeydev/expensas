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
import { formatMoney } from '../../utils/format';
import NewCreditCard from '../cards/newCreditCard';
import NewPayment from './newPayment';

const Dash = () => {
  
  const [modalCard, setModalCard] = useState(false);
  const [modalBank, setModalBank] = useState(false);
  const [modalPayment, setModalPayment] = useState(false);
  const [dashData, setDashData] = useState({});
  const [cardSelected, setCardSelected] = useState({});

  const [filteredMonth, setFilteredMonth] = useState(getMonth('string'));
  const [filteredYear, setFilteredYear] = useState(getYear('string'));
    
  const [cards, setCards] = useState([]);
  const [accounts, setAccounts] = useState([]);
  
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
    fetchCards();
    fetchAccounts();
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

    <NewPayment
      visible={false}
      FontAwesomeIcon={FontAwesomeIcon}
      modal={modalPayment}
      setModal={setModalPayment}
      fetchData={fetchData}
      cardSelected={cardSelected}
    /> 

    <AppBar fetchData={fetchData} />
    <ScrollView style={{paddingBottom: 100}}>
      <View style={Theme.MainView}>
          
          <Resumo 
            FontAwesomeIcon={FontAwesomeIcon} 
            balancePredicted={formatMoney(dashData.balance_preview)}
            totalPredictedReceipt={formatMoney(dashData.receipt_preview)}
            totalPredictedExpense={formatMoney(dashData.expense_preview)}

            totalEffectedReceipt={formatMoney(dashData.receipt_effected)}
            totalEffectedExpense={formatMoney(dashData.expense_effected)}
            balanceEffected={formatMoney(dashData.balance_effected)}

          ></Resumo>
          <Cartoes 
            setModal={setModalCard} 
            setModalPayment={setModalPayment} 
            modalPayment={modalPayment}
            fetchData={fetchAll}
            cards={cards} 
            FontAwesomeIcon={FontAwesomeIcon}
            setCard={setCardSelected}
          >
              
          </Cartoes>
          <Contas setModal={setModalBank} accounts={accounts} FontAwesomeIcon={FontAwesomeIcon}></Contas>
      </View>
    </ScrollView>
    <BottomBar fetchCards={fetchCards} fetchData={fetchData}/>
  </>
};

export default Dash;