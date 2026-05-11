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
    </button></h1><p>Descubra o que há de novo no Milvus! Esta página resume as novas funcionalidades, melhorias, problemas conhecidos e correcções de erros em cada versão. Sugerimos que visite regularmente esta página para saber mais sobre as actualizações.</p>
<h2 id="v30-beta" class="common-anchor-header">v3.0-beta<button data-href="#v30-beta" class="anchor-icon" translate="no">
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
    </button></h2><p>Data de lançamento: 9 de maio de 2026</p>
<table>
<thead>
<tr><th>Versão do Milvus</th><th>Versão do SDK do Python</th><th>Versão do SDK do Node.js</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>O Milvus 3.0-beta amplia a base de dados vetorial Milvus com uma nova integração no ecossistema open lake: External Collection permite que o Milvus consulte tabelas de lagos externos sem cópia, e o Spark pode ler coleções do Milvus diretamente através do Snapshot. A versão também traz uma recuperação mais rica, um esquema mais expressivo, uma personalização mais profunda da pesquisa de texto, dados mais finos e controlos do ciclo de vida do modelo, e mais controlos do lado do operador. O Milvus 3.0 é o núcleo central do Zilliz Lakebase, alimentando seu serviço unificado, descoberta e lote.</p>
<h3 id="Key-Features" class="common-anchor-header">Principais recursos<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">Coleta externa</h4><p>Nos pipelines de dados de IA típicos, terabytes de embeddings e metadados já se encontram no armazenamento de objectos como tabelas Parquet, Lance ou Iceberg. Copiar esses dados para o Milvus duplica o custo de armazenamento, adiciona um pipeline ETL que tem de ser mantido em sincronia e afasta a governação dos dados do cliente.</p>
<p>A coleção externa elimina a cópia. Uma coleção Milvus pode fazer referência a ficheiros onde estes já se encontram, e o Milvus gere apenas o esquema, os índices e a execução de consultas. Uma atualização incremental mantém a coleção alinhada com os ficheiros subjacentes. Os clientes cujos dados não podem sair do lago, como as equipas de finanças e de cuidados de saúde, podem executar a recuperação de vectores em relação a esses dados onde eles se encontram. Um único conjunto de dados residente no lago também pode ser servido a partir de várias instâncias do Milvus ao mesmo tempo.</p>
<p>Para obter mais informações, consulte <a href="/docs/pt/create-an-external-collection.md">Criar uma coleção externa</a>.</p>
<h4 id="Snapshot" class="common-anchor-header">Instantâneo</h4><p>O serviço e a descoberta em lote geralmente precisam da mesma coleção ao mesmo tempo. A avaliação do modelo A/B, a desduplicação em grande escala, a validação de backfill e a reversão de versão precisam de uma exibição estável da coleção enquanto as gravações ainda estão sendo feitas.</p>
<p>O Snapshot cria uma visualização pontual e somente leitura de uma coleção, referenciando segmentos existentes em vez de copiar dados, de modo que o custo marginal de armazenamento é próximo de zero. Os trabalhos em lote podem ler a partir do instantâneo sob isolamento no estilo MVCC enquanto a coleção ativa continua aceitando gravações.</p>
<p>Para obter mais informações, consulte <a href="/docs/pt/snapshots.md">Instantâneos</a>, <a href="/docs/pt/manage-snapshots.md">Gerenciar instantâneos</a> e <a href="/docs/pt/snapshot-use-cases.md">Casos de uso de instantâneos</a>.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Consulta / Pesquisa Ordenar por</h4><p>A Pesquisa e a Consulta agora aceitam a ordenação de vários campos, com a ordenação empurrada para o kernel do Milvus e <code translate="no">ASC</code> / <code translate="no">DESC</code> configurável por campo. Isso fecha uma lacuna comum na produção: O Top-K por distância, por si só, muitas vezes não corresponde às necessidades da empresa quando o item mais semelhante não é o mais barato, o mais recente ou o mais popular.</p>
<p>Os aplicativos não precisam mais buscar resultados em excesso e reordenar no cliente para expressar a classificação composta.</p>
<p>Para obter mais informações, consulte <a href="/docs/pt/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">Ordenar resultados de pesquisa por campos escalares</a> e <a href="/docs/pt/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">Ordenar resultados de consulta</a>.</p>
<h4 id="Query-Aggregation" class="common-anchor-header">Agregação de consultas</h4><p>Produzir estatísticas de distribuição de locatários, contagens de campos completos ou progresso de lançamento de versão de uma Coleção Milvus costumava requerer puxar entidades correspondentes de volta para o cliente e agregá-las lá. O Milvus 3.0 coloca a agregação escalar no estilo SQL no kernel. Uma chamada de consulta aceita <code translate="no">group_by_fields</code> e expressões de agregação em <code translate="no">output_fields</code>, incluindo <code translate="no">count(*)</code>, <code translate="no">count(&lt;field&gt;)</code>, <code translate="no">sum(&lt;field&gt;)</code>, <code translate="no">avg(&lt;field&gt;)</code>, <code translate="no">min(&lt;field&gt;)</code>, e <code translate="no">max(&lt;field&gt;)</code>. A agregação é avaliada no lado do servidor após a filtragem.</p>
<p>Para obter mais informações, consulte <a href="/docs/pt/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">Agregar resultados de consulta</a>.</p>
<h4 id="Null-Vector" class="common-anchor-header">Vetor nulo</h4><p>Os embeddings são muitas vezes produzidos de forma assíncrona, pelo que uma entidade pode chegar antes do seu vetor. Os dados multimodais também têm lacunas naturais, como um vídeo sem legendas ou um produto sem uma imagem. As versões anteriores não tinham uma boa resposta: as aplicações ou atrasavam a escrita até que o vetor estivesse pronto ou preenchiam um vetor de substituição, e ambas as escolhas prejudicavam a qualidade da recuperação.</p>
<p>O Milvus 3.0 suporta NULL em campos vetoriais em todos os seis tipos de vetores. A pesquisa ignora automaticamente os vetores NULL, a qualidade da recuperação não é afetada e os vetores NULL não ocupam efetivamente nenhum espaço de armazenamento. <code translate="no">AddField</code> também se estende a campos vetoriais sob esta mudança: com <code translate="no">nullable=True</code>, uma coleção existente pode crescer novos campos vetoriais on-line sem uma reconstrução.</p>
<p>Para obter mais informações, consulte <a href="/docs/pt/nullable-and-default.md">Campos anuláveis</a>.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Dicionário personalizado e dicionário de sinônimos</h4><p>Os tokenizadores prontos para uso nem sempre atendem aos requisitos de qualidade de pesquisa de produção. Domínios verticais chineses, como medicina, direito e química, e corpora multilíngues podem se beneficiar substancialmente de dicionários personalizados e tabelas de sinônimos. Até agora, esses recursos viviam principalmente como reescritas de consultas do lado da aplicação.</p>
<p>O Milvus 3.0 adiciona um mecanismo FileResource para registar dicionários personalizados de tokenizadores, listas de sinónimos, listas de stop-word e regras de decomposição. Uma vez registado, um recurso pode ser referenciado a partir de qualquer tokenizador ou filtro e tem efeito no BM25, analisadores e Text Match. Os dicionários e sinónimos podem agora ser versionados e geridos centralmente em vez de estarem dispersos pelo código da aplicação.</p>
<p>Para obter mais informações, consulte <a href="/docs/pt/manage-file-resources.md">Gerenciar recursos de arquivo</a>.</p>
<h4 id="Entity-TTL" class="common-anchor-header">TTL de entidade</h4><p>A TTL a nível de coleção e a nível de partição são demasiado grosseiras para muitos cenários de ciclo de vida e de conformidade. Diferentes locatários dentro da mesma coleção geralmente têm regras de retenção diferentes, e entidades individuais podem precisar expirar em um cronograma que não corresponde ao resto da coleção.</p>
<p>Milvus 3.0 suporta TTL por entidade. Declare um campo <code translate="no">TIMESTAMPTZ</code> no esquema, marque-o como o campo TTL através de uma propriedade da coleção, e o Milvus recupera as entidades expiradas automaticamente. Isto abrange pedidos de direito a ser esquecido, dados de sessão expirados e histórico de conversação limitado sem limpeza do lado da aplicação.</p>
<p>Para obter mais informações, consulte <a href="/docs/pt/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">Definir TTL no nível da entidade</a>.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>O Milvus 2.6 adicionou o índice <code translate="no">MINHASH_LSH</code> para deteção de quase-duplicatas baseada em conjuntos, mas os aplicativos ainda tinham que computar assinaturas MinHash antes de escrever dados no Milvus.</p>
<p>Milvus 3.0 adiciona uma função MinHash do lado do servidor. Declare um campo de entrada <code translate="no">VARCHAR</code> e um campo de saída <code translate="no">BINARY_VECTOR</code> no esquema, anexe uma função <code translate="no">FunctionType.MINHASH</code> e o Milvus calcula as assinaturas durante a inserção, inserção em massa e pesquisa. Juntamente com <code translate="no">MINHASH_LSH</code>, isto suporta fluxos de trabalho de deduplicação para grandes conjuntos de dados, impressões digitais e deteção de plágio dentro do Milvus.</p>
<p>Para mais informações, consulte a <a href="/docs/pt/minhash-function.md">função MinHash</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>O pressuposto "uma entidade = um vetor" já não se adequa à recuperação moderna. Os documentos longos são divididos em muitos pedaços, os modelos de interação tardia, como o ColBERT, emitem um vetor por token e as entidades multimodais podem ter várias vistas.</p>
<p>EmbList armazena uma lista de vectores de comprimento variável por entidade, com <code translate="no">DISKANN</code> como índice em disco. O caminho do disco mantém a utilização da RAM sob controlo quando o corpus excede os orçamentos de memória. EmbList + <code translate="no">DISKANN</code> é a primeira variante da família StructList mais alargada neste RC. O resto da família, incluindo a filtragem StructList e a aceleração multi-vetorial Muvera / Lemur, está prevista para a versão oficial 3.0.</p>
<p>Para obter mais informações, consulte <a href="/docs/pt/search-with-embedding-lists.md">Pesquisar com listas de incorporação</a>.</p>
<h4 id="Force-Merge" class="common-anchor-header">Forçar mesclagem</h4><p>As cargas de trabalho de produção acumulam fragmentação de segmentos ao longo do tempo, o que causa jitter de latência de consulta e armazenamento inflacionado.</p>
<p>O Milvus 3.0 adiciona a capacidade de acionar explicitamente a compactação de segmentos durante janelas fora de pico, nos modos síncrono e assíncrono.</p>
<p>Para obter mais informações, consulte <a href="/docs/pt/force-merge.md">Forçar compactação de mesclagem</a>.</p>
<h4 id="Storage-V3" class="common-anchor-header">Armazenamento V3</h4><p>O Milvus 3.0 apresenta o Storage V3, um mecanismo de armazenamento colunar baseado em manifesto em que os dados e metadados residem no armazenamento de objetos compatível com S3. Cada versão de conjunto de dados é capturada como um instantâneo de manifesto imutável, um arquivo codificado em Avro que registra quais grupos de colunas, logs delta e estatísticas compõem o conjunto de dados.</p>
<p>Os manifestos são ficheiros Avro compactos e os registos delta registam as eliminações ao nível da entidade sem reescrever os ficheiros de dados. Isso mantém a sobrecarga de metadados pequena à medida que os conjuntos de dados crescem. O manifesto também desacopla o rastreamento de metadados do caminho da consulta, permitindo que uma coleção gerencie mais segmentos sem degradar o desempenho da consulta.</p>
<p>Como os estados são armazenados no armazenamento de objetos, o conjunto de dados é autodescritivo: qualquer leitor com acesso ao caminho de armazenamento pode descobri-lo e interpretá-lo sem um catálogo central. Essa propriedade sustenta a Coleção externa, o Instantâneo e as futuras integrações de lago.</p>
