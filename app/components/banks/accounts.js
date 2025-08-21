import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Card, DataTable, Text } from "react-native-paper";
import Theme from "../../theme";
import AppBar from "../AppBar";
import BottomBar from "../BottomBar";
import ConfirmDialog from "../confirmDialog";
import AccountsItem from "./AccountsItem";
import NewBank from "./newBank";

const Accounts = () => {

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

    return (
        <>
            <NewBank 
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
                            <AccountsItem 
                              FontAwesomeIcon={FontAwesomeIcon} 
                              edit={true} 
                              key={item.key} 
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
                    onPress={() => openNewAccount('create')}
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