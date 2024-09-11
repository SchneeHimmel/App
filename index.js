const { select } = require('@inquirer/prompts')

// pode ser escrito como arrow function : const start = async () => {}
async function start() {
  while (true) {

    // const name = await promise
    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar meta",
          value: "cadastro"
        },
        {
          name: "Listar metas",
          value: "lista"
        },
        {
          name: "Sair",
          value: "sair"
        }
      ]
    })

    switch (opcao) {
      case "cadastro":
        console.log("Cadastre as metas")
        break
      case "lista":
        console.log("Mostrando a lista")
        break
      case "sair":
        console.log("Saindo")
        return
    }
  }
}

start()