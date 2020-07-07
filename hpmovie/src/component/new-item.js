import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { Link, NavLink } from "react-router-dom"; 





const useStyles = makeStyles({
  card: {
   
  },
  media: {
    height: 220
  }
});

export default function MediaCard(props) {
  const classes = useStyles();

  

  const renderListNews = ()=>{
    if(props.mangListNew){

     const mangListNew = props.mangListNew.filter(
        item => {
          return (
            item.categoryId._id == props.categoryId
          );
        }
      );

  

        
        let x = [];
       

        for (let i = 0; i < props.stateXemThem; i++) {
            x.push(mangListNew[i]) ;
            
          }
          
        return x.map((item,index)=>{
            if(item){
              let smm;
            if(index === 0){
                smm = 6
            }
            else if(index === 1){
                smm = 6
            }else{
                smm = 3
            }
            
            return(
             
                  <Grid container item xs={6} sm={smm}>
                    
          <Card className={classes.card}>
            <CardActionArea>
            <Link to={`/detail-news/${item._id}`}>
              <CardMedia
                className={classes.media}
                image={item.newsImages}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                {item.newsTitle}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {item.newsIntroduce}
                </Typography>
              </CardContent>
              </Link>
            </CardActionArea>
           
          </Card>
       
        </Grid>
              
            )
            }
        })
    }
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
      {renderListNews()}
                    
      </Grid>
      
    </div>
  );
}
