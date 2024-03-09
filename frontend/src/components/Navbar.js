import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, MenuItem, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

const pages = [
    {
        name: "Your Profile",
        link: "/profile",
        key: "profile",
    },
    {
        name: "All Users",
        link: "/allusers",
        key: "allusers",
    },
];

function Navbar() {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return navigate("/");
    };
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                        href='http://localhost:3000/welcome'
                    >
                        DASHBOARD
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' }, }}
                        >
                            {pages.map((page) => (
                                <MenuItem component="a" key={page.key} href={page.link}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            mr: 1,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                        href='http://localhost:3000/welcome'
                    >
                        DASHBOARD
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button key={page.key} href={page.link} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }} >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;