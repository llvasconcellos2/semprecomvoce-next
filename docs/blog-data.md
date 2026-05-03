# blog-data.md - Criar script node.js que alimenta arquivo blog-data.json

## Tarefa - Pastas - extraindo a data (dia, mês e ano)

- A pasta `/eventos` sub-pastas com o ano em que ocorreu o evento.
- Em cada pasta de ano, `/eventos/2019`, `/eventos/2023`, `/eventos/2024`, `/eventos/2025`, etc, encontrara sub-pastas, cada uma representando um evento e subsequentemente um post no blog.
- O nome de cada pasta de evento já é possível extrair a data (ano, mês, dia). Ex: `/eventos/2019/2019.06.02 - Reuniões com nossa paciente para apoio emocional e sobre os direitos dela` - 2019 -> ano, 06 -> mês, 02 -> dia (tudo o que está antes do separador `-`).
- Dentro de cada pasta estão as fotos do evento em jpg.

## Dados:

# Post id

- id: Para cada post deve ser criado um identificador UUID usando `crypto.randomUUID()`.

# Arquivo blog-post.md

Dentro de cada pasta está um arquivo `blog-post.md` leia o arquivo e extraia as seguintes informações:

- title: a primeira linha do arquivo (remova o caractere "# ")
- slug: usando o title como referência use a biblioteca "slugify" do node.js para gerar o slug. A biblioteca deve ser uma dependia dev.
- intro: o texto compreendido entre os comentarios "intro" e "/intro"
- content: o tento logo após o comentário "/intro" e antes do comentário "gallery". Faça um trim desse conteúdo.

# Galeria

gallery: no arquivo `blog-post.md` entre os comentários "gallery" e "/gallery" estão uma lista markdown de imagens cada item da lista sera um item no array galley. Cada item possui as informações:
exemplo: `![Reunião com a paciente e equipe de apoio em ambiente acolhedor](./01.jpg)`

- path: o caminho público da imagem após a cópia (veja seção "Cópia de imagens" abaixo)
- alt: Reunião com a paciente e equipe de apoio em ambiente acolhedor (tudo o que está entre colchetes "[]")

# Tags

tags: no arquivo `blog-post.md` entre os comentários "tags" e "/tags" estão uma lista markdown de tags cada item da lista sera um item no array tags.

# Cópia de imagens

Para cada post, após extrair os dados da galeria, copie as imagens do evento para a pasta pública do Next.js de forma que fiquem disponíveis no site estático gerado por `next export`.

- Destino: `public/blog/[slug]/` (crie a pasta se não existir, usando `fs.mkdirSync` com `{ recursive: true }`)
- Renomeie cada imagem sequencialmente seguindo a **ordem em que aparecem na lista da galeria** no `blog-post.md`: `img-001.jpg`, `img-002.jpg`, `img-003.jpg`, etc. (zero-pad com 3 dígitos)
- A origem de cada imagem é o caminho original referenciado na galeria dentro da pasta do evento (ex: `eventos/2023/2023.06.02 - Visita.../01.jpg`)
- Após a cópia, o campo `path` de cada item da galeria no `posts.json` deve ser o caminho público da imagem renomeada, ex: `/blog/visita-ao-universo-down/img-001.jpg`
- Se a pasta `public/blog/[slug]/` já existir, limpe-a antes de copiar (`fs.rmSync` com `{ recursive: true, force: true }` + recriar) para evitar imagens órfãs de execuções anteriores

## Output

- crie um script node.js que extrairá esses dados das pastas e arquivos relevantes, copiará as imagens para `public/blog/[slug]/`, e preencherá os dados no arquivo `/data/posts.json`.
- crie uma chamada para o executar o script node dentro do package-json chamado "gen-post-data".
- o formato do arquivo `/data/posts.json` será baseado no schema `/data/blog-posts-schema.json`.
