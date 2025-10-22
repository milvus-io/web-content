---
id: stl-sort.md
title: STL_SORT
summary: >-
  L'index STL_SORT est un type d'index spécifiquement conçu pour améliorer les
  performances des requêtes sur les champs numériques (INT8, INT16, etc.) ou les
  champs TIMESTAMPTZ dans Milvus en organisant les données dans un ordre trié.
---
<h1 id="STLSORT" class="common-anchor-header">STL_SORT<button data-href="#STLSORT" class="anchor-icon" translate="no">
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
    </button></h1><p>L'index <code translate="no">STL_SORT</code> est un type d'index spécialement conçu pour améliorer les performances des requêtes sur les champs numériques (INT8, INT16, etc.) ou les champs <code translate="no">TIMESTAMPTZ</code> dans Milvus en organisant les données dans un ordre trié.</p>
<p>Utilisez l'index <code translate="no">STL_SORT</code> si vous exécutez fréquemment des requêtes avec :</p>
<ul>
<li><p>Filtrage par comparaison avec les opérateurs <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, et <code translate="no">&lt;=</code> </p></li>
<li><p>Filtrage par plage avec les opérateurs <code translate="no">IN</code> et <code translate="no">LIKE</code> </p></li>
</ul>
<h2 id="Supported-data-types" class="common-anchor-header">Types de données pris en charge<button data-href="#Supported-data-types" class="anchor-icon" translate="no">
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
<li><p>Champs numériques (par exemple, <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>). Pour plus d'informations, reportez-vous à la section Champs <a href="/docs/fr/number.md">booléens et numériques</a>.</p></li>
<li><p><code translate="no">TIMESTAMPTZ</code> Champs de type TIMESTE. Pour plus d'informations, reportez-vous au <a href="/docs/fr/timestamptz-field.md">champ TIMESTAMPTZ</a>.</p></li>
</ul>
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
    </button></h2><p>Milvus met en œuvre <code translate="no">STL_SORT</code> en deux phases :</p>
<ol>
<li><p><strong>Construction de l'index</strong></p>
<ul>
<li><p>Pendant l'ingestion, Milvus collecte toutes les valeurs du champ indexé.</p></li>
<li><p>Les valeurs sont triées par ordre croissant à l'aide de la fonction <a href="https://en.cppreference.com/w/cpp/algorithm/sort.html">std::sort</a> de la STL C++.</p></li>
<li><p>Chaque valeur est associée à l'ID de l'entité et le tableau trié est conservé en tant qu'index.</p></li>
</ul></li>
<li><p><strong>Accélérer les requêtes</strong></p>
<ul>
<li><p>Au moment de la requête, Milvus utilise la <strong>recherche binaire</strong><a href="https://en.cppreference.com/w/cpp/algorithm/lower_bound.html">(std::lower_bound</a> et <a href="https://en.cppreference.com/w/cpp/algorithm/upper_bound.html">std::upper_bound</a>) sur le tableau trié.</p></li>
<li><p>Pour l'égalité, Milvus trouve rapidement toutes les valeurs correspondantes.</p></li>
<li><p>Pour les plages, Milvus localise les positions de début et de fin et renvoie toutes les valeurs intermédiaires.</p></li>
<li><p>Les identifiants des entités correspondantes sont transmis à l'exécuteur de la requête pour l'assemblage du résultat final.</p></li>
</ul></li>
</ol>
<p>Cela réduit la complexité de la requête de <strong>O(n)</strong> (balayage complet) à <strong>O(log n + m)</strong>, où <em>m</em> est le nombre de correspondances.</p>
<h2 id="Create-an-STLSORT-index" class="common-anchor-header">Créer un index STL_SORT<button data-href="#Create-an-STLSORT-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez créer un index <code translate="no">STL_SORT</code> sur un champ numérique ou <code translate="no">TIMESTAMPTZ</code>. Aucun paramètre supplémentaire n'est nécessaire.</p>
<p>L'exemple ci-dessous montre comment créer un index <code translate="no">STL_SORT</code> sur un champ <code translate="no">TIMESTAMPTZ</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Assume you have defined a TIMESTAMPTZ field named &quot;tsz&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add RTREE index on the &quot;tsz&quot; field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;tsz&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,   <span class="hljs-comment"># Index for TIMESTAMPTZ</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;tsz_index&quot;</span>,  <span class="hljs-comment"># Optional, name your index</span></span>
<span class="highlighted-comment-line">    params={}                <span class="hljs-comment"># No extra params needed</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;tsz_demo&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
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
<li><p><strong>Types de champs :</strong> Fonctionne avec les champs numériques et <code translate="no">TIMESTAMPTZ</code>. Pour plus d'informations sur les types de données, consultez les rubriques <a href="/docs/fr/number.md">Boolean &amp; Number</a> et <a href="/docs/fr/timestamptz-field.md">TIMESTAMPTZ Field</a>.</p></li>
<li><p><strong>Paramètres :</strong> Aucun paramètre d'index n'est nécessaire.</p></li>
<li><p><strong>Mmap non pris en charge :</strong> Le mode "Memory-mapped" n'est pas disponible pour <code translate="no">STL_SORT</code>.</p></li>
</ul>
