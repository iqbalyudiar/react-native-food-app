import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import CartScreen from "./src/screens/CartScreen";
import OrderListScreen from "./src/screens/OrderListScreen";
import OrderCompleteScreen from "./src/screens/OrderCompleteScreen";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const StackNavigationHelper = (name, component) => {
  <Stack.Navigator>
    <Stack.Screen name={name} component={component} />
  </Stack.Navigator>;
};

const HomeFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Card" component={CartScreen} />
    </Stack.Navigator>
  );
};

const OrderListFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="OrderList" component={OrderListScreen} />
    </Stack.Navigator>
  );
};

const OrderCompleteFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="OrderComplete" component={OrderCompleteScreen} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeFlow" component={HomeFlow} />
      <Tab.Screen
        name="OrderListFlow"
        component={OrderListFlow}
        options={{ title: "Order List" }}
      />
      <Tab.Screen
        name="OrderCompleteFlow"
        component={OrderCompleteFlow}
        options={{ title: "Order Complete" }}
      />
    </Tab.Navigator>
  );
};

function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

export default App;
