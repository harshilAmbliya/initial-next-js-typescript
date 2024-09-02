"use client";

import DashboardMaster from "@/layout/DashboardMaster";
import { getAllUsers } from "@/store/actions/userAction";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch: AppDispatch = useDispatch();

  const users = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <>
      {/* <DashboardMaster> */}
        <pre>{JSON.stringify(users, null, 2)}</pre>
      {/* </DashboardMaster> */}
    </>
  );
}
