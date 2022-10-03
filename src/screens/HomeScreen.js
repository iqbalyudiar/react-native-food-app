import React, { useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, FlatList, View, TouchableOpacity } from "react-native";
import { ListItem, Avatar } from "@rneui/base";
import { Context as RestaurantContext } from "../context/RestaurantContext";

const HomeScreen = ({ navigation }) => {
  const {
    state: { restaurants },
    getRestaurants,
  } = useContext(RestaurantContext);

  useFocusEffect(
    useCallback(() => {
      getRestaurants();
    }, [])
  );

  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={restaurants}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <ListItem bottomDivider>
              <Avatar
                title={item.name[0]}
                source={item.logo && { uri: item.logo }}
              />
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
