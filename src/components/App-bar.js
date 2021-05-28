import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import logo from "../img/LbyBig.png";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CustomizedDialogs from "./Login";
import RegistrationForm from "./RegistrationForm";
import { AccountBox } from "../view/accountBox/ContainerForm";
import { GoBackButton } from "../components/GoBackButton";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBarColor: {
    background: " rgb(255,255,255)",
    background:
      "linear-gradient(90deg, rgba(255,255,255,1) 9%, rgba(39,161,45,1) 49%, rgba(25,78,34,1) 100%)",
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
    marginRight: 10,
  },
  marginElem: {
    marginRight: 10,
  },
  menuIconColor: {
    color: "green",
  },
  welcometext: {
    margin: "auto 10px",
    color: "black",
    fontWeight: 600,
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, setUser, isLoggedIn, setIsLoggedIn, name, setName } =
    useContext(AuthContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const signout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("log Out");
        setUser(null);
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
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
      <AppBar position="static" className={classes.appBarColor}>
        <Toolbar>
          <img src={logo} alt="logo" className={classes.logo} />
          <GoBackButton className={classes.marginElem} />
          <IconButton
            edge="start"
            className={classes.menuButton}
            className={classes.marginElem}
            color="inherit"
            aria-label="menu"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon className={classes.menuIconColor} />
          </IconButton>
          {user && (
            <Link to="/shopping">
              <LocalMallIcon />
            </Link>
          )}
          <Link to="/favorites">
            <FavoriteIcon />
          </Link>
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
            <MenuItem onClick={twoFunction}>
              <Link to="/men">Men's Clothing</Link>
            </MenuItem>
            <MenuItem onClick={twoFunction}>
              <Link to="/women">Women's Clothing</Link>
            </MenuItem>
            <MenuItem onClick={twoFunction}>
              <Link to="/account">Account</Link>
            </MenuItem>
          </Menu>
          {!user && (
            <CustomizedDialogs>
              <AccountBox />
            </CustomizedDialogs>
          )}
          {user && <button onClick={signout}>Log out</button>}
          {user && (
            <p className={classes.welcometext}>
              Welcome {user.displayName ? user.displayName : name}
            </p>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
