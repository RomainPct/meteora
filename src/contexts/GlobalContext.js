import React from 'react'

export const defaultGlobalContext = {
    introductionIsDone: null,
    currentYear: { year: 2000, meteorsCount: 0 },
    currentYearIndex: 250,
    currentMonth: 1,
    meteorsByYear: {},
    availableYears: [],
    autoNavigationIsPlaying: true,
    cameraPosition: { x: 0, y: 0, z: 5 },
    update: (newCtx = null, handler = null) => {},
    loadYear: (_year = null) => {},
    moveInTimeline: (inTheFutur = true) => {},
    isAudioEnabled: false,
    playAudioFeedback: () => {}
}

export const GlobalContext = React.createContext(defaultGlobalContext)