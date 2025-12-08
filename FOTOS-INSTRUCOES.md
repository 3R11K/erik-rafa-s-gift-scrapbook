# 📸 Como Adicionar as Fotos do Casal no Background

## Passo 1: Tornar as Imagens Públicas no Google Drive

1. Abra a pasta do Google Drive: https://drive.google.com/drive/folders/1rudBtLVQqbI7iRrAn2Rlk--BsZui_SS9
2. Para cada foto que você quer usar:
   - Clique com botão direito na imagem
   - Selecione **"Compartilhar"** ou **"Obter link"**
   - Mude para **"Qualquer pessoa com o link"** pode visualizar
   - Copie o ID da imagem (está na URL após `/d/` e antes de `/view`)

## Passo 2: Converter para Link Direto

Pegue o ID da imagem e crie o link no formato:
```
https://drive.google.com/uc?export=view&id=SEU_ID_AQUI
```

**Exemplo:**
- Link original: `https://drive.google.com/file/d/1abc123xyz/view?usp=sharing`
- ID: `1abc123xyz`
- Link direto: `https://drive.google.com/uc?export=view&id=1abc123xyz`

## Passo 3: Adicionar no Código

Abra o arquivo: `src/components/BackgroundCollage.tsx`

Na linha 5-12, substitua os links vazios pelos links diretos:

```typescript
const COUPLE_PHOTOS = [
  'https://drive.google.com/uc?export=view&id=ID_FOTO_1',
  'https://drive.google.com/uc?export=view&id=ID_FOTO_2',
  'https://drive.google.com/uc?export=view&id=ID_FOTO_3',
  'https://drive.google.com/uc?export=view&id=ID_FOTO_4',
  'https://drive.google.com/uc?export=view&id=ID_FOTO_5',
  'https://drive.google.com/uc?export=view&id=ID_FOTO_6',
];
```

## Passo 4: Salvar e Verificar

- Salve o arquivo
- O site irá recarregar automaticamente
- As fotos aparecerão no fundo com:
  - ✅ Baixa opacidade (8%)
  - ✅ Efeito Polaroid (bordas brancas)
  - ✅ Rotações aleatórias
  - ✅ Fitas washi coloridas
  - ✅ Animação de flutuação

## 🎨 Dicas de Design

- **Quantidade recomendada:** 6-8 fotos funciona bem
- **Tipo de fotos:** Escolha fotos com boa iluminação e que representem vocês
- **Mix:** Combine fotos de close, fotos juntos, e fotos de momentos especiais
- **Orientação:** Mix de fotos verticais e horizontais fica mais dinâmico

## ⚡ Alternativa: Hospedar Localmente

Se preferir, você pode adicionar as fotos na pasta `public/` do projeto:

1. Crie a pasta `public/photos/`
2. Adicione as fotos (ex: `foto1.jpg`, `foto2.jpg`, etc.)
3. No `BackgroundCollage.tsx`, use:

```typescript
const COUPLE_PHOTOS = [
  '/photos/foto1.jpg',
  '/photos/foto2.jpg',
  '/photos/foto3.jpg',
  // ...
];
```

---

**Qualquer dúvida, me chama! 🎨✨**
