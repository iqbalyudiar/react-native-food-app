import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Context as RestaurantContext } from "../context/RestaurantContext";
import { Context as CartContext } from "../context/CartContext";
import { Card, Text, Button } from "@rneui/base";
import CartButton from "../components/CartButton";

const RestaurantDetailScreen = ({ route }) => {
  const {
    state: { restaurants },
  } = useContext(RestaurantContext);

  const {
    state: { carts },
    addToCart,
    removeFromCart,
  } = useContext(CartContext);

  const { id } = route.params;

  const currentRestaurant = restaurants.find((resto) => resto.id === id);

  const quantity = (id) => {
    const item = carts.find((cart) => cart.id === id);

    return item ? item.quantity : 0;
  };

  return (
    <View style={styles.container}>
      {currentRestaurant.foods.map((food) => (
        <Card key={food.id}>
          <View style={styles.foodCard}>
            <Text h3>{food.name}</Text>
            <View>
              <Text h4 style={styles.priceText}>
                Rp{food.price}
              </Text>
              <View style={styles.actionButtonGroup}>
                {quantity(food.id) > 0 && (
                  <Button
                    buttonStyle={styles.actionButton}
                    title="-"
                    color="error"
                    size="md"
                    radius="md"
                    onPress={() => removeFromCart(food.id)}
                  />
                )}
                {quantity(food.id) > 0 && (
                  <Text h4 style={styles.itemCounter}>
                    {quantity(food.id)}
                  </Text>
                )}
                <Button
                  buttonStyle={styles.actionButton}
                  title="+"
                  color="success"
                  size="md"
                  radius="md"
                  onPress={() => addToCart(food)}
                />
              </View>
            </View>
          </View>
        </Card>
      ))}
      {carts.length > 0 && (
          <CartButton restaurantName={currentRestaurant.name} />
      )}
    </View>
  );
};

export default RestaurantDetailScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    position: "relative",
  },
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
  floatingButton: {
    position: "absolute",
    bottom: 0,
  },
  itemCounter: {
    alignSelf: "center",
    marginHorizontal: 10,
  },
});
