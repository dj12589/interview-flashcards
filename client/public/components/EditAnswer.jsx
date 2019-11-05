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
    fontSize: 20,
    align: 'center',
    marginTop: 50,
  },
  pos: {
    marginBottom: 12,
    align: 'center',
  },
});


const EditAnswer = function ({ placeholder, getPosts, page }) {
  const classes = useStyles();
  const update = {
    answer: '',
  };

  return (
    <div className="mdc-card">
      <Button variant="contained" color="primary" className={classes.button}>
           Answer in Editing Mode
      </Button>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            {placeholder[0]}
          </Typography>
          <Typography>
            <TextField
              id="standard-full-width"
              multiline
              defaultValue={placeholder[1]}
              style={{ margin: 8 }}
              placeholder={placeholder[1]}
              margin="normal"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => { update.answer = e.target.value; }}
            />
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            <i>Thanks for improving this answer! You. Are. Awesome.</i>
          </Typography>
        </CardContent>
        <CardActions>
          <SaveIcon
            className="button"
            onClick={() => {
              fetch(`/${page}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: 'answer', old: placeholder[0], new: update.answer }),
              })
                .then((results) => {
                  results.json();
                })
                .then(() => {
                  window.alert('Answer updated in database. Thanks for your edits!');
                  getPosts();
                });
            }}
          />
        </CardActions>
      </Card>
    </div>
  );
};

export default EditAnswer;
