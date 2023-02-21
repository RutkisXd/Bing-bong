function init() {

}

async function createPost() {
    const title = document.querySelector('.post-title')
    const body = document.querySelector('.post-body')
    const selectElement = document.querySelector('.author-select')
    const form = document.querySelector('.create-post-form')

    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await res.json()
  
    const pageWrapper = document.querySelector('#page-content')
  
    for (const user of users) {
      const userItem = document.createElement('option')
      userItem.textContent = user.name
      userItem.value = user.id
      userItem.classList.add('users-list')
      selectElement.append(userItem)
    }

    form.prepend(selectElement)
    pageWrapper.append(form)
}

createPost()

init()