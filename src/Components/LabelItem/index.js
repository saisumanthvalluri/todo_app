import {Labelitem, Logo} from './styledComponents.js'

const LabelItem = props => {
    const {labelDetails} = props
    const {labelText, id, lableLogo, labelColor} = labelDetails
    return(
        <Labelitem className='label-item' key={id}>
            <Logo color={labelColor}>{lableLogo}</Logo>
            {labelText}
        </Labelitem>
    )
}

export default LabelItem