import {
  StyleSheet,
  View,
  SafeAreaView as LowerSafeAreaView,
  Animated,
  Image,
  Keyboard,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import {
  GestureHandlerRootView,
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  State,
} from "react-native-gesture-handler";
import CustomSafeAreaView from "../../components/global/custom-safe-area-view";
import ProductSlider from "../../components/login/product-slider";
import { Colors, Fonts, lightColors } from "../../utils/constants";
import CustomText from "../../components/ui/custom-text";
import { RFValue } from "react-native-responsive-fontsize";
import { useEffect, useRef, useState } from "react";
import { resetAndNavigate } from "../../utils/navigationUtils";
import useKeyboardOffsetHeight from "../../utils/useKeyboardOffsetHeight";
import { LinearGradient } from "expo-linear-gradient";
import CustomInput from "../../components/ui/custom-input";
import CustomButton from "../../components/ui/custom-button";
import { customerLogin } from "../../services/auth-service";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {};

const bottomColors = [...lightColors].reverse() as [
  string,
  string,
  ...string[]
];

const CustomerLogin = (props: Props) => {
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const keyboardOffsetHeight = useKeyboardOffsetHeight();

  useEffect(() => {
    if (Platform.OS === "ios") {
      if (keyboardOffsetHeight === 0) {
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(animatedValue, {
          toValue: -keyboardOffsetHeight * 0.84,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }
    }
  }, [keyboardOffsetHeight]);

  const handleGesture = ({
    nativeEvent,
  }: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
    if (nativeEvent.state === State.END) {
      const { translationX, translationY } = nativeEvent;
      let direction = "";

      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? "right" : "left";
      } else {
        direction = translationY > 0 ? "down" : "up";
      }

      const newSequence = [...gestureSequence, direction].slice(-5);
      setGestureSequence(newSequence);

      if (newSequence.join(" ") === "up up down left right") {
        setGestureSequence([]);
        resetAndNavigate("DeliveryLogin");
      }
    }
  };

  const handleAuth = async () => {
    Keyboard.dismiss();
    setLoading(true);

    try {
      await customerLogin(phoneNumber);
      resetAndNavigate("ProductDashboard");
    } catch (error) {
      Alert.alert("Login failed...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <CustomSafeAreaView>
          <ProductSlider />
          <PanGestureHandler onHandlerStateChange={handleGesture}>
            <Animated.ScrollView
              bounces={false}
              style={{
                transform: [
                  {
                    translateY: animatedValue,
                  },
                ],
              }}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.subContainer}
            >
              <LinearGradient colors={bottomColors} style={styles.gradient} />
              <View style={styles.content}>
                <Image
                  source={require("../../assets/images/logo.jpeg")}
                  style={styles.logo}
                />
                <CustomText variant="h2" fontFamily={Fonts.Bold}>
                  Grocery Delivery App
                </CustomText>
                <CustomText
                  variant="h5"
                  fontFamily={Fonts.SemiBold}
                  style={styles.text}
                >
                  Log in or Sign up
                </CustomText>
                <CustomInput
                  onChangeText={(t) => setPhoneNumber(t.slice(0, 10))}
                  onClear={() => setPhoneNumber("")}
                  value={phoneNumber}
                  placeholder="Enter your mobile number..."
                  inputMode="numeric"
                  left={
                    <CustomText
                      style={styles.phoneText}
                      variant="h6"
                      fontFamily={Fonts.SemiBold}
                    >
                      +91
                    </CustomText>
                  }
                />
                <CustomButton
                  disabled={phoneNumber?.length !== 10}
                  onPress={() => handleAuth()}
                  loading={loading}
                  title="Continue"
                />
              </View>
            </Animated.ScrollView>
          </PanGestureHandler>
        </CustomSafeAreaView>
        <View style={styles.footer}>
          <LowerSafeAreaView />
          <CustomText fontSize={RFValue(9)}>
            By continuing, you agree to our{" "}
            <CustomText
              fontSize={RFValue(9)}
              style={{
                textDecorationStyle: "solid",
                textDecorationLine: "underline",
              }}
            >
              Terms of Service and Privacy Policy
            </CustomText>
            .
          </CustomText>
          <LowerSafeAreaView />
        </View>
        <TouchableOpacity
          style={styles.absoluteSwitch}
          onPress={() => resetAndNavigate("DeliveryLogin")}
        >
          <MaterialCommunityIcons
            name="bike-fast"
            color="#000"
            size={RFValue(18)}
          />
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

export default CustomerLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 20,
    marginVertical: 10,
  },
  subContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  footer: {
    borderTopWidth: 0.8,
    borderColor: Colors.border,
    paddingBottom: 10,
    zIndex: 22,
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f9fc",
    width: "100%",
  },
  gradient: {
    paddingTop: 60,
    width: "100%",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  phoneText: {
    marginLeft: 10,
  },
  absoluteSwitch: {
    position: "absolute",
    top: 40,
    zIndex: 99,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 10,
    padding: 10,
    height: 55,
    width: 55,
    borderRadius: 50,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
