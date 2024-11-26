---
id: dense-vector.md
title: Vetor denso
summary: >-
  Os vectores densos são representações de dados numéricos amplamente utilizados
  na aprendizagem automática e na análise de dados. São constituídos por
  matrizes com números reais, em que a maioria ou todos os elementos são
  diferentes de zero. Em comparação com os vectores esparsos, os vectores densos
  contêm mais informações ao mesmo nível dimensional, uma vez que cada dimensão
  contém valores significativos. Esta representação pode efetivamente captar
  padrões e relações complexos, facilitando a análise e o processamento de dados
  em espaços de elevada dimensão. Os vectores densos têm normalmente um número
  fixo de dimensões, que varia entre algumas dezenas e várias centenas ou mesmo
  milhares, dependendo da aplicação e dos requisitos específicos.
---
<h1 id="Dense-Vector​" class="common-anchor-header">Vetor denso<button data-href="#Dense-Vector​" class="anchor-icon" translate="no">
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
    </button></h1><p>Os vectores densos são representações de dados numéricos amplamente utilizados na aprendizagem automática e na análise de dados. São constituídos por matrizes com números reais, em que a maioria ou todos os elementos são diferentes de zero. Em comparação com os vectores esparsos, os vectores densos contêm mais informações ao mesmo nível dimensional, uma vez que cada dimensão contém valores significativos. Esta representação pode efetivamente captar padrões e relações complexos, facilitando a análise e o processamento de dados em espaços de elevada dimensão. Os vectores densos têm normalmente um número fixo de dimensões, que varia entre algumas dezenas e várias centenas ou mesmo milhares, dependendo da aplicação e dos requisitos específicos.</p>
<p>Os vectores densos são principalmente utilizados em cenários que exigem a compreensão da semântica dos dados, como a pesquisa semântica e os sistemas de recomendação. Na pesquisa semântica, os vectores densos ajudam a capturar as ligações subjacentes entre consultas e documentos, melhorando a relevância dos resultados da pesquisa. Nos sistemas de recomendação, ajudam a identificar semelhanças entre utilizadores e itens, oferecendo sugestões mais personalizadas.</p>
<h2 id="Overview​" class="common-anchor-header">Visão geral<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>Os vectores densos são normalmente representados como matrizes de números de vírgula flutuante com um comprimento fixo, como <code translate="no">[0.2, 0.7, 0.1, 0.8, 0.3, ..., 0.5]</code>. A dimensionalidade destes vectores varia normalmente entre centenas e milhares, como 128, 256, 768 ou 1024. Cada dimensão capta caraterísticas semânticas específicas de um objeto, tornando-o aplicável a vários cenários através de cálculos de semelhança.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/dense-vector.png" alt="Dense vectors in 2D space" class="doc-image" id="dense-vectors-in-2d-space" />
   </span> <span class="img-wrapper"> <span>Vectores densos no espaço 2D</span> </span></p>
<p>A imagem acima ilustra a representação de vectores densos num espaço 2D. Embora os vectores densos em aplicações do mundo real tenham frequentemente dimensões muito superiores, esta ilustração 2D transmite eficazmente vários conceitos-chave.</p>
<ul>
<li><p><strong>Representação multidimensional:</strong> Cada ponto representa um objeto concetual (como <strong>Milvus</strong>, <strong>base de dados vetorial</strong>, <strong>sistema de recuperação</strong>, etc.), sendo a sua posição determinada pelos valores das suas dimensões.</p></li>
<li><p><strong>Relações semânticas:</strong> As distâncias entre pontos reflectem a semelhança semântica entre conceitos. Pontos mais próximos indicam conceitos que estão mais relacionados semanticamente.</p></li>
<li><p><strong>Efeito de agrupamento:</strong> Os conceitos relacionados (como <strong>Milvus</strong>, <strong>base de dados vetorial</strong> e <strong>sistema de recuperação</strong>) são posicionados próximos uns dos outros no espaço, formando um agrupamento semântico.</p></li>
</ul>
<p>Segue-se um exemplo de um vetor denso real que representa o texto <code translate="no">&quot;Milvus is an efficient vector database&quot;</code>.</p>
<pre><code translate="no" class="language-JSON">[​
    -<span class="hljs-number">0.013052909</span>,​
    <span class="hljs-number">0.020387933</span>,​
    -<span class="hljs-number">0.007869</span>,​
    -<span class="hljs-number">0.11111383</span>,​
    -<span class="hljs-number">0.030188112</span>,​
    -<span class="hljs-number">0.0053388323</span>,​
    <span class="hljs-number">0.0010654867</span>,​
    <span class="hljs-number">0.072027855</span>,​
    <span class="hljs-comment">// ... more dimensions​</span>
]​
​

<button class="copy-code-btn"></button></code></pre>
<p>Os vectores densos podem ser gerados utilizando vários modelos <a href="https://en.wikipedia.org/wiki/Embedding">de incorporação</a>, tais como modelos CNN (como <a href="https://pytorch.org/hub/pytorch_vision_resnet/">ResNet</a>, <a href="https://pytorch.org/vision/stable/models/vgg.html">VGG</a>) para imagens e modelos de linguagem (como <a href="https://en.wikipedia.org/wiki/BERT_(language_model)">BERT</a>, <a href="https://en.wikipedia.org/wiki/Word2vec">Word2Vec</a>) para texto. Estes modelos transformam os dados em bruto em pontos num espaço de elevada dimensão, capturando as caraterísticas semânticas dos dados. Adicionalmente, Milvus oferece métodos convenientes para ajudar os utilizadores a gerar e processar vectores densos, como detalhado em Embeddings.</p>
<p>Uma vez os dados vectorizados, podem ser armazenados no Milvus para gestão e recuperação de vectores. O diagrama abaixo mostra o processo básico.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/use-dense-vector.png" alt="Use dense vecctors in Milvus" class="doc-image" id="use-dense-vecctors-in-milvus" />
   </span> <span class="img-wrapper"> <span>Utilizar vectores densos em Milvus</span> </span></p>
<div class="alert note">
<p>Para além dos vectores densos, Milvus também suporta vectores esparsos e vectores binários. Os vectores esparsos são adequados para correspondências precisas com base em termos específicos, como a pesquisa de palavras-chave e a correspondência de termos, enquanto os vectores binários são normalmente utilizados para tratar eficazmente dados binarizados, como a correspondência de padrões de imagem e determinadas aplicações de hashing. Para obter mais informações, consulte <a href="/docs/pt/binary-vector.md">Vetor binário</a> e <a href="/docs/pt/sparse_vector.md">Vetor esparso</a>.</p>
</div>
<h2 id="Use-dense-vectors-in-Milvus​" class="common-anchor-header">Utilizar vectores densos em Milvus<button data-href="#Use-dense-vectors-in-Milvus​" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Add-vector-field​" class="common-anchor-header">Adicionar campo vetorial</h3><p>Para utilizar vectores densos no Milvus, comece por definir um campo vetorial para armazenar vectores densos ao criar uma coleção. Este processo inclui.</p>
<ol>
<li><p>Definir <code translate="no">datatype</code> para um tipo de dados de vetor denso suportado. Para conhecer os tipos de dados de vetor denso suportados, consulte Tipos de dados.</p></li>
<li><p>Especificar as dimensões do vetor denso usando o parâmetro <code translate="no">dim</code>.</p></li>
</ol>
<p>No exemplo abaixo, adicionamos um campo de vetor chamado <code translate="no">dense_vector</code> para armazenar vetores densos. O tipo de dados do campo é <code translate="no">FLOAT_VECTOR</code>, com uma dimensão de <code translate="no">4</code>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
​
schema = client.create_schema(​
    auto_id=<span class="hljs-literal">True</span>,​
    enable_dynamic_fields=<span class="hljs-literal">True</span>,​
)​
​
schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.VARCHAR, is_primary=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">100</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
​
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .build());​
​
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​
schema.setEnableDynamicField(<span class="hljs-literal">true</span>);​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;pk&quot;</span>)​
        .dataType(DataType.VarChar)​
        .isPrimaryKey(<span class="hljs-literal">true</span>)​
        .autoID(<span class="hljs-literal">true</span>)​
        .maxLength(<span class="hljs-number">100</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;dense_vector&quot;</span>)​
        .dataType(DataType.FloatVector)​
        .dimension(<span class="hljs-number">4</span>)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
schema.<span class="hljs-title function_">push</span>({​
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;dense_vector&quot;</span>,​
  <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,​
  <span class="hljs-attr">dim</span>: <span class="hljs-number">128</span>,​
});​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> primaryField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;pk&quot;,​
    &quot;dataType&quot;: &quot;VarChar&quot;,​
    &quot;isPrimary&quot;: true,​
    &quot;elementTypeParams&quot;: {​
        &quot;max_length&quot;: 100​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;dense_vector&quot;,​
    &quot;dataType&quot;: &quot;FloatVector&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;dim&quot;: 4​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: true,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p><strong>Tipos de dados suportados para campos vetoriais densos</strong>:</p>
<table>
<thead>
<tr><th><strong>Tipo</strong></th><th><strong>Descrição</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">FLOAT_VECTOR</code></td><td>Armazena números de ponto flutuante de 32 bits, normalmente utilizados para representar números reais em cálculos científicos e aprendizagem automática. Ideal para cenários que exigem elevada precisão, como a distinção de vectores semelhantes.</td></tr>
<tr><td><code translate="no">FLOAT16_VECTOR</code></td><td>Armazena números de vírgula flutuante de meia-precisão de 16 bits, utilizados para aprendizagem profunda e cálculos de GPU. Poupa espaço de armazenamento em cenários em que a precisão é menos crítica, como na fase de recuperação de baixa precisão dos sistemas de recomendação.</td></tr>
<tr><td><code translate="no">BFLOAT16_VECTOR</code></td><td>Armazena números Brain Floating Point (bfloat16) de 16 bits, oferecendo a mesma gama de expoentes que o Float32, mas com precisão reduzida. Adequado para cenários que necessitam de processar rapidamente grandes volumes de vectores, como a recuperação de imagens em grande escala.</td></tr>
</tbody>
</table>
<h3 id="Set-index-params-for-vector-field​" class="common-anchor-header">Definir parâmetros de índice para o campo de vetor</h3><p>Para acelerar as pesquisas semânticas, deve ser criado um índice para o campo de vetor. A indexação pode melhorar significativamente a eficiência da recuperação de dados vetoriais em grande escala.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()​
​
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>,​
    index_name=<span class="hljs-string">&quot;dense_vector_index&quot;</span>,​
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
    <span class="hljs-keyword">params</span>={<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>}​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">IndexParam</span>;​
<span class="hljs-keyword">import</span> java.<span class="hljs-property">util</span>.*;​
​
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">IndexParam</span>&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>,<span class="hljs-title class_">Object</span>&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
extraParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;nlist&quot;</span>,<span class="hljs-number">128</span>);​
indexes.<span class="hljs-title function_">add</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;dense_vector&quot;</span>)​
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">IVF_FLAT</span>)​
        .<span class="hljs-title function_">metricType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">MetricType</span>.<span class="hljs-property">IP</span>)​
        .<span class="hljs-title function_">extraParams</span>(extraParams)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MetricType</span>, <span class="hljs-title class_">IndexType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> indexParams = {​
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;dense_vector_index&#x27;</span>,​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;dense_vector&#x27;</span>,​
    <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">IP</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">IVF_FLAT</span>,​
    <span class="hljs-attr">params</span>: {​
      <span class="hljs-attr">nlist</span>: <span class="hljs-number">128</span>​
    },​
};​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;dense_vector&quot;,​
            &quot;metricType&quot;: &quot;IP&quot;,​
            &quot;indexName&quot;: &quot;dense_vector_index&quot;,​
            &quot;indexType&quot;: &quot;IVF_FLAT&quot;,​
            &quot;params&quot;:{&quot;nlist&quot;: 128}​
        }​
    ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>No exemplo acima, um índice chamado <code translate="no">dense_vector_index</code> é criado para o campo <code translate="no">dense_vector</code> usando o tipo de índice <code translate="no">IVF_FLAT</code>. O <code translate="no">metric_type</code> é definido como <code translate="no">IP</code>, indicando que o produto interno será utilizado como a métrica de distância.</p>
<p>O Milvus também suporta outros tipos de índices. Para mais detalhes, consulte <a href="https://milvus.io/docs/index.md?tab=floating">Índices de vectores flutuantes</a>. Adicionalmente, Milvus suporta outros tipos de métricas. Para obter mais informações, consulte <a href="/docs/pt/metric.md">Tipos de métricas</a>.</p>
<h3 id="Create-collection​" class="common-anchor-header">Criar coleção</h3><p>Quando as definições do vetor denso e dos parâmetros do índice estiverem concluídas, pode criar uma coleção que contenha vectores densos. O exemplo abaixo usa o método <code translate="no">create_collection</code> para criar uma coleção chamada <code translate="no">my_dense_collection</code>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_collection</span>(​
    collection_name=<span class="hljs-string">&quot;my_dense_collection&quot;</span>,​
    schema=schema,​
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .build());​
​
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_dense_collection&quot;</span>)​
        .collectionSchema(schema)​
        .indexParams(indexes)​
        .build();​
client.createCollection(requestCreate);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({​
    <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>​
});​
​
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_dense_collection&#x27;</span>,​
    <span class="hljs-attr">schema</span>: schema,​
    <span class="hljs-attr">index_params</span>: indexParams​
});​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;my_dense_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data​" class="common-anchor-header">Inserir dados</h3><p>Depois de criar a coleção, use o método <code translate="no">insert</code> para adicionar dados contendo vetores densos. Certifique-se de que a dimensionalidade dos vetores densos que estão sendo inseridos corresponde ao valor <code translate="no">dim</code> definido ao adicionar o campo de vetor denso.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">data = [​
    {<span class="hljs-string">&quot;dense_vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>]},​
    {<span class="hljs-string">&quot;dense_vector&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.8</span>]},​
]​
​
client.<span class="hljs-title function_">insert</span>(​
    collection_name=<span class="hljs-string">&quot;my_dense_collection&quot;</span>,​
    data=data​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;​
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;​
​
List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;dense_vector\&quot;: [0.1, 0.2, 0.3, 0.4]}&quot;</span>, JsonObject.class));​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;dense_vector\&quot;: [0.2, 0.3, 0.4, 0.5]}&quot;</span>, JsonObject.class));​
​
<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_dense_collection&quot;</span>)​
        .data(rows)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [​
  { <span class="hljs-attr">dense_vector</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>] },​
  { <span class="hljs-attr">dense_vector</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.8</span>] },​
];​
​
client.<span class="hljs-title function_">insert</span>({​
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_dense_collection&quot;</span>,​
  <span class="hljs-attr">data</span>: data,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;data&quot;: [​
        {&quot;dense_vector&quot;: [0.1, 0.2, 0.3, 0.4]},​
        {&quot;dense_vector&quot;: [0.2, 0.3, 0.4, 0.5]}        ​
    ],​
    &quot;collectionName&quot;: &quot;my_dense_collection&quot;​
}&#x27;</span>​
​
<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:{&quot;insertCount&quot;:2,&quot;insertIds&quot;:[&quot;453577185629572531&quot;,&quot;453577185629572532&quot;]}}​</span>

<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-similarity-search​" class="common-anchor-header">Realizar pesquisa de similaridade</h3><p>A pesquisa semântica baseada em vectores densos é uma das principais funcionalidades do Milvus, permitindo-lhe encontrar rapidamente os dados mais semelhantes a um vetor de consulta com base na distância entre vectores. Para realizar uma pesquisa por semelhança, prepare o vetor de consulta e os parâmetros de pesquisa e, em seguida, chame o método <code translate="no">search</code>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">search_params = {​
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: 10}​
}​
​
query_vector = [0.1, 0.2, 0.3, 0.7]​
​
res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_dense_collection&quot;</span>,​
    data=[query_vector],​
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,​
    search_params=search_params,​
    <span class="hljs-built_in">limit</span>=5,​
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>]​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: &#x27;453718927992172271&#x27;, &#x27;distance&#x27;: 0.7599999904632568, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;453718927992172271&#x27;}}, {&#x27;id&#x27;: &#x27;453718927992172270&#x27;, &#x27;distance&#x27;: 0.6299999952316284, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;453718927992172270&#x27;}}]&quot;]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">request</span>.<span class="hljs-property">data</span>.<span class="hljs-property">FloatVec</span>;​
​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>,<span class="hljs-title class_">Object</span>&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
searchParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;nprobe&quot;</span>,<span class="hljs-number">10</span>);​
​
<span class="hljs-title class_">FloatVec</span> queryVector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> float[]{<span class="hljs-number">0.</span>1f, <span class="hljs-number">0.</span>3f, <span class="hljs-number">0.</span>3f, <span class="hljs-number">0.</span>4f});​
​
<span class="hljs-title class_">SearchResp</span> searchR = client.<span class="hljs-title function_">search</span>(<span class="hljs-title class_">SearchReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;my_dense_collection&quot;</span>)​
        .<span class="hljs-title function_">data</span>(<span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(queryVector))​
        .<span class="hljs-title function_">annsField</span>(<span class="hljs-string">&quot;dense_vector&quot;</span>)​
        .<span class="hljs-title function_">searchParams</span>(searchParams)​
        .<span class="hljs-title function_">topK</span>(<span class="hljs-number">5</span>)​
        .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(<span class="hljs-string">&quot;pk&quot;</span>))​
        .<span class="hljs-title function_">build</span>());​
        ​
<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(searchR.<span class="hljs-title function_">getSearchResults</span>());​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">//​</span>
<span class="hljs-comment">// [[SearchResp.SearchResult(entity={pk=453444327741536779}, score=0.65, id=453444327741536779), SearchResp.SearchResult(entity={pk=453444327741536778}, score=0.65, id=453444327741536778)]]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">query_vector = [0.1, 0.2, 0.3, 0.7];​
​
client.search({​
    collection_name: my_dense_collection,​
    data: query_vector,​
    <span class="hljs-built_in">limit</span>: 5,​
    output_fields: [<span class="hljs-string">&#x27;pk&#x27;</span>],​
    params: {​
        nprobe: 10​
    }​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_dense_collection&quot;,​
    &quot;data&quot;: [​
        [0.1, 0.2, 0.3, 0.7]​
    ],​
    &quot;annsField&quot;: &quot;dense_vector&quot;,​
    &quot;limit&quot;: 5,​
    &quot;searchParams&quot;:{​
        &quot;params&quot;:{&quot;nprobe&quot;:10}​
    },​
    &quot;outputFields&quot;: [&quot;pk&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;distance&quot;:0.55,&quot;id&quot;:&quot;453577185629572532&quot;,&quot;pk&quot;:&quot;453577185629572532&quot;},{&quot;distance&quot;:0.42,&quot;id&quot;:&quot;453577185629572531&quot;,&quot;pk&quot;:&quot;453577185629572531&quot;}]}​</span>

<button class="copy-code-btn"></button></code></pre>
<p>Para obter mais informações sobre os parâmetros de pesquisa de similaridade, consulte <a href="/docs/pt/single-vector-search.md">Pesquisa ANN básica</a>.</p>
