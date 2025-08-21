import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useInputDebounce from '../../src/hooks/useInputDebounce'

describe('useInputDebounce', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.runOnlyPendingTimers()
        vi.useRealTimers()
    })

    it('should return initial value immediately', () => {
        const { result } = renderHook(() => useInputDebounce('initial', 500))

        expect(result.current).toBe('initial')
    })

    it('should return the same value before delay expires', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useInputDebounce(value, delay),
            {
                initialProps: { value: 'initial', delay: 500 },
            }
        )

        expect(result.current).toBe('initial')

        rerender({ value: 'updated', delay: 500 })

        expect(result.current).toBe('initial')
    })

    it('should update value after delay expires', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useInputDebounce(value, delay),
            {
                initialProps: { value: 'initial', delay: 500 },
            }
        )

        rerender({ value: 'updated', delay: 500 })

        act(() => {
            vi.advanceTimersByTime(500)
        })

        expect(result.current).toBe('updated')
    })

    it('should cancel previous timeout when value changes quickly', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useInputDebounce(value, delay),
            {
                initialProps: { value: 'initial', delay: 500 },
            }
        )

        rerender({ value: 'first', delay: 500 })

        act(() => {
            vi.advanceTimersByTime(250)
        })

        rerender({ value: 'second', delay: 500 })

        act(() => {
            vi.advanceTimersByTime(250)
        })

        expect(result.current).toBe('initial')

        act(() => {
            vi.advanceTimersByTime(250)
        })

        expect(result.current).toBe('second')
    })

    it('should work with different delay values', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useInputDebounce(value, delay),
            {
                initialProps: { value: 'initial', delay: 100 },
            }
        )

        rerender({ value: 'updated', delay: 100 })

        act(() => {
            vi.advanceTimersByTime(50)
        })

        expect(result.current).toBe('initial')

        act(() => {
            vi.advanceTimersByTime(50)
        })

        expect(result.current).toBe('updated')
    })
})
