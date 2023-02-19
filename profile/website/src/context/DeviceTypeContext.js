import React, { useState, useEffect } from 'react';
import { isMobileOnly, isTablet } from 'react-device-detect';

export const DeviceTypeContext = React.createContext();

export const DeviceTypeProvider = ({ children }) => {
    const [deviceType, setDeviceType] = useState();

    useEffect(() => {
        const setDevice = () => {
            // checkonly for mobile or table, otherwise its a desktop
            if(isTablet) {
                setDeviceType('TABLET');
            } else if (isMobileOnly) {
                setDeviceType('MOBILE');
            } else {
                setDeviceType('DESKTOP');
            }
        }
        setDevice()
    }, []);

    return (
        <DeviceTypeContext.Provider value={
            { 
                deviceType
            }
        }>
            {children}
        </DeviceTypeContext.Provider>
    )
}