import { useLayoutEffect, useState } from "react";
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
import SafeViewAndroid from "../../components/SafeViewAndroid";
import Spinner from "react-native-loading-spinner-overlay";

import {
  ArrowLeftIcon,
  ArrowRightOnRectangleIcon,
  ArrowUpTrayIcon,
  PencilSquareIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon, MinusIcon, PlusIcon } from "react-native-heroicons/solid";
import { useStoreMenuContext } from "../../context/StoreMenuContext";

const AddProduct = () => {
  const navigation = useNavigation();
  const { storeMenu } = useStoreMenuContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    id: storeMenu.id,
    prod_name: storeMenu? storeMenu.name : "",
    price: storeMenu? storeMenu.price : "",
    description: storeMenu? storeMenu.description : "",
  });


  const inputHandler = (prop, value) => {
    setData({ ...data, [prop]: value });
  };

  const saveProduct =  async () => {
    console.log('data', data);
    let response = await AsyncStorage.getItem("@access_token");
    let config = { headers: { Authorization: `Bearer ${response}` } };
    let action = storeMenu? "edit-product" : "add-product";
    setLoading(true);
    await axios
      .post(`${REACT_APP_BASE_API_URL}/${action}`, data , config)  
      .then((res) => {
        console.log('res', res.data);
        navigation.navigate("StoreHome");
      })
      .catch((err) => {
        console.log('err', err) 
      });
    setLoading(false); 
  }


  
  useLayoutEffect(() =>
    navigation.setOptions({
      headerShown: false,
    })
  );

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View className="flex-1 relative">
        <View className="flex-row justify-between items-center px-4 pb-5 pt-5 bg-white">
          <View className="flex-row items-center">
            <Image
              source={require("../../../assets/restaurant.jpg")}
              className="h-12 w-12 rounded-full"
            />
            <View className="ml-3">
              <Text className="text-lg font-semibold">Jollibee</Text>
              <Text className="text-sm  text-gray-400 text-center">
                Tacloban Branch
              </Text>
            </View>
          </View>
          <ArrowRightOnRectangleIcon
            color="#0088EC"
            size={35}
            onPress={() => navigation.navigate("StoreHome")}
          />
        </View>
        <Text className="text-2xl font-bold px-4 py-5">{storeMenu? "Edit" : "New"} Product</Text>
        <View className="flex-1 bg-white pt-10 px-5">
          <View className="flex-row justify-center">
            <View className="h-36 w-36 border mb-5 border-gray-200  bg-white rounded-full z-10 flex justify-center items-center">
              <Text className="text-gray-400">Insert Photo</Text>
            </View>
          </View>
          <TouchableOpacity className="bg-[#FE6205] h-8 w-8 flex justify-center items-center rounded-full absolute right-[38%] top-[18%]   z-20">
            <ArrowUpTrayIcon color="#fff" size={18} />
          </TouchableOpacity>
          <View className="relative mb-5">
            <Text
              className="absolute text-red-500 text-sm top-2 left-4 z-10"
              style={{ color: "#FE6205" }}
            >
              Product Name
            </Text>
            <TextInput
              className="bg-gray-100 rounded-lg px-4 pb-3 pt-6 w-full text-base"
              onChangeText={(value) =>
                inputHandler("prod_name", value)
              }
              value={data.prod_name}
              placeholder="Enter product name"
            />
            {/* <UserIcon style={{position: 'absolute', top: 15, left: 10}} color="#c7c7c7" size={30}/> */}
          </View>
          <View className="relative mb-5">
            <Text
              className="absolute text-red-500 text-sm top-2 left-4 z-10"
              style={{ color: "#FE6205" }}
            >
              Price
            </Text>
            <TextInput
              className="bg-gray-100 rounded-lg px-4 pb-3 pt-6 w-full text-base"
              onChangeText={(value) =>
                inputHandler("price", value)
              }
              value={data.price}
              placeholder="Enter product price"
            />
            {/* <UserIcon style={{position: 'absolute', top: 15, left: 10}} color="#c7c7c7" size={30}/> */}
          </View>
         
          <View className="relative mb-5">
            <Text
              className="absolute text-red-500 text-sm top-2 left-4 z-10"
              style={{ color: "#FE6205" }}
            >
              Desription
            </Text>
            <TextInput
              className="bg-gray-100 rounded-lg px-4 pb-3 pt-6 w-full text-base"
              multiline={true}
              numberOfLines={5}
              onChangeText={(value) =>
                inputHandler("description", value)
              }
              value={data.description}
              placeholder="A short description about the store"
            />
            {/* <UserIcon style={{position: 'absolute', top: 15, left: 10}} color="#c7c7c7" size={30}/> */}
          </View>
        </View>
      </View>
      <View className="absolute bottom-10 w-full z-50">
        <TouchableOpacity
          className="flex-row justify-center items-center bg-[#0088EC] py-4 px-4 mx-5 rounded-xl"
          onPress={() => {
            saveProduct()
          }}
        >
          <Text className="text-white font-semibold text-base">
            Save Product
          </Text>
        </TouchableOpacity>
      </View>
      <Spinner visible={loading} />
    </SafeAreaView>
  );
};
export default AddProduct;
