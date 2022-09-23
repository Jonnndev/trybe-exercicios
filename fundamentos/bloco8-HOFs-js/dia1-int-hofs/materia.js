// FIXANDO

// FUNÇÃO QUE RETORNA 'ACORDANDO!!'
const wakeUp = () => console.log('Acordando!!');

// FUNÇÃO QUE RETORNA 'BORA TOMAR CAFÉ!!'
const breakfest = () => console.log('Bora tomar café!!');

// FUNÇÃO QUE RETORNA 'PARTIU DORMIR!!'
const bedTime = () => console.log('Partiu dormir!!');

// FUNÇÃO HOF QUE UTILIZA FUNÇÕES ANTERIORES COMO CALLBACK
const doingThings = (callback) => callback();

doingThings(wakeUp);
doingThings(breakfest);
doingThings(bedTime);