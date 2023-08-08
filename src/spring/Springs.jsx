import { useSpring, animated } from '@react-spring/web';
import {useEffect} from "react";

const Springs = () => {
    const finalPosition = { x: 0, y: window.innerHeight - 50 }; // Y position to make the rectangle fall to the bottom

    const springConfig = { mass: 1, tension: 170, friction: 26, duration: 3000 }; // Set the duration to 3000 milliseconds (3 seconds)

    const springProps = useSpring({
        from: { y: 0 },
        to: { y: finalPosition.y },
        config: springConfig,
    });

    useEffect(() => {
        // Start the animation when the component mounts
        springProps?.start();
    }, [springProps]);
    return(
        <animated.div
            style={{
                position: 'absolute',
                transform: springProps.y.interpolate((y) => `translate3d(0, ${y}px, 0)`),
                backgroundColor: 'red',
                width: 50,
                height: 50,
            }}
        />
    )
}

export default Springs