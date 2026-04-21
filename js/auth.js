import { supabase } from './config.js';


// função para fazer login usando Supabase
export async function loginSupabase(email, password) {
    try {
        // 1. Tenta fazer o login na "Portaria" (Auth)
        const { data, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        // Se houver erro de login (senha errada, etc), retornamos o erro
        if (authError) return { success: false, error: authError.message };

        // 2. Se logou, usamos o 'data.user.id' para checar o perfil no banco
        // Esta é a parte que você perguntou se podia adicionar!
        const { data: profile, error: dbError } = await supabase
            .from('users')
            .select('nome')
            .eq('id', data.user.id)
            .single();

        if (dbError) return { success: false, error: dbError.message };

        // 3. Verificamos se o perfil está completo
        const isProfileComplete = profile && profile.nome !== null && profile.nome !== "";

        // Retornamos um objeto completo para a nossa UI
        return { 
            success: true, 
            user: data.user, 
            isProfileComplete: isProfileComplete 
        };

    } catch (error) {
        return { success: false, error: 'Erro inesperado ao processar login' };
    }
}



export async function signUpSupabase(email, password) {
    try {
        // PASSO 1: O CADASTRO NA PORTARIA
        // Chamamos o Supabase para criar o login oficial (E-mail e Senha).
        // Usamos 'await' para o código "pausar" até o Supabase responder.
        const { data, error: authError } = await supabase.auth.signUp({
            email,
            password
        });

        // Se houver erro no cadastro (ex: e-mail inválido), o código para aqui e avisa.
        if (authError) return { success: false, error: authError.message };

        // PASSO 2: RESERVANDO O ESPAÇO NO BANCO
        // Se o usuário foi criado com sucesso ('data.user' existe):
        if (data.user) {
            // Usamos upsert para evitar erro 409 caso a linha já exista.
            const { error: dbError } = await supabase
                .from('users') 
                .upsert([{ 
                    id: data.user.id
                }], { onConflict: 'id' });

            // Se der erro ao criar a linha no banco, avisamos aqui.
            if (dbError) return { success: false, error: dbError.message };
        }

        // Se tudo deu certo, retornamos 'true' e os dados do usuário.
        return { success: true, data };

    } catch (error) {
        // O 'catch' é o paraquedas: se a internet cair ou algo bizarro acontecer, 
        // o site não trava, ele apenas retorna este erro.
        return { success: false, error: "Erro inesperado" };
    }
}





// provider com Google

export async function loginGoogle() {
    try {
        const response = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:5500/perfil.html'
            }
            
        });
    } catch (error) {
        console.error('Erro ao fazer login com Google:', error);
        return null;
    }    
}