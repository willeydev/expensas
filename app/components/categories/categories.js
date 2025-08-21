import { faDeleteLeft, faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Button, DataTable, IconButton, Text } from "react-native-paper";
import Theme from "../../theme";
import AppBar from "../AppBar";
import BottomBar from "../BottomBar";
import ConfirmDialog from "../confirmDialog";
import NewCategory from "./newCategory";
const Categories = () => {

    const [page, setPage] = useState(0);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const [numberOfItemsPerPageList] = useState([7, 10, 20, 30, 1000]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
      numberOfItemsPerPageList[4]
    );

    const [search, setSearch] = useState('');
    const [items, setItems] = useState([]);
    const [itemsProv, setItemsProv] = useState([]);
    const [choosedItem, setChoosedItem] = useState({});

    const [isHovered, setIsHovered] = useState(false);
    
    const [visibleDialog, setVisibleDialog] = useState(false);

    const [showBtnMore, setShowBtnMore] = useState(false);

    const [modal, setModal] = useState('');
    const [modalType, setModalType] = useState('');

    const [loading, setLoading] = useState(false);

    const openNewCategory = (type) => {
      setModal('new-category')
      setModalType(type);
    }
  
    const editItem = (item) => {
      setChoosedItem(item);
      openNewCategory('edit');
    }

    return (
      <>
          <AppBar/>
            <NewCategory 
              FontAwesomeIcon={FontAwesomeIcon} 
              fetchData={fetchData} 
              type={modalType} 
              setCurrentModal={setModal} 
              currentModal={modal} 
              choosedItem={choosedItem}
            />
            <ConfirmDialog 
              confirmAction={deleteItem} 
              visible={visibleDialog} 
              setVisible={setVisibleDialog}
              item={choosedItem}
            /> 
            <ScrollView
              style={{ flex: 1, paddingBottom: 20}}
              
            >
            <View style={Theme.MainView}>
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
            { items.slice(from, to).map((item) => (
                        <DataTable.Row key={item._id} style={{width: '95%'}}>
                        <DataTable.Cell>{item.name}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.type == 1 ? 'Receita' : 'Despesa'}</DataTable.Cell>
                        <DataTable.Cell numeric>
                        <IconButton
                            style={{
                                backgroundColor: item.color
                            }} 
                            mode="contained"
                            iconColor={Theme.Colors.Green1}
                            size={15}
                        />
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                            
                            
                          <View style={{padding: 0, flexDirection: 'row', justifyContent: 'space-around'}}>
                            <TouchableOpacity
                                  style={[styles.button, isHovered && styles.buttonHovered]}
                                  onPressIn={() => setIsHovered(true)}
                                  onPressOut={() => setIsHovered(false)}
                                  onPress={() => editItem(item)}
                              >
                                  <FontAwesomeIcon
                                      size={22}
                                      icon={faPenToSquare}
                                      style={{color: Theme.Colors.FontColor1, marginRight: 15}}
                                  />
                              </TouchableOpacity>
                              <TouchableOpacity
                                  style={[styles.button, isHovered && styles.buttonHovered]}
                                  onPressIn={() => setIsHovered(true)}
                                  onPressOut={() => setIsHovered(false)}
                                  onPress={() => confirmDelete(item)}
                              >
                                  <FontAwesomeIcon
                                      size={22}
                                      icon={faDeleteLeft}
                                      style={{color: Theme.Colors.FontColor1}}
                                  />
                              </TouchableOpacity>
                          </View>
                        </DataTable.Cell>
                        </DataTable.Row>
                    ))}
                    {!loading && items.length == 0 ? 
                      <Text style={{textAlign: 'center', padding: 15    }}>Nenhum categoria cadastrada...</Text>
                    : null } 

                    {loading ? 
                      <Text style={{textAlign: 'center', padding: 15, color: Theme.Colors.FontColor1}}>Carregando...</Text>
                    : null } 

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
            <TouchableOpacity
                    style={[styles.button, isHovered && styles.buttonHovered]}
                    onPressIn={() => setIsHovered(true)}
                    onPressOut={() => openNewCategory('create')}
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

export default Categories;