import React from 'react';
import ReactDOM from 'react-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Flashcard from './Card.jsx';
import NewPost from './NewPost.jsx';
import EditCard from './EditCard.jsx';
import AddButton from './AddButton.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getPosts = this.getPosts.bind(this);
    this.newPost = this.newPost.bind(this);
    this.editPost = this.editPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  getPosts() {
    fetch('/behavioral')
      .then((res) => res.json())
      .then((results) => {
        this.setState({
          questions: results,
        });
      });
  }

  componentDidMount() {
    this.getPosts();
  }

  newPost() {
    this.setState({
      newPost: 'yes',
    });
  }

  editPost() {
    const currentText = document.getElementsByTagName('h2')[0].innerHTML;
    this.setState({
      editPost: currentText,
    });
  }

  deletePost() {
    const currentText = {
      question: document.getElementsByTagName('h2')[0].innerText,
    };
    fetch('/behavioral', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentText),
    })
      .then(() => {
        window.alert('Question deleted.');
        this.getPosts();
      });
  }

  render() {
    if (this.state.newPost === 'yes') {
      return (
        <div>
          <h1>Practice Makes Perfect.</h1>
          <AddButton getNewPost={this.newPost} />
          <NewPost className="newPost" getPosts={this.getPosts} />
          <Flashcard className="flashcard" editPost={this.editPost} deletePost={this.deletePost} q={this.state.questions} />
          <ArrowForwardIcon className="arrow" color="primary" onClick={() => window.location.reload(false)} />
        </div>
      );
    } if (this.state.editPost) {
      return (
        <div>
          <h1>Practice Makes Perfect.</h1>
          <EditCard placeholder={this.state.editPost} />
          <ArrowForwardIcon className="arrow" color="primary" onClick={() => window.location.reload(false)} />
        </div>
      );
    }
    return (
      <div>
        <h1>Practice Makes Perfect.</h1>
        <AddButton getNewPost={this.newPost} />
        <Flashcard className="flashcard" editPost={this.editPost} deletePost={this.deletePost} q={this.state.questions} />
        <ArrowForwardIcon className="arrow" color="primary" onClick={() => window.location.reload(false)} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
