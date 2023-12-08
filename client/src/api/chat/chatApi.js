import apiService from "../apiService";

export const fetchChatHistoryApi = async (senderId, receiverId) => {
  try {
    const { data } = await apiService.get(
      `/chat-history/${senderId}/${receiverId}`
    );
    return { data };
  } catch (error) {
    console.log(error);
  }
};
