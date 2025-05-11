import axios from "axios";

export default async function TokenVerification(email: string, token: string) {
  try {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/users/verify";

    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
}
