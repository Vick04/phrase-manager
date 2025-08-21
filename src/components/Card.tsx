import { memo, useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'

import Dialog from '@components/Dialog'
import Button from '@components/Button'
import type { phrase } from '@/types/phrase'

type props = {
    phrase: phrase
    onDelete?: (item: phrase) => void
}

const Card = ({ phrase, onDelete }: props) => {
    const [open, setOpen] = useState(false)

    const { value } = phrase

    return (
        <>
            <div className="content-center rounded-2xl shadow font-bold p-6 relative w-full break-words">
                {/*DELETE BUTTON*/}
                <button
                    aria-label="delete"
                    className="cursor-pointer"
                    onClick={() => setOpen(true)}
                >
                    <TrashIcon className="absolute right-3 top-3 size-4" />
                </button>
                {/*-------------*/}
                {/*CHILDREN = CARD BODY*/}
                <p className="line-clamp-5">{value}</p>
                {/*--------------------*/}
            </div>
            {/*DELETE PHRASE DIALOG*/}
            <Dialog
                actions={
                    onDelete && (
                        <Button onClick={() => onDelete(phrase)}>Borrar</Button>
                    )
                }
                content={<span>¿Seguro que desea eliminar la frase?</span>}
                open={open}
                setOpen={setOpen}
                title="Confirmar"
            />
            {/*--------------------*/}
        </>
    )
}

export default memo(Card)
