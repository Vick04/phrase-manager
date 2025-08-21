import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import InputWithValidation from '../../src/components/InputWithValidation'

describe('InputWithValidation', () => {
    afterEach(() => {
        cleanup()
    })

    it('should allow user type words', async () => {
        const user = userEvent.setup()
        render(<InputWithValidation label="TEST" />)

        const input = screen.getByLabelText('TEST')

        render(<InputWithValidation label="TEST" />)

        await user.type(input, 'Testing')

        expect(
            screen.queryByText('Espacios no permitidos como primer caracter')
        ).toBeNull()
    })

    it('should show error when user types spacebar first', async () => {
        const user = userEvent.setup()
        render(<InputWithValidation label="TEST" />)

        const input = screen.getByLabelText('TEST')

        await user.type(input, ' ')

        screen.queryByText('Espacios no permitidos como primer caracter')
    })
})
