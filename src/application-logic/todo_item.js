function TodoItem(
  title,
  description,
  dueDate,
  priority,
  note,
  checkList = false
) {
  // Assuming the variables title, description, dueDate, priority, note, checkList are defined
  let _title = title;
  let _description = description;
  let _dueDate = dueDate;
  let _priority = priority;
  let _note = note;
  let _checkList = checkList;

  // Getter functions
  function getTitle() {
    return _title;
  }

  function getDescription() {
    return _description;
  }

  function getDueDate() {
    return _dueDate;
  }

  function getPriority() {
    return _priority;
  }

  function getNote() {
    return _note;
  }

  function getChecklist() {
    return _checkList;
  }

  // Setter functions
  function setTitle(newTitle) {
    _title = newTitle;
  }

  function setDescription(newDescription) {
    _description = newDescription;
  }

  function setDueDate(newDueDate) {
    _dueDate = newDueDate;
  }

  function setPriority(newPriority) {
    _priority = newPriority;
  }

  function setNote(newNote) {
    _note = newNote;
  }

  function setChecklist(newCheckList) {
    _checkList = newCheckList;
  }

  // Method to mark the item as complete
  function markAsComplete() {
    _checkList = true;
  }
  return {
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    getNote,
    getChecklist,
    setTitle,
    setDescription,
    setDueDate,
    setPriority,
    setNote,
    setChecklist,
    markAsComplete,
  };
}

export default TodoItem;
