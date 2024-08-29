import { shallowMount } from '@vue/test-utils';
import AtividadeComponent from '@/components/AtividadeComponent.vue';
import axios from 'axios';
import flushPromises from 'flush-promises';

// Mock axios
jest.mock('axios');

describe('AtividadeComponent.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpar os mocks antes de cada teste
  });

  it('deve renderizar a lista de atividades e projetos', async () => {
    // Mock data de retorno da API
    const mockAtividades = [
      { id: 1, descricao: 'Atividade 1', projeto: { nome: 'Projeto 1' } },
      { id: 2, descricao: 'Atividade 2', projeto: { nome: 'Projeto 2' } },
    ];
    const mockProjetos = [
      { id: 1, nome: 'Projeto 1' },
      { id: 2, nome: 'Projeto 2' },
    ];
    axios.get.mockImplementation((url) => {
      if (url === '/atividade') {
        return Promise.resolve({ data: mockAtividades });
      } else if (url === '/projeto') {
        return Promise.resolve({ data: mockProjetos });
      }
    });

    // Montar o componente
    const wrapper = shallowMount(AtividadeComponent);

    // Esperar pela resolução das promessas
    await flushPromises();

    // Verificar se as atividades foram renderizadas
    const atividades = wrapper.findAll('li');
    expect(atividades).toHaveLength(2);
    expect(atividades.at(0).text()).toContain('Atividade 1 - Projeto: Projeto 1');
    expect(atividades.at(1).text()).toContain('Atividade 2 - Projeto: Projeto 2');

    // Verificar se os projetos foram renderizados no seletor
    const options = wrapper.findAll('select option');
    expect(options).toHaveLength(2);
    expect(options.at(0).text()).toBe('Projeto 1');
    expect(options.at(1).text()).toBe('Projeto 2');
  });

  it('deve adicionar uma nova atividade', async () => {
    // Mock data de retorno da API
    const mockAtividades = [{ id: 1, descricao: 'Atividade 1', projeto: { nome: 'Projeto 1' } }];
    axios.get.mockResolvedValueOnce({ data: mockAtividades });
    axios.post.mockResolvedValueOnce({ data: { id: 2, descricao: 'Nova Atividade', projeto: { nome: 'Projeto 1' } } });

    // Montar o componente
    const wrapper = shallowMount(AtividadeComponent);

    // Esperar pela resolução das promessas
    await flushPromises();

    // Simular entrada e envio do formulário
    await wrapper.setData({
      novaAtividade: { descricao: 'Nova Atividade', projetoId: 1 }
    });
    await wrapper.find('form').trigger('submit.prevent');

    // Verificar se a chamada para adicionar a atividade foi feita
    expect(axios.post).toHaveBeenCalledWith('/atividade', { descricao: 'Nova Atividade', projetoId: 1 });

    // Esperar pela resolução das promessas
    await flushPromises();

    // Verificar se a nova atividade foi adicionada à lista
    const atividades = wrapper.findAll('li');
    expect(atividades).toHaveLength(2); // Assume que o mockAtividades já estava presente
    expect(atividades.at(1).text()).toContain('Nova Atividade - Projeto: Projeto 1');
  });

  it('deve lidar com erros ao buscar atividades', async () => {
    // Mock erro na chamada da API
    axios.get.mockRejectedValueOnce(new Error('Erro ao buscar atividades'));

    // Montar o componente
    const wrapper = shallowMount(AtividadeComponent);

    // Esperar pela resolução das promessas
    await flushPromises();

    // Verificar que a lista de atividades permanece vazia ou lida de maneira apropriada
    expect(wrapper.vm.atividades).toEqual([]);
  });

  it('deve lidar com erros ao buscar projetos', async () => {
    // Mock erro na chamada da API
    axios.get.mockImplementation((url) => {
      if (url === '/atividade') {
        return Promise.resolve({ data: [] });
      } else if (url === '/projeto') {
        return Promise.reject(new Error('Erro ao buscar projetos'));
      }
    });

    // Montar o componente
    const wrapper = shallowMount(AtividadeComponent);

    // Esperar pela resolução das promessas
    await flushPromises();

    // Verificar que a lista de projetos permanece vazia ou lida de maneira apropriada
    expect(wrapper.vm.projetos).toEqual([]);
  });

  it('deve lidar com erros ao adicionar uma atividade', async () => {
    // Mock data de retorno da API
    const mockAtividades = [{ id: 1, descricao: 'Atividade 1', projeto: { nome: 'Projeto 1' } }];
    axios.get.mockResolvedValueOnce({ data: mockAtividades });
    axios.post.mockRejectedValueOnce(new Error('Erro ao adicionar atividade'));

    // Montar o componente
    const wrapper = shallowMount(AtividadeComponent);

    // Esperar pela resolução das promessas
    await flushPromises();

    // Simular entrada e envio do formulário
    await wrapper.setData({
      novaAtividade: { descricao: 'Nova Atividade', projetoId: 1 }
    });
    await wrapper.find('form').trigger('submit.prevent');

    // Verificar que a chamada para adicionar a atividade foi feita
    expect(axios.post).toHaveBeenCalledWith('/atividade', { descricao: 'Nova Atividade', projetoId: 1 });

    // Esperar pela resolução das promessas
    await flushPromises();

    // Verificar que a atividade não foi adicionada (ou tratar erro se houver lógica específica)
    const atividades = wrapper.findAll('li');
    expect(atividades).toHaveLength(1); // Deve manter o número de atividades original
  });
});
