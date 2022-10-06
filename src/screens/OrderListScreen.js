import React, { useCallback, useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Tab, TabView, Text } from "@rneui/base";
import { Context as OrderContext } from "../context/OrderContext";
const OrderListScreen = () => {
  const [tabIndex, setTabIndex] = useState();
  const { getOrders } = useContext(OrderContext);

  useFocusEffect(
    useCallback(() => {
      getOrders();
    }, [])
  );

  return (
    <>
      <Tab
        value={tabIndex}
        onChange={setTabIndex}
        indicatorStyle={{
          backgroundColor: "white",
          height: 3,
        }}
        variant="primary"
      >
        <Tab.Item
          title="In Progress"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "clockcircleo", type: "antdesign", color: "white" }}
        />
        <Tab.Item
          title="Completed"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "checkcircleo", type: "antdesign", color: "white" }}
        />
      </Tab>
      <TabView value={tabIndex} onChange={setTabIndex} animationType="spring">
        <TabView.Item style={{ width: "100%", height: "100%" }}>
          <Text h1>In Progress</Text>
        </TabView.Item>
        <TabView.Item style={{ width: "100%", height: "100%" }}>
          <Text h1>Completed</Text>
        </TabView.Item>
      </TabView>
    </>
  );
};

export default OrderListScreen;

const styles = StyleSheet.create({});
