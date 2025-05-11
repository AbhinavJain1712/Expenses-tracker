import React from "react";
import { useHistory } from "react-router-dom";
import useDateFormatter from "../../hooks/useDateFormatter";
import navigate from "../../utils/navigate";

const UserProfileContentDetails = ({ item }) => {
  const history = useHistory();
  const handleDelete = () => {
    // Navigate to delete confirmation page or perform delete action directly
    navigate(history, "delete", item);
  };
  return (
    <tr className="align-middle text-dark">
      <td className="p-6">{item?.title}</td>
      <td className="p-6">{item?.description}</td>
      <td className="p-6">{item?.amount}</td>
      <td className="p-6">{useDateFormatter(item?.createdAt)}</td>
      <td className="p-6">
        <button
          onClick={() => navigate(history, "edit", item)}
          className="badge bg-success-light text-success"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-pencil-square"
            viewBox="0 0 16 16"
          >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path
              fillRule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />
          </svg>
        </button>
        <button
            onClick={handleDelete}
            className="badge bg-danger-light text-danger"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 0a.5.5 0 0 1 .5.5V1h5V.5a.5.5 0 0 1 1 0V1h1.5a.5.5 0 0 1 0 1H1a.5.5 0 0 1 0-1H5V.5a.5.5 0 0 1 .5-.5zM3 2h10v1H3V2zm1 1h8v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3z" />
            </svg>
          </button>
      </td>
    </tr>
  );
};

export default UserProfileContentDetails;
