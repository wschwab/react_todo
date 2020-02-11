import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { Header } from '../components/layout/Header'

jest.mock('../context', () => ({
    useSelectedProjectValue: jest.fn(() => ({ selectedProject: '1' })),
    useProjectsValue: jest.fn(() => ({ projects: [] }))
}))

beforeEach(cleanup)

describe('<Header />', () => {
    describe('Success', () => {
        const { queryByTestId } = render(<Header />)
        expect(queryByTestId('header')).toBeTruthy()
    })

    it('renders the header and activates dark mode using onClick', () => {
        const darkMode = false
        const setDarkMode = jest.fn(() => !darkMode)

        const { queryByTestId } = render(
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        )
        expect(queryByTestId('header')).toBeTruthy()

        fireEvent.click(queryByTestId('darkmode-action'))
        expect(setDarkMode).toHaveBeenCalledWith(true)
    })

    it('renders the header and activates dark mode using onKeyDown', () => {
        const darkMode = false
        const setDarkMode = jest.fn(() => !darkMode)

        const { queryByTestId } = render(
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        )
        expect(queryByTestId('header')).toBeTruthy()

        fireEvent.keyDown(queryByTestId('darkmode-action'))
        expect(setDarkMode).toHaveBeenCalledWith(true)
    })

    it('renders the header and activates sets quickAddTask to true using onClick', () => {
        const darkMode = false

        const { queryByTestId } = render(<Header darkMode={darkMode} />)
        expect(queryByTestId('header')).toBeTruthy()

        fireEvent.click(queryByTestId('quick-add-task-action'))
        expect(queryByTestId('add-task-main')).toBeTruthy()
    })

    it('renders the header and activates sets quickAddTask to true using onKeyDown', () => {
        const darkMode = false

        const { queryByTestId } = render(<Header darkMode={darkMode} />)
        expect(queryByTestId('header')).toBeTruthy()

        fireEvent.keyDown(queryByTestId('quick-add-task-action'))
        expect(queryByTestId('add-task-main')).toBeTruthy()
    })

    it('renders the header and activates sets quickAddTask to true then false using onClick', () => {
        const darkMode = false

        const { queryByTestId } = render(<Header darkMode={darkMode} />)
        expect(queryByTestId('header')).toBeTruthy()

        fireEvent.click(queryByTestId('quick-add-task-action'))
        expect(queryByTestId('add-task-main')).toBeTruthy()

        fireEvent.click(queryByTestId('add-task-quick-cancel'))
        expect(queryByTestId('add-task-main')).toBeFalsy()
    })

    it('renders the header and activates sets quickAddTask to true then false using onKeyDown', () => {
        const darkMode = false

        const { queryByTestId } = render(<Header darkMode={darkMode} />)
        expect(queryByTestId('header')).toBeTruthy()

        fireEvent.keyDown(queryByTestId('quick-add-task-action'))
        expect(queryByTestId('add-task-main')).toBeTruthy()

        fireEvent.keyDown(queryByTestId('add-task-quick-cancel'))
        expect(queryByTestId('add-task-main')).toBeFalsy()
    })
})
