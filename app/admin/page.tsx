// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Button,
//   CircularProgress,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import EditNoteIcon from "@mui/icons-material/EditNote";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import AddIcon from "@mui/icons-material/Add";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// export default function AdminDashboard() {
//   const router = useRouter();
//   const [blogs, setBlogs] = useState([]);
//   const [totalBlogs, setTotalBlogs] = useState(0);
//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(6);
//   const [loading, setLoading] = useState(false);

//   const fetchBlogs = async (page: number, pageSize: number) => {
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `/api/blogs?page=${page + 1}&limit=${pageSize}`
//       );
//       const formatted = res.data.blogs.map((blog) => ({
//         id: blog._id,
//         blog_id: blog._id,
//         title: blog.title,
//         content: blog.content?.replace(/<[^>]+>/g, "").slice(0, 100),
//         image: blog.image,
//         author: blog.authorName,
//         tag: blog.tag,
//         createdAt: new Date(blog.createdAt).toLocaleString(),
//       }));
//       setBlogs(formatted);
//       setTotalBlogs(res.data.totalblogs);
//     } catch (error) {
//       console.error("Fetch error:", error);
//       alert("Failed to load blogs. Please try again later.");
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchBlogs(page, pageSize);
//   }, [page, pageSize]);

//   const handleDelete = async (id: string) => {
//     if (window.confirm("Are you sure you want to delete this blog?")) {
//       try {
//         await axios.delete(`/api/blogs/${id}`);
//         fetchBlogs(page, pageSize);
//       } catch (error) {
//         console.error("Delete error:", error);
//         alert("Error deleting blog.");
//       }
//     }
//   };

//   const handleAdd = () => {
//     router.push("/admin/add");
//   };

//   const handleEdit = (row) => {
//     router.push(`/admin/edit/${row.id}`);
//   };

//   const columns = [
//     {
//       field: "image",
//       headerName: "Image",
//       width: 100,
//       renderCell: (params) => (
//         <img
//           src={params.value}
//           alt="Blog Image"
//           style={{ width: 50, height: 50, borderRadius: 4 }}
//         />
//       ),
//     },
//     { field: "title", headerName: "Title", width: 200 },
//     { field: "content", headerName: "Content", width: 300 },
//     { field: "author", headerName: "Author", width: 150 },
//     { field: "tag", headerName: "Tag", width: 120 },
//     { field: "createdAt", headerName: "Created At", width: 180 },
//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 130,
//       sortable: false,
//       filterable: false,
//       renderCell: (params) => (
//         <>
//           <IconButton color="primary" onClick={() => handleEdit(params.row)}>
//             <EditNoteIcon />
//           </IconButton>
//           <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
//             <DeleteForeverIcon />
//           </IconButton>
//         </>
//       ),
//     },
//   ];

//   return (
//     <Box className="flex  ">
//       <Drawer
//         variant="permanent"
//         anchor="left"

//         sx={{
//           width: 240,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: {
//             width: 240,
//             boxSizing: "border-box",
//             color: "white",
//             marginTop: "64px",
//             height: "calc(100vh - 64px)",
//             bgcolor: "red",

//           },
//         }}
//       >
//         <Box
//           sx={{
//             width: 240,
//             bgcolor: "#1976d2",
//             height: "100vh",
//             color: "white",
//           }}
//         >
//           <Typography variant="h6" sx={{ p: 2, fontWeight: "bold" }}>
//             Admin Panel
//           </Typography>
//           <List>
//             <ListItem button onClick={() => router.push("/admin")}>
//               <ListItemIcon>
//                 <DashboardIcon sx={{ color: "white" }} />
//               </ListItemIcon>
//               <ListItemText primary="Dashboard" />
//             </ListItem>
//             <ListItem button onClick={handleAdd}>
//               <ListItemIcon>
//                 <AddIcon sx={{ color: "white" }} />
//               </ListItemIcon>
//               <ListItemText primary="Add Blog" />
//             </ListItem>
//           </List>
//         </Box>
//       </Drawer>

//       {/* Content */}
//       <Box className="flex-1 p-4" sx={{ ml: 30 }}>
//         <Box className="flex justify-between items-center mb-4">
//           <Typography variant="h5" fontWeight="bold">
//             Blog Management
//           </Typography>
//         </Box>

//         {loading ? (
//           <Box className="flex justify-center p-10">
//             <CircularProgress />
//           </Box>
//         ) : (
//           <DataGrid
//             rows={blogs}
//             columns={columns}
//             pagination
//             page={page}
//             pageSize={pageSize}
//             rowCount={totalBlogs}
//             paginationMode="server"
//             onPageChange={(newPage) => setPage(newPage)}
//             onPageSizeChange={(newSize) => {
//               setPageSize(newSize);
//               setPage(0);
//             }}
//             loading={loading}
//             rowsPerPageOptions={[6, 10, 20]}
//             autoHeight
//             sx={{
//               boxShadow: 2,
//               borderRadius: 2,
//               bgcolor: "background.paper",
//             }}
//           />
//         )}
//       </Box>
//     </Box>
//   );
// }

"use client";

import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AdminDashboard from "@/components/AdminDashboard";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", marginTop: "20px"  ,  }}>
      <CssBaseline />

      <Drawer variant="permanent" open={open}   sx={{bgcolor:'red'}}  >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[
            {
              marginRight: 0,
              marginTop: 2,
            },
            open && { display: "none" },
          ]}
        >
          <MenuIcon />
        </IconButton>

        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Blogs", "Add-blog",].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                        justifyContent: "initial",
                      }
                    : {
                        justifyContent: "center",
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: "auto",
                        },
                  ]}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                        justifyContent: "initial",
                      }
                    : {
                        justifyContent: "center",
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: "auto",
                        },
                  ]}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

      <AdminDashboard/>

       
      </Box>
    </Box>
  );
}
