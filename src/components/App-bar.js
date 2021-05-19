import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import logo from "../img/lby.png";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CustomizedDialogs from "./Login";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    width: 60,
    height: 60,
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const refreshPage = () => {
    window.location.reload();
  };
  function twoFunction() {
    refreshPage();
    handleClose();
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <img src={logo} alt="logo" className={classes.logo} />
            <MenuIcon />
          </IconButton>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={twoFunction}>
              <Link to="/">Home</Link>
            </MenuItem>
            <MenuItem onClick={twoFunction}>
              <Link to="/electronics">Electronics</Link>
            </MenuItem>
            <MenuItem onClick={twoFunction}>
              <Link to="/jewelery">Jewelery</Link>
            </MenuItem>
            <MenuItem onClick={twoFunction}>Logout</MenuItem>
          </Menu>
          <CustomizedDialogs />
        </Toolbar>
      </AppBar>
    </div>
  );
}
