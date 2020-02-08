import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { Tasks } from '../components/Tasks'
import { useProjectsValue } from '../context'

jest.mock('../context', () => ({
    useSelectedProjectValue: jest.fn(),
    useProjectsValue: jest.fn(() => ({

    }))
}))

jest.mock('../hooks', () => ({
    useTasks: () => ({
        tasks: [
            {

            }
        ]
    })
}))

beforeEach(cleanup)

describe('<Tasks />', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('renders tasks', () => {
        useSelectedProjectValue.mockImplementation(() => ({
            setSelectedProject: jest.fn(() => 'INBOX'),
            selectedProject: 'INBOX'
        }))

        const { queryByTestId } = render(<Tasks />)
        expect(queryByTestId('tasks')).toBeTruthy()
        expect(queryByTestId('project-name').textContent).toBe('Inbox')
    })

    it('renders a task with a project title', () => {
        useSelectedProjectValue.mockImplementation(() => ({
            setSelectedProject: jest.fn(() => '1'),
            selectedProject: '1'
        }))

        const { queryByTestId } = render(<Tasks />)
        expect(queryByTestId('tasks')).toBeTruthy()
        expect(queryByTestId('project-name').textContent).toBe('say AARGH')
    })
})
