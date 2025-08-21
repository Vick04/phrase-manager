import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Home from '../../src/pages/Home'

const PHRASE_1 =
    'Lorem ipsum dolor sit amet consectetur adipiscing elit pretium'
const PHRASE_2 = 'eget inceptos eleifend fames dignissim eros porta euismod'

describe('App component', () => {
    afterEach(() => {
        cleanup()
    })

    it('should render App component with', () => {
        render(<Home />)

        screen.getByText('Administrador de frases')
        screen.getByRole('button', { name: 'Agregar frase' })
        screen.getByLabelText('Escribir frase')
        screen.getByLabelText('Buscar frase')
    })

    it('should have add button disabled', () => {
        render(<Home />)

        const addButton = screen.getByRole('button', { name: 'Agregar frase' })

        expect(addButton).toHaveProperty('disabled', true)
    })

    it('should enable add button when user types on add input', async () => {
        const user = userEvent.setup()
        render(<Home />)

        const addButton = screen.getByRole('button', { name: 'Agregar frase' })
        const addInput = screen.getByLabelText('Escribir frase')

        await user.type(addInput, 'Test')

        expect(addButton).toHaveProperty('disabled', false)
    })

    it('should add and delete cards', async () => {
        const user = userEvent.setup()
        render(<Home />)

        const addButton = screen.getByRole('button', { name: 'Agregar frase' })
        const addInput = screen.getByLabelText('Escribir frase')

        await user.type(addInput, PHRASE_1)

        await user.click(addButton)

        screen.getByText(PHRASE_1)

        await user.type(addInput, PHRASE_2)

        await user.click(addButton)

        expect(
            screen.getAllByRole('button', { name: 'delete' }).length
        ).toEqual(2)

        await user.click(screen.getAllByRole('button', { name: 'delete' })[0])

        await user.click(screen.getByRole('button', { name: 'Borrar' }))

        waitFor(() =>
            expect(
                screen.getAllByRole('button', { name: 'delete' }).length
            ).toEqual(1)
        )
    })

    it('should filter cards when search input length is higher than 3', async () => {
        const user = userEvent.setup()
        render(<Home />)

        const addButton = screen.getByRole('button', { name: 'Agregar frase' })
        const addInput = screen.getByLabelText('Escribir frase')
        const searchInput = screen.getByLabelText('Buscar frase')

        await user.type(addInput, PHRASE_1)

        await user.click(addButton)

        screen.getByText(PHRASE_1)

        await user.type(addInput, PHRASE_2)

        await user.click(addButton)

        await user.type(searchInput, 'L')
        waitFor(() =>
            expect(
                screen.getAllByRole('button', { name: 'delete' }).length
            ).toEqual(2)
        )

        await user.type(searchInput, 'Lo')
        waitFor(() =>
            expect(
                screen.getAllByRole('button', { name: 'delete' }).length
            ).toEqual(2)
        )

        await user.type(searchInput, 'Lor')
        waitFor(() =>
            expect(
                screen.getAllByRole('button', { name: 'delete' }).length
            ).toEqual(1)
        )

        screen.getByText(PHRASE_1)
    })
})
