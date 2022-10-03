import { StyleSheet, Text, View } from "react-native";
import { Button } from "@rneui/base";
import React from "react";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Go to cart" onPress={() => navigation.navigate("Cart")} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
