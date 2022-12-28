import { Component } from "react";
import newTaskContext from "../../Context/newTaskContext";
import {BsExclamationCircle, BsCheckCircle} from 'react-icons/bs'
import './index.css'

class PopupContent extends Component {
    state = {
        msg: ""
    }
    render() {
        return(
            <newTaskContext.Consumer>
                {value => {
                    const {
                        taskName, 
                        changeTask, 
                        taskDetails, 
                        changeTaskDetails, 
                        priority, 
                        changePriority, 
                        dueDate, 
                        changeDueDate,
                        createNewTask,
                        allLabels,
                    } = value

                    const changeTaskName = (e) => {
                        changeTask(e.target.value)
                    }

                    const onChangeTaskDetails = (e) => {
                        changeTaskDetails(e.target.value)
                    }

                    const onChangePriority = (e) => {
                        changePriority(e.target.value)
                    }

                    const onChangeDueDate = (e) => {
                        changeDueDate(e.target.value)
                    }

                    const onCreateNewTask = () => {
                        if (taskName === "" || taskDetails === "" || priority === "" || dueDate === "") {
                            this.setState({msg : "All fields are mandatory!"})
                        } else {
                            createNewTask()
                            this.setState({msg: "Task Added Successfully!"})
                        }
                    }
                    
                    const msgClassName = this.state.msg === 
                            "All fields are mandatory!" ? "msg error" : "msg success"
                    // console.log(allLabels)

                    return(
                        <form className="new-task-from">
                            <label 
                                className="form-label"
                                htmlFor="taskName">
                                Task Name<sup className="star">*</sup>
                            </label>
                            <input
                                value={taskName}
                                onChange={changeTaskName}
                                id="taskName"
                                type="text"
                                placeholder="Task Name"
                                className="form-input" />
                            <label
                                className="form-label"
                                htmlFor="taskDetails">
                                    Task Details<sup className="star">*</sup>
                            </label>
                            <textarea 
                                className="form-input text-area" 
                                value={taskDetails} 
                                id="taskDetails" 
                                onChange={onChangeTaskDetails} 
                                rows="4" 
                                cols="50" 
                                placeholder="Write some key points...">
                            </textarea>
                            <label 
                                className="form-label" 
                                htmlFor="priority">
                                    Priority<sup className="star">*</sup>
                            </label>
                            <select 
                                id="priority" 
                                className="form-input" 
                                value={priority} 
                                onChange={onChangePriority}>
                                    {allLabels.map((e) => (
                                        <option value={e.labelText} id={e.id} >
                                            {e.labelText}
                                        </option> 
                                    ))}
                            </select>
                            <label 
                                className="form-label" 
                                htmlFor="dueDate">
                                    Due Date<sup className="star">*</sup>
                            </label>
                            <input 
                                value={dueDate} 
                                onChange={onChangeDueDate} 
                                type="date" 
                                className="form-input" 
                                id="dueDate" />
                            <button 
                                className="create-task-btn" 
                                type="button" 
                                onClick={onCreateNewTask}>
                                    Add Task
                            </button>
                            {this.state.msg !== "" ? (
                                <div className="msg-box">
                                    {this.state.msg === "All fields are mandatory!" ? (
                                        <BsExclamationCircle className="msg-info-logo" style={{color: "red"}} />
                                    ): (
                                        <BsCheckCircle className="msg-info-logo" style={{color: "green"}} />
                                    )}
                                    
                                    <p className={msgClassName}>{this.state.msg}</p>  
                                </div> 
                            ) : null}
                        </form>
                    )
                }}
            
            </newTaskContext.Consumer>
        )
    }
}

export default PopupContent