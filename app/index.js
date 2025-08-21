import { useState } from 'react';
import { AppRegistry } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications';
import { name as appName } from '../app.json';
import Dash from './components/dash/dash';
import { MyProvider } from './context/MyProvider';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    
      <ToastProvider>
        <MyProvider>
        <SafeAreaProvider>
          <Dash/>
          {/* <Login setIsLoggedIn={setIsLoggedIn} /> */}
        </SafeAreaProvider>
      </MyProvider>
      </ToastProvider>
  );
};

export default App;

AppRegistry.registerComponent(appName, () => App);
