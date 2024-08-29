import { shallowMount } from '@vue/test-utils';
import ProjetoComponent from '@/components/ProjetoComponent.vue';
import axios from 'axios';
import flushPromises from 'flush-promises';

// Mock axios
jest.mock('axios');

describe('ProjetoComponent.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpar os mocks antes de cada teste
  });

  it('deve renderizar a lista de projetos e clientes', async () => {
    // Mock data de retorno da API
    const mockProjetos = [
      { id: 1, nome: 'Projeto 1', status: 'Em andamento', cliente: { nome: 'Cliente 1' } },
      { id: 2, nome: 'Projeto 2', status: 'Concluído', cliente: { nome: 'Cliente 2' } },
    ];
    const mockClientes = [
      { id: 1, nome: 'Cliente 1' },
      { id: 2, nome: 'Cliente 2' },
    ];
    axios.get.mockImplementation((url) => {
      if (url === '/projeto') {
        return Promise.resolve({ data: mockProjetos });
      } else if (url === '/cliente') {
        return Promise.resolve({ data: mockClientes });
      }
    });

    // Montar o componente
    const wrapper = shallowMount(ProjetoComponent);

    // Esperar pela resolução das promessas
    await flushPromises();

    // Verificar se os projetos foram renderizados
    const projetos = wrapper.findAll('li');
    expect(projetos).toHaveLength(2);
    expect(projetos.at(0).text()).toContain('Projeto 1 - Status: Em andamento - Cliente: Cliente 1');
    expect(projetos.at(1).text()).toContain('Projeto 2 - Status: Concluído - Cliente: Cliente 2');

    // Verificar se os clientes foram renderizados no seletor
    const options = wrapper.findAll('select option');
    expect(options).toHaveLength(2);
    expect(options.at(0).text()).toBe('Cliente 1');
    expect(options.at(1).text()).toBe('Cliente 2');
  });

  it('deve adicionar um novo projeto', async () => {
    // Mock data de retorno da API
    const mockProjetos = [{ id: 1, nome: 'Projeto 1', status: 'Em andamento', cliente: { nome: 'Cliente 1' } }];
    axios.get.mockResolvedValueOnce({ data: mockProjetos });
    axios.post.mockResolvedValueOnce({ data: { id: 2, nome: 'Novo Projeto', status: 'Em andamento', cliente: { nome: 'Cliente 1' } } });

    // Montar o componente
    const wrapper = shallowMount(ProjetoComponent);

    // Esperar pela resolução das promessas
    await flushPromises();

    // Simular entrada e envio do formulário
    await wrapper.setData({
      novoProjeto: { nome: 'Novo Projeto', clienteId: 1 }
    });
    await wrapper.find('form').trigger('submit.prevent');

    // Verificar se a chamada para adicionar o projeto foi feita
    expect(axios.post).toHaveBeenCalledWith('/projeto', { nome: 'Novo Projeto', clienteId: 1 });

    // Esperar pela resolução das promessas
    await flushPromises();

    // Verificar se o novo projeto foi adicionado à lista
    const projetos = wrapper.findAll('li');
    expect(projetos).toHaveLength(2); // Assume que o mockProjetos já estava presente
    expect(projetos.at(1).text()).toContain('Novo Projeto - Status: Em andamento - Cliente: Cliente 1');
  });

  it('deve lidar com erros ao buscar projetos', async () => {
    // Mock erro na chamada da API
    axios.get.mockRejectedValueOnce(new Error('Erro ao buscar projetos'));

    // Montar o componente
    const wrapper = shallowMount(ProjetoComponent);

    // Esperar pela resolução das promessas
    await flushPromises();

    // Verificar que a lista de projetos permanece vazia ou lida de maneira apropriada
    expect(wrapper.vm.projetos).toEqual([]);
  });

  it('deve lidar com erros ao buscar clientes', async () => {
    // Mock erro na chamada da API
    axios.get.mockImplementation((url) => {
      if (url === '/projeto') {
        return Promise.resolve({ data: [] });
      } else if (url === '/cliente') {
        return Promise.reject(new Error('Erro ao buscar clientes'));
      }
    });

    // Montar o componente
    const wrapper = shallowMount(ProjetoComponent);

    // Esperar pela resolução das promessas
    await flushPromises();

    // Verificar que a lista de clientes permanece vazia ou lida de maneira apropriada
    expect(wrapper.vm.clientes).toEqual([]);
  });

  it('deve lidar com erros ao adicionar um projeto', async () => {
    // Mock data de retorno da API
    const mockProjetos = [{ id: 1, nome: 'Projeto 1', status: 'Em andamento', cliente: { nome: 'Cliente 1' } }];
    axios.get.mockResolvedValueOnce({ data: mockProjetos });
    axios.post.mockRejectedValueOnce(new Error('Erro ao adicionar projeto'));

    // Montar o componente
    const wrapper = shallowMount(ProjetoComponent);

    // Esperar pela resolução das promessas
    await flushPromises();

    // Simular entrada e envio do formulário
    await wrapper.setData({
      novoProjeto: { nome: 'Novo Projeto', clienteId: 1 }
    });
    await wrapper.find('form').trigger('submit.prevent');

    // Verificar que a chamada para adicionar o projeto foi feita
    expect(axios.post).toHaveBeenCalledWith('/projeto', { nome: 'Novo Projeto', clienteId: 1 });

    // Esperar pela resolução das promessas
    await flushPromises();

    // Verificar que o projeto não foi adicionado (ou tratar erro se houver lógica específica)
    const projetos = wrapper.findAll('li');
    expect(projetos).toHaveLength(1); // Deve manter o número de projetos original
  });
});
