import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";

import Box from "@mui/material/Box";

import InputBase from "@mui/material/InputBase";

import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "white",
  color: "black",
  transition: "background-color 0.3s, box-shadow 0.5s",
  boxShadow: "8px 4px 8px rgba(0, 0, 0, 0.1),-4px -2px 10px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
    boxShadow:
      "2px 10px 10px rgba(0, 0, 0, 0.2),-4px -2px 10px rgba(0, 0, 0, 0.2)",
  },

  margin: "0 auto",
  borderRadius: "50px",
  display: "flex",
  alignItems: "center",
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  borderRadius: "50px",
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  display: "flex",
  alignItems: "center",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#111",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
    },
  },
}));
export default function SearchBar({ handelSearch, handleFilter, events }) {
  const [searchTitle, setSearchTitle] = useState("");

  const handelSearchInput = (title) => {
    setSearchTitle(title);
    handelSearch(title);
  };

  return (
    <div className={'mb[2%] w-[70%]'}>
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input type="search" id="default-search" onChange={(e) => handelSearchInput(e.target.value)} class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Events..." required />
      </div>
    </div>
  );
}
