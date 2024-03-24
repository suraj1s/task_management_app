import React from 'react'
import TaskList from '~/components/task/TaskList'

interface ITasksProps {
        params: {
        category: string
        }
    }
const Tasks = ({params} : ITasksProps ) => {
  return (
    <div>
        <TaskList category={params.category} />
    </div>
  )
}

export default Tasks