import { useState } from 'react';
import { AppRegistry } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import { name as appName } from '../app.json';
import Dash from './components/dash/dash';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
      <ToastProvider>
        <Dash/>
        {/* <Login setIsLoggedIn={setIsLoggedIn} /> */}
      </ToastProvider>
  );
};

export default App;

AppRegistry.registerComponent(appName, () => App);
