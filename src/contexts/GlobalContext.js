import React from 'react'

export const defaultGlobalContext = {
    introductionIsDone: false
}

export const GlobalContext = React.createContext(defaultGlobalContext)