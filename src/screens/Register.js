import { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { REACT_APP_BASE_API_URL } from "@env";
import SafeViewAndroid from "../components/SafeViewAndroid";
import Spinner from "react-native-loading-spinner-overlay";
import { ArrowRightIcon } from "react-native-heroicons/outline";

const Register = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    prod_name: "",
    price: "",
    contact_number: "",
    plan_type_id: "",
  });
  

  useLayoutEffect(() =>
    navigation.setOptions({
      headerShown: false,
    })
  );

  const inputHandler = (prop, value) => {
    setData({ ...data, [prop]: value });
  };

  const submitRegistration = () => {
    setLoading(true);
    const register = async () => {
      try {
        const res = await axios.post(
          `${REACT_APP_BASE_API_URL}/user-signup`,
          data
        );
        if (res.data.status !== "failed") {
          alert("Registration Success");
          setData("");
          setLoading(false);
        } else {
          alert(res.data.message);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    register();
  };

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View className="flex-1 px-5" style={{ backgroundColor: "#0088EC" }}>
        <View className="flex flex-row justify-center mt-10">
          <Image
            source={require("../../assets/app-logo.jpg")}
            className="h-44 w-44"
          />
        </View>
        <Text className="mt-2 text-3xl text-white font-bold">Create Account</Text>
        <Text className="text-lg text-gray-800">Fill up the fields to register and start booking</Text>
        <View className="mt-5 h-screen">
         <View className="relative mb-5">
            <Text
              className="absolute text-red-500 text-sm top-2 left-4 z-10"
              style={{ color: "#FE6205" }}
            >
              Fullname
            </Text>
            <TextInput
              className="bg-gray-100 rounded-lg px-4 pb-3 pt-6 w-full text-base"
              // onChangeText={setContactNumber}
              // value={contactNumber}
              placeholder="Enter complete name"
            />
            {/* <UserIcon style={{position: 'absolute', top: 15, left: 10}} color="#c7c7c7" size={30}/> */}
          </View>
         <View className="relative mb-5">
            <Text
              className="absolute text-red-500 text-sm top-2 left-4 z-10"
              style={{ color: "#FE6205" }}
            >
              Contact Number
            </Text>
            <TextInput
              className="bg-gray-100 rounded-lg px-4 pb-3 pt-6 w-full text-base"
              // onChangeText={setContactNumber}
              // value={contactNumber}
              placeholder="Enter contact number"
            />
            {/* <UserIcon style={{position: 'absolute', top: 15, left: 10}} color="#c7c7c7" size={30}/> */}
          </View>
          <View className="relative mb-5">
            <Text
              className="absolute text-red-500 text-sm top-2 left-4 z-10"
              style={{ color: "#FE6205" }}
            >
              Username
            </Text>
            <TextInput
              className="bg-gray-100 rounded-lg px-4 pb-3 pt-6 w-full text-base"
              // onChangeText={setContactNumber}
              // value={contactNumber}
              placeholder="Enter username"
            />
            {/* <UserIcon style={{position: 'absolute', top: 15, left: 10}} color="#c7c7c7" size={30}/> */}
          </View>
          <View className="relative mb-5">
            <Text
              className="absolute text-sm top-2 left-4 z-10"
              style={{ color: "#FE6205" }}
            >
              Password
            </Text>
            <TextInput
              className="bg-gray-100 rounded-lg px-4 pb-3 pt-6 w-full text-base"
              // onChangeText={setPassword}
              secureTextEntry={false}
              // value={password}
              placeholder="Enter password"
            />
            {/* <LockClosedIcon style={{position: 'absolute', top: 15, left: 10}} color="#c7c7c7" size={30}/> */}
            {/* {!visible ? (
              <EyeIcon
                onPress={()=> enablePassword()}
                style={{ position: "absolute", top: 15, right: 10 }}
                color="#c7c7c7"
                size={30}
              />
            ) : (
              <EyeSlashIcon
                onPress={()=> enablePassword()}
                style={{ position: "absolute", top: 15, right: 10 }}
                color="#c7c7c7"
                size={30}
              />
            )} */}
          </View>
          <View className="flex-row justify-end">
            <TouchableOpacity
              className="flex-row items-center justify-end px-4 mt-4 rounded-full h-14 w-36"
              style={{ backgroundColor: "#FE6205" }}
              //   onPress={submitLogin}
            >
              <Text className="text-white text-lg mr-2  font-bold text-center">
                Sign up
              </Text>
              <ArrowRightIcon color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-1 flex-col justify-end py-10">
          <Text className="mt-5 text-base text-gray-700 text-center">
            Already have an account?
            <Text
              className="font-bold text-white"
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              {" "}
              Sign in
            </Text>
          </Text>
        </View>
      </View>
      <Spinner visible={loading} />
    </SafeAreaView>
  );
};
export default Register;
