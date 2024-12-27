---
id: release_notes.md
summary: Notas de lançamento do Milvus
title: Notas de lançamento
---
<h1 id="Release-Notes" class="common-anchor-header">Notas de lançamento<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>Descubra o que há de novo no Milvus! Esta página resume as novas funcionalidades, melhorias, problemas conhecidos e correcções de erros em cada versão. Pode encontrar as notas de lançamento para cada versão lançada após a v2.5.0 nesta secção. Sugerimos que visite regularmente esta página para se informar sobre as actualizações.</p>
<h2 id="v251" class="common-anchor-header">v2.5.1<button data-href="#v251" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: December 26, 2024</p>
<table>
<thead>
<tr><th>Versão do Milvus</th><th>Versão do Python SDK</th><th>Versão do SDK do Node.js</th><th>Versão do Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>O Milvus 2.5.1 concentra-se numa série de correcções de erros que abordam o carregamento de memória, listagens RBAC, equilíbrio de nós de consulta e indexação de segmentos selados, ao mesmo tempo que melhora a IU Web e os interceptores. Recomendamos vivamente a atualização para a versão 2.5.1 para maior estabilidade e fiabilidade.</p>
<h3 id="Improvement" class="common-anchor-header">Melhorias</h3><ul>
<li>Atualização das páginas de recolha e consulta da IU da Web.<a href="https://github.com/milvus-io/milvus/pull/38701">(#38701</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Correcções de erros</h3><ul>
<li>Corrigidos problemas de OOM adicionando um fator de memória às estimativas de carregamento.<a href="https://github.com/milvus-io/milvus/pull/38722">(#38722</a>)</li>
<li>Corrigida a expansão do grupo de privilégios ao listar políticas no RootCoord.<a href="https://github.com/milvus-io/milvus/pull/38760">(#38760</a>)</li>
<li>Corrigidos os problemas com a listagem de grupos de privilégios e colecções.<a href="https://github.com/milvus-io/milvus/pull/38738">(#38738</a>)</li>
<li>Corrigido o balanceador para evitar sobrecarregar repetidamente o mesmo nó de consulta.<a href="https://github.com/milvus-io/milvus/pull/38724">(#38724</a>)</li>
<li>Corrigidas as tarefas de equilíbrio inesperadas acionadas após o reinício do QueryCoord.<a href="https://github.com/milvus-io/milvus/pull/38725">(#38725</a>)</li>
<li>Corrigidas as actualizações de configuração de carga que não se aplicavam ao carregamento de colecções.<a href="https://github.com/milvus-io/milvus/pull/38737">(#38737</a>)</li>
<li>Corrigida a contagem de leitura zero durante a importação de dados.<a href="https://github.com/milvus-io/milvus/pull/38695">(#38695</a>)</li>
<li>Corrigida a descodificação Unicode para chaves JSON em expressões.<a href="https://github.com/milvus-io/milvus/pull/38653">(#38653</a>)</li>
<li>Corrigido o nome do intercetor DB para alterCollectionField em 2.5. <a href="https://github.com/milvus-io/milvus/pull/38663">(#38663</a>)</li>
<li>Corrigido parâmetros de índice vazios para segmentos selados ao usar a pesquisa de força bruta BM25.<a href="https://github.com/milvus-io/milvus/pull/38752">(#38752</a>)</li>
</ul>
<h2 id="v250" class="common-anchor-header">v2.5.0<button data-href="#v250" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: 23 de dezembro de 2024</p>
<table>
<thead>
<tr><th>Versão do Milvus</th><th>Versão do Python SDK</th><th>Versão do SDK do Node.js</th><th>Versão do Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.0</td><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>O Milvus 2.5.0 traz avanços significativos para melhorar a usabilidade, a escalabilidade e o desempenho dos utilizadores que lidam com pesquisa vetorial e gestão de dados em grande escala. Com esta versão, o Milvus integra novas funcionalidades poderosas, como a pesquisa baseada em termos, a compactação de clusters para consultas optimizadas e o suporte versátil para métodos de pesquisa vetorial esparsos e densos. As melhorias na gestão de clusters, indexação e tratamento de dados introduzem novos níveis de flexibilidade e facilidade de utilização, tornando o Milvus uma base de dados vetorial ainda mais robusta e fácil de utilizar.</p>
<h3 id="Key-Features" class="common-anchor-header">Caraterísticas principais</h3><h4 id="Full-Text-Search" class="common-anchor-header">Pesquisa de texto completo</h4><p>Milvus 2.5 suporta pesquisa de texto completo implementada com Sparse-BM25! Esta funcionalidade é um complemento importante às fortes capacidades de pesquisa semântica do Milvus, especialmente em cenários que envolvem palavras raras ou termos técnicos. Em versões anteriores, o Milvus suportava vectores esparsos para ajudar em cenários de pesquisa por palavras-chave. Estes vectores esparsos eram gerados fora do Milvus por modelos neurais como o SPLADEv2/BGE-M3 ou modelos estatísticos como o algoritmo BM25.</p>
<p>Com a ajuda do <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, o Milvus 2.5 tem analisadores integrados e extração de vectores esparsos, alargando a API de apenas receber vectores como entrada para aceitar diretamente texto. As informações estatísticas do BM25 são actualizadas em tempo real à medida que os dados são inseridos, melhorando a facilidade de utilização e a precisão. Além disso, os vectores esparsos baseados em algoritmos de vizinho mais próximo aproximado (ANN) oferecem um desempenho mais poderoso do que os sistemas de pesquisa de palavras-chave padrão.</p>
<p>Para obter detalhes, consulte <a href="/docs/pt/analyzer-overview.md">Visão geral do Analyzer</a> e <a href="/docs/pt/full-text-search.md">Pesquisa de texto completo</a>.</p>
<h4 id="Cluster-Management-WebUI-Beta" class="common-anchor-header">WebUI de gestão de clusters (Beta)</h4><p>Para melhor suportar dados massivos e funcionalidades ricas, o design sofisticado do Milvus inclui várias dependências, numerosas funções de nó, estruturas de dados complexas e muito mais. Estes aspectos podem representar desafios para a utilização e manutenção.</p>
<p>Milvus 2.5 introduz uma WebUI de Gerenciamento de Cluster embutida, reduzindo a dificuldade de manutenção do sistema através da visualização de informações complexas do ambiente de tempo de execução do Milvus. Isso inclui detalhes de bancos de dados e coleções, segmentos, canais, dependências, estado de saúde do nó, informações de tarefas, consultas lentas e muito mais.</p>
<p>Para mais detalhes, consulte <a href="/docs/pt/milvus-webui.md">Milvus WebUI</a>.</p>
<h4 id="Text-Match" class="common-anchor-header">Correspondência de texto</h4><p>Milvus 2.5 utiliza analisadores e indexação de <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> para pré-processamento de texto e construção de índices, suportando correspondência precisa de linguagem natural de dados de texto com base em termos específicos. Esta funcionalidade é utilizada principalmente para pesquisa filtrada para satisfazer condições específicas e pode incorporar filtragem escalar para refinar os resultados da consulta, permitindo pesquisas de semelhança dentro de vectores que satisfazem critérios escalares.</p>
<p>Para obter detalhes, consulte <a href="/docs/pt/analyzer-overview.md">Visão geral do Analyzer</a> e <a href="/docs/pt/keyword-match.md">Correspondência de texto</a>.</p>
<h4 id="Bitmap-Index" class="common-anchor-header">Índice de bitmap</h4><p>Um novo índice de dados escalar foi adicionado à família Milvus. O índice BitMap utiliza uma matriz de bits, de comprimento igual ao número de linhas, para representar a existência de valores e acelerar as pesquisas.</p>
<p>Os índices Bitmap têm sido tradicionalmente eficazes para campos de baixa cardinalidade, que têm um número modesto de valores distintos - por exemplo, uma coluna que contém informações de género com apenas dois valores possíveis: masculino e feminino.</p>
<p>Para obter detalhes, consulte <a href="/docs/pt/bitmap.md">Índice de bitmap</a>.</p>
<h4 id="Nullable--Default-Value" class="common-anchor-header">Nullable &amp; Valor Padrão</h4><p>Milvus agora suporta a configuração de propriedades anuláveis e valores padrão para campos escalares que não sejam o campo de chave primária. Para campos escalares marcados como <code translate="no">nullable=True</code>, os utilizadores podem omitir o campo ao inserir dados; o sistema irá tratá-lo como um valor nulo ou valor padrão (se definido) sem lançar um erro.</p>
<p>Os valores por defeito e as propriedades anuláveis proporcionam uma maior flexibilidade ao Milvus. Os utilizadores podem utilizar esta funcionalidade para campos com valores incertos ao criar colecções. Também simplifica a migração de dados de outros sistemas de base de dados para o Milvus, permitindo a manipulação de conjuntos de dados que contêm valores nulos, preservando as definições originais de valores por defeito.</p>
<p>Para mais informações, consulte <a href="/docs/pt/nullable-and-default.md">Nullable &amp; Default Value</a>.</p>
<h4 id="Faiss-based-HNSW-SQPQPRQ" class="common-anchor-header">HNSW SQ/PQ/PRQ baseado em Faiss</h4><p>Através de uma estreita colaboração com a comunidade Faiss, o algoritmo HNSW em Faiss registou melhorias significativas tanto na funcionalidade como no desempenho. Por questões de estabilidade e manutenção, o Milvus 2.5 migrou oficialmente seu suporte ao HNSW da hnswlib para o Faiss.</p>
<p>Baseado em Faiss, Milvus 2.5 suporta múltiplos métodos de quantização em HNSW para atender às necessidades de diferentes cenários: SQ (Scalar Quantizers), PQ (Product Quantizer), e PRQ (Product Residual Quantizer). SQ e PQ são mais comuns; SQ oferece um bom desempenho de consulta e velocidade de construção, enquanto PQ oferece uma melhor recuperação com o mesmo rácio de compressão. Muitas bases de dados vectoriais utilizam normalmente a quantização binária, que é uma forma simples de quantização SQ.</p>
<p>PRQ é uma fusão de PQ e AQ (Quantizador Aditivo). Em comparação com o PQ, requer tempos de construção mais longos para proporcionar uma melhor recuperação, especialmente a taxas de compressão elevadas, dizendo compressão binária.</p>
<h4 id="Clustering-Compaction-Beta" class="common-anchor-header">Compactação por agrupamento (Beta)</h4><p>O Milvus 2.5 introduz o Clustering Compaction para acelerar as pesquisas e reduzir os custos em grandes colecções. Ao especificar um campo escalar como uma chave de agrupamento, os dados são redistribuídos por intervalo para otimizar o armazenamento e a recuperação. Agindo como um índice global, este recurso permite que o Milvus retire eficientemente os dados durante as consultas baseadas em metadados de agrupamento, melhorando o desempenho da pesquisa quando filtros escalares são aplicados.</p>
<p>Para obter detalhes, consulte <a href="/docs/pt/clustering-compaction.md">Compactação de clustering</a>.</p>
<h3 id="Other-Features" class="common-anchor-header">Outros recursos</h3><h4 id="Streaming-Node-Beta" class="common-anchor-header">Nó de fluxo contínuo (Beta)</h4><p>O Milvus 2.5 introduz um novo componente chamado nó de streaming, que fornece serviços de Write-Ahead Logging (WAL). Isto permite ao Milvus obter consenso antes e depois de ler e escrever canais, desbloqueando novas caraterísticas, funcionalidades e optimizações. Esta funcionalidade está desactivada por defeito no Milvus 2.5 e estará oficialmente disponível na versão 3.0.</p>
<h4 id="IPv6-Support" class="common-anchor-header">Suporte a IPv6</h4><p>Milvus agora suporta IPv6, permitindo maior conetividade e compatibilidade de rede.</p>
<h4 id="CSV-Bulk-Import" class="common-anchor-header">Importação em massa de CSV</h4><p>Para além dos formatos JSON e Parquet, o Milvus suporta agora a importação direta em massa de dados em formato CSV.</p>
<h4 id="Expression-Templates-for-Query-Acceleration" class="common-anchor-header">Modelos de Expressão para Aceleração de Consultas</h4><p>Milvus agora suporta modelos de expressões, melhorando a eficiência da análise de expressões, particularmente em cenários com expressões complexas.</p>
<p>Para obter detalhes, consulte <a href="/docs/pt/filtering-templating.md">Modelos de filtros</a>.</p>
<h4 id="GroupBy-Enhancements" class="common-anchor-header">Melhorias no GroupBy</h4><ul>
<li><strong>Tamanho do grupo personalizável</strong>: Adicionado suporte para especificar o número de entradas retornadas para cada grupo.</li>
<li><strong>Pesquisa GroupBy híbrida</strong>: Suporta a pesquisa GroupBy híbrida com base em várias colunas de vetor.</li>
</ul>
<h4 id="Iterator-Enhancements" class="common-anchor-header">Aprimoramentos do iterador</h4><ul>
<li><strong>Suporte a MVCC</strong>: Os utilizadores podem agora utilizar iteradores sem serem afectados por alterações de dados subsequentes, como inserções e eliminações, graças ao Controlo de Concorrência Multi-Versão (MVCC).</li>
<li><strong>Cursor Persistente</strong>: O Milvus suporta agora um cursor persistente para o QueryIterator, permitindo aos utilizadores retomar a iteração a partir da última posição após um reinício do Milvus sem necessidade de reiniciar todo o processo de iteração.</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Melhorias</h3><h4 id="Deletion-Optimization" class="common-anchor-header">Otimização da eliminação</h4><p>Melhoria da velocidade e redução da utilização de memória para eliminações em grande escala, optimizando a utilização de bloqueios e a gestão de memória.</p>
<h4 id="Dependencies-Upgrade" class="common-anchor-header">Atualização de dependências</h4><p>Atualizada para ETCD 3.5.16 e Pulsar 3.0.7 LTS, corrigindo CVEs existentes e melhorando a segurança. Nota: A atualização para o Pulsar 3.x não é compatível com as versões anteriores 2.x.</p>
<p>Para os utilizadores que já têm uma implementação Milvus a funcionar, é necessário atualizar os componentes ETCD e Pulsar antes de poder utilizar as novas caraterísticas e funções. Para obter detalhes, consulte <a href="/docs/pt/upgrade-pulsar-v3.md">Atualizar a Pulsar de 2.x para 3.x</a></p>
<h4 id="Local-Storage-V2" class="common-anchor-header">Armazenamento local V2</h4><p>Introduziu um novo formato de arquivo local no Milvus 2.5, melhorando a eficiência de carregamento e consulta para dados escalares, reduzindo a sobrecarga de memória e estabelecendo as bases para futuras otimizações.</p>
<h4 id="Expression-Parsing-Optimization" class="common-anchor-header">Otimização da análise de expressões</h4><p>Melhoria da análise de expressões através da implementação de cache para expressões repetidas, atualização do ANTLR e otimização do desempenho das cláusulas <code translate="no">NOT IN</code>.</p>
<h4 id="Improved-DDL-Concurrency-Performance" class="common-anchor-header">Desempenho aprimorado da simultaneidade de DDL</h4><p>Otimizado o desempenho de simultaneidade das operações da Linguagem de Definição de Dados (DDL).</p>
<h4 id="RESTful-API-Feature-Alignment" class="common-anchor-header">Alinhamento de recursos da API RESTful</h4><p>Alinhamento das funcionalidades da API RESTful com outros SDKs para fins de consistência.</p>
<h4 id="Security--Configuration-Updates" class="common-anchor-header">Atualizações de segurança e configuração</h4><p>Suporte a TLS para proteger a comunicação entre nós em ambientes mais complexos ou corporativos. Para obter detalhes, consulte <a href="/docs/pt/tls.md">Configuração de segurança</a>.</p>
<h4 id="Compaction-Performance-Enhancements" class="common-anchor-header">Aprimoramentos de desempenho de compactação</h4><p>Removidas as limitações de segmento máximo na compactação mista e agora prioriza primeiro os segmentos menores, melhorando a eficiência e acelerando as consultas em conjuntos de dados grandes ou fragmentados.</p>
<h4 id="Score-Based-Channel-Balancing" class="common-anchor-header">Balanceamento de canais com base em pontuação</h4><p>Introduzida uma política que equilibra dinamicamente as cargas entre os canais, melhorando a utilização de recursos e a estabilidade geral em implantações de grande escala.</p>
