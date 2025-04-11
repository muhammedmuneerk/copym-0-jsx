import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Menu as MenuIcon, KeyboardArrowDown, Close } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const navigationItems = [
  {
    label: "Go Green",
    to: "/green-tokenization",
  },
 
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

const menuVariants = {
  closed: {
    opacity: 0,
    x: "100%",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const menuItemVariants = {
  closed: { opacity: 0, x: 20 },
  open: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
    },
  }),
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [activeMenu, setActiveMenu] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleMenuOpen = (event, label) => {
    setMenuAnchor(event.currentTarget);
    setActiveMenu(label);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setActiveMenu("");
  };

  const handleMobileItemClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <AppBar 
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: scrolled ? "none" : "none", //blur(10px)//
        backgroundColor: scrolled ? "transparent" : "transparent", //rgba(10, 11, 13, 0.8)//
        borderBottom: scrolled ? "none" : "none", //1px solid rgba(255, 255, 255, 0.1)//
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Container maxWidth="xl">
        <Box className="flex items-center justify-between py-4 ">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <Typography
              component={Link}
              to="/"
              variant="h6"
              className="font-bold text-2xl tracking-tight flex items-center no-underline text-inherit"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                src="/assets/icons/logo-svg.svg"
                alt="COPYM"
                className="w-20 h-10 sm:w-40 sm:h-20 md:w-40 md:h-20 lg:w-48 lg:h-20 xl:w-50 xl:h-20"
              />
            </Typography>
          </motion.div>

          {/* Desktop Navigation - Now on the right */}
          <Box className="hidden lg:flex items-center space-x-1 ml-auto ">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.items ? (
                  <>
                    <Button
                      color="inherit"
                      onClick={(e) => handleMenuOpen(e, item.label)}
                      endIcon={
                        <motion.div
                          animate={{ rotate: activeMenu === item.label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <KeyboardArrowDown />
                        </motion.div>
                      }
                      className="text-text-secondary hover:text-white relative group"
                      sx={{
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "0%",
                          height: "2px",
                          backgroundColor: "primary.main",
                          transition: "width 0.3s ease-in-out",
                        },
                        "&:hover::after": {
                          width: "100%",
                        },
                      }}
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
                          transform: "translateY(10px)",
                          transition: "transform 0.2s ease-in-out",
                          "&:hover": {
                            transform: "translateY(0)",
                          },
                        },
                      }}
                    >
                      {item.items.map((subItem) => (
                        <MenuItem
                          key={typeof subItem === "string" ? subItem : subItem.label}
                          onClick={handleMenuClose}
                          className="hover:text-primary transition-colors duration-200"
                          component={typeof subItem === "object" && subItem.to ? Link : undefined}
                          to={typeof subItem === "object" ? subItem.to : undefined}
                          sx={{
                            "&:hover": {
                              backgroundColor: "rgba(255, 255, 255, 0.05)",
                            },
                          }}
                        >
                          {typeof subItem === "string" ? subItem : subItem.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : item.to ? (
                  <Button
                    component={Link}
                    to={item.to}
                    color="inherit"
                    className="text-text-secondary hover:text-white relative group"
                    sx={{
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "0%",
                        height: "2px",
                        backgroundColor: "primary.main",
                        transition: "width 0.3s ease-in-out",
                      },
                      "&:hover::after": {
                        width: "100%",
                      },
                    }}
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
              </motion.div>
            ))}
          </Box>

          {/* Mobile Menu Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="lg:hidden"
          >
            <IconButton
              color="inherit"
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </motion.div>

          {/* Mobile Navigation Drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <Drawer
                anchor="right"
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                PaperProps={{
                  sx: {
                    backgroundColor: "rgba(18, 19, 26, 0.95)",
                    backdropFilter: "blur(10px)",
                    width: 280,
                    overflow: "hidden",
                  },
                }}
              >
                <motion.div
                  variants={menuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="h-full flex flex-col"
                >
                  <Box className="flex justify-end p-4 flex-shrink-0">
                    <IconButton
                      onClick={() => setMobileMenuOpen(false)}
                      sx={{ color: "white" }}
                    >
                      <Close />
                    </IconButton>
                  </Box>
                  <List className="flex-grow overflow-y-auto">
                    {navigationItems.map((item, i) => (
                      <motion.div
                        key={item.label}
                        custom={i}
                        variants={menuItemVariants}
                        initial="closed"
                        animate="open"
                      >
                        {item.to ? (
                          <ListItem
                            button
                            component={Link}
                            to={item.to}
                            onClick={handleMobileItemClick}
                          >
                            <ListItemText
                              primary={item.label}
                              className="text-white"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: "1.1rem",
                                  fontWeight: 500,
                                },
                              }}
                            />
                          </ListItem>
                        ) : (
                          <ListItem>
                            <ListItemText
                              primary={item.label}
                              className="text-white"
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: "1.1rem",
                                  fontWeight: 500,
                                },
                              }}
                            />
                          </ListItem>
                        )}
                        
                        {item.items && (
                          <List className="pl-4">
                            {item.items.map((subItem, j) => (
                              <motion.div
                                key={typeof subItem === "string" ? subItem : subItem.label}
                                custom={j}
                                variants={menuItemVariants}
                                initial="closed"
                                animate="open"
                              >
                                <ListItem
                                  button
                                  component={
                                    typeof subItem === "object" && subItem.to
                                      ? Link
                                      : undefined
                                  }
                                  to={
                                    typeof subItem === "object" ? subItem.to : undefined
                                  }
                                  onClick={handleMobileItemClick}
                                  sx={{
                                    "&:hover": {
                                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                                    },
                                  }}
                                >
                                  <ListItemText
                                    primary={
                                      typeof subItem === "string"
                                        ? subItem
                                        : subItem.label
                                    }
                                    className="text-text-secondary"
                                    sx={{
                                      "& .MuiTypography-root": {
                                        fontSize: "0.95rem",
                                      },
                                    }}
                                  />
                                </ListItem>
                              </motion.div>
                            ))}
                          </List>
                        )}
                      </motion.div>
                    ))}
                  </List>
                </motion.div>
              </Drawer>
            )}
          </AnimatePresence>
        </Box>
      </Container>
    </AppBar>
  );
}