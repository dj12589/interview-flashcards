import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
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


const Flashcard = function ({
  q, editPost, deletePost,
}) {
  const classes = useStyles();

  if (q) {
    const randomIndex = Math.floor(Math.random() * Math.floor(q.length));
    const randomQuestion = q[randomIndex];

    const Cards = q.map((question) => {
      if (randomQuestion.question === question.question) {
        return (
          <div className="mdc-card">
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
          Behavioral Question
                </Typography>
                <Typography variant="h5" component="h2">
                  {question.question}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  <i>You got this.</i>
                </Typography>
                <Typography variant="body2" component="p" />
              </CardContent>
              <CardActions>
                <EditIcon className="button" onClick={(e) => editPost(e)} />
                <DeleteIcon className="button" onClick={(e) => deletePost(e)} />
              </CardActions>
            </Card>
          </div>
        );
      }
    });
    return (
      <div>{Cards}</div>
    );
  }
  return null;
};

export default Flashcard;
