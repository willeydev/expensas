import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, DataTable } from 'react-native-paper';
import Theme from '../../theme';
import AppBar from '../AppBar';
import BottomBar from '../BottomBar';
import DataTableItem from './dataTableItem';

import { useToast } from 'react-native-toast-notifications';

import { changeStatusTransaction, deleteTransaction, getTransactions } from '../../services/transactionService';
import { getMonth, getYear, monthRange } from '../../utils/data';
import ConfirmDialog from '../confirmDialog';
import NewTransaction from './newTransaction';

const Transactions = () => {  

  // For all compoents with bottom bar
  const [modalTransaction, setModalTransaction] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([1000, 10, 20, 50]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const [items, setItems] = useState([]);

  const [selectedChip, setSelectedChip] = useState();
  const [showBtnMore, setShowBtnMore] = useState(false);

  const [filteredMonth, setFilteredMonth] = useState(getMonth('string'));
  const [filteredYear, setFilteredYear] = useState(getYear('string'));

  const [search, setSearch] = useState('');
  const [place, setPlace] = useState('all');
  const [card, setCard] = useState(null);
  const [account, setAccount] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [effected, setEffected] = useState(null);

  const [loading, setLoading] = useState(false);

  const [cardSelected, setCardSelected] = useState(null);
  const [accountSelected, setAccountSelected] = useState(null);
  const [categorySelected, setCategorySelected] = useState('all');

  const [choosedItem, setChoosedItem] = useState({});
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [visibleDialog2, setVisibleDialog2] = useState(false);
  const [textConfirmDialog, setTextConfirmDIalog] = useState(false);
  const [updateType, setUpdateType] = useState('current');
  const [updateOptions, setUpdateOptions] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(null);

  const toast = useToast();

  const updateOptionsBase = [
      {
        label: 'Apenas esta',
        value: 'current'
      },
      {
        label: 'Incluir futuras',
        value: 'previous'
      },
      {
        label: 'Incluir passadas',
        value: 'next'
      },
      {
        label: 'Todas',
        value: 'all'
      }
    ];

  const [modal, setModal] = useState('');
  const [modalType, setModalType] = useState('');

  const openTransactionFilter = (type) => {
    setModal('transaction-filter')
    setModalType(type);
  }



  const fetchCards = async () => {

  }

  const fetchData = async () => {

    const response = await getTransactions(200, 0, startDate, endDate);
    console.log(response.data.data);
    setItems(response.data.data);
  }


  const editItem = (item) => {
  }
  
  const confirmDelete = (item) => {
    setUpdateType('current');
    setVisibleDialog(true);
    setChoosedItem(item);
    if(item.fixed) {
      console.log(item);
      setUpdateOptions(updateOptionsBase);
    } else {
      setUpdateOptions(null);
    }
  }

  const confirmChangeEffected = (item) => {
    console.log(item);
    setVisibleDialog2(true);
    let word = !item.dueEffectedDate ? 'não efetivada' : 'efetivada';
    setTextConfirmDIalog(`Tem certeza que deseja alterar o status de ${word}?`);
    setVisibleDialog2(true);
    setChoosedItem(item);
  }

  const changeEffected = async () => {
    const response = await changeStatusTransaction(choosedItem)

    if(response.status === 200) {
      toast.show('Status atualizado.', { type: 'success' });
      fetchData();
    } else {
      toast.show('Erro ao registrar mudança.', { type: 'error' });
    }
  }
  
  const deleteItem = async () => {
    const obj = {
      id: choosedItem.id,
      update_type: updateType
    }
    
    const response = await deleteTransaction(obj);

    if(response.status === 200) {
      toast.show('Transanção deletada.', { type: 'success' });
      fetchData();
    }else {
      toast.show('Erro ao deletar transação.', { type: 'error' });
    }
  }

  const openNewTransaction = (type) => {
    props.setModal(true)
    props.setModalType(type);
  }

  useEffect(() => {

    setStartDate(monthRange().first);
    setEndDate(monthRange().last);
    setPage(0);

    if(filteredMonth || filteredYear || receipt || place || cardSelected || accountSelected || categorySelected || effected) {
      fetchData(0);
    } else {
      fetchData();
    }
    
  }, [startDate, endDate, itemsPerPage, filteredMonth, filteredYear, receipt, place, cardSelected, accountSelected, categorySelected, effected]);

  return (
    <>
    {/* <Filter 
      type={modalType} setCurrentModal={setModal} currentModal={modal} 
      place={place}
      setPlace={setPlace}
      card={card}
      setCard={setCard}
      account={account}
      setAccount={setAccount}
      receipt={receipt}
      setReceipt={setReceipt}
      effected={effected}
      setEffected={setEffected}
      categorySelected={categorySelected}
      setCategorySelected={setCategorySelected}

      cardSelected={cardSelected}
      setCardSelected={setCardSelected}
      accountSelected={accountSelected}
      setAccountSelected={setAccountSelected}
      
    /> */}
    <NewTransaction
      FontAwesomeIcon={FontAwesomeIcon}
      modal={modalTransaction}
      setModal={setModalTransaction}
      fetchData={fetchData}
      type={transactionType}
    />
      
    <ConfirmDialog
      confirmAction={deleteItem} 
      visible={visibleDialog} 
      setVisible={setVisibleDialog}
      item={choosedItem}
      text={textConfirmDialog}
      title="Excluir"
      updateOptions={updateOptions}
      setUpdateType={setUpdateType}
    /> 
    <ConfirmDialog
      confirmAction={changeEffected}
      visible={visibleDialog2} 
      setVisible={setVisibleDialog2}
      item={choosedItem}
      text={textConfirmDialog}
      title="Efetivar"
    /> 
    <AppBar/>
    
    <ScrollView style={{paddingBottom: 100}}>
      <View style={[Theme.MainView]}>
      <View style={{flex: 1, maxWidth: '100%', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center', margin: 5}}>
{/* 
        <MonthSelector 
          FontAwesomeIcon={FontAwesomeIcon} 
          setMonth={setFilteredMonth}
          setYear={setFilteredYear}
          fetchData={fetchData}
        /> */}
        </View>
        <View style={{flexDirection: 'column'}}>
            {/* <TextInput
                mode="contained"
                label="Busca"
                placeholder="Buscar por nome"
                style={[Theme.TextInput, {width: '87%'}]}
                placeholderTextColor={Theme.Colors.FontColor1}
                value={search}
                onChangeText={(search) => searchFunction(search)}
            />
            <View style={{flexDirection: 'row', marginLeft: 18}}>
              <Text style={{color: Theme.Colors.FontColor1}} onPress={() => openTransactionFilter('edit')}>Mais filtros </Text>
              <FontAwesomeIcon size={15} icon={faFilter} style={{color: 'gray'}}/>
            </View> */}

        </View>
     
        <DataTable style={{marginTop: 20}}>

          {items.map((item) => (
            <DataTable.Row key={item.id} style={{width: '95%'}}> 
              <DataTableItem 
                item={item} 
                edit={true} 
                confirmDelete={confirmDelete}
                confirmChangeEffected={confirmChangeEffected}
                editItem={editItem}

                FontAwesomeIcon={FontAwesomeIcon}
                setIsEffe
              />
            </DataTable.Row>
          ))}

          {!loading && items.length == 0 ? 
            <Text style={{textAlign: 'center', padding: 15, color: Theme.Colors.FontColor1}}>Nenhuma transação cadastrada...</Text>
          : null } 

          {loading ? 
            <Text style={{textAlign: 'center', padding: 15, color: Theme.Colors.FontColor1}}>Carregando...</Text>
          : null } 

        </DataTable>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          { showBtnMore ? <Button 
            
            style={{borderBlockColor: 'gray', marginTop: 5, backgroundColor: Theme.Colors.White, borderWidth: 0, width: 200}} 
            mode="outlined" onPress={() => fetchData()}>
              <Text style={{color: Theme.Colors.FontColor1}}>
                Carregar mais
              </Text>
            </Button> : null }
        </View>
      </View>
    </ScrollView>
    <BottomBar setModal={setModalTransaction} setModalType={setTransactionType} fetchCards={fetchCards} fetchData={fetchData}/>
    </>
  );
};

export default Transactions;