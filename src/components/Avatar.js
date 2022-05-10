import React, {useState,useEffect, useContext} from "react"
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../context/AuthContext";

const useStyles = makeStyles({
    avatarCircle: {
      width: 30,
      height:30,
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      margin:5,
      border:"1px solid black",
      borderRadius:"100%",
      padding:4,
      background:"white",
      color:"black"
    },
  });
export default function Avatar(){
    let [initial, setInitial]=useState("")
    const {  user, name } = useContext(AuthContext);
    let classes = useStyles()
    let getUserInitial = ()=>{
        let username
        if(user){ username = user.displayName ? user.displayName : name}
       
      if(user){
        const firstLetters = username
        .split(' ')
        .map(word => word[0])
        .join('');
        setInitial(firstLetters) 
       
      }

       
    }
    useEffect(()=>{
        getUserInitial()
    })
   return ( <div className={classes.avatarCircle}>
        {initial}
    </div>
   )
}