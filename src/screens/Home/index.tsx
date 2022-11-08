import React from "react";
import { View, Image, ImageBackground } from "react-native";
import AnimatedCard from "../../components/AnimatedCard";
import data from "../../common/data";
import images from "../../common/styles/image";
import styles from "./styles";

const Home = () => {

	return (
		<View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
			<View style={styles.header}>
				<ImageBackground source={images.header} style={styles.headerImage} >
					<Image source={images.logo} style={styles.logo} />
				</ImageBackground>
			</View>
			<Image source={images.stories} style={styles.storiesImage} />
			<AnimatedCard
				data={data}
				swipeDirection={(event: string) => ''}
			/>
			<View style={styles.bottomView}>
				<Image source={images.actions} style={styles.actions} />
				<View style={{}}>
					<Image source={images.info} style={styles.info} />
				</View>
			</View>
			<Image source={images.Navigation} style={styles.navigation} />

		</View>
	);
};
export default Home;
