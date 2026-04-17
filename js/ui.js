import { loginSupabase } from './auth.js';
import { signUpSupabase } from './auth.js';
// variáveis para acessar os elementos do formulário
const form = document.getElementById('login-form');
const createAccountButton = document.getElementById('toggle-signup');

async function handleSubmit(event) { // função para lidar com o envio do formulário
    event.preventDefault() // evitar o envio padrão do formulário
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log('Email:', email);
    console.log('Password:', password);
    // aqui você pode adicionar a lógica para autenticar o usuário, como enviar os dados para um servidor
    const result = await loginSupabase(email, password);

    console.log('Resultado do login:', result);
}


if(form) {
    form.addEventListener('submit', handleSubmit); // adicionar o evento de submit ao formulário
}


async function criarConta(event) {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value
    const passwordConfirm = document.getElementById('password-confirm').value;

    if (password !== passwordConfirm) {
        alert('As senhas não coincidem!');
        return;
    }

    const result = await signUpSupabase(email, password);
    console.log('Resultado da criação de conta:', result);
}

if (createAccountButton) {
    createAccountButton.addEventListener('click', criarConta);
}