import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './components/UI/IconButton';
import ExpenseContextProvider from './store/expense-context';


const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

export default function App() {

function ExpenseOverview (){
  return (
    <BottomTabs.Navigator 
    screenOptions={ function ({ navigation }) {return(
      {
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: 'white', 
        tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: function ({ tintColor }) {
          return (
            <IconButton icon="add" size={24} color={tintColor} 
            onPress={() => { 
                navigation.navigate('ManageExpense')
                console.log(navigation.navigate('ManageExpense'))
              } 
        } />  );
        },
        })}
      }>
      <BottomTabs.Screen 
      name="RecentExpenses" 
      component={RecentExpenses}
      options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        
        tabBarIcon: ( {color, size} ) =>
            (<Ionicons name="hourglass"  size={size} color={color}/>)
        
      }}
      
      />
      <BottomTabs.Screen name = "AllExpenses" component={AllExpenses}
      options={{
        title: 'All Expenses',
        tabBarLabel: 'All Expenses',
        tabBarIcon: ( {color, size} ) =>
            <Ionicons name="calendar"  size={size} color={color}/>
        
      }}/>
    </BottomTabs.Navigator>
  )
}
  return (
    <>
    <StatusBar style="light" />
    <ExpenseContextProvider>

    <NavigationContainer>
            <Stack.Navigator screenOptions={
              {
                headerStyle: {backgroundColor: GlobalStyles.colors.primary500, textAlign: 'center'},
                headerTintColor: 'white',
              }
            }>
              <Stack.Screen name = "ExpensesOverview" component={ExpenseOverview} 
              options={{
                
                headerShown : false 
              }} />
              <Stack.Screen name ="ManageExpense" component={ManageExpense} options={
                {
      
                  // this effects only on IOS 
                presentation: "modal"

                }
              }/>
            </Stack.Navigator>
        </NavigationContainer>
</ExpenseContextProvider>
     
     </>
  );
}


