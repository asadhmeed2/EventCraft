import React, { useState } from "react";

import useExtractLocations from "./hooks/useExtractLocations";
import useExtractCategories from "./hooks/useExtractCategories";
import { Select } from "../../../shared/forms/Select/Select";
import { DateInput } from "../../../shared/forms/DateInput/DateInput";




const FilterForm = ({ eventsList, onFilter }) => {

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

              <DateInput id="date"
                label="Date"
                type="date"
                value={date}
                onChange={handleDateChange} />
            </div>
          </form>
        </div>
      }
    </div>
  );
};

export default FilterForm;
