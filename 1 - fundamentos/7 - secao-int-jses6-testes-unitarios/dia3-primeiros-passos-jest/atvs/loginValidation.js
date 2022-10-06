// // loginValidation.js
// const greetingMessage = (user) => {
//   return `Hello, ${user}! Que bom ter você de volta`;
// };

// const loginErrorMessage = (user) => {
//   return `Pessoa usuária '${user}' não encontrada, tente novamente!`;
// };

// const user = {
//   userName: "Joana",
//   password: 123456,
// };

// const verifyCredentials = ({ userName, password }) => {
//   if (password === 123456 && userName === "Joana") {
//     return greetingMessage(userName);
//   } else {
//     return loginErrorMessage(userName);
//   }
// };

// const { userName, password } = user;

// module.exports = { greetingMessage, loginErrorMessage, verifyCredentials }

// loginValidation.test.js

// const {
//   greetingMessage,
//   loginErrorMessage,
//   verifyCredentials,
// } = require("./loginValidation.js");

// describe("Testa a função verifyCredentials()", () => {
  
//   it("verifyCredentials() chama a função correta dependendo do valor de userName e password", () => {
    
//     const user = {
//       userName: 'Bob',
//       password: 123456,
//     };
      
//     const { userName, password } = user;

//     expect(verifyCredentials({ userName, password })).toBe(
//       "Hello, Joana! Que bom ter você de volta"
//     ); 
//   });

//   it("greetingMessage() retorna uma mensagem no formato: `Hello, ${user}! Que bom ter você de volta`", () => {
//     expect(greetingMessage("Lucas")).toBe(
//       "Hello, Lucas! Que bom ter você de volta"
//     );
//   });

//   it("loginErrorMessage() retorna uma mensagem no formato: `Pessoa usuária '${user}' não encontrada, tente novamente!`", () => {
//     expect(loginErrorMessage("Bob")).toBe(
//       "Pessoa usuária 'Bob' não encontrada, tente novamente!"
//     );
//   });  
// });