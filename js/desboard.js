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
        .select('nome, sobrenome, nome-exibicao, email, renda, objetivo, entrada, saida, perfil-gastos, foco, role, bio, resumo-semanal, alertas, dicas')
        .eq('id', user.id)
        .single();

    if (error) {
        console.error("Erro ao carregar dados:", error.message);
        return;
    }

    console.log("Dados do perfil carregados:", perfil);

    // 3. MOSTRAR NO HTML
    if (perfil) {
        const nomeExibicao = perfil['nome-exibicao'] || perfil.nome || "Usuário";
        const nomeCompleto = perfil.sobrenome ? `${perfil.nome} ${perfil.sobrenome}` : perfil.nome || "Usuário";

        // Gerar iniciais para o avatar
        const iniciais = nomeCompleto
            .split(' ')
            .map(p => p[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();

        // Nome na página (saudação)
        const elUserName = document.getElementById('user-name');
        if (elUserName) elUserName.innerText = nomeExibicao;

        // Dinheiro
        // const elMoney = document.getElementById('money-test');
        // if (elMoney) elMoney.innerText = perfil.money ? `R$ ${perfil.money}` : "R$ 0";

        // Sidebar - nome da conta

        // Sidebar - avatar com iniciais
        // const elAccountAvatar = document.getElementById('account-avatar');
        // if (elAccountAvatar) elAccountAvatar.innerText = iniciais;
    }
}

// Executa a função assim que a página carrega
carregarDadosDaTela();
