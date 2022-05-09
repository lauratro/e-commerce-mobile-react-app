import React,{useContext} from "react"
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery } from "react-responsive";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
const useStyles = makeStyles((theme) => ({
    logOut: {
      fontFamily: "Montserrat",
      borderRadius: 5,
      padding: 5,
      background: "rgb(2, 48, 32)",
      color: "white",
    },
  }));
export default function LogoutButton(){
    let classes = useStyles()
    const {  setUser, } =
    useContext(AuthContext);
    const isTabletOrMobileDevice = useMediaQuery({
        query: "(max-device-width: 600px)",
      });

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
return (     <button
    onClick={signout}
    className={classes.logOut}
    style={
      isTabletOrMobileDevice ? { fontSize: 10 } : { fontSize: 12 }
    }
  >
    Log out
  </button>)

}