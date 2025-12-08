export interface Gift {
  item: string;
  url: string;
  preco: string;
  porQuem: string;
  mensagem: string;
  comprado: boolean;
  imageUrl?: string;
}

export interface GiftFormData {
  nome: string;
  mensagem: string;
}

export interface ApiGift {
  Item: string;
  Link: string;
  Preço: string;
  "Por quem?"?: string;
  Mensagem?: string;
  "Comprado?": string;
}
