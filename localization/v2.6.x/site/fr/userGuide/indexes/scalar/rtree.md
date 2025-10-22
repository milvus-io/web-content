---
id: rtree.md
title: RTREECompatible with Milvus 2.6.4+
summary: >-
  L'index RTREE est une structure de données arborescente qui accélère les
  requêtes sur les champs GEOMETRIE dans Milvus. Si votre collection stocke des
  objets géométriques tels que des points, des lignes ou des polygones au format
  Well-known text (WKT) et que vous souhaitez accélérer le filtrage spatial,
  RTREE est un choix idéal.
beta: Milvus 2.6.4+
---
<h1 id="RTREE" class="common-anchor-header">RTREE<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#RTREE" class="anchor-icon" translate="no">
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
    </button></h1><p>L'index <code translate="no">RTREE</code> est une structure de données arborescente qui accélère les requêtes sur les champs <code translate="no">GEOMETRY</code> dans Milvus. Si votre collection stocke des objets géométriques tels que des points, des lignes ou des polygones au format <a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry">Well-known text (WKT)</a> et que vous souhaitez accélérer le filtrage spatial, <code translate="no">RTREE</code> est un choix idéal.</p>
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
    </button></h2><p>Milvus utilise un index <code translate="no">RTREE</code> pour organiser et filtrer efficacement les données géométriques, en suivant un processus en deux phases :</p>
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
    </button></h3><ol>
<li><p><strong>Créer des nœuds feuilles :</strong> Pour chaque objet géométrique, calculez son <a href="https://en.wikipedia.org/wiki/Minimum_bounding_rectangle">rectangle minimal de délimitation</a> (MBR), qui est le plus petit rectangle contenant entièrement l'objet, et stockez-le en tant que nœud feuille.</p></li>
<li><p><strong>Regrouper en boîtes plus grandes :</strong> Regroupez les nœuds feuilles proches et entourez chaque groupe d'un nouveau MBR, en formant des nœuds internes. Par exemple, le groupe <strong>B</strong> contient <strong>D</strong> et <strong>E</strong>; le groupe <strong>C</strong> contient <strong>F</strong> et <strong>G.</strong></p></li>
<li><p><strong>Ajoutez le nœud racine :</strong> Ajoutez un nœud racine dont le RBM couvre tous les groupes internes, ce qui permet d'obtenir une structure arborescente équilibrée en hauteur.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/how-retree-works.png" alt="How Retree Works" class="doc-image" id="how-retree-works" />
   </span> <span class="img-wrapper"> <span>Fonctionnement de Retree</span> </span></p>
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
    </button></h3><ol>
<li><p><strong>Formez le MBR de la requête :</strong> calculez le MBR pour la géométrie de votre requête.</p></li>
<li><p><strong>Élaguez les branches :</strong> En commençant par la racine, comparez le MBR de la requête à chaque nœud interne. Sautez toutes les branches dont le MBR ne croise pas le MBR de la requête.</p></li>
<li><p><strong>Collecter les candidats :</strong> Descendez dans les branches qui se croisent pour rassembler les nœuds feuilles candidats.</p></li>
<li><p><strong>Correspondance exacte :</strong> Pour chaque candidat, effectuer un prédicat spatial exact pour déterminer les vraies correspondances.</p></li>
</ol>
<h2 id="Create-an-RTREE-index" class="common-anchor-header">Création d'un index RTREE<button data-href="#Create-an-RTREE-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez créer un index <code translate="no">RTREE</code> sur un champ <code translate="no">GEOMETRY</code> défini dans votre schéma de collecte.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Assume you have defined a GEOMETRY field named &quot;geo&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add RTREE index on the &quot;geo&quot; field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;geo&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;RTREE&quot;</span>,      <span class="hljs-comment"># Spatial index for GEOMETRY</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;rtree_geo&quot;</span>,  <span class="hljs-comment"># Optional, name your index</span></span>
<span class="highlighted-comment-line">    params={}                <span class="hljs-comment"># No extra params needed</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;geo_demo&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query-with-RTREE" class="common-anchor-header">Interroger avec RTREE<button data-href="#Query-with-RTREE" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous filtrez avec des opérateurs géométriques dans l'expression <code translate="no">filter</code>. Lorsqu'un index <code translate="no">RTREE</code> existe sur le champ cible <code translate="no">GEOMETRY</code>, Milvus l'utilise pour élaguer automatiquement les candidats. Sans l'index, le filtre revient à un balayage complet.</p>
<p>Pour obtenir la liste complète des opérateurs spécifiques à la géométrie disponibles, reportez-vous à la section <a href="/docs/fr/geometry-operators.md">Opérateurs de géométrie</a>.</p>
<h3 id="Example-1-Filter-only" class="common-anchor-header">Exemple 1 : Filtre uniquement<button data-href="#Example-1-Filter-only" class="anchor-icon" translate="no">
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
    </button></h3><p>Recherche de tous les objets géométriques à l'intérieur d'un polygone donné :</p>
<pre><code translate="no" class="language-python">filter_expr = <span class="hljs-string">&quot;ST_CONTAINS(geo, &#x27;POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))&#x27;)&quot;</span>

res = client.query(
    collection_name=<span class="hljs-string">&quot;geo_demo&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>],
    limit=<span class="hljs-number">10</span>
)
<span class="hljs-built_in">print</span>(res)   <span class="hljs-comment"># Expected: a list of rows where geo is entirely inside the polygon</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Vector-search-+-spatial-filter" class="common-anchor-header">Exemple 2 : Recherche vectorielle + filtre spatial<button data-href="#Example-2-Vector-search-+-spatial-filter" class="anchor-icon" translate="no">
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
    </button></h3><p>Recherche les vecteurs les plus proches qui coupent également une ligne :</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Assume you&#x27;ve also created an index on &quot;vec&quot; and loaded the collection.</span>
query_vec = [[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]]
filter_expr = <span class="hljs-string">&quot;ST_INTERSECTS(geo, &#x27;LINESTRING (1 1, 2 2)&#x27;)&quot;</span>

hits = client.search(
    collection_name=<span class="hljs-string">&quot;geo_demo&quot;</span>,
    data=query_vec,
    limit=<span class="hljs-number">5</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>]
)
<span class="hljs-built_in">print</span>(hits)  <span class="hljs-comment"># Expected: top-k by vector similarity among rows whose geo intersects the line</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour plus d'informations sur l'utilisation d'un champ <code translate="no">GEOMETRY</code>, voir <a href="/docs/fr/geometry-field.md">Champ géométrique</a>.</p>
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
    collection_name=<span class="hljs-string">&quot;geo_demo&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;rtree_geo&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
