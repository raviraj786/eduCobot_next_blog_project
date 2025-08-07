// "use client";

// import * as React from "react";
// import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
// import {
//   Box,
//   CssBaseline,
//   Typography,
//   Divider,
//   IconButton,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar from "@mui/material/AppBar";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
// import AdminDashboard from "@/components/AdminDashboard";
// import { useRouter, usePathname } from "next/navigation";

// const drawerWidth = 240;

// const openedMixin = (theme: Theme): CSSObject => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme: Theme): CSSObject => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

// export default function MiniDrawer() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//   const router = useRouter();
//   const pathname = usePathname();

//   const handleDrawerOpen = () => setOpen(true);
//   const handleDrawerClose = () => setOpen(false);

//   const menuItems = [
//     { text: "Blogs", path: "/admin", icon: <InboxIcon /> },
//     { text: "Add Blog", path: "/admin/add", icon: <MailIcon /> },
//   ];

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />

//       <Drawer variant="permanent" open={open}   PaperProps={{
//     sx: {
//       bgcolor: "#162556",
//       color: "white",
//     },
//   }}>

//         {!open && (
//           <IconButton
//             onClick={handleDrawerOpen}
//             sx={{ m: 1, justifyContent: "center"  , color: "white", }}
//           >
//             <MenuIcon />
//           </IconButton>
//         )}

//         {open && (
//           <DrawerHeader>
//             <IconButton onClick={handleDrawerClose}  sx={{color: "white"}} >
//               {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//             </IconButton>
//           </DrawerHeader>
//         )}
//         <Divider />

//         <List>
//           {menuItems.map(({ text, path, icon }) => (
//             <ListItem key={text} disablePadding sx={{ display: "block" }}>
//               <ListItemButton
//                 onClick={() => router.push(path)}
//                 sx={{
//                   minHeight: 48,
//                   justifyContent: open ? "initial" : "center",
//                   px: 2.5,
//                   backgroundColor: pathname === path ? "rgba(25, 118, 210, 0.1)" : "transparent",
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : "auto",
//                     justifyContent: "center",
//                   }}
//                 >
//                   {icon}
//                 </ListItemIcon>
//                 <ListItemText
//                   primary={text}
//                   sx={{ opacity: open ? 1 : 0 }}
//                 />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>

//       <Box component="main" sx={{ flexGrow: 1, p: 3  }}>

//         <Box sx={{ mb: 2   }}>
//            <Typography variant="h4" gutterBottom fontWeight={600}>
//           Admin Dashboard
//         </Typography>
//           <button
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//             onClick={() => router.push("/admin/add")}
//           >
//             Add Blog
//           </button>
//         </Box>

//         <AdminDashboard />
//       </Box>
//     </Box>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard";
import { CircularProgress, Box, Typography, Alert } from "@mui/material";

export default function AdminPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h5">Admin Dashboard</Typography>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          onClick={() => router.push("/admin/add")}
        >
          Add Blog
        </button>
      </div>

    
      <AdminDashboard />
    </div>
  );
}
