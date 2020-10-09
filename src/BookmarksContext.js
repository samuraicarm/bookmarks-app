import React from 'react'

const BookmarksContext = React.createContext({
    bookmarks: [],
    addBookmark: () => { },
    deleteBookmark: () => { },
    updateArticle: updatedBookmark => {
        const newBookmarks = this.state.bookmarks.map(art =>
            (art.id === updatedBookmark.id)
                ? updatedBookmark
                : art
        )
        this.setState({
            bookmarks: newBookmarks
        })

    }
})

export default BookmarksContext