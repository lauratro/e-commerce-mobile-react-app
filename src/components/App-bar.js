import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import logo from "../img/LbyBig.png";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "./Avatar";

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
    background:
      "linear-gradient(90deg, rgba(255,255,255,1) 2%, rgba(39,161,45,1) 19%, rgba(25,78,34,1) 100%)",
  },
 
  title: {
    flexGrow: 1,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: "50%",
  },
  marginElem: {
    marginRight: 30,
  },
  marginIcons: {
    marginRight: 15,
    color: "black",
  },
  menuIconColor: {
    color: "black",
  },
  welcometext: {
    margin: "auto 10px",
    color: "white",
    fontWeight: 600,
    fontFamily: "Montserrat",
    fontStyle: "italic",
  },

  linkText: {
    textDecoration: "none",
    fontWeight: "bold",

    "&:hover": {
      color: "green",
    },
  },
  logOut: {
    fontFamily: "Montserrat",
    borderRadius: 5,
    padding: 5,
    background: "rgb(2, 48, 32)",
    color: "white",
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
        ><Link to="/">
                <img src={logo} alt="logo" className={classes.logo} />
                </Link>
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
          <GoBackButton className={classes.marginElem} />
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
                isTabletOrMobileDevice ? { fontSize: 10 } : { fontSize: 12 }
              }
            >
              Log out
            </button>
          )}
        
          {user && (
             <Avatar />
           
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
