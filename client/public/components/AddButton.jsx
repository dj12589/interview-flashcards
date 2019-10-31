import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    align: 'center',
  },
  input: {
    display: 'none',
  },
}));

const AddButton = function ({ getNewPost }) {
  const classes = useStyles();

  return (
    <div>
      <Button variant="contained" color="primary" className={classes.button} onClick={getNewPost}>
    Add New Question
      </Button>
    </div>
  );
};

export default AddButton;
