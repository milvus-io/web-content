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
<p>O Milvus v3.0-beta inicia a mudança do Milvus de uma base de dados vetorial para um motor de lago semântico nativo. O núcleo do Milvus pode agora operar diretamente sobre dados em formatos de lago abertos, e as capacidades centrais do Milvus foram alargadas em termos de recuperação, esquema, ciclo de vida, linguagem e operações.</p>
<p>A recolha externa e o instantâneo são as principais adições do lado do lago. O mesmo kernel também alimenta o Zilliz Lakebase, uma plataforma de dados semântica nativa criada com base no Milvus 3.0.</p>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">Coleta externa</h4><p>Em pipelines de dados de IA típicos, terabytes de embeddings e metadados já estão no armazenamento de objetos como tabelas Parquet, Lance ou Iceberg. Copiar esses dados para o Milvus duplica o custo de armazenamento, adiciona um pipeline ETL que tem de ser mantido em sincronia e afasta a governação dos dados do cliente.</p>
<p>A coleção externa elimina a cópia. Uma coleção Milvus pode fazer referência a ficheiros onde estes já se encontram, e o Milvus gere apenas o esquema, os índices e a execução de consultas. Uma atualização incremental mantém a coleção alinhada com os ficheiros subjacentes. Os clientes cujos dados não podem sair do lago, como as equipas de finanças e de cuidados de saúde, podem executar a recuperação de vectores em relação a esses dados onde eles se encontram. Um único conjunto de dados residente no lago também pode ser servido a partir de várias instâncias do Milvus ao mesmo tempo.</p>
<p>Para obter mais informações, consulte <a href="/docs/pt/create-an-external-collection.md">Criar uma coleção externa</a>.</p>
<h4 id="Snapshot" class="common-anchor-header">Instantâneo</h4><p>O serviço e a descoberta em lote geralmente precisam da mesma coleção ao mesmo tempo. A avaliação do modelo A/B, a desduplicação em grande escala, a validação de backfill e a reversão de versão precisam de uma exibição estável da coleção enquanto as gravações ainda estão sendo feitas.</p>
<p>O Snapshot cria uma visualização pontual e somente leitura de uma coleção, referenciando segmentos existentes em vez de copiar dados, de modo que o custo marginal de armazenamento é próximo de zero. Os trabalhos em lote podem ler a partir do instantâneo sob isolamento no estilo MVCC enquanto a coleção ativa continua aceitando gravações.</p>
<p>Para obter mais informações, consulte <a href="/docs/pt/snapshots.md">Instantâneos</a>, <a href="/docs/pt/manage-snapshots.md">Gerenciar instantâneos</a> e <a href="/docs/pt/snapshot-use-cases.md">Casos de uso de instantâneos</a>.</p>
<h4 id="External-Backfill" class="common-anchor-header">Backfill externo</h4><p>Atualizar um modelo de incorporação, como passar de incorporações v1 para incorporações v2 em uma coleção existente, costumava significar reconstruir do zero. Isso forçava o tempo de inatividade do serviço ou a lógica de escrita dupla no lado da aplicação.</p>
<p>Milvus 3.0 suporta a atualização como um fluxo de trabalho quente. É possível adicionar um novo campo vetorial com <code translate="no">AddCollectionField</code>, usar o Snapshot para congelar um ponto de partida consistente, executar o trabalho de incorporação offline no Snapshot e gravar os valores de volta através dos caminhos normais de ingestão. Depois de o novo campo ser indexado online, a aplicação pode mudar sem tempo de inatividade.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Consulta / Pesquisa Ordenar por</h4><p>A Pesquisa e a Consulta agora aceitam a ordenação de vários campos, com a ordenação empurrada para o kernel do Milvus e <code translate="no">ASC</code> / <code translate="no">DESC</code> configurável por campo. Isto preenche uma lacuna comum na produção: O Top-K por distância, por si só, muitas vezes não corresponde às necessidades da empresa quando o item mais semelhante não é o mais barato, o mais recente ou o mais popular.</p>
<p>Os aplicativos não precisam mais buscar resultados em excesso e reordenar no cliente para expressar a classificação composta.</p>
<p>Para obter mais informações, consulte <a href="/docs/pt/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">Ordenar resultados de pesquisa por campos escalares</a> e <a href="/docs/pt/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">Ordenar resultados de consulta</a>.</p>
<h4 id="Null-Vector" class="common-anchor-header">Vetor nulo</h4><p>Os embeddings são muitas vezes produzidos de forma assíncrona, pelo que uma entidade pode chegar antes do seu vetor. Os dados multimodais também têm lacunas naturais, como um vídeo sem legendas ou um produto sem uma imagem. As versões anteriores não tinham uma boa resposta: as aplicações ou atrasavam a escrita até que o vetor estivesse pronto ou preenchiam um vetor de substituição, e ambas as escolhas prejudicavam a qualidade da recuperação.</p>
<p>O Milvus 3.0 suporta NULL em campos vetoriais em todos os seis tipos de vetores. A pesquisa ignora automaticamente os vetores NULL, a qualidade da recuperação não é afetada e os vetores NULL não ocupam efetivamente nenhum espaço de armazenamento. <code translate="no">AddField</code> também se estende a campos vetoriais sob esta mudança: com <code translate="no">nullable=True</code>, uma coleção existente pode crescer novos campos vetoriais on-line sem uma reconstrução.</p>
<p>Para obter mais informações, consulte <a href="/docs/pt/nullable-and-default.md">Campos anuláveis</a>.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Dicionário personalizado e dicionário de sinônimos</h4><p>Os tokenizadores prontos para uso nem sempre atendem aos requisitos de qualidade de pesquisa de produção. Domínios verticais chineses, como medicina, direito e química, e corpora multilíngues podem se beneficiar substancialmente de dicionários personalizados e tabelas de sinônimos. Até agora, esses recursos viviam principalmente como reescritas de consultas do lado da aplicação.</p>
<p>O Milvus 3.0 adiciona um mecanismo FileResource para registar dicionários personalizados de tokenizadores, listas de sinónimos, listas de stop-word e regras de decomposição. Uma vez registado, um recurso pode ser referenciado a partir de qualquer tokenizador ou filtro e tem efeito no BM25, analisadores e Text Match. Dicionários e sinônimos agora podem ser versionados e gerenciados centralmente em vez de espalhados pelo código do aplicativo.</p>
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
<h4 id="Force-Merge" class="common-anchor-header">Forçar mesclagem</h4><p>As cargas de trabalho de produção acumulam fragmentação de segmento ao longo do tempo, o que causa jitter de latência de consulta e armazenamento inflado.</p>
<p>O Milvus 3.0 adiciona a capacidade de acionar a compactação de segmentos explicitamente durante janelas fora de pico, nos modos síncrono e assíncrono.</p>
<p>Para obter mais informações, consulte <a href="/docs/pt/force-merge.md">Forçar compactação de mesclagem</a>.</p>
