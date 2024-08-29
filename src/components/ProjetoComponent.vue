<template>
    <div>
      <h1>Projetos</h1>
      <ul>
        <li v-for="projeto in projetos" :key="projeto.id">
          {{ projeto.nome }} - Status: {{ projeto.status }} - Cliente: {{ projeto.cliente.nome }}
        </li>
      </ul>
      <form @submit.prevent="addProjeto">
        <input v-model="novoProjeto.nome" placeholder="Nome do Projeto">
        <select v-model="novoProjeto.clienteId">
          <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
            {{ cliente.nome }}
          </option>
        </select>
        <button type="submit">Adicionar Projeto</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        projetos: [],
        clientes: [],
        novoProjeto: { nome: '', clienteId: '' },
      };
    },
    created() {
      this.getProjetos();
      this.getClientes();
    },
    methods: {
      getProjetos() {
        axios.get('/projeto')
          .then(response => {
            this.projetos = response.data;
          })
          .catch(error => {
            console.error("Erro ao buscar projetos", error);
          });
      },
      getClientes() {
        axios.get('/cliente')
          .then(response => {
            this.clientes = response.data;
          })
          .catch(error => {
            console.error("Erro ao buscar clientes", error);
          });
      },
      addProjeto() {
        axios.post('/projeto', this.novoProjeto)
          .then(() => {
            this.getProjetos();
            this.novoProjeto.nome = '';
            this.novoProjeto.clienteId = '';
          })
          .catch(error => {
            console.error("Erro ao adicionar projeto", error);
          });
      }
    }
  };
  </script>
  