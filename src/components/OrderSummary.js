import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Button } from "@rneui/base";
import { DataTable } from "react-native-paper";

const OrderSummary = ({ restaurant, data, totalPrice, orderAction }) => {
  const priceItem = (item) => item.price * item.quantity;

  return (
    <View>
      <Card>
        <Card.Title h4>Your Order Summary</Card.Title>
        <Text style={[styles.menuTitle, styles.restaurantTitle]}>
          Order From {restaurant}
        </Text>
        <Card.Divider />
        <View>
          <View></View>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title textStyle={styles.menuTitle}>
                Items
              </DataTable.Title>
              <DataTable.Title textStyle={styles.menuTitle}>
                Quantity
              </DataTable.Title>
              <DataTable.Title textStyle={styles.menuTitle}>
                Price
              </DataTable.Title>
            </DataTable.Header>
            {data.map((item, index) => {
              return (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{item.name}</DataTable.Cell>
                  <DataTable.Cell>{item.quantity}</DataTable.Cell>
                  <DataTable.Cell>Rp{priceItem(item)}</DataTable.Cell>
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
        {orderAction && (
          <Button
            title="Order Now"
            style={styles.button}
            onPress={orderAction}
          />
        )}
      </Card>
    </View>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  restaurantTitle: {
    paddingHorizontal: 15,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
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
