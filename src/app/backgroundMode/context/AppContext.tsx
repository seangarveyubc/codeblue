import React, { createContext, useReducer } from 'react';
import { backgroundModeStorage } from '../../localStorage/hooks/useLocalStorage';
import { BACKGROUND_MODE } from '../../localStorage/models/LocalStorageKeys';
import {
    BackgroundMode,
    BackgroundModeUpdatePayload
} from '../models/BackgroundMode';

export const AppContext = createContext<{
    dispatch: React.Dispatch<BackgroundModeUpdatePayload>;
}>({
    dispatch: () => undefined
});

interface Props {
    children: any;
}

export const AppContextProvider = ({ children }: Props) => {
    const initialBackgroundState: BackgroundMode =
        (backgroundModeStorage.getString(BACKGROUND_MODE) as BackgroundMode) ??
        BackgroundMode.IDLE;

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

    return (
        <AppContext.Provider
            value={{
                dispatch: dispatch
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
