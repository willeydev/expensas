import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, DataTable, Text } from "react-native-paper";
import { useToast } from "react-native-toast-notifications";
import { deleteAccount, getAccounts } from "../../services/accountService";
import Theme from "../../theme";
import AppBar from "../AppBar";
import BottomBar from "../BottomBar";
import ConfirmDialog from "../confirmDialog";
import AccountsItem from "./AccountsItem";
import EditBank from "./editBank";
import NewBank from "./newBank";

const Accounts = () => {

    const toast = useToast();
    const [modalBank, setModalBank] = useState(false);
    const [modalEditBank, setModalEditBank] = useState(false);

    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([1000]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
      numberOfItemsPerPageList[0]
    );
    const [isHovered, setIsHovered] = useState(false);

    const [loading, setLoading] = useState(false);

    const [modal, setModal] = useState('');
    const [modalType, setModalType] = useState('');

    const [search, setSearch] = useState('');
    const [items, setItems] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const [showBtnMore, setShowBtnMore] = useState(false);

    const [choosedItem, setChoosedItem] = useState({});
    const [visibleDialog, setVisibleDialog] = useState(false);

    const fetchData = async () => {
        const response = await getAccounts(100, 0);
        setItems(response.data.data)
        console.log
    }

    const deleteItem = async () => {

      const response = await deleteAccount(choosedItem.id)

      if(response.status === 204) {
        toast.show('Cartão apagada.', { type: 'success' });
        fetchData();
      } else {
        toast.show('Erro ao apagar cartão.', { type: 'error' });
      }
    }

    const confirmDelete = async (item) => {
      setChoosedItem(item);
      setVisibleDialog(true);
    }

    const editItem = async (item) => {
      setChoosedItem(item);
      setModalEditBank(true);
    }

    useEffect(() => {
      fetchData();
  
    }, [])

    return (
        <>
            <NewBank 
              FontAwesomeIcon={FontAwesomeIcon}
              setModal={setModalBank} 
              modal={modalBank} 
              fetchData={fetchData}
            />  
            <EditBank 
              FontAwesomeIcon={FontAwesomeIcon}
              setModal={setModalEditBank} 
              modal={modalEditBank} 
              fetchData={fetchData}
              item={choosedItem}
            />  
            <ConfirmDialog 
              confirmAction={deleteItem} 
              visible={visibleDialog} 
              setVisible={setVisibleDialog}
              item={choosedItem}
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
                          <DataTable.Row key={item.id} style={{width: '95%'}}>
                            <AccountsItem 
                              FontAwesomeIcon={FontAwesomeIcon} 
                              edit={true} 
                              key={item.id} 
                              item={item}
                              confirmDelete={confirmDelete}
                              editItem={editItem}
                            />
                          </DataTable.Row>
                        ))}
                        {!loading && items.length == 0 ? 
                          <Text style={{textAlign: 'center', padding: 15    }}>Nenhuma conta cadastrada...</Text>
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
                    onPress={() => setModalBank(true)}
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
            <View style={{flexDirection: 'row', justifyContent: 'flex-start', position: 'absolute', bottom: 0}}>
            </View>
        </>
    );
}

const styles = StyleSheet.create(Theme.BtnHover);

export default Accounts;