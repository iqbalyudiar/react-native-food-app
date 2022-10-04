import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Context as RestaurantContext } from "../context/RestaurantContext";
import { Context as CartContext } from "../context/CartContext";
import { Card, Text, Button } from "@rneui/base";
import CartButton from "../components/CartButton";
import Toast from "react-native-root-toast";

const RestaurantDetailScreen = ({ route }) => {
  const {
    state: { restaurants },
  } = useContext(RestaurantContext);

  const {
    state: { carts, restaurant },
    addToCart,
    removeFromCart,
  } = useContext(CartContext);

  const { id } = route.params;

  const currentRestaurant = restaurants.find((resto) => resto.id === id);

  const quantity = (id) => {
    if (restaurant !== currentRestaurant.name) return 0;
    const item = carts.find((cart) => cart.id === id);

    return item ? item.quantity : 0;
  };

  const handleAdd = (food, restaurantName) => {
    if (restaurant && restaurant !== currentRestaurant.name) {
      let toast = Toast.show("Can not add order from different restaurant", {
        duration: Toast.durations.LONG,
        position: 50,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: "white",
        shadowColor: "red",
        textColor: "black",
        opacity: 1,
      });

      setTimeout(function () {
        Toast.hide(toast);
      }, 700);
      return;
    }
    addToCart(food, restaurantName);
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
                  onPress={() => handleAdd(food, currentRestaurant.name)}
                />
              </View>
            </View>
          </View>
        </Card>
      ))}
      {carts.length > 0 && <CartButton />}
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
