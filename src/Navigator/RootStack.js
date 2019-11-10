import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import HomeScreen from '../Home/Component.js';
import AddScreen from '../Add/Component.js';
import EditScreen from '../Edit/Component.js';
const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Add: AddScreen,
    Edit: EditScreen,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#1e88e5',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);
const AppContainer = createAppContainer(RootStack);
export default AppContainer;
