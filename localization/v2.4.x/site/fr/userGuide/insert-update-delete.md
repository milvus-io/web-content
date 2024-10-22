---
id: insert-update-delete.md
summary: >-
  Ce guide présente les opérations de manipulation des données au sein d'une
  collection, notamment l'insertion, la réinsertion et la suppression.
title: 'Insérer, réinsérer et supprimer'
---
<h1 id="Insert-Upsert--Delete" class="common-anchor-header">Insérer, réinsérer et supprimer<button data-href="#Insert-Upsert--Delete" class="anchor-icon" translate="no">
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
    </button></h1><p>Ce guide vous présente les opérations de manipulation de données au sein d'une collection, notamment l'insertion, la réinsertion et la suppression.</p>
<h2 id="Before-you-start" class="common-anchor-header">Avant de commencer<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
<li><p>Vous avez installé le SDK de votre choix. Pour installer un SDK, reportez-vous à la section <a href="https://milvus.io/docs/install-pymilvus.md">Installer les SDK</a>.</p></li>
<li><p>Vous avez créé une collection. Pour créer une collection, reportez-vous à la section <a href="/docs/fr/manage-collections.md">Gérer les collections</a>.</p></li>
<li><p>Pour insérer un grand volume de données, il est conseillé d'utiliser l'<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/DataImport/LocalBulkWriter/LocalBulkWriter.md">importation de données</a>.</p></li>
</ul>
<h2 id="Overview" class="common-anchor-header">Vue d'ensemble<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Une entité, dans le contexte des collections Milvus, est une instance singulière et identifiable au sein d'une collection. Elle représente un membre distinct d'une classe particulière, qu'il s'agisse d'un livre dans une bibliothèque, d'un gène dans un génome ou de toute autre entité identifiable.</p>
<p>Les entités d'une collection partagent un ensemble commun d'attributs, appelé schéma, qui décrit la structure à laquelle chaque entité doit adhérer, y compris les noms des champs, les types de données et toute autre contrainte.</p>
<p>Pour que l'insertion d'entités dans une collection soit réussie, il faut que les données fournies contiennent tous les champs définis par le schéma de la collection cible. En outre, vous pouvez également inclure des champs non définis par le schéma uniquement si vous avez activé le champ dynamique. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/enable-dynamic-field.md">Activer le champ dynamique</a>.</p>
<h2 id="Preparations" class="common-anchor-header">Préparations<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>L'extrait de code ci-dessous reprend le code existant pour établir une connexion à un cluster Milvus et configurer rapidement une collection.</p>
<div class="language-python">
<p>Pour les préparations, utilisez <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> pour se connecter au serveur Milvus et <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code translate="no">create_collection()</code></a> pour créer une collection en mode installation rapide.</p>
</div>
<div class="language-java">
<p>Pour les préparations, utilisez <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md"><code translate="no">MilvusClientV2</code></a> pour se connecter au serveur Milvus et <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md"><code translate="no">createCollection()</code></a> pour créer une collection en mode installation rapide.</p>
</div>
<div class="language-javascript">
<p>Pour les préparations, utilisez <a href="https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> pour se connecter au serveur Milvus et <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md"><code translate="no">createCollection()</code></a> pour créer une collection en mode installation rapide.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
)

<span class="hljs-comment"># 2. Create a collection</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    dimension=<span class="hljs-number">5</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 2. Create a collection in quick setup mode</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">quickSetupReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .dimension(<span class="hljs-number">5</span>)
    .metricType(<span class="hljs-string">&quot;IP&quot;</span>)
    .build();

client.createCollection(quickSetupReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span>, sleep } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-comment">// 1. Set up a Milvus Client</span>
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address});

<span class="hljs-comment">// 2. Create a collection in quick setup mode</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">dimension</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>
});  
<button class="copy-code-btn"></button></code></pre>
<div class="admonition note">
<p><b>notes</b></p>
<p>La collection générée dans le code ci-dessus ne contient que deux champs : <code translate="no">id</code> (en tant que clé primaire) et <code translate="no">vector</code> (en tant que champ vectoriel), les paramètres <code translate="no">auto_id</code> et <code translate="no">enable_dynamic_field</code> étant activés par défaut. Lors de l'insertion de données,</p>
<ul>
<li><p>Il n'est pas nécessaire d'inclure l'<strong>identifiant</strong> dans les données à insérer, car le champ primaire s'incrémente automatiquement au fur et à mesure que les données sont insérées.</p></li>
<li><p>Les champs non définis par un schéma seront enregistrés sous forme de paires clé-valeur dans un champ JSON réservé nommé <strong>$meta</strong>.</p></li>
</ul>
</div>
<h2 id="Insert-entities" class="common-anchor-header">Insérer des entités<button data-href="#Insert-entities" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour insérer des entités, vous devez organiser les données dans une liste de dictionnaires, où chaque dictionnaire représente une entité. Chaque dictionnaire contient les clés correspondant aux champs prédéfinis et dynamiques de la collection cible.</p>
<div class="language-python">
<p>Pour insérer des entités dans une collection, utilisez la méthode <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md"><code translate="no">insert()</code></a> pour insérer des entités dans une collection.</p>
</div>
<div class="language-java">
<p>Pour insérer des entités dans une collection, utilisez la méthode <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Vector/insert.md"><code translate="no">insert()</code></a> pour insérer des entités dans une collection.</p>
</div>
<div class="language-javascript">
<p>Pour insérer des entités dans une collection, utilisez la méthode <a href="https://milvus.io/api-reference/node/v2.4.x/Vector/insert.md"><code translate="no">insert()</code></a> pour insérer des entités dans une collection.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Insert some data</span>
data=[
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_8682&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_7025&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.43742130801983836</span>, -<span class="hljs-number">0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, <span class="hljs-number">0.7894058910881185</span>, <span class="hljs-number">0.20785793220625592</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_6781&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.3172005263489739</span>, <span class="hljs-number">0.9719044792798428</span>, -<span class="hljs-number">0.36981146090600725</span>, -<span class="hljs-number">0.4860894583077995</span>, <span class="hljs-number">0.95791889146345</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_9298&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.4452349528804562</span>, -<span class="hljs-number">0.8757026943054742</span>, <span class="hljs-number">0.8220779437047674</span>, <span class="hljs-number">0.46406290649483184</span>, <span class="hljs-number">0.30337481143159106</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_4794&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.985825131989184</span>, -<span class="hljs-number">0.8144651566660419</span>, <span class="hljs-number">0.6299267002202009</span>, <span class="hljs-number">0.1206906911183383</span>, -<span class="hljs-number">0.1446277761879955</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;yellow_4222&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.8371977790571115</span>, -<span class="hljs-number">0.015764369584852833</span>, -<span class="hljs-number">0.31062937026679327</span>, -<span class="hljs-number">0.562666951622192</span>, -<span class="hljs-number">0.8984947637863987</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_9392&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.33445148015177995</span>, -<span class="hljs-number">0.2567135004164067</span>, <span class="hljs-number">0.8987539745369246</span>, <span class="hljs-number">0.9402995886420709</span>, <span class="hljs-number">0.5378064918413052</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;grey_8510&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.39524717779832685</span>, <span class="hljs-number">0.4000257286739164</span>, -<span class="hljs-number">0.5890507376891594</span>, -<span class="hljs-number">0.8650502298996872</span>, -<span class="hljs-number">0.6140360785406336</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white_9381&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">9</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.5718280481994695</span>, <span class="hljs-number">0.24070317428066512</span>, -<span class="hljs-number">0.3737913482606834</span>, -<span class="hljs-number">0.06726932177492717</span>, -<span class="hljs-number">0.6980531615588608</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;purple_4976&quot;</span>}
]

res = client.insert(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=data
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;insert_count&quot;: 10,</span>
<span class="hljs-comment">#     &quot;ids&quot;: [</span>
<span class="hljs-comment">#         0,</span>
<span class="hljs-comment">#         1,</span>
<span class="hljs-comment">#         2,</span>
<span class="hljs-comment">#         3,</span>
<span class="hljs-comment">#         4,</span>
<span class="hljs-comment">#         5,</span>
<span class="hljs-comment">#         6,</span>
<span class="hljs-comment">#         7,</span>
<span class="hljs-comment">#         8,</span>
<span class="hljs-comment">#         9</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.<span class="hljs-property">util</span>.<span class="hljs-property">Arrays</span>;
<span class="hljs-keyword">import</span> java.<span class="hljs-property">util</span>.<span class="hljs-property">List</span>;
<span class="hljs-keyword">import</span> java.<span class="hljs-property">util</span>.<span class="hljs-property">Map</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">request</span>.<span class="hljs-property">InsertReq</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">response</span>.<span class="hljs-property">InsertResp</span>;

<span class="hljs-comment">// 3. Insert some data</span>
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>&gt; data = <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 0L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>3580376395471989f, -<span class="hljs-number">0.</span>6023495712049978f, <span class="hljs-number">0.</span>18414012509913835f, -<span class="hljs-number">0.</span>26286205330961354f, <span class="hljs-number">0.</span>9029438446296592f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;pink_8682&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 1L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>19886812562848388f, <span class="hljs-number">0.</span>06023560599112088f, <span class="hljs-number">0.</span>6976963061752597f, <span class="hljs-number">0.</span>2614474506242501f, <span class="hljs-number">0.</span>838729485096104f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;red_7025&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 2L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>43742130801983836f, -<span class="hljs-number">0.</span>5597502546264526f, <span class="hljs-number">0.</span>6457887650909682f, <span class="hljs-number">0.</span>7894058910881185f, <span class="hljs-number">0.</span>20785793220625592f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;orange_6781&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 3L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>3172005263489739f, <span class="hljs-number">0.</span>9719044792798428f, -<span class="hljs-number">0.</span>36981146090600725f, -<span class="hljs-number">0.</span>4860894583077995f, <span class="hljs-number">0.</span>95791889146345f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;pink_9298&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 4L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>4452349528804562f, -<span class="hljs-number">0.</span>8757026943054742f, <span class="hljs-number">0.</span>8220779437047674f, <span class="hljs-number">0.</span>46406290649483184f, <span class="hljs-number">0.</span>30337481143159106f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;red_4794&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 5L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>985825131989184f, -<span class="hljs-number">0.</span>8144651566660419f, <span class="hljs-number">0.</span>6299267002202009f, <span class="hljs-number">0.</span>1206906911183383f, -<span class="hljs-number">0.</span>1446277761879955f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;yellow_4222&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 6L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>8371977790571115f, -<span class="hljs-number">0.</span>015764369584852833f, -<span class="hljs-number">0.</span>31062937026679327f, -<span class="hljs-number">0.</span>562666951622192f, -<span class="hljs-number">0.</span>8984947637863987f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;red_9392&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 7L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(-<span class="hljs-number">0.</span>33445148015177995f, -<span class="hljs-number">0.</span>2567135004164067f, <span class="hljs-number">0.</span>8987539745369246f, <span class="hljs-number">0.</span>9402995886420709f, <span class="hljs-number">0.</span>5378064918413052f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;grey_8510&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 8L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>39524717779832685f, <span class="hljs-number">0.</span>4000257286739164f, -<span class="hljs-number">0.</span>5890507376891594f, -<span class="hljs-number">0.</span>8650502298996872f, -<span class="hljs-number">0.</span>6140360785406336f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;white_9381&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 9L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>5718280481994695f, <span class="hljs-number">0.</span>24070317428066512f, -<span class="hljs-number">0.</span>3737913482606834f, -<span class="hljs-number">0.</span>06726932177492717f, -<span class="hljs-number">0.</span>6980531615588608f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;purple_4976&quot;</span>))
);

<span class="hljs-title class_">InsertReq</span> insertReq = <span class="hljs-title class_">InsertReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">data</span>(data)
    .<span class="hljs-title function_">build</span>();

<span class="hljs-title class_">InsertResp</span> insertResp = client.<span class="hljs-title function_">insert</span>(insertReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(insertResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;insertCnt&quot;: 10}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3. Insert some data</span>

<span class="hljs-keyword">var</span> data = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;pink_8682&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;red_7025&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.43742130801983836</span>, -<span class="hljs-number">0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, <span class="hljs-number">0.7894058910881185</span>, <span class="hljs-number">0.20785793220625592</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;orange_6781&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.3172005263489739</span>, <span class="hljs-number">0.9719044792798428</span>, -<span class="hljs-number">0.36981146090600725</span>, -<span class="hljs-number">0.4860894583077995</span>, <span class="hljs-number">0.95791889146345</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;pink_9298&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">4</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.4452349528804562</span>, -<span class="hljs-number">0.8757026943054742</span>, <span class="hljs-number">0.8220779437047674</span>, <span class="hljs-number">0.46406290649483184</span>, <span class="hljs-number">0.30337481143159106</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;red_4794&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">5</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.985825131989184</span>, -<span class="hljs-number">0.8144651566660419</span>, <span class="hljs-number">0.6299267002202009</span>, <span class="hljs-number">0.1206906911183383</span>, -<span class="hljs-number">0.1446277761879955</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;yellow_4222&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">6</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.8371977790571115</span>, -<span class="hljs-number">0.015764369584852833</span>, -<span class="hljs-number">0.31062937026679327</span>, -<span class="hljs-number">0.562666951622192</span>, -<span class="hljs-number">0.8984947637863987</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;red_9392&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">7</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.33445148015177995</span>, -<span class="hljs-number">0.2567135004164067</span>, <span class="hljs-number">0.8987539745369246</span>, <span class="hljs-number">0.9402995886420709</span>, <span class="hljs-number">0.5378064918413052</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;grey_8510&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">8</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.39524717779832685</span>, <span class="hljs-number">0.4000257286739164</span>, -<span class="hljs-number">0.5890507376891594</span>, -<span class="hljs-number">0.8650502298996872</span>, -<span class="hljs-number">0.6140360785406336</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;white_9381&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">9</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.5718280481994695</span>, <span class="hljs-number">0.24070317428066512</span>, -<span class="hljs-number">0.3737913482606834</span>, -<span class="hljs-number">0.06726932177492717</span>, -<span class="hljs-number">0.6980531615588608</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;purple_4976&quot;</span>}        
]

<span class="hljs-keyword">var</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: data,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">insert_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 10</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-into-partitions" class="common-anchor-header">Insérer dans des partitions</h3><p>Pour insérer des données dans une partition spécifique, vous pouvez spécifier le nom de la partition dans la requête d'insertion comme suit :</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java Node</a> <a href="#javascript">.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Insert some more data into a specific partition</span>
data=[
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.5570353903748935</span>, -<span class="hljs-number">0.8997887893201304</span>, -<span class="hljs-number">0.7123782431855732</span>, -<span class="hljs-number">0.6298990746450119</span>, <span class="hljs-number">0.6699215060604258</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_1202&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">11</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.6319019033373907</span>, <span class="hljs-number">0.6821488267878275</span>, <span class="hljs-number">0.8552303045704168</span>, <span class="hljs-number">0.36929791364943054</span>, -<span class="hljs-number">0.14152860714878068</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue_4150&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">12</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.9483947484855766</span>, -<span class="hljs-number">0.32294203351925344</span>, <span class="hljs-number">0.9759290319978025</span>, <span class="hljs-number">0.8262982148666174</span>, -<span class="hljs-number">0.8351194181285713</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_4590&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">13</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.5449109892498731</span>, <span class="hljs-number">0.043511240563786524</span>, -<span class="hljs-number">0.25105249484790804</span>, -<span class="hljs-number">0.012030655265886425</span>, -<span class="hljs-number">0.0010987671273892108</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_9619&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">14</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.6603339372951424</span>, -<span class="hljs-number">0.10866551787442225</span>, -<span class="hljs-number">0.9435597754324891</span>, <span class="hljs-number">0.8230244263466688</span>, -<span class="hljs-number">0.7986720938400362</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_4863&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">15</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.8825129181091456</span>, -<span class="hljs-number">0.9204557711667729</span>, -<span class="hljs-number">0.935350065513425</span>, <span class="hljs-number">0.5484069690287079</span>, <span class="hljs-number">0.24448151140671204</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_7984&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">16</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.6285586391568163</span>, <span class="hljs-number">0.5389064528263487</span>, -<span class="hljs-number">0.3163366239905099</span>, <span class="hljs-number">0.22036279378888013</span>, <span class="hljs-number">0.15077052220816167</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue_9010&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">17</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.20151825016059233</span>, -<span class="hljs-number">0.905239387635804</span>, <span class="hljs-number">0.6749305353372479</span>, -<span class="hljs-number">0.7324272081377843</span>, -<span class="hljs-number">0.33007998971889263</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue_4521&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">18</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.2432286610792349</span>, <span class="hljs-number">0.01785636564206139</span>, -<span class="hljs-number">0.651356982731391</span>, -<span class="hljs-number">0.35848148851027895</span>, -<span class="hljs-number">0.7387383128324057</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_2529&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">19</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.055512329053363674</span>, <span class="hljs-number">0.7100266349039421</span>, <span class="hljs-number">0.4956956543575197</span>, <span class="hljs-number">0.24541352586717702</span>, <span class="hljs-number">0.4209030729923515</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_9437&quot;</span>}
]

client.create_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

res = client.insert(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=data,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;insert_count&quot;: 10,</span>
<span class="hljs-comment">#     &quot;ids&quot;: [</span>
<span class="hljs-comment">#         10,</span>
<span class="hljs-comment">#         11,</span>
<span class="hljs-comment">#         12,</span>
<span class="hljs-comment">#         13,</span>
<span class="hljs-comment">#         14,</span>
<span class="hljs-comment">#         15,</span>
<span class="hljs-comment">#         16,</span>
<span class="hljs-comment">#         17,</span>
<span class="hljs-comment">#         18,</span>
<span class="hljs-comment">#         19</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 4. Insert some more data into a specific partition</span>
data = <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 10L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(-<span class="hljs-number">0.</span>5570353903748935f, -<span class="hljs-number">0.</span>8997887893201304f, -<span class="hljs-number">0.</span>7123782431855732f, -<span class="hljs-number">0.</span>6298990746450119f, <span class="hljs-number">0.</span>6699215060604258f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;red_1202&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 11L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>6319019033373907f, <span class="hljs-number">0.</span>6821488267878275f, <span class="hljs-number">0.</span>8552303045704168f, <span class="hljs-number">0.</span>36929791364943054f, -<span class="hljs-number">0.</span>14152860714878068f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;blue_4150&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 12L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>9483947484855766f, -<span class="hljs-number">0.</span>32294203351925344f, <span class="hljs-number">0.</span>9759290319978025f, <span class="hljs-number">0.</span>8262982148666174f, -<span class="hljs-number">0.</span>8351194181285713f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;orange_4590&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 13L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(-<span class="hljs-number">0.</span>5449109892498731f, <span class="hljs-number">0.</span>043511240563786524f, -<span class="hljs-number">0.</span>25105249484790804f, -<span class="hljs-number">0.</span>012030655265886425f, -<span class="hljs-number">0.</span>0010987671273892108f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;pink_9619&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 14L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>6603339372951424f, -<span class="hljs-number">0.</span>10866551787442225f, -<span class="hljs-number">0.</span>9435597754324891f, <span class="hljs-number">0.</span>8230244263466688f, -<span class="hljs-number">0.</span>7986720938400362f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;orange_4863&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 15L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(-<span class="hljs-number">0.</span>8825129181091456f, -<span class="hljs-number">0.</span>9204557711667729f, -<span class="hljs-number">0.</span>935350065513425f, <span class="hljs-number">0.</span>5484069690287079f, <span class="hljs-number">0.</span>24448151140671204f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;orange_7984&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 16L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>6285586391568163f, <span class="hljs-number">0.</span>5389064528263487f, -<span class="hljs-number">0.</span>3163366239905099f, <span class="hljs-number">0.</span>22036279378888013f, <span class="hljs-number">0.</span>15077052220816167f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;blue_9010&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 17L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(-<span class="hljs-number">0.</span>20151825016059233f, -<span class="hljs-number">0.</span>905239387635804f, <span class="hljs-number">0.</span>6749305353372479f, -<span class="hljs-number">0.</span>7324272081377843f, -<span class="hljs-number">0.</span>33007998971889263f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;blue_4521&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 18L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>2432286610792349f, <span class="hljs-number">0.</span>01785636564206139f, -<span class="hljs-number">0.</span>651356982731391f, -<span class="hljs-number">0.</span>35848148851027895f, -<span class="hljs-number">0.</span>7387383128324057f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;orange_2529&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 19L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>055512329053363674f, <span class="hljs-number">0.</span>7100266349039421f, <span class="hljs-number">0.</span>4956956543575197f, <span class="hljs-number">0.</span>24541352586717702f, <span class="hljs-number">0.</span>4209030729923515f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;red_9437&quot;</span>))
);

<span class="hljs-title class_">CreatePartitionReq</span> createPartitionReq = <span class="hljs-title class_">CreatePartitionReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">partitionName</span>(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .<span class="hljs-title function_">build</span>();

client.<span class="hljs-title function_">createPartition</span>(createPartitionReq);

insertReq = <span class="hljs-title class_">InsertReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">data</span>(data)
    .<span class="hljs-title function_">partitionName</span>(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .<span class="hljs-title function_">build</span>();

insertResp = client.<span class="hljs-title function_">insert</span>(insertReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(insertResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;insertCnt&quot;: 10}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Insert some more data into a specific partition</span>
data = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">10</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.5570353903748935</span>, -<span class="hljs-number">0.8997887893201304</span>, -<span class="hljs-number">0.7123782431855732</span>, -<span class="hljs-number">0.6298990746450119</span>, <span class="hljs-number">0.6699215060604258</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;red_1202&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">11</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.6319019033373907</span>, <span class="hljs-number">0.6821488267878275</span>, <span class="hljs-number">0.8552303045704168</span>, <span class="hljs-number">0.36929791364943054</span>, -<span class="hljs-number">0.14152860714878068</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;blue_4150&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">12</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.9483947484855766</span>, -<span class="hljs-number">0.32294203351925344</span>, <span class="hljs-number">0.9759290319978025</span>, <span class="hljs-number">0.8262982148666174</span>, -<span class="hljs-number">0.8351194181285713</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;orange_4590&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">13</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.5449109892498731</span>, <span class="hljs-number">0.043511240563786524</span>, -<span class="hljs-number">0.25105249484790804</span>, -<span class="hljs-number">0.012030655265886425</span>, -<span class="hljs-number">0.0010987671273892108</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;pink_9619&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">14</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.6603339372951424</span>, -<span class="hljs-number">0.10866551787442225</span>, -<span class="hljs-number">0.9435597754324891</span>, <span class="hljs-number">0.8230244263466688</span>, -<span class="hljs-number">0.7986720938400362</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;orange_4863&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">15</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.8825129181091456</span>, -<span class="hljs-number">0.9204557711667729</span>, -<span class="hljs-number">0.935350065513425</span>, <span class="hljs-number">0.5484069690287079</span>, <span class="hljs-number">0.24448151140671204</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;orange_7984&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">16</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.6285586391568163</span>, <span class="hljs-number">0.5389064528263487</span>, -<span class="hljs-number">0.3163366239905099</span>, <span class="hljs-number">0.22036279378888013</span>, <span class="hljs-number">0.15077052220816167</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;blue_9010&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">17</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.20151825016059233</span>, -<span class="hljs-number">0.905239387635804</span>, <span class="hljs-number">0.6749305353372479</span>, -<span class="hljs-number">0.7324272081377843</span>, -<span class="hljs-number">0.33007998971889263</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;blue_4521&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">18</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.2432286610792349</span>, <span class="hljs-number">0.01785636564206139</span>, -<span class="hljs-number">0.651356982731391</span>, -<span class="hljs-number">0.35848148851027895</span>, -<span class="hljs-number">0.7387383128324057</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;orange_2529&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">19</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.055512329053363674</span>, <span class="hljs-number">0.7100266349039421</span>, <span class="hljs-number">0.4956956543575197</span>, <span class="hljs-number">0.24541352586717702</span>, <span class="hljs-number">0.4209030729923515</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;red_9437&quot;</span>}
]

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createPartition</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: data,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">insert_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 10</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>Le résultat est un dictionnaire contenant les statistiques sur les entités concernées. Pour plus de détails sur les opérations de partition, voir <a href="/docs/fr/manage-partitions.md">Gérer les partitions</a>.</p>
<h2 id="Upsert-entities" class="common-anchor-header">Insertion d'entités<button data-href="#Upsert-entities" class="anchor-icon" translate="no">
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
    </button></h2><p>L'insertion de données est une combinaison d'opérations de mise à jour et d'insertion. Dans Milvus, une opération d'insertion exécute une action au niveau des données pour insérer ou mettre à jour une entité en fonction de l'existence ou non de sa clé primaire dans une collection. Plus précisément :</p>
<ul>
<li><p>Si la clé primaire de l'entité existe déjà dans la collection, l'entité existante sera écrasée.</p></li>
<li><p>Si la clé primaire n'existe pas dans la collection, une nouvelle entité sera insérée.</p></li>
</ul>
<div class="alert note">
<ul>
<li>Les opérations d'insertion ne mettent pas à jour les clés primaires.</li>
<li>Si vous prévoyez d'utiliser l'opération <code translate="no">upsert</code> au lieu de <code translate="no">insert</code> pour l'ingestion de données à grande échelle (par exemple, des millions de vecteurs), sachez que cela peut entraîner une consommation de mémoire élevée sur les nœuds de données Milvus.</li>
</ul>
</div>
<div class="language-python">
<p>Pour insérer des entités, utilisez la méthode <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/upsert.md"><code translate="no">upsert()</code></a> méthode.</p>
</div>
<div class="language-java">
<p>Pour insérer des entités, utilisez la méthode <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Vector/insert.md"><code translate="no">upsert()</code></a> méthode.</p>
</div>
<div class="language-javascript">
<p>Pour insérer des entités, utilisez la méthode <a href="https://milvus.io/api-reference/node/v2.4.x/Vector/upsert.md"><code translate="no">upsert()</code></a> méthode.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 5. Upsert some data</span>
data=[
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black_9898&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.4762662251462588</span>, -<span class="hljs-number">0.6942502138717026</span>, -<span class="hljs-number">0.4490002642657902</span>, -<span class="hljs-number">0.628696575798281</span>, <span class="hljs-number">0.9660395877041965</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_7319&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.8864122635045097</span>, <span class="hljs-number">0.9260170474445351</span>, <span class="hljs-number">0.801326976181461</span>, <span class="hljs-number">0.6383943392381306</span>, <span class="hljs-number">0.7563037341572827</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white_6465&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.14594326235891586</span>, -<span class="hljs-number">0.3775407299900644</span>, -<span class="hljs-number">0.3765479013078812</span>, <span class="hljs-number">0.20612075380355122</span>, <span class="hljs-number">0.4902678929632145</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_7580&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.4548498669607359</span>, -<span class="hljs-number">0.887610217681605</span>, <span class="hljs-number">0.5655081329910452</span>, <span class="hljs-number">0.19220509387904117</span>, <span class="hljs-number">0.016513983433433577</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_3314&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.11755001847051827</span>, -<span class="hljs-number">0.7295149788999611</span>, <span class="hljs-number">0.2608115847524266</span>, -<span class="hljs-number">0.1719167007897875</span>, <span class="hljs-number">0.7417611743754855</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black_9955&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.9363032158314308</span>, <span class="hljs-number">0.030699901477745373</span>, <span class="hljs-number">0.8365910312319647</span>, <span class="hljs-number">0.7823840208444011</span>, <span class="hljs-number">0.2625222076909237</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;yellow_2461&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.0754823906014721</span>, -<span class="hljs-number">0.6390658668265143</span>, <span class="hljs-number">0.5610517334334937</span>, -<span class="hljs-number">0.8986261118798251</span>, <span class="hljs-number">0.9372056764266794</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white_5015&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.3038434006935904</span>, <span class="hljs-number">0.1279149203380523</span>, <span class="hljs-number">0.503958664270957</span>, -<span class="hljs-number">0.2622661156746988</span>, <span class="hljs-number">0.7407627307791929</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;purple_6414&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">9</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.7125086947677588</span>, -<span class="hljs-number">0.8050968321012257</span>, -<span class="hljs-number">0.32608864121785786</span>, <span class="hljs-number">0.3255654958645424</span>, <span class="hljs-number">0.26227968923834233</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;brown_7231&quot;</span>}
]

res = client.upsert(
    collection_name=<span class="hljs-string">&#x27;quick_setup&#x27;</span>,
    data=data
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;upsert_count&quot;: 10</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 5. Upsert some data</span>
data = <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 0L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(-<span class="hljs-number">0.</span>619954382375778f, <span class="hljs-number">0.</span>4479436794798608f, -<span class="hljs-number">0.</span>17493894838751745f, -<span class="hljs-number">0.</span>4248030059917294f, -<span class="hljs-number">0.</span>8648452746018911f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;black_9898&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 1L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>4762662251462588f, -<span class="hljs-number">0.</span>6942502138717026f, -<span class="hljs-number">0.</span>4490002642657902f, -<span class="hljs-number">0.</span>628696575798281f, <span class="hljs-number">0.</span>9660395877041965f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;red_7319&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 2L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(-<span class="hljs-number">0.</span>8864122635045097f, <span class="hljs-number">0.</span>9260170474445351f, <span class="hljs-number">0.</span>801326976181461f, <span class="hljs-number">0.</span>6383943392381306f, <span class="hljs-number">0.</span>7563037341572827f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;white_6465&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 3L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>14594326235891586f, -<span class="hljs-number">0.</span>3775407299900644f, -<span class="hljs-number">0.</span>3765479013078812f, <span class="hljs-number">0.</span>20612075380355122f, <span class="hljs-number">0.</span>4902678929632145f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;orange_7580&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 4L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>4548498669607359f, -<span class="hljs-number">0.</span>887610217681605f, <span class="hljs-number">0.</span>5655081329910452f, <span class="hljs-number">0.</span>19220509387904117f, <span class="hljs-number">0.</span>016513983433433577f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;red_3314&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 5L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>11755001847051827f, -<span class="hljs-number">0.</span>7295149788999611f, <span class="hljs-number">0.</span>2608115847524266f, -<span class="hljs-number">0.</span>1719167007897875f, <span class="hljs-number">0.</span>7417611743754855f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;black_9955&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 6L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>9363032158314308f, <span class="hljs-number">0.</span>030699901477745373f, <span class="hljs-number">0.</span>8365910312319647f, <span class="hljs-number">0.</span>7823840208444011f, <span class="hljs-number">0.</span>2625222076909237f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;yellow_2461&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 7L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>0754823906014721f, -<span class="hljs-number">0.</span>6390658668265143f, <span class="hljs-number">0.</span>5610517334334937f, -<span class="hljs-number">0.</span>8986261118798251f, <span class="hljs-number">0.</span>9372056764266794f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;white_5015&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 8L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(-<span class="hljs-number">0.</span>3038434006935904f, <span class="hljs-number">0.</span>1279149203380523f, <span class="hljs-number">0.</span>503958664270957f, -<span class="hljs-number">0.</span>2622661156746988f, <span class="hljs-number">0.</span>7407627307791929f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;purple_6414&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 9L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(-<span class="hljs-number">0.</span>7125086947677588f, -<span class="hljs-number">0.</span>8050968321012257f, -<span class="hljs-number">0.</span>32608864121785786f, <span class="hljs-number">0.</span>3255654958645424f, <span class="hljs-number">0.</span>26227968923834233f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;brown_7231&quot;</span>))
);

<span class="hljs-title class_">UpsertReq</span> upsertReq = <span class="hljs-title class_">UpsertReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">data</span>(data)
    .<span class="hljs-title function_">build</span>();

<span class="hljs-title class_">UpsertResp</span> upsertResp = client.<span class="hljs-title function_">upsert</span>(upsertReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(upsertResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;upsertCnt&quot;: 10}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">// <span class="hljs-number">5.</span> Upsert some data
data = [
    {<span class="hljs-built_in">id</span>: <span class="hljs-number">0</span>, vector: [-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>], color: <span class="hljs-string">&quot;black_9898&quot;</span>},
    {<span class="hljs-built_in">id</span>: <span class="hljs-number">1</span>, vector: [<span class="hljs-number">0.4762662251462588</span>, -<span class="hljs-number">0.6942502138717026</span>, -<span class="hljs-number">0.4490002642657902</span>, -<span class="hljs-number">0.628696575798281</span>, <span class="hljs-number">0.9660395877041965</span>], color: <span class="hljs-string">&quot;red_7319&quot;</span>},
    {<span class="hljs-built_in">id</span>: <span class="hljs-number">2</span>, vector: [-<span class="hljs-number">0.8864122635045097</span>, <span class="hljs-number">0.9260170474445351</span>, <span class="hljs-number">0.801326976181461</span>, <span class="hljs-number">0.6383943392381306</span>, <span class="hljs-number">0.7563037341572827</span>], color: <span class="hljs-string">&quot;white_6465&quot;</span>},
    {<span class="hljs-built_in">id</span>: <span class="hljs-number">3</span>, vector: [<span class="hljs-number">0.14594326235891586</span>, -<span class="hljs-number">0.3775407299900644</span>, -<span class="hljs-number">0.3765479013078812</span>, <span class="hljs-number">0.20612075380355122</span>, <span class="hljs-number">0.4902678929632145</span>], color: <span class="hljs-string">&quot;orange_7580&quot;</span>},
    {<span class="hljs-built_in">id</span>: <span class="hljs-number">4</span>, vector: [<span class="hljs-number">0.4548498669607359</span>, -<span class="hljs-number">0.887610217681605</span>, <span class="hljs-number">0.5655081329910452</span>, <span class="hljs-number">0.19220509387904117</span>, <span class="hljs-number">0.016513983433433577</span>], color: <span class="hljs-string">&quot;red_3314&quot;</span>},
    {<span class="hljs-built_in">id</span>: <span class="hljs-number">5</span>, vector: [<span class="hljs-number">0.11755001847051827</span>, -<span class="hljs-number">0.7295149788999611</span>, <span class="hljs-number">0.2608115847524266</span>, -<span class="hljs-number">0.1719167007897875</span>, <span class="hljs-number">0.7417611743754855</span>], color: <span class="hljs-string">&quot;black_9955&quot;</span>},
    {<span class="hljs-built_in">id</span>: <span class="hljs-number">6</span>, vector: [<span class="hljs-number">0.9363032158314308</span>, <span class="hljs-number">0.030699901477745373</span>, <span class="hljs-number">0.8365910312319647</span>, <span class="hljs-number">0.7823840208444011</span>, <span class="hljs-number">0.2625222076909237</span>], color: <span class="hljs-string">&quot;yellow_2461&quot;</span>},
    {<span class="hljs-built_in">id</span>: <span class="hljs-number">7</span>, vector: [<span class="hljs-number">0.0754823906014721</span>, -<span class="hljs-number">0.6390658668265143</span>, <span class="hljs-number">0.5610517334334937</span>, -<span class="hljs-number">0.8986261118798251</span>, <span class="hljs-number">0.9372056764266794</span>], color: <span class="hljs-string">&quot;white_5015&quot;</span>},
    {<span class="hljs-built_in">id</span>: <span class="hljs-number">8</span>, vector: [-<span class="hljs-number">0.3038434006935904</span>, <span class="hljs-number">0.1279149203380523</span>, <span class="hljs-number">0.503958664270957</span>, -<span class="hljs-number">0.2622661156746988</span>, <span class="hljs-number">0.7407627307791929</span>], color: <span class="hljs-string">&quot;purple_6414&quot;</span>},
    {<span class="hljs-built_in">id</span>: <span class="hljs-number">9</span>, vector: [-<span class="hljs-number">0.7125086947677588</span>, -<span class="hljs-number">0.8050968321012257</span>, -<span class="hljs-number">0.32608864121785786</span>, <span class="hljs-number">0.3255654958645424</span>, <span class="hljs-number">0.26227968923834233</span>], color: <span class="hljs-string">&quot;brown_7231&quot;</span>}
]

res = <span class="hljs-keyword">await</span> client.upsert({
    collection_name: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    data: data,
})

console.log(res.upsert_cnt)

// Output
// 
// <span class="hljs-number">10</span>
// 
<button class="copy-code-btn"></button></code></pre>
<h3 id="Upsert-data-in-partitions" class="common-anchor-header">Insertion de données dans des partitions</h3><p>Pour transférer des données dans une partition spécifique, vous pouvez spécifier le nom de la partition dans la requête d'insertion comme suit :</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 6. Upsert data in partitions</span>
data=[
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.06998888224297328</span>, <span class="hljs-number">0.8582816610326578</span>, -<span class="hljs-number">0.9657938677934292</span>, <span class="hljs-number">0.6527905683627726</span>, -<span class="hljs-number">0.8668460657158576</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black_3651&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">11</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.6060703043917468</span>, -<span class="hljs-number">0.3765080534566074</span>, -<span class="hljs-number">0.7710758854987239</span>, <span class="hljs-number">0.36993888322346136</span>, <span class="hljs-number">0.5507513364206531</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;grey_2049&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">12</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.9041813104515337</span>, -<span class="hljs-number">0.9610546012461163</span>, <span class="hljs-number">0.20033003106083358</span>, <span class="hljs-number">0.11842506351635174</span>, <span class="hljs-number">0.8327356724591011</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue_6168&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">13</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.3202914977909075</span>, -<span class="hljs-number">0.7279137773695252</span>, -<span class="hljs-number">0.04747830871620273</span>, <span class="hljs-number">0.8266053056909548</span>, <span class="hljs-number">0.8277957187455489</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue_1672&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">14</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.2975811497890859</span>, <span class="hljs-number">0.2946936202691086</span>, <span class="hljs-number">0.5399463833894609</span>, <span class="hljs-number">0.8385334966677529</span>, -<span class="hljs-number">0.4450543984655133</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_1601&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">15</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.04697464305600074</span>, -<span class="hljs-number">0.08509022265734134</span>, <span class="hljs-number">0.9067184632552001</span>, -<span class="hljs-number">0.2281912685064822</span>, -<span class="hljs-number">0.9747503428652762</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;yellow_9925&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">16</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.9363075919673911</span>, -<span class="hljs-number">0.8153981031085669</span>, <span class="hljs-number">0.7943039120490902</span>, -<span class="hljs-number">0.2093886809842529</span>, <span class="hljs-number">0.0771191335807897</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_9872&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">17</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.050451522820639916</span>, <span class="hljs-number">0.18931572752321935</span>, <span class="hljs-number">0.7522886192190488</span>, -<span class="hljs-number">0.9071793089474034</span>, <span class="hljs-number">0.6032647330692296</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_6450&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">18</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.9181544231141592</span>, <span class="hljs-number">0.6700755998126806</span>, -<span class="hljs-number">0.014174674636136642</span>, <span class="hljs-number">0.6325780463623432</span>, -<span class="hljs-number">0.49662222164032976</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;purple_7392&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">19</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.11426945899602536</span>, <span class="hljs-number">0.6089190684002581</span>, -<span class="hljs-number">0.5842735738352236</span>, <span class="hljs-number">0.057050610092692855</span>, -<span class="hljs-number">0.035163433018196244</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_4996&quot;</span>}
]

res = client.upsert(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=data,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;upsert_count&quot;: 10</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">request</span>.<span class="hljs-property">UpsertReq</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">response</span>.<span class="hljs-property">UpsertResp</span>;

<span class="hljs-comment">// 6. Upsert data in parition</span>

data = <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 10L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>06998888224297328f, <span class="hljs-number">0.</span>8582816610326578f, -<span class="hljs-number">0.</span>9657938677934292f, <span class="hljs-number">0.</span>6527905683627726f, -<span class="hljs-number">0.</span>8668460657158576f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;black_3651&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 11L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>6060703043917468f, -<span class="hljs-number">0.</span>3765080534566074f, -<span class="hljs-number">0.</span>7710758854987239f, <span class="hljs-number">0.</span>36993888322346136f, <span class="hljs-number">0.</span>5507513364206531f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;grey_2049&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 12L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(-<span class="hljs-number">0.</span>9041813104515337f, -<span class="hljs-number">0.</span>9610546012461163f, <span class="hljs-number">0.</span>20033003106083358f, <span class="hljs-number">0.</span>11842506351635174f, <span class="hljs-number">0.</span>8327356724591011f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;blue_6168&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 13L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>3202914977909075f, -<span class="hljs-number">0.</span>7279137773695252f, -<span class="hljs-number">0.</span>04747830871620273f, <span class="hljs-number">0.</span>8266053056909548f, <span class="hljs-number">0.</span>8277957187455489f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;blue_1672&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 14L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>2975811497890859f, <span class="hljs-number">0.</span>2946936202691086f, <span class="hljs-number">0.</span>5399463833894609f, <span class="hljs-number">0.</span>8385334966677529f, -<span class="hljs-number">0.</span>4450543984655133f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;pink_1601&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 15L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(-<span class="hljs-number">0.</span>04697464305600074f, -<span class="hljs-number">0.</span>08509022265734134f, <span class="hljs-number">0.</span>9067184632552001f, -<span class="hljs-number">0.</span>2281912685064822f, -<span class="hljs-number">0.</span>9747503428652762f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;yellow_9925&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 16L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(-<span class="hljs-number">0.</span>9363075919673911f, -<span class="hljs-number">0.</span>8153981031085669f, <span class="hljs-number">0.</span>7943039120490902f, -<span class="hljs-number">0.</span>2093886809842529f, <span class="hljs-number">0.</span>0771191335807897f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;orange_9872&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 17L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(-<span class="hljs-number">0.</span>050451522820639916f, <span class="hljs-number">0.</span>18931572752321935f, <span class="hljs-number">0.</span>7522886192190488f, -<span class="hljs-number">0.</span>9071793089474034f, <span class="hljs-number">0.</span>6032647330692296f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;red_6450&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 18L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(-<span class="hljs-number">0.</span>9181544231141592f, <span class="hljs-number">0.</span>6700755998126806f, -<span class="hljs-number">0.</span>014174674636136642f, <span class="hljs-number">0.</span>6325780463623432f, -<span class="hljs-number">0.</span>49662222164032976f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;purple_7392&quot;</span>)),
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;id&quot;</span>, 19L, <span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>11426945899602536f, <span class="hljs-number">0.</span>6089190684002581f, -<span class="hljs-number">0.</span>5842735738352236f, <span class="hljs-number">0.</span>057050610092692855f, -<span class="hljs-number">0.</span>035163433018196244f), <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;pink_4996&quot;</span>))
);

upsertReq = <span class="hljs-title class_">UpsertReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">data</span>(data)
    .<span class="hljs-title function_">partitionName</span>(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .<span class="hljs-title function_">build</span>();

upsertResp = client.<span class="hljs-title function_">upsert</span>(upsertReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(upsertResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;upsertCnt&quot;: 10}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 6. Upsert data in partitions</span>
data = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">10</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.06998888224297328</span>, <span class="hljs-number">0.8582816610326578</span>, -<span class="hljs-number">0.9657938677934292</span>, <span class="hljs-number">0.6527905683627726</span>, -<span class="hljs-number">0.8668460657158576</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;black_3651&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">11</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.6060703043917468</span>, -<span class="hljs-number">0.3765080534566074</span>, -<span class="hljs-number">0.7710758854987239</span>, <span class="hljs-number">0.36993888322346136</span>, <span class="hljs-number">0.5507513364206531</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;grey_2049&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">12</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.9041813104515337</span>, -<span class="hljs-number">0.9610546012461163</span>, <span class="hljs-number">0.20033003106083358</span>, <span class="hljs-number">0.11842506351635174</span>, <span class="hljs-number">0.8327356724591011</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;blue_6168&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">13</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.3202914977909075</span>, -<span class="hljs-number">0.7279137773695252</span>, -<span class="hljs-number">0.04747830871620273</span>, <span class="hljs-number">0.8266053056909548</span>, <span class="hljs-number">0.8277957187455489</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;blue_1672&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">14</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.2975811497890859</span>, <span class="hljs-number">0.2946936202691086</span>, <span class="hljs-number">0.5399463833894609</span>, <span class="hljs-number">0.8385334966677529</span>, -<span class="hljs-number">0.4450543984655133</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;pink_1601&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">15</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.04697464305600074</span>, -<span class="hljs-number">0.08509022265734134</span>, <span class="hljs-number">0.9067184632552001</span>, -<span class="hljs-number">0.2281912685064822</span>, -<span class="hljs-number">0.9747503428652762</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;yellow_9925&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">16</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.9363075919673911</span>, -<span class="hljs-number">0.8153981031085669</span>, <span class="hljs-number">0.7943039120490902</span>, -<span class="hljs-number">0.2093886809842529</span>, <span class="hljs-number">0.0771191335807897</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;orange_9872&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">17</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.050451522820639916</span>, <span class="hljs-number">0.18931572752321935</span>, <span class="hljs-number">0.7522886192190488</span>, -<span class="hljs-number">0.9071793089474034</span>, <span class="hljs-number">0.6032647330692296</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;red_6450&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">18</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.9181544231141592</span>, <span class="hljs-number">0.6700755998126806</span>, -<span class="hljs-number">0.014174674636136642</span>, <span class="hljs-number">0.6325780463623432</span>, -<span class="hljs-number">0.49662222164032976</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;purple_7392&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">19</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.11426945899602536</span>, <span class="hljs-number">0.6089190684002581</span>, -<span class="hljs-number">0.5842735738352236</span>, <span class="hljs-number">0.057050610092692855</span>, -<span class="hljs-number">0.035163433018196244</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;pink_4996&quot;</span>}
]

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: data,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">upsert_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 10</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>Le résultat est un dictionnaire contenant les statistiques sur les entités concernées. Pour plus d'informations sur les opérations relatives aux partitions, voir <a href="/docs/fr/manage-partitions.md">Gérer les partitions</a>.</p>
<h2 id="Delete-entities" class="common-anchor-header">Supprimer des entités<button data-href="#Delete-entities" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>Si une entité n'est plus nécessaire, vous pouvez la supprimer de la collection à l'aide de la commande <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/delete.md"><code translate="no">delete()</code></a>.</p>
</div>
<div class="language-java">
<p>Si une entité n'est plus nécessaire, vous pouvez la supprimer de la collection en utilisant la commande <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Vector/delete.md"><code translate="no">delete()</code></a>.</p>
</div>
<div class="language-javascript">
<p>Si une entité n'est plus nécessaire, vous pouvez la supprimer de la collection en utilisant la commande <a href="https://milvus.io/api-reference/node/v2.4.x/Vector/delete.md"><code translate="no">delete()</code></a>.</p>
</div>
<p>Milvus propose deux méthodes pour identifier les entités à supprimer.</p>
<ul>
<li><p><strong>Supprimer les entités par filtre.</strong></p>
   <div class='alert note'>
<p>Lorsque vous utilisez des expressions de filtre pour supprimer des entités, assurez-vous que la collection a été chargée. Dans le cas contraire, Milvus renverra une erreur.</p>
   </div>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 7. Delete entities</span>
res = client.delete(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id in [4,5,6]&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;delete_count&quot;: 3</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">request</span>.<span class="hljs-property">DeleteReq</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">response</span>.<span class="hljs-property">DeleteResp</span>;


<span class="hljs-comment">// 7. Delete entities</span>

<span class="hljs-title class_">DeleteReq</span> deleteReq = <span class="hljs-title class_">DeleteReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">filter</span>(<span class="hljs-string">&quot;id in [4, 5, 6]&quot;</span>)
    .<span class="hljs-title function_">build</span>();

<span class="hljs-title class_">DeleteResp</span> deleteResp = client.<span class="hljs-title function_">delete</span>(deleteReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(deleteResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;deleteCnt&quot;: 3}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 7. Delete entities</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">delete</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;id in [4,5,6]&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">delete_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 3</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Supprimer des entités par ID.</strong></p>
<p>Les extraits suivants montrent comment supprimer des entités par ID d'une partition spécifique. Cette méthode fonctionne également si le nom de la partition n'est pas spécifié.</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python">res = client.delete(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    ids=[<span class="hljs-number">18</span>, <span class="hljs-number">19</span>],
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;delete_count&quot;: 2</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">deleteReq = <span class="hljs-title class_">DeleteReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">ids</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(18L, 19L))
    .<span class="hljs-title function_">partitionName</span>(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .<span class="hljs-title function_">build</span>();

deleteResp = client.<span class="hljs-title function_">delete</span>(deleteReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(deleteResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;deleteCnt&quot;: 2}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">delete</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">ids</span>: [<span class="hljs-number">18</span>, <span class="hljs-number">19</span>],
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">delete_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 2</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour plus de détails sur l'utilisation des expressions de filtrage, reportez-vous à <a href="/docs/fr/get-and-scalar-query.md">Get &amp; Scalar Query</a>.</p></li>
<li><p><strong>Supprimer des entités par nom de partition</strong>.</p>
<p>Si vous souhaitez supprimer des entités d'une partition spécifique, vous pouvez spécifier le nom de la partition avec le paramètre <code translate="no">partition_name</code> dans la méthode <code translate="no">delete()</code>. L'exemple suivant supprime les entités de <code translate="no">partitionA</code> dont la couleur commence par <code translate="no">blue</code>.</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a></div></p>
<pre><code translate="no" class="language-python">res = client.delete(
collection_name=<span class="hljs-string">&#x27;quick_setup&#x27;</span>,
partition_name=<span class="hljs-string">&#x27;partitionA&#x27;</span>,
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color like &quot;blue%&quot;&#x27;</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Entities deleted from partitionA: &quot;</span>, res[<span class="hljs-string">&#x27;delete_count&#x27;</span>])

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># Entities deleted from partitionA:  3</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">deleteReq = <span class="hljs-title class_">DeleteReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">filter</span>(<span class="hljs-string">&#x27;color like &quot;blue%&quot;&#x27;</span>)
    .<span class="hljs-title function_">partitionName</span>(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .<span class="hljs-title function_">build</span>();

deleteResp = client.<span class="hljs-title function_">delete</span>(deleteReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(deleteResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;deleteCnt&quot;: 3}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">delete</span>({
<span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
<span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>,
<span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;color like &quot;blue%&quot;&#x27;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Entities deleted from partitionA: &quot;</span> + res.<span class="hljs-property">delete_cnt</span>)

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// Entities deleted from partitionA: 3</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
