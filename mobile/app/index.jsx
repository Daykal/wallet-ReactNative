import { Image } from "expo-image";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backfaceVisibility: "hidden",
        backdropFilter: "blur(10px)",
        backgroundColor: "green",
        opacity: 1,
      }}
    >
      <Text>Edit app/index.tsx to edit this screen Mahdi.</Text>
      <Link href={"/about"}>About</Link>
      <Image
        source={{
          uri: "https://wallpapers.com/images/high/tom-and-jerry-funny-xl86wc6tyw0k08nh.webp",
        }}
        style={{ width: 200, height: 200, borderRadius: 100, borderColor: "red", borderWidth: 5 }}
      />
    </View>
  );
}
