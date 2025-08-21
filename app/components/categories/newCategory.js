import { useRef, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { Button, Divider, HelperText } from 'react-native-paper';
import Theme from '../../theme';
import { colors } from './colors';

import InputSelect from '../inputSelect';

const NewCategory = (props) => {

  const [name, setName] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [color, setColor] = useState(null);
  const [modalTitle, setModalTitle] = useState();
  const [validateForm, setValidateForm] = useState(false);

  const setInfo = () => {
    switch(props.type) {
      case 'create': 
      setModalTitle('Nova Categoria'); 
      break;

      case 'edit': 
      setModalTitle('Editar Categoria'); 
      fillData();
      break;
    }
  }

  const inputRef1 = useRef(true);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);

  const action = () => {
    closeModal();
  }

  const closeModal = () => {
    props.setCurrentModal('')
  }

  const modalId = 'new-category';

  if(props.currentModal != modalId) {
    return null;
  }
  
  return (
    <>
        <View style={[Theme.ModalOpacity]} onTouchStart={closeModal}>
        </View>
        <View style={[Theme.ModalBody, {maxHeight: '100%', minHeight: '0%'}]}>
            <Text style={[Theme.ModalTitle, {color: Theme.Colors.FontColor1}]}>{modalTitle}</Text>
            <Divider style={Theme.ModalDivider}></Divider>
            <ScrollView>

                <TextInput
                    autoFocus
                    style={[Theme.TextInput, {marginLeft: 18}]}
                    label="Categoria"
                    placeholder="Categoria"
                    placeholderTextColor={Theme.Colors.FontColor1}
                    value={name}
                    onChangeText={name => setName(name)}
                />

                { validateForm && name.length < 3 ? <HelperText type="error">
                    Digite ao menos 3 caracteres.
                </HelperText> : null}

                <InputSelect 
                    ref={inputRef2}
                    items={[
                        { label: 'Receita', value: 1 },
                        { label: 'Despesa', value: 0 },
                    ]} 
                    type='text'
                    label="Selecione o tipo"
                    setValue={setSelectedType}
                    mode={props.type}
                    customStyle={{maxHeight: 200}}
                    selected={
                        props.type == 'edit' ? { 
                            label: selectedType == 1 ? 'Receita' : 'Despesa',
                            value: selectedType
                        } : null
                    }
                />
                { validateForm && selectedType != 0 && selectedType != 1 ? <HelperText type="error">
                    Escolha um tipo.
                </HelperText> : null}

                <InputSelect 
                    items={colors} 
                    type='color'
                    label="Selecione a cor"
                    setValue={setColor}
                    mode={props.type}
                    customStyle={{maxHeight: '50%'}}
                    selected={
                        props.type == 'edit' ? { 
                            label: findColorLabelByValue(color),
                            value: color
                        } : null
                    }
                />
                { validateForm && (!color || color?.length < 3) ? <HelperText type="error">
                    Escolha uma cor
                </HelperText> : null}
                
            </ScrollView> 
            <View style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                <Button style={[Theme.ModalInput, Theme.ModalButtonSecondary]} textColor={Theme.Colors.FontColor1} mode="outlined" onPress={closeModal}>
                    Cancelar
                </Button>
                <Button style={[Theme.ModalInput, Theme.ModalButtonPrimary]} mode="contained" onPress={action}>
                    Salvar
                </Button>
            </View>
        </View>
    </>
  );
};

export default NewCategory;