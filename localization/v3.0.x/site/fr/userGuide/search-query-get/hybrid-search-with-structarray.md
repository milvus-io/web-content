---
id: hybrid-search-with-structarray.md
title: Recherche hybride avec StructArray
summary: >-
  Cette page vous permet de combiner la recherche vectorielle StructArray avec
  d'autres recherches vectorielles au sein d'une seule requête de recherche
  hybride. La recherche hybride StructArray peut produire soit des résultats au
  niveau de l'entité, soit des résultats au niveau des éléments, en fonction des
  objets AnnSearchRequest que vous combinez.
---
<h1 id="Hybrid-Search-with-StructArray" class="common-anchor-header">Recherche hybride avec StructArray<button data-href="#Hybrid-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilisez cette page pour combiner la recherche vectorielle StructArray avec d’autres recherches vectorielles au sein d’une seule requête de recherche hybride. La recherche hybride StructArray peut produire des résultats au niveau de l’entité ou au niveau de l’élément, selon les objets de la collection « <code translate="no">AnnSearchRequest</code> » que vous combinez.</p>
<p>Cette page utilise la collection « <code translate="no">tech_articles</code> » issue de la section <a href="/docs/fr/create-structarray-field.md">« Créer un champ StructArray</a> ». Cette collection comporte un champ vectoriel de niveau supérieur nommé « <code translate="no">title_vector</code> » et un champ StructArray nommé « <code translate="no">chunks</code> ». Le sous-champ « <code translate="no">chunks[emb_list_vector]</code> » est indexé pour la recherche EmbeddingList, tandis que « <code translate="no">chunks[emb]</code> » est indexé pour la recherche au niveau des éléments.</p>
<h2 id="How-hybrid-search-applies-to-StructArray" class="common-anchor-header">Comment la recherche hybride s’applique à StructArray<button data-href="#How-hybrid-search-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th><code translate="no">AnnSearchRequest</code> combinaison</th><th>Portée finale des candidats</th><th>Comportement du résultat</th><th><code translate="no">element_scope</code></th></tr>
</thead>
<tbody>
<tr><td>Champ vectoriel au niveau de la collection + sous-champ EmbeddingList de StructArray</td><td>Niveau de l’entité</td><td>Les candidats finaux sont indexés par clé primaire.</td><td>Ne pas utiliser.</td></tr>
<tr><td>Champ vectoriel au niveau de la collection + sous-champ au niveau de l'élément de StructArray</td><td>Niveau de l’entité</td><td>Les résultats au niveau des éléments sont regroupés en candidats au niveau des entités avant le reclassement hybride.</td><td>Configuration facultative de regroupement sur l'<code translate="no">AnnSearchRequest</code> au niveau des éléments de StructArray.</td></tr>
<tr><td>Plusieurs sous-champs au niveau des éléments sous le même champ StructArray</td><td>Niveau élément</td><td>Les candidats finaux sont indexés par la clé primaire et le décalage de l'élément Struct.</td><td>Ne pas utiliser.</td></tr>
<tr><td>Sous-champs au niveau des éléments sous différents champs StructArray</td><td>Niveau de l’entité</td><td>Les décalages d’éléments ne partagent pas d’identité commune ; par conséquent, chaque <code translate="no">AnnSearchRequest</code> au niveau des éléments de StructArray est regroupée avant le reclassement.</td><td><code translate="no">AnnSearchRequest</code>Configuration facultative de regroupement pour chaque sous-champ au niveau des éléments de StructArray.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Avertissement</p>
<p>Utilisez l’ <code translate="no">element_scope</code> uniquement pour configurer la réduction des objets d’ <code translate="no">AnnSearchRequest</code> s au niveau des éléments de StructArray dans une recherche hybride au niveau des éléments ne portant pas sur la même structure. Ne l’utilisez pas pour les requêtes EmbeddingList, les requêtes vectorielles au niveau des collections ou la recherche hybride au niveau des éléments de StructArray portant sur la même structure.</p>
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
    </button></h2><p>Préparez la collection, les données et les index avant d'exécuter une recherche hybride.</p>
<table>
<thead>
<tr><th>Condition préalable</th><th>Détails</th></tr>
</thead>
<tbody>
<tr><td>Champ StructArray</td><td>La collection contient un champ StructArray, tel que <code translate="no">chunks</code>.</td></tr>
<tr><td>Sous-champs vectoriels</td><td>Utilisez des sous-champs vectoriels distincts pour la recherche dans EmbeddingList et la recherche au niveau des éléments.</td></tr>
<tr><td>Les index</td><td><code translate="no">chunks[emb_list_vector]</code> utilise une métrique de type « <code translate="no">MAX_SIM*</code> ». « <code translate="no">chunks[emb]</code> » utilise une métrique vectorielle classique telle que <code translate="no">COSINE</code>, <code translate="no">IP</code> ou <code translate="no">L2</code>.</td></tr>
<tr><td>Reranker</td><td>Choisissez un réclassificateur hybride tel que <code translate="no">RRFRanker</code> ou un autre réclassificateur pris en charge par votre application.</td></tr>
</tbody>
</table>
<p>Pour la configuration de l'index, consultez la section <a href="/docs/fr/index-structarray-fields.md">Champs StructArray de l'index</a>.</p>
<h2 id="Run-hybrid-search-with-an-EmbeddingList-request" class="common-anchor-header">Lancer une recherche hybride avec une requête EmbeddingList<button data-href="#Run-hybrid-search-with-an-EmbeddingList-request" class="anchor-icon" translate="no">
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
    </button></h2><p>La recherche EmbeddingList sur un sous-champ vectoriel StructArray s’effectue au niveau de l’entité dans le cadre d’une recherche hybride. Elle se comporte comme une requête de recherche vectorielle au niveau de l’entité et ne renvoie pas un seul offset d’élément Struct correspondant.</p>
<pre><code translate="no">from pymilvus import AnnSearchRequest, MilvusClient, RRFRanker
from pymilvus.client.embedding_list import EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query_vector = [0.19, 0.24, 0.30, 0.37]

query_list = EmbeddingList()
query_list.add([0.12, 0.21, 0.32, 0.44])
query_list.add([0.18, 0.23, 0.29, 0.36])

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=10,
)

chunk_list_req = AnnSearchRequest(
    data=[query_list],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    limit=10,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_list_req],
    ranker=RRFRanker(),
    limit=5,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans cet exemple, les deux objets ` <code translate="no">AnnSearchRequest</code> ` produisent des candidats au niveau de l’entité. Le résultat final est indexé par la clé primaire de l’entité parente. N’ajoutez pas de ` <code translate="no">element_scope</code> ` à la requête `EmbeddingList`.</p>
<h2 id="Run-same-StructArray-element-level-hybrid-search" class="common-anchor-header">Lancer une recherche hybride au niveau des éléments d’un même StructArray<button data-href="#Run-same-StructArray-element-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Lorsque tous les objets ` <code translate="no">AnnSearchRequest</code> ` ciblent des sous-champs vectoriels au niveau des éléments appartenant au même champ `StructArray`, la recherche hybride peut conserver les candidats au niveau des éléments grâce à un reclassement. Il s’agit du seul mode hybride `StructArray` dans lequel les résultats finaux restent au niveau des éléments.</p>
<p>L’exemple suivant part du principe que le champ StructArray « <code translate="no">chunks</code> » comporte deux sous-champs vectoriels au niveau des éléments, « <code translate="no">chunks[emb]</code> » et « <code translate="no">chunks[code_emb]</code> », et que les deux utilisent des métriques vectorielles standard.</p>
<pre><code translate="no">index_chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

code_chunk_req = AnnSearchRequest(
    data=[code_query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[has_code] == true)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[index_chunk_req, code_chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">limit</span>=5,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
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
<p>Les deux objets <code translate="no">AnnSearchRequest</code> effectuent une recherche dans les sous-champs vectoriels sous <code translate="no">chunks</code>. Le même décalage (à partir de zéro) fait référence au même élément Struct ; le reclassement hybride peut donc classer directement les candidats au niveau des éléments. Ne définissez pas <code translate="no">element_scope</code> dans ce mode, car aucun regroupement au niveau des entités n’est effectué.</p>
<h2 id="Collapse-element-level-hits-for-entity-level-hybrid-search" class="common-anchor-header">Regroupement des résultats au niveau des éléments pour la recherche hybride au niveau des entités<button data-href="#Collapse-element-level-hits-for-entity-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Si une recherche hybride combine une requête « <code translate="no">AnnSearchRequest</code> » au niveau des éléments d’un StructArray avec une requête vectorielle au niveau de la collection, une requête «EmbeddingList» ou une requête au niveau des éléments sous un autre champ du StructArray, le champ d’application final des candidats est le niveau de l’entité. Dans ce cas, chaque « <code translate="no">AnnSearchRequest</code> » au niveau des éléments du StructArray est regroupée en candidats au niveau de l’entité avant le reclassement hybride.</p>
<p>Utilisez l’ <code translate="no">element_scope</code> à l’intérieur de l’ <code translate="no">params</code> de l’ <code translate="no">AnnSearchRequest</code> de niveau élément StructArray lorsque vous devez contrôler la manière dont plusieurs éléments correspondants issus de la même entité sont regroupés.</p>
<pre><code translate="no">title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    param={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;element_scope&quot;</span>: {
                <span class="hljs-string">&quot;collapse&quot;</span>: {
                    <span class="hljs-string">&quot;strategy&quot;</span>: <span class="hljs-string">&quot;topk_sum&quot;</span>,
                    <span class="hljs-string">&quot;topk&quot;</span>: 3,
                },
            },
        },
    },
    <span class="hljs-built_in">limit</span>=30,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[quality_score] &gt; 0.8)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">limit</span>=5,
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
<p>Dans cet exemple, la stratégie de regroupement ( <code translate="no">title_req</code> ) s’applique au niveau de l’entité ; le résultat hybride final est donc également au niveau de l’entité. La requête « <code translate="no">chunk_req</code> » renvoie d’abord les occurrences d’éléments issues de l’ <code translate="no">chunks[emb]</code>, puis regroupe les éléments renvoyés provenant de la même entité en additionnant les trois meilleurs scores d’éléments. Si l’attribut « <code translate="no">element_scope</code> » est omis alors qu’un regroupement au niveau de l’entité est nécessaire, la stratégie de regroupement par défaut est « <code translate="no">max</code> ».</p>
<h2 id="Choose-a-collapse-strategy" class="common-anchor-header">Choisissez une stratégie de regroupement<button data-href="#Choose-a-collapse-strategy" class="anchor-icon" translate="no">
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
<tr><th>Stratégie</th><th>Comportement</th><th><code translate="no">topk</code></th><th>Exigence de métrique</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max</code></td><td>Conserver le meilleur score des éléments renvoyés pour l’entité.</td><td>Non autorisé.</td><td>Toute métrique vectorielle régulière prise en charge.</td></tr>
<tr><td><code translate="no">sum</code></td><td>Faire la somme de tous les scores des éléments renvoyés pour l'entité.</td><td>Non autorisé.</td><td>Uniquement les métriques à corrélation positive, telles que <code translate="no">IP</code> ou <code translate="no">COSINE</code>.</td></tr>
<tr><td><code translate="no">avg</code></td><td>Calculer la moyenne de tous les scores des éléments renvoyés pour l'entité.</td><td>Non autorisé.</td><td>Toute métrique vectorielle régulière prise en charge.</td></tr>
<tr><td><code translate="no">topk_sum</code></td><td>Faites la somme des meilleurs scores des éléments renvoyés par « <code translate="no">K</code> » pour l’entité.</td><td>Obligatoire et doit être positif.</td><td>Uniquement les métriques à corrélation positive, telles que l'<code translate="no">IP</code> ou l'<code translate="no">COSINE</code>.</td></tr>
<tr><td><code translate="no">topk_avg</code></td><td>Calculer la moyenne des meilleurs scores d'éléments renvoyés par l'<code translate="no">K</code> pour l'entité.</td><td>Obligatoire et doit être positif.</td><td>Toute métrique vectorielle régulière prise en charge.</td></tr>
</tbody>
</table>
<p>La fonction « Collapse » utilise uniquement les occurrences d’éléments renvoyées par cette <code translate="no">AnnSearchRequest</code> au niveau des éléments de StructArray. Elle n’analyse pas chaque élément Struct de l’entité après la recherche ANN. Définissez la <code translate="no">limit</code> de la requête à une valeur suffisamment élevée pour fournir les éléments que vous souhaitez rendre disponibles pour la fonction « Collapse ».</p>
<h2 id="Add-filters-range-search-and-grouping" class="common-anchor-header">Ajouter des filtres, une recherche par plage et un regroupement<button data-href="#Add-filters-range-search-and-grouping" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez associer des <code translate="no">element_filter</code> à une <code translate="no">AnnSearchRequest</code> au niveau des éléments de StructArray lorsque des conditions scalaires doivent s’appliquer aux mêmes éléments Struct participant à la recherche vectorielle. Vous pouvez également utiliser une <code translate="no">filter</code> de niveau supérieur sur <code translate="no">hybrid_search()</code> pour les conditions relatives à l’entité parente.</p>
<p>Les champs vectoriels au niveau des éléments de StructArray prennent en charge la recherche par plage dans le cadre d’une recherche hybride. Ajoutez des requêtes de type « <code translate="no">radius</code> » et, éventuellement, « <code translate="no">range_filter</code> » à l’ <code translate="no">AnnSearchRequest</code> au niveau des éléments. Les requêtes StructArray au niveau de l’EmbeddingList ne prennent pas en charge la recherche par plage.</p>
<p>Le regroupement hybride au niveau des éléments n’est pris en charge que lorsque tous les objets ` <code translate="no">AnnSearchRequest</code> ` ciblent des champs vectoriels au niveau des éléments appartenant au même champ `StructArray`, et que ` <code translate="no">group_by_field</code> ` doit être la clé primaire. Le regroupement hybride n’est pas pris en charge lorsque la requête mélange des champs vectoriels au niveau des collections, différents champs `StructArray` ou des requêtes au niveau `EmbeddingList`. Ne combinez pas la recherche par plage avec le regroupement.</p>
<h2 id="Interpret-hybrid-results" class="common-anchor-header">Interpréter les résultats hybrides<button data-href="#Interpret-hybrid-results" class="anchor-icon" translate="no">
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
<tr><th>Portée finale des candidats</th><th>Clé de résultat</th><th>Comportement du décalage</th><th>Quand cela se produit</th></tr>
</thead>
<tbody>
<tr><td>Au niveau de l'entité</td><td>Clé primaire.</td><td>Aucun décalage d’élément dans le résultat final.</td><td>La requête hybride inclut un champ vectoriel au niveau de la collection, une requête EmbeddingList ou des requêtes au niveau des éléments sous différents champs StructArray.</td></tr>
<tr><td>Niveau élément</td><td>Clé primaire, champ StructArray parent et décalage de l'élément.</td><td>Le décalage de l’élément sélectionné peut être renvoyé lorsqu’il est exposé par l’API ou le SDK.</td><td>Tous les objets « <code translate="no">AnnSearchRequest</code> » sont au niveau des éléments et se trouvent sous le même champ StructArray.</td></tr>
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
<li><p>Utilisez « <code translate="no">element_scope</code> » uniquement pour les objets « <code translate="no">AnnSearchRequest</code> » au niveau des éléments de StructArray qui doivent être réduits à des candidats au niveau de l’entité dans le cadre d’une recherche hybride.</p></li>
<li><p>N’utilisez pas <code translate="no">element_scope</code> pour les requêtes EmbeddingList, les requêtes vectorielles au niveau de la collection ou la recherche hybride au niveau des éléments d’un même StructArray.</p></li>
<li><p><code translate="no">sum</code> Les stratégies de regroupement « and » et « <code translate="no">topk_sum</code> » nécessitent des métriques de corrélation positive, telles que « <code translate="no">IP</code> » ou « <code translate="no">COSINE</code> ». Ne les utilisez pas avec « <code translate="no">L2</code> ».</p></li>
<li><p><code translate="no">topk_sum</code> et <code translate="no">topk_avg</code> nécessitent une valeur positive pour <code translate="no">topk</code>. Les autres stratégies de regroupement ne doivent pas inclure <code translate="no">topk</code>.</p></li>
<li><p>Les requêtes StructArray au niveau EmbeddingList ne prennent pas en charge la recherche par plage ni le regroupement.</p></li>
<li><p>Le regroupement hybride n’est pris en charge que pour la recherche hybride au niveau des éléments d’un même StructArray et uniquement par clé primaire.</p></li>
<li><p>Ne combinez pas la recherche par plage avec le regroupement.</p></li>
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
<li><p>Ajouter « <code translate="no">element_scope</code> » à une requête hybride au niveau des éléments d’un même StructArray. Cette requête reste au niveau des éléments et n’effectue pas de regroupement au niveau des entités.</p></li>
<li><p>Ajouter des « <code translate="no">element_scope</code> » à une requête de type « <code translate="no">chunks[emb_list_vector]</code> ». La recherche « » s’effectue déjà au niveau de l’entité.</p></li>
<li><p>Supposer que deux champs StructArray partagent les mêmes décalages d’éléments. L’ <code translate="no">3</code> décalé dans <code translate="no">chunks</code> et l’ <code translate="no">3</code> décalé dans un autre champ StructArray correspondent à des éléments différents ; la requête hybride devient donc de niveau entité.</p></li>
<li><p>Utilisation de <code translate="no">topk_sum</code> avec <code translate="no">L2</code>. Utilisez <code translate="no">max</code>, <code translate="no">avg</code> ou <code translate="no">topk_avg</code> pour les métriques de distance négatives.</p></li>
<li><p>Les résultats hybrides au niveau de l’entité devraient inclure le décalage de l’élément Struct sélectionné après réduction.</p></li>
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
<li><p>Pour ajouter des filtres scalaires à la recherche hybride, consultez la section « <a href="/docs/fr/filtered-search-with-structarray.md">Recherche filtrée avec StructArray</a> ».</p></li>
<li><p>Pour utiliser des limites de score ou de distance dans la recherche hybride, consultez la section « <a href="/docs/fr/range-search-with-structarray.md">Recherche par plage avec StructArray</a> ».</p></li>
<li><p>Pour regrouper les résultats hybrides au niveau des éléments par entité parente, consultez la section « <a href="/docs/fr/grouping-search-with-structarray.md">Recherche groupée avec StructArray</a> ».</p></li>
<li><p>Pour vérifier les limites de recherche de StructArray, consultez la section « <a href="/docs/fr/structarray-limits.md">Limites de StructArray</a> ».</p></li>
</ol>
