import React, { useEffect } from 'react'
import { Checkbox } from './Checkbox'
import { useTasks } from '../hooks'
import { collatedTasks } from '../constants'
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers'
import { useSelectedProjectValue, useProjectsValue } from '../context'
import { AddTask } from './AddTask'

export const Tasks = () => {
    const { selectedProject } = useSelectedProjectValue()
    const { projects } = useProjectsValue()
    const { tasks } = useTasks(selectedProject)

    let projectName = ''

    console.log(tasks)

    if(collatedTasksExist(selectedProject) && selectedProject) {
        projectName = getCollatedTitle(collatedTasks, selectedProject).name
    }

    console.log("projectName", projectName)

    if(projects && projects.length > 0 && selectedProject && !collatedTasksExist(selectedProject)) {
        projectName = getTitle(projects, selectedProject).name
    }

    console.log("projectName", projectName)

    useEffect(() => {
        document.title = `${projectName}: Todoist`
    })

    return (
        <div className="tasks" data-testid="tasks">
            <h2 data-testid="project-name">{projectName}</h2>

            <ul className="tasks__list">
                {tasks.map(task => (
                    <li key={`${tasks.id}`}>
                        <Checkbox id={task.id} />
                        <span>{task.task}</span>
                    </li>
                ))}
            </ul>
            <AddTask />
        </div>
    )
}
