---
id: keyword-match.md
title: Coincidencia de texto
summary: >-
  La búsqueda por coincidencia de texto en Milvus permite recuperar documentos
  de forma precisa a partir de términos específicos. Esta función se utiliza
  principalmente para realizar búsquedas filtradas que cumplan condiciones
  concretas y puede incorporar filtros escalares para refinar los resultados de
  la consulta, lo que permite realizar búsquedas por similitud entre vectores
  que cumplan criterios escalares.
---
<h1 id="Text-Match" class="common-anchor-header">Coincidencia de texto<button data-href="#Text-Match" class="anchor-icon" translate="no">
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
    </button></h1><p>La coincidencia de texto en Milvus permite la recuperación precisa de documentos basada en términos específicos. Esta función se utiliza principalmente para la búsqueda filtrada con el fin de cumplir condiciones específicas y puede incorporar el filtrado escalar para refinar los resultados de la consulta, lo que permite realizar búsquedas de similitud dentro de vectores que cumplan criterios escalares.</p>
<div class="alert note">
<p>La coincidencia de texto se centra en encontrar ocurrencias exactas de los términos de la consulta, sin puntuar la relevancia de los documentos coincidentes. Si deseas recuperar los documentos más relevantes en función del significado semántico y la importancia de los términos de la consulta, te recomendamos que utilices <a href="/docs/es/full-text-search.md">la búsqueda de texto completo</a>.</p>
</div>
<h2 id="Overview" class="common-anchor-header">Descripción general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus integra <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> para impulsar su índice invertido subyacente y la búsqueda de texto basada en términos. Milvus indexa cada entrada de texto siguiendo este procedimiento:</p>
<ol>
<li><p><a href="/docs/es/analyzer-overview.md">Analizador</a>: El analizador procesa el texto de entrada tokenizándolo en palabras individuales, o tokens, y luego aplica los filtros necesarios. Esto permite a Milvus crear un índice basado en estos tokens.</p></li>
<li><p><a href="/docs/es/index-explained.md">Indexación</a>: Tras el análisis del texto, Milvus crea un índice invertido que asocia cada token único a los documentos que lo contienen.</p></li>
</ol>
<p>Cuando un usuario realiza una búsqueda de texto, se utiliza el índice invertido para recuperar rápidamente todos los documentos que contienen los términos. Esto es mucho más rápido que examinar cada documento individualmente.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/keyword-match.png" alt="Keyword Match" class="doc-image" id="keyword-match" /> 
   <span>Búsqueda por palabras clave</span>
  
 </span></p>
<h2 id="Enable-text-match" class="common-anchor-header">Habilitar la búsqueda por texto<button data-href="#Enable-text-match" class="anchor-icon" translate="no">
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
    </button></h2><p>La búsqueda de texto funciona con el <a href="/docs/es/string.md"><code translate="no">VARCHAR</code></a> tipo de campo, que es esencialmente el tipo de datos de cadena en Milvus. Para habilitar la coincidencia de texto, establece tanto <code translate="no">enable_analyzer</code> como <code translate="no">enable_match</code> en <code translate="no">True</code> y, a continuación, configura opcionalmente un <a href="/docs/es/analyzer-overview.md">analizador</a> para el análisis de texto al definir el esquema de tu colección.</p>
<h3 id="Set-enableanalyzer-and-enablematch" class="common-anchor-header">Establece <code translate="no">enable_analyzer</code> y <code translate="no">enable_match</code><button data-href="#Set-enableanalyzer-and-enablematch" class="anchor-icon" translate="no">
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
    </button></h3><p>Para habilitar la búsqueda de texto en un campo específico de « <code translate="no">VARCHAR</code> », establece los parámetros « <code translate="no">enable_analyzer</code> » y « <code translate="no">enable_match</code> » en « <code translate="no">True</code> » al definir el esquema del campo. Esto indica a Milvus que tokenice el texto y cree un índice invertido para el campo especificado, lo que permite búsquedas de texto rápidas y eficientes.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
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
<h3 id="Optional-Configure-an-analyzer" class="common-anchor-header">Opcional: configurar un analizador<button data-href="#Optional-Configure-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>El rendimiento y la precisión de la búsqueda por palabras clave dependen del analizador seleccionado. Los distintos analizadores están adaptados a diversos idiomas y estructuras de texto, por lo que elegir el adecuado puede influir significativamente en los resultados de búsqueda para tu caso de uso específico.</p>
<p>Por defecto, Milvus utiliza el analizador « <code translate="no">standard</code> », que segmenta el texto basándose en los espacios en blanco y la puntuación, elimina los tokens de más de 40 caracteres y convierte el texto a minúsculas. No se necesitan parámetros adicionales para aplicar esta configuración predeterminada. Para obtener más información, consulta la sección <a href="/docs/es/standard-analyzer.md">«Estándar</a>».</p>
<p>En los casos en los que se requiera un analizador diferente, puede configurar uno utilizando el parámetro ` <code translate="no">analyzer_params</code> `. Por ejemplo, para aplicar el analizador ` <code translate="no">english</code> ` al procesamiento de texto en inglés:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
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
<p>Milvus también ofrece otros analizadores adaptados a diferentes idiomas y escenarios. Para obtener más detalles, consulta <a href="/docs/es/analyzer-overview.md">la Descripción general</a> de <a href="/docs/es/analyzer-overview.md">los analizadores</a>.</p>
<h2 id="Use-text-match" class="common-anchor-header">Utilizar la coincidencia de texto<button data-href="#Use-text-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez que haya habilitado la coincidencia de texto para un campo VARCHAR en el esquema de su colección, podrá realizar coincidencias de texto utilizando la expresión <code translate="no">TEXT_MATCH</code>.</p>
<h3 id="TEXTMATCH-expression-syntax" class="common-anchor-header">Sintaxis de la expresión TEXT_MATCH<button data-href="#TEXTMATCH-expression-syntax" class="anchor-icon" translate="no">
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
    </button></h3><p>La expresión « <code translate="no">TEXT_MATCH</code> » se utiliza para especificar el campo y los términos que se van a buscar. Su sintaxis es la siguiente:</p>
<pre><code translate="no" class="language-python">TEXT_MATCH(field_name, text)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code>: El nombre del campo VARCHAR en el que se va a realizar la búsqueda.</p></li>
<li><p><code translate="no">text</code>: Los términos que se van a buscar. Se pueden separar varios términos mediante espacios u otros delimitadores adecuados, en función del idioma y del analizador configurado.</p></li>
</ul>
<p>Por defecto, « <code translate="no">TEXT_MATCH</code> » utiliza la lógica de coincidencia <strong>«OR»</strong>, lo que significa que devolverá los documentos que contengan cualquiera de los términos especificados. Por ejemplo, para buscar documentos que contengan el término « <code translate="no">machine</code> » o « <code translate="no">deep</code> » en el campo « <code translate="no">text</code> », utiliza la siguiente expresión:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
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
<p>También puedes combinar varias expresiones « <code translate="no">TEXT_MATCH</code> » utilizando operadores lógicos para realizar una búsqueda <strong>«AND</strong> ».</p>
<ul>
<li><p>Para buscar documentos que contengan tanto « <code translate="no">machine</code> » como « <code translate="no">deep</code> » en el campo « <code translate="no">text</code> », utiliza la siguiente expresión:</p>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#go">Go</a>
<a href="#javascript">NodeJS</a>
<a href="#bash">cURL</a>
</div></p>
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
<li><p>Para buscar documentos que contengan tanto <code translate="no">machine</code> como <code translate="no">learning</code>, pero sin <code translate="no">deep</code> en el campo <code translate="no">text</code>, utiliza las siguientes expresiones:</p>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#go">Go</a>
<a href="#javascript">NodeJS</a>
<a href="#bash">cURL</a>
</div></p>
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
<h3 id="Search-with-text-match" class="common-anchor-header">Búsqueda por coincidencia de texto<button data-href="#Search-with-text-match" class="anchor-icon" translate="no">
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
    </button></h3><p>La coincidencia de texto se puede utilizar en combinación con la búsqueda por similitud vectorial para reducir el alcance de la búsqueda y mejorar su rendimiento. Al filtrar la colección mediante la coincidencia de texto antes de la búsqueda por similitud vectorial, se puede reducir el número de documentos que hay que buscar, lo que se traduce en tiempos de consulta más rápidos.</p>
<p>En este ejemplo, la expresión « <code translate="no">filter</code> » filtra los resultados de la búsqueda para incluir únicamente los documentos que coincidan con el término especificado « <code translate="no">keyword1</code> » o « <code translate="no">keyword2</code> ». A continuación, la búsqueda por similitud vectorial se realiza sobre este subconjunto filtrado de documentos.</p>
<div class="alert note">
<p>Puedes resaltar los términos coincidentes en los resultados de búsqueda configurando un resaltador de texto. Consulta <a href="/docs/es/text-highlighter.md">Resaltador de texto</a> para obtener más detalles.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match entities with `keyword1` or `keyword2`</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)&quot;</span>

<span class="hljs-comment"># Assuming &#x27;embeddings&#x27; is the vector field and &#x27;text&#x27; is the VARCHAR field</span>
result = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Your collection name</span>
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[query_vector], <span class="hljs-comment"># Query vector</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,</span>
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
<span class="highlighted-wrapper-line">        .filter(filter)</span>
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
<span class="highlighted-wrapper-line">    <span class="hljs-attr">filter</span>: filter,</span>
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
<h3 id="Query-with-text-match" class="common-anchor-header">Consulta con coincidencia de texto<button data-href="#Query-with-text-match" class="anchor-icon" translate="no">
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
    </button></h3><p>La coincidencia de texto también se puede utilizar para el filtrado escalar en operaciones de consulta. Al especificar una expresión de « <code translate="no">TEXT_MATCH</code> » en el parámetro « <code translate="no">expr</code> » del método « <code translate="no">query()</code> », se pueden recuperar documentos que coincidan con los términos indicados.</p>
<p>El ejemplo siguiente recupera documentos en los que el campo « <code translate="no">text</code> » contiene ambos términos: « <code translate="no">keyword1</code> » y « <code translate="no">keyword2</code> ».</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match entities with both `keyword1` and `keyword2`</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)&quot;</span>

result = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>, </span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)&quot;</span>;

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">queryResp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
<span class="highlighted-wrapper-line">        .filter(filter)</span>
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
<span class="highlighted-wrapper-line">    <span class="hljs-attr">filter</span>: filter, </span>
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
<h2 id="Considerations" class="common-anchor-header">Consideraciones<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>Al habilitar la coincidencia de términos para un campo, se crea un índice invertido, lo que consume recursos de almacenamiento. Ten en cuenta el impacto en el almacenamiento a la hora de decidir si habilitas esta función, ya que varía en función del tamaño del texto, los tokens únicos y el analizador utilizado.</p></li>
<li><p>Una vez que haya definido un analizador en su esquema, su configuración se vuelve permanente para esa colección. Si decide que otro analizador se adapta mejor a sus necesidades, puede considerar eliminar la colección existente y crear una nueva con la configuración de analizador deseada.</p></li>
<li><p>Reglas de escape en expresiones de « <code translate="no">filter</code> »:</p>
<ul>
<li><p>Los caracteres entre comillas dobles o simples dentro de las expresiones se interpretan como constantes de cadena. Si la constante de cadena incluye caracteres de escape, estos deben representarse mediante una secuencia de escape. Por ejemplo, utiliza <code translate="no">\\</code> para representar <code translate="no">\</code>, <code translate="no">\\t</code> para representar una tabulación <code translate="no">\t</code> y <code translate="no">\\n</code> para representar un salto de línea.</p></li>
<li><p>Si una constante de cadena está entre comillas simples, una comilla simple dentro de la constante debe representarse como <code translate="no">\\'</code>, mientras que una comilla doble puede representarse como <code translate="no">&quot;</code> o <code translate="no">\\&quot;</code>. Ejemplo: <code translate="no">'It\\'s milvus'</code>.</p></li>
<li><p>Si una constante de cadena está entre comillas dobles, una comilla doble dentro de la constante debe representarse como <code translate="no">\\&quot;</code>, mientras que una comilla simple puede representarse como <code translate="no">'</code> o <code translate="no">\\'</code>. Ejemplo: <code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code>.</p></li>
</ul></li>
</ul>
