export class Produto{
    constructor(
        public nome: string,
        public descricao: string,
        public id: string,
        public preco: string,
        public tipo: string,
        public med1: string,
        public med2: string,
        public med3: string,
        public img_url: string,
        public id_vendedor: string,
        public nome_vendedor: string,
        public entrega: string,
        public valor_entrega: string,
        public curtido: string,
        public cep: string
    ){}
}