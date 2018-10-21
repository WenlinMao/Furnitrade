import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

const styles = {

    card: {
        maxWidth: 300,
    },
    media: {
        height: 200,
    },

};

function FurniCard(props){
    const {classes} = props;
    const imgPath = props.imagePath;
    
    return(
        <Card className={classes.card}>
            
            {/* When creating Furnicard components, please specify the image by passing imagePath = ??? */}
            <CardMedia 
                component = "img" 
                className={classes.media} 
                image = {props.imagePath}
            />

            {/* When creating Furnicard components, please specify the name by passing furniName = ??? */}
            <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                    {props.furniName}
                </Typography>
            </CardContent>
          
            {/* The user shall be able to send an info form to sellers through this button */}
            <CardActions>
            <Button  size="small" color="primary">
                I want this
            </Button>
            </CardActions>
      </Card>
    );
}

FurniCard.propTypes = {
    classes: PropTypes.object.isRequired,

  };
  
  export default withStyles(styles)(FurniCard);