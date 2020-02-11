import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { Tasks } from '../components/Tasks'
import { useSelectedProjectValue } from '../context'

jest.mock('../context', () => ({
    useSelectedProjectValue: jest.fn(),
    useProjectsValue: jest.fn(() => ({
        projects: [
            {
                name: 'say AARGH',
                projectId: '1',
                userId: '1',
                docId: 'z9uTRdFaRZka4E13cIA3'
            }
        ]
    }))
}))

jest.mock('../hooks', () => ({
    useTasks: () => ({
        tasks: [
            {
                id: 'uJKjJGabkxdXYozGak2C',
                archived: false,
                date: "01-09-2020",
                projectId: '1',
                task: 'AARGH',
                userId: '1'
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

    it('renders a task with a collated title', () => {
        useSelectedProjectValue.mockImplementation(() => ({
            setSelectedProject: jest.fn(() => 'INBOX'),
            selectedProject: 'INBOX'
        }))

        const { queryByTestId } = render(<Tasks />)
        expect(queryByTestId('tasks')).toBeTruthy()
        expect(queryByTestId('project-name').textContent).toBe('Inbox')
    })

    it('does not render projects if there are no projects', () => {
        useSelectedProjectValue.mockImplementation(() => ({
            setSelectedProject: jest.fn(() => '2'),
            selectedProject: '2'
        }))

        const { queryByTestId } = render(<Tasks />)
        expect(queryByTestId('tasks')).toBeTruthy()
        expect(queryByTestId('project-name').textContent).toBe('')
    })
})
