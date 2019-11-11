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
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

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

  avatar: {
    backgroundColor: red[500],
  },
}));

let storage = {}


const Flashcard = function ({
  q, updatePost, deletePost, page, reset
}) {
  if (q && updatePost && deletePost && page) {
    storage.q = q
    storage.updatePost = updatePost
    storage.deletePost = deletePost
    }
    let alreadyRendered = false;

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [currentQuestion, setQuestion] = React.useState(null);
  const [yesOrNo, stayOnQuestion] = React.useState('no')

  const handleExpandClick = (currentQuestion, yesOrNo) => {
    setExpanded(!expanded);
    setQuestion(currentQuestion);
    stayOnQuestion(yesOrNo)
  };

  const handleArrowClick = (currentQuestion, yesOrNo) => {
    if (expanded === true) {
      setExpanded(!expanded)
    }
    setQuestion(currentQuestion);
    stayOnQuestion(yesOrNo)
  };

  if (storage.q) {
      const randomIndex = Math.floor(Math.random() * Math.floor(storage.q.length));
      const randomQuestion = storage.q[randomIndex];

    let currentQuestions = [];

    for (let i = 0; i < storage.q.length; i++) {
      currentQuestions.push(storage.q[i].question)
    }

      if (yesOrNo === 'yes' && alreadyRendered === false) {
        alreadyRendered = true;
        return (
        <div>
        <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {currentQuestion.question}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              <i>You got this.</i>
            </Typography>
          </CardContent>
          <CardActions>
            <EditIcon className="button question" onClick={(e) => updatePost(e, 'question')} />
            <DeleteIcon className="button question" onClick={(e) => deletePost(e)} />
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={() => {
                handleExpandClick(currentQuestion, 'yes');
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
                {currentQuestion.answer}
              </Typography>
              <CardActions>
                <EditIcon className="answerText" onClick={(e) => updatePost(e, 'answer')} />
              </CardActions>
            </CardContent>
          </Collapse>
        </Card>
        </div>
        <ArrowForwardIcon className="arrow" color="primary" onClick={() => {
          const randomIndex = Math.floor(Math.random() * Math.floor(storage.q.length));
          const randomQuestion = storage.q[randomIndex];
          handleArrowClick(randomQuestion, 'no')

        }} />
        </div>
      )
    } else if (alreadyRendered === false) {
              alreadyRendered = true;

            return (
            <div>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {randomQuestion.question}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  <i>You got this.</i>
                </Typography>
              </CardContent>
              <CardActions>
                <EditIcon className="button question" onClick={(e) => updatePost(e, 'question')} />
                <DeleteIcon className="button question" onClick={(e) => deletePost(e)} />
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={() => {
                    handleExpandClick(randomQuestion, 'yes');
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
                    {randomQuestion.answer}
                  </Typography>
                  <EditIcon className="answerText" onClick={(e) => updatePost(e, 'answer')} />
                </CardContent>
              </Collapse>
            </Card>
              <ArrowForwardIcon className="arrow" color="primary" onClick={() => {
                const randomIndex = Math.floor(Math.random() * Math.floor(storage.q.length));
                const randomQuestion = storage.q[randomIndex];
                handleArrowClick(randomQuestion, 'no')
                }} />
              </div>
            );

        }

  }
  return null;
};

export default Flashcard;
