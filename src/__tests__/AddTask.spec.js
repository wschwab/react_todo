import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { AddTask } from '../components/AddTask'
import { useSelectedProjectValue } from '../context'

beforeEach(cleanup)

jest.mock('../context', () => ({
    useSelectedProjectValue: jest.fn(() => ({ selectedProject: '1' })),
    useProjectsValue: jest.fn(() => ({ projects: [] }))
}))

jest.mock('../firebase', () => ({
    firebase: {
        firestore: jest.fn(() => ({
            collection: jest.fn(() => ({
                add: jest.fn(() => Promise.resolve('Never mock firebase'))
            }))
        }))
    }
}))

describe('<AddTask />', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('Success', () => {
        it('renders the AddTask component', () => {
            const { queryByTestId } = render(<AddTask />)
            expect(queryByTestId('add-task-comp')).toBeTruthy()
        })

        it('renders the AddTask quick overlay', () => {
            const setShowQuickAddTask = jest.fn()

            const { queryByTestId } = render(
                <AddTask
                    showAddTaskMain
                    shouldShowMain={false}
                    showQuickAddTask
                    setShowQuickAddTask={setShowQuickAddTask}
                />
            )
            expect(queryByTestId('quick-add-task')).toBeTruthy()
        })

        it('renders the AddTask main window when clicked', () => {
            const { queryByTestId } = render(<AddTask showAddTaskMain />)
            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy()
        })

        it('renders the AddTask main window using onKeyDown', () => {
            const { queryByTestId } = render(<AddTask showAddTaskMain />)
            fireEvent.keyDown(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy()
        })

        it('renders the AddTask project overlay when clicked', () => {
            const { queryByTestId } = render(<AddTask showAddTaskMain />)
            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.click(queryByTestId('show-project-overlay'))
            expect(queryByTestId('project-overlay')).toBeTruthy()
        })

        it('renders the AddTask project overlay using onKeyDown', () => {
            const { queryByTestId } = render(<AddTask showAddTaskMain />)
            fireEvent.keyDown(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.keyDown(queryByTestId('show-project-overlay'))
            expect(queryByTestId('project-overlay')).toBeTruthy()
        })

        it('renders the AddTask date overlay when clicked', () => {
            const { queryByTestId } = render(<AddTask showAddTaskMain />)
            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.click(queryByTestId('show-task-date-overlay'))
            expect(queryByTestId('task-date-overlay')).toBeTruthy()
        })

        it('renders the AddTask date overlay using onKeyDown', () => {
            const { queryByTestId } = render(<AddTask showAddTaskMain />)
            fireEvent.keyDown(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.keyDown(queryByTestId('show-task-date-overlay'))
            expect(queryByTestId('task-date-overlay')).toBeTruthy()
        })

        it('hides AddTask after clicking cancel', () => {
            const { queryByTestId } = render(<AddTask showAddTaskMain />)
            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.click(queryByTestId('add-task-main-cancel'))
            expect(queryByTestId('add-task-main')).toBeFalsy()
        })

        it('hides AddTask after using onKeyDown to cancel', () => {
            const { queryByTestId } = render(<AddTask showAddTaskMain />)
            fireEvent.keyDown(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.keyDown(queryByTestId('add-task-main-cancel'))
            expect(queryByTestId('add-task-main')).toBeFalsy()
        })

        it('renders AddTask (quick add) and clicks cancel', () => {
            const showQuickAddTask = true
            const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
            const { queryByTestId } = render(
                <AddTask
                    setShowQuickAddTask={setShowQuickAddTask}
                    showQuickAddTask
                />
            )

            expect(queryByTestId('add-task-main')).toBeTruthy()
            fireEvent.click(queryByTestId('add-task-quick-cancel'))
            expect(setShowQuickAddTask).toHaveBeenCalled()
        })

        it('renders AddTask (quick add) and uses onKeyDown to cancel', () => {
            const showQuickAddTask = true
            const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
            const { queryByTestId } = render(
                <AddTask
                    setShowQuickAddTask={setShowQuickAddTask}
                    showQuickAddTask
                />
            )

            expect(queryByTestId('add-task-main')).toBeTruthy()
            fireEvent.keyDown(queryByTestId('add-task-quick-cancel'))
            expect(setShowQuickAddTask).toHaveBeenCalled()
        })

        it('renders AddTask, adds task to Today', () => {
            useSelectedProjectValue.mockImplementation(() => ({
                selectedProject: 'TODAY'
            }))

            const showQuickAddTask = true
            const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
            const { queryByTestId } = render(
                <AddTask
                    showQuickAddTask={showQuickAddTask}
                    setShowQuickAddTask={setShowQuickAddTask}
                />
            )
            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-content')).toBeTruthy()

            fireEvent.change(queryByTestId('add-task-content'), {
                target: { value: 'new test task'}
            })
            expect(queryByTestId('add-task-content').value).toBe(
                'new test task'
            )

            fireEvent.click(queryByTestId('add-task'))
            expect(setShowQuickAddTask).toHaveBeenCalled()
        })

        it('renders AddTask, adds task to Next 7', () => {
            useSelectedProjectValue.mockImplementation(() => ({
                selectedProject: 'NEXT_7'
            }))

            const showQuickAddTask = true
            const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
            const { queryByTestId } = render(
                <AddTask
                    showQuickAddTask={showQuickAddTask}
                    setShowQuickAddTask={setShowQuickAddTask}
                />
            )
            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-content')).toBeTruthy()
            fireEvent.change(queryByTestId('add-task-content'), {
                target: { value: 'new test task'}
            })
            expect(queryByTestId('add-task-content').value).toBe(
                'new test task'
            )

            fireEvent.click(queryByTestId('add-task'))
            expect(setShowQuickAddTask).toHaveBeenCalled()
        })

        it('renders AddTask, adds task into Today', () => {
            useSelectedProjectValue.mockImplementation(() => ({
                selectedProject: '1'
            }))

            const {queryByTestId} = render(<AddTask showMain />)
            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-content')).toBeTruthy()
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.change(queryByTestId('add-task-content'), {
                target: { value: 'new test task'}
            })
            expect(queryByTestId('add-task-content').value).toBe(
                'new test task'
            )

            fireEvent.click(queryByTestId('show-task-date-overlay'))
            expect(queryByTestId('task-date-overlay')).toBeTruthy()

            fireEvent.click(queryByTestId('task-date-today'))
            expect(queryByTestId('task-date-overlay')).toBeFalsy()

            fireEvent.click(queryByTestId('add-task'))
        })

        it('renders AddTask, adds task into Tomorrow', () => {
            useSelectedProjectValue.mockImplementation(() => ({
                selectedProject: '1'
            }))

            const {queryByTestId} = render(<AddTask showMain />)
            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-content')).toBeTruthy()
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.change(queryByTestId('add-task-content'), {
                target: { value: 'new test task'}
            })
            expect(queryByTestId('add-task-content').value).toBe(
                'new test task'
            )

            fireEvent.click(queryByTestId('show-task-date-overlay'))
            expect(queryByTestId('task-date-overlay')).toBeTruthy()

            fireEvent.click(queryByTestId('task-date-tomorrow'))
            expect(queryByTestId('task-date-overlay')).toBeFalsy()

            fireEvent.click(queryByTestId('add-task'))
        })

        it('renders AddTask, adds task into This Week', () => {
            useSelectedProjectValue.mockImplementation(() => ({
                selectedProject: '1'
            }))

            const { queryByTestId } = render(<AddTask showMain />)
            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-content')).toBeTruthy()
            expect(queryByTestId('add-task-main')).toBeTruthy()

            fireEvent.change(queryByTestId('add-task-content'), {
                target: { value: 'new test task'}
            })
            expect(queryByTestId('add-task-content').value).toBe(
                'new test task'
            )

            fireEvent.click(queryByTestId('show-task-date-overlay'))
            expect(queryByTestId('task-date-overlay')).toBeTruthy()

            fireEvent.click(queryByTestId('task-date-next-week'))
            expect(queryByTestId('task-date-overlay')).toBeFalsy()

            fireEvent.click(queryByTestId('add-task'))
        })
    })
})
