import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Card, DataTable, Text } from "react-native-paper";
import Theme from "../../theme";
import AppBar from "../AppBar";
import BottomBar from "../BottomBar";
import ConfirmDialog from "../confirmDialog";
import CardsItem from "./CardsItem";
import NewCreditCard from "./newCreditCard";

const Cards = () => {

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

return (
    <>
        <NewCreditCard
          type={modalType} 
          FontAwesomeIcon={FontAwesomeIcon}
          setCurrentModal={setModal} 
          currentModal={modal} 
          fetchData={fetchData}
          choosedItem={choosedItem}
        />  
        <ConfirmDialog 
          confirmAction={deleteItem} 
          visible={visibleDialog} 
          setVisible={setVisibleDialog}
          item={choosedItem}
        /> 
        {/* <NewPayment
            type={modalType} 
            setCurrentModal={setModal} 
            currentModal={modal}
            fetchData={fetchData}
        /> */}
        <AppBar />
        <ScrollView style={{paddingBottom: 100}}>
              <DataTable>

                <Card.Content style={{paddingTop: 10, paddingRight: 0}}>
                    <View style={{flexDirection: 'row'}}>
                      <TextInput
                          mode="contained"
                          label="Busca"
                          placeholder="Buscar por nome"
                          style={[Theme.TextInput, {width: '87%'}]}
                          placeholderTextColor={Theme.Colors.FontColor1}
                          value={search}
                          onChangeText={(search) => searchFunction(search)}
                      />
                    </View>
                    {items.slice(from, to).map((item) => (
                      <DataTable.Row key={item._id} style={{width: '95%'}}>
                        <CardsItem 
                          edit={true} 
                          key={item.key} 
                          item={item}
                          FontAwesomeIcon={FontAwesomeIcon}
                          confirmDelete={confirmDelete}
                          editItem={editItem}
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
                onPress={() => openNewCreditCard('create')}
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
        <BottomBar/>
    </>
);
}

const styles = StyleSheet.create(Theme.BtnHover);

export default Cards;