import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, DataTable, Text } from "react-native-paper";
import Theme from "../../theme";
import AppBar from "../AppBar";
import BottomBar from "../BottomBar";
import ConfirmDialog from "../confirmDialog";
import CardsItem from "./CardsItem";
import NewCreditCard from "./newCreditCard";

import { useToast } from "react-native-toast-notifications";
import { deleteCard, getCards } from '../../services/cardService';
import NewPayment from "../dash/newPayment";
import NewTransaction from "../transactions/newTransaction";
import EditCreditCard from "./EditCreditCard";

const Cards = ({props}) => {

const [page, setPage] = useState(0);
const [numberOfItemsPerPageList] = useState([1000]);
const [itemsPerPage, onItemsPerPageChange] = useState(
  numberOfItemsPerPageList[0]
);

const [loading, setLoading] = useState(false);

const [isHovered, setIsHovered] = useState(false);

const [modal, setModal] = useState('');
const [modalType, setModalType] = useState('');


const [items, setItems] = useState([]);
const [search, setSearch] = useState('');

const [choosedItem, setChoosedItem] = useState({});
const [visibleDialog, setVisibleDialog] = useState(false);

const from = page * itemsPerPage;
const to = Math.min((page + 1) * itemsPerPage, items.length);

const openNewCreditCard = (type) => {
  setModal('new-credit-card')
  setModalType(type);
}

const fetchCards = async () => {
  const response = await getCards(2, 0);
  setCards(response.data.data);
}

// For all compoents with bottom bar
const [modalTransaction, setModalTransaction] = useState(false);
const [transactionType, setTransactionType] = useState('');

    const toast = useToast();
    const [modalCard, setModalCard] = useState(false);
    const [modalPayment, setModalPayment] = useState(false);
    const [modalEditCard, setModalEditCard] = useState(false);
    const [cardSelected, setCardSelected] = useState({});

    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const [showBtnMore, setShowBtnMore] = useState(false);

    const fetchData = async () => {
        const response = await getCards(100, 0);
        setItems(response.data.data)
        console.log
    }

    const deleteItem = async () => {

      const response = await deleteCard(choosedItem.id)

      if(response.status === 204) {
        toast.show('Conta apagada.', { type: 'success' });
        fetchData();
      } else {
        toast.show('Erro ao apagar conta.', { type: 'error' });
      }
    }

    const confirmDelete = async (item) => {
      setChoosedItem(item);
      setVisibleDialog(true);
    }

    const editItem = async (item) => {
      console.log(item);
      setChoosedItem(item);
      setModalEditCard(true);
    }

    useEffect(() => {
      fetchData();
  
    }, [])

return (
    <>
        <NewCreditCard
          FontAwesomeIcon={FontAwesomeIcon}
          modal={modalCard}
          setModal={setModalCard}
          fetchData={fetchData}
        /> 
        <EditCreditCard
          FontAwesomeIcon={FontAwesomeIcon}
          setModal={setModalEditCard} 
          modal={modalEditCard} 
          fetchData={fetchData}
          item={choosedItem}
        />  
        <ConfirmDialog 
          confirmAction={deleteItem} 
          visible={visibleDialog} 
          setVisible={setVisibleDialog}
          item={choosedItem}
        />  
        <NewTransaction
          FontAwesomeIcon={FontAwesomeIcon}
          modal={modalTransaction}
          setModal={setModalTransaction}
          fetchData={fetchData}
          type={transactionType}
        />
        <NewPayment
          visible={false}
          FontAwesomeIcon={FontAwesomeIcon}
          modal={modalPayment}
          setModal={setModalPayment}
          fetchData={fetchData}
          cardSelected={cardSelected}
        /> 
        <AppBar />
        <ScrollView style={{paddingBottom: 100}}>
              <DataTable>

                <Card.Content style={{paddingTop: 10, paddingRight: 0}}>
                    {/* <View style={{flexDirection: 'row'}}>
                      <TextInput
                          mode="contained"
                          label="Busca"
                          placeholder="Buscar por nome"
                          style={[Theme.TextInput, {width: '87%'}]}
                          placeholderTextColor={Theme.Colors.FontColor1}
                          value={search}
                          onChangeText={(search) => searchFunction(search)}
                      />
                    </View> */}
                    {items.map((item) => (
                      <DataTable.Row key={item._id} style={{width: '95%'}}>
                        <CardsItem 
                          edit={true} 
                          key={item.key} 
                          item={item}
                          FontAwesomeIcon={FontAwesomeIcon}
                          confirmDelete={confirmDelete}
                          editItem={editItem}
                          modalPayment={modalPayment}
                          setModalPayment={setModalPayment}
                          fetchData={fetchData}
                          setCard={setCardSelected}
                        />
                      </DataTable.Row>
                    ))}
                    {!loading && items.length == 0 ? 
                      <Text style={{textAlign: 'center', padding: 15    }}>Nenhum cartão cadastrado...</Text>
                    : null } 

                    {loading ? 
                      <Text style={{textAlign: 'center', padding: 15, color: Theme.Colors.FontColor1}}>Carregando...</Text>
                    : null } 
                </Card.Content>
 
                </DataTable>
        </ScrollView>
        <TouchableOpacity
                style={[styles.button, isHovered && styles.buttonHovered]}
                onPressIn={() => setIsHovered(true)}
                onPressOut={() => setIsHovered(false)}
                onPress={() => setModalCard(true)}
            >
              <View
                style={{
                    position: 'absolute',
                    bottom: 90,
                    right: 20,
                    backgroundColor: Theme.Colors.White,
                    minWidth: 50,
                    minHeight: 50,
                    borderRadius: 50,
                    justifyContent: 'center',
                    flexDirection:'row'

                }} 
              >
                <FontAwesomeIcon 
                  icon={faPlus}
                  size={25}
                  style={
                    {
                      alignContent: 'center', 
                      color: Theme.Colors.FontColor1, 
                      marginTop: 12
                    }
                  }
                />
              </View>
              </TouchableOpacity>
        <BottomBar setModal={setModalTransaction} setModalType={setTransactionType} fetchCards={fetchCards} fetchData={fetchData}/>
    </>
);
}

const styles = StyleSheet.create(Theme.BtnHover);

export default Cards;