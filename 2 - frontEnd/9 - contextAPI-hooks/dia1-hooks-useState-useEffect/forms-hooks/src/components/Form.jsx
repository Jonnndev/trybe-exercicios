import { useState } from 'react';

function Form() {
  const [ name, setName ] = useState('');
  const [ age, setAge ] = useState('');
  const [ city, setCity ] = useState('');
  const [module, setModule] = useState();

  return (
    <form className='container'>
      <fieldset className='div-inputs'>
        <legend>Dados pessoais</legend>

        <label htmlFor="name">
          Nome: {' '}
          <input
            type="text"
            id="name"
            placeholder="Nome completo"
            value={ name }
            onChange={ ({ target }) => setName( target.value ) }
          />
        </label>

        <label htmlFor="age">
          Idade: {' '}
          <input
            type="number"
            id="age"
            placeholder="Idade"
            value={ age }
            onChange={ ({ target }) => setAge( target.value ) }
          />
        </label>

        <label htmlFor="city">
          Cidade: {' '}
          <input
            type="text"
            id="city"
            placeholder="Cidade"
            value={ city }
            onChange={ ({ target }) => setCity( target.value ) }
          />
        </label>
      </fieldset>

      <fieldset className='div-radio'>
        <legend>Módulos</legend>

        <label htmlFor="Fundamentos">
          <input
          type="radio"
          name="module"
          id="Fundamentos"
          value="Fundamentos"
          onChange={ ({ target }) => setModule( target.value ) }
        /> Fundamentos 
        </label>

        <label htmlFor="Front-end">
          <input
          type="radio"
          name="module"
          id="Front-end"
          value="Front-end"
          onChange={ ({ target }) => setModule( target.value ) }
        /> Front-end
        </label>

        <label htmlFor="Back-end">
          <input
          type="radio"
          name="module"
          value="Back-end"
          id="Back-end"
          onChange={ ({ target }) => setModule( target.value ) }
        /> Back-end
        </label>

        <label htmlFor="Ciência da Computação">
          <input
          type="radio"
          name="module"
          id="Ciência da Computação"
          value="Ciência da Computação"
          onChange={ ({ target }) => setModule( target.value ) }
          /> Ciência da Computação
        </label>
      </fieldset>
      <button type="submit">Enviar</button>
    </form>
  )
}

export default Form