import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PeopleIcon from "@mui/icons-material/People";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import StoreIcon from "@mui/icons-material/Store";
import PaymentIcon from "@mui/icons-material/Payment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MenuIcon from "@mui/icons-material/Menu";
import {
  getTickets,
  getClients,
  getLeads,
  getVendors,
  getClientPayments,
  getEmployeePayments,
  getDayPlans,
} from "../services/api";

const drawerWidth = 220;

function AdminDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [stats, setStats] = useState({
    tickets: 0,
    clients: 0,
    leads: 0,
    vendors: 0,
    payments: 0,
    dayPlans: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const [
          ticketsRes,
          clientsRes,
          leadsRes,
          vendorsRes,
          clientPaymentsRes,
          employeePaymentsRes,
          dayPlansRes,
        ] = await Promise.all([
          getTickets(),
          getClients(),
          getLeads(),
          getVendors(),
          getClientPayments(),
          getEmployeePayments(),
          getDayPlans(),
        ]);

        setStats({
          tickets: ticketsRes?.length || 0,
          clients: clientsRes?.length || 0,
          leads: leadsRes?.length || 0,
          vendors: vendorsRes?.length || 0,
          payments:
            (clientPaymentsRes?.length || 0) +
            (employeePaymentsRes?.length || 0),
          dayPlans: dayPlansRes?.length || 0,
        });
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
      }
    }

    loadStats();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const sidebarItems = [
    { label: "Dashboard", icon: <DashboardIcon />, to: "/admin" },
    { label: "Tickets", icon: <ConfirmationNumberIcon />, to: "/tickets" },
    { label: "Clients", icon: <PeopleIcon />, to: "/clients" },
    { label: "Leads", icon: <EmojiPeopleIcon />, to: "/leads" },
    { label: "Vendors", icon: <StoreIcon />, to: "/vendors" },
    { label: "Payments", icon: <PaymentIcon />, to: "/clientpayments" },
    { label: "Day Plans", icon: <CalendarTodayIcon />, to: "/dayplan" },
  ];

  const cards = [
    {
      title: "Tickets",
      value: stats.tickets,
      icon: <ConfirmationNumberIcon color="primary" />,
      to: "/tickets",
    },
    {
      title: "Clients",
      value: stats.clients,
      icon: <PeopleIcon color="primary" />,
      to: "/clients",
    },
    {
      title: "Leads",
      value: stats.leads,
      icon: <EmojiPeopleIcon color="primary" />,
      to: "/leads",
    },
    {
      title: "Vendors",
      value: stats.vendors,
      icon: <StoreIcon color="primary" />,
      to: "/vendors",
    },
    {
      title: "Payments",
      value: stats.payments,
      icon: <PaymentIcon color="primary" />,
      to: "/clientpayments",
    },
    {
      title: "Day Plans",
      value: stats.dayPlans,
      icon: <CalendarTodayIcon color="primary" />,
      to: "/dayplan",
    },
  ];

  const drawer = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" noWrap>
          DXSure CRM
        </Typography>
      </Box>
      <List sx={{ flexGrow: 1 }}>
        {sidebarItems.map((item) => (
          <ListItemButton
            key={item.label}
            component={NavLink}
            to={item.to}
            sx={{ borderRadius: 1, mx: 1 }}
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#e5e7eb" : "transparent",
            })}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Admin Panel
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#1f2937",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="sidebar"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#f3f4f6",
          minHeight: "100vh",
        }}
      >
        <Toolbar />

        <Typography variant="h5" gutterBottom>
          Overview
        </Typography>

        <Grid container spacing={2}>
          {cards.map((card) => (
            <Grid key={card.title} item xs={12} sm={6} md={4}>
              <Card
                component={Link}
                to={card.to}
                sx={{
                  textDecoration: "none",
                  cursor: "pointer",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {card.title}
                      </Typography>
                      <Typography variant="h5">{card.value}</Typography>
                    </Box>
                    <Box sx={{ fontSize: 40 }}>{card.icon}</Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default AdminDashboard;

