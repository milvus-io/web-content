---
id: keyword-match.md
title: Correspondência de texto
summary: >-
  A correspondência de texto no Milvus permite a recuperação precisa de
  documentos com base em termos específicos. Esta funcionalidade é utilizada
  principalmente para pesquisa filtrada para satisfazer condições específicas e
  pode incorporar filtragem escalar para refinar os resultados da consulta,
  permitindo pesquisas por semelhança dentro de vectores que satisfaçam
  critérios escalares.
---
<h1 id="Text-Match" class="common-anchor-header">Correspondência de texto<button data-href="#Text-Match" class="anchor-icon" translate="no">
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
    </button></h1><p>A correspondência de texto em Milvus permite a recuperação precisa de documentos com base em termos específicos. Esta funcionalidade é utilizada principalmente para pesquisa filtrada para satisfazer condições específicas e pode incorporar filtragem escalar para refinar os resultados da consulta, permitindo pesquisas de semelhança dentro de vectores que satisfaçam critérios escalares.</p>
<div class="alert note">
<p>A correspondência de texto concentra-se em encontrar ocorrências exactas dos termos de consulta, sem pontuar a relevância dos documentos correspondentes. Se pretender obter os documentos mais relevantes com base no significado semântico e na importância dos termos de consulta, recomendamos que utilize a <a href="/docs/pt/full-text-search.md">Pesquisa de texto integral</a>.</p>
</div>
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
    </button></h2><p>O Milvus integra o <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> para alimentar o seu índice invertido subjacente e a pesquisa de texto baseada em termos. Para cada entrada de texto, Milvus indexa-o seguindo o procedimento:</p>
<ol>
<li><p><a href="/docs/pt/analyzer-overview.md">Analisador</a>: O analisador processa o texto de entrada, transformando-o em palavras individuais, ou tokens, e aplicando filtros conforme necessário. Isto permite ao Milvus construir um índice baseado nestes tokens.</p></li>
<li><p><a href="/docs/pt/index-explained.md">Indexação</a>: Após a análise do texto, o Milvus cria um índice invertido que mapeia cada token único para os documentos que o contêm.</p></li>
</ol>
<p>Quando um utilizador efectua uma correspondência de texto, o índice invertido é utilizado para recuperar rapidamente todos os documentos que contêm os termos. Isto é muito mais rápido do que analisar cada documento individualmente.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/keyword-match.png" alt="Keyword Match" class="doc-image" id="keyword-match" />
   </span> <span class="img-wrapper"> <span>Correspondência de palavras-chave</span> </span></p>
<h2 id="Enable-text-match" class="common-anchor-header">Ativar a correspondência de texto<button data-href="#Enable-text-match" class="anchor-icon" translate="no">
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
    </button></h2><p>A correspondência de texto funciona no tipo de campo <code translate="no">VARCHAR</code>, que é essencialmente o tipo de dados de cadeia em Milvus. Para ativar a correspondência de texto, defina <code translate="no">enable_analyzer</code> e <code translate="no">enable_match</code> para <code translate="no">True</code> e, em seguida, configure opcionalmente um <a href="/docs/pt/analyzer-overview.md">analisador</a> para análise de texto ao definir o esquema da coleção.</p>
<h3 id="Set-enableanalyzer-and-enablematch" class="common-anchor-header">Defina <code translate="no">enable_analyzer</code> e <code translate="no">enable_match</code></h3><p>Para ativar a correspondência de texto para um campo <code translate="no">VARCHAR</code> específico, defina os parâmetros <code translate="no">enable_analyzer</code> e <code translate="no">enable_match</code> para <code translate="no">True</code> ao definir o esquema do campo. Isto instrui o Milvus a tokenizar o texto e a criar um índice invertido para o campo especificado, permitindo correspondências de texto rápidas e eficientes.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

schema = MilvusClient.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">True</span>
)
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>, 
    datatype=DataType.VARCHAR, 
    max_length=<span class="hljs-number">1000</span>, 
    enable_analyzer=<span class="hljs-literal">True</span>, <span class="hljs-comment"># Whether to enable text analysis for this field</span>
    enable_match=<span class="hljs-literal">True</span> <span class="hljs-comment"># Whether to enable text match</span>
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embeddings&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">5</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(<span class="hljs-literal">false</span>)
        .build();
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">1000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .enableMatch(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;embeddings&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">false</span>)
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithEnableMatch(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">1000</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;embeddings&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">5</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;VarChar&quot;</span>,
    <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embeddings&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
    <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>,
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;text&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 1000,
                    &quot;enable_analyzer&quot;: true,
                    &quot;enable_match&quot;: true
                }
            },
            {
                &quot;fieldName&quot;: &quot;embeddings&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Optional-Configure-an-analyzer" class="common-anchor-header">Opcional: Configurar um analisador</h3><p>O desempenho e a precisão da correspondência de palavras-chave dependem do analisador selecionado. Diferentes analisadores são adaptados a várias línguas e estruturas de texto, pelo que a escolha do analisador correto pode ter um impacto significativo nos resultados da pesquisa para o seu caso de utilização específico.</p>
<p>Por predefinição, o Milvus utiliza o analisador <code translate="no">standard</code>, que tokeniza o texto com base em espaços em branco e pontuação, remove tokens com mais de 40 caracteres e converte o texto para minúsculas. Não são necessários parâmetros adicionais para aplicar essa configuração padrão. Para obter mais informações, consulte <a href="/docs/pt/standard-analyzer.md">Padrão</a>.</p>
<p>Nos casos em que um analisador diferente é necessário, você pode configurá-lo usando o parâmetro <code translate="no">analyzer_params</code>. Por exemplo, para aplicar o analisador <code translate="no">english</code> para processar texto em inglês:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>
}
schema.add_field(
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">200</span>,
    enable_analyzer=<span class="hljs-literal">True</span>,
    analyzer_params = analyzer_params,
    enable_match = <span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; analyzerParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
analyzerParams.put(<span class="hljs-string">&quot;type&quot;</span>, <span class="hljs-string">&quot;english&quot;</span>);
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">200</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .analyzerParams(analyzerParams)
        .enableMatch(<span class="hljs-literal">true</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">analyzerParams := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>}
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithEnableMatch(<span class="hljs-literal">true</span>).
    WithAnalyzerParams(analyzerParams).
    WithMaxLength(<span class="hljs-number">200</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-string">&quot;VarChar&quot;</span>,
    <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>,
    <span class="hljs-attr">analyzer_params</span>: { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;english&#x27;</span> },
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embeddings&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
    <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>,
  },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;text&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 200,
                    &quot;enable_analyzer&quot;: true,
                    &quot;enable_match&quot;: true,
                    &quot;analyzer_params&quot;: {&quot;type&quot;: &quot;english&quot;}
                }
            },
            {
                &quot;fieldName&quot;: &quot;embeddings&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus também fornece vários outros analisadores adequados a diferentes idiomas e cenários. Para obter mais detalhes, consulte <a href="/docs/pt/analyzer-overview.md">Visão geral do analisador</a>.</p>
<h2 id="Use-text-match" class="common-anchor-header">Usar a correspondência de texto<button data-href="#Use-text-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de ativar a correspondência de texto para um campo VARCHAR no seu esquema de coleção, pode efetuar correspondências de texto utilizando a expressão <code translate="no">TEXT_MATCH</code>.</p>
<h3 id="TEXTMATCH-expression-syntax" class="common-anchor-header">Sintaxe da expressão TEXT_MATCH</h3><p>A expressão <code translate="no">TEXT_MATCH</code> é utilizada para especificar o campo e os termos a pesquisar. A sua sintaxe é a seguinte:</p>
<pre><code translate="no" class="language-python">TEXT_MATCH(field_name, text)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code>: O nome do campo VARCHAR a ser pesquisado.</p></li>
<li><p><code translate="no">text</code>: Os termos a serem pesquisados. Vários termos podem ser separados por espaços ou outros delimitadores apropriados com base no idioma e no analisador configurado.</p></li>
</ul>
<p>Por padrão, <code translate="no">TEXT_MATCH</code> usa a lógica de correspondência <strong>OR</strong>, o que significa que ele retornará documentos que contêm qualquer um dos termos especificados. Por exemplo, para pesquisar documentos que contenham o termo <code translate="no">machine</code> ou <code translate="no">deep</code> no campo <code translate="no">text</code>, use a seguinte expressão:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> filter=<span class="hljs-string">&quot;\&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Também pode combinar várias expressões <code translate="no">TEXT_MATCH</code> utilizando operadores lógicos para efetuar a correspondência <strong>AND</strong>.</p>
<ul>
<li><p>Para pesquisar documentos que contenham <code translate="no">machine</code> e <code translate="no">deep</code> no campo <code translate="no">text</code>, use a seguinte expressão:</p>
<p><div class="multipleCode">
<a href="#python">Python</a><a href="#java">Java</a><a href="#go">Go</a><a href="#javascript">NodeJS</a><a href="#bash">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> filter=<span class="hljs-string">&quot;\&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Para pesquisar documentos que contenham <code translate="no">machine</code> e <code translate="no">learning</code>, mas sem <code translate="no">deep</code> no campo <code translate="no">text</code>, use as seguintes expressões:</p>
<p><div class="multipleCode">
<a href="#python">Python</a><a href="#java">Java</a><a href="#go">Go</a><a href="#javascript">NodeJS</a><a href="#bash">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;not TEXT_MATCH(text, &#x27;deep&#x27;) and TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;learning&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;not TEXT_MATCH(text, &#x27;deep&#x27;) and TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;learning&#x27;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;not TEXT_MATCH(text, &#x27;deep&#x27;) and TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;learning&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;not TEXT_MATCH(text, &#x27;deep&#x27;) and TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;learning&#x27;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> filter=<span class="hljs-string">&quot;\&quot;not TEXT_MATCH(text, &#x27;deep&#x27;) and TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;learning&#x27;)\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Search-with-text-match" class="common-anchor-header">Pesquisa com correspondência de texto</h3><p>A correspondência de texto pode ser usada em combinação com a pesquisa de similaridade de vetor para restringir o escopo da pesquisa e melhorar o desempenho da pesquisa. Ao filtrar a coleção utilizando a correspondência de texto antes da pesquisa de semelhança vetorial, pode reduzir o número de documentos que precisam de ser pesquisados, resultando em tempos de consulta mais rápidos.</p>
<p>Neste exemplo, a expressão <code translate="no">filter</code> filtra os resultados da pesquisa para incluir apenas documentos que correspondam ao termo especificado <code translate="no">keyword1</code> ou <code translate="no">keyword2</code>. A pesquisa de similaridade vetorial é então executada nesse subconjunto filtrado de documentos.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match entities with `keyword1` or `keyword2`</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)&quot;</span>

<span class="hljs-comment"># Assuming &#x27;embeddings&#x27; is the vector field and &#x27;text&#x27; is the VARCHAR field</span>
result = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Your collection name</span>
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[query_vector], <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    limit=<span class="hljs-number">10</span>, <span class="hljs-comment"># Max. number of results to return</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>] <span class="hljs-comment"># Fields to return</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)&quot;</span>;

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .annsField(<span class="hljs-string">&quot;embeddings&quot;</span>)
        .data(Collections.singletonList(queryVector)))
        .filter(filter)
        .topK(<span class="hljs-number">10</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)&quot;</span>

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">10</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField(<span class="hljs-string">&quot;embeddings&quot;</span>).
    WithFilter(filter).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match entities with `keyword1` or `keyword2`</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)&quot;</span>;

<span class="hljs-comment">// Assuming &#x27;embeddings&#x27; is the vector field and &#x27;text&#x27; is the VARCHAR field</span>
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>(
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// Your collection name</span>
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;embeddings&quot;</span>, <span class="hljs-comment">// Vector field name</span>
    <span class="hljs-attr">data</span>: [query_vector], <span class="hljs-comment">// Query vector</span>
    <span class="hljs-attr">filter</span>: filter,
    <span class="hljs-attr">params</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>},
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>, <span class="hljs-comment">// Max. number of results to return</span>
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>] <span class="hljs-comment">//Fields to return</span>
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> filter=<span class="hljs-string">&quot;\&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)\&quot;&quot;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;annsField&quot;: &quot;embeddings&quot;,
    &quot;data&quot;: [[0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]],
    &quot;filter&quot;: &#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$filter</span>&quot;</span><span class="hljs-string">&#x27;,
    &quot;searchParams&quot;: {
        &quot;params&quot;: {
            &quot;nprobe&quot;: 10
        }
    },
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;text&quot;,&quot;id&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Query-with-text-match" class="common-anchor-header">Consulta com correspondência de texto</h3><p>A correspondência de texto também pode ser usada para filtragem escalar em operações de consulta. Ao especificar uma expressão <code translate="no">TEXT_MATCH</code> no parâmetro <code translate="no">expr</code> do método <code translate="no">query()</code>, pode obter documentos que correspondem aos termos fornecidos.</p>
<p>O exemplo abaixo recupera documentos em que o campo <code translate="no">text</code> contém os termos <code translate="no">keyword1</code> e <code translate="no">keyword2</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match entities with both `keyword1` and `keyword2`</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)&quot;</span>

result = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>, 
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)&quot;</span>;

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">queryResp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .filter(filter)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
        .build()
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)&quot;</span>
resultSet, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithFilter(filter).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match entities with both `keyword1` and `keyword2`</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)&quot;</span>;

<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>(
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">filter</span>: filter, 
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> filter=<span class="hljs-string">&quot;\&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)\&quot;&quot;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;filter&quot;: &#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$filter</span>&quot;</span><span class="hljs-string">&#x27;,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;text&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Considerations" class="common-anchor-header">Considerações<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>A ativação da correspondência de termos para um campo aciona a criação de um índice invertido, que consome recursos de armazenamento. Considere o impacto no armazenamento ao decidir ativar esse recurso, pois ele varia de acordo com o tamanho do texto, os tokens exclusivos e o analisador usado.</p></li>
<li><p>Depois de definir um analisador no seu esquema, as suas definições tornam-se permanentes para essa coleção. Se decidir que um analisador diferente se adequa melhor às suas necessidades, pode considerar eliminar a coleção existente e criar uma nova com a configuração de analisador pretendida.</p></li>
<li><p>Regras de escape em <code translate="no">filter</code> expressões:</p>
<ul>
<li><p>Os caracteres entre aspas duplas ou aspas simples nas expressões são interpretados como constantes de cadeia de caracteres. Se a constante de cadeia de caracteres incluir caracteres de escape, os caracteres de escape devem ser representados com uma sequência de escape. Por exemplo, utilize <code translate="no">\\</code> para representar <code translate="no">\</code>, <code translate="no">\\t</code> para representar um separador <code translate="no">\t</code>, e <code translate="no">\\n</code> para representar uma nova linha.</p></li>
<li><p>Se uma constante de cadeia de caracteres estiver entre aspas simples, uma aspa simples dentro da constante deve ser representada como <code translate="no">\\'</code>, enquanto uma aspa dupla pode ser representada como <code translate="no">&quot;</code> ou <code translate="no">\\&quot;</code>. Exemplo: <code translate="no">'It\\'s milvus'</code>.</p></li>
<li><p>Se uma constante de cadeia de caracteres estiver entre aspas duplas, uma aspa dupla dentro da constante deve ser representada como <code translate="no">\\&quot;</code>, enquanto uma aspa simples pode ser representada como <code translate="no">'</code> ou <code translate="no">\\'</code>. Exemplo: <code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code>.</p></li>
</ul></li>
</ul>
