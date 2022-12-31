const posts = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
  {
    userId: 1,
    id: 4,
    title: "eum et est occaecati",
    body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
  },
  {
    userId: 1,
    id: 5,
    title: "nesciunt quas odio",
    body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
  },
];

function getPosts() {
  setTimeout(() => {
    let output = "";
    posts.forEach((post, index) => {
      output += `<li>${post.title}</li>`;
    });
    document.body.innerHTML = output;
  }, 1000);
}

function createPost(post) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      [...posts, post];

      const error = false;
      if (!error) {
        res();
      } else {
        rej("Error: Something went wrong!");
      }
    }, 2000);
  });
}

// createPost({ title: "New Post", body: "Hello from new post" })
//   .then(getPosts)
//   .catch((err) => console.log(err))
//   .finally(console.log("Done"));

//Promise.all
const promise1 = Promise.resolve("Howdy!");
const promise2 = 100;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 2000, "Goodbye!!!");
});
const promise4 = true;
const promise5 = fetch("https://jsonplaceholder.typicode.com/albums").then(
  (res) => res.json()
);

Promise.all([promise1, promise2, promise3, promise4, promise5]).then((values) =>
  console.log(values)
);
