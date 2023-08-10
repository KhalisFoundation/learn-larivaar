import React, {useRef} from 'react';
import {State, TapGestureHandler} from 'react-native-gesture-handler';

export const DoubleTap = ({children, customTap}: any) => {
  const doubleTapRef = useRef(null);

  const onDoubleTapEvent = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      customTap();
    }
  };

  return (
    <TapGestureHandler waitFor={doubleTapRef}>
      <TapGestureHandler
        ref={doubleTapRef}
        onHandlerStateChange={onDoubleTapEvent}
        numberOfTaps={2}>
        {children}
      </TapGestureHandler>
    </TapGestureHandler>
  );
};
