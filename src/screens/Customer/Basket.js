import { useLayoutEffect, useEffect, useState } from "react";
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
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import {
  MapPinIcon,
  MinusIcon,
  PlusIcon,
  XMarkIcon,
} from "react-native-heroicons/solid";
import { useCartContext } from "../../context/CartContext";
import { useStoreMenuContext } from "../../context/StoreMenuContext";

const Basket = () => {
  const navigation = useNavigation();
  const { storeMenu } = useStoreMenuContext();
  const [ reducedCart, setReducedCart] = useState([]);
  const { cart } = useCartContext([]);
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

  function sumValues() {
    let sum = 0;
    const prodPrice = [];
    for (let i = 0; i < cart.length; i++) {
      prodPrice.push(parseInt(cart[i].price));
    }
    sum = prodPrice.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sum;
  }
  var groupCart = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  useEffect(()=> {
   setReducedCart(groupCart(cart, 'id'));;
  },[])

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View className="flex-1 relative">
        {/* <Image
          source={require("../../../assets/restaurant.jpg")}
          className="shadow-sm h-56 w-full "
        /> */}
        <View className="flex-col h-16 bg-white justify-center items-center border-b border-[#0088EC]">
          <Text className="text-lg font-bold ">My Basket</Text>
          <Text className="text-sm text-gray-500 italic">{storeMenu.name}</Text>
          <TouchableOpacity
            className="absolute bg-[#0088EC] right-5 top-3 p-2 rounded-full"
            onPress={() => {
               navigation.goBack();
             }}
          >
            <XMarkIcon
              color="#fff"
              size={22}
            />
          </TouchableOpacity>
        </View>
        <View className="bg-white flex-row items-center px-4 py-3 my-5 space-x-4">
          <Image
            source={require("../../../assets/restaurant.jpg")}
            className="shadow-sm h-10 w-10 rounded-full"
          />
          <Text className="flex-1">Estimated delivery time: 30 - 50 min</Text>
          <TouchableOpacity>
            <Text className="text-[#0088EC]">Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView className="divide-y divide-gray-200 ">
          {Object.keys(reducedCart)?.map((cart, key) => (
            <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
              <Text>{reducedCart[cart].length}x</Text>
              <Image
                source={require("../../../assets/restaurant.jpg")}
                className="shadow-sm h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{reducedCart[cart][0].name}</Text>
              <Text>₱ {reducedCart[cart][0].price}.00</Text>
              <TouchableOpacity>
              <Text className="text-[#0088EC]">Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
          
        </ScrollView>
        <View className="bg-white px-5 pt-8 pb-8 mt-6 space-y-4">
            <View className="flex-row space-x-2">
               <Text className="text-gray-400 flex-1">Payment Method</Text>
               <Text className="text-gray-400">GCash</Text>
               <TouchableOpacity>
                  <Text className="text-[#0088EC]">Change</Text>
               </TouchableOpacity>
            </View>
            <View className="flex-row justify-between">
               <Text className="text-gray-400">Subtotal</Text>
               <Text className="text-gray-400">₱ {sumValues()}.00</Text>
            </View>
            <View className="flex-row justify-between"> 
               <Text className="text-gray-400">Develivery Fee</Text>
               <Text className="text-gray-400">₱ 20.00</Text>
            </View>
            <View className="flex-row justify-between"> 
               <Text className="">Order Total</Text>
               <Text className="font-bold">₱ 150.00</Text>
            </View>
            <TouchableOpacity className="bg-[#0088EC] rounded-lg p-3"  onPress={() => {
                navigation.navigate("PendingOrder");
              }}>
               <Text className="text-lg font-bold text-white text-center">Place Order</Text>
            </TouchableOpacity>
        </View>
        {/* <View className="px-4 py-4 bg-white">
          <Text className="text-3xl font-bold ml-1">Andok's</Text>
          <View className="flex-row items-center my-1 space-x-1">
            <MapPinIcon color="#0088EC" size={21} />
            <Text className="text-sm text-gray-500">
              Brgy. Guindapunan, Palo, Leyte, Philippines, 6521
            </Text>
          </View>
          <View className="mt-2 px-2">
            <Text className="text-gray-500 text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              commodo, justo vel fringilla hendrerit, velit tellus convallis
              odio, vel consectetur neque nisl id dui.
            </Text>
          </View>
        </View> */}

        {/* <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Image
              source={require("../../../assets/app-logo.jpg")}
              className="h-12 w-12 rounded-full"
            />
            <View className="ml-3">
              <Text className="text-lg font-semibold text-gray-500">
                Booked to us now!
              </Text>
              <Text className="text-sm w-20 bg-[#0088EC] border rounded-md border-[#0088EC] text-white text-center">
                Available
              </Text>
            </View>
          </View>
          <UserIcon
            color="#0088EC"
            size={35}
            onPress={() => navigation.openDrawer()}
          />
        </View>
        <View className="relative my-5 ">
          <TextInput
            className="bg-[#e6e6ec] rounded-lg px-12 py-4 w-full text-base"
            // onChangeText={setContactNumber}
            // value={contactNumber}
            placeholder="Search shop and restaurant"
          />
          <MagnifyingGlassIcon
            style={{ position: "absolute", top: 15, left: 10 }}
            color="#c7c7c7"
            size={30}
          />
        </View>
        <View className="my-5">
          <View className="">
            <View className="flex-row justify-between">
              <View>
                <Text className="font-bold text-xl">Featured</Text>
                <Text className="text-sm text-gray-500">
                  Paid placement for our partners
                </Text>
              </View>
              <ArrowRightIcon color="#0088EC" size={25} />
            </View>
            <View className="flex-row my-5">
              <ScrollView
                horizontal
                contentContainerStyle={{
                  paddingHorizontal: 2,
                }}
                showsHorizontalScrollIndicator={false}
                style={{ flexGrow: 0 }}
              ></ScrollView>
            </View>
          </View>
        </View> */}
      </View>
    </SafeAreaView>
  );
};
export default Basket;
