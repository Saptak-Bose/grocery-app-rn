import { View, StyleSheet, Image } from "react-native";
import { screenWidth } from "../../utils/scaling";
import Carousel from "react-native-reanimated-carousel";
import ScalePress from "../ui/scale-press";
import { adData } from "../../utils/dummyData";

type Props = {
  adData: typeof adData;
};

const AdCarousel = ({ adData }: Props) => {
  const baseOptions = {
    vertical: false,
    width: screenWidth,
    height: screenWidth * 0.5,
  };

  return (
    <View style={{ left: -20, marginVertical: 20 }}>
      <Carousel
        {...baseOptions}
        loop
        pagingEnabled
        snapEnabled
        autoPlay
        autoPlayInterval={3000}
        mode="parallax"
        data={adData}
        modeConfig={{
          parallaxScrollingOffset: 0,
          parallaxScrollingScale: 0.94,
        }}
        renderItem={({ item }: any) => (
          <ScalePress style={styles.imageContainer}>
            <Image source={item} style={styles.img} />
          </ScalePress>
        )}
      />
    </View>
  );
};

export default AdCarousel;

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: "100%",
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
});
