import { useEffect, useLayoutEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { REACT_APP_BASE_API_URL } from "@env";
import { useBeckStatusContext } from "../../context/BeckStatusContext";
import SafeViewAndroid from "../../components/SafeViewAndroid";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { XMarkIcon } from "react-native-heroicons/solid";

const DeliveryScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() =>
    navigation.setOptions({
      headerShown: false,
    })
  );

  useEffect(() => {
    console.log('err2');
  },[])

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className="bg-[#0088EC] flex-1 ">
      <View className="flex-row justify-between items-center p-5">
         <XMarkIcon color="white"></XMarkIcon>
         <Text className="text-white text-lg">Order Help</Text>
      </View>
      <View className="bg-white mx-5 my-3 rounded-md p-6 z-50 shadow-md">
         <View className="flex-row justify-between">
            <View>
               <Text className="text-gray-400">Estimated Delivery Time</Text>
               <Text className="font-bold text-3xl">35-50 Minutes</Text>
            </View>
            <Image
               source={require("../../../assets/rider.png")}
               className="shadow-sm h-20 w-20 "
            />
         </View>
         <Progress.Bar size={30} color="#0088EC" indeterminate={true}/>
         <Text className="text-gray-400 mt-2">Your order at Andok's is being processed</Text>
      </View>
    </SafeAreaView>

  );
};
export default DeliveryScreen;
