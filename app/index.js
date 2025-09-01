import { AppRegistry } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications';
import { name as appName } from '../app.json';
import Cards from './components/cards/cards';
import { MyProvider } from './context/MyProvider';
import Theme from './theme';

const App = () => {
  const insets = useSafeAreaInsets();

  return (
    
      <ToastProvider>
        <MyProvider>
        <SafeAreaProvider>
          <SafeAreaView style={{paddingBottom: insets.bottom + 16, flex: 1, backgroundColor: Theme.Colors.Background}}>
            {/* <Accounts/> */}
            <Cards/>
            {/* <Dash/> */}
            {/* <Login setIsLoggedIn={setIsLoggedIn} /> */}
          </SafeAreaView>
        </SafeAreaProvider>
      </MyProvider>
      </ToastProvider>
  );
};

export default App;

AppRegistry.registerComponent(appName, () => App);
