import TaskCard from "../TaskCard";
import Popup from 'reactjs-popup';


const TaskCardDetaildView = () => (
    <Popup
        model
        trigger={TaskCard}>
           {close => (
                <div className="modal-container">
                    <h2 className="modal-title">
                        Add New Task
                    </h2>
                    <hr className="hr-rule" />
                    <div className="popup-content-box">
                        <img 
                            src="https://res.cloudinary.com/duzlefgz6/image/upload/v1670418322/task_lbqijz.png" 
                            alt="create task" 
                            className="create-task-img" />
                    </div>
                    <button
                        className="modal-close-btn"
                        onClick={() => {
                        close();
                        }}>
                        close
                    </button>
                </div>
            )}
    </Popup>
)

export default TaskCardDetaildView