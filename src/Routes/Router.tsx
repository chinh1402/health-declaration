import React from "react";
import { Navigate, Route, Routes } from 'react-router'
import Table from "../Table";
import Declaration from "../Declaration";
import Test from "../Test";

type Props = {};

const Router = (props: Props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/table" />} />
        <Route path="/declaration" element={<Declaration />} />
        <Route path="/table" element={<Table />} />
        <Route path="/edit/:id" element={<Declaration />} />
        <Route path="/test" element={<Test />} />

      </Routes>
    </>
  );
};

export default Router;
