"""
Adiciona seções <!-- gallery --> e <!-- tags --> nos arquivos blog-post.md
de cada evento do Instituto Sempre Com Você.

Uso: python scripts/update-blog-galleries.py
"""

import os

base = "c:/Users/leona/Projects/react/semprecomvoce-next/eventos"

updates = {
    "2019/2019.06.02 - Reuniões com nossa paciente para apoio emocional e sobre os direitos dela": {
        "gallery": [
            ("01.jpg", "Reunião com a paciente e equipe de apoio em ambiente acolhedor"),
            ("02.jpg", "Grupo reunido em conversa sobre apoio emocional e direitos da paciente"),
            ("03.jpg", "Momento de troca e escuta entre os participantes da reunião"),
            ("04.jpg", "Encontro de apoio emocional com a paciente oncológica"),
            ("05.jpg", "Continuidade da reunião de suporte e orientação à paciente"),
            ("06.jpg", "Encerramento do encontro de apoio emocional e orientação sobre direitos"),
        ],
        "tags": ["apoio emocional", "direitos dos pacientes", "2019", "Joinville", "acompanhamento", "saúde mental"],
    },
    "2023/2023.06.02 - Visita ao Universo Down para parceria com o Instituto Sempre com Você": {
        "gallery": [
            ("01.jpg", "Equipe do Instituto Sempre Com Você junto à equipe do Universo Down em visita institucional"),
        ],
        "tags": ["parceria", "Universo Down", "2023", "Joinville", "inclusão", "colaboração"],
    },
    "2023/2023.06.10 - Assistidas do Instituto Sempre com Você": {
        "gallery": [
            ("01.jpg", "Andrea com uma das pacientes assistidas pelo Instituto em momento de acolhimento"),
            ("02.jpg", "Momento de carinho e presença com as assistidas do Instituto"),
            ("03.jpg", "Visita de acompanhamento às pacientes assistidas"),
            ("04.jpg", "Registro do cuidado e suporte oferecido às assistidas"),
            ("05.jpg", "Encontro de apoio com as mulheres acompanhadas pelo Instituto"),
            ("06.jpg", "Momento de alegria e conexão entre a equipe e as assistidas"),
        ],
        "tags": ["assistidas", "apoio emocional", "2023", "pacientes", "mulheres", "acolhimento", "Joinville"],
    },
    "2023/2023.06.13 - Ação entre amigos": {
        "gallery": [
            ("image223.jpg", "Amigos reunidos em ação solidária com presentes e cestinhas para os pacientes"),
            ("image225.jpg", "Grupo celebrando a ação entre amigos com alegria e afeto"),
            ("image226.jpg", "Momento de partilha e solidariedade durante a ação entre amigos"),
            ("image227.jpg", "Encerramento da ação entre amigos com sorriso e gratidão"),
        ],
        "tags": ["ação solidária", "amigos", "2023", "arrecadação", "voluntariado", "Joinville"],
    },
    "2023/2023.06.19 - Acompanhamento paciente Waldir de São Francisco do Sul": {
        "gallery": [
            ("image201.jpg", "Andrea com o paciente Waldir e acompanhantes em momento de apoio"),
            ("image228.jpg", "Acompanhamento do paciente Waldir, vindo de São Francisco do Sul"),
        ],
        "tags": ["acompanhamento", "paciente", "2023", "São Francisco do Sul", "Waldir", "apoio"],
    },
    "2023/2023.06.23 - Campanhas para o tratamento e acompanhamento dos pacientes": {
        "gallery": [
            ("image197.jpg", "Material de campanha para arrecadação de recursos para o tratamento dos pacientes"),
        ],
        "tags": ["campanha", "arrecadação", "2023", "tratamento", "pacientes", "Joinville"],
    },
    "2023/2023.07.12 - Permissão pela prefeitura do uso de terreno para a nova sede do insituto no coração de Joinville, o bairro Glória": {
        "gallery": [
            ("image11.jpg", "Reunião com o Secretário de Governo Gilberto Leal e equipe do Instituto na Prefeitura de Joinville"),
            ("image198.jpg", "Discussão sobre o terreno cedido para a nova sede do Instituto no Bairro Glória"),
            ("image199.jpg", "Documentação e planejamento para a construção da nova sede"),
        ],
        "tags": ["nova sede", "Prefeitura de Joinville", "2023", "Bairro Glória", "Gilberto Leal", "terreno", "Joinville"],
    },
    "2023/2023.07.20 - Acompanhamento do paciente Antônio Giacomazzi": {
        "gallery": [
            ("image201.jpg", "Acompanhamento do paciente Antônio Giacomazzi em sessão de apoio"),
            ("image202.jpg", "Momento de cuidado e presença com Antônio Giacomazzi"),
            ("image203.jpg", "Registro do acompanhamento oncológico e emocional do paciente Antônio"),
        ],
        "tags": ["acompanhamento", "Antônio Giacomazzi", "2023", "câncer", "apoio emocional", "paciente"],
    },
    "2023/2023.07.20 - Acompanhamento do paciente infantil Arthur": {
        "gallery": [
            ("image204.jpg", "Acompanhamento do paciente infantil Arthur em momento de cuidado"),
            ("image205.jpg", "Equipe do Instituto com o pequeno Arthur e sua família"),
            ("image206.jpg", "Registro do suporte oferecido ao paciente infantil Arthur"),
        ],
        "tags": ["paciente infantil", "Arthur", "2023", "câncer", "apoio", "criança", "família"],
    },
    "2023/2023.08.06 - Reuniões com Pacientes para que possamos dar continuidade ao tratamento": {
        "gallery": [
            ("image207.jpg", "Reunião com os pacientes do Instituto para continuidade do tratamento"),
        ],
        "tags": ["reunião", "pacientes", "2023", "tratamento", "continuidade", "acompanhamento"],
    },
    "2023/2023.08.15 - Vibrando a vitória da alta de 4 pacientes": {
        "gallery": [
            ("image21.jpg", "Celebração da remissão do câncer dos quatro pacientes: Adair, Pedro, Antônio e Leila"),
            ("image22.jpg", "Equipe do Instituto vibrando a vitória das quatro altas médicas"),
        ],
        "tags": ["alta médica", "vitória", "2023", "comemoração", "câncer", "remissão", "Adair", "Pedro", "Leila"],
    },
    "2023/2023.08.20 - Ação de angariar fundos para a instituição": {
        "gallery": [
            ("jose jovelino.jpg", "José Jovelino, paciente que superou o câncer com suporte do Instituto, em depoimento no evento"),
            ("image23.jpg", "Ação de angariamento de fundos para o Instituto Sempre Com Você"),
            ("image24.jpg", "Participantes do evento beneficente em apoio ao Instituto"),
            ("image28.jpg", "Momento de celebração e solidariedade durante a ação de arrecadação"),
            ("image29.jpg", "Comunidade reunida para apoiar o Instituto na ação de fundos"),
            ("image30.jpg", "Registros da ação de angariamento de fundos"),
            ("image31.jpg", "Equipe e convidados durante o evento de arrecadação"),
            ("image32.jpg", "Ambiente festivo da ação beneficente do Instituto"),
            ("image33.jpg", "Encerramento da ação de angariamento de fundos com gratidão"),
        ],
        "tags": ["arrecadação de fundos", "2023", "José Jovelino", "evento beneficente", "superação", "solidariedade"],
    },
    "2023/2023.09.05 - Apresentação do trabalho do Instituto Sempre Com Você na ALESC - Assembléia Legislativa do Estado de Santa Catarina": {
        "gallery": [
            ("01.jpg", "Equipe do Instituto na Assembleia Legislativa do Estado de Santa Catarina (ALESC)"),
            ("image5.jpg", "Apresentação do trabalho do Instituto Sempre Com Você na ALESC em Florianópolis"),
        ],
        "tags": ["ALESC", "Assembleia Legislativa", "Santa Catarina", "2023", "Florianópolis", "legislativo", "reconhecimento"],
    },
    "2023/2023.09.05 - Em Florianópolis o acompanhamento no final do tratamento da paciente Ana": {
        "gallery": [
            ("image3.jpg", "Acompanhamento da paciente Ana nos momentos finais do tratamento em Florianópolis"),
            ("image4.jpg", "Andrea com a paciente Ana em Florianópolis durante o encerramento do tratamento"),
            ("image7.jpg", "Registro do acompanhamento final do tratamento oncológico da paciente Ana"),
            ("image8.jpg", "Momento de celebração e gratidão pelo encerramento bem-sucedido do tratamento de Ana"),
        ],
        "tags": ["Ana", "alta médica", "Florianópolis", "2023", "paciente", "superação", "tratamento oncológico"],
    },
    "2023/2023.10.20 - Acompanhamento do caso da Paciente Sônia - Mais um caso de sucesso": {
        "gallery": [
            ("image9.jpg", "Paciente Sônia em acompanhamento pelo Instituto Sempre Com Você"),
            ("image12.jpg", "Ação de venda de bonecos de pano para arrecadar fundos para os remédios da Sônia"),
            ("image13.jpg", "Registro das atividades de arrecadação em prol da paciente Sônia"),
            ("image64.jpg", "Comemoração do caso de sucesso da paciente Sônia"),
        ],
        "tags": ["Sônia", "2023", "bonecos de pano", "arrecadação", "superação", "caso de sucesso", "remédios"],
    },
    "2023/2023.11.05 - Acompanhamento do paciente Nelson Kopsch a exames": {
        "gallery": [
            ("image66.jpg", "Acompanhamento do paciente Nelson Kopsch a exames médicos"),
        ],
        "tags": ["Nelson Kopsch", "2023", "exames", "depressão", "acompanhamento", "saúde mental"],
    },
    "2023/2023.11.05 - Reunião com a Prefeitura de Joinville": {
        "gallery": [
            ("image69.jpg", "Reunião com representantes da Prefeitura de Joinville sobre direitos dos pacientes"),
            ("image71.jpg", "Discussão sobre conselhos e direitos aplicados ao Instituto na Prefeitura de Joinville"),
            ("image73.jpg", "Encontro institucional com a Prefeitura de Joinville para fortalecer a parceria"),
        ],
        "tags": ["Prefeitura de Joinville", "2023", "direitos", "conselhos", "parceria", "Joinville", "políticas públicas"],
    },
    "2023/2023.12.06 - Ação de arrecadação de fundos para o tratamento do paciente Antônio Malsckitzky": {
        "gallery": [
            ("image75.jpg", "Ação de arrecadação de fundos para o tratamento do paciente Antônio Malsckitzky"),
        ],
        "tags": ["Antônio Malsckitzky", "2023", "arrecadação", "tratamento", "solidariedade", "câncer"],
    },
    "2023/2023.12.18 - Comemoração Antônio Malsckitzky e Evandro Sandro de Moura": {
        "gallery": [
            ("image77.jpg", "Comemoração com Antônio Malsckitzky e Evandro Sandro de Moura"),
            ("image79.jpg", "Momento de celebração da superação dos pacientes Antônio e Evandro"),
        ],
        "tags": ["Antônio Malsckitzky", "Evandro Sandro de Moura", "2023", "comemoração", "depressão", "câncer", "superação"],
    },
    "2023/2023.12.19 - Vencendo a Depressão": {
        "gallery": [
            ("image80.jpg", "Momento de apoio e reflexão sobre como vencer a depressão durante o tratamento oncológico"),
        ],
        "tags": ["depressão", "saúde mental", "2023", "superação", "apoio psicológico", "câncer"],
    },
    "2023/2023.12.20 - Comemoração de Encerramento de Ano com o nosso grupo da terceira idade": {
        "gallery": [
            ("image40.jpg", "Grupo da terceira idade do Instituto reunido na comemoração de encerramento do ano"),
            ("image42.jpg", "Momentos de alegria e emoção na festa de encerramento de 2023"),
            ("image44.jpg", "Confraternização de final de ano com os pacientes e voluntários da terceira idade"),
            ("image46.jpg", "Abraços e sorrisos no encerramento do ano com o grupo da terceira idade"),
            ("image49.jpg", "Registro da celebração de encerramento de ano do Instituto Sempre Com Você"),
            ("image61.jpg", "Momentos de partilha e emoção na comemoração de fim de ano"),
            ("image81.jpg", "Encerramento da celebração de 2023 com esperança para o novo ano"),
        ],
        "tags": ["encerramento de ano", "terceira idade", "2023", "comemoração", "grupo", "esperança"],
    },
    "2024/2024.01.15 - Início das atividades do Ano de 2024": {
        "gallery": [
            ("image51.jpg", "Equipe do Instituto Sempre Com Você no início das atividades de 2024"),
        ],
        "tags": ["início de ano", "2024", "atividades", "Instituto Sempre Com Você", "Joinville"],
    },
    "2024/2024.01.20 - Ação de arrecadação de fundos para o tratamento do paciente Mario Junior": {
        "gallery": [
            ("image54.jpg", "Ação de arrecadação de fundos para o tratamento oncológico do paciente Mario Junior"),
            ("image56.jpg", "Comunidade unida na campanha em prol do Mario Junior"),
        ],
        "tags": ["Mario Junior", "2024", "arrecadação", "tratamento", "solidariedade", "câncer"],
    },
    "2024/2024.02.08 - Acompanhamento das pacientes Vânia, Claudia e Gilda": {
        "gallery": [
            ("image37.jpg", "Acompanhamento das pacientes Vânia, Claudia e Gilda pelo Instituto"),
            ("image57.jpg", "Momento de cuidado e apoio com as pacientes Vânia, Claudia e Gilda"),
        ],
        "tags": ["Vânia", "Claudia", "Gilda", "2024", "acompanhamento", "pacientes", "mulheres", "câncer"],
    },
    "2024/2024.02.15 - Campanha de arrecadação de recursos em conjunto com a TV da Cidade": {
        "gallery": [
            ("image38.jpg", "Pacientes do Instituto Sempre Com Você na campanha da TV da Cidade de Joinville"),
            ("image119.jpg", "Equipe do Instituto durante a campanha de arrecadação na TV da Cidade"),
        ],
        "tags": ["TV da Cidade", "Joinville", "2024", "mídia", "arrecadação", "campanha", "pacientes"],
    },
    "2024/2024.03.05 - Levantamento de doações para o tratamento de Oncologia do Zezinho": {
        "gallery": [
            ("image114.jpg", "Presidente Andrea em campanha de arrecadação para o tratamento oncológico do Zezinho"),
            ("image116.jpg", "Ação de levantamento de doações em prol do paciente Zezinho"),
            ("image117.jpg", "Equipe empenhada na arrecadação de fundos para o Zezinho"),
            ("image127.jpg", "Registro da campanha de doações para o tratamento de oncologia do Zezinho"),
        ],
        "tags": ["Zezinho", "2024", "arrecadação", "oncologia", "doações", "tratamento", "solidariedade"],
    },
    "2024/2024.03.30 - Vendendo doces e guloseimas para manter o instituto": {
        "gallery": [
            ("image96.jpg", "Presidente Andrea vendendo doces e guloseimas para manter o Instituto em funcionamento"),
            ("image98.jpg", "Mesa de doces e guloseimas da ação de arrecadação do Instituto"),
            ("image101.jpg", "Clientes adquirindo os doces e apoiando a causa do Instituto"),
            ("image103.jpg", "Encerramento da ação de venda de doces com resultado positivo"),
        ],
        "tags": ["doces", "arrecadação", "2024", "sustentabilidade", "Instituto", "Andrea", "criatividade"],
    },
    "2024/2024.04.10 - Visita a Central de Penas e Medidas Alternativas CPMA": {
        "gallery": [
            ("rodrigo e gabriela.jpg", "Rodrigo, encarregado da CPMA, e Gabriela, Psicóloga da CPMA de Joinville"),
            ("image93.jpg", "Reunião de prestação de contas com a CPMA de Joinville"),
            ("image105.jpg", "Equipe do Instituto com representantes da Central de Penas e Medidas Alternativas"),
            ("image106.jpg", "Registro da visita e reunião com a CPMA de Joinville"),
            ("image108.jpg", "Discussão sobre a parceria de seis anos entre o Instituto e a CPMA"),
            ("image150.jpg", "Encerramento da reunião com a CPMA com saldo positivo e novos pacientes"),
        ],
        "tags": ["CPMA", "Central de Penas e Medidas Alternativas", "2024", "Joinville", "parceria", "serviço comunitário", "Rodrigo", "Gabriela"],
    },
    "2024/2024.04.20 - Acompanhamento do paciente Adair": {
        "gallery": [
            ("image152.jpg", "Acompanhamento do paciente Adair, em recuperação após três cirurgias na coluna"),
            ("image154.jpg", "Adair em momento de apoio emocional pelo Instituto Sempre Com Você"),
        ],
        "tags": ["Adair", "2024", "depressão", "coluna", "superação", "cirurgia", "acompanhamento"],
    },
    "2024/2024.04.28 - Apresentação do Instituto Sempre Com Você na Câmara de Vereadores de Joinville": {
        "gallery": [
            ("image156.jpg", "Apresentação do Instituto Sempre Com Você na Câmara de Vereadores de Joinville"),
            ("image157.jpg", "Equipe do Instituto com vereadores de Joinville discutindo a nova sede"),
        ],
        "tags": ["Câmara de Vereadores", "Joinville", "2024", "nova sede", "legislativo", "vereadores", "Bairro Glória"],
    },
    "2024/2024.05.10 - Reunião com Advogado Carlos Meier e Engenheiro Michel": {
        "gallery": [
            ("image158.jpg", "Reunião de planejamento da nova sede com o advogado Carlos Meier e o engenheiro Michel"),
            ("image178.jpg", "Discussão técnica e jurídica sobre o projeto da nova sede do Instituto"),
        ],
        "tags": ["nova sede", "Carlos Meier", "Michel", "2024", "planejamento", "engenharia", "jurídico"],
    },
    "2024/2024.05.20 - Curso de Capacitação na Área de Trabalho Social": {
        "gallery": [
            ("image174.jpg", "Participantes no curso de capacitação em trabalho social"),
            ("image177.jpg", "Momento de aprendizado no curso de capacitação da área social"),
            ("image179.jpg", "Troca de conhecimentos e experiências no curso de trabalho social"),
            ("image180.jpg", "Encerramento do excelente curso de capacitação na área de trabalho social"),
        ],
        "tags": ["capacitação", "trabalho social", "2024", "formação profissional", "assistência social"],
    },
    "2024/2024.06.05 - Reunimos cinco pacientes de uma única vez": {
        "gallery": [
            ("image173.jpg", "Ana, Francisco, Arthur, Lucas e Cirilo reunidos no Instituto Sempre Com Você"),
            ("image175.jpg", "Cinco pacientes trocando experiências em encontro especial"),
            ("image176.jpg", "Momento de alegria e fortalecimento mútuo entre os cinco pacientes"),
        ],
        "tags": ["grupo de pacientes", "2024", "Ana", "Francisco", "Arthur", "Lucas", "Cirilo", "troca de experiências"],
    },
    "2024/2024.06.20 - Visita dos pacientes Arthur, Francisco e Katia com seu esposo que sempre acompanha as sessões": {
        "gallery": [
            ("image172.jpg", "Pacientes Arthur, Francisco e Katia com seu esposo em visita ao Instituto"),
        ],
        "tags": ["Arthur", "Francisco", "Katia", "2024", "família", "apoio", "esposo", "acompanhamento"],
    },
    "2024/2024.06.28 - Atendimento ao Paciente Alderico": {
        "gallery": [
            ("image171.jpg", "Atendimento ao paciente Alderico em sessão de apoio emocional pelo Instituto"),
        ],
        "tags": ["Alderico", "2024", "depressão", "luto", "apoio psicossocial", "acompanhamento"],
    },
    "2024/2024.07.10 - Participação no Curso de Inteligência Emocional": {
        "gallery": [
            ("image138.jpg", "Equipe do Instituto participando do Curso de Inteligência Emocional com Omar Ghanem"),
            ("image141.jpg", "Aprendizado sobre inteligência emocional aplicada ao cuidado de pacientes oncológicos"),
        ],
        "tags": ["inteligência emocional", "Omar Ghanem", "2024", "capacitação", "formação", "palestra"],
    },
    "2024/2024.07.20 - Passeio com Artur Mohr": {
        "gallery": [
            ("image133.jpg", "Passeio especial com o paciente Artur Mohr, hoje estável e voluntário do Instituto"),
            ("image134.jpg", "Artur Mohr celebrando sua vitória em passeio com o Instituto"),
            ("image135.jpg", "Momentos de alegria e leveza no passeio com Artur Mohr"),
            ("image136.jpg", "Artur Mohr e equipe do Instituto em momento de celebração da vida"),
            ("image137.jpg", "Registro do passeio com o ex-paciente e voluntário Artur Mohr"),
            ("image139.jpg", "Artur Mohr sorridente em mais um momento de superação celebrado"),
            ("image140.jpg", "Encerramento do passeio com Artur Mohr com muita gratidão"),
        ],
        "tags": ["Artur Mohr", "2024", "passeio", "superação", "voluntário", "ex-paciente", "celebração"],
    },
    "2024/2024.08.05 - Reconhecimento do trabalho do Instituto por Deputados Estaduais": {
        "gallery": [
            ("image132.jpg", "Equipe do Instituto com o Deputado Estadual Maurício Peixer e o Deputado Fernando Krellig"),
            ("image159.jpg", "Reconhecimento do trabalho do Instituto pelos Deputados Estaduais de Santa Catarina"),
            ("image160.jpg", "Momento de gratidão e reconhecimento institucional pelos deputados estaduais"),
        ],
        "tags": ["Maurício Peixer", "Fernando Krellig", "deputados estaduais", "2024", "Santa Catarina", "reconhecimento", "ALESC"],
    },
    "2024/2024.08.20 - Parabéns Ana Cristina pela recuperação": {
        "gallery": [
            ("image151.jpg", "Celebração da recuperação da paciente Ana Cristina"),
        ],
        "tags": ["Ana Cristina", "2024", "recuperação", "alta médica", "comemoração", "superação", "câncer"],
    },
    "2024/2024.08.30 - Paciente Walter - Exemplo vivo": {
        "gallery": [
            ("image149.jpg", "O paciente Walter em momento que demonstra sua superação e serve de exemplo aos demais"),
        ],
        "tags": ["Walter", "2024", "superação", "exemplo", "câncer", "testemunho", "inspiração"],
    },
    "2024/2024.10.10 - Paciente Priscila": {
        "gallery": [
            ("image153.jpg", "A nova paciente Priscila iniciando seu acompanhamento no Instituto Sempre Com Você"),
            ("image155.jpg", "Priscila em seu primeiro atendimento, inspirada no exemplo da paciente Ana"),
        ],
        "tags": ["Priscila", "2024", "nova paciente", "câncer", "início de tratamento", "esperança"],
    },
    "2024/2024.10.15 - Recebendo apoio do vereador Brandel Junior": {
        "gallery": [
            ("image146.jpg", "Andrea com o Vereador Brandel Junior em encontro de apoio ao Instituto na Câmara de Joinville"),
        ],
        "tags": ["Brandel Junior", "vereador", "2024", "Joinville", "apoio", "Câmara de Vereadores"],
    },
    "2024/2024.10.30 - Paciente Rubens, já recuperado ajuda nosso projeto": {
        "gallery": [
            ("image145.jpg", "Rubens, já recuperado, de volta ao Instituto como parceiro e apoiador"),
            ("image147.jpg", "Rubens ajudando o projeto do Instituto após sua superação do câncer"),
            ("image148.jpg", "Registro da parceria do ex-paciente Rubens com o Instituto Sempre Com Você"),
        ],
        "tags": ["Rubens", "2024", "ex-paciente", "voluntário", "superação", "parceria", "câncer"],
    },
    "2024/2024.11.10 - Apoio aos familiares de vítimas do câncer": {
        "gallery": [
            ("image104.jpg", "Atendimento ao Jovelino, que sofre de depressão pela perda da esposa vítima de câncer"),
            ("image109.jpg", "Conversa de apoio e escuta ativa com familiar enlutado pelo câncer"),
        ],
        "tags": ["familiares", "Jovelino", "2024", "luto", "depressão", "apoio psicossocial", "viuvez", "câncer"],
    },
    "2024/2024.11.10 - Ex-pacientes se tornam voluntários após sucesso no tratamento": {
        "gallery": [
            ("image95.jpg", "Casa cheia com ex-pacientes voluntários reunidos no Instituto"),
            ("image97.jpg", "Grupo de voluntários que foram pacientes e hoje ajudam outros em tratamento"),
            ("image107.jpg", "Momento de gratidão e celebração com os ex-pacientes voluntários do Instituto"),
        ],
        "tags": ["voluntários", "2024", "ex-pacientes", "superação", "gratidão", "serviço", "grupo"],
    },
    "2024/2024.11.20 - Pacientes Lady e Paulo em tratamento conosco": {
        "gallery": [
            ("image102.jpg", "Pacientes Lady e Paulo em atendimento e acompanhamento pelo Instituto Sempre Com Você"),
        ],
        "tags": ["Lady", "Paulo", "2024", "pacientes", "tratamento", "acompanhamento", "câncer"],
    },
    "2024/2024.12.10 - Apresentação da nossa Instituição ao Prefeito de Joinville": {
        "gallery": [
            ("image100.jpg", "Andrea e o Prefeito de Joinville Adriano Silva no Farol do Saber durante apresentação do Instituto"),
        ],
        "tags": ["Prefeito", "Adriano Silva", "2024", "Joinville", "Farol do Saber", "Utilidade Pública", "apresentação institucional"],
    },
    "2024/2024.12.18 - Alinhando os projetos para 2025 com o time de advogados do Instituto": {
        "gallery": [
            ("image86.jpg", "Reunião de planejamento para 2025 com o time de advogados do Instituto"),
            ("image88.jpg", "Alinhamento jurídico e estratégico dos projetos do Instituto para o ano de 2025"),
        ],
        "tags": ["planejamento", "2024", "advogados", "2025", "projetos", "estratégia", "jurídico"],
    },
    "2025/2025.01.10 - Familiares transformam luto em voluntariado": {
        "gallery": [
            ("image92.jpg", "Samuel e Juvelino, viúvos que perderam esposas para o câncer, hoje voluntários do Instituto"),
            ("image124.jpg", "Encontro de Samuel e Juvelino no Instituto Sempre Com Você como voluntários"),
        ],
        "tags": ["Samuel", "Juvelino", "2025", "voluntários", "luto", "familiares", "viuvez", "câncer"],
    },
    "2025/2025.01.25 - Paciente Alceu Roque com muita fé agradesce o tratamento bem sucedido": {
        "gallery": [
            ("image125.jpg", "Alceu Roque com Andrea e padre em momento de gratidão pelo tratamento bem-sucedido"),
            ("image126.jpg", "Alceu Roque celebrando sua recuperação com muita fé e alegria"),
            ("image189.png", "Registro especial do paciente Alceu Roque agradecendo o tratamento do Instituto"),
        ],
        "tags": ["Alceu Roque", "2025", "fé", "alta médica", "superação", "gratidão", "tratamento bem-sucedido"],
    },
    "2025/2025.02.10 - Pacientes Milton e Vinícios com esposas acompanhando o tratamento": {
        "gallery": [
            ("image118.jpg", "Milton e Vinícios com suas esposas em atendimento no Instituto Sempre Com Você"),
            ("image120.jpg", "As esposas dos pacientes Milton e Vinícios como parte fundamental do processo de cura"),
        ],
        "tags": ["Milton", "Vinícios", "2025", "pacientes", "esposas", "família", "acompanhamento", "apoio"],
    },
    "2025/2025.02.20 - Mesa posta para oito pacientes": {
        "gallery": [
            ("image113.jpg", "Mesa posta para os oito pacientes do Instituto reunidos em encontro especial"),
            ("image121.jpg", "Senhor Paulo, de 76 anos, com o aparelho auditivo conquistado com apoio do Instituto"),
            ("image122.jpg", "Momentos de celebração e partilha no encontro com os oito pacientes"),
        ],
        "tags": ["mesa posta", "2025", "grupo de pacientes", "Paulo", "aparelho auditivo", "celebração", "partilha"],
    },
    "2025/2025.03.10 - Paciente Margarete": {
        "gallery": [
            ("image58.jpg", "Paciente Margarete em acompanhamento pelo Instituto Sempre Com Você"),
            ("image112.jpg", "Momento de cuidado e apoio à paciente Margarete"),
        ],
        "tags": ["Margarete", "2025", "paciente", "câncer", "acompanhamento", "apoio emocional"],
    },
    "2025/2025.03.20 - Antes pacientes, agora voluntários": {
        "gallery": [
            ("image50.jpg", "Alceu e Eloi, antes pacientes e hoje voluntários do Instituto Sempre Com Você"),
        ],
        "tags": ["Alceu", "Eloi", "2025", "voluntários", "ex-pacientes", "superação", "gratidão"],
    },
    "2025/2025.04.10 - Evento beneficente para ajudar a manter nossa instituição": {
        "gallery": [
            ("image39.jpg", "Mesa com alimentos e itens do evento beneficente de abril de 2025"),
            ("image41.jpg", "Participantes da terceira idade animando o evento beneficente"),
            ("image43.jpg", "Momentos de alegria e solidariedade no evento beneficente de abril"),
            ("image45.jpg", "Comunidade reunida para apoiar o Instituto no evento beneficente"),
            ("image48.jpg", "Registros do evento beneficente com participação da terceira idade"),
            ("image53.jpg", "Ambiente festivo e solidário do evento beneficente de abril de 2025"),
            ("image55.jpg", "Encerramento do evento beneficente com resultado positivo para o Instituto"),
        ],
        "tags": ["evento beneficente", "2025", "terceira idade", "arrecadação", "solidariedade", "abril"],
    },
    "2025/2025.04.20 - Palavras amigas das Freiras": {
        "gallery": [
            ("image36.jpg", "Alceu, Andrea e duas freiras em conversa amiga de fé e esperança"),
        ],
        "tags": ["freiras", "2025", "fé", "esperança", "Alceu", "visita", "espiritualidade", "acolhimento"],
    },
    "2025/2025.05.28 - Nova voluntária - ex-paciente Cecília": {
        "gallery": [
            ("image83.jpg", "Cecília, nova voluntária e ex-paciente do Instituto, segurando placa de apoio à causa"),
        ],
        "tags": ["Cecília", "2025", "voluntária", "ex-paciente", "superação", "gratidão", "engajamento"],
    },
    "2025/2025.06.04 - Evento Beneficente de Junho": {
        "gallery": [
            ("image10.jpg", "Preparativos do evento beneficente de junho com produtos organizados para venda"),
            ("image63.jpg", "Evento beneficente de junho em pleno andamento com público presente"),
            ("image65.jpg", "Terceira idade e familiares participando ativamente do evento beneficente"),
            ("image68.jpg", "Comunidade reunida no evento beneficente de junho de 2025"),
            ("image70.jpg", "Momentos de alegria e solidariedade no evento beneficente"),
            ("image72.jpg", "Ambiente festivo e acolhedor do evento beneficente de junho"),
            ("image74.jpg", "Participantes do evento beneficente apoiando a missão do Instituto"),
            ("image76.jpg", "Registros do evento beneficente de junho com ótima participação"),
            ("image78.jpg", "Voluntários e familiares trabalhando juntos no evento beneficente"),
            ("image82.jpg", "Encerramento do evento beneficente de junho com gratidão e sucesso"),
        ],
        "tags": ["evento beneficente", "2025", "junho", "terceira idade", "familiares", "arrecadação", "solidariedade"],
    },
}


def already_has_gallery(content):
    return "<!-- gallery -->" in content


def already_has_tags(content):
    return "<!-- tags -->" in content


count = 0
skipped = 0
for rel_path, data in updates.items():
    file_path = os.path.join(base, rel_path, "blog-post.md").replace("\\", "/")

    with open(file_path, "r", encoding="utf-8") as f:
        existing = f.read()

    if already_has_gallery(existing) and already_has_tags(existing):
        print(f"SKIP (already complete): {rel_path}")
        skipped += 1
        continue

    gallery_lines = "\n".join(f'- ![{alt}](./{fname})' for fname, alt in data["gallery"])
    tags_lines = "\n".join(f'- {t}' for t in data["tags"])
    append_content = f'\n<!-- gallery -->\n{gallery_lines}\n<!-- /gallery -->\n\n<!-- tags -->\n{tags_lines}\n<!-- /tags -->\n'

    with open(file_path, "a", encoding="utf-8") as f:
        f.write(append_content)

    print(f"Updated: {rel_path}")
    count += 1

print(f"\nDone! Updated {count} files. Skipped {skipped} (already complete).")
