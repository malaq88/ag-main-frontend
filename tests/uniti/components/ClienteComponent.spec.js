import { shallowMount } from '@vue/test-utils';
import ClienteComponent from '@/components/ClienteComponent.vue';
import axios from 'axios';
import flushPromises from 'flush-promises';

// Mock axios
jest.mock('axios');

describe('ClienteComponent.vue', () => {
  it('deve renderizar lista de clientes', async () => {
    // Mock data de retorno da API
    const mockClientes = [
      { id: 1, nome: 'Cliente 1' },
      { id: 2, nome: 'Cliente 2' },
    ];
    axios.get.mockResolvedValue({ data: mockClientes });

    // Montar o componente
    const wrapper = shallowMount(ClienteComponent);

    // Esperar pela resolução das promessas
    await flushPromises();

    // Verificar se os clientes foram renderizados
    const clientes = wrapper.findAll('li');
    expect(clientes).toHaveLength(2);
    expect(clientes.at(0).text()).toBe('Cliente 1');
    expect(clientes.at(1).text()).toBe('Cliente 2');
  });

  it('deve adicionar um novo cliente', async () => {
    // Mock data de retorno da API
    const mockClientes = [{ id: 1, nome: 'Cliente 1' }];
    axios.get.mockResolvedValue({ data: mockClientes });
    axios.post.mockResolvedValue({ data: { id: 2, nome: 'Cliente 2' } });

    // Montar o componente
    const wrapper = shallowMount(ClienteComponent);

    // Esperar pela resolução das promessas
    await flushPromises();

    // Simular input e envio do formulário
    const input = wrapper.find('input');
    input.setValue('Cliente 2');
    await wrapper.find('form').trigger('submit.prevent');

    // Verificar se o novo cliente foi adicionado
    expect(axios.post).toHaveBeenCalledWith('/cliente', { nome: 'Cliente 2' });
    await flushPromises();
    const clientes = wrapper.findAll('li');
    expect(clientes).toHaveLength(2);
    expect(clientes.at(1).text()).toBe('Cliente 2');
  });
});
