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

export const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: "200px",
      height: "230px",
      backgroundColor: "antiquewhite",
      display: "flex",
      flexDirection: "column",
      padding: "10px",
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
  };

export const customStylesForTaskCardView = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '700px',
      height: '500px',
      transform: 'translate(-50%, -50%)',
      backgroundColor: "antiquewhite",
      display: "flex",
      flexDirection: "column",
      padding: "10px",
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
  };