import { Color } from "../../common/styles";
import { Dimensions, StyleSheet } from "react-native";
import { scaleSize } from "../../common/styles/matrics";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
	mainContainer: {
		flex: 1
	},
	topView:{
		zIndex: -1,
		elevation: -1,
		backgroundColor: Color.GhostWhite
	},
	headerImage:{
		zIndex: 1,
		elevation: 1,
		height: scaleSize(45),
		width: width,
		marginTop: scaleSize(15)
	},
	header:{
		height: scaleSize(50),
		width: '100%', 
		backgroundColor: Color.GhostWhite, 
		zIndex: 1
	},
	logo:{
		height: scaleSize(45),
		width: scaleSize(145)
	},
	storiesImage:{
		height: scaleSize(100),
		width: width,
		margin: 1,
	},
	actions:{
		height: scaleSize(40),
		width: width * .9,
		borderRadius: 5,
	},
	profile:{
		height: scaleSize(10),
		width: scaleSize(10),

	},
	info:{
		zIndex: -1,
		height: scaleSize(45),
		width: width
	},
	bottomView:{
		zIndex: -1,
		flex: 0.34,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	navigation:{
		zIndex: 1,
		elevation: 1,
		height: scaleSize(75),
		width: width,
		bottom: 0
	}
});
