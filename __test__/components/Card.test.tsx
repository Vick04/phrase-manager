import { afterEach, describe, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Card from '../../src/components/Card'

describe('Card', () => {
    afterEach(() => {
        cleanup()
    })

    const cardValues = {
        key: `1`,
        phrase: { id: '1', value: 'TEST' },
        onDelete: () => console.log('first'),
    }

    it('should render Card component', () => {
        render(<Card {...cardValues} />)

        screen.getByText('TEST')
    })

    it('should open confirm modal', async () => {
        const user = userEvent.setup()
        render(<Card {...cardValues} />)

        await user.click(screen.getByRole('button', { name: 'delete' }))

        screen.getByText('¿Seguro que desea eliminar la frase?')
        screen.getByRole('button', { name: 'Borrar' })
    })
})
