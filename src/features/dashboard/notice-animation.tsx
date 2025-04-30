import { View, StyleSheet, Animated } from "react-native";
import { NoticeHeight } from "../../utils/scaling";
import { ReactElement } from "react";
import Notice from "../../components/dashboard/notice";

type Props = {
  noticePosition: any;
  children: Readonly<ReactElement>;
};

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const NoticeAnimation = ({ children, noticePosition }: Props) => {
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.noticeContainer,
          {
            transform: [
              {
                translateY: noticePosition,
              },
            ],
          },
        ]}
      >
        <Notice />
      </Animated.View>
      <Animated.View
        style={[
          styles.contentContainer,
          {
            paddingTop: noticePosition.interpolate({
              inputRange: [NOTICE_HEIGHT, 0],
              outputRange: [0, NoticeHeight + 20],
            }),
          },
        ]}
      >
        {children}
      </Animated.View>
    </View>
  );
};

export default NoticeAnimation;

const styles = StyleSheet.create({
  noticeContainer: {
    width: "100%",
    zIndex: 999,
    position: "absolute",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
