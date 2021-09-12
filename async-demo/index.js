console.log("Before");
getUser(1, (user) => {
  getRepository(user.githubUserName, (data) => {});
});
console.log("After");

function displayCommits(commits) {
  console.log(commits);
}

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database");
    callback({ id: id, githubUserName: "mosh" });
  }, 2000);
}

function getRepository(username, callback) {
  setTimeout(() => {
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}
