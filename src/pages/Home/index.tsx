import { useCallback, useMemo, useState } from 'react'

import Card from '@components/Card'
import Button from '@components/Button'
import useListManager from '@/hooks/useListManager'
import useInputDebounce from '@/hooks/useInputDebounce'
import InputWithValidation from '@/components/InputWithValidation'
import { INPUT_MINIMUM_LENGTH } from '@/constants'
import { v4 } from 'uuid'
import { PHRASE_LIST } from '@/constants/localStorageKeys'
import type { phrase } from '@/types/phrase'

function Home() {
    const [inputPhrase, setInputPhrase] = useState('')
    const [inputSearch, setInputSearch] = useState('')

    const { state, dispatch } = useListManager<phrase>(PHRASE_LIST, [])

    const debouncedValue = useInputDebounce(inputSearch, 500)

    const SEARCH_IS_ACTIVE = debouncedValue.length >= INPUT_MINIMUM_LENGTH

    const list = useMemo(() => {
        if (SEARCH_IS_ACTIVE) {
            return state.filter((phrase) =>
                phrase.value
                    .toLowerCase()
                    .includes(debouncedValue.toLowerCase())
            )
        } else {
            return state
        }
    }, [SEARCH_IS_ACTIVE, debouncedValue, state])

    const add = () => {
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                id: v4(),
                value: inputPhrase,
            },
        })
        setInputPhrase('')
    }

    const remove = useCallback(
        (phrase: phrase) => {
            dispatch({ type: 'REMOVE_ITEM', payload: phrase })
        },
        [dispatch]
    )

    return (
        <div className="flex flex-col gap-y-6 h-full">
            <div>
                <p className="font-bold text-3xl">Administrador de frases</p>
            </div>
            {/*ADD PHRASE INPUT + BUTTON*/}
            <div className="grid grid-cols-4 gap-3 grow-0">
                <InputWithValidation
                    label="Escribir frase"
                    onChange={(e) => setInputPhrase(e.target.value)}
                    value={inputPhrase}
                />
                <Button disabled={inputPhrase.length === 0} onClick={add}>
                    Agregar frase
                </Button>
            </div>
            {/*-------------------*/}
            {/*SEARCH PHRASE INPUT*/}
            <div className="grid gap-3 grow-0">
                <InputWithValidation
                    label="Buscar frase"
                    onChange={(e) => setInputSearch(e.target.value)}
                    type="search"
                    value={inputSearch}
                />
            </div>
            {/*-------------------*/}
            {/*CONDITIONAL RENDERING SECTION: SHOWS EMPTY MESSAGE, FULL LIST OR FILTERED LIST*/}
            {!SEARCH_IS_ACTIVE && list.length === 0 && (
                <h1>No hay frases disponibles</h1>
            )}
            {SEARCH_IS_ACTIVE && list.length === 0 && (
                <h1>No se encontraron coincidencias</h1>
            )}
            <div className="grow">
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 py-4">
                    {list.map((phrase) => (
                        <Card
                            key={`${phrase.id}`}
                            phrase={phrase}
                            onDelete={remove}
                        />
                    ))}
                </div>
            </div>
            {/* ------------------------------------------------------------------------------ */}
        </div>
    )
}

export default Home
