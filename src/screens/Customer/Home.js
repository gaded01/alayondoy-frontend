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
  ArrowRightIcon,
  MagnifyingGlassIcon,
  UserIcon,
  MapPinIcon,
} from "react-native-heroicons/outline";
import { useStoreMenuContext } from "../../context/StoreMenuContext";
import { useCartContext } from "../../context/CartContext";

const Home = () => {
  const navigation = useNavigation();
  const [stores, setStores] = useState([]);
  const [loading , setLoading] = useState(false);
  const { setCart } = useCartContext([]);
  const { setStoreMenu } = useStoreMenuContext();
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
    setLoading(true);
    ( async()=> {
      let response = await AsyncStorage.getItem('@access_token');
      config = {
         headers: {Authorization: `Bearer ${response}`}
      }
      axios
        .get(`${REACT_APP_BASE_API_URL}/all-stores`,  config)
        .then((res) => {
          if (res.data) {
            setStores(res.data.stores)
          } else {
            alert(res.data.message);
          }
        })
        .catch((error) => {
          console.log('error', error);
          setLoading(false);
        });
    })()
  },[])
  
  const selectStore = async (id) => {
    let response = await AsyncStorage.getItem('@access_token');
    config = {
       headers: {Authorization: `Bearer ${response}`}
    }
    axios
      .post(`${REACT_APP_BASE_API_URL}/get-store`, {id: id},  config)
      .then((res) => {
        if (res.data) {
          setStoreMenu(res.data.store)
          setCart([]);
          navigation.navigate('ShopeMenu');
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.log('error', error);
        setLoading(false);
      });
  }
  
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View className="flex-1 p-5">
        <View className="flex-row justify-between items-center">
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
              >
                 {stores.map((store, key) => (
                  <TouchableOpacity key={key} className="bg-white w-64 pb-5 mr-5 shadow-lg rounded-sm" onPress={()=> selectStore(store.id)}>
                    <View className="w-100 flex  bg-[#0088EC]  items-center h-32 justify-center">
                      {store.image != null ? 
                      <Image
                      source={require("../../../assets/restaurant.jpg")}
                      className="shadow-sm h-36 w-64" 
                      /> :    <Text className="font-semibold text-white">No Image Available</Text>}
              
                      {/* <Image
                        source={require("../../../assets/store.png")}
                        className="shadow-sm h-20 w-20" 
                      /> */}
                    </View>
                  
                    <View className="px-3 py-3">
                      <Text className="text-lg font-semibold">
                        {store.name} 
                      </Text>
                      <View className="flex-row items-center">
                        {/* <MapPinIcon color="gray" /> */}
                        <Text className="text-base font-semibold text-gray-500">
                          {store.address.address}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
                
                }
              
              
              </ScrollView>
            </View>
          </View>
          {/* Most visited */}
          <View className="">
            <View className="flex-row justify-between">
              <View>
                <Text className="font-bold text-xl">
                  Most Visited Shop/Restaurant
                </Text>
                <Text className="text-sm text-gray-500">
                  Everyone's been visiting this the most
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
              >
                {stores.map((store, key) => (
                  <TouchableOpacity key={key} className="bg-white w-64 pb-5 mr-5 shadow-lg rounded-sm">
                    <View className="w-100 flex  bg-[#0088EC]  items-center h-32 justify-center">
                      {store.image != null ? 
                      <Image
                      source={require("../../../assets/restaurant.jpg")}
                      className="shadow-sm h-36 w-64" 
                      /> :    <Text className="font-semibold text-white">No Image Available</Text>}
              
                      {/* <Image
                        source={require("../../../assets/store.png")}
                        className="shadow-sm h-20 w-20" 
                      /> */}
                    </View>
                  
                    <View className="px-3 py-3">
                      <Text className="text-lg font-semibold">
                        {store.name} 
                      </Text>
                      <View className="flex-row items-center">
                        {/* <MapPinIcon color="gray" /> */}
                        <Text className="text-base font-semibold text-gray-500">
                          {store.address.address}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
                
                }
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Home;
