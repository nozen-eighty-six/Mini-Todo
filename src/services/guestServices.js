export const createGuestTasks = () => {
  if (JSON.parse(window.localStorage.getItem("guestTask")) == null)
    window.localStorage.setItem("guestTask", JSON.stringify([]));
};

export const getGuestTasks = () => {
  return JSON.parse(window.localStorage.getItem("guestTask"));
};

export const addGuestTask = (task) => {
  const tasks = getGuestTasks();
  tasks.push(task);
  window.localStorage.setItem("guestTask", JSON.stringify(tasks));
};

export const deleteGuestTask = (taskId) => {
  const tasks = getGuestTasks();
  const newTasks = tasks.filter((task) => task.taskId != taskId);
  window.localStorage.setItem("guestTask", JSON.stringify(newTasks));
};

/*export const updateGuestTask = (taskId) => {
  const tasks = getGuestTasks();
  const newTasks = tasks.map((el) =>
    el.taskId == taskId ? { ...el, completed: true } : el
  );
  window.localStorage.setItem("guestTask", JSON.stringify(newTasks));
};*/

export const updateGuestTasks = (taskId) => {
  const tasks = getGuestTasks();
  const index = tasks.findIndex((el) => el.taskId == taskId);

  if (index != -1) {
    console.log(index);
    console.log(tasks[index]);
    tasks[index] = { ...tasks[index], completed: true };
    //taskId[index] = { ...tasks[index], completed: true };
    window.localStorage.setItem("guestTask", JSON.stringify(tasks));
  } else {
    alert("No hay tareas");
  }
};

export const getLength = () => {
  return JSON.parse(window.localStorage.getItem("guestTask")).length;
};
