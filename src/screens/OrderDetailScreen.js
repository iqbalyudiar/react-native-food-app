import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Context as OrderContext } from "../context/OrderContext";
import { AntDesign } from "@expo/vector-icons";
import { Text } from "@rneui/base";
import OrderSummary from "../components/OrderSummary";

const OrderDetailScreen = () => {
  const {
    state: { orders },
  } = useContext(OrderContext);
  const route = useRoute();
  const selectedOrder = orders.find((order) => order.id === route.params.id);
  const { items, restaurant, totalPrice, status } = selectedOrder;

  const CompletedStatus = () => {
    return (
      <>
        <AntDesign
          name="checkcircleo"
          size={50}
          color="black"
          style={styles.text}
        />
        <Text h3 style={styles.text}>
          Your order is completed
        </Text>
      </>
    );
  };

  const InprogressStatus = () => {
    return (
      <>
        <AntDesign
          name="clockcircleo"
          size={50}
          color="black"
          style={styles.text}
        />
        <Text h3 style={styles.text}>
          Your order is in progress
        </Text>
      </>
    );
  };
  return (
    <View>
      {selectedOrder.status === "completed" ? (
        <CompletedStatus />
      ) : (
        <InprogressStatus />
      )}
      <OrderSummary
        data={items}
        restaurant={restaurant}
        totalPrice={totalPrice}
      />
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginTop: 15,
  },
});
