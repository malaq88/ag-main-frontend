<template>
    <div>
      <h1>Atividades</h1>
      <ul>
        <li v-for="atividade in atividades" :key="atividade.id">
          {{ atividade.descricao }} - Projeto: {{ atividade.projeto.nome }}
        </li>
      </ul>
      <form @submit.prevent="addAtividade">
        <input v-model="novaAtividade.descricao" placeholder="Descrição da Atividade">
        <select v-model="novaAtividade.projetoId">
          <option v-for="projeto in projetos" :key="projeto.id" :value="projeto.id">
            {{ projeto.nome }}
          </option>
        </select>
        <button type="submit">Adicionar Atividade</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        atividades: [],
        projetos: [],
        novaAtividade: { descricao: '', projetoId: '' },
      };
    },
    created() {
      this.getAtividades();
      this.getProjetos();
    },
    methods: {
      getAtividades() {
        axios.get('/atividade')
          .then(response => {
            this.atividades = response.data;
          })
          .catch(error => {
            console.error("Erro ao buscar atividades", error);
          });
      },
      getProjetos() {
        axios.get('/projeto')
          .then(response => {
            this.projetos = response.data;
          })
          .catch(error => {
            console.error("Erro ao buscar projetos", error);
          });
      },
      addAtividade() {
        axios.post('/atividade', this.novaAtividade)
          .then(() => {
            this.getAtividades();
            this.novaAtividade.descricao = '';
            this.novaAtividade.projetoId = '';
          })
          .catch(error => {
            console.error("Erro ao adicionar atividade", error);
          });
      }
    }
  };
  </script>
  