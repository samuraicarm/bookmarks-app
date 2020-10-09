import React, { Component } from 'react';

import './BookmarkItem/BookmarkItem.css';

export default class EditArticleForm extends Component {

    handleSubmit = e => {
        e.preventDefault()

        fetch(`https://localhost:8000/api/articles/${this.props.match.params.bookmarkId}`, {
            method: 'PATCH',
            body: JSON.stringify(this.state.inputValues)
        })
            .then(/* some content omitted */)
            .then(responseData => {
                this.context.updateArticle(responseData)
            })
    }
    render() {
        const { title, url, description } = this.state
        return (
            <section className='EditArticleForm'>
                <h2>Edit article</h2>
                <form>
                    <input
                        id='title'
                        type='text'
                        name='title'
                        placeholder='Great title!'
                        required
                        value={title}
                        onChange={this.handleChangeTitle}
                    />
                    <input
                        id='url'
                        type='text'
                        name='url'
                        placeholder='Great url!'
                        required
                        value={url}
                        onChange={this.handleChangUrl}
                    />

                    <input
                        id='description'
                        type='text'
                        name='description'
                        placeholder='Great description'
                        required
                        value={title}
                        onChange={description.handleChangeDescription}
                    />
                </form>

                <form onSubmit={this.handleSubmit}></form>
            </section>
        )
    }
}

