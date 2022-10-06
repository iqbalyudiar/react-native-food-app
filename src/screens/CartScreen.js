import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Context as CartContext } from "../context/CartContext";
import { Context as OrderContext } from "../context/OrderContext";
import OrderSummary from "../components/OrderSummary";

const CartScreen = () => {
  const {
    state: { carts, restaurant },
    resetCart,
  } = useContext(CartContext);

  const { addOrder } = useContext(OrderContext);

  const navigation = useNavigation();

  const totalPrice = carts.reduce(
    (prev, curr) => prev + curr.price * curr.quantity,
    0
  );

  const goToOrderList = async () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });

    navigation.navigate("OrderListFlow", {
      screen: "OrderList",
      params: { orderCreated: true },
    });

    resetCart();
  };

  return (
    <View>
      <OrderSummary
        data={carts}
        restaurant={restaurant}
        totalPrice={totalPrice}
        orderAction={() =>
          addOrder({ carts, totalPrice, restaurant }, goToOrderList)
        }
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
