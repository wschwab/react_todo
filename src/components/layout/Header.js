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
                        <li className="settings__add"
                            data-testid="quick-add-task-action"
                            onClick={() => {
                                setShowQuickAddTask(true)
                                setShouldShowMain(true)
                            }}
                        >
                        +
                        </li>
                        <li className="settings__darkmode"
                            data-testid="darkmode-action"
                            onClick={() => setDarkMode(!darkMode)}
                        >
                            <FaPizzaSlice />
                        </li>
                    </ul>
                </div>
            </nav>

            <AddTask
                showAddTaskMain={false}
                shouldShowMain={shouldShowMain}
                showQuickAddTask={showQuickAddTask}
                setShowQuickAddTask={setShowQuickAddTask}
            />
        </header>
    )
}


// <button
//     data-testid="quick-add-task-action"
//     type="button"
//     onClick={() => {
//         setShowQuickAddTask(true)
//         setShouldShowMain(true)
//     }}
// >
// </button>
// <button
//     data-testid="darkmode-action"
//     type="button"
//     onClick={() => setDarkMode(!darkMode)}
// >
// </button>
