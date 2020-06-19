import React from 'react'

export const defaultGlobalContext = {
    introductionIsDone: false,
    currentYear: { year: 2000, meteorsCount: 0 },
    currentYearIndex: 250,
    currentMonth: 1,
    years: {},
    availableYears: [],
    autoNavigationIsPlaying: true,
    update: (newContext) => {}
}

export const GlobalContext = React.createContext(defaultGlobalContext)