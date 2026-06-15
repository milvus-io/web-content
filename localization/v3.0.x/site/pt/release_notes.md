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
    </button></h1><p>Descubra as novidades do Milvus! Esta página resume as novas funcionalidades, melhorias, problemas conhecidos e correções de erros em cada versão. Sugerimos que visite regularmente esta página para se manter a par das atualizações.</p>
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
<tr><th>Versão do Milvus</th><th>Versão do SDK Python</th><th>Versão do SDK Node.js</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>O Milvus 3.0-beta amplia a base de dados vetorial Milvus com uma nova integração no ecossistema Open Lake: a External Collection permite ao Milvus consultar tabelas externas do Lake sem cópia (zero-copy), e o Spark pode ler coleções do Milvus diretamente através do Snapshot. Esta versão traz também uma recuperação mais rica, esquemas mais expressivos, personalização mais profunda da pesquisa de texto, controlos mais precisos do ciclo de vida dos dados e modelos, e mais controlos do lado do operador. O Milvus 3.0 é o núcleo central do Zilliz Lakebase, impulsionando o seu serviço unificado, descoberta e processamento em lote.</p>
<p>Veja o vídeo abaixo para saber mais sobre o Milvus 3.0 e a sessão de perguntas e respostas com os principais mantenedores:</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<h3 id="Key-Features" class="common-anchor-header">Principais funcionalidades<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">Coleção Externa</h4><p>Em pipelines de dados de IA típicos, terabytes de embeddings e metadados já se encontram no armazenamento de objetos como tabelas Parquet, Lance ou Iceberg. Copiar esses dados para o Milvus duplica o custo de armazenamento, adiciona um pipeline ETL que tem de ser mantido em sincronia e afasta a governança de dados do cliente.</p>
<p>A Coleção Externa elimina a necessidade de cópia. Uma Coleção Milvus pode referenciar ficheiros onde estes já se encontram, e o Milvus gere apenas o esquema, os índices e a execução de consultas. Uma atualização incremental mantém a Coleção alinhada com os ficheiros subjacentes. Os clientes cujos dados não podem sair do lago, como equipas de finanças e cuidados de saúde, podem executar a recuperação de vetores contra esses dados onde eles se encontram. Um único conjunto de dados residente no lago também pode ser servido a partir de várias instâncias do Milvus ao mesmo tempo.</p>
<p>Para mais informações, consulte <a href="/docs/pt/create-an-external-collection.md">Criar uma Coleção Externa</a>.</p>
<h4 id="Snapshot" class="common-anchor-header">Instantâneo</h4><p>O fornecimento e a descoberta em lote requerem frequentemente a mesma coleção ao mesmo tempo. A avaliação de modelos A/B, a deduplicação em grande escala, a validação de preenchimento retroativo e a reversão de versões requerem todas uma visão estável da coleção enquanto as gravações ainda estão a decorrer.</p>
<p>O Snapshot cria uma visão pontual e de leitura apenas de uma coleção, referenciando segmentos existentes em vez de copiar dados, pelo que o custo marginal de armazenamento é quase nulo. As tarefas em lote podem ler a partir do Snapshot sob isolamento do tipo MVCC, enquanto a coleção ativa continua a aceitar gravações.</p>
<p>Para mais informações, consulte <a href="/docs/pt/snapshots.md">Snapshots</a>, <a href="/docs/pt/manage-snapshots.md">Gerir Snapshots</a> e <a href="/docs/pt/snapshot-use-cases.md">Casos de Utilização</a> de <a href="/docs/pt/snapshot-use-cases.md">Snapshots</a>.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Ordenação de consultas/pesquisas</h4><p>A Pesquisa e a Consulta aceitam agora a ordenação por vários campos, com a ordenação transferida para o kernel do Milvus e a definição de « <code translate="no">ASC</code> » / « <code translate="no">DESC</code> » por campo. Isto colmata uma lacuna comum na produção: o Top-K apenas por distância muitas vezes não corresponde às necessidades do negócio quando o item mais semelhante não é o mais barato, o mais recente ou o mais popular.</p>
<p>As aplicações já não precisam de recuperar resultados em excesso e reordenar no cliente para expressar uma classificação composta.</p>
<p>Para mais informações, consulte <a href="/docs/pt/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">Ordenar resultados de pesquisa por campos escalares</a> e <a href="/docs/pt/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">Ordenar resultados de consulta</a>.</p>
<h4 id="Query-Aggregation" class="common-anchor-header">Agregação de consultas</h4><p>A produção de estatísticas de distribuição de inquilinos, contagens de completude de campos ou progresso de implementação de versões a partir de uma Coleção Milvus costumava exigir a recuperação de entidades correspondentes para o cliente e a sua agregação nesse local. O Milvus 3.0 implementa a agregação escalar ao estilo SQL no kernel. Uma chamada de consulta aceita expressões de agregação e de tipo « <code translate="no">group_by_fields</code> » em « <code translate="no">output_fields</code> », incluindo « <code translate="no">count(*)</code> », « <code translate="no">count(&lt;field&gt;)</code> », « <code translate="no">sum(&lt;field&gt;)</code> », « <code translate="no">avg(&lt;field&gt;)</code> », « <code translate="no">min(&lt;field&gt;)</code> » e « <code translate="no">max(&lt;field&gt;)</code> ». A agregação é avaliada no lado do servidor após a filtragem.</p>
<p>Para mais informações, consulte <a href="/docs/pt/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">Resultados</a> de <a href="/docs/pt/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">consultas agregadas</a>.</p>
<h4 id="Null-Vector" class="common-anchor-header">Vetor nulo</h4><p>As incorporações são frequentemente produzidas de forma assíncrona, pelo que uma entidade pode chegar antes do seu vetor. Os dados multimodais também apresentam lacunas naturais, como um vídeo sem legendas ou um produto sem imagem. As versões anteriores não tinham uma boa solução: as aplicações ou adiavam a gravação até o vetor estar pronto ou preenchiam com um vetor provisório, e ambas as opções prejudicavam a qualidade da recuperação.</p>
<p>O Milvus 3.0 suporta NULL em campos vetoriais em todos os seis tipos de vetores. A pesquisa ignora vetores NULL automaticamente, a qualidade da recuperação não é afetada e os vetores NULL não ocupam efetivamente espaço de armazenamento. O recurso « <code translate="no">AddField</code> » também se estende aos campos vetoriais com esta alteração: com « <code translate="no">nullable=True</code> », uma coleção existente pode adicionar novos campos vetoriais online sem necessidade de reconstrução.</p>
<p>Para mais informações, consulte <a href="/docs/pt/nullable-and-default.md">Campos nulos</a>.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Dicionário personalizado e dicionário de sinónimos</h4><p>Os tokenizadores prontos a usar nem sempre satisfazem os requisitos de qualidade de pesquisa em produção. O chinês, domínios verticais como medicina, direito e química, e corpora multilingues podem beneficiar substancialmente de dicionários personalizados e tabelas de sinónimos. Até agora, estes recursos existiam principalmente como reescritas de consultas do lado da aplicação.</p>
<p>O Milvus 3.0 adiciona um mecanismo FileResource para registar dicionários de tokenizadores personalizados, listas de sinónimos, listas de palavras de stop e regras de descomponção. Uma vez registado, um recurso pode ser referenciado a partir de qualquer tokenizador ou filtro e tem efeito no BM25, nos analisadores e no Text Match. Os dicionários e sinónimos podem agora ser versionados e geridos centralmente, em vez de ficarem dispersos pelo código da aplicação.</p>
<p>Para mais informações, consulte <a href="/docs/pt/manage-file-resources.md">Gerir Recursos</a> de <a href="/docs/pt/manage-file-resources.md">Ficheiro</a>.</p>
<h4 id="Entity-TTL" class="common-anchor-header">TTL de entidade</h4><p>O TTL ao nível da coleção e ao nível da partição é demasiado genérico para muitos cenários de ciclo de vida e conformidade. Locatários diferentes dentro da mesma coleção têm frequentemente regras de retenção diferentes, e entidades individuais podem precisar de expirar num calendário que não corresponde ao resto da coleção.</p>
<p>O Milvus 3.0 suporta TTL por entidade. Declare um campo « <code translate="no">TIMESTAMPTZ</code> » no esquema, marque-o como o campo TTL através de uma propriedade da coleção e o Milvus recupera automaticamente as entidades expiradas. Isto abrange pedidos de direito ao esquecimento, dados de sessão expirados e histórico de conversas delimitado sem limpeza do lado da aplicação.</p>
<p>Para mais informações, consulte <a href="/docs/pt/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">Definir TTL ao nível da entidade</a>.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>O Milvus 2.6 adicionou o índice <code translate="no">MINHASH_LSH</code> para deteção de quase-duplicados baseada em conjuntos, mas as aplicações ainda tinham de calcular assinaturas MinHash antes de gravar dados no Milvus.</p>
<p>O Milvus 3.0 adiciona uma função MinHash do lado do servidor. Declare um campo de entrada « <code translate="no">VARCHAR</code> » e um campo de saída « <code translate="no">BINARY_VECTOR</code> » no esquema, anexe uma função « <code translate="no">FunctionType.MINHASH</code> », e o Milvus calcula as assinaturas durante a inserção, inserção em massa e pesquisa. Juntamente com « <code translate="no">MINHASH_LSH</code> », isto suporta fluxos de trabalho de deduplicação para grandes conjuntos de dados, impressão digital e deteção de plágio dentro do Milvus.</p>
<p>Para mais informações, consulte <a href="/docs/pt/minhash-function.md">Função MinHash</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>A suposição de que «uma entidade = um vetor» já não se adequa à recuperação moderna. Documentos longos são divididos em muitos pedaços, modelos de interação tardia, como o ColBERT, emitem um vetor por token, e entidades multimodais podem conter várias perspetivas.</p>
<p>O EmbList armazena uma lista de vetores de comprimento variável por entidade, com um <code translate="no">DISKANN</code> e como índice no disco. O caminho do disco mantém o uso de RAM sob controlo quando o corpus excede os limites de memória. O EmbList + <code translate="no">DISKANN</code> é a primeira variante da família mais ampla StructList nesta versão RC. O resto da família, incluindo a filtragem StructList e a aceleração multivectorial Muvera / Lemur, está previsto para a versão oficial 3.0.</p>
<p>Para mais informações, consulte <a href="/docs/pt/search-with-embedding-lists.md">Pesquisa com listas</a> de <a href="/docs/pt/search-with-embedding-lists.md">incorporação</a>.</p>
<h4 id="Force-Merge" class="common-anchor-header">Force Merge</h4><p>As cargas de trabalho de produção acumulam fragmentação de segmentos ao longo do tempo, o que causa variações na latência das consultas e aumento do armazenamento.</p>
<p>O Milvus 3.0 adiciona a capacidade de acionar a compactação de segmentos explicitamente durante janelas fora do pico, tanto no modo síncrono como no assíncrono.</p>
<p>Para mais informações, consulte <a href="/docs/pt/force-merge.md">Compactação</a> de <a href="/docs/pt/force-merge.md">Fusão Forçada</a>.</p>
<h4 id="Storage-V3" class="common-anchor-header">Armazenamento V3</h4><p>O Milvus 3.0 introduz o Armazenamento V3, um motor de armazenamento colunar baseado em manifestos, onde os dados e metadados residem num armazenamento de objetos compatível com S3. Cada versão do conjunto de dados é capturada como um instantâneo de manifesto imutável, um ficheiro codificado em Avro que regista quais os grupos de colunas, registos delta e estatísticas que compõem o conjunto de dados.</p>
<p>Os manifestos são ficheiros Avro compactos e os registos delta registam eliminações ao nível da entidade sem reescrever ficheiros de dados. Isto mantém a sobrecarga de metadados reduzida à medida que os conjuntos de dados crescem. O manifesto também dissocia o rastreio de metadados do caminho da consulta, permitindo que uma Coleção gerencie mais segmentos sem degradar o desempenho da consulta.</p>
<p>Como os estados são armazenados no armazenamento de objetos, o conjunto de dados é autodescritivo: qualquer leitor com acesso ao caminho de armazenamento pode descobri-lo e interpretá-lo sem um catálogo central. Esta propriedade sustenta a Coleção Externa, o Snapshot e futuras integrações de lagos de dados.</p>
