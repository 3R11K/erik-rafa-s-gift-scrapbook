export interface Gift {
  id: number;
  item: string;
  url: string;
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
  ID: number;
  Item: string;
  URL: string;
  "Por quem?": string;
  Mensagem: string;
  Comprado: string;
}
