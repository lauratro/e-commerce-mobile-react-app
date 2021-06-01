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

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CustomizedDialogs from "./Login";

import { AccountBox } from "../view/accountBox/ContainerForm";
import { GoBackButton } from "../components/GoBackButton";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import { ItemMenu } from "../view/accountBox/Common";
import { useMediaQuery } from "react-responsive";
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
    //  marginRight: theme.spacing(1),
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
    marginRight: 30,
  },
  marginIcons: {
    marginRight: 15,
    color: "black",
  },
  menuIconColor: {
    color: "green",
  },
  welcometext: {
    margin: "auto 10px",
    color: "black",
    fontWeight: 600,
    fontFamily: "Montserrat",
  },

  linkText: {
    textDecoration: "none",
    "&:hover": {
      color: "green",
    },
  },
  logOut: {
    fontFamily: "Montserrat",
    borderRadius: 5,
  },
}));

export default function MenuAppBar() {
  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 600px)",
  });
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
      <AppBar position="fixed" className={classes.appBarColor}>
        <Toolbar
          style={
            isTabletOrMobileDevice
              ? { justifyContent: " space-between" }
              : { justifyContent: "space-around" }
          }
        >
          <img src={logo} alt="logo" className={classes.logo} />
          <GoBackButton className={classes.marginElem} />
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon className={classes.menuIconColor} />
          </IconButton>
          {user && (
            <div display="flex" style={{ marginTop: 5 }}>
              <Link to="/shopping" className={classes.marginIcons}>
                <LocalMallIcon />
              </Link>

              <Link to="/favorites" className={classes.marginIcons}>
                <FavoriteIcon />
              </Link>
            </div>
          )}
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <ItemMenu>
              <MenuItem className={classes.menuIt} onClick={twoFunction}>
                <Link to="/" className={classes.linkText}>
                  Home
                </Link>
              </MenuItem>
            </ItemMenu>
            <ItemMenu>
              <MenuItem onClick={twoFunction}>
                <Link to="/electronics" className={classes.linkText}>
                  Electronics
                </Link>
              </MenuItem>
            </ItemMenu>
            <ItemMenu>
              <MenuItem onClick={twoFunction}>
                <Link to="/jewelery" className={classes.linkText}>
                  Jewelery
                </Link>
              </MenuItem>
            </ItemMenu>
            <ItemMenu>
              <MenuItem onClick={twoFunction}>
                <Link to="/men" className={classes.linkText}>
                  Men's Clothing
                </Link>
              </MenuItem>
            </ItemMenu>
            <ItemMenu>
              <MenuItem onClick={twoFunction}>
                <Link to="/women" className={classes.linkText}>
                  Women's Clothing
                </Link>
              </MenuItem>
            </ItemMenu>
          </Menu>
          {!user && (
            <CustomizedDialogs>
              <AccountBox />
            </CustomizedDialogs>
          )}
          {user && (
            <button
              onClick={signout}
              className={classes.logOut}
              style={
                isTabletOrMobileDevice ? { fontSize: 10 } : { fontSize: 20 }
              }
            >
              Log out
            </button>
          )}
          {user && (
            <p
              className={classes.welcometext}
              style={
                isTabletOrMobileDevice ? { fontSize: 10 } : { fontSize: 20 }
              }
            >
              Welcome {user.displayName ? user.displayName : name}
            </p>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
