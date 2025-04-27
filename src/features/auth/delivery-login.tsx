import { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { deliveryLogin } from "../../services/auth-service";
import { resetAndNavigate } from "../../utils/navigationUtils";
import CustomSafeAreaView from "../../components/global/custom-safe-area-view";

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

  return <CustomSafeAreaView>DeliveryLogin</CustomSafeAreaView>;
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
  },
});
