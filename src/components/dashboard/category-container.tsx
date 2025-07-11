import { View, StyleSheet, Image } from "react-native";
import { categories } from "../../utils/dummyData";
import ScalePress from "../ui/scale-press";
import { navigate } from "../../utils/navigationUtils";
import CustomText from "../ui/custom-text";
import { Fonts } from "../../utils/constants";

type Props = {
  data: typeof categories;
};

const CategoryContainer = ({ data }: Props) => {
  const renderItems = (items: typeof categories) => (
    <>
      {items?.map((item, index) => (
        <ScalePress
          key={index}
          style={styles.item}
          onPress={() => navigate("ProductCategories")}
        >
          <View style={styles.imageContainer}>
            <Image source={item?.image} style={styles.image} />
          </View>
          <CustomText
            style={styles.text}
            variant="h8"
            fontFamily={Fonts.Medium}
          >
            {item?.name}
          </CustomText>
        </ScalePress>
      ))}
    </>
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>{renderItems(data?.slice(0, 4))}</View>
      <View style={styles.row}>{renderItems(data?.slice(4))}</View>
    </View>
  );
};

export default CategoryContainer;

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 25,
  },
  text: {
    textAlign: "center",
  },
  item: {
    width: "22%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
    backgroundColor: "#e5f3f3",
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
