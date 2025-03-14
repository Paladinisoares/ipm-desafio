document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let formMessage = document.getElementById("form-message");

    if (name === "" || email === "" || message === "") {
      formMessage.textContent = "Por favor, preencha todos os campos.";
      formMessage.style.color = "red";
      return;
    }

    formMessage.textContent = "Mensagem enviada com sucesso!";
    formMessage.style.color = "green";

    document.getElementById("contact-form").reset();
  });

let currentPage = 1;

document
  .getElementById("users-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    currentPage = 1;
    fetchUsers(currentPage);
  });

function fetchUsers(page) {
  fetch(`https://ipm-desafio.onrender.com/users?page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      let userList = document.getElementById("user-list");
      userList.innerHTML = "";
      data.users.forEach((user) => {
        let userItem = document.createElement("div");
        userItem.classList.add("user-item");
        userItem.innerHTML = `
                  <img src="${user.picture}" alt="Foto de ${user.name}">
                  <p><strong>Nome:</strong> ${user.name}</p>
                  <p><strong>Email:</strong> ${user.email}</p>
              `;
        userList.appendChild(userItem);
      });

      let pagination = document.getElementById("pagination");
      pagination.innerHTML = `
              <button onclick="changePage(-1)" ${
                page === 1 ? "disabled" : ""
              }>Anterior</button>
              <span>Página ${page}</span>
              <button onclick="changePage(1)">Próxima</button>
          `;
    })
    .catch((error) => console.error("Erro ao buscar usuários:", error));
}

function changePage(step) {
  currentPage += step;
  fetchUsers(currentPage);
}
