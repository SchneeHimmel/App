const { select, input, checkbox } = require('@inquirer/prompts')

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
async function listarMetas() {
  const respostas = await checkbox({
    message: "Use as setas para mudar de metas, espaço para marcar ou desmarcar, e Enter para finalizar essa etapa.",
    choices: [...metas],
    instructions: false,
  })

  metas.forEach((m) => [
    m.checked = false
  ])

  if (respostas.length == 0) {
    console.log("Nenhuma meta selecionada.")
    return
  }

  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta
    })

    meta.checked = true
  })

  console.log('Meta(s) marcadas como concluída(s)')
}
async function metasRealizadas() {
  const realizadas = metas.filter((meta) => {
    return meta.checked
  })
  
  if(realizadas.length == 0) {
    console.log("Não existem metas concluídas")
    return
  }

  await select ({
    message: "Metas concluídas",
    choices: [...realizadas]
  })
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
          name: "Metas realizadas",
          value: "realizadas"
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
        await listarMetas()
        console.log("Mostrando a lista")
        break
      case "realizadas":
        await metasRealizadas()
        break
      case "sair":
        console.log("Saindo")
        return
    }
  }
}

start()