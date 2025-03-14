import { Navigate, Route, Routes } from 'react-router'
import Table from "../Table";
import Declaration from "../Declaration";
import Test from "../Test";


const Router = () => {
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
