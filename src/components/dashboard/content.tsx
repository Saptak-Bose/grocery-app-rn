import { View, StyleSheet } from "react-native";
import { adData, categories } from "../../utils/dummyData";
import AdCarousel from "./ad-carousel";
import CustomText from "../ui/custom-text";
import { Fonts } from "../../utils/constants";
import CategoryContainer from "./category-container";

type Props = {};

const Content = (props: Props) => {
  return (
    <View style={styles.container}>
      <AdCarousel adData={adData} />
      <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
        Grocery & Kitchen
      </CustomText>
      <CategoryContainer data={categories} />
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
