import React from 'react'
import {labelsList} from '../AppConstants/constants'


const newTaskContext = React.createContext({
  taskName: "",
  taskDetails: "",
  priority: "",
  dueDate: "",
  activeTab: "INCOMPLETE",
  allTasks: [],
  allLabels: labelsList,
  labelName: "",
  labelColor: "#c731de",
  editedLabelText: "",
  editedLabelColor: "",
  changeTask: () => {},
  changeTaskDetails: () => {},
  changePriority: () => {},
  changeDueDate: () => {},
  createNewTask: () => {},
  changeTab: () => {},
  changeLabelInput: () => {},
  changeLabelColor: () => {},
  createNewLabel: () => {},
  deleteLabel: () => {},
  editLabelText: () => {},
  editLabelColor: () => {},
  editLabel: () => {},
  setEditableLabelData: () => {},
})

export default newTaskContext