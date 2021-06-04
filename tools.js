let toStr = Object.prototype.toString;
export const deepCopy = (obj) => {
    let newObj;
    switch (typeof obj) {
        case "object":
            if (obj === null) {
                newObj = null;
            } else {
                switch (toStr.call(obj)) {
                    case "[object Array]":
                        newObj = obj.map(deepCopy);
                        break;
                    default:
                        newObj = Object.keys(obj).reduce((prev, key) => {
                            prev[key] = deepCopy(obj[key]);
                            return prev;
                        }, {});
                        break;
                }
            }
            break;
        default:
            newObj = obj;
            break;
    }
    return newObj;
}


const SCALE = {
  // this defines the terms of our scaling animation.
  getScaleTransformationStyle(animated: Animated.Value, startSize: number = 1, endSize: number = 1.3) {
    const interpolation = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [startSize, endSize],
    });
    return {
      transform: [
        { scale: interpolation },
      ],
    };
  },
  // This defines animation behavior we expext onPressIn
 pressInAnimation(animated: Animated.Value, duration: number = 300) {
    animated.setValue(0);
    Animated.timing(animated, {
      toValue: 1.3,
      duration,
      useNativeDriver: true,
    }).start();
  },
  // This defines animatiom behavior we expect onPressOut
  pressOutAnimation(animated: Animated.Value, duration: number = 300) {
    animated.setValue(1);
    Animated.timing(animated, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
  },
};
