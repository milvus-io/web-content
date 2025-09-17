---
id: ngram.md
title: NGRAMCompatible with Milvus v2.6.2+
summary: >-
  L'index NGRAM de Milvus est conçu pour accélérer les requêtes LIKE sur les
  champs VARCHAR ou les chemins JSON spécifiques dans les champs JSON. Avant de
  construire l'index, Milvus divise le texte en courtes sous-chaînes se
  chevauchant d'une longueur fixe n, connues sous le nom de n-grammes. Par
  exemple, avec n = 3, le mot "Milvus" est divisé en 3 grammes : "Mil", "ilv",
  "lvu" et "vus". Ces n-grammes sont ensuite stockés dans un index inversé qui
  associe chaque gramme aux identifiants des documents dans lesquels il
  apparaît. Au moment de la requête, cet index permet à Milvus de restreindre
  rapidement la recherche à un petit ensemble de candidats, ce qui accélère
  considérablement l'exécution de la requête.
beta: Milvus v2.6.2+
---
<h1 id="NGRAM" class="common-anchor-header">NGRAM<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#NGRAM" class="anchor-icon" translate="no">
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
    </button></h1><p>L'index <code translate="no">NGRAM</code> de Milvus est construit pour accélérer les requêtes <code translate="no">LIKE</code> sur les champs <code translate="no">VARCHAR</code> ou les chemins JSON spécifiques dans les champs <code translate="no">JSON</code>. Avant de construire l'index, Milvus divise le texte en courtes sous-chaînes se chevauchant d'une longueur fixe <em>n</em>, connues sous le nom de <em>n-grammes</em>. Par exemple, avec <em>n = 3</em>, le mot <em>"Milvus"</em> est divisé en 3 grammes : <em>"Mil",</em> <em>"ilv",</em> <em>"lvu"</em> et <em>"vus".</em> Ces n-grammes sont ensuite stockés dans un index inversé qui associe chaque gramme aux identifiants des documents dans lesquels il apparaît. Au moment de la requête, cet index permet à Milvus de restreindre rapidement la recherche à un petit ensemble de candidats, ce qui accélère considérablement l'exécution de la requête.</p>
<p>Utilisez-le lorsque vous avez besoin d'un préfixe, d'un suffixe, d'un infixe ou d'un filtrage par caractères génériques rapide tel que :</p>
<ul>
<li><p><code translate="no">name LIKE &quot;data%&quot;</code></p></li>
<li><p><code translate="no">title LIKE &quot;%vector%&quot;</code></p></li>
<li><p><code translate="no">path LIKE &quot;%json&quot;</code></p></li>
</ul>
<div class="alert note">
<p>Pour plus de détails sur la syntaxe des expressions de filtrage, voir <a href="/docs/fr/basic-operators.md#Range-operators">Opérateurs de base</a>.</p>
</div>
<h2 id="How-it-works" class="common-anchor-header">Fonctionnement<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus met en œuvre l'index <code translate="no">NGRAM</code> dans un processus en deux phases :</p>
<ol>
<li><p><strong>Construction de l'index</strong>: Générer des n-grammes pour chaque document et construire un index inversé pendant l'ingestion.</p></li>
<li><p><strong>Accélération des requêtes</strong>: Utiliser l'index pour filtrer un petit ensemble de candidats, puis vérifier les correspondances exactes.</p></li>
</ol>
<h3 id="Phase-1-Build-the-index" class="common-anchor-header">Phase 1 : Construction de l'index<button data-href="#Phase-1-Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Pendant l'ingestion des données, Milvus construit l'index NGRAM en effectuant deux étapes principales :</p>
<ol>
<li><p><strong>Décomposition du texte en n-grammes</strong>: Milvus fait glisser une fenêtre de <em>n</em> sur chaque chaîne du champ cible et extrait les sous-chaînes qui se chevauchent, ou <em>n-grammes</em>. La longueur de ces sous-chaînes se situe dans une plage configurable, <code translate="no">[min_gram, max_gram]</code>.</p>
<ul>
<li><p><code translate="no">min_gram</code>: Le n-gramme le plus court à générer. Cela définit également la longueur minimale de la sous-chaîne de la requête qui peut bénéficier de l'index.</p></li>
<li><p><code translate="no">max_gram</code>: Le n-gramme le plus long à générer. Au moment de la requête, il est également utilisé comme taille maximale de la fenêtre lors de la division de longues chaînes de requête.</p></li>
</ul>
<p>Par exemple, avec <code translate="no">min_gram=2</code> et <code translate="no">max_gram=3</code>, la chaîne <code translate="no">&quot;AI database&quot;</code> est décomposée comme suit :</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/build-ngram-index.png" alt="Build Ngram Index" class="doc-image" id="build-ngram-index" />
   </span> <span class="img-wrapper"> <span>Construire un index de ngrammes</span> </span></p>
<pre><code translate="no">- **2-grams:** `AI`, `I_`, `_d`, `da`, `at`, ...

- **3-grams:** `AI_`, `I_d`, `_da`, `dat`, `ata`, ...

&lt;div class=&quot;alert note&quot;&gt;

- For a range `[min_gram, max_gram]`, Milvus generates all n-grams for every length between the two values (inclusive). For example, with `[2,4]` and the word `&quot;text&quot;`, Milvus generates:

- **2-grams:** `te`, `ex`, `xt`

- **3-grams:** `tex`, `ext`

- **4-grams:** `text`

- N-gram decomposition is character-based and language-agnostic. For example, in Chinese, `&quot;向量数据库&quot;` with `min_gram = 2` is decomposed into: `&quot;向量&quot;`, `&quot;量数&quot;`, `&quot;数据&quot;`, `&quot;据库&quot;`.

- Spaces and punctuation are treated as characters during decomposition.

- Decomposition preserves original case, and matching is case-sensitive. For example, `&quot;Database&quot;` and `&quot;database&quot;` will generate different n-grams and require exact case matching during queries.

&lt;/div&gt;
</code></pre>
<ol>
<li><p><strong>Construire un index inversé</strong>: Un <strong>index inversé</strong> est créé pour faire correspondre chaque n-gramme généré à une liste d'ID de documents le contenant.</p>
<p>Par exemple, si le 2-gramme <code translate="no">&quot;AI&quot;</code> apparaît dans des documents portant les ID 1, 5, 6, 8 et 9, l'index enregistre <code translate="no">{&quot;AI&quot;: [1, 5, 6, 8, 9]}</code>. Cet index est ensuite utilisé au moment de la requête pour restreindre rapidement le champ de recherche.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/build-ngram-index-2.png" alt="Build Ngram Index 2" class="doc-image" id="build-ngram-index-2" />
   </span> <span class="img-wrapper"> <span>Création de l'index de ngrammes 2</span> </span></p>
<pre><code translate="no">&lt;div class=&quot;alert note&quot;&gt;

A wider `[min_gram, max_gram]` range creates more grams and larger mapping lists. If memory is tight, consider mmap mode for very large posting lists. For details, refer to [Use mmap](https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb).

&lt;/div&gt;
</code></pre>
<h3 id="Phase-2-Accelerate-queries" class="common-anchor-header">Phase 2 : Accélérer les requêtes<button data-href="#Phase-2-Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>Lorsqu'un filtre <code translate="no">LIKE</code> est exécuté, Milvus utilise l'index NGRAM pour accélérer la requête dans les étapes suivantes :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/accelerate-queries.png" alt="Accelerate Queries" class="doc-image" id="accelerate-queries" />
   </span> <span class="img-wrapper"> <span>Accélérer les requêtes</span> </span></p>
<ol>
<li><p><strong>Extraire le terme de la requête :</strong> La sous-chaîne contiguë sans caractères génériques est extraite de l'expression <code translate="no">LIKE</code> (par exemple, <code translate="no">&quot;%database%&quot;</code> devient <code translate="no">&quot;database&quot;</code>).</p></li>
<li><p><strong>Décomposer le terme de la requête :</strong> Le terme de la requête est décomposé en <em>n-grammes</em> en fonction de sa longueur (<code translate="no">L</code>) et des paramètres <code translate="no">min_gram</code> et <code translate="no">max_gram</code>.</p>
<ul>
<li><p>Si <code translate="no">L &lt; min_gram</code>, l'index ne peut pas être utilisé et la requête revient à un balayage complet.</p></li>
<li><p>Si <code translate="no">min_gram ≤ L ≤ max_gram</code>, le terme entier de la requête est traité comme un seul n-gramme et aucune décomposition supplémentaire n'est nécessaire.</p></li>
<li><p>Si <code translate="no">L &gt; max_gram</code>, le terme de la requête est décomposé en grammes qui se chevauchent en utilisant une taille de fenêtre égale à <code translate="no">max_gram</code>.</p></li>
</ul>
<p>Par exemple, si <code translate="no">max_gram</code> est défini sur <code translate="no">3</code> et que le terme de la requête est <code translate="no">&quot;database&quot;</code>, qui a une longueur de <strong>8</strong>, il est décomposé en sous-grammes de 3 grammes comme <code translate="no">&quot;dat&quot;</code>, <code translate="no">&quot;ata&quot;</code>, <code translate="no">&quot;tab&quot;</code>, et ainsi de suite.</p></li>
<li><p><strong>Recherche de chaque gramme et intersection</strong>: Milvus recherche chacun des grammes de la requête dans l'index inversé, puis intersecte les listes d'ID de documents qui en résultent pour trouver un petit ensemble de documents candidats. Ces candidats contiennent tous les grammes de la requête.</p></li>
<li><p><strong>Vérifier et renvoyer les résultats :</strong> Le filtre original <code translate="no">LIKE</code> est ensuite appliqué comme vérification finale sur le petit ensemble de candidats pour trouver les correspondances exactes.</p></li>
</ol>
<h2 id="Create-an-NGRAM-index" class="common-anchor-header">Créer un index NGRAM<button data-href="#Create-an-NGRAM-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez créer un index NGRAM sur un champ <code translate="no">VARCHAR</code> ou sur un chemin spécifique à l'intérieur d'un champ <code translate="no">JSON</code>.</p>
<h3 id="Example-1-Create-on-a-VARCHAR-field" class="common-anchor-header">Exemple 1 : Création sur un champ VARCHAR<button data-href="#Example-1-Create-on-a-VARCHAR-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour un champ <code translate="no">VARCHAR</code>, il suffit de spécifier le champ <code translate="no">field_name</code> et de configurer <code translate="no">min_gram</code> et <code translate="no">max_gram</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Assume you have defined a VARCHAR field named &quot;text&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add NGRAM index on the &quot;text&quot; field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;text&quot;</span>,   <span class="hljs-comment"># Target VARCHAR field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;NGRAM&quot;</span>,           <span class="hljs-comment"># Index type is NGRAM</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span>,     <span class="hljs-comment"># Custom name for the index</span></span>
<span class="highlighted-comment-line">    min_gram=<span class="hljs-number">2</span>,                   <span class="hljs-comment"># Minimum substring length (e.g., 2-gram: &quot;st&quot;)</span></span>
<span class="highlighted-comment-line">    max_gram=<span class="hljs-number">3</span>                    <span class="hljs-comment"># Maximum substring length (e.g., 3-gram: &quot;sta&quot;)</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Cette configuration génère des 2-grammes et des 3-grammes pour chaque chaîne de caractères dans <code translate="no">text</code> et les stocke dans l'index inversé.</p>
<h3 id="Example-2-Create-on-a-JSON-path" class="common-anchor-header">Exemple 2 : Création sur un chemin JSON<button data-href="#Example-2-Create-on-a-JSON-path" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour un champ <code translate="no">JSON</code>, en plus des paramètres de gramme, vous devez également spécifier :</p>
<ul>
<li><p><code translate="no">params.json_path</code> - le chemin JSON qui pointe vers la valeur à indexer.</p></li>
<li><p><code translate="no">params.json_cast_type</code> - Le chemin JSON doit être <code translate="no">&quot;varchar&quot;</code> (insensible à la casse), car l'indexation NGRAM fonctionne sur des chaînes de caractères.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Assume you have defined a JSON field named &quot;json_field&quot; in your collection schema, with a JSON path named &quot;body&quot;</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add NGRAM index on a JSON field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;json_field&quot;</span>,              <span class="hljs-comment"># Target JSON field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;NGRAM&quot;</span>,                   <span class="hljs-comment"># Index type is NGRAM</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;json_ngram_index&quot;</span>,        <span class="hljs-comment"># Custom index name</span></span>
<span class="highlighted-comment-line">    min_gram=<span class="hljs-number">2</span>,                           <span class="hljs-comment"># Minimum n-gram length</span></span>
<span class="highlighted-comment-line">    max_gram=<span class="hljs-number">4</span>,                           <span class="hljs-comment"># Maximum n-gram length</span></span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;json_field[\&quot;body\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the value inside the JSON field</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>                  <span class="hljs-comment"># Required: cast the value to varchar</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans cet exemple :</p>
<ul>
<li><p>Seule la valeur à <code translate="no">json_field[&quot;body&quot;]</code> est indexée.</p></li>
<li><p>La valeur est convertie en <code translate="no">VARCHAR</code> avant la tokenisation n-gram.</p></li>
<li><p>Milvus génère des sous-chaînes de longueur 2 à 4 et les stocke dans l'index inversé.</p></li>
</ul>
<p>Pour plus d'informations sur l'indexation d'un champ JSON, voir <a href="/docs/fr/use-json-fields.md">Champ JSON</a>.</p>
<h2 id="Queries-accelerated-by-NGRAM" class="common-anchor-header">Requêtes accélérées par NGRAM<button data-href="#Queries-accelerated-by-NGRAM" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour que l'index NGRAM soit appliqué :</p>
<ul>
<li><p>La requête doit cibler un champ <code translate="no">VARCHAR</code> (ou un chemin JSON) qui possède un index <code translate="no">NGRAM</code>.</p></li>
<li><p>La partie littérale du motif <code translate="no">LIKE</code> doit comporter au moins <code translate="no">min_gram</code> caractères<em>(par exemple, si le terme le plus court de votre requête est de 2 caractères, définissez min_gram=2 lors de la création de l'index).</em></p></li>
</ul>
<p>Types de requêtes pris en charge :</p>
<ul>
<li><p><strong>Correspondance de préfixes</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Correspondance suffixe</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Correspondance infixe</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Correspondance de caractères génériques</strong></p>
<p>Milvus prend en charge les requêtes <code translate="no">%</code> (zéro ou plusieurs caractères) et <code translate="no">_</code> (un seul caractère).</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text </span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%st%um%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Requêtes de chemin JSON</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Pour plus d'informations sur la syntaxe des expressions de filtre, voir <a href="/docs/fr/basic-operators.md">Opérateurs de base</a>.</p>
<h2 id="Usage-notes" class="common-anchor-header">Notes d'utilisation<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>Types de champs</strong>: Pris en charge pour les champs <code translate="no">VARCHAR</code> et <code translate="no">JSON</code>. Pour JSON, fournir à la fois <code translate="no">params.json_path</code> et <code translate="no">params.json_cast_type=&quot;varchar&quot;</code>.</p></li>
<li><p><strong>Unicode</strong>: La décomposition du NGRAM est basée sur les caractères et indépendante de la langue, et inclut les espaces blancs et la ponctuation.</p></li>
<li><p><strong>Compromis espace-temps</strong>: des plages de grammes plus larges <code translate="no">[min_gram, max_gram]</code> produisent plus de grammes et des index plus volumineux. Si la mémoire est limitée, envisagez le mode <code translate="no">mmap</code> pour les listes d'écritures volumineuses. Pour plus d'informations, reportez-vous à la section <a href="https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb">Utiliser mmap.</a></p></li>
<li><p><strong>Immuabilité</strong>: <code translate="no">min_gram</code> et <code translate="no">max_gram</code> ne peuvent pas être modifiés sur place - il faut reconstruire l'index pour les ajuster.</p></li>
</ul>
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
<li><p><strong>Choisissez min_gram et max_gram en fonction du comportement de recherche.</strong></p>
<ul>
<li><p>Commencez par <code translate="no">min_gram=2</code>, <code translate="no">max_gram=3</code>.</p></li>
<li><p>Définissez <code translate="no">min_gram</code> comme le littéral le plus court que vous vous attendez à ce que les utilisateurs tapent.</p></li>
<li><p>Fixez <code translate="no">max_gram</code> à une longueur proche de celle des sous-chaînes significatives ; une longueur plus importante de <code translate="no">max_gram</code> améliore le filtrage mais augmente l'espace disponible.</p></li>
</ul></li>
<li><p><strong>Évitez les grammes à faible sélectivité</strong></p>
<p>Les motifs très répétitifs (par exemple, <code translate="no">&quot;aaaaaa&quot;</code>) n'offrent qu'un filtrage faible et peuvent donner des résultats limités.</p></li>
<li><p><strong>Normaliser de manière cohérente</strong></p>
<p>Appliquez la même normalisation au texte ingéré et aux littéraux de la requête (par exemple, mise en minuscules, découpage) si votre cas d'utilisation le nécessite.</p></li>
</ul>
