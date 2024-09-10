import React from 'react';

export const CurrentTemperatureUnitContext = React.createContext({
    currentTemperature: '',
    handleToggleSwitchChange: () => {}
});
