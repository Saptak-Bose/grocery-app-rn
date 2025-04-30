import { Image, StyleSheet } from "react-native";
import { screenHeight, screenWidth } from "../../utils/scaling";
import { useCollapsibleContext } from "@r0b0t3d/react-native-collapsible";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { darkWeatherColors } from "../../utils/constants";
import LottieView from "lottie-react-native";

type Props = {};

const Visuals = (props: Props) => {
  const { scrollY } = useCollapsibleContext();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 120], [1, 0]);
    return { opacity };
  });

  return (
    <Animated.View style={[styles.container, headerAnimatedStyle]}>
      <LinearGradient
        colors={darkWeatherColors as [string, string, ...string[]]}
        style={styles.gradient}
      />
      <Image
        source={require("../../assets/images/cloud.png")}
        style={styles.cloud}
      />
      <LottieView
        autoPlay={true}
        enableMergePathsAndroidForKitKatAndAbove={true}
        loop={true}
        style={styles.lottie}
        source={require("../../assets/animations/raining.json")}
      />
    </Animated.View>
  );
};

export default Visuals;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
  lottie: {
    width: "100%",
    height: 150,
    position: "absolute",
    transform: [
      {
        scale: -1,
      },
    ],
  },
  gradient: {
    width: "100%",
    height: screenHeight * 0.4,
    position: "absolute",
  },
  cloud: {
    width: screenWidth,
    resizeMode: "stretch",
    height: 100,
  },
});
