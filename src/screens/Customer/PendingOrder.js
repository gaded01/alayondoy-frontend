import { useLayoutEffect, useState ,useEffect} from "react";
import {
  Text,
  SafeAreaView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { REACT_APP_BASE_API_URL } from "@env";
import { useBeckStatusContext } from "../../context/BeckStatusContext";
import SafeViewAndroid from "../../components/SafeViewAndroid";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";

const PendingOrder = () => {
  const navigation = useNavigation();
  const { beckStatus, setBeckStatus } = useBeckStatusContext();
  const details = {
    beckTitle: "Beck Depression Inventory",
    usdiTitle: "University Student Depression Inventory",
  };
  let config = {};

  useLayoutEffect(() =>
    navigation.setOptions({
      headerShown: false,
    })
  );

  useEffect(() => {
   setTimeout(()=> {
    navigation.navigate("DeliveryScreen")
   },4000)
  },[])

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className="bg-[#0088EC] flex-1 justify-center items-center">
      <Animatable.Image
         source={require("../../../assets/orderLoading.gif")}
         animation="slideInUp"
         iterationCount={1}
         className="w-96 h-96"
      />
      <Animatable.Text
         animation="slideInUp"
         iterationCount={1}
         className="text-lg my-10 text-white font-bold text-center"
      >
         Waiting for the admin the accept your order!
      </Animatable.Text>
      <Progress.Circle size={60} indeterminate={true} color="white"/>
    </SafeAreaView>
  );
};
export default PendingOrder;
