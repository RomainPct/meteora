import React from 'react'

export const defaultGlobalContext = {
    introductionIsDone: false,
    currentYear: { year: 2000, meteorsCount: 0 },
    years: {},
    availableYears: [],
    update: (newContext) => {}
}

export const GlobalContext = React.createContext(defaultGlobalContext)