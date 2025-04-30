'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AnimationContextProps {
    isFading: boolean;
    startFade: (callback: () => void) => void;
}

interface AnimationProviderProps {
    children: ReactNode; 
}

const AnimationContext = createContext<AnimationContextProps | undefined>(undefined);

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
    const [isFading, setIsFading] = useState(false);

    const startFade = (callback: () => void) => {
        setIsFading(true);
        setTimeout(() => {
            setIsFading(false);
            callback(); 
        }, 500); 
    };

    return (
        <AnimationContext.Provider value={{ isFading, startFade }}>
            {children}
        </AnimationContext.Provider>
    );
};

export const useAnimation = () => {
    const context = useContext(AnimationContext);
    if (!context) {
        throw new Error('useAnimation must be used within AnimationProvider');
    }
    return context;
};