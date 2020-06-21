import React from 'react'

export const defaultGlobalContext = {
    introductionIsDone: null,
    currentYear: { year: 2000, meteorsCount: 0 },
    currentYearIndex: 250,
    currentMonth: 1,
    meteorsByYear: {},
    availableYears: [],
    autoNavigationIsPlaying: true,
    update: (newCtx = null, handler = null) => {},
    loadYear: (_year = null) => {}
}

export const GlobalContext = React.createContext(defaultGlobalContext)