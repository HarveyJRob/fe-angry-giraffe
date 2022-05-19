import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox({ techOptions, setFilter, filter }) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={techOptions}
      groupBy={(option) => option.cat}
      sx={{ marginLeft: "10px", marginRight: "10px", width: 200 }}
      renderInput={(params) => <TextField {...params} label="Project Filters" />}
      onChange={(e, newValue) => setFilter(newValue ? [newValue.label] : [])}
    />
  );
}
