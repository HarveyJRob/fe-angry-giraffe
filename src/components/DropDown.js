import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const DropDown = ({ item, items, handleItemChange }) => {
  return (
    <>
      <Select value={item} displayEmpty onChange={handleItemChange}>
        {items.map((x) => (
          <MenuItem key={x.id} value={x.id}>
            {x.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export { DropDown };
