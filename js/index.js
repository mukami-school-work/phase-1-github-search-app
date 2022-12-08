const init = () => {

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

      // For each githubUser in githubUsers, create a list item that displays their name
    githubUsers.items.forEach( (githubUser) =>{

        let username = document.createElement('h2');
        let avatar = document.createElement('div');
        let link = document.createElement('p');
        let repositories = document.createElement('button')

        // using string interpolation to add the username, avatar and link
        username.innerHTML = `${githubUser.login}`;
        avatar.innerHTML =`<img src = "${githubUser.avatar_url}"/>`;
        link.innerHTML = `${githubUser.html_url}`;
        repositories.innerHTML = "Repositories";
        repositories.style='margin-bottom: 10px'
        avatar.style='margin-bottom: 50px, width: 50px, height: 50px'


        userlist.appendChild(username);
        userlist.appendChild(link);
        userlist.appendChild(repositories);
        userlist.appendChild(avatar);

                   // Add the users repository to the DOM
                   
                   repositories.addEventListener('click', () => {
                     fetch(githubUser.repos_url, {
                       method: 'GET',
                       header:{
                            'Content-Type': 'application/json',
                             Accept: 'application/vnd.github.v3+json'
                             }
                             })
                               .then(response => response.json())
                                   .then(data => { data.forEach(githubUser => {
                                       let repoCard = document.createElement('li')
                                       repoCard.innerHTML = `
                                           <h4> ${githubUser.name} </h4>
                                           <p> ${githubUser.html_url}</p>
                                       `
                                       reposlist.appendChild(repoCard)    
                                   });
                               });
                         })
        })
      })

    });
 
  }
};

  document.addEventListener('DOMContentLoaded', init);