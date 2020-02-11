import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { AddProject } from '../components/AddProject'
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
        ],
        setProjects: jest.fn()
    }))
}))

jest.mock('../firebase', () => ({
    firebase: {
        firestore: jest.fn(() => ({
            collection: jest.fn(() => ({
                add: jest.fn(() => Promise.resolve('I am resolved'))
            })),
        })),
    },
}))

beforeEach(cleanup)

describe('<AddProject />', () => {
    describe('Success', () => {
        it('renders the AddProject component', () => {
            const { queryByTestId } = render(<AddProject shouldShow />)
            expect(queryByTestId('add-project')).toBeTruthy()
        })

        it('renders the AddProject component and adds a project using onClick', () => {
            const { queryByTestId } = render(<AddProject shouldShow />)
            expect(queryByTestId('add-project')).toBeTruthy()

            fireEvent.change(queryByTestId('project-name'), {
                target: { value: 'Test project'}
            })
            expect(queryByTestId('project-name').value).toBe('Test project')
            fireEvent.click(queryByTestId('add-project-submit'))
        })

        it('renders the AddProject component and adds a project using onKeyDown', () => {
            const { queryByTestId } = render(<AddProject shouldShow />)
            expect(queryByTestId('add-project')).toBeTruthy()

            fireEvent.change(queryByTestId('project-name'), {
                target: { value: 'Test project'}
            })
            expect(queryByTestId('project-name').value).toBe('Test project')
            fireEvent.keyDown(queryByTestId('add-project-submit'))
        })

        it('hides the project overlay when cancelled with onClick', () => {
            const { queryByTestId, getByText } = render(<AddProject shouldShow />)
            expect(queryByTestId('add-project')).toBeTruthy()
            expect(queryByTestId('add-project-inner')).toBeTruthy()

            fireEvent.click(getByText('Cancel'))
            expect(queryByTestId('add-project')).toBeTruthy()
            expect(queryByTestId('add-project-inner')).toBeFalsy()
        })

        it('hides the project overlay when cancelled with onKeyDown', () => {
            const { queryByTestId, getByText } = render(<AddProject shouldShow />)
            expect(queryByTestId('add-project')).toBeTruthy()
            expect(queryByTestId('add-project-inner')).toBeTruthy()

            fireEvent.keyDown(getByText('Cancel'))
            expect(queryByTestId('add-project')).toBeTruthy()
            expect(queryByTestId('add-project-inner')).toBeFalsy()
        })

        it('hides the project overlay with onClick singular/reverse', () => {
            const { queryByTestId } = render(<AddProject shouldShow />)
            expect(queryByTestId('add-project')).toBeTruthy()
            expect(queryByTestId('add-project-inner')).toBeTruthy()

            fireEvent.click(queryByTestId('add-project-action'))
            expect(queryByTestId('add-project')).toBeTruthy()
            expect(queryByTestId('add-project-inner')).toBeFalsy()
        })

        it('hides the project overlay with onKeyDown singular/reverse', () => {
            const { queryByTestId } = render(<AddProject shouldShow />)
            expect(queryByTestId('add-project')).toBeTruthy()
            expect(queryByTestId('add-project-inner')).toBeTruthy()

            fireEvent.keyDown(queryByTestId('add-project-action'))
            expect(queryByTestId('add-project')).toBeTruthy()
            expect(queryByTestId('add-project-inner')).toBeFalsy()
        })
    })
})
