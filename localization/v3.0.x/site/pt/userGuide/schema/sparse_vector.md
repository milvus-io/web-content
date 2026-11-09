---
id: sparse_vector.md
title: Vetor esparso
summary: >-
  Os vetores esparsos constituem um método importante para captar a
  correspondência de termos ao nível da superfície na recuperação de informação
  e no processamento de linguagem natural. Embora os vetores densos se destaquem
  na compreensão semântica, os vetores esparsos proporcionam frequentemente
  resultados de correspondência mais previsíveis, especialmente na pesquisa de
  termos específicos ou identificadores textuais.
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
    </button></h1><p>Os vetores esparsos constituem um método importante para captar a correspondência de termos ao nível da superfície na recuperação de informação e no processamento de linguagem natural. Enquanto os vetores densos se destacam na compreensão semântica, os vetores esparsos proporcionam frequentemente resultados de correspondência mais previsíveis, especialmente na pesquisa de termos específicos ou identificadores textuais.</p>
<h2 id="Overview" class="common-anchor-header">Visão geral<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Um vetor esparso é um vetor especial de alta dimensão em que a maioria dos elementos é zero e apenas algumas dimensões apresentam valores diferentes de zero. Conforme ilustrado no diagrama abaixo, os vetores densos são normalmente representados como matrizes contínuas, em que cada posição tem um valor (por exemplo, <code translate="no">[0.3, 0.8, 0.2, 0.3, 0.1]</code>). Em contrapartida, os vetores esparsos armazenam apenas elementos diferentes de zero e os respetivos índices da dimensão, frequentemente representados como pares chave-valor de <code translate="no">{ index: value}</code> (por exemplo, <code translate="no">[{2: 0.2}, ..., {9997: 0.5}, {9999: 0.7}]</code>).</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/sparse-vector-representation.png" alt="Sparse Vector Representation" class="doc-image" id="sparse-vector-representation" /> 
   <span>Representação de vetores esparsos</span>
  
 </span></p>
<p>Com a tokenização e a pontuação, os documentos podem ser representados como vetores «bag-of-words», em que cada dimensão corresponde a uma palavra específica do vocabulário. Apenas as palavras presentes no documento têm valores diferentes de zero, criando uma representação de vetor esparso. Os vetores esparsos podem ser gerados utilizando duas abordagens:</p>
<ul>
<li><p><strong>As técnicas estatísticas tradicionais</strong>, como <a href="https://en.wikipedia.org/wiki/Tf%E2%80%93idf">o TF-IDF</a> (Frequência do Termo-Frequência Inversa do Documento) e <a href="https://en.wikipedia.org/wiki/Okapi_BM25">o BM25</a> (Best Matching 25), atribuem pesos às palavras com base na sua frequência e importância num corpus. Estes métodos calculam estatísticas simples como pontuações para cada dimensão, que representa um token.  O Milvus disponibiliza <strong>uma pesquisa de texto completo</strong> integrada com o método BM25, que converte automaticamente o texto em vetores esparsos, eliminando a necessidade de pré-processamento manual. Esta abordagem é ideal para pesquisas baseadas em palavras-chave, onde a precisão e as correspondências exatas são importantes. Consulte <a href="/docs/pt/full-text-search.md">Pesquisa de Texto Completo</a> para obter mais informações.</p></li>
<li><p><strong>Os modelos neurais de incorporação esparsa</strong> são métodos aprendidos para gerar representações esparsas através do treino em grandes conjuntos de dados. São, normalmente, modelos de aprendizagem profunda com arquitetura Transformer, capazes de expandir e ponderar termos com base no contexto semântico. O Milvus também suporta incorporações esparsas geradas externamente a partir de modelos como <a href="https://arxiv.org/abs/2109.10086">o SPLADE</a>. Consulte <a href="/docs/pt/embeddings.md#Embedding-Overview">«Incorporações»</a> para obter mais detalhes.</p></li>
</ul>
<p>Os vetores esparsos e o texto original podem ser armazenados no Milvus para uma recuperação eficiente. O diagrama abaixo descreve o processo global.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/sparse-vector-workflow.png" alt="Sparse Vector Workflow" class="doc-image" id="sparse-vector-workflow" /> 
   <span>Fluxo de trabalho de vetores esparsos</span>
  
 </span></p>
<div class="alert note">
<p>Para além dos vetores esparsos, o Milvus também suporta vetores densos e vetores binários. Os vetores densos são ideais para captar relações semânticas profundas, enquanto os vetores binários destacam-se em cenários como comparações rápidas de similaridade e deduplicação de conteúdos. Para mais informações, consulte <a href="/docs/pt/dense-vector.md">«Vetor Denso</a> » e <a href="/docs/pt/binary-vector.md">«Vetor Binário</a>».</p>
</div>
<h2 id="Data-Formats" class="common-anchor-header">Formatos de dados<button data-href="#Data-Formats" class="anchor-icon" translate="no">
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
    </button></h2><p>Nas secções seguintes, demonstramos como armazenar vetores a partir de modelos de embeddings esparsos aprendidos, como o SPLADE. Se procura algo para complementar a pesquisa semântica baseada em vetores densos, recomendamos <a href="/docs/pt/full-text-search.md">a Pesquisa de Texto Completo</a> com BM25 em vez do SPLADE, por uma questão de simplicidade. Se já realizou uma avaliação de qualidade e decidiu utilizar o SPLADE, pode consultar <a href="/docs/pt/embeddings.md#Embedding-Overview">a secção «Incorporações»</a> para saber como gerar vetores esparsos com o SPLADE.</p>
<p>O Milvus suporta a entrada de vetores esparsos nos seguintes formatos:</p>
<ul>
<li><p><strong>Lista de dicionários (formato <code translate="no">{dimension_index: value, ...}</code>)</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Represent each sparse vector using a dictionary</span>
sparse_vectors = [{<span class="hljs-number">27</span>: <span class="hljs-number">0.5</span>, <span class="hljs-number">100</span>: <span class="hljs-number">0.3</span>, <span class="hljs-number">5369</span>: <span class="hljs-number">0.6</span>} , {<span class="hljs-number">100</span>: <span class="hljs-number">0.1</span>, <span class="hljs-number">3</span>: <span class="hljs-number">0.8</span>}]
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Matriz esparsa (utilizando a classe <code translate="no">scipy.sparse</code> )</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> scipy.sparse <span class="hljs-keyword">import</span> csr_matrix

<span class="hljs-comment"># First vector: indices [27, 100, 5369] with values [0.5, 0.3, 0.6]</span>
<span class="hljs-comment"># Second vector: indices [3, 100] with values [0.8, 0.1]</span>
indices = [[<span class="hljs-number">27</span>, <span class="hljs-number">100</span>, <span class="hljs-number">5369</span>], [<span class="hljs-number">3</span>, <span class="hljs-number">100</span>]]
values = [[<span class="hljs-number">0.5</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.6</span>], [<span class="hljs-number">0.8</span>, <span class="hljs-number">0.1</span>]]
sparse_vectors = [csr_matrix((vals, ([<span class="hljs-number">0</span>]*<span class="hljs-built_in">len</span>(idx), idx)), shape=(<span class="hljs-number">1</span>, <span class="hljs-number">5369</span>+<span class="hljs-number">1</span>)) <span class="hljs-keyword">for</span> idx, vals <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(indices, values)]
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Lista de tuplas iteráveis (por exemplo, <code translate="no">[(dimension_index, value)]</code>)</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Represent each sparse vector using a list of iterables (e.g. tuples)</span>
sparse_vector = [
    [(<span class="hljs-number">27</span>, <span class="hljs-number">0.5</span>), (<span class="hljs-number">100</span>, <span class="hljs-number">0.3</span>), (<span class="hljs-number">5369</span>, <span class="hljs-number">0.6</span>)],
    [(<span class="hljs-number">100</span>, <span class="hljs-number">0.1</span>), (<span class="hljs-number">3</span>, <span class="hljs-number">0.8</span>)]
    ]
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Define-Collection-Schema" class="common-anchor-header">Definir o esquema da coleção<button data-href="#Define-Collection-Schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de criar uma coleção, é necessário especificar o esquema da coleção, que define os campos e, opcionalmente, uma função para converter um campo de texto na representação de vetor esparso correspondente.</p>
<h3 id="Add-fields" class="common-anchor-header">Adicionar campos<button data-href="#Add-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Para utilizar vetores esparsos no Milvus, é necessário criar uma coleção com um esquema que inclua os seguintes campos:</p>
<ul>
<li><p>Um campo « <code translate="no">SPARSE_FLOAT_VECTOR</code> » reservado para armazenar vetores esparsos, gerado automaticamente a partir de um campo « <code translate="no">VARCHAR</code> » ou fornecido diretamente nos dados de entrada.</p></li>
<li><p>Normalmente, o texto bruto que o vetor esparso representa também é armazenado na coleção. Pode utilizar um campo « <code translate="no">VARCHAR</code> » para armazenar o texto bruto.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

schema = client.create_schema(
    auto_id=<span class="hljs-literal">True</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.VARCHAR, is_primary=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">100</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>, enable_analyzer=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());
        
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
schema.setEnableDynamicField(<span class="hljs-literal">true</span>);
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;pk&quot;</span>)
        .dataType(DataType.VarChar)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .maxLength(<span class="hljs-number">100</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">65535</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

schema := entity.NewSchema()
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;pk&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithIsAutoID(<span class="hljs-literal">true</span>).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">100</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;sparse_vector&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">65535</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(
    &amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>),
)
.<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">schema</span> = CollectionSchema::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;pk&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
            .<span class="hljs-title function_ invoke__">primary_key</span>(<span class="hljs-literal">true</span>)
            .<span class="hljs-title function_ invoke__">auto_id</span>(<span class="hljs-literal">true</span>)
            .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">100</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::SparseFloatVector),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;text&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)
            .<span class="hljs-title function_ invoke__">enable_analyzer</span>(<span class="hljs-literal">true</span>)
            .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">65535</span>),
    );
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

milvus::CollectionSchemaPtr schema = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::CollectionSchema&gt;();
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;pk&quot;</span>, milvus::DataType::VARCHAR, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">100</span>));
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>, milvus::DataType::SPARSE_FLOAT_VECTOR));
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;text&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">65535</span>).<span class="hljs-built_in">EnableAnalyzer</span>(<span class="hljs-literal">true</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span>, <span class="hljs-title class_">MetricType</span>, <span class="hljs-title class_">IndexType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;pk&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">100</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;sparse_vector&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">65535</span>,
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig { Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span> });
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-keyword">var</span> schema = <span class="hljs-keyword">new</span> CollectionSchema
{
    EnableDynamicFields = <span class="hljs-literal">true</span>,
    Fields =
    {
        FieldSchema.CreateVarchar(<span class="hljs-string">&quot;pk&quot;</span>, maxLength: <span class="hljs-number">100</span>, isPrimaryKey: <span class="hljs-literal">true</span>, autoId: <span class="hljs-literal">true</span>),
        <span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;sparse_vector&quot;</span>, DataType.SparseFloatVector),
        FieldSchema.CreateVarchar(<span class="hljs-string">&quot;text&quot;</span>, maxLength: <span class="hljs-number">65535</span>, enableAnalyzer: <span class="hljs-literal">true</span>)
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> primaryField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;pk&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;isPrimary&quot;: true,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 100
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;sparse_vector&quot;,
    &quot;dataType&quot;: &quot;SparseFloatVector&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> textField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;text&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 65535,
        &quot;enable_analyzer&quot;: true
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$textField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Neste exemplo, são adicionados três campos:</p>
<ul>
<li><p><code translate="no">pk</code>: Este campo armazena chaves primárias utilizando o tipo de dados « <code translate="no">VARCHAR</code> », que é gerado automaticamente com um comprimento máximo de 100 bytes.</p></li>
<li><p><code translate="no">sparse_vector</code>: Este campo armazena vetores esparsos utilizando o tipo de dados ` <code translate="no">SPARSE_FLOAT_VECTOR</code> `.</p></li>
<li><p><code translate="no">text</code>: Este campo armazena cadeias de texto utilizando o tipo de dados ` <code translate="no">VARCHAR</code> `, com um comprimento máximo de 65 535 bytes.</p></li>
</ul>
<div class="alert note">
<p>Para permitir que o Milvus gere incorporações de vetores esparsos a partir de um campo de texto especificado durante a inserção de dados, é necessário realizar um passo adicional que envolve uma função. Para mais informações, consulte <a href="/docs/pt/full-text-search.md"> Pesquisa de Texto Completo</a>.</p>
</div>
<h2 id="Set-Index-Parameters" class="common-anchor-header">Definir parâmetros de índice<button data-href="#Set-Index-Parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>O processo de criação de um índice para vetores esparsos é semelhante ao dos <a href="/docs/pt/dense-vector.md">vetores densos</a>, mas com diferenças no tipo de índice especificado (<code translate="no">index_type</code>), na métrica de distância (<code translate="no">metric_type</code>) e nos parâmetros do índice (<code translate="no">params</code>).</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>}, <span class="hljs-comment"># or &quot;DAAT_WAND&quot; or &quot;TAAT_NAIVE&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.*;

List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();

Map&lt;String,Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams.put(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>, <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>); <span class="hljs-comment">// Algorithm used for building and querying the index</span>

indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
        .indexName(<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>)
        .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
        .metricType(IndexParam.MetricType.IP)
        .extraParams(extraParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

idx := index.NewSparseInvertedIndex(entity.IP, <span class="hljs-number">0.2</span>)
indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;sparse_vector&quot;</span>, idx)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">index_param</span> = IndexParam::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
    .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>)
    .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::SparseInvertedIndex)
    .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::Ip)
    .<span class="hljs-title function_ invoke__">extra_params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([(
        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(),
        <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(),
    )]));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-function">milvus::IndexDesc <span class="hljs-title">sparse_index</span><span class="hljs-params">(<span class="hljs-string">&quot;sparse_vector&quot;</span>, <span class="hljs-string">&quot;sparse_inverted_index&quot;</span>, milvus::IndexType::SPARSE_INVERTED_INDEX, milvus::MetricType::IP)</span></span>;
sparse_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;inverted_index_algo&quot;</span>, <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MetricType</span>, <span class="hljs-title class_">IndexType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> indexParams = {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;sparse_vector&#x27;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">IP</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;sparse_inverted_index&#x27;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">SPARSE_INVERTED_INDEX</span>,
    <span class="hljs-attr">params</span>: {
      <span class="hljs-attr">inverted_index_algo</span>: <span class="hljs-string">&#x27;DAAT_MAXSCORE&#x27;</span>,
    },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> indexes = <span class="hljs-keyword">new</span>[]
{
    <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;sparse_vector&quot;</span>, <span class="hljs-string">&quot;sparse_inverted_index&quot;</span>, IndexType.SparseInvertedIndex, MetricType.Ip)
    {
        ExtraParams = { [<span class="hljs-string">&quot;inverted_index_algo&quot;</span>] = <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span> } <span class="hljs-comment">// or &quot;DAAT_WAND&quot; or &quot;TAAT_NAIVE&quot;</span>
    }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;sparse_vector&quot;,
            &quot;metricType&quot;: &quot;IP&quot;,
            &quot;indexName&quot;: &quot;sparse_inverted_index&quot;,
            &quot;indexType&quot;: &quot;SPARSE_INVERTED_INDEX&quot;,
            &quot;params&quot;:{&quot;inverted_index_algo&quot;: &quot;DAAT_MAXSCORE&quot;}
        }
    ]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Este exemplo utiliza o tipo de índice <code translate="no">SPARSE_INVERTED_INDEX</code> com <code translate="no">IP</code> como métrica. Para mais detalhes, consulte os seguintes recursos:</p>
<ul>
<li><p><a href="/docs/pt/sparse-inverted-index.md">SPARSE_INVERTED_INDEX</a>: Explicação do índice e dos seus parâmetros</p></li>
<li><p><a href="/docs/pt/metric.md">Tipos de métricas</a>: Tipos de métricas suportados para diferentes tipos de campos</p></li>
<li><p><a href="/docs/pt/full-text-search.md">Pesquisa de texto completo</a>: Um tutorial detalhado sobre a pesquisa de texto completo</p></li>
</ul>
<h2 id="Create-Collection" class="common-anchor-header">Criar coleção<button data-href="#Create-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Assim que as definições do vetor esparso e do índice estiverem concluídas, pode criar uma coleção que contenha vetores esparsos. O exemplo abaixo utiliza o <a href="/docs/pt/create-collection.md"><code translate="no">create_collection</code></a> método para criar uma coleção denominada « <code translate="no">my_collection</code> ».</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
err = loadTask.Await(ctx)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

client
    .<span class="hljs-title function_ invoke__">create_collection</span>(
        CreateCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">schema</span>(schema)
            .<span class="hljs-title function_ invoke__">index_params</span>(<span class="hljs-built_in">vec!</span>[index_param])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">CreateCollection</span>(milvus::<span class="hljs-built_in">CreateCollectionRequest</span>()
                                        .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                        .<span class="hljs-built_in">AddIndex</span>(std::<span class="hljs-built_in">move</span>(sparse_index))
                                        .<span class="hljs-built_in">WithCollectionSchema</span>(schema));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    <span class="hljs-attr">schema</span>: schema,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    ...indexParams,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;

<span class="hljs-keyword">await</span> client.CreateCollectionAsync(<span class="hljs-keyword">new</span> CreateCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    Schema = schema,
    Indexes = indexes
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data" class="common-anchor-header">Inserir dados<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Deve fornecer dados para todos os campos definidos durante a criação da coleção, exceto para os campos gerados automaticamente (como a chave primária com a opção « <code translate="no">auto_id</code> » ativada). Se estiver a utilizar a função BM25 integrada para gerar automaticamente vetores esparsos, deve também omitir o campo do vetor esparso ao inserir dados.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">data = [
    {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;information retrieval is a field of study.&quot;</span>,
        <span class="hljs-string">&quot;sparse_vector&quot;</span>: {<span class="hljs-number">1</span>: <span class="hljs-number">0.5</span>, <span class="hljs-number">100</span>: <span class="hljs-number">0.3</span>, <span class="hljs-number">500</span>: <span class="hljs-number">0.8</span>}
    },
    {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;information retrieval focuses on finding relevant information in large datasets.&quot;</span>,
        <span class="hljs-string">&quot;sparse_vector&quot;</span>: {<span class="hljs-number">10</span>: <span class="hljs-number">0.1</span>, <span class="hljs-number">200</span>: <span class="hljs-number">0.7</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.9</span>}
    }
]

client.insert(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=data
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;

<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> java.util.SortedMap;
<span class="hljs-keyword">import</span> java.util.TreeMap;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();

{
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;information retrieval is a field of study.&quot;</span>);
    
    SortedMap&lt;Long, Float&gt; sparse = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeMap</span>&lt;&gt;();
    sparse.put(<span class="hljs-number">1L</span>, <span class="hljs-number">0.5f</span>);
    sparse.put(<span class="hljs-number">100L</span>, <span class="hljs-number">0.3f</span>);
    sparse.put(<span class="hljs-number">500L</span>, <span class="hljs-number">0.8f</span>);
    row.add(<span class="hljs-string">&quot;sparse_vector&quot;</span>, gson.toJsonTree(sparse));
    rows.add(row);
}
{
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;information retrieval focuses on finding relevant information in large datasets.&quot;</span>);
    
    SortedMap&lt;Long, Float&gt; sparse = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeMap</span>&lt;&gt;();
    sparse.put(<span class="hljs-number">10L</span>, <span class="hljs-number">0.1f</span>);
    sparse.put(<span class="hljs-number">200L</span>, <span class="hljs-number">0.7f</span>);
    sparse.put(<span class="hljs-number">1000L</span>, <span class="hljs-number">0.9f</span>);
    row.add(<span class="hljs-string">&quot;sparse_vector&quot;</span>, gson.toJsonTree(sparse));
    rows.add(row);
}

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertResp</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

texts := []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;information retrieval is a field of study.&quot;</span>,
    <span class="hljs-string">&quot;information retrieval focuses on finding relevant information in large datasets.&quot;</span>,
}
textColumn := column.NewColumnVarChar(<span class="hljs-string">&quot;text&quot;</span>, texts)

<span class="hljs-comment">// Prepare sparse vectors</span>
sparseVectors := <span class="hljs-built_in">make</span>([]entity.SparseEmbedding, <span class="hljs-number">0</span>, <span class="hljs-number">2</span>)
sparseVector1, _ := entity.NewSliceSparseEmbedding([]<span class="hljs-type">uint32</span>{<span class="hljs-number">1</span>, <span class="hljs-number">100</span>, <span class="hljs-number">500</span>}, []<span class="hljs-type">float32</span>{<span class="hljs-number">0.5</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.8</span>})
sparseVectors = <span class="hljs-built_in">append</span>(sparseVectors, sparseVector1)
sparseVector2, _ := entity.NewSliceSparseEmbedding([]<span class="hljs-type">uint32</span>{<span class="hljs-number">10</span>, <span class="hljs-number">200</span>, <span class="hljs-number">1000</span>}, []<span class="hljs-type">float32</span>{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.9</span>})
sparseVectors = <span class="hljs-built_in">append</span>(sparseVectors, sparseVector2)
sparseVectorColumn := column.NewColumnSparseVectors(<span class="hljs-string">&quot;sparse_vector&quot;</span>, sparseVectors)

_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithColumns(
        sparseVectorColumn,
        textColumn,
    ))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

client
    .<span class="hljs-title function_ invoke__">insert</span>(
        InsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">rows</span>([
                serde_json::json!({<span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;information retrieval is a field of study.&quot;</span>, <span class="hljs-string">&quot;sparse_vector&quot;</span>: {<span class="hljs-string">&quot;1&quot;</span>: <span class="hljs-number">0.5</span>, <span class="hljs-string">&quot;100&quot;</span>: <span class="hljs-number">0.3</span>, <span class="hljs-string">&quot;500&quot;</span>: <span class="hljs-number">0.8</span>}}),
                serde_json::json!({<span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;information retrieval focuses on finding relevant information in large datasets.&quot;</span>, <span class="hljs-string">&quot;sparse_vector&quot;</span>: {<span class="hljs-string">&quot;10&quot;</span>: <span class="hljs-number">0.1</span>, <span class="hljs-string">&quot;200&quot;</span>: <span class="hljs-number">0.7</span>, <span class="hljs-string">&quot;1000&quot;</span>: <span class="hljs-number">0.9</span>}}),
            ])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

milvus::EntityRows data = {{{<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;information retrieval is a field of study.&quot;</span>}, {<span class="hljs-string">&quot;sparse_vector&quot;</span>, {{<span class="hljs-string">&quot;1&quot;</span>, <span class="hljs-number">0.5</span>}, {<span class="hljs-string">&quot;100&quot;</span>, <span class="hljs-number">0.3</span>}, {<span class="hljs-string">&quot;500&quot;</span>, <span class="hljs-number">0.8</span>}}}},
                           {{<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;information retrieval focuses on finding relevant information in large datasets.&quot;</span>}, {<span class="hljs-string">&quot;sparse_vector&quot;</span>, {{<span class="hljs-string">&quot;10&quot;</span>, <span class="hljs-number">0.1</span>}, {<span class="hljs-string">&quot;200&quot;</span>, <span class="hljs-number">0.7</span>}, {<span class="hljs-string">&quot;1000&quot;</span>, <span class="hljs-number">0.9</span>}}}}};

milvus::InsertResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Insert</span>(milvus::<span class="hljs-built_in">InsertRequest</span>()
                                .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                                .<span class="hljs-built_in">WithRowsData</span>(std::<span class="hljs-built_in">move</span>(data)),
                             response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [
    {
        <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;information retrieval is a field of study.&#x27;</span>,
        <span class="hljs-attr">sparse_vector</span>: {<span class="hljs-number">1</span>: <span class="hljs-number">0.5</span>, <span class="hljs-number">100</span>: <span class="hljs-number">0.3</span>, <span class="hljs-number">500</span>: <span class="hljs-number">0.8</span>},
    },
    {
        <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;information retrieval focuses on finding relevant information in large datasets.&#x27;</span>,
        <span class="hljs-attr">sparse_vector</span>: {<span class="hljs-number">10</span>: <span class="hljs-number">0.1</span>, <span class="hljs-number">200</span>: <span class="hljs-number">0.7</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.9</span>},
    },
];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">data</span>: data
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;

<span class="hljs-keyword">await</span> client.InsertAsync(<span class="hljs-keyword">new</span> InsertReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    RowsData = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
        {
            [<span class="hljs-string">&quot;text&quot;</span>] = <span class="hljs-string">&quot;information retrieval is a field of study.&quot;</span>,
            [<span class="hljs-string">&quot;sparse_vector&quot;</span>] = <span class="hljs-keyword">new</span> SparseVector&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">1</span>, <span class="hljs-number">100</span>, <span class="hljs-number">500</span> }, <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.5f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.8f</span> })
        },
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
        {
            [<span class="hljs-string">&quot;text&quot;</span>] = <span class="hljs-string">&quot;information retrieval focuses on finding relevant information in large datasets.&quot;</span>,
            [<span class="hljs-string">&quot;sparse_vector&quot;</span>] = <span class="hljs-keyword">new</span> SparseVector&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">10</span>, <span class="hljs-number">200</span>, <span class="hljs-number">1000</span> }, <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.7f</span>, <span class="hljs-number">0.9f</span> })
        }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {
            &quot;text&quot;: &quot;information retrieval is a field of study.&quot;,
            &quot;sparse_vector&quot;: {&quot;1&quot;: 0.5, &quot;100&quot;: 0.3, &quot;500&quot;: 0.8}
        },
        {
            &quot;text&quot;: &quot;information retrieval focuses on finding relevant information in large datasets.&quot;,
            &quot;sparse_vector&quot;: {&quot;10&quot;: 0.1, &quot;200&quot;: 0.7, &quot;1000&quot;: 0.9}
        }     
    ],
    &quot;collectionName&quot;: &quot;my_collection&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Perform-Similarity-Search" class="common-anchor-header">Efetuar uma pesquisa de similaridade<button data-href="#Perform-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Para efetuar uma pesquisa de similaridade utilizando vetores esparsos, prepare tanto os dados da consulta como os parâmetros de pesquisa.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare search parameters</span>
search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>},  <span class="hljs-comment"># A tunable drop ratio parameter with a valid range between 0 and 1</span>
}

<span class="hljs-comment"># Query with sparse vector</span>
query_data = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.SparseFloatVec;

<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;
<span class="hljs-keyword">import</span> java.util.SortedMap;
<span class="hljs-keyword">import</span> java.util.TreeMap;

<span class="hljs-comment">// Prepare search parameters</span>
Map&lt;String,Object&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
searchParams.put(<span class="hljs-string">&quot;drop_ratio_search&quot;</span>, <span class="hljs-number">0.2</span>);

<span class="hljs-comment">// Query with the sparse vector</span>
SortedMap&lt;Long, Float&gt; sparse = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeMap</span>&lt;&gt;();
sparse.put(<span class="hljs-number">1L</span>, <span class="hljs-number">0.2f</span>);
sparse.put(<span class="hljs-number">50L</span>, <span class="hljs-number">0.4f</span>);
sparse.put(<span class="hljs-number">1000L</span>, <span class="hljs-number">0.7f</span>);
<span class="hljs-type">SparseFloatVec</span> <span class="hljs-variable">queryData</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">SparseFloatVec</span>(sparse);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
)

<span class="hljs-comment">// Prepare search parameters</span>
annSearchParams := index.NewCustomAnnParam()
annSearchParams.WithExtraParam(<span class="hljs-string">&quot;drop_ratio_search&quot;</span>, <span class="hljs-number">0.2</span>)

<span class="hljs-comment">// Query with the sparse vector</span>
queryData, _ := entity.NewSliceSparseEmbedding([]<span class="hljs-type">uint32</span>{<span class="hljs-number">1</span>, <span class="hljs-number">50</span>, <span class="hljs-number">1000</span>}, []<span class="hljs-type">float32</span>{<span class="hljs-number">0.2</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.7</span>})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-comment">// Prepare search parameters</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">search_params</span> = HashMap::<span class="hljs-title function_ invoke__">from</span>([(<span class="hljs-string">&quot;drop_ratio_search&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;0.2&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>())]);

<span class="hljs-comment">// Query with the sparse vector</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">sparse</span>: SparseVector = [(<span class="hljs-number">1</span>, <span class="hljs-number">0.2f32</span>), (<span class="hljs-number">50</span>, <span class="hljs-number">0.4f32</span>), (<span class="hljs-number">1000</span>, <span class="hljs-number">0.7f32</span>)].<span class="hljs-title function_ invoke__">into_iter</span>().<span class="hljs-title function_ invoke__">collect</span>();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Prepare search parameters</span>
<span class="hljs-type">const</span> std::string drop_ratio_search = <span class="hljs-string">&quot;0.2&quot;</span>;  <span class="hljs-comment">// A tunable drop ratio parameter with a valid range between 0 and 1</span>

<span class="hljs-comment">// Query with the sparse vector</span>
nlohmann::json query_vector = {{<span class="hljs-string">&quot;1&quot;</span>, <span class="hljs-number">0.2</span>}, {<span class="hljs-string">&quot;50&quot;</span>, <span class="hljs-number">0.4</span>}, {<span class="hljs-string">&quot;1000&quot;</span>, <span class="hljs-number">0.7</span>}};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Prepare search parameters</span>
<span class="hljs-keyword">const</span> searchParams = {<span class="hljs-attr">drop_ratio_search</span>: <span class="hljs-number">0.2</span>}

<span class="hljs-comment">// Query with the sparse vector</span>
<span class="hljs-keyword">const</span> queryData = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-comment">// Prepare search parameters</span>
<span class="hljs-keyword">var</span> searchParams = <span class="hljs-keyword">new</span> SearchParameters
{
    ExtraParameters = { [<span class="hljs-string">&quot;drop_ratio_search&quot;</span>] = <span class="hljs-string">&quot;0.2&quot;</span> } <span class="hljs-comment">// A tunable drop ratio parameter with a valid range between 0 and 1</span>
};

<span class="hljs-comment">// Query with sparse vector</span>
<span class="hljs-keyword">var</span> queryData = <span class="hljs-keyword">new</span>[] { <span class="hljs-keyword">new</span> SparseVector&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">1</span>, <span class="hljs-number">50</span>, <span class="hljs-number">1000</span> }, <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.7f</span> }) };
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Prepare search parameters</span>
<span class="hljs-built_in">export</span> searchParams=<span class="hljs-string">&#x27;{&quot;drop_ratio_search&quot;: 0.2}&#x27;</span>

<span class="hljs-comment"># Query with the sparse vector</span>
<span class="hljs-built_in">export</span> queryData=<span class="hljs-string">&#x27;[{&quot;1&quot;: 0.2, &quot;50&quot;: 0.4, &quot;1000&quot;: 0.7}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Em seguida, execute a pesquisa de similaridade utilizando o método ` <code translate="no">search</code> `:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=query_data,
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>],
    search_params=search_params,
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: &#x27;453718927992172266&#x27;, &#x27;distance&#x27;: 0.6299999952316284, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;453718927992172266&#x27;}}, {&#x27;id&#x27;: &#x27;453718927992172265&#x27;, &#x27;distance&#x27;: 0.10000000149011612, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;453718927992172265&#x27;}}]&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchR</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(queryData))
        .annsField(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
        .searchParams(searchParams)
        .consistencyLevel(ConsistencyLevel.STRONG)
        .topK(<span class="hljs-number">3</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;pk&quot;</span>))
        .build());

System.out.println(searchR.getSearchResults());

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// [[SearchResp.SearchResult(entity={pk=457270974427187729}, score=0.63, id=457270974427187729), SearchResp.SearchResult(entity={pk=457270974427187728}, score=0.1, id=457270974427187728)]]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-number">3</span>, <span class="hljs-comment">// limit</span>
    []entity.Vector{queryData},
).WithANNSField(<span class="hljs-string">&quot;sparse_vector&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;pk&quot;</span>).
    WithAnnParam(annSearchParams))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;Pks: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;pk&quot;</span>).FieldData().GetScalars())
}

<span class="hljs-comment">// Results:</span>
<span class="hljs-comment">//   IDs:  string_data:{data:&quot;457270974427187705&quot;  data:&quot;457270974427187704&quot;}</span>
<span class="hljs-comment">//   Scores:  [0.63 0.1]</span>
<span class="hljs-comment">//   Pks:  string_data:{data:&quot;457270974427187705&quot;  data:&quot;457270974427187704&quot;}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">results</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">SparseFloat</span>(<span class="hljs-built_in">vec!</span>[sparse]))
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">3</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;pk&quot;</span>])
            .<span class="hljs-title function_ invoke__">extra_params</span>(search_params)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, results);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">3</span>)
                   .<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;drop_ratio_search&quot;</span>, drop_ratio_search)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;pk&quot;</span>)
                   .<span class="hljs-built_in">AddSparseVector</span>(query_vector);

milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<span class="hljs-keyword">auto</span> search_results = response.<span class="hljs-built_in">Results</span>();
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">auto</span>&amp; result : search_results.<span class="hljs-built_in">Results</span>()) {
    milvus::EntityRows output_rows;
    status = result.<span class="hljs-built_in">OutputRows</span>(output_rows);
    <span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; row : output_rows) {
        std::cout &lt;&lt; <span class="hljs-string">&quot;\t&quot;</span> &lt;&lt; row &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    <span class="hljs-attr">data</span>: queryData,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;pk&#x27;</span>],
    <span class="hljs-attr">params</span>: searchParams,
    <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Strong&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> res = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    VectorFieldName = <span class="hljs-string">&quot;sparse_vector&quot;</span>,
    SparseVectors = queryData,
    Limit = <span class="hljs-number">3</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        OutputFields = { <span class="hljs-string">&quot;pk&quot;</span> },
        ExtraParameters = { [<span class="hljs-string">&quot;drop_ratio_search&quot;</span>] = <span class="hljs-string">&quot;0.2&quot;</span> },
        ConsistencyLevel = ConsistencyLevel.Strong
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;data\&quot;: <span class="hljs-variable">$queryData</span>,
    \&quot;annsField\&quot;: \&quot;sparse_vector\&quot;,
    \&quot;limit\&quot;: 3,
    \&quot;searchParams\&quot;: <span class="hljs-variable">$searchParams</span>,
    \&quot;outputFields\&quot;: [\&quot;pk\&quot;],
    \&quot;consistencyLevel\&quot;: \&quot;Strong\&quot;
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para mais informações sobre os parâmetros de pesquisa de similaridade, consulte <a href="/docs/pt/single-vector-search.md">Pesquisa Básica</a> de <a href="/docs/pt/single-vector-search.md">Vetores</a>.</p>
