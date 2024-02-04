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
import {
  ArrowLeftIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  PencilSquareIcon,
  Squares2X2Icon,
} from "react-native-heroicons/outline";
import { MapPinIcon, MinusIcon, PlusIcon } from "react-native-heroicons/solid";
import { useStoreProfileContext } from "../../context/StoreProfileContext";
import Spinner from "react-native-loading-spinner-overlay";
import { useStoreMenuContext } from "../../context/StoreMenuContext";

const StoreProducts = () => {
  const navigation = useNavigation();
  const { storeProfile } = useStoreProfileContext();
  const { setStoreMenu } = useStoreMenuContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
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
    (async ()=> {
      let response = await AsyncStorage.getItem("@access_token");
      let config = { headers: { Authorization: `Bearer ${response}` } };
      setLoading(true);
      await axios
        .post(`${REACT_APP_BASE_API_URL}/get-products`, {} , config)  
        .then((res) => {
          setProducts(res.data.products);
        })
        .catch((err) => {
          console.log('err', err) 
        });
      setLoading(false); 
    })();
  }, []);

  const productToEdit = (product) => {
    setStoreMenu(product);
    navigation.navigate('AddProduct');
  }
  

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View className="flex-1 relative">
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
          <Squares2X2Icon
            color="#0088EC"
            size={30}
            onPress={() => navigation.navigate("StoreHome")}
          />
        </View>
        <Text className="text-2xl font-bold px-4 py-5">Products</Text>
        <ScrollView
          vertical
          contentContainerStyle={{
            paddingVertical: 0,

            flexGrow: 1,
          }}
          showsHorizontalScrollIndicator={false}
          className="bg-white mb-24"
        >
        <View className="bg-white ">
        {products.map((product, key) => (
          <View key={key} className="flex-row items-start justify-between border border-gray-200 px-4 py-5">
            {product.image ? 
              <Image
                source={require("../../../assets/restaurant.jpg")}
                className="shadow-sm h-24 w-24 rounded-md mt-2"
              />
            : 
            <View className="flex justify-center items-center rounded-md  bg-[#0088EC] shadow-sm h-24 w-24 ">
            <Text className="font-semibold text-xs  text-white">
             {product.name}
            </Text>
          </View>}
            
            <View className="w-3/4">
              <View className="flex-row justify-start items-center">
                <Text className="text-base font-semibold">{product.name}</Text>
                <TouchableOpacity className=" px-2 py-1 rounded-sm mr-1" onPress={()=> {productToEdit(product)}}>
                  <PencilSquareIcon color="#0088EC" size={21} />
                </TouchableOpacity>
              </View>

              <Text className="text-gray-500 pt-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                commodo, justo vel fringilla hendrerit, velit tellus convallis
                odio
              </Text>

              <View className="flex-row justify-end items-center">
                {/* <Text className="py-2">₱ 345.00</Text> */}
                <View className="flex-row">
                {/* <Text className="text-base font-semibold">Price:</Text>
                  <Text className="text-base px-3">0</Text> */}
                   <Text className="py-2 text-sm">₱ {product.price}.00</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
        </View>
        </ScrollView>
        <View className="absolute bottom-5 w-full z-50">
          <TouchableOpacity
            className="flex-row justify-center items-center bg-[#0088EC] py-4 px-4 mx-5 rounded-xl"
            onPress={() => {
              navigation.navigate("AddProduct")
              setStoreMenu({});
            }}
          >
            <Text className="text-white font-semibold text-base">
              Add Product
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Spinner visible={loading} />
    </SafeAreaView>
  );
};
export default StoreProducts;
