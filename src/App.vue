<template>
  <div id="app">
    <h1>Gestão de Projetos</h1>
    <ClienteComponent />
    <ProjetoComponent />
    <AtividadeComponent />
  </div>
</template>

<script>
import ClienteComponent from './components/ClienteComponent.vue';
import ProjetoComponent from './components/ProjetoComponent.vue';
import AtividadeComponent from './components/AtividadeComponent.vue';

export default {
  components: {
    ClienteComponent,
    ProjetoComponent,
    AtividadeComponent,
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
