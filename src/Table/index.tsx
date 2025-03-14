import { useEffect, useState } from "react";
import { Link } from "react-router";
import { GenerateRenderData } from "./Pagination/GenerateRenderData";
import PageNavigation from "./Pagination/PageNavigation";
import { PaginationConfig } from "./Pagination/PaginationConfig";
import convertDateFormat from "../Helpers/ConvertDateFormat";

const Table = () => {
  const [pagination, setPagination] = useState(() => PaginationConfig());
  const [renderData, setRenderData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectChange = (e: any) => {
    setPagination(() => PaginationConfig(Number(e.target.value), searchQuery));
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      // remove that item from all item in db
      let allFormData = localStorage.getItem("allFormData");
      if (allFormData) {
        let allFormDataParsed = JSON.parse(allFormData);
        let filteredData = allFormDataParsed.filter((item: any) => item.id !== id);
        localStorage.setItem("allFormData", JSON.stringify(filteredData));
      }
      // then render the new list with search query
      setPagination(() => PaginationConfig(pagination.itemPerPage, searchQuery, pagination.active));
      setRenderData(() => GenerateRenderData(pagination, searchQuery));
    } else {
      console.log("delete cancelled");
    }
  }

  useEffect(() => {
    setRenderData(() => GenerateRenderData(pagination, searchQuery));
  }, [pagination.itemPerPage, pagination.active]);

  useEffect(() => {
    setPagination(() => PaginationConfig(pagination.itemPerPage, searchQuery));
    setRenderData(() => GenerateRenderData(pagination, searchQuery));
  }, [searchQuery]);
  return (
    <>
      <header className="container-fluid">
        <div className="container">
          <div className="pt-5 mb-4 row">
            <div className="col-lg-12">
              <h1 className="fs-1 text-center">
                Vietnam Health Declaration for foreign entry
              </h1>
            </div>
          </div>
          <div className="mb-4 row">
            <div className="col-lg-4">
              <form>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search... "
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
            <div className="text-end col">
              <div className="d-flex justify-content-end">
                <Link className="btn btn-success btn-md" to="/declaration">
                  New form
                </Link>
              </div>
            </div>
          </div>
          <div className="mb-4 row">
            <div className="col-lg-12">
              <table className="table table-md table-bordered table-hover">
                <thead>
                  <tr className="table-success w-100">
                    <th className="text-center" style={{ maxWidth: "150px" }}>
                      #
                    </th>
                    <th className="" style={{ maxWidth: "150px" }}>
                      Form ID
                    </th>
                    <th className="" style={{ maxWidth: "150px" }}>
                      Full Name
                    </th>
                    <th className="" style={{ maxWidth: "150px" }}>
                      Object
                    </th>
                    <th className="" style={{ maxWidth: "150px" }}>
                      Date Of Birth
                    </th>
                    <th className="" style={{ maxWidth: "150px" }}>
                      Gender
                    </th>
                    <th className="" style={{ maxWidth: "150px" }}>
                      Contact Province
                    </th>
                  </tr>
                </thead>
                <tbody className="w-100">
                  {renderData.length > 0 ? (
                    renderData.map((item: any, index: number) => {
                      return (
                        <tr className="w-100" key={index}>
                          <td className="text-center py-3">{index + 1}</td>
                          <td className="d-flex gap-3 py-3">
                            <Link to={`/edit/${item.id}`}>
                              <i className="fa fa-edit"></i>
                            </Link>
                            <button className="btn text-danger m-0 p-0" onClick={() => handleDelete(item.id)}>
                              <i className="fa fa-trash-alt"></i>
                            </button>
                            {item.id}
                          </td>
                          <td
                            className="py-3 text-truncate"
                            style={{ maxWidth: "100px", minWidth: "100px" }}
                          >
                            {item.fullName}
                          </td>
                          <td
                            className="py-3 text-truncate"
                            style={{ maxWidth: "100px", minWidth: "100px" }}
                          >
                            {item.object}
                          </td>
                          <td
                            className="py-3 text-truncate"
                            style={{ maxWidth: "100px", minWidth: "100px" }}
                          >
                            {convertDateFormat(item.dateOfBirth)}
                          </td>
                          <td
                            className="py-3 text-truncate"
                            style={{ maxWidth: "100px", minWidth: "100px" }}
                          >
                            {item.gender}
                          </td>
                          <td
                            className="py-3 text-truncate"
                            style={{ maxWidth: "100px", minWidth: "100px" }}
                          >
                            {item.province}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="border">
                        <p className="fs-5  mb-0 text-center w-100">
                          No Declarations
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="d-flex justify-content-center align-items-center gap-3">
                <PageNavigation
                  pagination={pagination}
                  setPagination={setPagination}
                />
                <form className="d-flex align-items-center justify-content-end">
                  <select
                    className="form-select"
                    style={{ width: "5rem" }}
                    onChange={handleSelectChange}
                    value={pagination.itemPerPage}
                  >
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                  </select>
                  <label className="mx-2">Items/Page</label>
                </form>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Table;
