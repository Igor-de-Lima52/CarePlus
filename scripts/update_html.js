const fs = require('fs');
const files = ['perfil.html', 'adicionardependente.html', 'editardependente.html', 'editarsenha.html'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove the trailing broken tags left from previous script
    const regexToRemove = /<div class="perfil-nome-plano">[\s\S]*?<h2 id="topbar-name">[\s\S]*?<\/div>\s*<\/div>/g;
    
    if (regexToRemove.test(content)) {
      content = content.replace(regexToRemove, '');
      fs.writeFileSync(file, content);
      console.log('Fixed ' + file);
    }
  }
});
