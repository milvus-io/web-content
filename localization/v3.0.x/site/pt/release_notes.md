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
<tr><th>Versão do Milvus</th><th>Versão do SDK do Python</th><th>Versão do SDK do Node.js</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>O Milvus v3.0-beta marca o início da transição do Milvus de uma base de dados vetorial para um motor de lago de dados nativo semântico. O kernel do Milvus pode agora operar diretamente sobre dados em formatos de lago de dados abertos, e as capacidades principais do Milvus foram alargadas em termos de recuperação, esquema, ciclo de vida, linguagem e operações.</p>
<p>A «Coleção Externa» e o «Snapshot» são as principais novidades no que diz respeito ao «lake». O mesmo kernel também está na base do Zilliz Lakebase, uma plataforma de dados nativa semântica construída sobre o Milvus 3.0.</p>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">Coleção Externa</h4><p>Em pipelines de dados típicos de IA, terabytes de embeddings e metadados já se encontram no armazenamento de objetos sob a forma de tabelas Parquet, Lance ou Iceberg. Copiar esses dados para o Milvus duplica o custo de armazenamento, acrescenta um pipeline ETL que tem de ser mantido em sincronia e afasta a governança de dados do cliente.</p>
<p>A Recolha Externa elimina a necessidade de cópia. Uma Recolha do Milvus pode referenciar ficheiros onde estes já se encontram, e o Milvus gere apenas o esquema, os índices e a execução de consultas. Uma atualização incremental mantém a coleção alinhada com os ficheiros subjacentes. Os clientes cujos dados não podem sair do lago de dados, como equipas das áreas financeira e de saúde, podem executar a recuperação vetorial desses dados no local onde se encontram. Um único conjunto de dados residente no lago de dados também pode ser servido a partir de várias instâncias do Milvus em simultâneo.</p>
<p>Para mais informações, consulte <a href="/docs/pt/create-an-external-collection.md">«Criar uma coleção externa</a>».</p>
<h4 id="Snapshot" class="common-anchor-header">Instantâneo</h4><p>O fornecimento e a descoberta em lote requerem frequentemente a mesma coleção ao mesmo tempo. A avaliação de modelos A/B, a deduplicação em grande escala, a validação de preenchimento retroativo e a reversão de versões exigem todas uma visão estável da coleção enquanto as gravações ainda estão a decorrer.</p>
<p>O Snapshot cria uma visão pontual e de leitura exclusiva de uma coleção, referenciando segmentos existentes em vez de copiar dados, pelo que o custo marginal de armazenamento é próximo de zero. Os trabalhos em lote podem ler a partir do Snapshot sob isolamento do tipo MVCC, enquanto a coleção ativa continua a aceitar gravações.</p>
<p>Para mais informações, consulte <a href="/docs/pt/snapshots.md">«Snapshots</a>», <a href="/docs/pt/manage-snapshots.md">«Gerir Snapshots</a>» e <a href="/docs/pt/snapshot-use-cases.md">«Casos de Utilização de Snapshots</a>».</p>
<h4 id="External-Backfill" class="common-anchor-header">Preenchimento externo</h4><p>Atualizar um modelo de embedding, como passar de embeddings v1 para v2 numa coleção existente, costumava significar reconstruir tudo do zero. Isso obrigava a um tempo de inatividade do serviço ou à implementação de uma lógica de escrita dupla no lado da aplicação.</p>
<p>O Milvus 3.0 suporta a atualização como um fluxo de trabalho «a quente». Pode adicionar um novo campo vetorial com « <code translate="no">AddCollectionField</code> », utilizar o Snapshot para congelar um ponto de partida consistente, executar o trabalho de incorporação offline com base no Snapshot e reescrever os valores através dos percursos normais de ingestão. Depois de o novo campo ser indexado online, a aplicação pode mudar para ele sem tempo de inatividade.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Ordenação por consulta/pesquisa</h4><p>A pesquisa e a consulta aceitam agora a ordenação por vários campos, com a ordenação transferida para o kernel do Milvus e os parâmetros « <code translate="no">ASC</code> » e « <code translate="no">DESC</code> » configuráveis por campo. Isto colmata uma lacuna comum em produção: a ordenação «Top-K» apenas por distância muitas vezes não corresponde às necessidades do negócio quando o item mais semelhante não é o mais barato, o mais recente ou o mais popular.</p>
<p>As aplicações já não têm de recuperar resultados em excesso e reordená-los no cliente para expressar uma classificação composta.</p>
<p>Para mais informações, consulte <a href="/docs/pt/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">«Ordenar resultados de pesquisa por campos escalares</a> » e <a href="/docs/pt/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">«Ordenar resultados de consulta</a>».</p>
<h4 id="Null-Vector" class="common-anchor-header">Vetor nulo</h4><p>As incorporações são frequentemente produzidas de forma assíncrona, pelo que uma entidade pode chegar antes do seu vetor. Os dados multimodais também apresentam lacunas naturais, como um vídeo sem legendas ou um produto sem imagem. As versões anteriores não ofereciam uma boa solução: as aplicações ou adiavam a gravação até o vetor estar pronto ou preenchiam com um vetor provisório, e ambas as opções prejudicavam a qualidade da recuperação.</p>
<p>O Milvus 3.0 suporta o valor NULL em campos vetoriais em todos os seis tipos de vetores. A pesquisa ignora automaticamente os vetores NULL, a qualidade da recuperação não é afetada e os vetores NULL não ocupam efetivamente qualquer espaço de armazenamento. A funcionalidade « <code translate="no">AddField</code> » também se estende aos campos vetoriais com esta alteração: com « <code translate="no">nullable=True</code> », uma coleção existente pode adicionar novos campos vetoriais online sem necessidade de reconstrução.</p>
<p>Para mais informações, consulte <a href="/docs/pt/nullable-and-default.md">«Campos nulos</a>».</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Dicionário personalizado e dicionário de sinónimos</h4><p>Os tokenizadores predefinidos nem sempre cumprem os requisitos de qualidade de pesquisa em produção. O chinês, domínios verticais como medicina, direito e química, e corpora multilingues podem beneficiar substancialmente de dicionários personalizados e tabelas de sinónimos. Até agora, estes recursos existiam principalmente como reescritas de consultas do lado da aplicação.</p>
<p>O Milvus 3.0 adiciona um mecanismo FileResource para registar dicionários de tokenizadores personalizados, listas de sinónimos, listas de palavras de stop e regras de decomposição de compostos. Uma vez registado, um recurso pode ser referenciado a partir de qualquer tokenizador ou filtro e tem efeito no BM25, nos analisadores e no Text Match. Os dicionários e sinónimos podem agora ser versionados e geridos centralmente, em vez de ficarem dispersos pelo código da aplicação.</p>
<p>Para mais informações, consulte <a href="/docs/pt/manage-file-resources.md">«Gerir Recursos</a> de <a href="/docs/pt/manage-file-resources.md">Ficheiro</a>».</p>
<h4 id="Entity-TTL" class="common-anchor-header">TTL de entidades</h4><p>O TTL ao nível da coleção e ao nível da partição é demasiado genérico para muitos cenários de ciclo de vida e conformidade. Diferentes inquilinos dentro da mesma coleção têm frequentemente regras de retenção diferentes, e as entidades individuais podem precisar de expirar de acordo com um calendário que não corresponde ao resto da coleção.</p>
<p>O Milvus 3.0 suporta o TTL por entidade. Basta declarar um campo « <code translate="no">TIMESTAMPTZ</code> » no esquema, marcá-lo como o campo TTL através de uma propriedade da coleção, e o Milvus recupera automaticamente as entidades expiradas. Isto abrange pedidos de «direito ao esquecimento», dados de sessão com prazo de validade e histórico de conversas delimitado, sem necessidade de limpeza do lado da aplicação.</p>
<p>Para mais informações, consulte <a href="/docs/pt/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">Definir TTL ao nível da entidade</a>.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>O Milvus 2.6 adicionou o índice « <code translate="no">MINHASH_LSH</code> » para a deteção de quase-duplicados com base em conjuntos, mas as aplicações ainda tinham de calcular assinaturas MinHash antes de gravar dados no Milvus.</p>
<p>O Milvus 3.0 adiciona uma função MinHash do lado do servidor. Basta declarar um campo de entrada « <code translate="no">VARCHAR</code> » e um campo de saída « <code translate="no">BINARY_VECTOR</code> » no esquema, associar uma função « <code translate="no">FunctionType.MINHASH</code> », e o Milvus calcula as assinaturas durante a inserção, a inserção em massa e a pesquisa. Em conjunto com « <code translate="no">MINHASH_LSH</code> », isto suporta fluxos de trabalho de deduplicação para grandes conjuntos de dados, identificação por impressão digital e deteção de plágio no interior do Milvus.</p>
<p>Para mais informações, consulte <a href="/docs/pt/minhash-function.md">Função MinHash</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>A suposição de que «uma entidade = um vetor» já não se adequa à pesquisa moderna. Os documentos longos são divididos em muitos fragmentos, os modelos de interação tardia, como o ColBERT, emitem um vetor por token e as entidades multimodais podem conter várias perspetivas.</p>
<p>O EmbList armazena uma lista de vetores de comprimento variável por entidade, utilizando o « <code translate="no">DISKANN</code> » como índice no disco. O caminho no disco mantém a utilização da RAM sob controlo quando o corpus excede os limites de memória. O EmbList + « <code translate="no">DISKANN</code> » é a primeira variante da família mais ampla do StructList nesta versão RC. O resto da família, incluindo a filtragem StructList e a aceleração multivetorial Muvera / Lemur, está previsto para a versão oficial 3.0.</p>
<p>Para mais informações, consulte <a href="/docs/pt/search-with-embedding-lists.md">«Pesquisa com listas de incorporação</a>».</p>
<h4 id="Force-Merge" class="common-anchor-header">Force Merge</h4><p>As cargas de trabalho de produção acumulam fragmentação de segmentos ao longo do tempo, o que provoca flutuações na latência das consultas e um aumento do espaço de armazenamento.</p>
<p>O Milvus 3.0 adiciona a capacidade de acionar explicitamente a compactação de segmentos durante janelas fora de pico, tanto no modo síncrono como no assíncrono.</p>
<p>Para mais informações, consulte <a href="/docs/pt/force-merge.md">«Compactação</a> por <a href="/docs/pt/force-merge.md">fusão forçada</a>».</p>
