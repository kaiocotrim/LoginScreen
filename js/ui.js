// 1. Importações limpas e organizadas
import { loginSupabase, signUpSupabase, loginGoogle } from './auth.js';

const form = document.getElementById('login-form');
let isSignupMode = false;

// Função para alternar entre Login e Cadastro
window.setSignupMode = function (value) {
    isSignupMode = value;
    // Exemplo de variedade: você poderia mudar o texto do botão aqui
    const btn = document.querySelector('button[type="submit"]');
    btn.innerText = isSignupMode ? "Criar Conta" : "Entrar";
};

// 2. A função principal que lida com o formulário
async function handleSubmit(event) {
    event.preventDefault(); // Impede o recarregamento da página

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // CENÁRIO A: CADASTRO
    if (isSignupMode) {
        const passwordConfirm = document.getElementById('password-confirm').value;

        if (password !== passwordConfirm) {
            alert('As senhas não coincidem!');
            return;
        }

        const result = await signUpSupabase(email, password);
        if (result.success) {
            alert('Conta criada! Como você removeu a confirmação, já pode logar.');
            // Opcional: mudar para modo login automaticamente
            setSignupMode(false); 
        } else {
            alert('Erro no cadastro: ' + result.error);
        }

    // CENÁRIO B: LOGIN (Aqui unimos as duas partes que você enviou)
    } else {
        const result = await loginSupabase(email, password);

        if (result.success) {
            // DECISÃO DE ARQUITETURA: Para onde o usuário vai?
            if (result.isProfileComplete) {
                console.log("Usuário antigo: Indo para o Dashboard");
                window.location.href = "desboard.html";
            } else {
                console.log("Usuário novo: Indo finalizar perfil");
                window.location.href = "perfil.html";
            }
        } else {
            alert("Erro ao entrar: " + result.error);
        }
    }
}

// 3. Ativação dos ouvintes de eventos
if (form) {
    form.addEventListener('submit', handleSubmit);
}

const googleButton = document.querySelector('.btn-social');
if (googleButton) {
    googleButton.addEventListener('click', async () => {
        await loginGoogle();
        // Nota: O Google lida com redirecionamento via URL no painel do Supabase
    });
}



// js/ui.js


// Ao clicar no botão de entrar:
