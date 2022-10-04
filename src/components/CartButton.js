import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { FAB, Text } from "@rneui/base";
import { FontAwesome } from "@expo/vector-icons";
import { Context as CartContext } from "../context/CartContext";


const Title = ({ restaurantName }) => {
  const {
    state: { carts },
  } = useContext(CartContext);
  const totalItems = carts.reduce((prev, curr) => prev + curr.quantity, 0);
  return (
    <View style={styles.title}>
      <Text style={styles.text}>{totalItems} items</Text>
      <Text style={styles.text}>Order from {restaurantName}</Text>
    </View>
  );
};

const CartButton = (props) => {
const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <FAB
        color="#1464cc"
        buttonStyle={styles.button}
        onPress={() => navigation.push("Cart")}
      >
        <Title {...props} />
        <FontAwesome name="shopping-cart" size={24} color="white" />
      </FAB>
    </View>
  );
};

export default CartButton;

const styles = StyleSheet.create({
  container: {
    bottom: 15,
    right: 0,
    left: 0,
    position: "absolute",
  },
  title: {
    color: "white",
    marginRight: 20,
  },
  text: {
    color: "white",
    fontWeight: "500",
    fontSize: 14,
  },
  button: {
    paddingHorizontal: 30,
    width: 350,
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-between",
  },
});
