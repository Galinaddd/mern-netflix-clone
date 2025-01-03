import React from "react";
import HomeScreen from "./HomeScreen";
import AuthScreen from "./AuthScreen";
import { use } from "react";
import { useActionData } from "react-router-dom";
import { useAuthStore } from "../../store/authUser";

const HomePage = () => {
  const { user } = useAuthStore();
  // const user = false;

  return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};

export default HomePage;
