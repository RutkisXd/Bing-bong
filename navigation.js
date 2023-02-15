let navigationArr = [
    {
        name: 'Home',
        src: './index.html'
    },
    {
        name: 'Users',
        src: './users.html'
    },
    {
        name: 'Posts',
        src: './posts.html'
    },
    {
        name: 'Albums',
        src: './albums.html'
    }
]

function navigation() {
    let navigationList = document.createElement('div')
    const pageWrapper = document.querySelector('#page-content')

    navigationArr.map(arr => {
        let linkElement = document.createElement('a')
        linkElement.href = arr.src

        let link = document.createTextNode(arr.name)
        linkElement.append(link)
        linkElement.classList.add('navigation-item', 'active')
    
        navigationList.append(linkElement)
        pageWrapper.before(navigationList)
    })

}

navigation(navigationArr)