---
id: text.md
title: Champ de texteCompatible with Milvus 3.0.x
summary: >-
  TEXT est un type de champ scalaire permettant de stocker du texte de document,
  des extraits et d'autres contenus textuels longs dans Milvus.
beta: Milvus 3.0.x
---
<h1 id="Text-Field" class="common-anchor-header">Champ de texte<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Text-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>Dans les applications de recherche basées sur l’IA, la recherche vectorielle permet de trouver des entités sémantiquement similaires, mais l’application a souvent également besoin du texte source d’origine correspondant à chaque résultat. Un modèle de langage (LLM) ou un agent peut utiliser ce texte comme contexte pour lire, citer, résumer ou inclure le résultat dans une invite.</p>
<p>Milvus fournit le type de champ scalaire « <code translate="no">TEXT</code> » pour stocker directement de longs textes sources avec les entités. Les valeurs typiques comprennent des passages, des documents longs, le corps d’articles, des tickets et des journaux. Contrairement à « <code translate="no">VARCHAR</code> », qui nécessite une longueur maximale fixe ( <code translate="no">max_length</code>), « <code translate="no">TEXT</code> » ne vous oblige pas à définir une longueur maximale en octets dans le schéma de la collection.</p>
<p>Pour définir un champ de type « <code translate="no">TEXT</code> », définissez ` <code translate="no">datatype</code> ` sur ` <code translate="no">DataType.TEXT</code>`.</p>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;content&quot;</span>,
<span class="highlighted-wrapper-line">    datatype=DataType.TEXT,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Une fois le champ défini, chaque entité peut inclure une valeur de type chaîne dans ce champ. Vous insérez les valeurs de type « <code translate="no">TEXT</code> » comme pour les autres champs scalaires et vous les récupérez dans les résultats de requêtes ou de recherches en listant le champ dans « <code translate="no">output_fields</code> ».</p>
<div class="alert note">
<p><code translate="no">TEXT</code> Les champs prennent en charge les valeurs nulles. Pour activer cette fonctionnalité, définissez <code translate="no">nullable</code> sur <code translate="no">True</code>. Pour plus de détails, reportez-vous à la section « <a href="/docs/fr/nullable-and-default.md">Champ pouvant prendre la valeur nulle</a> ».</p>
</div>
<h2 id="Limits" class="common-anchor-header">Restrictions<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li>Un champ de type « <code translate="no">TEXT</code> » ne peut pas être un champ principal. Les champs principaux prennent en charge les options « <code translate="no">INT64</code> » et « <code translate="no">VARCHAR</code> ».</li>
<li>Dans Milvus 3.0.0, les champs « <code translate="no">TEXT</code> » ne prennent pas en charge la valeur « <code translate="no">PHRASE_MATCH</code> ».</li>
<li>Dans Milvus 3.0.0, les champs « <code translate="no">TEXT</code> » ne prennent pas en charge les valeurs par défaut.</li>
<li>Dans Milvus 3.0.0, les champs de type « <code translate="no">TEXT</code> » ne sont pas pris en charge dans les collections externes.</li>
<li>Dans Milvus 3.0.0, les champs « <code translate="no">TEXT</code> » ne prennent pas en charge les index scalaires.</li>
<li><code translate="no">TEXT</code> n'est pas destiné au filtrage régulier des métadonnées. Si vous devez filtrer sur des métadonnées de type chaîne courte et que la valeur du champ respecte la limite de longueur d'<code translate="no">VARCHAR</code>, utilisez <code translate="no">VARCHAR</code>.</li>
</ul>
<h2 id="Choose-TEXT-or-VARCHAR" class="common-anchor-header">Choisissez TEXT ou VARCHAR<button data-href="#Choose-TEXT-or-VARCHAR" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">TEXT</code> et « <code translate="no">VARCHAR</code> » stockent tous deux des valeurs de chaîne de caractères, mais répondent à des besoins applicatifs différents. Utilisez « <code translate="no">VARCHAR</code> » pour des métadonnées courtes et délimitées qui identifient, classent ou filtrent des entités. Utilisez « <code translate="no">TEXT</code> » pour du contenu source plus long qui fournit à un LLM ou à un agent suffisamment de contexte pour lire, citer, résumer ou construire une invite.</p>
<table>
<thead>
<tr><th>Aspect</th><th><code translate="no">VARCHAR</code></th><th><code translate="no">TEXT</code></th></tr>
</thead>
<tbody>
<tr><td>Idéal pour</td><td>Métadonnées courtes utilisées pour identifier, catégoriser ou filtrer des entités, telles que <code translate="no">title</code>, <code translate="no">tag</code>, <code translate="no">category</code> ou <code translate="no">external_id</code>.</td><td>Contenu source plus long utilisé par les LLM ou les workflows d’agents, tels que <code translate="no">content</code>, <code translate="no">passage</code>, <code translate="no">article_body</code> ou <code translate="no">log_message</code>.</td></tr>
<tr><td>Paramètre de longueur</td><td>Nécessite <code translate="no">max_length</code>, qui définit le nombre maximal d’octets que le champ peut stocker. La valeur maximale est de <code translate="no">65,535</code> octets. Si une valeur est susceptible de dépasser cette limite, utilisez <code translate="no">TEXT</code>.</td><td>Ne nécessite pas de paramètre « <code translate="no">max_length</code> » ; le schéma n’a donc pas besoin d’une limite d’octets fixe pour la valeur textuelle.</td></tr>
<tr><td>Comportement de stockage</td><td>Chaque valeur est stockée dans la limite de taille configurée pour le champ ( <code translate="no">max_length</code>).</td><td>Utilise la sélection automatique du stockage pour les valeurs de texte plus volumineuses. Pour plus de détails, consultez la section « <a href="#how-milvus-stores-large-text-values">Comment Milvus stocke les valeurs TEXT volumineuses</a> ».</td></tr>
<tr><td>Prise en charge en tant que champ principal</td><td>Peut être utilisé comme champ principal.</td><td>Ne peut pas être utilisé comme champ principal.</td></tr>
<tr><td>Filtrage</td><td>À utiliser pour les métadonnées sous forme de chaînes courtes devant apparaître dans des expressions de filtrage, telles que « <code translate="no">category == &quot;news&quot;</code> » ou « <code translate="no">tag in [&quot;ai&quot;, &quot;database&quot;]</code> ».</td><td>N'est pas destiné au filtrage régulier des métadonnées.</td></tr>
</tbody>
</table>
<p>Pour plus de détails sur les champs de type « <code translate="no">VARCHAR</code> », reportez-vous à la section <a href="/docs/fr/string.md">Champ VarChar</a>.</p>
<h2 id="How-Milvus-stores-large-TEXT-values" class="common-anchor-header">Comment Milvus stocke les valeurs TEXT volumineuses<button data-href="#How-Milvus-stores-large-TEXT-values" class="anchor-icon" translate="no">
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
    </button></h2><p><details></p>
<p><summary>Développez pour voir comment cela fonctionne</summary></p>
<p>Lorsque vous insérez une entité, la chaîne que vous fournissez pour un champ « <code translate="no">TEXT</code> » correspond à la valeur « <code translate="no">TEXT</code> ». Milvus compare la taille de cette valeur à <a href="/docs/fr/configure_datanode.md#dataNodetextinlineThreshold">dataNode.text.inlineThreshold</a>, qui est de <code translate="no">65,536</code> octets par défaut, puis choisit l’un des deux chemins de stockage internes.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/text-large-storage-flow.png" alt="Large text storage" class="doc-image" id="large-text-storage" /> 
   <span>Stockage de texte volumineux</span>
  
 </span></p>
<ul>
<li><strong>Stockage en ligne</strong>: si la valeur de ` <code translate="no">TEXT</code> ` est inférieure à ` <code translate="no">dataNode.text.inlineThreshold</code>`, Milvus stocke la valeur textuelle d’origine directement dans les données du champ ` <code translate="no">TEXT</code> `.</li>
<li><strong>Stockage LOB</strong>: si la valeur d’un champ « <code translate="no">TEXT</code> » est supérieure ou égale à <code translate="no">dataNode.text.inlineThreshold</code>, Milvus traite cette valeur comme un objet volumineux et stocke le texte d’origine séparément dans un système de stockage d’objets, tel que MinIO. Le champ « <code translate="no">TEXT</code> » stocke une référence interne vers le texte stocké séparément. Lorsque le champ « <code translate="no">TEXT</code> » est demandé dans les résultats d’une requête ou d’une recherche, Milvus utilise cette référence pour récupérer et renvoyer le texte d’origine.</li>
</ul>
<p>Ce choix de stockage est interne. Vous insérez, interrogez et effectuez des recherches sur le champ ` <code translate="no">TEXT</code> ` de la même manière, quel que soit le chemin de stockage utilisé par Milvus. Pour ajuster le seuil ou le comportement associé en matière de stockage, de compactage et de collecte des déchets, reportez-vous aux <a href="/docs/fr/configure_datanode.md">configurations relatives à `dataNode`</a> et <a href="/docs/fr/configure_datacoord.md">à celles relatives à `dataCoord`</a>.</p>
<p>Si votre déploiement utilise un stockage objet, les valeurs « <code translate="no">TEXT</code> » volumineuses peuvent apparaître sous forme d’objets gérés par Milvus dans des chemins tels que <code translate="no">lobs/...</code>. Ces objets relèvent des détails d’implémentation et ne doivent pas être déplacés, copiés ou supprimés manuellement. Après avoir supprimé des entités, supprimé des partitions ou compacté des données, l’utilisation du stockage d’objets ne diminuera qu’une fois que le ramasse-miettes de Milvus aura supprimé les données de grands objets non référencées, une fois la période de sécurité écoulée.</p>
<p></details></p>
<p>L’une des utilisations courantes d’ <code translate="no">TEXT</code> est la recherche en texte intégral avec BM25. Dans ce modèle, le champ <code translate="no">TEXT</code> stocke le contenu source d’origine, tandis que BM25 analyse le texte et génère des vecteurs clairsemés pour classer les correspondances basées sur des mots-clés. Les résultats de recherche peuvent alors renvoyer la valeur <code translate="no">TEXT</code> correspondante comme contexte pour les workflows LLM ou d’agents. L’exemple suivant montre comment utiliser un champ « <code translate="no">TEXT</code> » comme champ d’entrée pour BM25. Pour en savoir plus sur les concepts de la recherche en texte intégral et les options de requête, consultez la section <a href="/docs/fr/full-text-search.md">Recherche en texte intégral</a>.</p>
<h2 id="Step-1-Create-a-collection-with-a-TEXT-field" class="common-anchor-header">Étape 1 : Créer une collection avec un champ TEXT<button data-href="#Step-1-Create-a-collection-with-a-TEXT-field" class="anchor-icon" translate="no">
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
    </button></h2><p>L’exemple suivant crée une collection comportant un champ « <code translate="no">TEXT</code> » pour le contenu source et un champ de vecteurs clairsemés pour les vecteurs clairsemés générés par BM25. La fonction BM25 convertit le texte tokenisé de « <code translate="no">content</code> » en vecteurs clairsemés stockés dans « <code translate="no">sparse</code> ».</p>
<p>Pour la recherche en texte intégral BM25, le champ d’entrée « <code translate="no">TEXT</code> » doit être défini sur <code translate="no">enable_analyzer=True</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
COLLECTION_NAME = <span class="hljs-string">&quot;text_bm25_collection&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
<span class="highlighted-comment-line">schema.add_field(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;content&quot;</span>,</span>
<span class="highlighted-comment-line">    datatype=DataType.TEXT,</span>
<span class="highlighted-comment-line">    enable_analyzer=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)

<span class="highlighted-comment-line">bm25_function = Function(</span>
<span class="highlighted-comment-line">    name=<span class="hljs-string">&quot;content_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">    input_field_names=[<span class="hljs-string">&quot;content&quot;</span>],</span>
<span class="highlighted-comment-line">    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>],</span>
<span class="highlighted-comment-line">    function_type=FunctionType.BM25,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line">schema.add_function(bm25_function)</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Create-a-sparse-vector-index" class="common-anchor-header">Étape 2 : Créer un index de vecteurs creux<button data-href="#Step-2-Create-a-sparse-vector-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Créez un index sur le champ de vecteurs creux généré par la fonction BM25. Le type de métrique doit être défini sur « <code translate="no">BM25</code> ».</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>,</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">)</span>

client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Insert-TEXT-data" class="common-anchor-header">Étape 3 : Insérer des données TEXT<button data-href="#Step-3-Insert-TEXT-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Insérez le texte directement dans le champ « <code translate="no">TEXT</code> ». Ne renseignez pas le champ « <code translate="no">sparse</code> ». Milvus génère les vecteurs creux en interne en appliquant la fonction BM25 à « <code translate="no">content</code> ».</p>
<pre><code translate="no" class="language-python">data = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Milvus stores vector embeddings and scalar fields in collections. It supports vector search, full text search, and metadata filtering for retrieval applications.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Long documents are often split into passages before embedding. Store each passage in a TEXT field so search results can return the source text.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Operational logs and support tickets often contain long natural-language text. TEXT fields can store these values without a fixed max_length setting.&quot;</span>,
    },
]

client.insert(collection_name=COLLECTION_NAME, data=data)
client.load_collection(collection_name=COLLECTION_NAME)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-4-Perform-BM25-full-text-search" class="common-anchor-header">Étape 4 : Effectuer une recherche en texte intégral avec BM25<button data-href="#Step-4-Perform-BM25-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilisez le texte brut de la requête comme données de recherche et effectuez la recherche sur le champ de vecteur creux. Milvus convertit le texte de la requête en vecteur creux, classe les résultats à l’aide de BM25 et renvoie le champ « <code translate="no">TEXT</code> » demandé dans « <code translate="no">output_fields</code> ».</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=COLLECTION_NAME,
<span class="highlighted-comment-line">    data=[<span class="hljs-string">&quot;how does Milvus store source text for retrieval&quot;</span>],</span>
<span class="highlighted-comment-line">    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    limit=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;content&quot;</span>],</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-5-Read-the-returned-TEXT-values" class="common-anchor-header">Étape 5 : Lire les valeurs TEXT renvoyées<button data-href="#Step-5-Read-the-returned-TEXT-values" class="anchor-icon" translate="no">
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
    </button></h2><p>Chaque résultat de recherche comprend le score BM25 et la valeur d’ <code translate="no">TEXT</code> e d’origine.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;id: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;id&#x27;</span>]}</span>, score: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;content&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>Pour plus d’informations sur les fonctions BM25, les index de vecteurs creux et la syntaxe de requête pour la recherche en texte intégral, reportez-vous à <a href="/docs/fr/full-text-search.md">la section Recherche en texte intégral</a>.</p>
