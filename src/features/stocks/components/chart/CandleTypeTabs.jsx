import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function CandleTypeTabs({value, onChange, renderButton}){
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={onChange}
        sx={{
          "& .MuiToggleButton-root": {
            px: 1.5,
            py: 0.5,
            fontSize: 15,
            fontWeight: 500,
            borderRadius: "6px",
            border: "0px solid #ddd",
            color: "black"
          },
        }}
      >
        {["day", "week", "month"].map((type) => (
          renderButton(type)
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}