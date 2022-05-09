import React, {useState,useEffect} from "react"
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    avatarCircle: {
      width: 20,
      height:20,
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
    let classes = useStyles()
    let username = localStorage.getItem("usernameStorage")
    let getUserInitial = ()=>{
        const firstLetters = username
        .split(' ')
        .map(word => word[0])
        .join('');
        setInitial(firstLetters)
    }
    useEffect(()=>{
        getUserInitial()
    })
   return ( <div className={classes.avatarCircle}>
        {initial}
    </div>
   )
}