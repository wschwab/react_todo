import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FaSpaceShuttle, FaSun, FaRegPaperPlane } from 'react-icons/fa'

export const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate }) => showTaskDate && (
    <div className="task-date" data-testid="task-date-overlay">
        <ul className="task-date__list">
            <li>
                <div
                    role="button"
                    onClick={() => {
                        setShowTaskDate(false)
                        setTaskDate(moment().format('DD/MM/YYYY'))
                    }}
                    onKeyDown={() => {
                        setShowTaskDate(false)
                        setTaskDate(moment().format('DD/MM/YYYY'))
                    }}
                    data-testid="task-date-today"
                    tabIndex={0}
                    aria-label="Select today as task date"
                    role="button"
                >
                    <span>
                        <FaSpaceShuttle />
                    </span>
                    <span>Today</span>
                </div>
            </li>
            <li>
                <div
                    role="button"
                    onClick={() => {
                        setShowTaskDate(false)
                        setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'))
                    }}
                    onKeyDown={() => {
                        setShowTaskDate(false)
                        setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'))
                    }}
                    data-testid="task-date-tomorrow"
                    role="button"
                    tabIndex={0}
                    aria-label="Select tomorrow as task date"
                >
                    <span>
                        <FaSun />
                    </span>
                    <span>Tomorrow</span>
                </div>
            </li>
            <li>
                <div
                    role="button"
                    onClick={() => {
                        setShowTaskDate(false)
                        setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'))
                    }}
                    onKeyDown={() => {
                        setShowTaskDate(false)
                        setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'))
                    }}
                    data-testid="task-date-next-week"
                    tabIndex={0}
                    aria-label="Select next week as task date"
                    role="button"
                >
                    <span>
                        <FaRegPaperPlane />
                    </span>
                    <span>This Week</span>
                </div>
            </li>
        </ul>
    </div>
)

TaskDate.propTypes = {
    setTaskDate: PropTypes.func.isRequired,
    showTaskDate: PropTypes.bool.isRequired,
    setShowTaskDate: PropTypes.func.isRequired
}
