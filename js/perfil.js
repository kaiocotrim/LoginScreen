import { supabase } from './config.js'

const form = document.getElementById('perfil-form');

function getFieldValue(id) {
    const field = document.getElementById(id);

    if (!field) {
        return null;
    }

    if (field.type === 'checkbox') {
        return field.checked;
    }

    return field.value;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        nome: getFieldValue('nome'),
        sobrenome: getFieldValue('sobrenome'),
        'nome-exibicao': getFieldValue('nome-exibicao'),
        telefone: getFieldValue('telefone'),
        renda: getFieldValue('renda'),
        objetivo: getFieldValue('objetivo'),
        entrada: getFieldValue('entrada'),
        saida: getFieldValue('saida'),
        'perfil-gastos': getFieldValue('perfil-gastos'),
        foco: getFieldValue('foco'),
        bio: getFieldValue('bio'),
        'resumo-semanal': getFieldValue('resumo-semanal'),
        alertas: getFieldValue('alertas'),
        dicas: getFieldValue('dicas'),
    };

    const roleSelecionado = form.querySelector('input[name="role"]:checked');
    data.role = roleSelecionado ? roleSelecionado.value : null;

    // pegar usuário logado
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
        console.log("Usuário não logado");
        return;
    }

    // inserir no banco
    const { error } = await supabase
        .from('users')
        .upsert({
            id: user.id,
            nome: data.nome,
            sobrenome: data.sobrenome,
            'nome-exibicao': data['nome-exibicao'],
            telefone: data.telefone,
            renda: data.renda,
            objetivo: data.objetivo,
            entrada: data.entrada,
            saida: data.saida,
            'perfil-gastos': data['perfil-gastos'],
            foco: data.foco,
            role: data.role,
            bio: data.bio,
            'resumo-semanal': data['resumo-semanal'],
            alertas: data.alertas,
            dicas: data.dicas,
        });

    if (error) {
        console.log("Erro ao salvar:", error.message);
    } else {
        console.log("Perfil salvo com sucesso 🚀");
        window.location.href = "desboard1.html";
    }
});