import {GoTag} from 'react-icons/go'
import {v4 as uuidv4} from 'uuid'
import {BsExclamationCircle, BsCheckAll, BsThreeDots} from 'react-icons/bs'
import {RiDeleteBinLine} from 'react-icons/ri'

export const labelsList = [
    {id: uuidv4(), labelText: "High", lableLogo: <GoTag />, labelColor: "#ed328f"},
    {id: uuidv4(), labelText: "Medium", lableLogo: <GoTag />, labelColor: "#e7f551"},
    {id: uuidv4(), labelText: "Low", lableLogo: <GoTag />, labelColor: "#42c756"},
]

export const TabsList = [
    {id: "INCOMPLETE", tabText: "Incomplete Tasks", tabLogo: <BsExclamationCircle className="tab-icons" />},
    {id: "COMPLETE", tabText: "Completed Tasks", tabLogo: <BsCheckAll className="tab-icons" />},
    {id: "DELETE", tabText: "Deleted Tasks", tabLogo: <RiDeleteBinLine className="tab-icons" />},
    {id: "DUE", tabText: "Due Soon", tabLogo: <BsThreeDots className="tab-icons" />},
]