import axios from "axios";

export default async function AuthLogin(email: string) {
  try {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/users/login/" + email;

    const response = await axios.get(url);
    console.log(response);
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
}
