import { useState } from 'react';
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
} from '@mui/material';
import { Menu as MenuIcon, KeyboardArrowDown } from '@mui/icons-material';
import { motion } from 'framer-motion';

const navigationItems = [
  {
    label: 'Tokenization',
    items: ['Asset Tokenization Hub', 'Gold Tokenization Hub', 'Real Estate', 'Art & Collectibles', 'Commodities', 'Carbon Credits', 'Private Equity', 'Other Asset Classes'],
  },
  {
    label: 'Visualize',
  },
  {
    label: 'Platform',
    items: ['Features', 'Security', 'Compliance', 'Integration'],
  },
  {
    label: 'Marketplace',
  },
  {
    label: 'Developers',
  },
  {
    label: 'Custom Tokenization Engines',
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [activeMenu, setActiveMenu] = useState('');

  const handleMenuOpen = (event, label) => {
    setMenuAnchor(event.currentTarget);
    setActiveMenu(label);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setActiveMenu('');
  };

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(10, 11, 13, 0.8)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
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
              variant="h6"
              className="font-bold text-2xl tracking-tight flex items-center"
            >
              <Box
                component="span"
                className="w-6 h-6 mr-2 rounded bg-primary"
                sx={{
                  boxShadow: '0 0 20px rgba(0, 255, 133, 0.5)',
                }}
              />
              COPYM
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
                        'aria-labelledby': 'basic-button',
                      }}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          backgroundColor: 'rgba(18, 19, 26, 0.95)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: 'white',
                          minWidth: 180,
                        },
                      }}
                    >
                      {item.items.map((subItem) => (
                        <MenuItem
                          key={subItem}
                          onClick={handleMenuClose}
                          className="hover:text-primary"
                        >
                          {subItem}
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
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
                backgroundColor: 'rgba(18, 19, 26, 0.95)',
                backdropFilter: 'blur(10px)',
                width: 280,
              },
            }}
          >
            <List>
              {navigationItems.map((item) => (
                <ListItem key={item.label} className="block">
                  <ListItemText
                    primary={item.label}
                    className="text-white"
                  />
                  {item.items && (
                    <List className="pl-4">
                      {item.items.map((subItem) => (
                        <ListItem key={subItem} className="block">
                          <ListItemText
                            primary={subItem}
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