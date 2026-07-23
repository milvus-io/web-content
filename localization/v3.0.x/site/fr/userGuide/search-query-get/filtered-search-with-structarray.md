---
id: filtered-search-with-structarray.md
title: Recherche filtrée avec StructArray
summary: >-
  Cette page vous permet d'ajouter un filtrage scalaire à la recherche
  vectorielle sur les champs StructArray. Le filtrage StructArray comporte deux
  niveaux : les filtres au niveau des lignes sélectionnent les entités parentes,
  tandis que les filtres au niveau des éléments déterminent quels éléments
  Struct participent à la recherche vectorielle au niveau des éléments.
---
<h1 id="Filtered-Search-with-StructArray" class="common-anchor-header">Recherche filtrée avec StructArray<button data-href="#Filtered-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilisez cette page pour ajouter un filtrage scalaire à la recherche vectorielle sur les champs StructArray. Le filtrage StructArray comporte deux niveaux : les filtres au niveau des lignes sélectionnent les entités parentes, tandis que les filtres au niveau des éléments restreignent les éléments Struct participant à la recherche vectorielle au niveau des éléments.</p>
<p>Cette page utilise la collection « <code translate="no">tech_articles</code> » issue de la section <a href="/docs/fr/create-structarray-field.md">«Créer un champ StructArray</a>». Cette collection comporte un champ StructArray nommé « <code translate="no">chunks</code> », avec des sous-champs scalaires tels que « <code translate="no">section</code> », « <code translate="no">page</code> », « <code translate="no">quality_score</code> » et « <code translate="no">has_code</code> », ainsi que des sous-champs vectoriels destinés à la recherche.</p>
<h2 id="Choose-a-filter-type" class="common-anchor-header">Choisissez un type de filtre<button data-href="#Choose-a-filter-type" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Objectif</th><th>Utilisation</th><th>Comportement du résultat</th></tr>
</thead>
<tbody>
<tr><td>Filtrer selon un champ scalaire de niveau supérieur, tel que <code translate="no">category</code>.</td><td>Expression de filtrage standard.</td><td>Sélectionne les entités parentes avant ou pendant la recherche.</td></tr>
<tr><td>Limite la recherche vectorielle au niveau des éléments aux éléments Struct qui répondent aux conditions scalaires.</td><td><code translate="no">element_filter</code>.</td><td>Recherche uniquement les éléments Struct correspondants et peut renvoyer les décalages des éléments correspondants.</td></tr>
<tr><td>Sélectionne les entités selon qu’aucun, tous ou un nombre spécifique d’éléments Struct correspondent à un prédicat.</td><td><code translate="no">MATCH_ANY</code>, <code translate="no">MATCH_ALL</code>, <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> ou <code translate="no">MATCH_EXACT</code>.</td><td>Filtrage au niveau des lignes. Ces opérateurs ne renvoient pas d’offset en eux-mêmes.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Cette page explique comment utiliser les filtres StructArray dans les workflows de recherche. Pour connaître l’ensemble des règles de syntaxe, les types de prédicats pris en charge et la matrice des prédicats non pris en charge, consultez la section <a href="/docs/fr/struct-array-operators.md">Opérateurs StructArray</a>.</p>
</div>
<h2 id="Filter-by-top-level-fields" class="common-anchor-header">Filtrage par champs de niveau supérieur<button data-href="#Filter-by-top-level-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilisez des expressions de filtrage classiques lorsque la condition s’applique à l’entité parente, et non à un élément Struct individuel. Cela fonctionne aussi bien avec la recherche EmbeddingList qu’avec la recherche au niveau des éléments.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query = EmbeddingList()
query.add([<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>])
query.add([<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>])

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;search&quot;&#x27;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>Le filtre ci-dessus sélectionne uniquement les entités dont le champ de niveau supérieur « <code translate="no">category</code> » est « <code translate="no">&quot;search&quot;</code> ». Il n’identifie pas un élément Struct correspondant.</p>
<h2 id="Filter-element-level-vector-search" class="common-anchor-header">Filtrage de la recherche vectorielle au niveau des éléments<button data-href="#Filter-element-level-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilisez ` <code translate="no">element_filter(structArrayField, predicate)</code> ` lorsque les conditions scalaires doivent s’appliquer au même élément Struct participant à la recherche vectorielle au niveau des éléments. À l’intérieur du prédicat, utilisez ` <code translate="no">$[subfield]</code> ` pour faire référence aux sous-champs scalaires de l’élément Struct actuel.</p>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;element_filter(chunks, &#x27;</span>
    <span class="hljs-string">&#x27;$[section] == &quot;index&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[quality_score] &gt; 0.9 &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[has_code] == true)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[page]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
        <span class="hljs-string">&quot;chunks[has_code]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(
            <span class="hljs-string">&quot;doc_id:&quot;</span>, hit[<span class="hljs-string">&quot;id&quot;</span>],
            <span class="hljs-string">&quot;distance:&quot;</span>, hit[<span class="hljs-string">&quot;distance&quot;</span>],
            <span class="hljs-string">&quot;offset:&quot;</span>, hit.get(<span class="hljs-string">&quot;offset&quot;</span>),
            <span class="hljs-string">&quot;entity:&quot;</span>, hit[<span class="hljs-string">&quot;entity&quot;</span>],
        )
<button class="copy-code-btn"></button></code></pre>
<p>Dans cet exemple, le prédicat de niveau supérieur <code translate="no">category == &quot;search&quot;</code> sélectionne les entités candidates, et <code translate="no">element_filter</code> restreint la recherche vectorielle au niveau des éléments aux segments où <code translate="no">section</code>, <code translate="no">quality_score</code> et <code translate="no">has_code</code> correspondent tous dans le même élément Struct.</p>
<div class="alert note">
<p>Avertissement</p>
<p>Lorsque vous combinez un prédicat de niveau supérieur avec <code translate="no">element_filter</code>, placez <code translate="no">element_filter</code> à la fin de l’expression. Une expression de filtrage ne peut contenir qu’un seul <code translate="no">element_filter</code>, et vous ne pouvez pas imbriquer <code translate="no">element_filter</code> ou <code translate="no">MATCH_*</code> à l’intérieur d’un autre opérateur StructArray.</p>
</div>
<h2 id="Filter-entities-with-MATCH-operators" class="common-anchor-header">Filtrer des entités à l’aide d’opérateurs MATCH<button data-href="#Filter-entities-with-MATCH-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilisez les opérateurs « <code translate="no">MATCH_*</code> » lorsque le filtre doit déterminer si une entité parente est éligible en fonction de ses éléments Struct. Ces opérateurs sont des filtres au niveau des lignes : ils sélectionnent des entités, mais ne renvoient pas d’offset d’élément en eux-mêmes.</p>
<table>
<thead>
<tr><th>Opérateur</th><th>À utiliser lorsque</th><th>Exemple</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY</code></td><td>Au moins un élément Struct doit satisfaire le prédicat.</td><td><code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code></td></tr>
<tr><td><code translate="no">MATCH_ALL</code></td><td>Tous les éléments Struct doivent satisfaire le prédicat.</td><td><code translate="no">MATCH_ALL(chunks, $[quality_score] &gt; 0.5)</code></td></tr>
<tr><td><code translate="no">MATCH_LEAST</code></td><td>Au moins <code translate="no">N</code> éléments de la structure doivent satisfaire le prédicat.</td><td><code translate="no">MATCH_LEAST(chunks, $[has_code] == true, threshold=2)</code></td></tr>
<tr><td><code translate="no">MATCH_MOST</code></td><td>Au plus <code translate="no">N</code> éléments de la structure doivent satisfaire le prédicat.</td><td><code translate="no">MATCH_MOST(chunks, $[section] == &quot;appendix&quot;, threshold=1)</code></td></tr>
<tr><td><code translate="no">MATCH_EXACT</code></td><td><code translate="no">N</code> éléments Struct exactement doivent satisfaire le prédicat.</td><td><code translate="no">MATCH_EXACT(chunks, $[section] == &quot;summary&quot;, threshold=1)</code></td></tr>
</tbody>
</table>
<pre><code translate="no" class="language-python">filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;MATCH_ANY(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">3</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>Utilisez « <code translate="no">MATCH_ANY</code> » ici car le résultat de recherche EmbeddingList est au niveau de l’entité. Le filtre exige qu’au moins un fragment de l’entité soit un fragment « <code translate="no">&quot;index&quot;</code> » de haute qualité, mais le résultat de recherche lui-même représente toujours l’entité parente.</p>
<h2 id="Use-filters-in-hybrid-search" class="common-anchor-header">Utilisation des filtres dans la recherche hybride<button data-href="#Use-filters-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans la recherche hybride, appliquez les filtres StructArray là où la condition doit s’appliquer. Un filtre de niveau supérieur peut être partagé par l’ensemble de la recherche hybride. Un filtre « <code translate="no">element_filter</code> » doit être associé à la requête de niveau élément StructArray qui nécessite des contraintes au niveau des éléments.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;search&quot;&#x27;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>L’argument « <code translate="no">filter</code> » applique la condition d’entité de niveau supérieur, tandis que l’argument « <code translate="no">expr</code> » sur <code translate="no">chunk_req</code> ne contraint que la requête vectorielle au niveau des éléments de StructArray. Pour connaître les combinaisons de recherche hybride prises en charge et les limites spécifiques à chaque version, consultez les sections « <a href="/docs/fr/hybrid-search-with-structarray.md">Recherche hybride avec StructArray</a> » et « <a href="/docs/fr/structarray-limits.md">Limites de StructArray</a> ».</p>
<h2 id="Predicate-support-summary" class="common-anchor-header">Résumé de la prise en charge des prédicats<button data-href="#Predicate-support-summary" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilisez des sous-champs scalaires dans les prédicats StructArray. Les sous-champs vectoriels ne constituent pas des entrées de prédicats scalaires.</p>
<table>
<thead>
<tr><th>Type de sous-champ</th><th>Exemples typiques de prédicats</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">$[has_code] == true</code>, <code translate="no">!($[has_code] == true)</code></td></tr>
<tr><td>Types entiers</td><td><code translate="no">$[page] &gt;= 2</code>, <code translate="no">$[page] in [1, 2, 3]</code></td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td><code translate="no">$[quality_score] &gt; 0.9</code>, <code translate="no">0.7 &lt; $[quality_score] &lt; 0.95</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">$[section] == &quot;index&quot;</code>, <code translate="no">$[text] like &quot;range%&quot;</code></td></tr>
<tr><td>Sous-champs vectoriels</td><td>Non pris en charge en tant qu’entrées de prédicats scalaires d’ <code translate="no">$[...]</code>. Utilisez plutôt les sous-champs vectoriels via la recherche vectorielle.</td></tr>
</tbody>
</table>
<p>Pour les cas non pris en charge, tels que les chemins JSON, les fonctions de conteneurs de tableaux, les fonctions de correspondance de texte, les prédicats null sur <code translate="no">$[...]</code>, les fonctions de géométrie, les expressions Timestamptz et les appels de fonctions génériques, consultez la <a href="/docs/fr/struct-array-operators.md">section Opérateurs StructArray</a>.</p>
<h2 id="Common-mistakes" class="common-anchor-header">Erreurs courantes<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>Utilisation de ` <code translate="no">$[subfield]</code> ` en dehors de ` <code translate="no">element_filter</code> ` ou ` <code translate="no">MATCH_*</code>`.</p></li>
<li><p>Utilisation de ` <code translate="no">chunks.section</code> ` à la place de la syntaxe des opérateurs StructArray, telle que ` <code translate="no">element_filter(chunks, $[section] == &quot;index&quot;)</code>`.</p></li>
<li><p>Utiliser <code translate="no">element_filter</code> alors que vous n'avez besoin que d'un filtrage au niveau des lignes. Utilisez plutôt <code translate="no">MATCH_ANY</code> si vous avez uniquement besoin de sélectionner des entités.</p></li>
<li><p>S'attendre à ce que ` <code translate="no">MATCH_*</code> ` renvoie des indices d'éléments. Ces opérateurs sélectionnent des entités et n'identifient pas eux-mêmes un élément correspondant.</p></li>
<li><p>Écrire des prédicats booléens nus tels que <code translate="no">$[has_code]</code>. Utilisez des comparaisons explicites telles que <code translate="no">$[has_code] == true</code>.</p></li>
<li><p>Placer « <code translate="no">element_filter</code> » avant un prédicat de niveau supérieur dans la même expression de filtre.</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">Étapes suivantes<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Pour consulter la syntaxe complète des filtres StructArray, lisez la section <a href="/docs/fr/struct-array-operators.md">Opérateurs StructArray</a>.</p></li>
<li><p>Pour effectuer d’abord des recherches vectorielles non filtrées, consultez la section « <a href="/docs/fr/basic-vector-search-with-structarray.md">Recherche vectorielle de base avec StructArray</a> ».</p></li>
<li><p>Pour créer des index scalaires pour les filtres StructArray fréquemment utilisés, consultez la section « <a href="/docs/fr/index-structarray-fields.md">Indexer les champs StructArray</a> ».</p></li>
<li><p>Pour connaître les limites de filtrage et de recherche spécifiques à chaque version, consultez la section « <a href="/docs/fr/structarray-limits.md">Limites de StructArray</a> ».</p></li>
</ol>
