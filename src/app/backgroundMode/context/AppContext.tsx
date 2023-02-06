import React, { createContext, useMemo, useReducer } from 'react';
import { useLocalStorage } from '../../localStorage/hooks/useLocalStorage';
import { BACKGROUND_MODE } from '../../localStorage/models/LocalStorageKeys';
import {
    BackgroundMode,
    BackgroundModeUpdatePayload
} from '../models/BackgroundMode';

export const AppContext = createContext<{
    backgroundState: BackgroundMode;
    dispatch: React.Dispatch<BackgroundModeUpdatePayload>;
}>({
    backgroundState: BackgroundMode.IDLE,
    dispatch: () => undefined
});

interface Props {
    children: any;
}

export const AppContextProvider = ({ children }: Props) => {
    const { appDataStorage } = useLocalStorage();

    const backgroundModeReducer = (
        state: BackgroundMode,
        action: BackgroundModeUpdatePayload
    ): BackgroundMode => {
        appDataStorage.add(BACKGROUND_MODE, action.type);
        switch (action.type) {
            case BackgroundMode.MONITOR_HEART:
                return BackgroundMode.MONITOR_HEART;
            case BackgroundMode.PHONE_CALL:
                return BackgroundMode.PHONE_CALL;
            case BackgroundMode.TEXT_TO_SPEECH:
                return BackgroundMode.TEXT_TO_SPEECH;
            default:
                return BackgroundMode.IDLE;
        }
    };

    const [backgroundState, dispatch] = useReducer(
        backgroundModeReducer,
        BackgroundMode.IDLE
    );

    useMemo(() => {
        console.log(backgroundState);
    }, [backgroundState]);

    return (
        <AppContext.Provider
            value={{
                backgroundState: backgroundState,
                dispatch: dispatch
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
