import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { Context } from "../store/appContext";

export const Private = (props) => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.private();
  }, [actions.private]);
  return <h1> {"SE LOGRO"}</h1>;
};
