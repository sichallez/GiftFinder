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
          "&.Mui-selected": { backgroundColor: "#ddcba1" },    //#f4eee0
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          "&.Mui-selected": { backgroundColor: "#ddcba1" },
        },
      },
    },
  },
});
