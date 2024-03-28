import apiService from "../apiService";

export const postTaskApi = async (taskData) => {
  try {
    const data = await apiService.post("/task", taskData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTasksApi = async (id) => {
  try {
    const data = await apiService.get(`/tasks/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getMyTasksApi = async (id) => {
  try {
    const data = await apiService.get(`/mytasks/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTaskApi = async (id) => {
  try {
    const data = await apiService.delete(`/task/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateTaskApi = async (id, taskData) => {
  try {
    const data = await apiService.put(`/task/${id}`, taskData);
    return data;
  } catch (error) {
    console.log(error);
  }
};
