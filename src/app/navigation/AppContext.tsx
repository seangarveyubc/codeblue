import React, { createContext, useState } from 'react';

export const AppContext = createContext({});

interface Props {
    children: any;
}

export const AppContextProvider = ({ children }: Props) => {
    const [user, setUser] = useState(null);

    return (
        <AppContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
