import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

function CardContainer(props) {
  return (
    <Box mt={8}>
      <Grid
        container
        direction="row"
        justify="space-around"
        style={{ 
          margin:"0 auto",
          width:"90%"
        }}
  
      >
        {props.children}
      </Grid>
    </Box>
  );
}
export default CardContainer;
