import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_DB_API_BASE_URL;

export const getGameById = async (id: number) => {
  try {
    const response = await axios.get(`${baseUrl}/api/games/${id}`);
    console.log("Response:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};
