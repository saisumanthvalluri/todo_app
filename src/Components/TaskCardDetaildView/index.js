import Modal from 'react-modal';
import {Component} from 'react'
import { customStylesForTaskCardView } from '../../AppConstants/constants';
import {IoMdClose} from 'react-icons/io'
import "./index.css"
class TaskCardDetaildView extends Component {
    state = {
        modalStatus: false,
    }

    onOpenModal = () => {
        this.setState({modalStatus: true})
    }

    onCloseModel = () => {
        this.setState({modalStatus: false})
    }

    render() {
        // const {taskDetails} = this.props
        // console.log(taskDetails)
        return(
            <div className='detaild-view'>
                <button class="button" onClick={this.onOpenModal}><span>Show more </span></button>
                <Modal
                    isOpen={this.state.modalStatus}
                    style={customStylesForTaskCardView}
                    onRequestClose={this.state.modalStatus}>
                    <div className='detaild-view-modal'>
                        <IoMdClose type='button' className='close-icon' onClick={this.onCloseModel} />
                    </div>
                </Modal>
            </div>
        )
    }
}

export default TaskCardDetaildView