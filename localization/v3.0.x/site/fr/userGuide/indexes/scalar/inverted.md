---
id: inverted.md
title: INVERSE
summary: >-
  Lorsque vous devez effectuer des requêtes de filtrage fréquentes sur vos
  données, les index INVERTS peuvent améliorer considérablement les performances
  de la requête. Au lieu de parcourir tous les documents, Milvus utilise des
  index inversés pour localiser rapidement les enregistrements exacts qui
  correspondent à vos conditions de filtrage.
---
<h1 id="INVERTED" class="common-anchor-header">INVERSE<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h1><p>Lorsque vous devez effectuer des requêtes de filtrage fréquentes sur vos données, les index <code translate="no">INVERTED</code> peuvent améliorer considérablement les performances de la requête. Au lieu de parcourir tous les documents, Milvus utilise des index inversés pour localiser rapidement les enregistrements exacts qui correspondent à vos conditions de filtrage.</p>
<h2 id="When-to-use-INVERTED-indexes" class="common-anchor-header">Quand utiliser les index INVERTS ?<button data-href="#When-to-use-INVERTED-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilisez les index INVERTS lorsque vous avez besoin de.. :</p>
<ul>
<li><p><strong>Filtrer par valeurs spécifiques</strong>: Trouver tous les enregistrements dont un champ est égal à une valeur spécifique (par exemple, <code translate="no">category == &quot;electronics&quot;</code>).</p></li>
<li><p><strong>Filtrer le contenu d'un texte</strong>: Effectuer des recherches efficaces sur les champs <code translate="no">VARCHAR</code> </p></li>
<li><p><strong>Interroger les valeurs des champs JSON</strong>: Filtre sur des clés spécifiques dans les structures JSON</p></li>
</ul>
<p><strong>Avantage en termes de performances</strong>: les index INVERTED peuvent réduire la durée des requêtes de quelques secondes à quelques millisecondes sur les grands ensembles de données en éliminant la nécessité de balayer l'ensemble de la collection.</p>
<h2 id="How-INVERTED-indexes-work" class="common-anchor-header">Fonctionnement des index INVERTED<button data-href="#How-INVERTED-indexes-work" class="anchor-icon" translate="no">
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
    </button></h2><p>Un <strong>index INVERTED</strong> dans Milvus associe chaque valeur de champ unique (terme) à l'ensemble des ID de documents où cette valeur apparaît. Cette structure permet des recherches rapides pour les champs comportant des valeurs répétées ou catégorielles.</p>
<p>Comme le montre le diagramme, le processus se déroule en deux étapes :</p>
<ol>
<li><p><strong>Mappage en amont (ID → terme) :</strong> Chaque identifiant de document pointe vers la valeur de champ qu'il contient.</p></li>
<li><p><strong>Mappage inversé (Terme → ID) :</strong> Milvus collecte des termes uniques et établit une correspondance inversée entre chaque terme et tous les ID qui le contiennent.</p></li>
</ol>
<p>Par exemple, la valeur <strong>"électronique"</strong> correspond aux ID <strong>1</strong> et <strong>3</strong>, tandis que <strong>"livres"</strong> correspond aux ID <strong>2</strong> et <strong>5</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/how-inverted-index-works.png" alt="How Inverted Index Works" class="doc-image" id="how-inverted-index-works" />
   </span> <span class="img-wrapper"> <span>Fonctionnement de l'index inversé</span> </span></p>
<p>Lorsque vous filtrez pour une valeur spécifique (par exemple, <code translate="no">category == &quot;electronics&quot;</code>), Milvus recherche simplement le terme dans l'index et récupère directement les ID correspondants. Cela évite de parcourir l'ensemble des données et permet un filtrage rapide, en particulier pour les valeurs catégorielles ou répétées.</p>
<p>Les index INVERTED prennent en charge tous les types de champs scalaires, tels que <strong>BOOL</strong>, <strong>INT8</strong>, <strong>INT16</strong>, <strong>INT32</strong>, <strong>INT64</strong>, <strong>FLOAT</strong>, <strong>DOUBLE</strong>, <strong>VARCHAR</strong>, <strong>JSON</strong> et <strong>ARRAY</strong>. Toutefois, les paramètres d'indexation d'un champ JSON sont légèrement différents de ceux des champs scalaires ordinaires.</p>
<h2 id="Create-indexes-on-non-JSON-fields" class="common-anchor-header">Création d'index sur des champs non JSON<button data-href="#Create-indexes-on-non-JSON-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour créer un index sur un champ non JSON, procédez comme suit :</p>
<ol>
<li><p>Préparez vos paramètres d'index :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Create an empty index parameter object</span>
index_params = client.prepare_index_params()
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Ajoutez l'index <code translate="no">INVERTED</code>:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,           <span class="hljs-comment"># Name of the field to index</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,          <span class="hljs-comment"># Specify INVERTED index type</span></span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>     <span class="hljs-comment"># Give your index a name</span>
)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Créez l'index :</p>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Replace with your collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Create-indexes-on-JSON-fields--Milvus-2511+" class="common-anchor-header">Créer des index sur des champs JSON<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.11+</span><button data-href="#Create-indexes-on-JSON-fields--Milvus-2511+" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez également créer des index INVERTED sur des chemins d'accès spécifiques dans les champs JSON. Pour ce faire, des paramètres supplémentaires sont nécessaires pour spécifier le chemin JSON et le type de données :</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Build index params</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,                    <span class="hljs-comment"># JSON field name</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;metadata_category_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>,    <span class="hljs-comment"># Path to the JSON key</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>              <span class="hljs-comment"># Data type to cast to during indexing</span></span>
<span class="highlighted-comment-line">    }</span>
)

<span class="hljs-comment"># Create index</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Replace with your collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Pour obtenir des informations détaillées sur l'indexation des champs JSON, y compris les chemins d'accès pris en charge, les types de données et les limitations, reportez-vous à <a href="/docs/fr/json-indexing.md">Indexation JSON</a>.</p>
<h2 id="Drop-an-index" class="common-anchor-header">Supprimer un index<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilisez la méthode <code translate="no">drop_index()</code> pour supprimer un index existant d'une collection.</p>
<div class="alert note">
<ul>
<li><p>Dans la <strong>version 2.6.3</strong> ou antérieure, vous devez libérer la collection avant de supprimer un index scalaire.</p></li>
<li><p>À partir de la <strong>version 2.6.4</strong>, vous pouvez supprimer un index scalaire directement lorsqu'il n'est plus nécessaire, sans avoir à libérer la collection au préalable.</p></li>
</ul>
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Best-practices" class="common-anchor-header">Meilleures pratiques<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>Créez des index après avoir chargé les données</strong>: Créez des index sur des collections qui contiennent déjà des données afin d'améliorer les performances.</p></li>
<li><p><strong>Utilisez des noms d'index descriptifs</strong>: Choisissez des noms qui indiquent clairement le champ et l'objectif</p></li>
<li><p><strong>Contrôler les performances des index</strong>: Vérifiez les performances des requêtes avant et après la création d'index.</p></li>
<li><p><strong>Tenez compte de vos modèles de requête</strong>: Créez des index sur les champs que vous filtrez fréquemment</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">Prochaines étapes<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
<li><p>En savoir plus sur les <a href="/docs/fr/index-explained.md">autres types d'index</a></p></li>
<li><p>Voir <a href="/docs/fr/json-indexing.md">Indexation JSON</a> pour les scénarios d'indexation JSON avancés</p></li>
</ul>
