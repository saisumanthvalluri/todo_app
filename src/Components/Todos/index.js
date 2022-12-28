import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import Sidebar from '../Sidebar'
import newTaskContext from "../../Context/newTaskContext"
import TaskCard from '../TaskCard'
import {GoSearch, GoTag} from 'react-icons/go'
import {FiMessageSquare} from 'react-icons/fi'
import {AiOutlineBell} from 'react-icons/ai'
import {CgProfile} from 'react-icons/cg'
import {BsInfoCircle} from 'react-icons/bs'
// import {BiTaskX} from 'react-icons/bi'
// import {MdRefresh} from 'react-icons/md'
import './index.css'

const labelsList = [
    {id: "HIGH", labelText: "High", lableLogo: <GoTag />, labelColor: "#ed328f"},
    {id: "MEDIUM", labelText: "Medium", lableLogo: <GoTag />, labelColor: "#e7f551"},
    {id: "LOW", labelText: "Low", lableLogo: <GoTag />, labelColor: "#42c756"},
]

class Todos extends Component {
    state = {
        taskName: "",
        taskDetails: "",
        priority: "High",
        dueDate: "",
        allTasks: [],
        searchInput: "",
        activeTab: "INCOMPLETE",
        category : "All",
        labelName: "",
        labelColor: "#c731de",
        allLabels: labelsList,
    }
    
    changeTask = (val) => {
        this.setState({taskName: val})
    }

    changeTaskDetails = (val) => {
        this.setState({taskDetails: val})
    }

    changePriority = (val) => {
        this.setState({priority: val})
    }

    changeDueDate = (val) => {
        this.setState({dueDate: val})
    }

    updateLocalStorage = () => {
        const {allTasks} = this.state
        localStorage.setItem('allTasks', JSON.stringify(allTasks))
    }

    createNewTask = () => {
        const {taskName, taskDetails, priority, dueDate} = this.state
        const newTask = {
            id: uuidv4(),
            taskname: taskName,
            taskdetails: taskDetails,
            priority,
            duedate: dueDate,
            createdat: new Date().toLocaleString(),
            isCompleted: false,
            isDeleted: false,
        }
        // console.log(newTask)
        this.setState(prev => ({
            allTasks: [...prev.allTasks, newTask],
            taskName: "", taskDetails: "", priority: "High", dueDate: ""
        }))
        this.updateLocalStorage()
    }

    changeTab = (id) => {
        this.setState({activeTab: id})
    }

    toggleTaskStatus = (id) => {
        const {allTasks} = this.state
        for (const i of allTasks) {
            if (i.id === id) {
                i.isCompleted = !i.isCompleted
            }
        }
        this.setState({allTasks: allTasks})
    }

    getTabName = (activeTab) => {
        const completedTasks = this.getCompletedTasks()
        const inCompletedTasks = this.getIncompletedTasks()
        const deletedTasks = this.getDeletedTasks()
        const dueSoonTasks = this.getDueSoonTasks()
        const {allTasks} = this.state
        if (activeTab === "INCOMPLETE") {
            return `Incomplete Tasks (${inCompletedTasks.length} of ${allTasks.length})`
        } else if (activeTab === "COMPLETE") {
            return `Completed Tasks (${completedTasks.length} of ${allTasks.length})`
        } else if (activeTab === "DELETE") {
            return `Deleted Tasks (${deletedTasks.length} of ${allTasks.length})`
        } else if (activeTab === "DUE") {
            return `Due Soon Tasks (${dueSoonTasks.length} of ${allTasks.length})`
        } else {
            return alert("Something Went Wrong. Please try Again!")
        }
    }

    renderNoTasksView = (tab) => {
        const tabName = this.getTabName(tab)
        const tabNameParts = tabName.split('(')
        return(
            <div className='no-task-view'>
                <img
                    src="https://res.cloudinary.com/duzlefgz6/v1670909186/task-not-found-4810738-4009510_1_ky7zx4.png"
                    alt="NoTask"
                    className='no-task-img' />
                <h3 className='not-found-text'>No Tasks Found in {tabNameParts[0]}</h3>
            </div>
        )
    }

    getIncompletedTasks = () => {
        const {allTasks, searchInput, category} = this.state
        if (searchInput !== "" || category === "All") {
            const inCompleteTasks = allTasks.filter(
                each => each.isCompleted === false &&
                each.isDeleted === false &&
                each.taskname.toLocaleUpperCase().includes(searchInput.toLocaleUpperCase())
            )
            return inCompleteTasks
        } else {
            const inCompleteTasks = allTasks.filter(
                each => each.isCompleted === false && each.isDeleted === false && each.priority === category
            )
            return inCompleteTasks
        }
    }

    getCompletedTasks = () => {
        const {allTasks, searchInput, category} = this.state
        if (searchInput !== "" || category === "All") {
            const completeTasks = allTasks.filter(
                each => each.isCompleted !== false &&
                each.isDeleted === false &&
                each.taskname.toLocaleUpperCase().includes(searchInput.toLocaleUpperCase())
            )
            return completeTasks
        } else {
            const completeTasks = allTasks.filter(
                each => each.isCompleted !== false && each.isDeleted === false && each.priority === category
            )
            return completeTasks
        }
    }

    getDeletedTasks = () => {
        const {allTasks, searchInput, category} = this.state
        if (searchInput !== "" || category === "All") {
            const completeTasks = allTasks.filter(
                each => each.isDeleted === true && each.isCompleted === false &&
                each.taskname.toLocaleUpperCase().includes(searchInput.toLocaleUpperCase())
            )
            return completeTasks
        } else {
            const completeTasks = allTasks.filter(
                each => each.isDeleted === true && each.isCompleted === false &&
                each.priority === category
            )
            return completeTasks
        }
    }

    getDueSoonTasks = () => {
        const {allTasks, searchInput, category} = this.state
        const date = new Date();
        const currDate = date.toLocaleDateString('en-GB').split('/').reverse().join('-')
        if (searchInput !== "" || category === "All") {
            const dueSoonData = allTasks.filter(
                each => each.duedate === currDate && each.isCompleted === false &&
                each.isDeleted === false &&
                each.taskname.toLocaleUpperCase().includes(searchInput.toLocaleUpperCase())
            )
            return dueSoonData
        } else {
            const dueSoonData = allTasks.filter(
                each => each.duedate === currDate && each.isCompleted === false && each.isDeleted === false
                && each.priority === category
            )
            return dueSoonData
        }
    }

    deleteTask = (id) => {
        const {allTasks} = this.state
        for (const i of allTasks) {
            if (i.id === id) {
                i.isDeleted = !i.isDeleted
            }
        }
        this.setState({allTasks: allTasks})
    }

    renderRespectiveView = (tab) => {
        if (tab === "INCOMPLETE") {
            const tasksList = this.getIncompletedTasks()
            return(
                tasksList.length > 0 ? (
                    <ul className='all-task-list'>
                        {tasksList.map((e) => (
                            <TaskCard 
                                taskData={e}
                                key={e.id}
                                toggleTaskStatus={this.toggleTaskStatus}
                                deleteTask={this.deleteTask}
                            />
                        ))}
                    </ul>) :
                this.renderNoTasksView(tab)
            )
        } else if (tab === "COMPLETE") {
            const tasksList = this.getCompletedTasks()
            return(
                tasksList.length > 0 ? (
                    <ul className='all-task-list'>
                        {tasksList.map((e) => (
                            <TaskCard 
                                taskData={e}
                                key={e.id}
                                toggleTaskStatus={this.toggleTaskStatus}
                                deleteTask={this.deleteTask}
                            />
                        ))}
                    </ul>) :
                this.renderNoTasksView(tab)
            )
        } else if (tab === "DELETE") {
            const tasksList = this.getDeletedTasks()
            return(
                tasksList.length > 0 ? (
                    <ul className='all-task-list'>
                        {tasksList.map((e) => (
                            <TaskCard 
                                taskData={e}
                                key={e.id}
                                toggleTaskStatus={this.toggleTaskStatus}
                                deleteTask={this.deleteTask}
                            />
                        ))}
                    </ul>) :
                this.renderNoTasksView(tab)
            )
        } else if (tab === "DUE") {
            const tasksList = this.getDueSoonTasks()
            return(
                tasksList.length > 0 ? (
                    <ul className='all-task-list'>
                        {tasksList.map((e) => (
                            <TaskCard 
                                taskData={e}
                                key={e.id}
                                toggleTaskStatus={this.toggleTaskStatus}
                                deleteTask={this.deleteTask}
                            />
                        ))}
                    </ul>) :
                this.renderNoTasksView(tab)
            )
        }
    }

    onSearch = (e) => {
        this.setState({searchInput: e.target.value})
    }

    onChangeCategory = (e) => {
        this.setState({category: e.target.value})
    }

    onChangeLabelInput = (val) => {
        this.setState({labelName: val})
    }

    onChangeColorInput = (val) => {
        this.setState({labelColor: val})
    }

    onCreateNewLabel = () => {
        const {labelName, labelColor} = this.state
        const firLetter = labelName[0].toUpperCase()
        const labelname = firLetter + labelName.substring(1)
        const newLabel = {
            id: labelName.toUpperCase(),
            labelText: labelname,
            lableLogo: <GoTag />,
            labelColor: labelColor,
        }
        this.setState(prev => ({
            allLabels: [...prev.allLabels, newLabel]
        }))
        this.setState({id: "", labelName: "", labelColor: "#c731de"})
    }

    render() {
        const {
            taskName,
            taskDetails,
            priority,
            dueDate,
            activeTab,
            searchInput,
            category,
            labelName,
            labelColor,
            allLabels
        } = this.state
        // const dueSoonTasks = this.getDueSoonTasks()
        // console.log(dueSoonTasks.length)
        // this.updateLocalStorage()
        // console.log(allTasks)
        // const dataFromStorage = localStorage.getItem('allTasks')
        // console.log(JSON.parse(dataFromStorage))
        // const pureData = JSON.parse(dataFromStorage)
        return(
            <newTaskContext.Provider 
                value={{
                    taskName,
                    taskDetails,
                    priority,
                    dueDate,
                    activeTab,
                    labelName,
                    labelColor,
                    allLabels,
                    changeTask: this.changeTask,
                    changeTaskDetails: this.changeTaskDetails,
                    changePriority: this.changePriority,
                    changeDueDate: this.changeDueDate,
                    createNewTask: this.createNewTask,
                    changeTab: this.changeTab,
                    changeLabelInput: this.onChangeLabelInput,
                    changeLabelColor: this.onChangeColorInput,
                    createNewLabel: this.onCreateNewLabel,
                }}>
                <div className='bg-container'>
                    <div className='app-container'>
                        <div className='sidebar-box'>
                        <div className='title-box'>
                            <img 
                                src="https://res.cloudinary.com/duzlefgz6/image/upload/unnamed_mjvrzg.png" 
                                className='app-logo' 
                                alt='title-logo' 
                            />
                            <div className='app-title'>
                                <h2>ToDo</h2>
                                <h2>ToDo</h2>
                            </div>
                        </div>
                        <h5 className='welcome-msg'>Welcome to Moderen Admin Dashboard</h5>
                        <Sidebar />
                        </div>
                        <div className='all-tasks-container'>
                            <div className='search-reminder-avatar-box'>
                                <div className='search-box'>
                                    <input 
                                        value={searchInput}
                                        type="search"
                                        className='search-element'
                                        placeholder='Search here'
                                        onChange={this.onSearch} />
                                    <GoSearch className='search-icon' />
                                </div>
                                <div className='tooltip'>
                                    <button className='msg-btn' type='button'>
                                        <FiMessageSquare className='msg-icon' />
                                    </button>
                                    <span class="tooltiptext">Note</span>
                                </div>
                                <div className='tooltip'>
                                    <button className='msg-btn' type='button'>
                                        <AiOutlineBell className='msg-icon' />
                                    </button>
                                    <span class="tooltiptext">Reminder</span>
                                </div>
                                <CgProfile className='profile-img' />
                            </div>
                            <div className='category-refresh-box'>
                                <div className='category-box'>
                                <BsInfoCircle className='info-icon' />
                                <h3 className='category-type'>{this.getTabName(activeTab)}</h3>
                                </div>
                                <div className='refresh-category-box'>
                                    <h3 className='category-text'>Category</h3>
                                    <select value={category} className='category-select' onChange={this.onChangeCategory}>
                                        <option value="All" className='cat-opt'>All</option>
                                        {allLabels.map((e) => (
                                            <option value={e.labelText} className='cat-opt'>{e.labelText}</option>
                                        ))}
                                    </select>
                                    {/* <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                    </label> */}
                                    <button class="refresh-btn" type='button' onClick={this.updateLocalStorage}>
                                        <span className='text'>Refresh</span>
                                    </button>
                                </div>
                            </div>
                            <hr className='seperation-line' />
                            {this.renderRespectiveView(activeTab)}
                        </div>
                    </div>
                </div>
            </newTaskContext.Provider>
        )
    }
}

export default Todos