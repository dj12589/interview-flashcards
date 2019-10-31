import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },

  title: {
    fontSize: 14,
    align: 'center',
  },
  pos: {
    marginBottom: 12,
    align: 'center',
  },
});


const EditCard = function ({ placeholder, getPosts }) {
  const classes = useStyles();
  const update = {
    question: '',
  };

  return (
    <div className="mdc-card">
      <Button variant="contained" color="primary" className={classes.button}>
           Question in Editing Mode
      </Button>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
          Behavioral Question
          </Typography>
          <Typography variant="h5" component="h2">
            <TextField
              id="standard-full-width"
              defaultValue={placeholder}
              style={{ margin: 8 }}
              placeholder={placeholder}
              margin="normal"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => { update.question = e.target.value; }}
            />
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            <i>Thanks for improving this question! You. Are. Awesome.</i>
          </Typography>
        </CardContent>
        <CardActions>
          <SaveIcon
            className="button"
            onClick={() => {
              fetch('/behavioral', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ old: placeholder, new: update.question }),
              })
                .then((results) => {
                  results.json();
                })
                .then(() => {
                  window.alert('Question updated in database. Thanks for your edits!');
                  getPosts();
                });
            }}
          />
        </CardActions>
      </Card>
    </div>
  );
};

export default EditCard;
