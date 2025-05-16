---
id: sparse_vector.md
summary: Saiba como utilizar vectores esparsos no Milvus.
title: Vetor esparso
---
<h1 id="Sparse-Vector" class="common-anchor-header">Vetor esparso<button data-href="#Sparse-Vector" class="anchor-icon" translate="no">
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
    </button></h1><p>Os vectores esparsos representam palavras ou frases utilizando a incorporação de vectores em que a maioria dos elementos é zero, sendo que apenas um elemento diferente de zero indica a presença de uma palavra específica. Os modelos de vectores esparsos, como o <a href="https://arxiv.org/abs/2109.10086">SPLADEv2</a>, superam os modelos densos na pesquisa de conhecimentos fora do domínio, na consciência das palavras-chave e na interpretabilidade. São particularmente úteis na recuperação de informação, no processamento de linguagem natural e nos sistemas de recomendação, em que a combinação de vectores esparsos para a recuperação com um modelo grande para a classificação pode melhorar significativamente os resultados da recuperação.</p>
<p>No Milvus, a utilização de vectores esparsos segue um fluxo de trabalho semelhante ao dos vectores densos. Envolve a criação de uma coleção com uma coluna de vetor esparso, a inserção de dados, a criação de um índice e a realização de pesquisas de semelhança e consultas escalares.</p>
<p>Neste tutorial, você aprenderá a:</p>
<ul>
<li>Preparar embeddings de vetores esparsos;</li>
<li>Criar uma coleção com um campo de vetor esparso;</li>
<li>Inserir entidades com embeddings de vetor esparso;</li>
<li>Indexar a coleção e executar a pesquisa ANN em vetores esparsos.</li>
</ul>
<p>Para ver os vetores esparsos em ação, consulte <a href="https://github.com/milvus-io/pymilvus/blob/master/examples/milvus_client/sparse.py">hello_sparse.py</a>.</p>
<div class="admonition note">
    <p><b>notas</b></p>
        Atualmente, o suporte para vectores esparsos é uma funcionalidade beta na versão 2.4.0, com planos para a tornar geralmente disponível na versão 3.0.0.</div>
<h2 id="Prepare-sparse-vector-embeddings" class="common-anchor-header">Preparar embeddings de vectores esparsos<button data-href="#Prepare-sparse-vector-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>Para usar vectores esparsos no Milvus, prepare embeddings vectoriais num dos formatos suportados:</p>
<ul>
<li><p><strong>Matrizes esparsas</strong>: Utilize a família de classes <a href="https://docs.scipy.org/doc/scipy/reference/sparse.html#module-scipy.sparse">scipy.sparse</a> para representar os seus embeddings esparsos. Este método é eficiente para lidar com dados de grande escala e de alta dimensão.</p></li>
<li><p><strong>Lista de dicionários</strong>: Represente cada embedding esparso como um dicionário, estruturado como <code translate="no">{dimension_index: value, ...}</code>, onde cada par chave-valor representa o índice de dimensão e seu valor correspondente.</p>
<p>Exemplo:</p>
<pre><code translate="no" class="language-python">{2: 0.33, 98: 0.72, ...}
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Lista de Iteráveis de Tuplas</strong>: Semelhante à lista de dicionários, mas utiliza um iterável de tuplas, <code translate="no">[(dimension_index, value)]</code>, para especificar apenas as dimensões não nulas e os seus valores.</p>
<p>Exemplo:</p>
<pre><code translate="no" class="language-python">[(2, 0.33), (98, 0.72), ...]
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>O exemplo a seguir prepara embeddings esparsos gerando uma matriz esparsa aleatória para 10.000 entidades, cada uma com 10.000 dimensões e uma densidade de esparsidade de 0,005.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare entities with sparse vector representation</span>
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">import</span> random

rng = np.random.default_rng()

num_entities, dim = <span class="hljs-number">10000</span>, <span class="hljs-number">10000</span>

<span class="hljs-comment"># Generate random sparse rows with an average of 25 non-zero elements per row</span>
entities = [
    {
        <span class="hljs-string">&quot;scalar_field&quot;</span>: rng.random(),
        <span class="hljs-comment"># To represent a single sparse vector row, you can use:</span>
        <span class="hljs-comment"># - Any of the scipy.sparse sparse matrices class family with shape[0] == 1</span>
        <span class="hljs-comment"># - Dict[int, float]</span>
        <span class="hljs-comment"># - Iterable[Tuple[int, float]]</span>
        <span class="hljs-string">&quot;sparse_vector&quot;</span>: {
            d: rng.random() <span class="hljs-keyword">for</span> d <span class="hljs-keyword">in</span> random.sample(<span class="hljs-built_in">range</span>(dim), random.randint(<span class="hljs-number">20</span>, <span class="hljs-number">30</span>))
        },
    }
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_entities)
]

<span class="hljs-comment"># print the first entity to check the representation</span>
<span class="hljs-built_in">print</span>(entities[<span class="hljs-number">0</span>])

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &#x27;scalar_field&#x27;: 0.520821523849214,</span>
<span class="hljs-comment">#     &#x27;sparse_vector&#x27;: {</span>
<span class="hljs-comment">#         5263: 0.2639375518635271,</span>
<span class="hljs-comment">#         3573: 0.34701499565746674,</span>
<span class="hljs-comment">#         9637: 0.30856525997853057,</span>
<span class="hljs-comment">#         4399: 0.19771651149001523,</span>
<span class="hljs-comment">#         6959: 0.31025067641541815,</span>
<span class="hljs-comment">#         1729: 0.8265339135915016,</span>
<span class="hljs-comment">#         1220: 0.15303302147479103,</span>
<span class="hljs-comment">#         7335: 0.9436728846033107,</span>
<span class="hljs-comment">#         6167: 0.19929870545596562,</span>
<span class="hljs-comment">#         5891: 0.8214617920371853,</span>
<span class="hljs-comment">#         2245: 0.7852255053773395,</span>
<span class="hljs-comment">#         2886: 0.8787982039149889,</span>
<span class="hljs-comment">#         8966: 0.9000606703940665,</span>
<span class="hljs-comment">#         4910: 0.3001170013981104,</span>
<span class="hljs-comment">#         17: 0.00875671667413136,</span>
<span class="hljs-comment">#         3279: 0.7003425473001098,</span>
<span class="hljs-comment">#         2622: 0.7571360018373428,</span>
<span class="hljs-comment">#         4962: 0.3901879090102064,</span>
<span class="hljs-comment">#         4698: 0.22589525720196246,</span>
<span class="hljs-comment">#         3290: 0.5510228492587324,</span>
<span class="hljs-comment">#         6185: 0.4508413201390492</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<div class="admonition note">
<p><b>notas</b></p>
<p>As dimensões do vetor têm de ser do tipo Python <code translate="no">int</code> ou <code translate="no">numpy.integer</code>, e os valores têm de ser do tipo Python <code translate="no">float</code> ou <code translate="no">numpy.floating</code>.</p>
</div>
<p>Para gerar embeddings, também pode utilizar o pacote <code translate="no">model</code> integrado na biblioteca PyMilvus, que oferece uma gama de funções de embedding. Para obter detalhes, consulte <a href="/docs/pt/v2.4.x/embeddings.md">Embeddings</a>.</p>
<h2 id="Create-a-collection-with-a-sparse-vector-field" class="common-anchor-header">Criar uma coleção com um campo vetorial esparso<button data-href="#Create-a-collection-with-a-sparse-vector-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Para criar uma coleção com um campo de vetor esparso, defina o <strong>tipo de dados</strong> do campo de vetor esparso como <strong>DataType.SPARSE_FLOAT_VECTOR</strong>. Ao contrário dos vectores densos, não é necessário especificar uma dimensão para os vectores esparsos.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Create a MilvusClient instance</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create a collection with a sparse vector field</span>
schema = client.create_schema(
    auto_id=<span class="hljs-literal">True</span>,
    enable_dynamic_fields=<span class="hljs-literal">True</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.VARCHAR, is_primary=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">100</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;scalar_field&quot;</span>, datatype=DataType.DOUBLE)
<span class="hljs-comment"># For sparse vector, no need to specify dimension</span>
schema.add_field(field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR) <span class="hljs-comment"># set `datatype` to `SPARSE_FLOAT_VECTOR`</span>

client.create_collection(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<p>Para obter detalhes sobre os parâmetros comuns de coleção, consulte <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md">create_collection() .</a></p>
<h2 id="Insert-entities-with-sparse-vector-embeddings" class="common-anchor-header">Inserir entidades com embeddings de vetores esparsos<button data-href="#Insert-entities-with-sparse-vector-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>Para inserir entidades com embeddings vetoriais esparsos, basta passar a lista de entidades para o método <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md"><code translate="no">insert()</code></a> método.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert entities</span>
client.insert(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, data=entities)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-the-collection" class="common-anchor-header">Indexar a coleção<button data-href="#Index-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de efetuar pesquisas de similaridade, crie um índice para a coleção. Para obter mais informações sobre tipos e parâmetros de índices, consulte <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md">add_index()</a> e <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md">create_index()</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index the collection</span>

<span class="hljs-comment"># Prepare index params</span>
index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># the type of index to be created. set to `SPARSE_INVERTED_INDEX` or `SPARSE_WAND`.</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># the metric type to be used for the index. Currently, only `IP` (Inner Product) is supported.</span>
    params={<span class="hljs-string">&quot;drop_ratio_build&quot;</span>: <span class="hljs-number">0.2</span>}, <span class="hljs-comment"># the ratio of small vector values to be dropped during indexing.</span>
)

<span class="hljs-comment"># Create index</span>
client.create_index(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, index_params=index_params)
<button class="copy-code-btn"></button></code></pre>
<p>Para a construção de índices em vectores esparsos, tenha em atenção o seguinte:</p>
<ul>
<li><p><code translate="no">index_type</code>: O tipo de índice a ser construído. Opções possíveis para vectores esparsos:</p>
<ul>
<li><p><code translate="no">SPARSE_INVERTED_INDEX</code>: Um índice invertido que mapeia cada dimensão para os seus vectores não nulos, facilitando o acesso direto aos dados relevantes durante as pesquisas. Ideal para conjuntos de dados com dados esparsos mas de alta dimensão.</p></li>
<li><p><code translate="no">SPARSE_WAND</code>: Utiliza o algoritmo Weak-AND (WAND) para contornar rapidamente candidatos improváveis, concentrando a avaliação naqueles com maior potencial de classificação. Trata as dimensões como termos e os vectores como documentos, acelerando as pesquisas em conjuntos de dados grandes e esparsos.</p></li>
</ul></li>
<li><p><code translate="no">metric_type</code>: Apenas a métrica de distância <code translate="no">IP</code> (Inner Product) é suportada para vectores esparsos.</p></li>
<li><p><code translate="no">params.drop_ratio_build</code>: O parâmetro de índice utilizado especificamente para vectores esparsos. Controla a proporção de valores de vectores pequenos que são excluídos durante o processo de indexação. Este parâmetro permite o ajuste fino do compromisso entre eficiência e precisão, desconsiderando pequenos valores ao construir o índice. Por exemplo, se <code translate="no">drop_ratio_build = 0.3</code>, durante a construção do índice, todos os valores de todos os vectores esparsos são reunidos e ordenados. Os 30% mais pequenos destes valores não são incluídos no índice, reduzindo assim a carga de trabalho computacional durante a pesquisa.</p></li>
</ul>
<p>Para obter mais informações, consulte <a href="/docs/pt/v2.4.x/index.md">Índice na memória</a>.</p>
<h2 id="Perform-ANN-search" class="common-anchor-header">Executar pesquisa ANN<button data-href="#Perform-ANN-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de a coleção ser indexada e carregada na memória, utilize o método <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md"><code translate="no">search()</code></a> para recuperar os documentos relevantes com base na consulta.</p>
<pre><code translate="no" class="language-python"># Load the collection into memory
client.load_collection(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>)

# Perform ANN search on sparse vectors

# <span class="hljs-keyword">for</span> demo purpose we search <span class="hljs-keyword">for</span> the last inserted vector
query_vector = entities[<span class="hljs-number">-1</span>][<span class="hljs-string">&quot;sparse_vector&quot;</span>]

search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>}, # the ratio of small vector values to be dropped during search.
}

search_res = client.search(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-string">&quot;scalar_field&quot;</span>],
    search_params=search_params,
)

<span class="hljs-keyword">for</span> hits in search_res:
    <span class="hljs-keyword">for</span> hit in hits:
        <span class="hljs-built_in">print</span>(f<span class="hljs-string">&quot;hit: {hit}&quot;</span>)
        
# Output:
# hit: {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-string">&#x27;448458373272710786&#x27;</span>, <span class="hljs-string">&#x27;distance&#x27;</span>: <span class="hljs-number">7.220192909240723</span>, <span class="hljs-string">&#x27;entity&#x27;</span>: {<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272710786&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.46767865218233806</span>}}
# hit: {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-string">&#x27;448458373272708317&#x27;</span>, <span class="hljs-string">&#x27;distance&#x27;</span>: <span class="hljs-number">1.2287548780441284</span>, <span class="hljs-string">&#x27;entity&#x27;</span>: {<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272708317&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.7315987515699472</span>}}
# hit: {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-string">&#x27;448458373272702005&#x27;</span>, <span class="hljs-string">&#x27;distance&#x27;</span>: <span class="hljs-number">0.9848432540893555</span>, <span class="hljs-string">&#x27;entity&#x27;</span>: {<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272702005&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.9871869181562156</span>}}
<button class="copy-code-btn"></button></code></pre>
<p>Ao configurar os parâmetros de pesquisa, tenha em atenção o seguinte:</p>
<ul>
<li><code translate="no">params.drop_ratio_search</code>: O parâmetro de pesquisa utilizado especificamente para vectores esparsos. Esta opção permite o ajuste fino do processo de pesquisa, especificando o rácio dos valores mais pequenos no vetor de consulta a ignorar. Ajuda a equilibrar a precisão e o desempenho da pesquisa. Quanto mais pequeno for o valor definido para <code translate="no">drop_ratio_search</code>, menos estes valores pequenos contribuem para a pontuação final. Ao ignorar alguns valores pequenos, o desempenho da pesquisa pode ser melhorado com um impacto mínimo na precisão.</li>
</ul>
<h2 id="Perform-scalar-queries" class="common-anchor-header">Efetuar consultas escalares<button data-href="#Perform-scalar-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>Para além da pesquisa ANN, o Milvus também suporta consultas escalares em vectores esparsos. Estas consultas permitem-lhe obter documentos com base num valor escalar associado ao vetor esparso. Para mais informações sobre os parâmetros, consulte <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/query.md">query()</a>.</p>
<p>Filtrar entidades com <strong>campo_escalar</strong> maior que 3:</p>
<pre><code translate="no" class="language-python"># Perform a query by specifying filter expr
filter_query_res = client.query(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>,
    filter=<span class="hljs-string">&quot;scalar_field &gt; 0.999&quot;</span>,
)

<span class="hljs-built_in">print</span>(filter_query_res[:<span class="hljs-number">2</span>])

# Output:
# [{<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272701862&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.9994093623822689</span>, <span class="hljs-string">&#x27;sparse_vector&#x27;</span>: {<span class="hljs-number">173</span>: <span class="hljs-number">0.35266244411468506</span>, <span class="hljs-number">400</span>: <span class="hljs-number">0.49995484948158264</span>, <span class="hljs-number">480</span>: <span class="hljs-number">0.8757831454277039</span>, <span class="hljs-number">661</span>: <span class="hljs-number">0.9931875467300415</span>, <span class="hljs-number">1040</span>: <span class="hljs-number">0.0965644046664238</span>, <span class="hljs-number">1728</span>: <span class="hljs-number">0.7478245496749878</span>, <span class="hljs-number">2365</span>: <span class="hljs-number">0.4351981580257416</span>, <span class="hljs-number">2923</span>: <span class="hljs-number">0.5505295395851135</span>, <span class="hljs-number">3181</span>: <span class="hljs-number">0.7396837472915649</span>, <span class="hljs-number">3848</span>: <span class="hljs-number">0.4428485333919525</span>, <span class="hljs-number">4701</span>: <span class="hljs-number">0.39119353890419006</span>, <span class="hljs-number">5199</span>: <span class="hljs-number">0.790219783782959</span>, <span class="hljs-number">5798</span>: <span class="hljs-number">0.9623121619224548</span>, <span class="hljs-number">6213</span>: <span class="hljs-number">0.453134149312973</span>, <span class="hljs-number">6341</span>: <span class="hljs-number">0.745091438293457</span>, <span class="hljs-number">6775</span>: <span class="hljs-number">0.27766478061676025</span>, <span class="hljs-number">6875</span>: <span class="hljs-number">0.017947908490896225</span>, <span class="hljs-number">8093</span>: <span class="hljs-number">0.11834774166345596</span>, <span class="hljs-number">8617</span>: <span class="hljs-number">0.2289179265499115</span>, <span class="hljs-number">8991</span>: <span class="hljs-number">0.36600416898727417</span>, <span class="hljs-number">9346</span>: <span class="hljs-number">0.5502803921699524</span>}}, {<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272702421&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.9990218525410719</span>, <span class="hljs-string">&#x27;sparse_vector&#x27;</span>: {<span class="hljs-number">448</span>: <span class="hljs-number">0.587817907333374</span>, <span class="hljs-number">1866</span>: <span class="hljs-number">0.0994109958410263</span>, <span class="hljs-number">2438</span>: <span class="hljs-number">0.8672442436218262</span>, <span class="hljs-number">2533</span>: <span class="hljs-number">0.8063794374465942</span>, <span class="hljs-number">2595</span>: <span class="hljs-number">0.02122959867119789</span>, <span class="hljs-number">2828</span>: <span class="hljs-number">0.33827054500579834</span>, <span class="hljs-number">2871</span>: <span class="hljs-number">0.1984412521123886</span>, <span class="hljs-number">2938</span>: <span class="hljs-number">0.09674275666475296</span>, <span class="hljs-number">3154</span>: <span class="hljs-number">0.21552987396717072</span>, <span class="hljs-number">3662</span>: <span class="hljs-number">0.5236313343048096</span>, <span class="hljs-number">3711</span>: <span class="hljs-number">0.6463911533355713</span>, <span class="hljs-number">4029</span>: <span class="hljs-number">0.4041993021965027</span>, <span class="hljs-number">7143</span>: <span class="hljs-number">0.7370485663414001</span>, <span class="hljs-number">7589</span>: <span class="hljs-number">0.37588241696357727</span>, <span class="hljs-number">7776</span>: <span class="hljs-number">0.436136394739151</span>, <span class="hljs-number">7962</span>: <span class="hljs-number">0.06377989053726196</span>, <span class="hljs-number">8385</span>: <span class="hljs-number">0.5808192491531372</span>, <span class="hljs-number">8592</span>: <span class="hljs-number">0.8865005970001221</span>, <span class="hljs-number">8648</span>: <span class="hljs-number">0.05727503448724747</span>, <span class="hljs-number">9071</span>: <span class="hljs-number">0.9450633525848389</span>, <span class="hljs-number">9161</span>: <span class="hljs-number">0.146037295460701</span>, <span class="hljs-number">9358</span>: <span class="hljs-number">0.1903032660484314</span>, <span class="hljs-number">9679</span>: <span class="hljs-number">0.3146636486053467</span>, <span class="hljs-number">9974</span>: <span class="hljs-number">0.8561339378356934</span>, <span class="hljs-number">9991</span>: <span class="hljs-number">0.15841573476791382</span>}}]
<button class="copy-code-btn"></button></code></pre>
<p>Filtra entidades por chave primária:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># primary keys of entities that satisfy the filter</span>
pks = [ret[<span class="hljs-string">&quot;pk&quot;</span>] <span class="hljs-keyword">for</span> ret <span class="hljs-keyword">in</span> filter_query_res]

<span class="hljs-comment"># Perform a query by primary key</span>
pk_query_res = client.query(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">f&quot;pk == &#x27;<span class="hljs-subst">{pks[<span class="hljs-number">0</span>]}</span>&#x27;&quot;</span>
)

<span class="hljs-built_in">print</span>(pk_query_res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># [{&#x27;scalar_field&#x27;: 0.9994093623822689, &#x27;sparse_vector&#x27;: {173: 0.35266244411468506, 400: 0.49995484948158264, 480: 0.8757831454277039, 661: 0.9931875467300415, 1040: 0.0965644046664238, 1728: 0.7478245496749878, 2365: 0.4351981580257416, 2923: 0.5505295395851135, 3181: 0.7396837472915649, 3848: 0.4428485333919525, 4701: 0.39119353890419006, 5199: 0.790219783782959, 5798: 0.9623121619224548, 6213: 0.453134149312973, 6341: 0.745091438293457, 6775: 0.27766478061676025, 6875: 0.017947908490896225, 8093: 0.11834774166345596, 8617: 0.2289179265499115, 8991: 0.36600416898727417, 9346: 0.5502803921699524}, &#x27;pk&#x27;: &#x27;448458373272701862&#x27;}]</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">Limites<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Ao utilizar vectores esparsos em Milvus, considere os seguintes limites:</p>
<ul>
<li><p>Atualmente, apenas a métrica de distância <strong>IP</strong> é suportada para vetores esparsos.</p></li>
<li><p>Para campos de vetores esparsos, apenas os tipos de índice <strong>SPARSE_INVERTED_INDEX</strong> e <strong>SPARSE_WAND</strong> são suportados.</p></li>
<li><p>Atualmente, <a href="https://milvus.io/docs/single-vector-search.md#Range-search">a pesquisa de intervalos</a>, <a href="https://milvus.io/docs/single-vector-search.md#Grouping-search">a pesquisa de agrupamentos</a> e <a href="https://milvus.io/docs/with-iterators.md#Search-with-iterator">o iterador de pesquisa</a> não são suportados para vectores esparsos.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">PERGUNTAS FREQUENTES<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><strong>Que métrica de distância é suportada para vectores esparsos?</strong></p>
<p>Os vectores esparsos apenas suportam a métrica de distância IP (Inner Product) devido à elevada dimensionalidade dos vectores esparsos, o que torna a distância L2 e a distância cosseno impraticáveis.</p></li>
<li><p><strong>Pode explicar a diferença entre SPARSE_INVERTED_INDEX e SPARSE_WAND, e como posso escolher entre eles?</strong></p>
<p><strong>O</strong><strong>SPARSE_INVERTED_INDEX</strong> é um índice invertido tradicional, enquanto <strong>o SPARSE_WAND</strong> utiliza o algoritmo <a href="https://dl.acm.org/doi/10.1145/956863.956944">Weak-AND</a> para reduzir o número de avaliações de distância IP completas durante a pesquisa. <strong>O SPARSE_WAND</strong> é normalmente mais rápido, mas o seu desempenho pode diminuir com o aumento da densidade do vetor. Para escolher entre eles, realize experiências e benchmarks com base no seu conjunto de dados e caso de utilização específicos.</p></li>
<li><p><strong>Como devo escolher os parâmetros drop_ratio_build e drop_ratio_search?</strong></p>
<p>A escolha de <strong>drop_ratio_build</strong> e <strong>drop_ratio_search</strong> depende das caraterísticas dos seus dados e dos seus requisitos de latência/rendimento e precisão da pesquisa.</p></li>
<li><p><strong>Que tipos de dados são suportados para embeddings esparsos?</strong></p>
<p>A parte da dimensão deve ser um inteiro de 32 bits sem sinal, e a parte do valor pode ser um número de ponto flutuante de 32 bits não negativo.</p></li>
<li><p><strong>A dimensão de uma incorporação esparsa pode ser qualquer valor discreto dentro do espaço uint32?</strong></p>
<p>Sim, com uma exceção. A dimensão de uma incorporação esparsa pode ser qualquer valor no intervalo de <code translate="no">[0, maximum of uint32)</code>. Isso significa que você não pode usar o valor máximo de uint32.</p></li>
<li><p><strong>As pesquisas em segmentos crescentes são conduzidas através de um índice ou por força bruta?</strong></p>
<p>As pesquisas em segmentos crescentes são realizadas através de um índice do mesmo tipo que o índice do segmento selado. Para novos segmentos crescentes antes de o índice ser construído, é usada uma pesquisa de força bruta.</p></li>
<li><p><strong>É possível ter vetores esparsos e densos em uma única coleção?</strong></p>
<p>Sim, com suporte a vários tipos de vetores, é possível criar coleções com colunas de vetores esparsos e densos e executar pesquisas híbridas nelas.</p></li>
<li><p><strong>Quais são os requisitos para que os embeddings esparsos sejam inseridos ou pesquisados?</strong></p>
<p>As incorporações esparsas devem ter pelo menos um valor diferente de zero e os índices de vetor devem ser não negativos.</p></li>
</ul>
