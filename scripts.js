(function() {
  const content = document.querySelector(".content");
  const loading = document.querySelector(".loading");

  let nextPage = 1;

  function renderUsers(users) {
    users.results.map(user => {
      const userDiv = document.createElement("div");
      userDiv.classList.add("user");
      userDiv.innerHTML = user.email;
      content.appendChild(userDiv);
    });
  }

  async function getUsers(page) {
    const userData = await fetch(
      `https://randomuser.me/api/?page=${page}&results=20`
    );
    const users = await userData.json();
    return users;
  }
  function loadMoreUser() {
    const { scrollTop, clientHeight, scrollHeight } = content;
    // if scroll is at end of div
    if (scrollHeight - scrollTop === clientHeight) {
      loading.classList.add("show");
      setTimeout(async () => {
        const users = await getUsers(nextPage);
        renderUsers(users);
        loading.classList.remove("show");
        nextPage++;
      }, 1000);
    }
  }
  loadMoreUser();
  nextPage++;

  // Event listener
  content.addEventListener("scroll", loadMoreUser);
})();
