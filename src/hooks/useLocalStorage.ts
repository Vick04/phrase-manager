import { useState, useCallback } from 'react'

interface UseLocalStorageOptions<T> {
    serialize?: (value: T) => string
    deserialize?: (value: string) => T
}

interface UseLocalStorageReturn<T> {
    value: T
    setValue: (value: T) => void
    removeValue: () => void
    error: Error | null
}

const useLocalStorage = <T>(
    key: string,
    initialValue: T,
    options?: UseLocalStorageOptions<T>
): UseLocalStorageReturn<T> => {
    const { serialize = JSON.stringify, deserialize = JSON.parse } =
        options || {}

    const [error, setError] = useState<Error | null>(null)

    const getInitialValue = useCallback((): T => {
        try {
            if (typeof window === 'undefined') {
                return initialValue
            }

            const item = window.localStorage.getItem(key)

            if (item === null) {
                return initialValue
            }

            return deserialize(item)
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error)
            setError(error as Error)
            return initialValue
        }
    }, [key, initialValue, deserialize])

    const [storedValue, setStoredValue] = useState<T>(getInitialValue)

    const setValue = useCallback(
        (value: T) => {
            try {
                setError(null)

                const valueToStore =
                    value instanceof Function ? value(storedValue) : value

                setStoredValue(valueToStore)

                if (typeof window !== 'undefined') {
                    window.localStorage.setItem(key, serialize(valueToStore))
                }
            } catch (error) {
                console.warn(`Error setting localStorage key "${key}":`, error)
                setError(error as Error)
            }
        },
        [key, storedValue, serialize]
    )

    const removeValue = useCallback(() => {
        try {
            setError(null)
            setStoredValue(initialValue)

            if (typeof window !== 'undefined') {
                window.localStorage.removeItem(key)
            }
        } catch (error) {
            console.warn(`Error removing localStorage key "${key}":`, error)
            setError(error as Error)
        }
    }, [key, initialValue])

    return {
        value: storedValue,
        setValue,
        removeValue,
        error,
    }
}

export default useLocalStorage
