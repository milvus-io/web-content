---
id: ngram.md
title: NGRAM
summary: >-
  L'index NGRAM de Milvus accélère les requêtes de type « LIKE » et les filtres
  d'expressions régulières éligibles sur les champs VARCHAR ou sur des chemins
  JSON spécifiques au sein des champs JSON. Avant de créer l'index, Milvus
  divise le texte en sous-chaînes courtes et chevauchantes d'une longueur fixe
  n, appelées « n-grammes ». Au moment de la requête, Milvus utilise ces
  n-grammes pour affiner la liste des entités candidates avant de vérifier la
  condition de filtrage d'origine.
---
<h1 id="NGRAM" class="common-anchor-header">NGRAM<button data-href="#NGRAM" class="anchor-icon" translate="no">
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
    </button></h1><p>L’index « <code translate="no">NGRAM</code> » de Milvus accélère les requêtes de type « <code translate="no">LIKE</code> » ainsi que les filtres d’expressions régulières éligibles sur les champs « <code translate="no">VARCHAR</code> » ou sur des chemins JSON spécifiques au sein des champs « <code translate="no">JSON</code> ». Avant de créer l’index, Milvus divise le texte en sous-chaînes courtes et chevauchantes d’une longueur fixe <em>n</em>, appelées <em>n-grammes</em>. Par exemple, avec <em>n = 3</em>, le mot <em>« Milvus »</em> est divisé en 3-grammes : <em>« Mil »</em>, <em>« ilv »</em>, <em>« lvu »</em> et <em>« vus ».</em> Ces n-grammes sont ensuite stockés dans un index inversé qui associe chaque gramme aux identifiants des documents dans lesquels il apparaît. Au moment de la requête, cet index permet à Milvus de restreindre rapidement la recherche à un petit ensemble de candidats avant de vérifier la condition de filtrage d’origine.</p>
<p>Utilisez-le lorsque vous avez besoin d’un filtrage rapide par préfixe, suffixe, infixe, caractère générique ou expression régulière éligible, par exemple :</p>
<ul>
<li><p><code translate="no">name LIKE &quot;data%&quot;</code></p></li>
<li><p><code translate="no">title LIKE &quot;%vector%&quot;</code></p></li>
<li><p><code translate="no">path LIKE &quot;%json&quot;</code></p></li>
<li><p><code translate="no">message =~ &quot;error.*timeout&quot;</code></p></li>
<li><p><code translate="no">url =~ &quot;/api/v[0-9]+/users&quot;</code></p></li>
</ul>
<div class="alert note">
<p>Pour plus de détails sur la syntaxe des expressions de filtrage par « <code translate="no">LIKE</code> » et par expression régulière, reportez-vous à la section <a href="/docs/fr/pattern-matching.md">«Correspondance de motifs</a>».</p>
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
    </button></h2><p>Milvus implémente l’index d’ <code translate="no">NGRAM</code> s selon un processus en deux phases :</p>
<ol>
<li><p><strong>Création de l’index</strong>: génération de n-grammes pour chaque document et création d’un index inversé lors de l’ingestion.</p></li>
<li><p><strong>Accélération des requêtes</strong>: l’index est utilisé pour filtrer les résultats et obtenir un petit ensemble de candidats, puis les correspondances exactes sont vérifiées.</p></li>
</ol>
<h3 id="Phase-1-Build-the-index" class="common-anchor-header">Phase 1 : Création de l’index<button data-href="#Phase-1-Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Lors de l’ingestion des données, Milvus construit l’index NGRAM en effectuant deux étapes principales :</p>
<ol>
<li><p><strong>Décomposition du texte en n-grammes</strong>: Milvus fait glisser une fenêtre de <em>taille n</em> sur chaque chaîne de caractères du champ cible et extrait les sous-chaînes qui se chevauchent, c'est-à-dire <em>les n-grammes</em>. La longueur de ces sous-chaînes se situe dans une plage configurable, <code translate="no">[min_gram, max_gram]</code>.</p>
<ul>
<li><p><code translate="no">min_gram</code>: Le n-gramme le plus court à générer. Ce paramètre définit également la longueur minimale de la sous-chaîne de requête pouvant bénéficier de l’index.</p></li>
<li><p><code translate="no">max_gram</code>: Le n-gramme le plus long à générer. Au moment de la requête, il sert également de taille maximale de fenêtre lors du fractionnement des longues chaînes de requête.</p></li>
</ul>
<p>Par exemple, avec <code translate="no">min_gram=2</code> et <code translate="no">max_gram=3</code>, la chaîne <code translate="no">&quot;AI database&quot;</code> est décomposée comme suit :</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index.png" alt="Build Ngram Index" class="doc-image" id="build-ngram-index" /> 
   <span>Créer un index n-gram</span>
  
 </span></p>
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
<li><p><strong>Créer un index inversé</strong>: un <strong>index inversé</strong> est créé, qui associe chaque n-gramme généré à une liste des identifiants des documents qui le contiennent.</p>
<p>Par exemple, si le 2-gramme <code translate="no">&quot;AI&quot;</code> apparaît dans les documents portant les identifiants 1, 5, 6, 8 et 9, l’index enregistre <code translate="no">{&quot;AI&quot;: [1, 5, 6, 8, 9]}</code>. Cet index est ensuite utilisé au moment de la requête pour affiner rapidement le champ de recherche.</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index-2.png" alt="Build Ngram Index 2" class="doc-image" id="build-ngram-index-2" /> 
   <span>Création de l’index de n-grammes 2</span>
  
 </span></p>
<pre><code translate="no">&lt;div class=&quot;alert note&quot;&gt;

A wider `[min_gram, max_gram]` range creates more grams and larger mapping lists. If memory is tight, consider mmap mode for very large posting lists. For details, refer to [Use mmap](https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb).

&lt;/div&gt;
</code></pre>
<h3 id="Phase-2-Accelerate-queries" class="common-anchor-header">Phase 2 : Accélération des requêtes<button data-href="#Phase-2-Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>Lorsqu’un filtre « <code translate="no">LIKE</code> » ou un filtre regex éligible est exécuté, Milvus utilise l’index NGRAM pour accélérer la requête selon les étapes suivantes :</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/accelerate-queries.png" alt="Accelerate Queries" class="doc-image" id="accelerate-queries" /> 
   <span>Accélération des requêtes</span>
  
 </span></p>
<ol>
<li><p><strong>Extraction du terme de requête :</strong> la sous-chaîne contiguë sans caractères génériques est extraite de l’expression « <code translate="no">LIKE</code> » (par exemple, « <code translate="no">&quot;%database%&quot;</code> » devient « <code translate="no">&quot;database&quot;</code> »). Pour les filtres d’expressions régulières, Milvus extrait, lorsque cela est possible, des sous-chaînes littérales fixes du motif d’expression régulière. Par exemple, « <code translate="no">message =~ &quot;error.*timeout&quot;</code> » contient les littéraux « <code translate="no">error</code> » et « <code translate="no">timeout</code> ».</p></li>
<li><p><strong>Décomposition du terme de requête :</strong> le terme de requête est décomposé en <em>n-grammes</em> en fonction de sa longueur (<code translate="no">L</code>) et des paramètres <code translate="no">min_gram</code> et <code translate="no">max_gram</code>.</p>
<ul>
<li><p>Si <code translate="no">L &lt; min_gram</code>, l’index ne peut pas être utilisé et la requête revient à un balayage complet.</p></li>
<li><p>Si <code translate="no">min_gram ≤ L ≤ max_gram</code>, le terme de requête est traité dans son intégralité comme un seul n-gramme, et aucune décomposition supplémentaire n’est nécessaire.</p></li>
<li><p>Si <code translate="no">L &gt; max_gram</code>, le terme de la requête est décomposé en n-grammes qui se chevauchent en utilisant une taille de fenêtre égale à <code translate="no">max_gram</code>.</p></li>
</ul>
<p>Par exemple, si l’ <code translate="no">max_gram</code> est défini sur <code translate="no">3</code> et que le terme de requête est <code translate="no">&quot;database&quot;</code>, d’une longueur de <strong>8</strong>, il est décomposé en sous-chaînes de 3-grammes telles que <code translate="no">&quot;dat&quot;</code>, <code translate="no">&quot;ata&quot;</code>, <code translate="no">&quot;tab&quot;</code>, etc.</p></li>
<li><p><strong>Recherche de chaque gramme et intersection</strong>: Milvus recherche chacun des grammes de la requête dans l’index inversé, puis effectue l’intersection des listes d’identifiants de documents obtenues afin de trouver un petit ensemble de documents candidats. Ces candidats contiennent tous les grammes de la requête.</p></li>
<li><p><strong>Vérification et renvoi des résultats :</strong> l’ <code translate="no">LIKE</code> e d’origine ou le filtre regex est ensuite appliqué comme vérification finale uniquement sur le petit ensemble de documents candidats afin de trouver les correspondances exactes.</p></li>
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
    </button></h2><p>Vous pouvez créer un index NGRAM sur un champ de type « <code translate="no">VARCHAR</code> » ou sur un chemin spécifique au sein d’un champ de type « <code translate="no">JSON</code> ».</p>
<h3 id="Example-1-Create-on-a-VARCHAR-field" class="common-anchor-header">Exemple 1 : création sur un champ VARCHAR<button data-href="#Example-1-Create-on-a-VARCHAR-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour un champ « <code translate="no">VARCHAR</code> », il suffit de spécifier le chemin « <code translate="no">field_name</code> » et de configurer les paramètres « <code translate="no">min_gram</code> » et « <code translate="no">max_gram</code> ».</p>
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
<p>Cette configuration génère des 2-grammes et des 3-grammes pour chaque chaîne de caractères de « <code translate="no">text</code> » et les stocke dans l’index inversé.</p>
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
    </button></h3><p>Pour un champ <code translate="no">JSON</code>, en plus des paramètres de grammes, vous devez également spécifier :</p>
<ul>
<li><p><code translate="no">params.json_path</code> – le chemin JSON qui pointe vers la valeur que vous souhaitez indexer.</p></li>
<li><p><code translate="no">params.json_cast_type</code> – qui doit être <code translate="no">&quot;varchar&quot;</code> (sans distinction de majuscules/minuscules), car l’indexation NGRAM s’applique aux chaînes de caractères.</p></li>
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
<li><p>Seule la valeur située à l’adresse <code translate="no">json_field[&quot;body&quot;]</code> est indexée.</p></li>
<li><p>La valeur est convertie en <code translate="no">VARCHAR</code> avant la tokenisation n-gram.</p></li>
<li><p>Milvus génère des sous-chaînes de longueur comprise entre 2 et 4 et les stocke dans l’index inversé.</p></li>
</ul>
<p>Pour plus d’informations sur l’indexation d’un champ JSON, consultez la section <a href="/docs/fr/json-indexing.md">Indexation JSON</a>.</p>
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
<li><p>La requête doit cibler un champ « <code translate="no">VARCHAR</code> » (ou un chemin JSON) disposant d’un index « <code translate="no">NGRAM</code> ».</p></li>
<li><p>La partie littérale du motif d'<code translate="no">LIKE</code> doit comporter au moins <code translate="no">min_gram</code> caractères.
<em>(Par exemple, si le terme de requête le plus court attendu comporte 2 caractères, définissez min_gram=2 lors de la création de l'index.)</em></p></li>
</ul>
<p>Types de requêtes pris en charge :</p>
<ul>
<li><p><strong>Correspondance par préfixe</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Correspondance de suffixe</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Correspondance d'infixe</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Correspondance avec des caractères génériques</strong></p>
<p>Milvus prend en charge à la fois les caractères génériques de type « <code translate="no">%</code> » (zéro ou plusieurs caractères) et « <code translate="no">_</code> » (exactement un caractère).</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text </span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%st%um%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Requêtes de chemin JSON</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Filtre Regex</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match log messages that contain &quot;error&quot; followed later by &quot;timeout&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Filtre d'expression régulière sur un chemin JSON</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Pour plus d’informations sur la syntaxe des expressions de filtrage, consultez la section « <a href="/docs/fr/pattern-matching.md">Correspondance de motifs</a> ».</p>
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
    </button></h2><p>Utilisez la méthode ` <code translate="no">drop_index()</code> ` pour supprimer un index existant d'une collection.</p>
<div class="alert note">
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">Remarques d'utilisation<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>Types de champs</strong>: pris en charge sur les champs de type « <code translate="no">VARCHAR</code> » et « <code translate="no">JSON</code> ». Pour le format JSON, indiquez à la fois « <code translate="no">params.json_path</code> » et « <code translate="no">params.json_cast_type=&quot;varchar&quot;</code> ».</p></li>
<li><p><strong>Accélération des expressions régulières</strong>: l'option « <code translate="no">NGRAM</code> » accélère les filtres d'expressions régulières uniquement lorsque Milvus peut extraire des sous-chaînes littérales fixes du motif d'expression régulière. Les motifs tels que « <code translate="no">[a-z]+</code> » peuvent recourir à l'analyse par balayage, car ils ne contiennent pas de littéraux fixes.</p></li>
<li><p><strong>Expressions régulières insensibles à la casse</strong>: les motifs d’expressions régulières avec <code translate="no">(?i)</code> sont pris en charge, mais ils peuvent ne pas bénéficier de l’optimisation <code translate="no">NGRAM</code> car l’index conserve la casse d’origine.</p></li>
<li><p><strong>Étape de vérification</strong>: pour les filtres d’expressions régulières, l’ <code translate="no">NGRAM</code> e génère des candidats et Milvus les vérifie à l’aide du motif d’expression régulière RE2 complet ; l’accélération de l’indexation ne modifie donc pas les résultats de la correspondance.</p></li>
<li><p><strong>Unicode</strong>: la décomposition NGRAM est basée sur les caractères et indépendante de la langue ; elle inclut les espaces et la ponctuation.</p></li>
<li><p><strong>Compromis espace-temps</strong>: les plages de grammes plus larges <code translate="no">[min_gram, max_gram]</code> produisent davantage de grammes et des index plus volumineux. Si la mémoire est limitée, envisagez le mode <code translate="no">mmap</code> pour les listes de postage volumineuses. Pour plus d’informations, consultez la section « <a href="https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb">Utilisation de mmap</a> ».</p></li>
<li><p><strong>Immuabilité</strong>: les paramètres « <code translate="no">min_gram</code> » et « <code translate="no">max_gram</code> » ne peuvent pas être modifiés directement ; vous devez reconstruire l’index pour les ajuster.</p></li>
</ul>
<h2 id="Best-practices" class="common-anchor-header">Bonnes pratiques<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>Choisissez les valeurs de `min_gram` et `max_gram` en fonction du comportement de recherche</strong></p>
<ul>
<li><p>Commencez par <code translate="no">min_gram=2</code> et <code translate="no">max_gram=3</code>.</p></li>
<li><p>Définissez ` <code translate="no">min_gram</code> ` sur le littéral le plus court que les utilisateurs sont susceptibles de saisir.</p></li>
<li><p>Définissez ` <code translate="no">max_gram</code> ` à une valeur proche de la longueur typique des sous-chaînes significatives ; une valeur plus élevée pour ` <code translate="no">max_gram</code> ` améliore le filtrage mais augmente l'espace nécessaire.</p></li>
</ul></li>
<li><p><strong>Évitez les grammes à faible sélectivité</strong></p>
<p>Les motifs très répétitifs (par exemple, <code translate="no">&quot;aaaaaa&quot;</code>) offrent un filtrage faible et peuvent n'apporter que des gains limités.</p></li>
<li><p><strong>Normalisez de manière cohérente</strong></p>
<p>Appliquez la même normalisation au texte ingéré et aux littéraux de requête (par exemple, mise en minuscules, troncature) si votre cas d’utilisation l’exige.</p></li>
</ul>
