import { useLayoutEffect,useEffect, useState } from "react";
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
import BeckCard from "../../components/BeckCard";
import UsdiCard from "../../components/UsdiCard";
import {
  ArrowRightOnRectangleIcon,
} from "react-native-heroicons/outline";
import { useStoreProfileContext } from "../../context/StoreProfileContext";

const StoreHome = () => {
  const navigation = useNavigation();
  const { beckStatus, setBeckStatus } = useBeckStatusContext();
  const { storeProfile } = useStoreProfileContext();
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
    console.log('3', storeProfile);
  },[])
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View className="flex-row justify-between items-center px-4 pb-5 pt-5 bg-white">
         <View className="flex-row items-center">
            <View className="flex items-center justify-center rounded-full bg-blue-200 h-12 w-12">
               <Image
                  source={require("../../../assets/store.png")}
                  className="h-7 w-7"
               />
            </View>
            <View className="ml-3">
               <Text className="text-lg font-semibold">
                  {storeProfile?.name}
               </Text>
               <Text className="text-sm  text-gray-400">
               {storeProfile?.branch}
               </Text>
            </View>
         </View>
         <ArrowRightOnRectangleIcon
            color="#0088EC"
            size={35}
            onPress={() => navigation.navigate("StoreLogin")}
         />
      </View>
      <View className="flex-1 mt-5 px-4 py-5 bg-white">
         <View className="flex-row justify-between">
            <View>
               <Text className="font-bold text-xl">Manage Store</Text>
               <Text className="text-sm text-gray-500">
                  Manage store products, stocks and profile settings
               </Text>
            </View>
         </View>
         <View className="flex my-5">
            <ScrollView
               contentContainerStyle={{
               paddingHorizontal: 2,
               }}
               // showsHorizontalScrollIndicator={false}
               style={{ flexGrow: 0 }}
               className="space-y-10"
            >
               <TouchableOpacity 
                  className="flex justify-center items-center bg-[#c2dff5] w-full p-5 mr-5 shadow-lg rounded-lg"
                  onPress={() => navigation.navigate("StoreProducts")}
               >
               <Image
                  source={require("../../../assets/products.png")}
                  className="shadow-sm h-44 w-44 rounded-lg object-scale-down"
               />
               <View className="flex justify-center py-2 ">
                  <Text className="text-lg text-center ml-1 font-semibold">
                     Manage Products
                  </Text>
                  <View className="flex-row ml-1 items-center">
                     <Text className="text-base text-gray-500">
                        Manage store products and stocks
                     </Text>
                  </View>
               </View>
               </TouchableOpacity>
               <TouchableOpacity 
                  className="flex justify-center items-center bg-[#c2dff5] w-full p-5 mr-5 shadow-lg rounded-lg"
                  onPress={() => navigation.navigate("StoreSettings")}
               >
               <Image
                  source={require("../../../assets/settings.png")}
                  className="shadow-sm h-44 w-44 rounded-lg"
               />
               <View className="py-2">
                  <Text className="text-lg ml-1 text-center font-semibold">
                     Profile Settings
                  </Text>
                  <View className="flex-row ml-1 items-center">
               
                     <Text className="text-base  text-gray-500">
                        Manage store settings and profile
                     </Text>
                  </View>
               </View>
               </TouchableOpacity>
            </ScrollView>
         </View>
      </View>

    </SafeAreaView>
  );
};
export default StoreHome;
