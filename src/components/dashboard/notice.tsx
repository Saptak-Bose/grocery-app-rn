import { View, StyleSheet } from "react-native";
import { NoticeHeight } from "../../utils/scaling";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../ui/custom-text";
import { Fonts } from "../../utils/constants";
import Svg, { Defs, G, Path, Use } from "react-native-svg";
import { wavyData } from "../../utils/dummyData";

type Props = {};

const Notice = (props: Props) => {
  return (
    <View style={{ height: NoticeHeight }}>
      <View style={styles.container}>
        <View style={styles.noticeContainer}>
          <SafeAreaView style={{ padding: 10 }}>
            <CustomText
              style={styles.heading}
              variant="h8"
              fontFamily={Fonts.SemiBold}
            >
              It's raining near this location...
            </CustomText>
            <CustomText variant="h9" style={styles.textCenter}>
              Our delivery partners are working hard to get your order to you as
              soon as possible.
            </CustomText>
          </SafeAreaView>
        </View>
      </View>

      <Svg
        width="100%"
        height="35"
        fill="#ccd5e4"
        viewBox="0 0 4000 1000"
        preserveAspectRatio="none"
        style={styles.wave}
      >
        <Defs>
          <Path id="wavepath" d={wavyData} />
        </Defs>
        <G>
          <Use href="#wavepath" y="321" />
        </G>
      </Svg>
    </View>
  );
};

export default Notice;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ccd5e4",
  },
  noticeContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccd5e4",
  },
  textCenter: {
    textAlign: "center",
    marginBottom: 8,
  },
  heading: {
    color: "#2d3875",
    marginBottom: 8,
    textAlign: "center",
  },
  wave: {
    width: "100%",
    transform: [
      {
        rotateX: "180deg",
      },
    ],
  },
});
