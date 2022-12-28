import './index.css'
import newTaskContext from '../../Context/newTaskContext'

const TabItem = props => {
    const {tabDetails, changeActiveTab, isActive} = props
    const {id, tabText, tabLogo} = tabDetails

    const tabClassName = isActive ? "tab-btn active" : "tab-btn"

    return (
        <newTaskContext.Consumer>
            {value => {
                const {changeTab} = value
                const onChangeActiveTab = () => {
                    changeActiveTab(id)
                    changeTab(id)
                }
                return(
                    <li className='tab-item' key={id}>
                        <button className={tabClassName} type='button' onClick={onChangeActiveTab}>
                            <div className='btn-content-box'>
                                {tabLogo}
                                {tabText}
                            </div>
                        </button>
                    </li>
                )
            }}
        </newTaskContext.Consumer>
    )
}

export default TabItem