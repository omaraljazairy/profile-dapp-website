import React, { useState, useEffect } from 'react';
import { isMobileOnly, isTablet, isBrowser, isMobile } from 'react-device-detect';
import { deviceTypes } from '../utils/enums';

export const DeviceTypeContext = React.createContext();

export const DeviceTypeProvider = ({ children }) => {
    const [deviceType, setDeviceType] = useState();

    useEffect(() => {
        const setDevice = () => {
            // checkonly for mobile or table, otherwise its a desktop
            console.log("isBrowser => ", isBrowser, " - isMobile => ", isMobile);
            if(isTablet) {
                setDeviceType(deviceTypes.TABLET);
            } else if (isMobileOnly) {
                setDeviceType(deviceTypes.MOBILE);
            } else {
                setDeviceType(deviceTypes.DESKTOP);
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