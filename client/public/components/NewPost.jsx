import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const NewPost = function () {
  const newPost = {
    question: '',
    answer: '',
  };

  const classes = useStyles();

  return (
    <div className="newPost">
      <form action="/" method="post" className={classes.container} noValidate autoComplete="off">
        <div>
          <TextField
            id="standard-basic"
            className={classes.textField}
            label="New Question"
            margin="normal"
            placeholder="Enter question here..."
            onChange={(e) => { newPost.question = e.target.value; }}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => {
            fetch('/behavioral', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newPost),
            })
              .then((results) => results.json())
              .then(() => {
                window.alert('Thanks for submitting! Your question has been added to the database.');
                Location.reload();
              });
          }}
        >
        Submit Question
        </Button>
      </form>
    </div>
  );
};

export default NewPost;
