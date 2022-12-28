import { Component } from "react";
import Popup from 'reactjs-popup';
import PopupContent from '../PopupContent'
import TabItem from "../TabItem";
import LabelItem from "../LabelItem";
import newTaskContext from "../../Context/newTaskContext";
import {BsExclamationCircle, BsCheckAll, BsThreeDots, BsCheckCircle} from 'react-icons/bs'
import {IoMdAddCircleOutline, IoMdClose} from 'react-icons/io'
import {RiDeleteBinLine} from 'react-icons/ri'

import 'reactjs-popup/dist/index.css';
import './index.css'

const TabsList = [
    {id: "INCOMPLETE", tabText: "Incomplete Tasks", tabLogo: <BsExclamationCircle className="tab-icons" />},
    {id: "COMPLETE", tabText: "Completed Tasks", tabLogo: <BsCheckAll className="tab-icons" />},
    {id: "DELETE", tabText: "Deleted Tasks", tabLogo: <RiDeleteBinLine className="tab-icons" />},
    {id: "DUE", tabText: "Due Soon", tabLogo: <BsThreeDots className="tab-icons" />},
]

class Sidebar extends Component {
    state = {
        activeTabId: "INCOMPLETE",
        msg: "",
    }

    changeActiveTab = (id) => {
        this.setState({activeTabId: id})
    }

    render() {
        const {activeTabId} = this.state
        return(
            <newTaskContext.Consumer>
                {value => {
                    const {createNewLabel, changeLabelInput, changeLabelColor, labelName, labelColor, allLabels} = value

                    const onChangeLabelInput = (e) => {
                        changeLabelInput(e.target.value)
                    }

                    const onChangeLabelColor = (e) => {
                        changeLabelColor(e.target.value)
                    }

                    const onCreateNewLabel = () => {
                        if (labelName === "" || labelColor === "#c731de") {
                            this.setState({msg : "All fields are mandatory!"})
                        } else {
                            createNewLabel()
                            this.setState({msg: "Label Added Successfully!"})
                        }
                    }

                    const onClearMsg = () => {
                        this.setState({msg: ""})
                    }

                    const msgClassName = this.state.msg === 
                            "All fields are mandatory!" ? "msg error" : "msg success"

                    return(
                        <div className="sidebar-container">
                            <Popup
                                className="pop-up"
                                modal
                                trigger={
                                    <button className="new-task-btn">+ New Task</button>
                                }>
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
                                                <PopupContent />
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
                            <ul className="tabs-box">
                                {TabsList.map((e) => (
                                    <TabItem 
                                        key={e.id}
                                        tabDetails={e}
                                        changeActiveTab={this.changeActiveTab}
                                        isActive={activeTabId === e.id}
                                    />
                                ))}
                            </ul>
                            <h3 className="lables-heading">Lables</h3>
                            <ul className="labels-box">
                                {allLabels.map((e) => (
                                    <LabelItem 
                                        key={e.id}
                                        labelDetails={e}
                                    />
                                ))}
                            </ul>
                            <Popup
                                className="pop-up"
                                position="right center"
                                trigger={
                                    <div className="add-label-box">
                                        <IoMdAddCircleOutline className="add-icon" />
                                        <h4 className="add-label-text" onClick={onClearMsg}>Add Label</h4>
                                    </div>
                                }>
                                    {close => (
                                        <div className="modal-container2">
                                        <IoMdClose className="close-icon" onClick={() => close()} />
                                            <form className="addlabel-color-form">
                                                <label 
                                                    className="form-label2"
                                                    htmlFor="LabelName">
                                                        Label Name<sup className="star">*</sup>
                                                </label>
                                                <input
                                                    value={labelName}
                                                    onChange={onChangeLabelInput}
                                                    id="LabelName"
                                                    type="text"
                                                    placeholder="Label Name"
                                                    className="form-input2" 
                                                /> 
                                                <label 
                                                    className="form-label2"
                                                    htmlFor="LabelColor">
                                                        Label Color<sup className="star">*</sup>
                                                </label>
                                                <input
                                                    value={labelColor}
                                                    onChange={onChangeLabelColor}
                                                    id="LabelColor"
                                                    type="color"
                                                    placeholder="Label Color"
                                                    className="form-input2 color" 
                                                /> 
                                                <button
                                                    className="add-label-btn"
                                                    type="button"
                                                    onClick={onCreateNewLabel}>
                                                        Add Label
                                                </button>
                                                {this.state.msg !== "" ? (
                                                    <div className="msg-box">
                                                        {this.state.msg === "All fields are mandatory!" ? (
                                                            <BsExclamationCircle className="msg-info-logo" style={{color: "red"}} />
                                                        ): (
                                                            <BsCheckCircle className="msg-info-logo" style={{color: "green"}} />
                                                        )}
                                                        <p className={msgClassName} style={{width:"100%", fontSize:"14px"}}>{this.state.msg}</p>  
                                                    </div> 
                                                ) : null}
                                            </form>
                                        </div>
                                    )}
                            </Popup>
                        </div>
                    )
                }}
            </newTaskContext.Consumer>
        )
    }
}

export default Sidebar