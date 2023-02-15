const pageWrapper = document.querySelector('#page-content')

async function viewPost() {
    const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/5?_expand=user&_embed=comments`)
    const post = await postRes.json()

    const postTitle = document.createElement('h4')
    postTitle.textContent = post.title
    postTitle.classList.add('post-title')

    const postContent = document.createElement('p')
    postContent.textContent = post.body
    postContent.classList.add('post-content')

    const postAuthor = document.createElement('h5')
    postAuthor.classList.add('post-author')

    const authorLink = document.createElement('a')
    authorLink.classList.add('author-link')


    authorLink.href = `./author.html?id=${post.userId}`
    authorLink.textContent = post.user.name
    postAuthor.append('Author: ', authorLink)

    const commentsWrapper = document.createElement('div')
    const commentsHeader = document.createElement('h4')
    commentsHeader.classList.add('comments-header')
    commentsHeader.textContent = 'Comments:'
    commentsWrapper.append(commentsHeader)

    for (const comment of post.comments) {
        const commentTitle = document.createElement('h6')
        commentTitle.textContent = comment.name

        const commentBody = document.createElement('p')
        commentBody.textContent = comment.body

        const commentEmail = document.createElement('p')
        commentEmail.textContent = `Email: ${comment.email}`

        const commentDiv = document.createElement('div')
        commentDiv.append(commentTitle, commentBody, commentEmail)
        commentsWrapper.append(commentDiv)
    }

    const authorPostsLink = document.createElement('a')
    authorPostsLink.href = `./posts.html?userId=${post.userId}`
    authorPostsLink.textContent = `Other posts by ${post.user.name}`

    pageWrapper.append(postTitle, postAuthor, postContent, commentsWrapper, authorPostsLink)
}

viewPost()
