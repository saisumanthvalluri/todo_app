import React from 'react'
import {GoTag} from 'react-icons/go'

const labelsList = [
  {id: "HIGH", labelText: "High", lableLogo: <GoTag />, labelColor: "#ed328f"},
  {id: "MEDIUM", labelText: "Medium", lableLogo: <GoTag />, labelColor: "#e7f551"},
  {id: "LOW", labelText: "Low", lableLogo: <GoTag />, labelColor: "#42c756"},
]

const newTaskContext = React.createContext({
  taskName: "",
  taskDetails: "",
  priority: "High",
  dueDate: "",
  activeTab: "INCOMPLETE",
  allLabels: labelsList,
  labelName: "",
  labelColor: "#c731de",
  changeTask: () => {},
  changeTaskDetails: () => {},
  changePriority: () => {},
  changeDueDate: () => {},
  createNewTask: () => {},
  changeTab: () => {},
  changeLabelInput: () => {},
  changeLabelColor: () => {},
  createNewLabel: () => {},
})

export default newTaskContext