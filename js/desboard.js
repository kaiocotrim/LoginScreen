import {supabase} from './config.js'


async function carregarDadosDaTela() {
    // 1. Pega o usuário logado para saber "de quem" buscar os dados
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        // Se não tiver usuário, manda de volta pro login (segurança!)
        window.location.href = 'index.html';
        return;
    }

    // 2. Busca os dados na sua tabela 'users'
    const { data: perfil, error } = await supabase
        .from('users')
        .select('name, email, money')
        .eq('id', user.id) // Busca apenas a linha deste usuário
        .single(); // Garante que venha apenas um resultado

    if (error) {
        console.error("Erro ao carregar dados:", error.message);
        return;
    }

    console.log("Dados do perfil carregados:", perfil);

    // 3. MOSTRAR NO HTML (A Mágica)
    if (perfil) {
        // Mostrando o Nome
        document.getElementById('user-name').innerText = perfil.name || "Usuário";
        
        // Mostrando o E-mail
        // document.getElementById('user-email').innerText = perfil.email;

        // Mostrando o Dinheiro com formatação profissional (Exemplo de Variedade)
        // const saldoFormatado = perfil.money.toLocaleString('pt-BR', { 
        //     style: 'currency', 
        //     currency: 'BRL' 
        // });
        // document.getElementById('user-money').innerText = saldoFormatado;
    }
}

// Executa a função assim que a página carrega
carregarDadosDaTela();
