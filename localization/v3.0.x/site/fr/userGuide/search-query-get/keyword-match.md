---
id: keyword-match.md
title: Correspondance de texte
summary: >-
  La fonction de correspondance de texte de Milvus permet une recherche précise
  de documents à partir de termes spécifiques. Cette fonctionnalité est
  principalement utilisée pour effectuer des recherches filtrées répondant à des
  conditions précises et peut intégrer un filtrage scalaire afin d'affiner les
  résultats de la requête, ce qui permet d'effectuer des recherches par
  similarité parmi les vecteurs répondant à des critères scalaires.
---
<h1 id="Text-Match" class="common-anchor-header">Correspondance de texte<button data-href="#Text-Match" class="anchor-icon" translate="no">
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
    </button></h1><p>La correspondance de texte dans Milvus permet une recherche précise de documents en fonction de termes spécifiques. Cette fonctionnalité est principalement utilisée pour la recherche filtrée afin de répondre à des conditions spécifiques et peut intégrer un filtrage scalaire pour affiner les résultats de la requête, permettant ainsi des recherches par similarité au sein de vecteurs répondant à des critères scalaires.</p>
<div class="alert note">
<p>La correspondance textuelle vise à trouver les occurrences exactes des termes de la requête, sans évaluer la pertinence des documents correspondants. Si vous souhaitez récupérer les documents les plus pertinents en fonction de la signification sémantique et de l'importance des termes de la requête, nous vous recommandons d'utiliser <a href="/docs/fr/full-text-search.md">la recherche en texte intégral</a>.</p>
</div>
<h2 id="Overview" class="common-anchor-header">Présentation<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus intègre <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> pour alimenter son index inversé sous-jacent et sa recherche textuelle basée sur des termes. Pour chaque entrée de texte, Milvus l'indexe en suivant la procédure suivante :</p>
<ol>
<li><p><a href="/docs/fr/analyzer-overview.md">Analyseur</a>: l’analyseur traite le texte d’entrée en le segmentant en mots individuels, ou tokens, puis en appliquant des filtres si nécessaire. Cela permet à Milvus de construire un index basé sur ces tokens.</p></li>
<li><p><a href="/docs/fr/index-explained.md">Indexation</a>: après l’analyse du texte, Milvus crée un index inversé qui associe chaque token unique aux documents qui le contiennent.</p></li>
</ol>
<p>Lorsqu’un utilisateur effectue une recherche textuelle, l’index inversé est utilisé pour récupérer rapidement tous les documents contenant les termes recherchés. Ce processus est bien plus rapide que de parcourir chaque document individuellement.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/keyword-match.png" alt="Keyword Match" class="doc-image" id="keyword-match" /> 
   <span>Recherche par mot-clé</span>
  
 </span></p>
<h2 id="Enable-text-match" class="common-anchor-header">Activer la recherche textuelle<button data-href="#Enable-text-match" class="anchor-icon" translate="no">
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
    </button></h2><p>La recherche textuelle fonctionne sur le <a href="/docs/fr/string.md"><code translate="no">VARCHAR</code></a> type de champ, qui correspond essentiellement au type de données « chaîne de caractères » dans Milvus. Pour activer la recherche textuelle, définissez les paramètres « <code translate="no">enable_analyzer</code> » et « <code translate="no">enable_match</code> » sur « <code translate="no">True</code> », puis configurez éventuellement un <a href="/docs/fr/analyzer-overview.md">analyseur</a> pour l’analyse textuelle lors de la définition du schéma de votre collection.</p>
<h3 id="Set-enableanalyzer-and-enablematch" class="common-anchor-header">Définissez <code translate="no">enable_analyzer</code> et <code translate="no">enable_match</code><button data-href="#Set-enableanalyzer-and-enablematch" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour activer la recherche textuelle sur un champ « <code translate="no">VARCHAR</code> » spécifique, définissez les paramètres « <code translate="no">enable_analyzer</code> » et « <code translate="no">enable_match</code> » sur « <code translate="no">True</code> » lors de la définition du schéma du champ. Cela indique à Milvus de tokeniser le texte et de créer un index inversé pour le champ spécifié, ce qui permet des recherches textuelles rapides et efficaces.</p>
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
<h3 id="Optional-Configure-an-analyzer" class="common-anchor-header">Facultatif : configurer un analyseur<button data-href="#Optional-Configure-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Les performances et la précision de la recherche par mot-clé dépendent de l’analyseur sélectionné. Les différents analyseurs sont adaptés à divers langages et structures de texte ; le choix de l’analyseur approprié peut donc avoir un impact significatif sur les résultats de recherche pour votre cas d’utilisation spécifique.</p>
<p>Par défaut, Milvus utilise l’analyseur « <code translate="no">standard</code> », qui tokenise le texte en fonction des espaces et de la ponctuation, supprime les tokens de plus de 40 caractères et convertit le texte en minuscules. Aucun paramètre supplémentaire n’est nécessaire pour appliquer ce paramètre par défaut. Pour plus d’informations, consultez la section « <a href="/docs/fr/standard-analyzer.md">Standard</a> ».</p>
<p>Si un analyseur différent est nécessaire, vous pouvez en configurer un à l’aide du paramètre ` <code translate="no">analyzer_params</code> `. Par exemple, pour appliquer l’analyseur ` <code translate="no">english</code> ` au traitement d’un texte en anglais :</p>
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
<p>Milvus propose également divers autres analyseurs adaptés à différentes langues et à différents scénarios. Pour plus de détails, consultez la section <a href="/docs/fr/analyzer-overview.md">Présentation des analyseurs</a>.</p>
<h2 id="Use-text-match" class="common-anchor-header">Utilisation de la correspondance de texte<button data-href="#Use-text-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois que vous avez activé la correspondance de texte pour un champ VARCHAR dans le schéma de votre collection, vous pouvez effectuer des correspondances de texte à l’aide de l’expression <code translate="no">TEXT_MATCH</code>.</p>
<h3 id="TEXTMATCH-expression-syntax" class="common-anchor-header">Syntaxe de l'expression TEXT_MATCH<button data-href="#TEXTMATCH-expression-syntax" class="anchor-icon" translate="no">
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
    </button></h3><p>L'expression « <code translate="no">TEXT_MATCH</code> » permet de spécifier le champ et les termes à rechercher. Sa syntaxe est la suivante :</p>
<pre><code translate="no" class="language-python">TEXT_MATCH(field_name, text)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code>: Le nom du champ VARCHAR à rechercher.</p></li>
<li><p><code translate="no">text</code>: Les termes à rechercher. Plusieurs termes peuvent être séparés par des espaces ou d’autres délimiteurs appropriés en fonction de la langue et de l’analyseur configuré.</p></li>
</ul>
<p>Par défaut, l’ <code translate="no">TEXT_MATCH</code> utilise la logique de correspondance <strong>« OR »</strong>, ce qui signifie qu’elle renverra les documents contenant l’un des termes spécifiés. Par exemple, pour rechercher des documents contenant le terme « <code translate="no">machine</code> » ou « <code translate="no">deep</code> » dans le champ « <code translate="no">text</code> », utilisez l’expression suivante :</p>
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
<p>Vous pouvez également combiner plusieurs expressions « <code translate="no">TEXT_MATCH</code> » à l’aide d’opérateurs logiques pour effectuer une recherche « <strong>ET</strong> ».</p>
<ul>
<li><p>Pour rechercher des documents contenant à la fois « <code translate="no">machine</code> » et « <code translate="no">deep</code> » dans le champ « <code translate="no">text</code> », utilisez l’expression suivante :</p>
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
<li><p>Pour rechercher des documents contenant à la fois « <code translate="no">machine</code> » et « <code translate="no">learning</code> », mais sans « <code translate="no">deep</code> » dans le champ « <code translate="no">text</code> », utilisez les expressions suivantes :</p>
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
<h3 id="Search-with-text-match" class="common-anchor-header">Recherche par correspondance textuelle<button data-href="#Search-with-text-match" class="anchor-icon" translate="no">
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
    </button></h3><p>La correspondance textuelle peut être utilisée en combinaison avec la recherche par similarité vectorielle pour affiner le champ de recherche et améliorer les performances de recherche. En filtrant la collection à l’aide de la correspondance textuelle avant la recherche par similarité vectorielle, vous pouvez réduire le nombre de documents à analyser, ce qui accélère le temps de traitement des requêtes.</p>
<p>Dans cet exemple, l’expression <code translate="no">filter</code> filtre les résultats de recherche pour n’inclure que les documents correspondant aux termes spécifiés <code translate="no">keyword1</code> ou <code translate="no">keyword2</code>. La recherche par similarité vectorielle est ensuite effectuée sur ce sous-ensemble filtré de documents.</p>
<div class="alert note">
<p>Vous pouvez mettre en évidence les termes correspondants dans les résultats de recherche en configurant un surligneur de texte. Consultez la section <a href="/docs/fr/text-highlighter.md">Surligneur de texte</a> pour plus de détails.</p>
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
<h3 id="Query-with-text-match" class="common-anchor-header">Requête avec correspondance de texte<button data-href="#Query-with-text-match" class="anchor-icon" translate="no">
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
    </button></h3><p>La correspondance de texte peut également être utilisée pour le filtrage scalaire dans les opérations de requête. En spécifiant une expression « <code translate="no">TEXT_MATCH</code> » dans le paramètre « <code translate="no">expr</code> » de la méthode « <code translate="no">query()</code> », vous pouvez récupérer les documents qui correspondent aux termes donnés.</p>
<p>L'exemple ci-dessous récupère les documents dont le champ « <code translate="no">text</code> » contient à la fois les termes « <code translate="no">keyword1</code> » et « <code translate="no">keyword2</code> ».</p>
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
<h2 id="Considerations" class="common-anchor-header">Considérations<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>L’activation de la correspondance de termes pour un champ déclenche la création d’un index inversé, ce qui consomme des ressources de stockage. Tenez compte de l’impact sur le stockage lorsque vous décidez d’activer cette fonctionnalité, car celui-ci varie en fonction de la taille du texte, des tokens uniques et de l’analyseur utilisé.</p></li>
<li><p>Une fois que vous avez défini un analyseur dans votre schéma, ses paramètres deviennent permanents pour cette collection. Si vous estimez qu’un autre analyseur répondrait mieux à vos besoins, vous pouvez envisager de supprimer la collection existante et d’en créer une nouvelle avec la configuration d’analyseur souhaitée.</p></li>
<li><p>Règles d'échappement dans les expressions d'<code translate="no">filter</code>:</p>
<ul>
<li><p>Les caractères placés entre guillemets doubles ou simples au sein d’expressions sont interprétés comme des constantes de chaîne. Si la constante de chaîne contient des caractères d’échappement, ceux-ci doivent être représentés à l’aide d’une séquence d’échappement. Par exemple, utilisez <code translate="no">\\</code> pour représenter <code translate="no">\</code>, <code translate="no">\\t</code> pour représenter une tabulation <code translate="no">\t</code>, et <code translate="no">\\n</code> pour représenter un saut de ligne.</p></li>
<li><p>Si une constante de chaîne est placée entre guillemets simples, un guillemet simple à l'intérieur de la constante doit être représenté par <code translate="no">\\'</code>, tandis qu'un guillemet double peut être représenté soit par <code translate="no">&quot;</code>, soit par <code translate="no">\\&quot;</code>. Exemple : <code translate="no">'It\\'s milvus'</code>.</p></li>
<li><p>Si une constante de chaîne est placée entre guillemets doubles, un guillemet double à l'intérieur de la constante doit être représenté par <code translate="no">\\&quot;</code>, tandis qu'un guillemet simple peut être représenté soit par <code translate="no">'</code>, soit par <code translate="no">\\'</code>. Exemple : <code translate="no">&quot;He said \\&quot;Hi\\&quot;&quot;</code>.</p></li>
</ul></li>
</ul>
