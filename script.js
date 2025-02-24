document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM carregado");
  
    // Controle de Login
    const loginScreen = document.getElementById("login-screen");
    const mainScreen = document.getElementById("main-screen");
  
    document.getElementById("login-btn").addEventListener("click", () => {
      console.log("Botão de login clicado");
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
      if (email === "admin@example.com" && password === "123") {
        alert("Login realizado com sucesso!");
        // Oculta o login e exibe a tela principal
        loginScreen.classList.add("hidden");
        mainScreen.classList.remove("hidden");
      } else {
        alert("E-mail ou senha incorretos!");
      }
    });
  
    // Menu Hambúrguer
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const sideMenu = document.getElementById("side-menu");
    hamburgerBtn.addEventListener("click", () => {
      sideMenu.classList.toggle("active");
    });
  
    // Navegação do Menu Lateral
    const navLinks = document.querySelectorAll("#side-menu a");
    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = link.getAttribute("data-target");
        showPage(target);
        sideMenu.classList.remove("active");
      });
    });
  
    // Função para mostrar a página desejada
    function showPage(pageId) {
      const pages = document.querySelectorAll(".page");
      pages.forEach(page => page.classList.remove("active"));
      const targetPage = document.getElementById(pageId);
      if (targetPage) {
        targetPage.classList.add("active");
      }
    }
  
    // Define a página padrão: Movimentação do Mês
    showPage("movimentacao");
  
    // Modal para Adicionar Movimentação
    const addMovBtn = document.getElementById("add-mov-btn");
    const modalAdd = document.getElementById("modal-add");
    const salvarMovBtn = document.getElementById("salvar-mov-btn");
    const cancelarMovBtn = document.getElementById("cancelar-mov-btn");
  
    addMovBtn.addEventListener("click", () => {
      modalAdd.classList.remove("hidden");
    });
  
    salvarMovBtn.addEventListener("click", () => {
      const descricao = document.getElementById("mov-descricao").value;
      const valor = parseFloat(document.getElementById("mov-valor").value);
      const tipo = document.getElementById("mov-tipo").value;
  
      if (!descricao || isNaN(valor)) {
        alert("Preencha todos os campos corretamente.");
        return;
      }
  
      const valorAjustado = tipo === "despesa" ? -Math.abs(valor) : Math.abs(valor);
  
      const novaMov = document.createElement("div");
      novaMov.classList.add("movimentacao");
      novaMov.innerHTML = `
        <span class="data">${new Date().toLocaleDateString()}</span>
        <span class="descricao">${descricao}</span>
        <span class="valor">${valorAjustado >= 0 ? "+ " : "- "}R$ ${Math.abs(valorAjustado).toFixed(2)}</span>
      `;
      document.getElementById("lista-movimentacoes").appendChild(novaMov);
  
      // Limpa os campos do modal
      document.getElementById("mov-descricao").value = "";
      document.getElementById("mov-valor").value = "";
      document.getElementById("mov-tipo").value = "despesa";
  
      modalAdd.classList.add("hidden");
    });
  
    cancelarMovBtn.addEventListener("click", () => {
      modalAdd.classList.add("hidden");
    });
  });
  