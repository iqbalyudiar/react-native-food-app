import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Card, Text, Button } from "@rneui/base";
import { Context as CartContext } from "../context/CartContext";
import { Context as OrderContext } from "../context/OrderContext";
import { DataTable } from "react-native-paper";

const CartScreen = () => {
  const {
    state: { carts, restaurant },
  } = useContext(CartContext);

  const {addOrder} = useContext(OrderContext)

  const navigation = useNavigation()


  const priceItem = (item) => item.price * item.quantity;
  const totalPrice = carts.reduce(
    (prev, curr) => prev + curr.price * curr.quantity,
    0
  );

  const goToOrderList = () => navigation.jumpTo("OrderListFlow")

  return (
    <View>
      <Card>
        <Card.Title h4>Your Order Summary</Card.Title>
        <Card.Divider />
        <View>
          <View>
            <Text style={[styles.menuTitle, styles.restaurantTitle]}>Order From {restaurant}</Text>
          </View>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title textStyle={styles.menuTitle}>Items</DataTable.Title>
              <DataTable.Title textStyle={styles.menuTitle}>
                Quantity
              </DataTable.Title>
              <DataTable.Title textStyle={styles.menuTitle}>Price</DataTable.Title>
            </DataTable.Header>
            {carts.map((cart, index) => {
              return (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{cart.name}</DataTable.Cell>
                  <DataTable.Cell>{cart.quantity}</DataTable.Cell>
                  <DataTable.Cell>Rp{priceItem(cart)}</DataTable.Cell>
                </DataTable.Row>
              );
            })}
            <DataTable.Row>
              <DataTable.Cell textStyle={styles.menuTotalPrice}>
                Total Price
              </DataTable.Cell>
              <DataTable.Cell></DataTable.Cell>
              <DataTable.Cell style={styles.menuTotalPrice}>
                Rp{totalPrice}
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>
        <Button title="Order Now" style={styles.button} onPress={() =>addOrder({carts, totalPrice, restaurant}, goToOrderList)} />
      </Card>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  restaurantTitle: {
    paddingHorizontal: 15,
    fontSize:18,
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  menuTitle: {
    fontWeight: "600",
    fontSize: 16,
  },
  menuTotalPrice: {
    fontWeight: "500",
  },
  button: {
    marginTop: 15,
  },
});
