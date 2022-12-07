const init = () => {

const ul = document.getElementById('user-list');
const listUser = document.createElement('li');
const listRepo = document.createElement('li');
const inputForm = document.querySelector('form');
const userlist = document.getElementById('user-list')
const reposlist = document.getElementById('repos-list')

if (inputForm){
inputForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.querySelector('input#search');

const url = `https://api.github.com/search/users?q=${input.value}`;

//Now using the Fetch API, call the GitHub API using fetch() with url as the argument:
fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json'
    }
  })
.then((response) => {
    return response.json();
  })
  .then((data) => {
    let githubUsers = data;

    //   For each githubUser in githubUsers, create a list item that displays their name
    function loop() {
    githubUsers.forEach(renderUsers);
    }
    

    function renderUsers(githubUser) {
        let liUser = document.createElement('li');
        let liRepo = document.createElement('li');
        let username = document.createElement('h2');
        let avatar = document.createElement('span');
        let link = document.createElement('span');

        // using string interpolation to add the username, avatar and link
        username.innerHTML = `${githubUser.login}`;
        avatar.innerHTML = `${githubUser.avatar_url}`;
        link.innerHTML = `${githubUser.html_url}`;

        // Add the users repository to the DOM
        let repos = document.getElementById('repos-list');
        repos.addEventListener('click', () => {
            liRepo.innerHTML = `${githubUser.repos_url}`;
        })
        .catch(function(error) {
            console.log(error);
          });

        // connect these DOM elements with appendChild
        li.appendChild(username);
        li.appendChild(avatar);
        li.appendChild(link);
        listRepo.appendChild(liRepo);
        listUser.appendChild(liUser);
    }
      });
  })
};

  userlist.appendChild(listUser);
  reposlist.appendChild(listRepo);
}

  document.addEventListener('DOMContentLoaded', init);