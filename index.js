const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises

let mensagem = "Bem vindo ao App de metas";

let metas

async function carregarMetas() {
  try {
    const dados = await fs.readFile("metas.json", "utf-8")
    metas = JSON.parse(dados)
  }
  catch (erro) {
    metas = []
  }
}

async function salvarMetas() {
  await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

async function cadastrarMeta() {
  const meta = await input({ message: "Digite a meta: " })

  if (meta.length == 0) {
    mensagem = "A meta está vazia."
    return
  }

  metas.push({ value: meta, checked: false })

  mensagem = "Meta cadastrada com sucesso"
}
async function listarMetas() {
  if(metas.length == 0) {
    mensagem = "Não existem metas"
    return
  }

  const respostas = await checkbox({
    message: "Use as setas para mudar de metas, espaço para marcar ou desmarcar, e Enter para finalizar essa etapa.",
    choices: [...metas],
    instructions: false,
  })

  metas.forEach((m) => [
    m.checked = false
  ])

  if (respostas.length == 0) {
    mensagem = "Nenhuma meta selecionada."
    return
  }

  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta
    })

    meta.checked = true
  })

  mensagem = "Meta(s) marcada(s) como concluída(s)"
}
async function metasRealizadas() {
  if(metas.length == 0) {
    mensagem = "Não existem metas"
    return
  }
  
  const realizadas = metas.filter((meta) => {
    return meta.checked
  })

  if (realizadas.length == 0) {
    mensagem = "Não existem metas concluídas"
    return
  }

  await select({
    message: "Metas concluídas: " + realizadas.length,
    choices: [...realizadas]
  })
}
async function metasAbertas() {
  if(metas.length == 0) {
    mensagem = "Não existem metas"
    return
  }
  
  const abertas = metas.filter((meta) => {
    return !meta.checked
    // ou return meta.checked != true
  })

  if (abertas.length == 0) {
    mensagem = "Não existem metas abertas."
    return
  }

  await select({
    message: "Metas abertas: " + abertas.length,
    choices: [...abertas]
  })
}
async function deletarMetas() {
  if(metas.length == 0) {
    mensagem = "Não existem metas"
    return
  }
  
  const metasDesmarcadas = metas.map((meta) => {
    return { value: meta.value, checked: false }
  })

  const paraDeletar = await checkbox({
    message: "Selecione a meta para deletar",
    choices: [...metasDesmarcadas],
    instructions: false,
  })

  if (paraDeletar.length == 0) {
    mensagem = "Nenhuma meta para deletar."
    return
  }

  paraDeletar.forEach((item) => {
    metas = metas.filter((meta) => {
      return meta.value != item
    })
  })

  mensagem = "Meta(s) deletada(s) com sucesso."
}
function limparMsg() {
  console.clear();

  if (mensagem != "") {
    console.log(mensagem)
    console.log("")
    mensagem = ""
  }
}
// pode ser escrito como arrow function : const start = async () => {}
async function start() {
  await carregarMetas()

  while (true) {
    limparMsg()
    await salvarMetas()
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
          name: "Metas abertas",
          value: "abertas"
        },
        {
          name: "Metas para deletar",
          value: "deletar"
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
        break
      case "lista":
        await listarMetas()
        break
      case "realizadas":
        await metasRealizadas()
        break
      case "abertas":
        await metasAbertas()
        break
      case "deletar":
        await deletarMetas()
        break
      case "sair":
        console.log("Saindo")
        return
    }
  }
}

start()