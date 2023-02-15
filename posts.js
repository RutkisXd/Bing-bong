const pageWrapper = document.querySelector('#page-content')

async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_expand=user&_embed=comments')
  const posts = await res.json()

  const postList = document.createElement('ul')
  postList.classList.add('posts-list')

  pageWrapper.append(postList)

  for (const post of posts) {
    const comments = post.comments
    const userName = post.user.name

    const postItem = document.createElement('li')
    postItem.classList.add('post-item')
    postItem.innerHTML = `
      <a href="./user.html?id=${post.userId}">${userName}</a>
      <span class="post-comments-count">${comments.length} comments</span>
      <a href="./post.html?id=${post.id}">${post.title}</a>
    `

    postList.append(postItem)
  }
}

getPosts()
