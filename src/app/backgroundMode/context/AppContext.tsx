import React, { createContext, useMemo, useReducer } from 'react';
import { backgroundModeStorage } from '../../localStorage/hooks/useLocalStorage';
import { BACKGROUND_MODE } from '../../localStorage/models/LocalStorageKeys';
import {
    BackgroundMode,
    BackgroundModeUpdatePayload
} from '../models/BackgroundMode';
import { getLocalStorageBackgroundMode } from '../notifee/BackgroundProcess';

export const AppContext = createContext<{
    initialBackgroundState: BackgroundMode;
    dispatch: React.Dispatch<BackgroundModeUpdatePayload>;
}>({
    initialBackgroundState: BackgroundMode.MONITOR_HEART,
    dispatch: () => undefined
});

interface Props {
    children: any;
}

export const AppContextProvider = ({ children }: Props) => {
    const initialBackgroundState: BackgroundMode =
        getLocalStorageBackgroundMode() ?? BackgroundMode.MONITOR_HEART;

    const backgroundModeReducer = (
        state: BackgroundMode,
        action: BackgroundModeUpdatePayload
    ): BackgroundMode => {
        backgroundModeStorage.add(BACKGROUND_MODE, action.type);
        return action.type;
    };

    const [backgroundState, dispatch] = useReducer(
        backgroundModeReducer,
        initialBackgroundState
    );

    // logging
    useMemo(() => {
        console.log('[AppContext] Context backgroundState', backgroundState);
    }, [backgroundState]);

    return (
        <AppContext.Provider
            value={{
                initialBackgroundState: initialBackgroundState,
                dispatch: dispatch
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
