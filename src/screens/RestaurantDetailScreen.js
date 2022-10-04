import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Context as RestaurantContext } from "../context/RestaurantContext";
import { Card, Text, Button } from "@rneui/base";

const RestaurantDetailScreen = ({ route }) => {
  const {
    state: { restaurants },
  } = useContext(RestaurantContext);

  const { id } = route.params;

  const currentRestaurant = restaurants.find((resto) => resto.id === id);

  return (
    <View>
      {currentRestaurant.foods.map((food) => (
        <Card key={food.id}>
          <View style={styles.foodCard}>
            <Text h3>{food.name}</Text>
            <View>
              <Text h4 style={styles.priceText}>
                Rp{food.price}
              </Text>
              <View style={styles.actionButtonGroup}>
                <Button
                  buttonStyle={styles.actionButton}
                  title="-"
                  color="error"
                  size="md"
                  radius="md"
                />
                <Button
                  buttonStyle={styles.actionButton}
                  title="+"
                  color="success"
                  size="md"
                  radius="md"
                />
              </View>
            </View>
          </View>
        </Card>
      ))}
    </View>
  );
};

export default RestaurantDetailScreen;

const styles = StyleSheet.create({
  foodCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: {
    marginBottom: 10,
  },
  actionButtonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionButton: {
    width: 35,
    marginHorizontal: 2,
  },
});
