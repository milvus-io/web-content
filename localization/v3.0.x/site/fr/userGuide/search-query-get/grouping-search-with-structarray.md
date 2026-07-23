---
id: grouping-search-with-structarray.md
title: Regroupement des résultats de recherche avec StructArray
summary: >-
  Cette page permet de regrouper les résultats de recherche au niveau des
  éléments StructArray par entité parente. La recherche au niveau des éléments
  peut renvoyer plusieurs résultats provenant d'une même entité lorsque
  plusieurs éléments Struct correspondent à la requête. Le regroupement regroupe
  ces résultats au niveau des éléments de manière à ce que chaque entité parente
  n'apparaisse qu'une seule fois au maximum.
---
<h1 id="Grouping-Search-with-StructArray" class="common-anchor-header">Regroupement des résultats de recherche avec StructArray<button data-href="#Grouping-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilisez cette page pour regrouper les résultats de recherche au niveau des éléments StructArray par entité parente. La recherche au niveau des éléments peut renvoyer plusieurs résultats provenant de la même entité lorsque plusieurs éléments Struct correspondent à la requête. Le regroupement regroupe ces résultats au niveau des éléments afin que chaque entité parente n'apparaisse qu'une seule fois au maximum.</p>
<p>Cette page utilise la collection « <code translate="no">tech_articles</code> » issue de la <a href="/docs/fr/create-structarray-field.md">section «Créer un champ StructArray</a>». Cette collection comporte un champ StructArray nommé « <code translate="no">chunks</code> ». Le sous-champ vectoriel « <code translate="no">chunks[emb]</code> » est indexé pour la recherche au niveau des éléments à l’aide d’une métrique vectorielle standard.</p>
<h2 id="How-grouping-applies-to-StructArray" class="common-anchor-header">Comment le regroupement s’applique à StructArray<button data-href="#How-grouping-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th>Mode de recherche</th><th>Comportement du regroupement</th><th>Comportement des résultats</th></tr>
</thead>
<tbody>
<tr><td>Recherche dans EmbeddingList</td><td>Non pris en charge.</td><td>Sans objet.</td></tr>
<tr><td>Recherche au niveau des éléments</td><td>Prise en charge par regroupement sur la clé primaire.</td><td>Renvoie au maximum un résultat par entité parente. Les métadonnées au niveau des éléments sont conservées ; ainsi, l’index ou le décalage de l’élément sélectionné peut être renvoyé lorsqu’il est exposé par l’API ou le SDK.</td></tr>
<tr><td>Recherche hybride</td><td>Prise en charge uniquement lorsque toutes les sous-recherches ciblent des champs vectoriels au niveau des éléments sous le même champ StructArray.</td><td>Les sous-recherches au niveau des éléments sont regroupées par clé primaire avant le traitement final des résultats.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Utilisez le regroupement lorsque la recherche au niveau des éléments non regroupés renvoie trop d’entités parentes en double. Si vous souhaitez que chaque élément Struct correspondant soit considéré comme un résultat individuel, utilisez <a href="/docs/fr/basic-vector-search-with-structarray.md">la recherche vectorielle de base avec StructArray</a> sans l’option « <code translate="no">group_by_field</code> ».</p>
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
    </button></h2><p>Préparez la collection, les données et les index avant d’exécuter une recherche avec regroupement.</p>
<table>
<thead>
<tr><th>Conditions requises</th><th>Détails</th></tr>
</thead>
<tbody>
<tr><td>Sous-champ vectoriel au niveau de l’élément</td><td>Utilisez un sous-champ vectoriel StructArray tel que <code translate="no">chunks[emb]</code>, indexé à l'aide d'une métrique vectorielle standard.</td></tr>
<tr><td>Requête vectorielle standard</td><td>Utilisez un vecteur de requête standard, et non un <code translate="no">EmbeddingList</code>.</td></tr>
<tr><td>Regroupement par clé primaire</td><td>Utilisez la clé primaire de la collection sous la forme d'un « <code translate="no">group_by_field</code> », par exemple <code translate="no">doc_id</code>.</td></tr>
<tr><td>Pas de paramètres de plage</td><td>Ne combinez pas la recherche par regroupement avec des paramètres de recherche par plage tels que <code translate="no">radius</code> ou <code translate="no">range_filter</code>.</td></tr>
</tbody>
</table>
<p>Pour la configuration de l’index, voir <a href="/docs/fr/index-structarray-fields.md">Champs StructArray de l’index</a>.</p>
<h2 id="Run-grouped-element-level-search" class="common-anchor-header">Exécuter une recherche groupée au niveau des éléments<button data-href="#Run-grouped-element-level-search" class="anchor-icon" translate="no">
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
    </button></h2><p>L’exemple suivant recherche d’abord les blocs individuels, puis regroupe les résultats au niveau des éléments en fonction de la clé primaire de l’entité parente.</p>
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
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
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
<p>Sans regroupement, le même <code translate="no">doc_id</code> peut apparaître plusieurs fois si plusieurs blocs correspondent à la requête. Avec <code translate="no">group_by_field=&quot;doc_id&quot;</code>, chaque entité parente n'apparaît qu'une seule fois au maximum. Le regroupement préserve les métadonnées au niveau des éléments ; ainsi, le résultat regroupé peut toujours inclure l'index ou le décalage de l'élément Struct sélectionné lorsque l'API ou le SDK l'expose.</p>
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
    </button></h2><p>Vous pouvez combiner la recherche par regroupement avec le filtrage scalaire StructArray. Utilisez ` <code translate="no">element_filter</code> ` lorsque la condition scalaire doit restreindre les éléments Struct participant à la recherche vectorielle au niveau des éléments.</p>
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
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
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
<p>Le prédicat de niveau supérieur sélectionne les entités candidates. Le prédicat « <code translate="no">element_filter</code> » restreint la recherche vectorielle au niveau des éléments aux éléments Struct correspondants. Le regroupement regroupe ensuite les résultats d’éléments correspondants en fonction de la clé primaire.</p>
<h2 id="Use-grouping-in-hybrid-search" class="common-anchor-header">Utilisation du regroupement dans la recherche hybride<button data-href="#Use-grouping-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Le regroupement hybride avec StructArray est une fonctionnalité au niveau des éléments. Il n’est pris en charge que lorsque toutes les sous-recherches ciblent des champs vectoriels au niveau des éléments appartenant au même champ StructArray. N’utilisez pas de requêtes au niveau de la liste d’embeddings (EmbeddingList) dans une recherche hybride StructArray regroupée.</p>
<p>L’exemple suivant part du principe que le champ StructArray « <code translate="no">chunks</code> » comporte deux sous-champs vectoriels au niveau des éléments, « <code translate="no">chunks[emb]</code> » et « <code translate="no">chunks[code_emb]</code> », et que ces deux sous-champs sont indexés à l’aide de métriques vectorielles standard.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

index_chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

code_chunk_req = AnnSearchRequest(
    data=[code_query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[has_code] == true)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[index_chunk_req, code_chunk_req],
    ranker=RRFRanker(),
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans cet exemple, les deux sous-requêtes ciblent des champs vectoriels au niveau des éléments appartenant au même champ StructArray, <code translate="no">chunks</code>. Une recherche hybride ne prend pas en charge le regroupement au niveau des éléments si elle mélange des champs vectoriels normaux, différents champs StructArray ou des requêtes au niveau de la liste d’intégration (EmbeddingList).</p>
<h2 id="Interpret-grouped-results" class="common-anchor-header">Interprétation des résultats regroupés<button data-href="#Interpret-grouped-results" class="anchor-icon" translate="no">
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
<tr><td><code translate="no">id</code></td><td>Clé primaire de l’entité parente regroupée.</td></tr>
<tr><td><code translate="no">distance</code> ou score</td><td>Score ou distance de l'élément Struct sélectionné pour cette entité parente.</td></tr>
<tr><td><code translate="no">offset</code></td><td>Position (à partir de zéro) de l’élément Struct sélectionné lors du renvoi.</td></tr>
<tr><td>Clés primaires répétées</td><td>Non attendues lors d’un regroupement par clé primaire.</td></tr>
<tr><td><code translate="no">limit</code></td><td>S'applique aux résultats groupés de l'entité parente.</td></tr>
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
<li><p>La recherche par regroupement s’applique uniquement à la recherche vectorielle StructArray au niveau des éléments. La recherche EmbeddingList et la recherche hybride au niveau EmbeddingList ne prennent pas en charge le regroupement.</p></li>
<li><p>Utilisez la clé primaire comme « <code translate="no">group_by_field</code> ». Le regroupement au niveau des éléments StructArray n'est pas un regroupement polyvalent sur des champs scalaires arbitraires.</p></li>
<li><p>Ne combinez pas la recherche groupée avec la recherche par plage.</p></li>
<li><p>N’utilisez pas de requête « <code translate="no">EmbeddingList</code> » ni de métrique « <code translate="no">MAX_SIM*</code> » pour la recherche groupée.</p></li>
<li><p>Le regroupement hybride n’est pris en charge que lorsque toutes les sous-recherches ciblent des champs vectoriels au niveau des éléments sous le même champ StructArray.</p></li>
<li><p>Le regroupement hybride n’est pas pris en charge lorsque la recherche hybride associe un champ vectoriel normal, un autre champ StructArray ou une requête au niveau EmbeddingList.</p></li>
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
<li><p>Utilisation du regroupement avec ` <code translate="no">chunks[emb_list_vector]</code>`, qui est destiné à la recherche EmbeddingList.</p></li>
<li><p>Regroupement par un champ scalaire autre que la clé primaire.</p></li>
<li><p>Regroupement selon plusieurs champs. Le regroupement StructArray au niveau des éléments ne prend en charge que le regroupement par clé primaire.</p></li>
<li><p>S'attendre à ce que les résultats regroupés représentent chaque élément Struct correspondant. Le regroupement renvoie au maximum un résultat par entité parente.</p></li>
<li><p>Supposer que la recherche groupée au niveau des éléments recalcule un score de type « <code translate="no">MAX_SIM*</code> » de type EmbeddingList. Le regroupement regroupe les résultats au niveau des éléments ; il ne modifie pas le modèle de notation.</p></li>
<li><p>Combinaison de l’ <code translate="no">group_by_field</code> avec <code translate="no">radius</code> ou <code translate="no">range_filter</code>.</p></li>
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
<li><p>Pour vous familiariser d’abord avec la recherche au niveau des éléments non regroupés, consultez la section « <a href="/docs/fr/basic-vector-search-with-structarray.md">Recherche vectorielle de base avec StructArray</a> ».</p></li>
<li><p>Pour ajouter des filtres scalaires à la recherche groupée, consultez la section « <a href="/docs/fr/filtered-search-with-structarray.md">Recherche filtrée avec StructArray</a> ».</p></li>
<li><p>Pour utiliser des limites de score ou de distance à la place du regroupement, consultez la section « <a href="/docs/fr/range-search-with-structarray.md">Recherche par plage avec StructArray</a> ».</p></li>
<li><p>Pour connaître les limites de la recherche avec StructArray, consultez la section « <a href="/docs/fr/structarray-limits.md">Limites de StructArray</a> ».</p></li>
</ol>
