import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { Sidebar } from '../components/layout/Sidebar'

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

beforeEach(cleanup)

describe('<Sidebar />', () => {
    describe('Success', () => {
        it('renders the sidebar', () => {
            const { queryByTestId } = render(<Sidebar />)
            expect(queryByTestId('sidebar')).toBeTruthy()
        })

        it('changes active project to inbox in collated tasks', () => {
            const { queryByTestId } = render(<Sidebar />)
            expect(queryByTestId('sidebar')).toBeTruthy()

            fireEvent.click(queryByTestId('inbox-action'))
            fireEvent.keyDown(queryByTestId('inbox-action'))

            expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy()
            expect(queryByTestId('today').classList.contains('active')).toBeFalsy()
            expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy()
        })

        it('changes active project to today in collated tasks', () => {
            const { queryByTestId } = render(<Sidebar />)
            expect(queryByTestId('sidebar')).toBeTruthy()

            fireEvent.click(queryByTestId('today-action'))
            fireEvent.keyDown(queryByTestId('today-action'))

            expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy()
            expect(queryByTestId('today').classList.contains('active')).toBeTruthy()
            expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy()
        })

        it('changes active project to this week in collated tasks', () => {
            const { queryByTestId } = render(<Sidebar />)
            expect(queryByTestId('sidebar')).toBeTruthy()

            fireEvent.click(queryByTestId('next_7-action'))
            fireEvent.keyDown(queryByTestId('next_7-action'))

            expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy()
            expect(queryByTestId('today').classList.contains('active')).toBeFalsy()
            expect(queryByTestId('next_7').classList.contains('active')).toBeTruthy()
        })

        it('hides and shows sidebar projects using onClick', () => {
            const { queryByTestId, queryByText, getByText } = render(<Sidebar />)
            expect(queryByTestId('sidebar')).toBeTruthy()

            fireEvent.click(getByText('Projects'))
            expect(queryByText('Add Project')).toBeFalsy()

            fireEvent.click(getByText('Projects'))
            expect(queryByText('Add Project')).toBeTruthy()
        })

        it('hides and shows sidebar projects using onKeyDown', () => {
            const { queryByTestId, queryByText, getByText } = render(<Sidebar />)
            expect(queryByTestId('sidebar')).toBeTruthy()

            fireEvent.keyDown(getByText('Projects'))
            expect(queryByText('Add Project')).toBeFalsy()

            fireEvent.keyDown(getByText('Projects'))
            expect(queryByText('Add Project')).toBeTruthy()
        })
    })
})
