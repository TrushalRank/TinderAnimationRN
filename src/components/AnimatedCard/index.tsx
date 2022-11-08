import React, { useState } from 'react';
import { StyleSheet, View, Animated, Text, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import useTinderCards from '../useTinderCard';
import { scaleSize } from '../../common/styles/matrics';
import images from '../../common/styles/image';
import { Color } from '../../common/styles';
import LinearGradient from 'react-native-linear-gradient';

function App(props) {
    const { data } = props
    const [ImageArray, setimageArray] = useState(data);
    const [Array, _panResponder, animation, scale, opacity, gesture, likeOpacity, currentIndex, dislikeOpacity, superLike,] = useTinderCards(ImageArray, props?.swipeDirection);

    return (
        <View style={styles.container}>
            {Array
                .slice(0, 2)
                .reverse()
                .map((item, index, items) => {

                    const isLastItem = index === items.length - 1;
                    const panHandlers = isLastItem ? { ..._panResponder.panHandlers } : {};
                    const isSecondToLast = index === items.length - 2;
                    const rotate = animation.x.interpolate({
                        inputRange: [-200, 0, 200],
                        outputRange: ['-30deg', '0deg', '30deg'],
                        extrapolate: 'clamp',
                    });

                    const animatedCardStyles = {
                        transform: [{ rotate }, ...animation.getTranslateTransform()],
                        opacity,
                    };

                    const cardStyle = isLastItem ? animatedCardStyles : undefined;
                    const nextStyle = isSecondToLast
                        ? { transform: [{ scale: scale }], borderRadius: 5 }
                        : undefined;


                    return (
                        <Animated.View
                            {...panHandlers}
                            style={[styles.card, cardStyle, nextStyle]}
                            key={item.id}>
                            <View style={styles.imageContainer}>
                                <TouchableOpacity activeOpacity={1} onPress={() => {}} >
                                    {currentIndex === item.id ?
                                        (<Animated.View style={[styles.actionView, { opacity: likeOpacity, backgroundColor: Color.ElectricIndigo }]}>
                                            <View style={styles.crossView}>
                                                <Image source={images.bookmark} style={styles.actionImage} />
                                            </View>
                                            <Text style={styles.actionText}>KEEP</Text>
                                        </Animated.View>)
                                        : null
                                    }
                                    <ImageBackground borderRadius={15} source={item.url} style={styles.image} >
                                        <LinearGradient start={{x: 0, y: 1}} end={{x: 0, y: 0}} colors={['transparent', '#00000030', '#00000090']} style={styles.profileView}>

                                            <Image source={images.profile} style={styles.profileImage} />

                                            <View style={{ justifyContent: 'space-around', height: scaleSize(45) }}>
                                                <Text style={{ color: Color.white, fontWeight: '800' }}>나나랜드</Text>
                                                <Text style={{ color: Color.white, fontSize: scaleSize(14), fontWeight: '800' }}>25세 서울 종로구 직장인</Text>
                                                
                                            </View>
                                            
                                        </LinearGradient>

                                        <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={['transparent', '#00000050', '#00000090']} style={styles.infoView}>

                                            <Text style={styles.info}>퇴근하고</Text>
                                            <Text style={styles.info}>몽실이랑 산책 어때요? 🐶</Text>

                                            <View style={{ flexDirection: 'row', marginVertical: scaleSize(10), }}>
                                                <View style={styles.profileInfo}>
                                                    <Text style={styles.profileInfoText}>오늘 저녁</Text>
                                                </View>
                                                <View style={styles.profileInfo}>
                                                    <Text style={styles.profileInfoText}>반려동물</Text>
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: "center", }}>
                                                <Image source={images.location} style={styles.location} />
                                                <Text style={{ color: Color.white, fontSize: scaleSize(15), fontWeight: '800' }}>한강공원</Text>
                                            </View>

                                            <Text style={{ color: Color.white, fontSize: scaleSize(14) }}>반포동 115-5</Text>
                                            
                                        </LinearGradient>
                                    </ImageBackground>

                                    {currentIndex === item.id ?
                                        (<Animated.View style={[styles.actionView, { opacity: dislikeOpacity, backgroundColor: Color.lightblack }]}>
                                            <View style={styles.crossView}>
                                                <Image source={images.cross} style={styles.actionImage} />
                                            </View>
                                            <Text style={styles.actionText}>PASS</Text>
                                        </Animated.View>)
                                        : null
                                    }
                                </TouchableOpacity>

                            </View>
                        </Animated.View>
                    );
                })}
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    card: {
        width: scaleSize(340),
        height: Dimensions.get('window').height * .44,
        backgroundColor: Color.Cultured,
        position: 'absolute',
        borderRadius: 10,
    },
    actionImage: {
        height: scaleSize(40),
        width: scaleSize(40),
        tintColor: Color.white
    },
    crossView: {
        height: scaleSize(85),
        width: scaleSize(85),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        borderColor: Color.white,
        borderRadius: 50
    },
    actionView: {
        position: 'absolute',
        zIndex: 1000,
        borderRadius: 10,
        width: scaleSize(340),
        height: Dimensions.get('window').height * .44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoView: {
        height: Dimensions.get('window').height * 0.25,
        width: scaleSize(340),
        position: 'absolute',
        bottom: 0,
        padding: scaleSize(10),
        borderRadius: scaleSize(15),
        justifyContent: 'flex-end'
    },
    actionText: {
        fontSize: scaleSize(25),
        color: Color.white,
        fontWeight: '700',
        marginTop: scaleSize(10)
    },
    info:{
        color: Color.white, 
        fontSize: Dimensions.get('window').height * 0.03, 
        fontWeight: '800' 
    },
    profileInfo:{
        borderWidth: 1, 
        borderColor: Color.white, 
        height: scaleSize(30), 
        width: scaleSize(75), 
        borderRadius: 50, 
        alignItems: 'center', 
        justifyContent: 'center' ,
        marginRight: scaleSize(5)
    },
    imageContainer: {
        flex: 1
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        justifyContent: 'space-between'
    },
    profileImage: {
        height: scaleSize(45),
        width: scaleSize(45),
        marginHorizontal: scaleSize(15)
    },
    profileView: {
        flex: 0.25,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopRightRadius: scaleSize(15),
        borderTopLeftRadius: scaleSize(15),
    },
    profileInfoText:{
        color: Color.white, 
        fontSize: scaleSize(13), 
        fontWeight: '800',
    },
    location: {
        height: scaleSize(10),
        width: scaleSize(10),
        tintColor: Color.white,
        marginHorizontal: scaleSize(5)
    },
    textContainer: {
        padding: 10
    },
    nameText: {
        fontSize: 16,
    },
    animalText: {
        fontSize: 14,
        color: '#757575',
        paddingTop: 5
    }
});

export default App;
