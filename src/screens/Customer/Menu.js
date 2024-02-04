import { useEffect, useLayoutEffect, useState } from "react";
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
import { MapPinIcon, MinusIcon, PlusIcon } from "react-native-heroicons/solid";
import { useStoreMenuContext } from "../../context/StoreMenuContext";
import { useCartContext } from "../../context/CartContext";

const Menu = () => {
  const navigation = useNavigation();
  const { storeMenu } = useStoreMenuContext();
  const { cart , setCart } = useCartContext([]);
  let item = [];
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
  
  const addToCart = (product) => {
    setCart((prevState) => [...prevState , product]);
    console.log('log',cart);
  }

  const removeToCart = (productId) => {
    const indexToRemove = cart.findIndex((prod) => prod.id == productId);
    if (indexToRemove !== -1) {
      const updatedCart = [...cart]; // Create a copy of the array
      updatedCart.splice(indexToRemove, 1); // Remove 1 element at the found index
     setCart(updatedCart);
    };
  }

  function sumValues() {
    let sum = 0;
    const prodPrice = [];
    for (let i = 0; i < cart.length; i++) {
      prodPrice.push(parseInt(cart[i].price));
    }
    sum = prodPrice.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sum;
  }


  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View className="flex-1 relative ">
        {storeMenu.image ? (
          <Image
            source={require("../../../assets/restaurant.jpg")}
            className="shadow-sm  h-56 w-full "
          />
        ) : (
          <View className="flex justify-center items-center bg-[#0088EC] h-56 w-full  ">
            <Text className="font-semibold text-lg  text-white">
              No Image Available
            </Text>
          </View>
        )}

        <TouchableOpacity
          className="absolute bg-white left-5 top-5 p-2 rounded-full"
          onPress={() => {
            navigation.goBack();
          }}
        >
          <ArrowLeftIcon color="#0088EC" size={22} />
        </TouchableOpacity>
        <View className="px-4 py-4 bg-white">
          <Text className="text-3xl font-bold ml-1">{storeMenu.name}</Text>
          <View className="flex-row items-center my-1 space-x-1">
            <MapPinIcon color="#0088EC" size={21} />
            <Text className="text-sm text-gray-500">
              {storeMenu.address.address}
            </Text>
          </View>
          <View className="mt-2 px-2">
            <Text className="text-gray-500 text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              commodo, justo vel fringilla hendrerit, velit tellus convallis
              odio, vel consectetur neque nisl id dui.
            </Text>
          </View>
        </View>
        <Text className="text-2xl font-bold px-4 py-5">Menu</Text>

        <ScrollView
          vertical
          contentContainerStyle={{
            paddingVertical: 0,

            flexGrow: 1,
          }}
          showsHorizontalScrollIndicator={false}
          className="bg-white mb-24"
        >
          {storeMenu.product.map((product, key) => (
            <View
              key={key}
              className="flex-row justify-between border border-gray-200 px-4 py-5"
            >
              <View className="w-3/4">
                <Text className="text-lg">{product.name}</Text>
                <Text className="text-gray-500 pt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  commodo, justo vel fringilla hendrerit, velit tellus convallis
                  odio
                </Text>
                <Text className="py-2">₱ {product.price}.00</Text>
                <View className="flex-row items-center">
                  <TouchableOpacity
                    className=" bg-[#8b8b8b] p-1.5 rounded-full"
                    onPress={() => { removeToCart(product.id)}}
                  >
                    <MinusIcon color="#fff" size={20} />
                  </TouchableOpacity>
                  <Text className="text-base px-3">{cart.filter(obj => obj.id == product.id).length}</Text>
                  <TouchableOpacity
                    className=" bg-[#0088EC] p-1.5 rounded-full"
                    onPress={() => { addToCart(product) }}
                  >
                    <PlusIcon color="#fff" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
              {product.image ? 
                 <Image
                 source={require("../../../assets/restaurant.jpg")}
                 className="shadow-sm h-24 w-24 "
               />:
               <View className="flex justify-center items-center bg-[#0088EC] shadow-sm h-24 w-24 ">
               <Text className="font-semibold text-xs  text-white">
                {product.name}
               </Text>
             </View>
                }
           
            </View>
          ))}
        </ScrollView>

        <View className="absolute bottom-5 w-full z-50">
          <TouchableOpacity
            className="flex-row justify-between items-center bg-[#0088EC] py-3.5 px-4 mx-5 rounded-xl"
            onPress={() => {
              navigation.navigate("Basket");
            }}
          >
            <Text className="text-white bg-[#245b83] p-2 font-semibold rounded-md">
              {cart.length}
            </Text>
            <Text className="text-white font-semibold text-base">
              View Basket
            </Text>
            <Text className="text-white font-semibold text-base">₱ {sumValues()}</Text>
          </TouchableOpacity>
        </View>

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
export default Menu;
