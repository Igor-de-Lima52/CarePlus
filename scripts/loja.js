// ==========================================
//  CarePlus - loja.js
// ==========================================

// ---------- USUÁRIO LOGADO ----------

const currentAccount = getLoggedAccount();

if (!currentAccount) {
    window.location.href = 'index.html';
} else {
    document.getElementById('user-name').textContent = currentAccount.name;
    document.getElementById('user-points').textContent = currentAccount.pontos.toLocaleString('pt-BR') + ' pts';
    document.getElementById('topbar-points').textContent = '⭐ ' + currentAccount.pontos.toLocaleString('pt-BR') + ' pts';

    const pontos = currentAccount.pontos;
    let tier = 'Membro Bronze';
    if (pontos >= 5000) tier = 'Membro Gold';
    else if (pontos >= 1000) tier = 'Membro Prata';
    document.getElementById('user-tier').textContent = tier;
}

function sair() {
    clearSession();
    window.location.href = 'index.html';
}

let currentItem = null;

// ---------- DADOS ----------

const produtos = [
  { nome: "Anador 500mg",    preco: 300, imagem: "assets/Anador.png",   desc: "Analgésico para dores leves a moderadas." },
  { nome: "Anador 500mg",    preco: 300, imagem: "assets/Anador.png",   desc: "Analgésico para dores leves a moderadas." },
  { nome: "Anador 500mg",    preco: 300, imagem: "assets/Anador.png",   desc: "Analgésico para dores leves a moderadas." },
  { nome: "Anador 500mg",    preco: 300, imagem: "assets/Anador.png",   desc: "Analgésico para dores leves a moderadas." },
  { nome: "Anador 500mg",    preco: 300, imagem: "assets/Anador.png",   desc: "Analgésico para dores leves a moderadas." },
  { nome: "Tadalafila 20mg", preco: 600, imagem: "assets/tadafila.png", desc: "Uso sob prescrição médica." },
  { nome: "Anador 500mg",    preco: 300, imagem: "assets/Anador.png",   desc: "Analgésico para dores leves a moderadas." },
  { nome: "Anador 500mg",    preco: 300, imagem: "assets/Anador.png",   desc: "Analgésico para dores leves a moderadas." },
  { nome: "Anador 500mg",    preco: 300, imagem: "assets/Anador.png",   desc: "Analgésico para dores leves a moderadas." },
  { nome: "Anador 500mg",    preco: 300, imagem: "assets/Anador.png",   desc: "Analgésico para dores leves a moderadas." },
];

const cupons = [
  { nome: "Cupom Consulta", preco: 2000, precoAntigo: 2500, imagem: "assets/cupom_desconto.png", desc: "Válido para consultas na rede credenciada CarePlus." },
  { nome: "Cupom Consulta", preco: 2000, precoAntigo: 2500, imagem: "assets/cupom_desconto.png", desc: "Válido para consultas na rede credenciada CarePlus." },
  { nome: "Cupom Consulta", preco: 2000, precoAntigo: 2500, imagem: "assets/cupom_desconto.png", desc: "Válido para consultas na rede credenciada CarePlus." },
];

// ---------- RENDERIZAR PRODUTOS ----------

const containerProdutos = document.getElementById("produtos");
document.getElementById("total-produtos").textContent = produtos.length + " itens";

produtos.forEach(produto => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${produto.imagem}" alt="${produto.nome}">
    <h3>${produto.nome}</h3>
    <p>${produto.preco} pts</p>
  `;

  card.addEventListener("click", () => abrirModal(produto));
  containerProdutos.appendChild(card);
});

// ---------- RENDERIZAR CUPONS ----------

const containerCupons = document.getElementById("cupons");
document.getElementById("total-cupons").textContent = cupons.length + " disponíveis";

cupons.forEach(cupom => {
  const card = document.createElement("div");
  card.classList.add("card-cupom");

  card.innerHTML = `
    <img src="${cupom.imagem}" alt="${cupom.nome}">
    <p class="nome">${cupom.nome}</p>
    <p class="preco-antigo">${cupom.precoAntigo} pts</p>
    <p class="preco">${cupom.preco} pts</p>
  `;

  card.addEventListener("click", () => abrirModal(cupom));
  containerCupons.appendChild(card);
});

// ---------- FILTRO POR CATEGORIA ----------

function filtrarCategoria(categoria) {
  const secProdutos = document.getElementById("sec-produtos");
  const secCupons  = document.getElementById("sec-cupons");
  const secOferta  = document.getElementById("sec-oferta");

  if (categoria === "todos") {
    secOferta.style.display   = "";
    secProdutos.style.display = "";
    secCupons.style.display   = "";
  } else if (categoria === "medicamentos") {
    secOferta.style.display   = "";
    secProdutos.style.display = "";
    secCupons.style.display   = "none";
  } else if (categoria === "cupons") {
    secOferta.style.display   = "none";
    secProdutos.style.display = "none";
    secCupons.style.display   = "";
  }
}

// ---------- BUSCAR PRODUTO ----------

function buscarProduto(texto) {
  const termo = texto.toLowerCase();
  containerProdutos.innerHTML = "";

  const resultado = produtos.filter(p => p.nome.toLowerCase().includes(termo));

  resultado.forEach(produto => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>${produto.preco} pts</p>
    `;

    card.addEventListener("click", () => abrirModal(produto));
    containerProdutos.appendChild(card);
  });
}

// ---------- MODAL ----------

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalNome = document.getElementById("modal-nome");
const modalDesc = document.getElementById("modal-desc");
const modalPreco = document.getElementById("modal-preco");

function abrirModal(item) {
  currentItem = item;
  modalImg.src = item.imagem;
  modalNome.textContent = item.nome;
  modalDesc.textContent = item.desc;
  modalPreco.textContent = item.preco + " pts";
  modal.style.display = "flex";
}

function resgatarItem() {
  if (!currentItem) return;

  const accounts = getAccounts();
  const account = accounts.find(a => a.email === getSession());
  if (!account) return;

  if (account.pontos < currentItem.preco) {
    mostrarAviso('❌ Pontos insuficientes!');
    fecharModal();
    return;
  }

  account.pontos -= currentItem.preco;
  setCookie('careplus_accounts', accounts, 30);

  document.getElementById('user-points').textContent = account.pontos.toLocaleString('pt-BR') + ' pts';
  document.getElementById('topbar-points').textContent = '⭐ ' + account.pontos.toLocaleString('pt-BR') + ' pts';

  fecharModal();
  mostrarAviso('✅ Item resgatado!');
}

function fecharModal() {
  modal.style.display = "none";
}

modal.addEventListener("click", (e) => {
  if (e.target === modal) fecharModal();
});

// ---------- SIDEBAR ----------

function setAtivo(elemento) {
  document.querySelectorAll(".menu-item").forEach(item => item.classList.remove("ativo"));
  elemento.classList.add("ativo");
}

// ---------- TOAST ----------

let timerAviso;

function mostrarAviso(mensagem) {
  const toast = document.getElementById("toast");
  toast.textContent = mensagem;
  toast.classList.add("visivel");
  clearTimeout(timerAviso);
  timerAviso = setTimeout(() => toast.classList.remove("visivel"), 2800);
}