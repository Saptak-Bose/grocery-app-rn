import { View, Text, StyleSheet, Image } from "react-native";
import { Colors } from "../../utils/constants";
import Logo from "../../assets/images/logo.jpeg";
import { screenHeight, screenWidth } from "../../utils/scaling";
import { useEffect } from "react";
import { navigate } from "../../utils/navigationUtils";

type Props = {};

const SplashScreen = (props: Props) => {
  useEffect(() => {
    const navigateUser = async () => {
      try {
        navigate("CustomerLogin");
      } catch (error) {}
    };
    const timeoutId = setTimeout(navigateUser, 4000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logoImage} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    height: screenHeight * 0.4,
    width: screenWidth * 0.4,
    resizeMode: "contain",
  },
});
