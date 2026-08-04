'use strict';


function getApi(url_github) {

  let request = new XMLHttpRequest();

  request.open("GET", url_github, false);
  request.send();

  return request.responseText;
}

function preencher(user) {
  const titulo = document.querySelector(".titulo");
  titulo.innerText = user.login;

  const image_profile = document.querySelector(".image-profile");
  image_profile.style.backgroundImage = `url(${user.avatar_url})`;

  const num_following = document.querySelector(".num_following");
  num_following.innerText = user.following;

  const num_followers = document.querySelector(".num_followers");
  num_followers.innerText = user.followers;
  
  const public_repos = document.querySelector(".public_repos");
  public_repos.innerText = user.public_repos;
  
  const nam_company = document.querySelector(".nam_company");
  nam_company.innerText = user.company;
  
  const lo_location = document.querySelector(".lo_location");
  lo_location.innerText = (user.location.slice(0, user.location.search('-')));   

}

function main() {
  let data = getApi("https://api.github.com/users/douglasabnovato");
  let repositories = JSON.parse(data);
  preencher(repositories);
}

main();

const generate = document.querySelector(".box");

function generatebkg() {
  let red = Math.floor(Math.random() * (255 - 0) + 0);
  let green = Math.floor(Math.random() * (255 - 0) + 0);
  let blue = Math.floor(Math.random() * (255 - 0) + 0);

  generate.style.background = `rgb(${red}, ${green}, ${blue} )`;
}