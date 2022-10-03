// Utils
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

// Screens
import HomeScreen from "./src/screens/HomeScreen";
import CartScreen from "./src/screens/CartScreen";
import OrderListScreen from "./src/screens/OrderListScreen";
import OrderCompleteScreen from "./src/screens/OrderCompleteScreen";
import RestaurantDetailScreen from "./src/screens/RestaurantDetailScreen";

// Components
import { FontAwesome } from "@expo/vector-icons";
import { Provider as RestaurantProvider } from "./src/context/RestaurantContext";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const HomeFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
};

const OrderListFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrderList"
        component={OrderListScreen}
        options={{
          title: "Order List",
        }}
      />
    </Stack.Navigator>
  );
};

const OrderCompleteFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrderComplete"
        component={OrderCompleteScreen}
        options={{
          title: "Order Complete",
        }}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: "white" }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const color = focused ? "#1464cc" : "gray";
          let iconName;

          switch (route.name) {
            case "HomeFlow":
              iconName = "home";
              break;
            case "OrderListFlow":
              iconName = "list-ul";
              break;
            case "OrderCompleteFlow":
              iconName = "check";
              break;
            default:
              break;
          }
          return <FontAwesome name={iconName} size={24} color={color} />;
        },
        tabBarLabel: null,
      })}
    >
      <Tab.Screen name="HomeFlow" component={HomeFlow} />
      <Tab.Screen name="OrderListFlow" component={OrderListFlow} />
      <Tab.Screen name="OrderCompleteFlow" component={OrderCompleteFlow} />
    </Tab.Navigator>
  );
};

function App() {
  return (
    <RestaurantProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </RestaurantProvider>
  );
}

export default App;
