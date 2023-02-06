import React, { createContext, useMemo, useReducer, useState } from 'react';
import {
    BackgroundTaskType,
    BackgroundTaskUpdatePayload
} from '../backgroundTask/BackgroundTaskModels';
import { setNotificationForegroundService } from '../backgroundTask/NotifeeService';

export const AppContext = createContext({});

interface Props {
    children: any;
}

export const AppContextProvider = ({ children }: Props) => {
    const reducer = (
        state: BackgroundTaskType,
        action: BackgroundTaskUpdatePayload
    ): BackgroundTaskType => {
        switch (action.type) {
            case BackgroundTaskType.MONITOR_HEART:
                return BackgroundTaskType.MONITOR_HEART;
            case BackgroundTaskType.PHONE_CALL:
                return BackgroundTaskType.PHONE_CALL;
            case BackgroundTaskType.TEXT_TO_SPEECH:
                return BackgroundTaskType.TEXT_TO_SPEECH;
            default:
                return BackgroundTaskType.IDLE;
        }
    };

    const [backgroundState, dispatch] = useReducer(
        reducer,
        BackgroundTaskType.IDLE
    );

    setNotificationForegroundService(backgroundState);

    return (
        <AppContext.Provider
            value={{
                backgroundState,
                dispatch
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
