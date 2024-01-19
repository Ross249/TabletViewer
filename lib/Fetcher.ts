import { createNavigationContainerRef } from "@react-navigation/native";
import { useAuthStore } from "../store/AuthStore";
import { router } from "expo-router";

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
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  console.log("------REQ-----");
  console.log(data);

  const headers = {
    Authorization: "Bearer " + useAuthStore.getState().token || "",
    "Content-Type": "application/json",
  };
  if (method === "PUT" || method === "POST") {
    response = await fetch(`${apiUrl}${path}`, {
      headers,
      method,
      body: JSON.stringify(data),
    });
  } else {
    response = await fetch(`${apiUrl}${path}`, {
      headers,
      method,
    });
  }
  if (response.status === 401) {
    useAuthStore.setState({ token: "" });
    throw new Error("Please Login first!");
  }
  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }
  const _json = await response.json();
  console.log(_json);
  if (_json.code === 401) {
    useAuthStore.setState({ token: "" });
    router.replace("/login");
  }
  if (_json.code !== 1) throw new Error(_json.msg);
  console.log(_json.data);
  return _json.data;
}
