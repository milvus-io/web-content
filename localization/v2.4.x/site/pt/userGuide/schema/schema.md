---
id: schema.md
title: Esquema explicado
summary: >-
  Um esquema define a estrutura de dados de uma coleção. Antes de criar uma
  coleção, é necessário conceber o respetivo esquema. Esta página ajuda-o a
  compreender o esquema da coleção e a conceber um exemplo de esquema por si
  próprio.
---
<h1 id="Schema-Explained​" class="common-anchor-header">Explicação do esquema<button data-href="#Schema-Explained​" class="anchor-icon" translate="no">
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
    </button></h1><p>Um esquema define a estrutura de dados de uma coleção. Antes de criar uma coleção, é necessário conceber o respetivo esquema. Esta página ajuda-o a compreender o esquema da coleção e a conceber um exemplo de esquema por si próprio.</p>
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
    </button></h2><p>No Zilliz Cloud, um esquema de coleção reúne uma tabela numa base de dados relacional, que define a forma como o Zilliz Cloud organiza os dados na coleção. </p>
<p>Um esquema bem concebido é essencial, uma vez que abstrai o modelo de dados e decide se é possível atingir os objectivos de negócio através de uma pesquisa. Além disso, uma vez que cada linha de dados inserida na coleção deve seguir o esquema, ajuda a manter a consistência dos dados e a qualidade a longo prazo. De uma perspetiva técnica, um esquema bem definido leva a um armazenamento de dados de coluna bem organizado e a uma estrutura de índice mais limpa, aumentando o desempenho da pesquisa.</p>
<p>Um esquema de coleção tem uma chave primária, um máximo de quatro campos vectoriais e vários campos escalares. O diagrama a seguir ilustra como mapear um artigo para uma lista de campos de esquema.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/schema-explained.PNG" alt="Schema design" class="doc-image" id="schema-design" />
   </span> <span class="img-wrapper"> <span>Desenho do esquema</span> </span></p>
<p>A conceção do modelo de dados de um sistema de pesquisa envolve a análise das necessidades comerciais e a abstração da informação num modelo de dados expresso em esquema. Por exemplo, a pesquisa de um texto deve ser "indexada" convertendo a cadeia literal num vetor através de "embedding" e permitindo a pesquisa vetorial. Para além deste requisito essencial, pode ser necessário armazenar outras propriedades, como o carimbo temporal da publicação e o autor. Estes metadados permitem que as pesquisas semânticas sejam refinadas através de filtragem, devolvendo apenas textos publicados após uma data específica ou por um determinado autor. Também pode obter estes escalares com o texto principal para apresentar o resultado da pesquisa na aplicação. A cada um deles deve ser atribuído um identificador único para organizar estas partes de texto, expresso como um número inteiro ou uma cadeia de caracteres. Esses elementos são essenciais para obter uma lógica de pesquisa sofisticada.</p>
<p>Consulte a secção <a href="/docs/pt/schema-hands-on.md">Prática de conceção de esquemas</a> para saber como criar um esquema bem concebido.</p>
<h2 id="Create-Schema​" class="common-anchor-header">Criar esquema<button data-href="#Create-Schema​" class="anchor-icon" translate="no">
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
    </button></h2><p>O seguinte trecho de código demonstra como criar um esquema.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span>​
​
schema = <span class="hljs-title class_">MilvusClient</span>.<span class="hljs-title function_">create_schema</span>()​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> schema = []​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{​
    &quot;fields&quot;: []​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Add-Primary-Field​" class="common-anchor-header">Adicionar campo primário<button data-href="#Add-Primary-Field​" class="anchor-icon" translate="no">
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
    </button></h2><p>O campo primário numa coleção identifica de forma única uma entidade. Só aceita valores <strong>Int64</strong> ou <strong>VarChar</strong>. Os seguintes excertos de código demonstram como adicionar o campo primário.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_id&quot;</span>,​
    datatype=DataType.INT64,​
    <span class="hljs-comment"># highlight-start​</span>
    is_primary=<span class="hljs-literal">True</span>,​
    auto_id=<span class="hljs-literal">False</span>,​
    <span class="hljs-comment"># highlight-end​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">DataType</span>;​
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">collection</span>.<span class="hljs-property">request</span>.<span class="hljs-property">AddFieldReq</span>; ​
​
schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_id&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>)​
        <span class="hljs-comment">// highlight-start​</span>
        .<span class="hljs-title function_">isPrimaryKey</span>(<span class="hljs-literal">true</span>)​
        .<span class="hljs-title function_">autoID</span>(<span class="hljs-literal">false</span>)​
        <span class="hljs-comment">// highlight-end​</span>
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_id&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
    <span class="hljs-comment">// highlight-start​</span>
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​
    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>​
    <span class="hljs-comment">// highlight-end​</span>
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> primaryField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_id&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;,​
    &quot;isPrimary&quot;: true​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        $primaryField​
    ]​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Ao adicionar um campo, pode clarificar explicitamente o campo como o campo primário, definindo a sua propriedade <code translate="no">is_primary</code> para <code translate="no">True</code>. Um campo primário aceita valores <strong>Int64</strong> por defeito. Neste caso, o valor do campo primário deve ser um número inteiro semelhante a <code translate="no">12345</code>. Se optar por utilizar valores <strong>VarChar</strong> no campo primário, o valor deve ser uma cadeia de caracteres semelhante a <code translate="no">my_entity_1234</code>.</p>
<p>Também é possível definir as propriedades <code translate="no">autoId</code> como <code translate="no">True</code> para fazer com que o Zilliz Cloud aloque automaticamente os valores do campo primário nas inserções de dados.</p>
<p>Para obter detalhes, consulte <a href="/docs/pt/primary-field.md">Campo primário e AutoID</a>.</p>
<h2 id="Add-Vector-Fields​" class="common-anchor-header">Adicionar campos vetoriais<button data-href="#Add-Vector-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>Os campos de vetor aceitam vários embeddings de vetor esparsos e densos. No Zilliz Cloud, é possível adicionar quatro campos vetoriais a uma coleção. Os seguintes trechos de código demonstram como adicionar um campo de vetor.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_vector&quot;</span>,​
    datatype=DataType.FLOAT_VECTOR,​
    <span class="hljs-meta"># highlight-next-<span class="hljs-keyword">line</span>​</span>
    dim=<span class="hljs-number">5</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_vector&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>)​
        <span class="hljs-comment">// highlight-next-line​</span>
        .<span class="hljs-title function_">dimension</span>(<span class="hljs-number">5</span>)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,​
    <span class="hljs-comment">// highlight-next-line​</span>
    <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_vector&quot;,​
    &quot;dataType&quot;: &quot;FloatVector&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;dim&quot;: 5​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>O parâmetro <code translate="no">dim</code> nos trechos de código acima indica a dimensionalidade dos embeddings vetoriais a serem mantidos no campo vetorial. O valor <code translate="no">FLOAT_VECTOR</code> indica que o campo vetorial contém uma lista de números flutuantes de 32 bits, que são normalmente utilizados para representar antilogaritmos. Além disso, o Zilliz Cloud também suporta os seguintes tipos de incorporação vetorial.</p>
<ul>
<li><p><code translate="no">FLOAT16_VECTOR</code></p>
<p>Um campo vetorial deste tipo contém uma lista de números flutuantes de meia-precisão de 16 bits e aplica-se normalmente a cenários de aprendizagem profunda com restrições de memória ou largura de banda ou de computação baseada em GPU.</p></li>
<li><p><code translate="no">BFLOAT16_VECTOR</code></p>
<p>Um campo vetorial deste tipo contém uma lista de números de vírgula flutuante de 16 bits com precisão reduzida, mas com o mesmo intervalo de expoentes que o Float32. Este tipo de dados é normalmente utilizado em cenários de aprendizagem profunda, uma vez que reduz a utilização de memória sem afetar significativamente a precisão.</p></li>
<li><p><code translate="no">BINARY_VECTOR</code></p>
<p>Um campo vetorial deste tipo contém uma lista de 0s e 1s. Servem como caraterísticas compactas para representar dados em cenários de processamento de imagem e recuperação de informação.</p></li>
<li><p><code translate="no">SPARSE_FLOAT_VECTOR</code></p>
<p>Um campo vetorial deste tipo contém uma lista de números diferentes de zero e os seus números de sequência para representar embeddings vectoriais esparsos.</p></li>
</ul>
<h2 id="Add-Scalar-Fields​" class="common-anchor-header">Adicionar campos escalares<button data-href="#Add-Scalar-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>Em casos comuns, é possível utilizar campos escalares para armazenar os metadados dos embeddings vectoriais armazenados no Milvus e realizar pesquisas ANN com filtragem de metadados para melhorar a correção dos resultados da pesquisa. O Zilliz Cloud suporta múltiplos tipos de campos escalares, incluindo <strong>VarChar</strong>, <strong>Boolean</strong>, <strong>Int</strong>, Float, <strong>Double</strong>, <strong>Array</strong> e JSON.</p>
<h3 id="Add-String-Fields​" class="common-anchor-header">Adicionar campos String</h3><p>No Milvus, é possível usar campos VarChar para armazenar strings. Para saber mais sobre o campo VarChar, consulte <a href="/docs/pt/string.md">Campo String</a>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_varchar&quot;</span>,​
    datatype=DataType.VARCHAR,​
    <span class="hljs-meta"># highlight-next-<span class="hljs-keyword">line</span>​</span>
    max_length=<span class="hljs-number">512</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_varchar&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>)​
        <span class="hljs-comment">// highlight-next-line​</span>
        .<span class="hljs-title function_">maxLength</span>(<span class="hljs-number">512</span>)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_varchar&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
    <span class="hljs-comment">// highlight-next-line​</span>
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> varCharField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_varchar&quot;,​
    &quot;dataType&quot;: &quot;VarChar&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;max_length&quot;: 256​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>,​
        <span class="hljs-variable">$varCharField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-Number-Fields​" class="common-anchor-header">Adicionar campos numéricos</h3><p>Os tipos de números que o Milvus suporta são <code translate="no">Int8</code>, <code translate="no">Int16</code>, <code translate="no">Int32</code>, <code translate="no">Int64</code>, <code translate="no">Float</code>, e <code translate="no">Double</code>. Para mais informações sobre os campos numéricos, consulte <a href="/docs/pt/number.md">Campo numérico</a>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.<span class="hljs-title function_">add_field</span>(​
    field_name=<span class="hljs-string">&quot;my_int64&quot;</span>,​
    datatype=<span class="hljs-title class_">DataType</span>.<span class="hljs-property">INT64</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_int64&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_int64&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> int64Field=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_int64&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>,​
        <span class="hljs-variable">$varCharField</span>,​
        <span class="hljs-variable">$int64Field</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-Boolean-Fields​" class="common-anchor-header">Adicionar campos booleanos</h3><p>O Milvus suporta campos booleanos. Os seguintes trechos de código demonstram como adicionar um campo booleano.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.<span class="hljs-title function_">add_field</span>(​
    field_name=<span class="hljs-string">&quot;my_bool&quot;</span>,​
    datatype=<span class="hljs-title class_">DataType</span>.<span class="hljs-property">BOOL</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_bool&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">Bool</span>)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_bool&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Boolean</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> boolField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_bool&quot;,​
    &quot;dataType&quot;: &quot;Boolean&quot;​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>,​
        <span class="hljs-variable">$varCharField</span>,​
        <span class="hljs-variable">$int64Field</span>,​
        <span class="hljs-variable">$boolField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-JSON-fields​" class="common-anchor-header">Adicionar campos JSON</h3><p>Um campo JSON armazena normalmente dados JSON semi-estruturados. Para saber mais sobre os campos JSON, consulte <a href="/docs/pt/use-json-field.md">Campo JSON</a>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.<span class="hljs-title function_">add_field</span>(​
    field_name=<span class="hljs-string">&quot;my_json&quot;</span>,​
    datatype=<span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_json&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_json&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> jsonField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_json&quot;,​
    &quot;dataType&quot;: &quot;JSON&quot;​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>,​
        <span class="hljs-variable">$varCharField</span>,​
        <span class="hljs-variable">$int64Field</span>,​
        <span class="hljs-variable">$boolField</span>,​
        <span class="hljs-variable">$jsonField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-Array-Fields​" class="common-anchor-header">Adicionar campos de matriz</h3><p>Um campo de matriz armazena uma lista de elementos. Os tipos de dados de todos os elementos num campo de matriz devem ser os mesmos. Para mais informações sobre os campos de matriz, consulte <a href="/docs/pt/array_data_field.md">Campo de matriz</a>.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">schema.<span class="hljs-title function_">add_field</span>(​
    field_name=<span class="hljs-string">&quot;my_array&quot;</span>,​
    datatype=<span class="hljs-title class_">DataType</span>.<span class="hljs-property">ARRAY</span>,​
    element_type=<span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,​
    max_capacity=<span class="hljs-number">5</span>,​
    max_length=<span class="hljs-number">512</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.<span class="hljs-title function_">addField</span>(<span class="hljs-title class_">AddFieldReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;my_array&quot;</span>)​
        .<span class="hljs-title function_">dataType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>)​
        .<span class="hljs-title function_">elementType</span>(<span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>)​
        .<span class="hljs-title function_">maxCapacity</span>(<span class="hljs-number">5</span>)​
        .<span class="hljs-title function_">maxLength</span>(<span class="hljs-number">512</span>)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_array&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>,​
    <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
    <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">5</span>,​
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> arrayField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;my_array&quot;,​
    &quot;dataType&quot;: &quot;Array&quot;,​
    &quot;elementDataType&quot;: &quot;VarChar&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;max_length&quot;: 512​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>,​
        <span class="hljs-variable">$varCharField</span>,​
        <span class="hljs-variable">$int64Field</span>,​
        <span class="hljs-variable">$boolField</span>,​
        <span class="hljs-variable">$jsonField</span>,​
        <span class="hljs-variable">$arrayField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p></p>
