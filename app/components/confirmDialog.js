import { View } from 'react-native';
import { Button, Dialog, PaperProvider, Portal, Text } from 'react-native-paper';
import InputSelect from './inputSelect';

const ConfirmDialog = (props) => {

  const hideDialog = () => props.setVisible(false);

  const confirm = () => {
    props.confirmAction();
    hideDialog();
  }

  if(!props.visible){
    return null;
  }

  return (
    <View style={{width: '100%', height: '100%', zIndex: 9999, position: 'absolute'}}>
    <PaperProvider >
      <View >
        <Portal>
          <Dialog visible={true} onDismiss={hideDialog}>
            <Dialog.Title>{props.title}</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">{props.text ? props.text : 'Tem certeza que deseja excluir?'}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Não</Button>
              <Button onPress={confirm}>Sim</Button>

              { props.updateOptions ? 
                <InputSelect
                  items={props.updateOptions}
                  label={props.updateOptions[0].label}
                  setValue={props.setUpdateType}
                  mode='create'
                  customStyle={{marginLeft: -5, maxHeight: '50%'}}
                  
                /> : null

              }
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
    </View>
  );
};

export default ConfirmDialog;