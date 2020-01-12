import React, { useState } from 'react'
import { FaPizzaSlice } from 'react-icons/fa'
import { AddTask } from '../AddTask'

export const Header = ({ darkMode, setDarkMode }) => {
    const [shouldShowMain, setShouldShowMain] = useState(false)
    const [showQuickAddTask, setShowQuickAddTask] = useState(false)

    return (
        <header className="header" data-testid="header">
            <nav>
                <div className="logo">
                    <img src="logo.png" alt="Todoist" />
                </div>
                <div className="settings">
                    <ul>
                        <li className="settings__add">
                            <button
                                data-testid="quick-add-task-action"
                                type="button"
                                onClick={() => {
                                    setShowQuickAddTask(true)
                                    setShouldShowMain(true)
                                }}
                            >
                            +
                            </button>
                        </li>
                        <li className="settings__darkmode">
                            <button
                                data-testid="darkmode-action"
                                type="button"
                                onClick={() => setDarkMode(!darkMode)}
                            >
                                <FaPizzaSlice />
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            <AddTask
                showAddTask={false}
                shouldShowMain={shouldShowMain}
                showQuickAddTask={false}
                showAddTaskMain={setShowQuickAddTask}
            />
        </header>
    )
}
