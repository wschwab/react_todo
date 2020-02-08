import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { IndividualProject } from '../components/IndividualProject'

beforeEach(cleanup)

jest.mock('../firebase', () => ({
    firebase: {
        firestore: jest.fn(() => ({
            collection: jest.fn(() => ({
                doc: jest.fn(() => ({
                    delete: jest.fn(() => Promise.resolve('Never mock Firebase, but I did anyway')),
                    update: jest.fn()
                })),
            })),
        })),
    },
}))

jest.mock('../context', () => ({
    useSelectedProjectValue: jest.fn(() => ({
        setSelectedProject: jest.fn(() => 'INBOX')
    })),
    useProjectsValue: jest.fn(() => ({
        setProjects: jest.fn(),
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

describe('<IndividualProject />', () => {
    const project = {
        name: 'say AARGH',
        projectId: '1',
        userId: '1',
        docId: 'z9uTRdFaRZka4E13cIA3'
    }

    describe('Success', () => {
        it('renders the project', () => {
            const { getByText } = render(<IndividualProject project={project} />)
            expect(getByText('say AARGH')).toBeTruthy()
        })

        it('renders the delete overlay and deletes using onClick', () => {
            const { queryByTestId, getByText } = render(<IndividualProject project={project} />)

            fireEvent.click(queryByTestId('delete-project'))
            expect(getByText('Are you sure you want to delete this project?')).toBeTruthy()

            fireEvent.click(getByText('Delete'))
        })

        it('renders the delete overlay and deletes using onKeyDown', () => {
            const { queryByTestId, getByText } = render(<IndividualProject project={project} />)

            fireEvent.keyDown(queryByTestId('delete-project'))
            expect(getByText('Are you sure you want to delete this project?')).toBeTruthy()

            fireEvent.keyDown(getByText('Delete'))
        })

        it('renders the delete overlay and cancels using onClick', () => {
            const { queryByTestId, getByText } = render(<IndividualProject project={project} />)

            fireEvent.click(queryByTestId('delete-project'))
            expect(getByText('Are you sure you want to delete this project?')).toBeTruthy()

            fireEvent.click(getByText('Cancel'))
        })

        it('renders the delete overlay and cancels using onKeyDown', () => {
            const { queryByTestId, getByText } = render(<IndividualProject project={project} />)

            fireEvent.keyDown(queryByTestId('delete-project'))
            expect(getByText('Are you sure you want to delete this project?')).toBeTruthy()

            fireEvent.keyDown(getByText('Cancel'))
        })
    })
})
