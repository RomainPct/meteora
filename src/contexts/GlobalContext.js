import React from 'react'

export const defaultGlobalContext = {
    introductionIsDone: false,
    currentYear: 2000,
    years: {}
}

export const GlobalContext = React.createContext(defaultGlobalContext)