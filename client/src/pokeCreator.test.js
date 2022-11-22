/* 
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
}); */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { render, screen } from '@testing-library/react';
import {PokeCreator, validate} from './components/PokeCreator/PokeCreator';

describe('<PokeCreator />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<PokeCreator />);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('El PokeCreator deberia cambiar de estado cuando escriban en el input de nombre', () => {
    wrapper.find('input[name="nombre"]').simulate('change', {target: {name: 'nombre', value: 'NewUsr'}});
    const ele = wrapper.find('input[name="nombre"]');
    expect(ele.prop('value')).toEqual('NewUsr');
  });
  it('El PokeCreator deberia cambiar de estado cuando escriban en el input de vida', () => {
    wrapper.find('input[name="vida"]').simulate('change', {target: {name: 'vida', value: 70}});
    const ele = wrapper.find('input[name="vida"]');
    expect(ele.prop('value')).toEqual(70);
  });
  describe('Validacion: ', () => {
    it('validate debe devolver un objeto con un error si no se escribe un nombre:', () => {
      expect(validate({
        altura: 180
      })).toEqual({nombre: "Se requiere un nombre!"});
    });
    it('validate debe devolver un objeto con un error si el peso no está en rango 1 a 1500', () => {
      expect(validate({
        peso: 1750,
      })).toEqual({peso: "El peso debe estar entre un rango de 1 a 1500"});
    });
  });
});
