import React, { useCallback, useContext, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import moment from "moment";
import { Tab, TabView } from "@rneui/base";
import { Context as OrderContext } from "../context/OrderContext";
import OrderListCard from "../components/OrderListCard";

const OrderListScreen = () => {
  const [tabIndex, setTabIndex] = useState();
  const {
    getOrders,
    state: { orders },
  } = useContext(OrderContext);

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      getOrders();
    }, [])
  );

  const orderList = (status) => {
    return orders.filter((order) => order.status === status);
  };
  const inprogressOrder = orderList("inprogress");
  const completedOrder = orderList("completed");
  const formatTime = (time) => {
    return moment(time).format("DD MMM YY, hh:mm A");
  };

  const goToOrderDetail = (id) => navigation.navigate("OrderDetail", { id });

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
        <TabView.Item style={{ width: "100%" }}>
          <>
            {inprogressOrder.map((order) => (
              <TouchableOpacity
                onPress={() => goToOrderDetail(order.id)}
                key={order.id}
              >
                <OrderListCard
                  key={order.id}
                  restaurant={order.restaurant}
                  time={formatTime(order.crated_at)}
                  totalPrice={order.totalPrice}
                  inProgress={true}
                />
              </TouchableOpacity>
            ))}
          </>
        </TabView.Item>
        <TabView.Item style={{ width: "100%" }}>
          <>
            {completedOrder.map((order) => (
              <TouchableOpacity
                onPress={() => goToOrderDetail(order.id)}
                key={order.id}
              >
                <OrderListCard
                  key={order.id}
                  restaurant={order.restaurant}
                  time={formatTime(order.created_at)}
                  totalPrice={order.totalPrice}
                />
              </TouchableOpacity>
            ))}
          </>
        </TabView.Item>
      </TabView>
    </>
  );
};

export default OrderListScreen;

const styles = StyleSheet.create({});
