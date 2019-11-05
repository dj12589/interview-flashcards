import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';


const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 275,
    marginTop: 50,
  },
  title: {
    fontSize: 14,
    align: 'center',
  },
  pos: {
    marginBottom: 12,
    align: 'center',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


const Flashcard = function ({
  q, editPost, deletePost, page,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [currentQuestion, setQuestion] = React.useState(null);

  const handleExpandClick = (currentQuestion) => {
    setExpanded(!expanded);
    setQuestion(currentQuestion);
  };

  if (q) {
    const randomIndex = Math.floor(Math.random() * Math.floor(q.length));
    const randomQuestion = q[randomIndex];

    return (q.map((question) => {
      if (currentQuestion === question.question) {
        return (
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {question.question}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                <i>You got this.</i>
              </Typography>
              <Typography variant="body2" component="p" />
            </CardContent>
            <CardActions>
              <EditIcon className="button question" onClick={(e) => editPost(e, 'question')} />
              <DeleteIcon className="button question" onClick={(e) => deletePost(e)} />
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={() => {
                  handleExpandClick(question.question);
                }}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph className="answerText">
                  {question.answer}
                </Typography>

                <CardActions>
                  <EditIcon className="button answerText" onClick={(e) => editPost(e, 'answer')} />
                </CardActions>
              </CardContent>
            </Collapse>

          </Card>
        );
      } if (currentQuestion === null) {
        if (randomQuestion.question === question.question) {
          return (
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {question.question}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  <i>You got this.</i>
                </Typography>
                <Typography variant="body2" component="p" />
              </CardContent>
              <CardActions>
                <EditIcon className="button question" onClick={(e) => editPost(e, 'question')} />
                <DeleteIcon className="button question" onClick={(e) => deletePost(e)} />
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={() => {
                    handleExpandClick(question.question);
                  }}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph className="answerText">
                    {question.answer}
                  </Typography>
                  <EditIcon className="button answerText" onClick={(e) => editPost(e, 'answer')} />
                </CardContent>
              </Collapse>

            </Card>
          );
        }
      }
    }));
  }
  return null;
};

export default Flashcard;
