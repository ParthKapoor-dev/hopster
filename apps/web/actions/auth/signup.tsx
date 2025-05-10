import axios from "axios";

export default async function AuthSignup(
  email: string,
  fullname: string,
  phoneNumber: string,
) {
  try {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/users/register";
    console.log("URL is ", url);

    const response = await axios.post(
      url,
      {
        email,
        fullname,
        phoneNumber,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log(response);
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
}
