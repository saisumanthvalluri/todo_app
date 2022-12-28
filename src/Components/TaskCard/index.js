import './index.css'
import {GoTag} from 'react-icons/go'
import {MdOutlineDelete, MdOutlineRestore} from 'react-icons/md'

const TaskCard = (props) => {
    const {taskData, toggleTaskStatus, deleteTask} = props
    const {id, taskname, taskdetails, priority, createdat, isCompleted, isDeleted} = taskData
    const deleteBtnClassName = isCompleted ? "delete-btn disable" : "delete-btn"
    const inputEleStyle = isDeleted ? "not-allowed" : ""

    const onToggleTaskStatus = () => {
        toggleTaskStatus(id)
    }
    const onDelTask = () => {
        deleteTask(id)
    }

    return(
        <li className='task-card' key={id}>
            <input
                className={`checkbox-ele ${inputEleStyle}`}
                type="checkbox"
                id="checkbox"
                onChange={onToggleTaskStatus}
                checked={isCompleted}
                disabled={isDeleted} />
            <div className='task-content'>
                <h5 className='created-at'>{createdat}</h5>
                <h3 className='task-name'>{taskname}</h3>
                <div className='priority-box'>
                    <GoTag className='tag-icon' />
                    <p className='priority'>{priority}</p>
                </div>
                <p className='key-points'>
                    <span className='key-points-text'>Key Points: </span> 
                    {taskdetails}
                </p>
                <button>View More</button>
            </div>
                {isCompleted ? null : (
                    <div
                        className={`${deleteBtnClassName} tooltip-del`}
                        type="button"
                        onClick={onDelTask}
                        disabled={isCompleted}>
                            {isDeleted ? (<MdOutlineRestore />) : (<MdOutlineDelete />)}
                            <span class="tooltiptext-del">{isDeleted ? "Restore" : "Delete"}</span>
                    </div>
                )}
        </li>
    )
}

export default TaskCard