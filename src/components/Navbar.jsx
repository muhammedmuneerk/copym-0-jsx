import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Container,
  Box,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Menu as MenuIcon, KeyboardArrowDown } from "@mui/icons-material";
import { motion } from "framer-motion";

const navigationItems = [
  {
    label: "Tokenization",
    items: [
      { label: "Asset Tokenization Hub", to: "/tokenization" },
      { label: "Gold Tokenization Hub", to: "/tokenization/gold" },
      { label: "Real Estate", to: "/tokenization/real-estate" },
      { label: "Art & Collectibles", to: "/tokenization/art" },
      { label: "Commodities", to: "/tokenization/Commodities" },
      { label: "Carbon Credits", to: "/tokenization/carbon-credits" },
      { label: "Private Equity", to: "/tokenization/private-equity" },
      { label: "Other Asset Classes", to: "/tokenization/other-assets" },
    ],
  },
  // {
  //   label: "Visualize",
  // },
  // {
  //   label: "Platform",
  //   items: ["Features", "Security", "Compliance", "Integration"],
  // },
  {
    label: "Marketplace",
    to: "/marketplace",
  },
  // {
  //   label: "Developers",
  // },
  // {
  //   label: "Custom Tokenization Engines",
  // },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [activeMenu, setActiveMenu] = useState("");

  const handleMenuOpen = (event, label) => {
    setMenuAnchor(event.currentTarget);
    setActiveMenu(label);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setActiveMenu("");
  };

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(10, 11, 13, 0.8)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Container maxWidth="xl">
        <Box className="flex items-center justify-between py-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              component={Link}
              to="/"
              variant="h6"
              className="font-bold text-2xl tracking-tight flex items-center no-underline text-inherit"
            >
              <img
                src="/assets/icons/logo-svg.svg"
                alt="COPYM"
                className="w-20 h-10 sm:w-30 sm:h-15 md:w-36 md:h-16 lg:w-48 lg:h-20 xl:w-50 xl:h-20"
              />
            </Typography>
          </motion.div>

          {/* Desktop Navigation */}
          <Box className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Box key={item.label}>
                {item.items ? (
                  <>
                    <Button
                      color="inherit"
                      onClick={(e) => handleMenuOpen(e, item.label)}
                      endIcon={<KeyboardArrowDown />}
                      className="text-text-secondary hover:text-white"
                    >
                      {item.label}
                    </Button>
                    <Menu
                      anchorEl={menuAnchor}
                      open={activeMenu === item.label}
                      onClose={handleMenuClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          backgroundColor: "rgba(18, 19, 26, 0.95)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          color: "white",
                          minWidth: 180,
                        },
                      }}
                    >
                      {item.items.map((subItem) => (
                        <MenuItem
                          key={
                            typeof subItem === "string"
                              ? subItem
                              : subItem.label
                          }
                          onClick={handleMenuClose}
                          className="hover:text-primary"
                          component={
                            typeof subItem === "object" && subItem.to
                              ? Link
                              : undefined
                          }
                          to={
                            typeof subItem === "object" ? subItem.to : undefined
                          }
                        >
                          {typeof subItem === "string"
                            ? subItem
                            : subItem.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : item.to ? (
                  <Button
                    component={Link}
                    to={item.to}
                    color="inherit"
                    className="text-text-secondary hover:text-white"
                  >
                    {item.label}
                  </Button>
                ) : (
                  <Button
                    color="inherit"
                    className="text-text-secondary hover:text-white"
                  >
                    {item.label}
                  </Button>
                )}
              </Box>
            ))}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Mobile Navigation Drawer */}
          <Drawer
            anchor="right"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            PaperProps={{
              sx: {
                backgroundColor: "rgba(18, 19, 26, 0.95)",
                backdropFilter: "blur(10px)",
                width: 280,
              },
            }}
          >
            <List>
              {navigationItems.map((item) => (
                <ListItem
                  key={item.label}
                  className="block"
                  component={item.to ? Link : "div"}
                  to={item.to}
                  onClick={() => item.to && setMobileMenuOpen(false)}
                >
                  <ListItemText primary={item.label} className="text-white" />
                  {item.items && (
                    <List className="pl-4">
                      {item.items.map((subItem) => (
                        <ListItem
                          key={
                            typeof subItem === "string"
                              ? subItem
                              : subItem.label
                          }
                          className="block"
                          component={
                            typeof subItem === "object" && subItem.to
                              ? Link
                              : undefined
                          }
                          to={
                            typeof subItem === "object" ? subItem.to : undefined
                          }
                          onClick={() => item.to && setMobileMenuOpen(false)}
                        >
                          <ListItemText
                            primary={
                              typeof subItem === "string"
                                ? subItem
                                : subItem.label
                            }
                            className="text-text-secondary"
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Box>
      </Container>
    </AppBar>
  );
}
