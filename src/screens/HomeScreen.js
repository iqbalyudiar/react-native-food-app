import React, { useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@rneui/base";
import { Context as RestaurantContext } from "../context/RestaurantContext";

const HomeScreen = ({ navigation }) => {
  const { getRestaurants } = useContext(RestaurantContext);

  useFocusEffect(
    useCallback(() => {
      getRestaurants();
    }, [])
  );

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Go to cart" onPress={() => navigation.navigate("Cart")} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
