async function getUsersAndPosts() {

  const res = await fetch('https://jsonplaceholder.typicode.com/users?_embed=posts')
  const users = await res.json()

  const pageWrapper = document.querySelector('#page-content')
  const userList = document.createElement('ul')
  userList.classList.add('users-list')

  pageWrapper.append(userList)

  for (const user of users) {
    const postCount = user.posts.length

    const userItem = document.createElement('li')
    userItem.classList.add('user-item')

    const userLink = document.createElement('a')
    userLink.textContent = `${user.name} (${postCount})`
    userLink.href = `./user.html?id=${user.id}`;
    userItem.append(userLink)

    userList.append(userItem)
  }
}

getUsersAndPosts();
