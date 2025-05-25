import axios from "axios";

export default async function GetUser() {
  try {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/users";

    const response = await axios.get(url, {
      withCredentials: true,
    });
    console.log(response);
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
}
