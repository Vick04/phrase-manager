import { useReducer } from 'react'

import useLocalStorage from '@/hooks/useLocalStorage'

const useListManager = <T extends { id: string }>(
    key: string,
    initialValue: T[]
) => {
    const { value, setValue } = useLocalStorage(key, initialValue)

    const initialState = value || []

    const reducer = (
        state: T[],
        action: {
            payload: T
            type: 'ADD_ITEM' | 'REMOVE_ITEM' | 'RESET'
        }
    ) => {
        let newList: T[]

        switch (action.type) {
            case 'ADD_ITEM':
                newList = [...value, action.payload]
                setValue(newList)
                return newList
            case 'REMOVE_ITEM':
                newList = state.filter((item) => item.id !== action.payload.id)
                setValue(newList)
                return newList
            case 'RESET':
                setValue(initialState)
                return initialState
            default:
                throw new Error(`Tipo de acción desconocida: ${action.type}`)
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return {
        state,
        dispatch,
    }
}

export default useListManager
