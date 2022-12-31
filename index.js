const btn = document.querySelector("#get-users");
const btnPosts = document.querySelector("#get-posts");
const output = document.querySelector("#output");

async function getUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  console.log(data);
  let outputUsers = "";
  data.forEach((user) => (outputUsers += `${user.username} `));
  output.innerText = outputUsers;
}

async function getPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  console.log(data);
  let outputPosts = [];
  data.forEach((post) => outputPosts.push(post.title));
  output.innerText = outputPosts;
}

btn.addEventListener("click", getUsers);
btnPosts.addEventListener("click", getPosts);
