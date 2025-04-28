import { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { deliveryLogin } from "../../services/auth-service";
import { resetAndNavigate } from "../../utils/navigationUtils";
import CustomSafeAreaView from "../../components/global/custom-safe-area-view";
import { screenHeight } from "../../utils/scaling";
import LottieView from "lottie-react-native";
import CustomText from "../../components/ui/custom-text";
import { Fonts } from "../../utils/constants";
import CustomInput from "../../components/ui/custom-input";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import CustomButton from "../../components/ui/custom-button";

type Props = {};

const DeliveryLogin = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      await deliveryLogin(email, password);
      resetAndNavigate("DeliveryDashboard");
    } catch (error) {
      Alert.alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomSafeAreaView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View style={styles.container}>
          <View style={styles.lottieContainer}>
            <LottieView
              autoPlay
              loop
              style={styles.lottie}
              source={require("../../assets/animations/delivery_man.json")}
              hardwareAccelerationAndroid
            />
          </View>
          <CustomText variant="h3" fontFamily={Fonts.Bold}>
            Delivery Partner Portal
          </CustomText>
          <CustomText
            variant="h6"
            style={styles.text}
            fontFamily={Fonts.SemiBold}
          >
            Faster than Flash⚡
          </CustomText>
          <CustomInput
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            inputMode="email"
            right={false}
            left={
              <Ionicons
                name="mail"
                color="#f8890e"
                style={{ marginLeft: 10 }}
                size={RFValue(18)}
              />
            }
          />
          <CustomInput
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry
            right={false}
            left={
              <Ionicons
                name="key-sharp"
                color="#f8890e"
                style={{ marginLeft: 10 }}
                size={RFValue(18)}
              />
            }
          />
          <CustomButton
            disabled={email.length === 0 || password.length < 8}
            title="Login"
            onPress={handleLogin}
            loading={loading}
          />
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

export default DeliveryLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  lottie: {
    height: "100%",
    width: "100%",
  },
  lottieContainer: {
    height: screenHeight * 0.12,
    width: "100%",
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
});
