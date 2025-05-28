---
id: roadmap.md
title: Roteiro de Milvus
related_key: Milvus roadmap
summary: >-
  Milvus é uma base de dados vetorial de código aberto criada para alimentar
  aplicações de IA. Aqui está o nosso roteiro para orientar o nosso
  desenvolvimento.
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Roteiro de Milvus<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>Bem-vindo ao roteiro do Milvus! Junte-se a nós na nossa viagem contínua para melhorar e fazer evoluir o Milvus. Estamos entusiasmados por partilhar as nossas realizações, planos futuros e a nossa visão do que está para vir. O nosso roteiro é mais do que uma lista de funcionalidades futuras - reflecte o nosso compromisso com a inovação e a nossa dedicação ao trabalho com a comunidade. Convidamo-lo a mergulhar no nosso roteiro, a dar o seu feedback e a ajudar a moldar o futuro do Milvus!</p>
<h2 id="Roadmap" class="common-anchor-header">Roteiro<button data-href="#Roadmap" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><table>
    <thead>
        <tr>
            <th>Categoria</th>
            <th>Milvus 2.5.x (Alcançado em versões recentes)</th>
            <th>Próximo lançamento - Milvus 2.6 (meados de CY25)</th>
            <th>Roteiro futuro - Milvus 3.0 (Dentro de 1 ano)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Processamento de dados não estruturados com base em IA</strong><br/><i>Reforço da capacidade de processar e analisar dados não estruturados utilizando modelos de IA e tecnologias avançadas</i></td>
            <td><strong>Pesquisa de texto integral</strong><br/><i>Suporta pesquisa de texto integral com Sparse-BM25. A nova API aceita texto como entrada e gera automaticamente um vetor esparso dentro do Milvus</i><br/><br/><strong>Vetor esparso (GA)</strong><br/><i>Apoiar o armazenamento eficiente e o método de indexação para vetor esparso</i><br/></td>
            <td><strong>Entrada e saída de dados</strong><br/><i>Suporta os principais serviços de modelo para ingerir texto original</i><br/><br/><strong>Reranker avançado</strong><br/><i>Suporta rerankers baseados em modelos e função de pontuação definida pelo utilizador</i><br/><br/><strong>Pesquisa</strong> iterativa<br/><i>Revê o vetor de consulta com base na rotulagem do utilizador</i></td>
            <td><strong>Tensores</strong><i>de suporte</i><br/><i>Suportar lista de vectores, utilização típica como Colbert, Copali e representação de vídeo</i><br/><br/><strong>Suportar mais tipos de dados</strong><br/><i>por exemplo, data e hora, mapa, GIS</i></td>
        </tr>
        <tr>
            <td><strong>Qualidade e desempenho da pesquisa</strong><br/><i>Fornecer resultados precisos, relevantes e rápidos através da otimização da arquitetura, dos algoritmos e das APIs</i></td>
            <td><strong>Função de correspondência de texto</strong><br/><i>Filtrar rapidamente palavras-chave/tokens em texto/varchar</i><br/><br/><strong>Melhoria da pesquisa de agrupamento</strong><br/><i>Introduzir group_size e adicionar suporte a group by na pesquisa híbrida</i><br/><br/><strong>Índice de bitmap e índice invertido</strong><br/><i>Acelerar a filtragem em tags</i></td>
            <td><strong>Correspondência avançada</strong><br/><i>por exemplo, phrase_match, multi_match </i><br/><br/><strong>Melhoria do Analyzer</strong><br/><i>Melhoria do Analyzer com suporte alargado de tokenizer e observabilidade melhorada</i><br/><br/><strong>Filtragem</strong> JSON<br/><i>Otimizar a indexação e análise JSON para um processamento mais rápido</i></td>
            <td><strong>Capacidade de ordenação</strong><br/><i>Ordenação por campos escalares durante a execução</i><br/><br/><strong>Suporte para agrupamento de dados</strong><br/><i>Co-localidade de dados</i></td>
        </tr>
        <tr>
            <td><strong>Funcionalidade e gestão ricas</strong><br/><i>Funcionalidades de gestão de dados robustas e fáceis de desenvolver</i></td>
            <td><strong>Suporte de ficheiros csv na importação de dados</strong><br/><i>Bulkinsert suporta o formato csv</i><br/><br/><strong>Suporte de valores nulos e por defeito</strong><br/><i>Os tipos</i> nulos<i>e por defeito facilitam a importação de dados de outros SGBD</i><br/><br/><strong>Milvus WebUI (Beta)</strong><br/><i>Ferramentas de gestão visual para DBAs</i></td>
            <td><strong>Alteração do esquema</strong><br/><i>por exemplo, adicionar/eliminar campo, modificar o comprimento varchar</i><br/><br/><strong>Agregações</strong><br/><i>Agregações de campos escalares, por exemplo, contagem, valor distinto, mínimo, máximo</i><br/><br/><strong>Suporte UDF</strong><br/><i>Função definida pelo utilizador</i></td>
            <td><strong>Atualização</strong><i>em massa</i><br/><i>Suporta actualizações em massa do valor de um campo específico</i><br/><br/><strong>Desduplicação da chave primária</strong><br/><i>Utilizando o índice pk global</i><br/><br/><strong>Controlo de versão e restauro</strong><i>de dados</i><br/><i>Suporta controlo de versão de dados por instantâneo</i></td>
        </tr>
        <tr>
            <td><strong>Eficiência de custos e arquitetura</strong><br/><i>Sistemas topo de gama com estabilidade, eficiência de custos e implementação simplificada.</i></td>
            <td><strong>Otimização da memória</strong><br/><i>Reduzir o OOM e melhorar a carga</i><br/><br/><strong>Compactação de clusters</strong><br/><i>Redistribuição de dados com base na configuração para acelerar o desempenho de leitura</i><br/><br/><strong>Storage Format V2 (Beta)</strong><br/><i>Design de formatos universais e base para acesso a dados baseados em disco</i></td>
            <td><strong>Armazenamento em camadas</strong><br/><i>Suporte para armazenamento quente e frio para otimização de custos</i><br/><br/><strong>Stream Node</strong><br/><i>Processar dados de streaming e simplificar o fluxo de escrita incremental</i><br/><br/><strong>MixCoord</strong><br/><i>Fundir lógicas Coord numa só</i></td>
            <td><strong>Vetor Lake</strong><br/><i>Solução offline rentável, conetor spark e integração com iceberg</i><br/><br/><strong>Componente Logstore</strong><br/><i>Reduzir as dependências de componentes externos como o pulsar</i><br/><br/><strong>Política de evicção de dados</strong><br/><i>Os utilizadores podem definir a sua própria política de evicção</i></td>
        </tr>
    </tbody>
</table>
<ul>
<li>O nosso roteiro está normalmente estruturado em três partes: a versão mais recente, a próxima versão e uma visão de médio a longo prazo para o próximo ano.</li>
<li>À medida que progredimos, aprendemos continuamente e, ocasionalmente, ajustamos o nosso foco, adicionando ou removendo itens conforme necessário.</li>
<li>Estes planos são indicativos e estão sujeitos a alterações, podendo variar consoante os serviços de subscrição.</li>
<li>Cumprimos rigorosamente o nosso roteiro, com as nossas <a href="/docs/pt/release_notes.md">notas de lançamento</a> a servirem de referência.</li>
</ul>
<h2 id="How-to-contribute" class="common-anchor-header">Como contribuir<button data-href="#How-to-contribute" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Sendo um projeto de código aberto, o Milvus prospera com as contribuições da comunidade. Eis como pode fazer parte do nosso percurso.</p>
<h3 id="Share-feedback" class="common-anchor-header">Partilhar feedback</h3><ul>
<li><p>Reportar problemas: Encontrou um erro ou tem uma sugestão? Abra um problema na nossa <a href="https://github.com/milvus-io/milvus/issues">página GitHub</a>.</p></li>
<li><p>Sugestões de recursos: Tem ideias para novas funcionalidades ou melhorias? Junte-se à conversa no <a href="https://github.com/milvus-io/milvus/discussions/40263">nosso tópico de discussão ativo</a>.</p></li>
</ul>
<h3 id="Code-contributions" class="common-anchor-header">Contribuições de código</h3><ul>
<li><p>Solicitações pull: Contribua diretamente para a nossa <a href="https://github.com/milvus-io/milvus/pulls">base de código</a>. Quer se trate de corrigir erros, adicionar funcionalidades ou melhorar a documentação, as suas contribuições são bem-vindas.</p></li>
<li><p>Guia de desenvolvimento: Consulte o nosso <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">Guia do contribuidor</a> para obter diretrizes sobre contribuições de código.</p></li>
</ul>
<h3 id="Spread-the-word" class="common-anchor-header">Espalhe a palavra</h3><ul>
<li><p>Partilha social: Gosta do Milvus? Partilhe os seus casos de utilização e experiências nas redes sociais e em blogues de tecnologia.</p></li>
<li><p>Marque-nos com uma estrela no GitHub: Mostre o seu apoio marcando com uma estrela o nosso <a href="https://github.com/milvus-io/milvus">repositório GitHub</a>.</p></li>
</ul>
