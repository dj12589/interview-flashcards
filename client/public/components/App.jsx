import React from 'react';
import ReactDOM from 'react-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Flashcard from './Card.jsx';
import NewPost from './NewPost.jsx';
import EditCard from './EditCard.jsx';
import EditAnswer from './EditAnswer.jsx';
import AddButton from './AddButton.jsx';
import NavBar from './NavBar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'behavioral',
      qOrA: 'question',
      renderFlashcard: 'yes',
    };
    this.getPosts = this.getPosts.bind(this);
    this.newPost = this.newPost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.changeNav = this.changeNav.bind(this);
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    fetch(`/${this.state.type}`)
      .then((res) => res.json())
      .then((results) => {
        this.setState({
          questions: results,
        });
      });
  }

  newPost() {
    this.setState({
      newPost: 'yes',
    });
  }

  updatePost(e, section) {
    const currentText = document.getElementsByTagName('h2')[0].innerHTML;

    if (section === 'question') {
      this.setState({
        qOrA: 'question',
        editPost: currentText,
      });
    } else if (section === 'answer') {
      const paraText = e.target.parentNode.parentNode.getElementsByClassName('answerText')[0].innerHTML;
      this.setState({
        qOrA: 'answer',
        editPost: [currentText, paraText],
      });
    }
  }

  deletePost() {
    const currentText = {
      question: document.getElementsByTagName('h2')[0].innerText,
    };
    fetch(`/${this.state.type}`, {
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

  changeNav(currentField) {
    fetch(`/${currentField}`)
      .then((res) => res.json())
      .then((results) => {
        this.setState({
          newPost: 'no',
          type: currentField || this.state.type,
          questions: results,
          editPost: null,
          renderFlashcard: 'yes',
        });
      });
  }

  render() {
    if (this.state.newPost === 'yes') {
      return (
        <div>
          <NavBar id="navbar" changeNav={this.changeNav} />
          <h1>Practice Makes Perfect.</h1>
          <AddButton getNewPost={this.newPost} />
          <NewPost className="newPost" getPosts={this.getPosts} page={this.state.type} />
          <ArrowForwardIcon
            className="arrow"
            color="primary"
            onClick={() => {
              this.changeNav(this.state.type);
            }}
          />
        </div>
      );
    } if (this.state.editPost) {
      if (this.state.qOrA === 'question') {
        return (
          <div>
            <NavBar id="navbar" changeNav={this.changeNav} />
            <h1>Practice Makes Perfect.</h1>
            <EditCard placeholder={this.state.editPost} page={this.state.type} />
            <ArrowForwardIcon className="arrow" color="primary" onClick={() => this.changeNav(this.state.type)} />
          </div>
        );
      } if (this.state.qOrA === 'answer') {
        return (
          <div>
            <NavBar id="navbar" changeNav={this.changeNav} />
            <h1>Practice Makes Perfect.</h1>
            <EditAnswer placeholder={this.state.editPost} page={this.state.type} />
            <ArrowForwardIcon className="arrow" color="primary" onClick={() => this.changeNav(this.state.type)} />
          </div>
        );
      }
    } else if (this.state.renderFlashcard) {
      return (

        <div>
          <NavBar id="navbar" changeNav={this.changeNav} />
          <h1>Practice Makes Perfect.</h1>
          <AddButton getNewPost={this.newPost} />
          <Flashcard className="flashcard" updatePost={this.updatePost} deletePost={this.deletePost} q={this.state.questions} page={this.state.type} />
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
