const btn = document.querySelector("#get-users");
const btnPosts = document.querySelector("#get-posts");
const btnSendPost = document.querySelector("#post-send");
const btnGetProducts = document.querySelector("#get-products");
const speakBtn = document.querySelector("#to-speech");
const output = document.querySelector("#output");
const getOnePostBtn = document.querySelector("#get-one-post");
const updatePostBtn = document.querySelector("#update-post");
const deletePostBtn = document.querySelector('#delete-post');
const text = document.querySelector("#post-body").value;

function speakPost() {
  if ("speechSynthesis" in window) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
  } else {
    output.innerHTML = "Sorry your browser doesn't support text to speech";
  }
}

// gets all users
async function getUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  console.log(data);
  let outputUsers = "";
  data.forEach((user) => (outputUsers += `<li>${user.username}</li>`));
  output.innerHTML = outputUsers;
  // getting response headers from response object
  for (let [key, value] of response.headers) {
    console.log(`${key} = ${value}`);
  }
}

// gets all posts
async function getPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  console.log(data.length);
  let outputPosts = [];
  data.forEach((post) =>
    outputPosts.push(`
  <div class="card">
  <h3>${post.title}</h3>
  <p>${post.body}</p>`)
  );
  output.innerHTML = outputPosts;
}

// creates new post
function publishPost(e) {
  e.preventDefault();

  const title = document.querySelector("#post-title").value;
  const body = document.querySelector("#post-body").value;
  let id = document.querySelector("#num").value;

  if (!body && !title) {
    output.innerHTML = "Empty body or title.";
    throw new Error("Error occured");
  } else {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ title, body, id }),
    })
      .then((response) => response.json())
      .then(
        (data) =>
          (output.innerHTML = `<div class="post-body"> <h2>${data.title}</h2>  <p>${data.body}</p> <p>${data.id}</p> </div>`)
      )
      .catch((err) => console.log(err));
  }
}

// gets one post by id
const getOnePost = (e) => {
  let idx = document.querySelector("#num").value;
  e.preventDefault();
  return fetch(`https://jsonplaceholder.typicode.com/posts/${idx}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then(
      (data) =>
        (output.innerHTML = `<div class="post-body"> <h2>${data.title}</h2>  <p>${data.body}</p> <p>id: ${data.id}</p> </div>`)
    )
    .catch((err) => console.log("Error: ", err));
};

// update post
const updatePost = (e, id) => {
  let idx = document.querySelector("#num").value;
  const title = document.querySelector("#post-title").value;
  const body = document.querySelector("#post-body").value;
  e.preventDefault();
  return fetch(`https://jsonplaceholder.typicode.com/posts/${idx}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ body, title }),
  })
  .then((response) => response.json())
  .then(
    (data) =>
    (output.innerHTML = `<div class="post-body"> <h2>${data.title}</h2>  <p>${data.body}</p> <p>id: ${data.id}</p> </div>`)
    )
    .catch((err) => console.log("Error: ", err));
  };
  
  // delete one post
  const deletePost=(id)=> {
    let idx = document.querySelector("#num").value;
    return fetch(`https://jsonplaceholder.typicode.com/posts/${idx}`, {
      method: 'DELETE',
    }).then(response=> response.json())
    .then(data=> (output.innerHTML = '<div class="post-body"><p>Post has been deleted</p></div>'))
    .catch(err=> console.log('Error: ', err))
    .finally(data=>console.log('deleted'))
    

}

async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  console.log(data);
  let product = "";
  data.forEach((item) => {
    product += `
    <div class="product"> 
    <h3>${item.title}</h3>
    <p>Category: ${item.category}</p>
    <p><strong>Price: ${item.price}</strong></p>
    <p>Rating: ${item.rating.rate}</p>
    <img src="${item.image}" width=100px height=auto/>
    <hr />
    </div>`;
  });
  output.innerHTML = product;
}

btn.addEventListener("click", getUsers);
btnPosts.addEventListener("click", getPosts);
btnSendPost.addEventListener("click", publishPost);
btnGetProducts.addEventListener("click", getProducts);
speakBtn.addEventListener("click", speakPost);
getOnePostBtn.addEventListener("click", getOnePost);
updatePostBtn.addEventListener("click", updatePost);
deletePostBtn.addEventListener('click', deletePost);