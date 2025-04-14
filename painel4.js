import { LightningElement, track } from 'lwc';


export default class LpSaoPauloNovaDobra5 extends LightningElement {

    @track faqItems = [
        {
            id: 1,
            question: 'Quando iniciou-se esta parceria?',
            answer: 'O início da parceira com o Clube de Regatas do Flamengo foi em Maio de 2021. Data em que a ABC da Construção se tornou patrocinadora oficial do Clube.',
            visible: true,
            arrowClass: 'arrow'
        },
        {
            id: 2,
            question: 'Quero saber mais sobre a ABC da Construção',
            answer: 'Com mais de 60 anos de história, a ABC da Construção é uma das maiores redes de acabamentos do Brasil.Pelo seu modelo inovador, a ABC está fazendo uma revolução no varejo de acabamentos e já é considerada uma das principais construtechs do país.Traduzindo em números, vendemos por ano, aproximadamente 5 milhões de metros quadrados de revestimentos.Por ano, são 240 mil clientes atendidos em nossas mais de 160 lojas em 80 cidades.O segredo? A gente entende de obra e vai te ajudar a comprar o acabamento certo, na quantidade certa pra sua obra.Nem mais, nem menos.Conte conosco pra finalizar sua obra de forma rápida, econômica e segura. Conte conosco pra deixar sua casa como sempre sonhou.',
            visible: false,
            arrowClass: 'arrow'
        },
        {
            id: 3,
            question: 'Quais são as vantagens de se cadastrar?',
            answer: 'Ao se cadastrar você irá receber em primeira mão todas as ofertas, cupons, dicas, condições, ações e ativações especiais e imperdíveis relacionadas à diversidade e melhores marcas de acabamento para sua obra ou reforma. Nossa intenção é proporcionar experiências incríveis nas lojas ou no site da ABC junto ao seu time do coração.',
            visible: false,
            arrowClass: 'arrow'
        },
        {
            id: 4,
            question: 'Encontre a ABC mais perto de você!',
            answer: 'Quero conhecer a ABC mais próxima de mim. CLIQUE AQUI!',
            visible: false,
            arrowClass: 'arrow',
            urlFranquias: 'https://www.abcdaconstrucao.com.br/diretorio-de-lojas'
        }
    ];

    toggleAnswer(event) {
        const id = parseInt(event.currentTarget.dataset.id, 10);

        this.faqItems = this.faqItems.map(faq => {
            if (faq.id === id) {

                faq.visible = !faq.visible;
            } else {

                faq.visible = false;
            }

            faq.arrowClass = faq.visible ? 'arrow rotate' : 'arrow';
            return faq;
        });
    }
}