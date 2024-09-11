const { select, input } = require('@inquirer/prompts')

let meta = {
  value: 'Exercitar 1h todo dia',
  checked: false,
}

let metas = [meta]

async function cadastrarMeta() {
  const meta = await input({ message: "Digite a meta: " })

  if (meta.length == 0) {
    console.log("A meta está vazia.")
    return
  }

  metas.push({ value: meta, checked: false })
}
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
        await cadastrarMeta()
        console.log(metas)
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