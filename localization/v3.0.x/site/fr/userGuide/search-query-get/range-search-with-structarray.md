---
id: range-search-with-structarray.md
title: Recherche par intervalle avec StructArray
summary: >-
  Cette page vous permet d'effectuer une recherche par plage sur les sous-champs
  vectoriels d'un StructArray. La recherche par plage renvoie les résultats
  vectoriels dont le score ou la distance se situe dans une plage spécifiée.
  Pour les champs StructArray, utilisez la recherche par plage avec une
  recherche vectorielle au niveau des éléments, dans laquelle chaque élément
  Struct est recherché indépendamment.
---
<h1 id="Range-Search-with-StructArray" class="common-anchor-header">Recherche par intervalle avec StructArray<button data-href="#Range-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilisez cette page pour effectuer une recherche par plage sur les sous-champs vectoriels de StructArray. La recherche par plage renvoie les résultats vectoriels dont le score ou la distance se situe dans une plage spécifiée. Pour les champs StructArray, utilisez la recherche par plage avec une recherche vectorielle au niveau des éléments, où chaque élément Struct est recherché indépendamment.</p>
<p>Cette page utilise la collection « <code translate="no">tech_articles</code> » issue de la <a href="/docs/fr/create-structarray-field.md">section «Créer un champ StructArray</a>». Cette collection comporte un champ StructArray nommé « <code translate="no">chunks</code> ». Le sous-champ vectoriel « <code translate="no">chunks[emb]</code> » est indexé pour la recherche au niveau des éléments à l’aide d’une métrique vectorielle standard telle que « <code translate="no">COSINE</code> », « <code translate="no">IP</code> » ou « <code translate="no">L2</code> ».</p>
<h2 id="How-range-search-applies-to-StructArray" class="common-anchor-header">Comment la recherche par plage s’applique à StructArray<button data-href="#How-range-search-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th>Mode de recherche</th><th>Comportement de la recherche par plage</th><th>Granularité des résultats</th></tr>
</thead>
<tbody>
<tr><td>Recherche dans EmbeddingList</td><td>Non pris en charge.</td><td>Sans objet.</td></tr>
<tr><td>Recherche au niveau des éléments</td><td>Utilisez une requête vectorielle standard avec <code translate="no">radius</code> et, éventuellement, <code translate="no">range_filter</code>.</td><td>Niveau des éléments de structure.</td></tr>
<tr><td>Recherche hybride</td><td>Prise en charge lorsque la requête StructArray cible un champ vectoriel au niveau des éléments. Les requêtes au niveau de EmbeddingList ne prennent pas en charge la recherche par plage.</td><td>Sous-recherche au niveau des éléments, puis reclassement hybride.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Si vous n’avez besoin que des éléments Struct les plus proches, commencez par <a href="/docs/fr/basic-vector-search-with-structarray.md">une recherche vectorielle de base avec StructArray</a>. Utilisez la recherche par plage lorsque le résultat doit respecter une limite de score ou de distance, et non pas uniquement un classement Top-K.</p>
</div>
<h2 id="Before-you-begin" class="common-anchor-header">Avant de commencer<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Préparez la collection, les données et les index avant d'exécuter une recherche par plage.</p>
<table>
<thead>
<tr><th>Conditions requises</th><th>Détails</th></tr>
</thead>
<tbody>
<tr><td>Champ StructArray</td><td>La collection contient un champ StructArray tel que <code translate="no">chunks</code>.</td></tr>
<tr><td>Sous-champ vectoriel au niveau de l’élément</td><td>Le sous-champ vectoriel cible est <code translate="no">chunks[emb]</code>, et non <code translate="no">chunks[emb_list_vector]</code>.</td></tr>
<tr><td>Métrique d’indexation</td><td>Le sous-champ vectoriel est indexé à l’aide d’une métrique vectorielle standard, telle que <code translate="no">COSINE</code>, <code translate="no">IP</code> ou <code translate="no">L2</code>.</td></tr>
<tr><td>Données de requête</td><td>La requête est un vecteur standard, et non un <code translate="no">EmbeddingList</code>.</td></tr>
</tbody>
</table>
<p>Pour la configuration de l’index, voir <a href="/docs/fr/index-structarray-fields.md">Indexer les champs StructArray</a>.</p>
<h2 id="Use-radius-and-rangefilter" class="common-anchor-header">Utilisez radius et range_filter<button data-href="#Use-radius-and-rangefilter" class="anchor-icon" translate="no">
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
    </button></h2><p>Définissez <code translate="no">radius</code> pour délimiter la zone de recherche. Définissez <code translate="no">range_filter</code> si vous avez également besoin d’une limite intérieure. Le choix de la direction dépend de ce qui est privilégié : une distance plus courte ou un score de similarité plus élevé.</p>
<table>
<thead>
<tr><th>Type de métrique</th><th>Un score plus élevé est-il préférable ?</th><th>Condition de plage lorsque « <code translate="no">range_filter</code> » est utilisé</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">L2</code></td><td>Non. Une distance plus courte est préférable.</td><td><code translate="no">range_filter &lt;= distance &lt; radius</code></td></tr>
<tr><td><code translate="no">IP</code>, <code translate="no">COSINE</code></td><td>Oui. Un score plus élevé est préférable.</td><td><code translate="no">radius &lt; distance &lt;= range_filter</code></td></tr>
</tbody>
</table>
<p>Lorsque seule l'<code translate="no">radius</code> est définie, la recherche par plage renvoie les résultats qui respectent la limite extérieure de la métrique. Choisissez les valeurs en fonction de l'échelle de score ou de distance de vos représentations.</p>
<h2 id="Run-element-level-range-search" class="common-anchor-header">Lancer une recherche par plage au niveau des éléments<button data-href="#Run-element-level-range-search" class="anchor-icon" translate="no">
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
    </button></h2><p>L'exemple suivant recherche des segments individuels dont les vecteurs d'<code translate="no">chunks[emb]</code> sont suffisamment similaires au vecteur de requête. Chaque résultat correspond à un élément Struct apparié.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[page]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
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
<p>Dans cet exemple, « <code translate="no">COSINE</code> » est une métrique de type similarité ; l’intervalle de résultats est donc supérieur à <code translate="no">radius</code> et inférieur ou égal à <code translate="no">range_filter</code>. La valeur « <code translate="no">offset</code> » identifie l’élément Struct correspondant dans le tableau « <code translate="no">chunks</code> » lors du renvoi.</p>
<h2 id="Add-scalar-filters" class="common-anchor-header">Ajouter des filtres scalaires<button data-href="#Add-scalar-filters" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez combiner la recherche par plage au niveau des éléments avec le filtrage scalaire de StructArray. Utilisez un prédicat de niveau supérieur pour les champs de l’entité parente, et utilisez <code translate="no">element_filter</code> pour restreindre les éléments Struct participant à la recherche par plage vectorielle.</p>
<pre><code translate="no" class="language-python">filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;element_filter(chunks, &#x27;</span>
    <span class="hljs-string">&#x27;$[section] == &quot;index&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[quality_score] &gt; 0.9)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">10</span>,
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
<p>Le prédicat de niveau supérieur sélectionne les entités candidates. Le prédicat « <code translate="no">element_filter</code> » limite la recherche par plage vectorielle aux éléments Struct correspondants. Pour plus d’exemples de filtrage, consultez la section « <a href="/docs/fr/filtered-search-with-structarray.md">Recherche filtrée avec StructArray</a> ».</p>
<h2 id="Use-range-search-in-hybrid-search" class="common-anchor-header">Utilisation de la recherche par plage dans la recherche hybride<button data-href="#Use-range-search-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Les champs vectoriels au niveau des éléments de StructArray prennent en charge la recherche par plage dans la recherche hybride. Ajoutez « <code translate="no">radius</code> » et, éventuellement, « <code translate="no">range_filter</code> » à la requête « <code translate="no">AnnSearchRequest</code> » qui cible le champ vectoriel au niveau des éléments de StructArray.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    param={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans cet exemple, seule la sous-requête « <code translate="no">chunks[emb]</code> » utilise des paramètres de recherche par plage. La requête StructArray suit toujours la sémantique au niveau des éléments : la limite de la plage s’applique aux résultats correspondant aux éléments Struct avant que la recherche hybride ne combine et ne reclasse les résultats.</p>
<h2 id="Interpret-range-results" class="common-anchor-header">Interprétation des résultats de la recherche par plage<button data-href="#Interpret-range-results" class="anchor-icon" translate="no">
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
<tr><th>Élément de résultat</th><th>Signification</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">id</code></td><td>Clé primaire de l’entité contenant l’élément Struct correspondant.</td></tr>
<tr><td><code translate="no">distance</code> ou score</td><td>Le score ou la distance entre le vecteur de requête et le vecteur de l'élément Struct correspondant.</td></tr>
<tr><td><code translate="no">offset</code></td><td>Position (à partir de zéro) de l’élément Struct correspondant dans le champ StructArray lors du renvoi.</td></tr>
<tr><td>Clés primaires répétées</td><td>Possible. Plus d’un élément Struct d’une même entité peut se situer dans la plage spécifiée.</td></tr>
<tr><td><code translate="no">limit</code></td><td>S'applique aux occurrences d'éléments, et non aux entités parentes uniques.</td></tr>
</tbody>
</table>
<h2 id="Limitations" class="common-anchor-header">Limitations<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li><p>N’utilisez pas de requête de type « <code translate="no">EmbeddingList</code> » ni de métrique de type « <code translate="no">MAX_SIM*</code> » pour une recherche par plage sur les sous-champs vectoriels de StructArray. La recherche au niveau de l’EmbeddingList ne prend pas en charge la recherche par plage.</p></li>
<li><p>Ne combinez pas la recherche par plage avec la recherche par regroupement. Si vous avez besoin d’un résultat par entité parente, effectuez une recherche au niveau des éléments sans paramètres de plage et utilisez le regroupement lorsque cela est pris en charge.</p></li>
<li><p>La recherche par plage hybride est prise en charge pour les champs vectoriels au niveau des éléments de StructArray. Elle n’est pas prise en charge pour les requêtes StructArray au niveau de l’EmbeddingList.</p></li>
</ul>
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
<li><p>Lancer une recherche par plage sur <code translate="no">chunks[emb_list_vector]</code>, qui est destiné à la recherche au niveau de l’EmbeddingList.</p></li>
<li><p>Utiliser <code translate="no">MAX_SIM_COSINE</code> à la place d’une métrique standard telle que <code translate="no">COSINE</code> pour une recherche par plage au niveau des éléments.</p></li>
<li><p>Utilisation d’une requête de type « <code translate="no">EmbeddingList</code> » à la place d’une requête vectorielle classique.</p></li>
<li><p>S’attendre à ce que les résultats de la recherche par plage soient uniques par entité parente. La recherche par plage renvoie les occurrences d’éléments Struct correspondantes.</p></li>
<li><p>Utilisation de « <code translate="no">chunks.emb</code> » au lieu de la syntaxe requise pour le chemin d’accès au sous-champ « <code translate="no">chunks[emb]</code> ».</p></li>
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
<li><p>Pour découvrir les deux modes de recherche vectorielle de base avec StructArray, consultez la section « <a href="/docs/fr/basic-vector-search-with-structarray.md">Recherche vectorielle de base avec StructArray</a> ».</p></li>
<li><p>Pour ajouter des filtres scalaires à la recherche par plage, consultez la section « <a href="/docs/fr/filtered-search-with-structarray.md">Recherche filtrée avec StructArray</a> ».</p></li>
<li><p>Pour renvoyer au maximum un résultat par entité parente lorsque cela est pris en charge, consultez la section « <a href="/docs/fr/grouping-search-with-structarray.md">Recherche groupée avec StructArray</a> ».</p></li>
<li><p>Pour vérifier les limites de recherche spécifiques à chaque version, consultez la section « <a href="/docs/fr/structarray-limits.md">Limites de StructArray</a> ».</p></li>
</ol>
