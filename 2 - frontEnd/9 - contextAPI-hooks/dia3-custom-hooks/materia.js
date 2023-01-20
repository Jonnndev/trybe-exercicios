// CUSTOM HOOKS

// Até a criação dos Hooks, não tínhamos uma forma definitiva de fazermos isso. Após a introdução dos Custom Hooks, podemos reutilizar lógica entre diferentes componentes, sem repetição de código.

// ================ Nomenclatura ================ //

// Sempre iniciar com "use", pois sempre se refere a uma hook. useMyCustomHook

// Custom hooks só podem ser usadas dentro de componentes react funcionais.

// Necessariamente é preciso usar outras hooks (como useState e/ou useEffect) dentro de ser escopo para ser considerado uma custom Hook.

// ================ Criando uma custom Hook ================ //

// /src/hooks/useFormInput.js

import { useState } from 'react';

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return {
    value: value,
    onChange: handleChange,
  };
}

export default useFormInput;

// Repare que o Custom Hook useFormInput nos retorna um objeto { value: value, onChange: handleChange } que poderá ser utilizado no formulário do componente App como também em outros componentes:

// A chave value será responsável por armazenar o valor digitado nos inputs;
// A chave onChange será a responsável por capturar e escrever na chave value os valores digitados no input.

// App.js

// ...

import useFormInput from './hooks/useFormInput';

// function App() {
const firstName = useFormInput('');
const lastName = useFormInput('');
const email = useFormInput('');

//   function handleSubmit(e) {
//     e.preventDefault();

//     Swal.fire(
//       'Formulário enviado',
//       JSON.stringify({
firstName: firstName.value,
  lastName: lastName.value,
    email: email.value,
//       }),
//       'success'
//     );
//   }

  // return (
  //   <div className="container">
  //     <form onSubmit={handleSubmit}>
  //       <label>
  //         First name:
          <input value={firstName.value} onChange={firstName.onChange} />
        // </label>
        // <label>
        //   Last name:
          <input value={lastName.value} onChange={lastName.onChange} />
        // </label>
        // <label>
        //   E-mail:
          <input value={email.value} onChange={email.onChange} />
//         </label>
//         <button type="submit">Submeter formulário</button>
//       </form>
//     </div>
//   );
// }

// export default App;

// A grande vantagem de ter um Hook Customizado é que podemos reaproveitar a mesma lógica para diversos componentes, dessa forma, se precisarmos adicionar mais inputs no nosso formulário, podemos continuar usando o useFormInput. Podemos usar o useFormInput até mesmo em outros formulários dentro de nosso aplicação.

//Para apagar o formulário após o envio:

// crie uma função clear na Hook:

import { useState } from 'react';

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function clear() {
    setValue('')
  }

  return {
    value: value,
    onChange: handleChange,
    clear,
  };
}

// E no componente complemente:

//   function handleSubmit(e) {
//     e.preventDefault();

//     Swal.fire(
//       'Formulário enviado',
//       JSON.stringify({
// firstName: firstName.value,
// lastName: lastName.value,
//   email: email.value,
//       }),
//       'success'
//     );
firstName.clear();
lastNAme.clear();
email.clear();
//   }


