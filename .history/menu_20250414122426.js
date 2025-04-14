import { LightningElement, api, wire, track } from 'lwc';
//import upsertLead from "@salesforce/apex/LpSejaUmFranqueadoService.upsertLead";
import upsertLead from "@salesforce/apex/LpSejaUmFranqueadoService.upsertLead";

import getCityByUf from "@salesforce/apex/LpSejaUmFranqueadoService.getCityByUfWithActiveGuideShop";

import getGuideByCity from "@salesforce/apex/LpSejaUmFranqueadoService.getFranchisesByStateAndCity";

export default class LpFlamengoMenu extends LightningElement {

    @track modalAberto = false;

    @api nome = '';
    @api sobrenome = '';
    @api celular = '';
    @api email = '';
    @api estadoGuide = '';
    @api cidadeGuide = '';
    @api nomeGuide = '';
    @api firstcheck = false;
    @api secondcheck = false;

    @track formSent = false;

    @track cidades = [];

    @track cidade;

    value = '';

    @api stateSelected;

    @track guides = [];

    @track guide;

    filial = '';

    get options() {
        return [
            { label: 'Selecione UF', value: '' },
            { label: 'BA', value: 'BA' },
            { label: 'DF', value: 'DF' },
            { label: 'ES', value: 'ES' },
            { label: 'GO', value: 'GO' },
            { label: 'MG', value: 'MG' },
            { label: 'MS', value: 'MS' },
            { label: 'PR', value: 'PR' },
            { label: 'RJ', value: 'RJ' },
            { label: 'SC', value: 'SC' },
            { label: 'SP', value: 'SP' }
        ];
    }

    handleStateChange(event) {

        const field = event.target.name;

        if (field in this) {
            this[field] = event.target.value;
            console.log(field, event.target.value);
        }

        this.value = event.detail.value;
        this.stateSelected = this.value;
        console.log("start handleStateChange", this.value)

        getCityByUf({
            uf: this.value,
            guideShopActive: true
        })

            .then((listCidades) => {
                this.cidades = listCidades.map(itemCidade => ({
                    label: itemCidade.NameCity__c,
                    value: itemCidade.NameCity__c
                }));
            })
            .catch((error) => {
                console.log('Erro getPublicKey', error);
            })
    }

    handleCityChange(event) {

        const field = event.target.name;

        if (field in this) {
            this[field] = event.target.value;
            console.log(field, event.target.value);
        }

        this.value = event.detail.value;
        console.log("CITY", this.value)

        getGuideByCity({
            uf: this.stateSelected,
            city: this.value
        })

            .then((listGuides) => {
                this.guides = listGuides.map(itemGuide => ({
                    label: itemGuide.NomeAmigavel__c,
                    value: itemGuide.Id
                }));
                this.guide = this.guides[0].value;
                console.log("guides[0]", this.guide);
                this.filial = this.guide;
                console.log("handleCityChange filial", this.filial);
            })
            .catch((error) => {
                console.log('Erro getPublicKey', error);
            })
    }

    handleGuideChange(event) {

        const field = event.target.name;

        if (field in this) {
            this[field] = event.target.value;
            console.log(field, event.target.value);
        }

        this.value = event.detail.value;
        this.guide = this.value;
        console.log("Guide", this.value);
        this.filial = this.guide;
        console.log("handleGuideChange filial", this.filial);
    }

    abrirModal() {
        this.modalAberto = true;
    }

    fecharModal() {
        this.modalAberto = false;
    }

    handleInputChange(event) {
        const field = event.target.name;

        if (field in this) {
            this[field] = event.target.value;
            console.log(field, event.target.value);
        }
    }

    handleCheckboxes(event) {
        if (event.target.name === 'firstcheck') {
            this.firstcheck = event.target.checked;
        }
        if (event.target.name === 'secondcheck') {
            this.secondcheck = event.target.checked;
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        this.isLoading = true;
        this.formSent = true;

        console.log('nome', this.nome);
        console.log('sobrenome', this.sobrenome);
        console.log('tel', this.celular);
        console.log('email', this.email);
        console.log('estadoGuide', this.estadoGuide);
        console.log('cidadeGuide', this.cidadeGuide);
        console.log('nomeGuide', this.nomeGuide);
        console.log('firstcheck', this.firstcheck);
        console.log('secondcheck', this.secondcheck);

        let nome = this.nome;
        let sobrenome = this.sobrenome;
        let tel = this.celular;

        const fields = {
            idLead: nome.concat(sobrenome.trim(), tel.replace(/\D/g, "").trim()),
            recordtypeDevName: "Cliente_Final",
            company: "ABC",
            company2: "Cliente_Final",
            owner: "005Dn000005RtTdIAK",
            canalDeEntrada: "Landing Page Clube de Regatas Flamengo",
            firstName: this.nome,
            lastName: this.sobrenome,
            tel: this.celular,
            email: this.email,
            stateGuide: this.estadoGuide,
            cityGuide: this.cidadeGuide,
            nameGuideShop: this.nomeGuide,
            marketingConsent: this.firstcheck.toString(),
            privacyPolicy: this.secondcheck.toString()
        };

        // Map the user input to the fields
        upsertLead({ lead: JSON.stringify(fields) })
            .then(() => {
                console.log("submit REALIZADO: ");
                window.dataLayer.push({
                    'event': 'Lead',
                    'email': this.email,
                    'phone': this.celular
                });
            })
            .catch((error) => {
                console.log("submit error: ", error);
            });

        console.log("formdata", fields);
        console.log("Dados enviados com SUCESSO!");
    }

    connectedCallback() { }

    formScroll() {
        const topDiv = document.querySelector('c-lp-flamengo-painel2');
        topDiv.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }

    homeScroll() {
        const topDiv = document.querySelector('c-lp-flamengo-painel1');
        topDiv.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }

    campanhaScroll() {
        const topDiv = document.querySelector('c-lp-flamengo-painel2');
        topDiv.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }

    beneficiosScroll() {
        const topDiv = document.querySelector('c-lp-flamengo-painel5');
        topDiv.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }

    sobreScroll() {
        const topDiv = document.querySelector('c-lp-flamengo-painel3');
        topDiv.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }

    duvidasScroll() {
        const topDiv = document.querySelector('c-lp-flamengo-painel4');
        topDiv.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }


}