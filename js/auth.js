import { supabase } from './config.js';


// função para fazer login usando Supabase
export async function loginSupabase(email, password) {
    try {
        const response = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (response.error) {
            console.error('Erro ao fazer login:', response.error.message);
            return null;
        }


        setTimeout(() => {

            console.log('Login bem-sucedido:', response.data);
            window.location.href = "/desboard.html";

        }, 1000);

    } catch (error) {
        console.error('Erro inesperado:', error);
        return null;
    }
}

// funcao para criar conta usando Supabase

export async function signUpSupabase(email, password) {
    try {
        const response = await supabase.auth.signUp({
            email,
            password
        });

        if (response.error) {
            console.error('Erro ao criar conta:', response.error.message);
            return null;
        }

        console.log('Conta criada com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro inesperado:', error);
        return null;
    }
}