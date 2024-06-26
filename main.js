function getItems(key) {
  const items = localStorage.getItem(key);
  return items ? JSON.parse(items) : [];
}
function setItems(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

const pessoasList = document.getElementById("pessoas-list");
const pessoasForm = document.getElementById("pessoas-form");
function renderPessoas() {
  pessoasList.innerHTML = "";
  const pessoas = getItems("pessoas");
  pessoas.forEach((pessoa, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${pessoa.nome}
      <button onclick="editPessoa(${index})">Editar</button>
      <button onclick="deletePessoa(${index})">Remover</button>
    `;
    pessoasList.appendChild(li);
  });
}
function addPessoa(event) {
  event.preventDefault();
  const nome = document.getElementById("pessoas-nome").value;
  const pessoas = getItems("pessoas");
  pessoas.push({ nome });
  setItems("pessoas", pessoas);
  renderPessoas();
  pessoasForm.reset();
}
function editPessoa(index) {
  const pessoas = getItems("pessoas");
  const pessoa = pessoas[index];
  document.getElementById("pessoas-nome").value = pessoa.nome;
  pessoasForm.onsubmit = function (event) {
    event.preventDefault();
    pessoas[index] = { nome: document.getElementById("pessoas-nome").value };
    setItems("pessoas", pessoas);
    renderPessoas();
    pessoasForm.reset();
    pessoasForm.onsubmit = addPessoa;
  };
}
function deletePessoa(index) {
  const pessoas = getItems("pessoas");
  pessoas.splice(index, 1);
  setItems("pessoas", pessoas);
  renderPessoas();
}

const carrosList = document.getElementById("carros-list");
const carrosForm = document.getElementById("carros-form");
function renderCarros() {
  carrosList.innerHTML = "";
  const carros = getItems("carros");
  carros.forEach((carro, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${carro.modelo}
      <button onclick="editCarro(${index})">Editar</button>
      <button onclick="deleteCarro(${index})">Remover</button>
    `;
    carrosList.appendChild(li);
  });
}
function addCarro(event) {
  event.preventDefault();
  const modelo = document.getElementById("carros-modelo").value;
  const carros = getItems("carros");
  carros.push({ modelo });
  setItems("carros", carros);
  renderCarros();
  carrosForm.reset();
}
function editCarro(index) {
  const carros = getItems("carros");
  const carro = carros[index];
  document.getElementById("carros-modelo").value = carro.modelo;
  carrosForm.onsubmit = function (event) {
    event.preventDefault();
    carros[index] = { modelo: document.getElementById("carros-modelo").value };
    setItems("carros", carros);
    renderCarros();
    carrosForm.reset();
    carrosForm.onsubmit = addCarro;
  };
}
function deleteCarro(index) {
  const carros = getItems("carros");
  carros.splice(index, 1);
  setItems("carros", carros);
  renderCarros();
}

renderPessoas();
renderCarros();
pessoasForm.onsubmit = addPessoa;
carrosForm.onsubmit = addCarro;
