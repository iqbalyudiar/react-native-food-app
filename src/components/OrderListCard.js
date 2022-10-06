import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";

const OrderListCard = ({ restaurant, time, totalPrice, inProgress }) => {
  return (
    <View>
      <Card wrapperStyle={styles.container}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Ionicons name="fast-food-outline" size={24} color="black" />
          </View>
          <View style={styles.descriptionContainer}>
            <Text>{restaurant}</Text>
            <Text>{time}</Text>
            {inProgress && (
              <Text style={styles.inProgress}>waiting for payment</Text>
            )}
          </View>
        </View>
        <View>
          <Text>Rp{totalPrice}</Text>
        </View>
      </Card>
    </View>
  );
};

export default OrderListCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoContainer: {
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 6,
    width: 40,
    alignItems: "center",
  },
  descriptionContainer: {
    marginLeft: 8,
  },
  inProgress: {
    color: "grey",
    fontWeight: "500",
  },
});
