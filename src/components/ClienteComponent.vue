<template>
    <div>
      <h1>Clientes</h1>
      <ul>
        <li v-for="cliente in clientes" :key="cliente.id">{{ cliente.nome }}</li>
      </ul>
      <form @submit.prevent="addCliente">
        <input v-model="novoCliente.nome" placeholder="Nome do Cliente">
        <button type="submit">Adicionar Cliente</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        clientes: [],
        novoCliente: { nome: '' },
      };
    },
    created() {
      this.getClientes();
    },
    methods: {
      getClientes() {
        axios.get('/cliente')
          .then(response => {
            this.clientes = response.data;
          })
          .catch(error => {
            console.error("Erro ao buscar clientes", error);
          });
      },
      addCliente() {
        axios.post('/cliente', this.novoCliente)
          .then(() => {
            this.getClientes();
            this.novoCliente.nome = '';
          })
          .catch(error => {
            console.error("Erro ao adicionar cliente", error);
          });
      }
    }
  };
  </script>
  