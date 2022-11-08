import React, { useRef, useState, useEffect } from 'react';
import { Animated, PanResponder, Dimensions } from 'react-native';
import clamp from 'clamp';

const { width, height } = Dimensions.get('screen');

const SWIPE_THRESHOLD = 0.25 * width;
const SWIPE_HEIGHT = 0.50 * height;


export default function useTinderCards(deck, swipeDirection) {
    const [Array, setArray] = useState(deck);
    const [gesture, setgesture] = useState(false);
    const position = useRef(new Animated.ValueXY()).current;
    const [currentIndex, setcurrentIndex] = useState(1);
    
    const animation = useRef(new Animated.ValueXY()).current;
    const opacity = useRef(new Animated.Value(1)).current;
    const scale = useRef(new Animated.Value(0.9)).current;
    const likeOpacity = position.x.interpolate({
        inputRange: [-width / 2, 0, width / 2],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp'
    })
    const dislikeOpacity = position.x.interpolate({
        inputRange: [-width / 2, 0, width / 2],
        outputRange: [1, 0, 0],
        extrapolate: 'clamp'
    })
    const superLike = position.y.interpolate({
        inputRange: [-height / 2, 0, height / 2],
        outputRange: [1, 0, 0],
        extrapolate: 'clamp'
    })
    const transitionNext = function () {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.spring(scale, {
                toValue: 1,
                friction: 4,
                useNativeDriver: false,
            }),
        ]).start(() => {
            setArray((data) => {
                // data.length <= 3 ? setArray((prev: any) => [...prev, ...Array]) : null
                return data.slice(1)
            });
        });
    };

    useEffect(() => {
        scale.setValue(0.9);
        opacity.setValue(1);
        animation.setValue({ x: 0, y: 0 });
    }, [Array])
    
    const _panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                const { dx, dy, moveX, moveY, numberActiveTouches, stateID, vx, vy, x0, y0 } = gesture
                animation.setValue({ x: gesture.dx, y: gesture.dy });
                setgesture(true)
                position.setValue({ x: gesture.dx, y: gesture.dy })
            },
            onPanResponderRelease: (e, { dx, dy, vx, vy }) => {
                setgesture(false)
                let velocity;
                if (vx >= 0) {
                    velocity = clamp(vx, 4, 5);
                } else if (vx < 0) {
                    velocity = clamp(Math.abs(vx), 4, 5) * -1;
                }
                if (Math.abs(dx) > SWIPE_THRESHOLD) {
                    setcurrentIndex(prev => prev + 1)
                    position.setValue({ x: 0, y: 0 })
                    Animated.parallel([
                        Animated.decay(animation, {
                            velocity: { x: velocity, y: vy },
                            deceleration: 0.99,
                            useNativeDriver: false,
                        }),
                        Animated.spring(scale, {
                            toValue: 1,
                            friction: 4,
                            useNativeDriver: false,
                        }),
                    ]).start(transitionNext);
                    if (velocity > 0) {
                        // handleRightDecay();
                        swipeDirection('right')
                    } else {
                        // handleLeftDecay();
                        swipeDirection('left')
                    }
                } else {
                    if(Math.abs(dy) > SWIPE_HEIGHT){
                        // handleBottomDecay();
                        swipeDirection('bottom')
                    } else{
                        // handleTopDecay();
                        swipeDirection('top')
                    }
                    Animated.spring(animation, {
                        toValue: { x: 0, y: 0 },
                        friction: 4,
                        useNativeDriver: false,
                    }).start();
                }
            },
        })
    ).current;
    return [Array, _panResponder, animation, scale, opacity, gesture, likeOpacity, currentIndex, dislikeOpacity, superLike, ];
}