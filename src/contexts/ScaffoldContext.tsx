import { createContext, ReactElement, useContext, useEffect, useState } from "react";

type ContextProps = {
    size: number
    toggleSideNav: () => void
    isOpen: boolean
    useBackDrop: boolean
}

type Props = {
    children: ReactElement
}

const ScaffoldContext = createContext({} as ContextProps)

export function ScaffoldProvider({ children }: Props) {
    const [isOpen, setIsOpen] = useState(true)
    const [useBackDrop, setUseBackdrop] = useState(false)
    const [size, setSize] = useState(0)

    const getIsUseBackdrop = () => {
        if (size <= 769) {
            setUseBackdrop(true)
        } else {
            setUseBackdrop(false)
        }
    }

    function toggleSideNav() {
        getIsUseBackdrop()
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => {
                const width = window.innerWidth
                setSize(width)

                if (width <= 769) {
                    toggleSideNav()
                }
            }
        );
    }, []);

    useEffect(() => {
        setSize(window.innerWidth)
    }, [])

    return (
        <ScaffoldContext.Provider
            value={{
                size,
                toggleSideNav,
                isOpen,
                useBackDrop
            }}
        >
            {children}
        </ScaffoldContext.Provider>
    )
}

export function useScaffold() {
    return useContext(ScaffoldContext)
}