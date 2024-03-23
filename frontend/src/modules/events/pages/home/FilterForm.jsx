import React, { useState, useEffect } from "react";
import {
  TextField,
  
  MenuItem,
  Grid,
  Box,
  FormControl,
} from "@mui/material";
import { styled } from '@mui/system';

import useExtractLocations from "./hooks/useExtractLocations";
import useExtractCategories from "./hooks/useExtractCategories";
import { Select } from "../../../shared/forms/Select/Select";
import { DateInput } from "../../../shared/forms/DateInput/DateInput";

const StyledTextField = styled(TextField)({
  '& .MuiInputLabel-root': {
    color: 'black', // Label color
    
  },
  '& .MuiSelect-select.MuiSelect-select': {
    color: 'black', // Select input color
    backgroundColor:"#ffffffa1;"
  },
 '&& .MuiInputBase-input[type="date"]': {
    color: 'black',
    backgroundColor:"#ffffffa1;"
  }
});


const FilterForm = ({ eventsList, onFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const locations = useExtractLocations(eventsList);
  const categories = useExtractCategories(eventsList);

  const handleLocationChange = (event) => {
    const selectedLocation = event.target.value;
    setLocation(selectedLocation === "" ? "" : selectedLocation);
    onFilter({ location: selectedLocation, category, date });
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory === "" ? "" : selectedCategory);
    onFilter({ location, category: selectedCategory, date });
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setDate(selectedDate);
    onFilter({ location, category, date: new Date(selectedDate).toDateString() });
  };

  return (
    <div className="flex ">
      
      {
        <div>
          <form>
            <div className="p-2 flex">
              <div className="w-[150px]" >
                {/* <InputLabel id="demo-simple-select-label">Location</InputLabel> */}
                <Select
                  labelId="demo-simple-select-label"
                  value={location}
                  onChange={handleLocationChange}
                  label={"Location"}
                >
                  <option value="">All</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="ml-2 mr-2 w-[150px]" sx={{ ml: 2, mr: 2, width: 150 }}>
                {/* <InputLabel id="categoryLabel">Category</InputLabel> */}
                <Select
                  
                  labelId="categoryLabel"
                  value={category}
                  onChange={handleCategoryChange}
                  label="Category"
                >
                  <option value="">All</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Select>
              </div>
              {/* <StyledTextField
                id="date"
                label="Date"
                type="date"
                value={date}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
              /> */}
              <DateInput id="date"
                label="Date"
                type="date"
                value={date}
                onChange={handleDateChange}/>
            </div>
          </form>
        </div>
      }
    </div>
  );
};

export default FilterForm;
