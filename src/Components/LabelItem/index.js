import {Component} from 'react'
import {Labelitem, Logo} from './styledComponents.js'
import Modal from 'react-modal';
import newTaskContext from '../../Context/newTaskContext.js'
import {BsCheckCircle} from 'react-icons/bs'
import {BiEdit} from 'react-icons/bi'
import {MdOutlineDelete} from 'react-icons/md'
import {IoMdClose} from 'react-icons/io'
import './index.css'
import {customStyles} from '../../AppConstants/constants'
class LabelItem extends Component {

    state={
        msg: "",
        modalIsOpen: false,
    }

    render() {
        const {labelDetails} = this.props
        const {labelText, id, lableLogo, labelColor} = labelDetails
        // const msgClassName = this.state.msg === 
        //                         "All fields are mandatory!" ? "msg error" : "msg success"

        return(
            <newTaskContext.Consumer>
                {value => {
                    const {
                        deleteLabel,
                        editLabel,
                        editLabelText,
                        setEditableLabelData,
                        editLabelColor,
                        editedLabelText,
                        editedLabelColor,
                        allTasks
                    } = value
                    
                    const onDeleteLabel = () => {
                        deleteLabel(id)
                    }

                    const onEditLabelText = (e) => {
                        editLabelText(e.target.value)
                    }

                    const onEditLabelColor = (e) => {
                        editLabelColor(e.target.value)
                    }

                    const onEditLabel = () => {
                        editLabel(id)
                        this.setState({msg: "Updated Successfully!"})
                        setTimeout( function() {
                            onClose()
                        }, 1000)
                    }

                    const onOpen = () => {
                        let counter = 0
                        for (let task of allTasks) {
                            if (task.priority === labelText) {
                                counter += 1
                            }
                        }

                        if (counter === 0) {
                            this.setState({msg: ""})
                            this.setState({modalIsOpen: true})
                            setEditableLabelData(labelDetails)
                        } else {
                            alert(`you can't Update ${labelText} label as it is exists in Tasks!`)
                        }
                    }

                    const onClose = () => {
                        this.setState({modalIsOpen: false})
                    }
                    return(
                        <Labelitem className='label-item' key={id}>
                            <div className='logo-label-box'>
                                <div className='box'>
                                    <Logo color={labelColor}>{lableLogo}</Logo>
                                    {labelText}
                                </div>
                                <div className='edit-box'>
                                    
                                    <BiEdit className='edit-icon' onClick={onOpen} />
                                    <Modal
                                        isOpen={this.state.modalIsOpen}
                                        style={customStyles}
                                        onRequestClose={this.state.modalIsOpen}
                                        ariaHideApp={false}
                                        >
                                        <div className='edit-container'>
                                            <IoMdClose onClick={onClose} className="close-icon" />
                                            <form className="editlabel-color-form" autoComplete='off'>
                                                <label 
                                                    className="form-label3"
                                                    htmlFor="LabelName">
                                                        Label Name
                                                </label>
                                                <input
                                                    value={editedLabelText}
                                                    onChange={onEditLabelText}
                                                    id="LabelName"
                                                    type="text"
                                                    placeholder="Label Name"
                                                    className="form-input3" 
                                                /> 
                                                <div className='color-box'>
                                                    <label 
                                                        className="form-label3"
                                                        htmlFor="LabelColor">
                                                            Label Color
                                                    </label>
                                                    <input
                                                        value={editedLabelColor}
                                                        onChange={onEditLabelColor}
                                                        id="LabelColor"
                                                        type="color"
                                                        placeholder="Label Color"
                                                        className="form-input3 color2" 
                                                    /> 
                                                </div>
                                                <button
                                                    className="add-label-btn"
                                                    type="button"
                                                    onClick={onEditLabel}>
                                                        Update Label
                                                </button>
                                                {this.state.msg !== "" ? (
                                                    <div className="msg-box">
                                                        <BsCheckCircle className="msg-info-logo" style={{color: "green"}} />
                                                        <p className="msg" style={{width:"100%",fontSize:"14px",color:"green"}}>
                                                            {this.state.msg}
                                                        </p>  
                                                    </div> 
                                                ) : null}
                                            </form>
                                        </div>
                                    </Modal>
                                    <MdOutlineDelete className='edit-icon' onClick={onDeleteLabel} />
                                </div>
                            </div>
                        </Labelitem>
                    )
                }}
            </newTaskContext.Consumer>
        )
    }
}

export default LabelItem