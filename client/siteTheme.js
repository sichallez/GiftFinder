import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#007BFF",
      contrastText: "#fff",
    },
    secondary: {
      main: "#0052AA",
    },
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: "#fffefa",
          marginBottom: "8px",
          "&.Mui-selected": { backgroundColor: "#f4eee0" },
        },
      },
    },
  },
});
