import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AddBookmark from './AddBookmark/AddBookmark';
import EditBookmark from './EditBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import BookmarksContext from './BookmarksContext'
import Nav from './Nav/Nav';
import config from './config';
import './App.css';


class App extends Component {
  state = {
    bookmarks: [],
    error: null,
  };

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark],
    })
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setBookmarks)
      .then(responseData => {
        this.context.updateArticle(responseData)
      })
      .catch(error => this.setState({ error }))
  }

  render() {
    const { bookmarks } = this.state
    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <Nav />
        <div className='content' aria-live='polite'>
          <Route
            path='/add-bookmark'
            render={({ history }) => {
              return <AddBookmark
                onAddBookmark={this.addBookmark}
                onClickCancel={() => history.push('/')}
              />
            }}
          />
          <Route
            path='/edit/:bookmarkId'
            component={EditBookmark}
          />
          <Route
            exact
            path='/'
            render={({ history }) => {
              return <BookmarkList bookmarks={bookmarks} />
            }}
          />
        </div>
      </main>
    );
  }
}

export default App;
