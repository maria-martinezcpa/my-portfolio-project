import { createContext, useContext } from 'react'

// True once the opening preloader has lifted, so the hero can time its entrance.
export const IntroContext = createContext(true)
export const useIntroDone = () => useContext(IntroContext)
