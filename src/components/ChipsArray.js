// React
import React from "react";

// MUI
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

export default function ChipArray({ input }) {
  return (
    <>
      {input.length > 0 && (
        <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
          {input.map((data) => {
            return <Chip key={data} label={data} />;
          })}
        </Stack>
      )}
    </>
  );
}
