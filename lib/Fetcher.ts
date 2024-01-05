import { createNavigationContainerRef } from "@react-navigation/native";
import { useAuthStore } from "../store/AuthStore";

const navigationRef = createNavigationContainerRef();

let AppToken = "";

const tokenSubscriber = useAuthStore.subscribe((state, prev) => {
  console.log("Token Change");

  AppToken = state.token;
});

tokenSubscriber();

// custom request
export async function Fetcher({
  method = "GET",
  path = "",
  data,
}: {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  data?: Object;
}) {
  let response;
  console.log("------REQ-----");
  console.log(process.env.API_URL + path);
  console.log(data);
  const headers = {
    Authorization: "Bearer " + AppToken || "",
    "Content-type": "application/json",
  };
  if (method === "PUT" || method === "POST") {
    response = await fetch(`${process.env.API_URL}${path}`, {
      headers,
      method,
      body: JSON.stringify(data),
    });
  } else {
    response = await fetch(`${process.env.API_URL}${path}`, {
      headers,
      method,
    });
  }

  if (response.status === 401) {
    // Toast.show("Please Login")
    throw new Error("Please Login first!");
  }
  if (response.status !== 200) {
    // console.log(await response.text());
    throw new Error("Network response was not ok");
  }
  const _json = await response.json();
  console.log("res");
  // console.log(_json);
  if (_json.code === 401) navigationRef.navigate("Auth.signin" as never);
  if (_json.code !== 200) throw new Error(_json.message);
  console.log(_json.data);
  return _json.data;
}
