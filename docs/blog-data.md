# blog-data.md - Gerar blog-data.json

## Tarefa - Redação de blog

- A pasta `/eventos` sub-pastas com o ano em que ocorreu o evento.
- Em cada pasta de ano, `/eventos/2019`, `/eventos/2023`, `/eventos/2024`, `/eventos/2025`, etc, encontrara sub-pastas, cada uma representando um evento e subsequentemente um post no blog.
- O nome de cada pasta de evento já é possível extrair duas informações: a data (ano, mês, dia) e o título do post do blog. Ex: `/eventos/2019/2019.06.02 - Reuniões com nossa paciente para apoio emocional e sobre os direitos dela` - 2019 -> ano, 06 -> mês, 02 -> dia e tudo após o separador `-` é o título do post do blog.
- Dentro das pastas estão as fotos do evento em jpg.
- Algumas pastas possuem um arquivo `info.txt` - esse arquivo fornece mais informações sobre o evento que não "cabiam" no título (nome da pasta).

## Output

- json based on the schema `/data/blog-posts-schema.json`
- write all the data in the file `/data/posts.tsx`
