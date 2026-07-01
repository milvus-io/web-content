---
id: basic-vector-search-with-structarray.md
title: Recherche vectorielle de base avec StructArray
summary: >-
  Cette page vous permet d'effectuer une recherche vectorielle sur les
  sous-champs vectoriels d'un champ StructArray. StructArray prend en charge
  deux modes de recherche vectorielle de base : la recherche « EmbeddingList »,
  qui évalue une liste d'embeddings stockée dans chaque entité, et la recherche
  au niveau des éléments, qui explore chaque élément Struct indépendamment.
---
<h1 id="Basic-Vector-Search-with-StructArray" class="common-anchor-header">Recherche vectorielle de base avec StructArray<button data-href="#Basic-Vector-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilisez cette page pour effectuer une recherche vectorielle sur les sous-champs vectoriels d’un champ StructArray. StructArray prend en charge deux modes de recherche vectorielle de base : la recherche EmbeddingList, qui évalue une liste d’embeddings stockée dans chaque entité, et la recherche au niveau des éléments, qui explore chaque élément Struct indépendamment.</p>
<p>Cette page utilise la collection « <code translate="no">tech_articles</code> » issue de la section <a href="/docs/fr/create-structarray-field.md">«Créer un champ StructArray</a>». Cette collection comporte un champ StructArray nommé « <code translate="no">chunks</code> ». Chaque bloc contient du texte, des métadonnées scalaires, un sous-champ vectoriel nommé « <code translate="no">emb_list_vector</code> » avec un index pour la recherche EmbeddingList, et un sous-champ vectoriel nommé « <code translate="no">emb</code> » avec un index pour la recherche au niveau des éléments.</p>
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
    </button></h2><p>Assurez-vous que le schéma de la collection, les données et les index sont déjà prêts.</p>
<table>
<thead>
<tr><th>Prérequis</th><th>Où les préparer</th></tr>
</thead>
<tbody>
<tr><td>Créez un champ StructArray, tel que <code translate="no">chunks</code>.</td><td><a href="/docs/fr/create-structarray-field.md">Créer un champ StructArray</a></td></tr>
<tr><td>Insérez des entités dont le champ « <code translate="no">chunks</code> » contient des objets Struct.</td><td><a href="/docs/fr/insert-data-into-structarray-fields.md">Insérer des données dans les champs StructArray</a></td></tr>
<tr><td>Créez un index « <code translate="no">MAX_SIM*</code> » sur « <code translate="no">chunks[emb_list_vector]</code> » pour la recherche dans EmbeddingList.</td><td><a href="/docs/fr/index-structarray-fields.md">Indexer les champs StructArray</a></td></tr>
<tr><td>Créer un index métrique vectoriel standard sur « <code translate="no">chunks[emb]</code> » pour la recherche au niveau des éléments.</td><td><a href="/docs/fr/index-structarray-fields.md">Indexer les champs StructArray</a></td></tr>
</tbody>
</table>
<div class="alert note">
<p>Avertissement</p>
<p>Un champ vectoriel ou un sous-champ vectoriel n'accepte qu'un seul index. Si vous avez besoin à la fois de la recherche EmbeddingList et de la recherche au niveau des éléments, créez deux sous-champs vectoriels distincts. Sur cette page, <code translate="no">chunks[emb_list_vector]</code> est indexé pour la recherche EmbeddingList, et <code translate="no">chunks[emb]</code> est indexé pour la recherche au niveau des éléments.</p>
</div>
<h2 id="Choose-a-search-mode" class="common-anchor-header">Choisissez un mode de recherche<button data-href="#Choose-a-search-mode" class="anchor-icon" translate="no">
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
<tr><th>Aspect</th><th>Recherche dans EmbeddingList</th><th>Recherche au niveau des éléments</th></tr>
</thead>
<tbody>
<tr><td>Sous-champ cible</td><td><code translate="no">chunks[emb_list_vector]</code></td><td><code translate="no">chunks[emb]</code></td></tr>
<tr><td>Données de requête</td><td>Une liste d'embeddings contenant un ou plusieurs vecteurs.</td><td>Un vecteur standard.</td></tr>
<tr><td>Famille de métriques</td><td><code translate="no">MAX_SIM*</code>, telle que <code translate="no">MAX_SIM_COSINE</code>.</td><td>Des métriques vectorielles classiques, telles que <code translate="no">COSINE</code>, <code translate="no">IP</code> ou <code translate="no">L2</code>.</td></tr>
<tr><td>Ce que représente un résultat</td><td>Une entité correspondante dont le sous-champ vectoriel StructArray est similaire à la liste d’embeddings de la requête.</td><td>Un élément Struct correspondant à l’intérieur du champ StructArray.</td></tr>
<tr><td>Granularité des résultats</td><td>Au niveau de l’entité.</td><td>Niveau de l'élément Struct.</td></tr>
<tr><td>Décalage</td><td>Sans objet.</td><td>Identifie la position (à partir de zéro) de l’élément Struct correspondant lors de son renvoi.</td></tr>
<tr><td>Utilisation typique</td><td>ColBERT, ColPali et autres modèles de recherche à interaction tardive.</td><td>Récupération au niveau des segments, des passages, des extraits, des fragments ou des faits.</td></tr>
</tbody>
</table>
<h2 id="Run-EmbeddingList-search" class="common-anchor-header">Lancer une recherche EmbeddingList<button data-href="#Run-EmbeddingList-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilisez la recherche EmbeddingList lorsque la requête elle-même contient plusieurs vecteurs et que le sous-champ du vecteur StructArray cible est indexé à l’aide d’une métrique de type « <code translate="no">MAX_SIM*</code> ». Le résultat correspond à une correspondance au niveau de l’entité.</p>
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
    limit=<span class="hljs-number">3</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;id&quot;</span>], hit[<span class="hljs-string">&quot;distance&quot;</span>], hit[<span class="hljs-string">&quot;entity&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>Dans ce mode de recherche, l’ <code translate="no">limit</code> contrôle le nombre d’entités renvoyées pour chaque requête. Le résultat peut inclure des sous-champs StructArray, mais le résultat lui-même représente l’entité parente correspondante plutôt qu’un élément Struct spécifique.</p>
<div class="alert note">
<p>Pour un guide complet de type ColBERT ou ColPali, consultez la section « <a href="/docs/fr/search-with-embedding-lists.md">Recherche avec des listes d’embeddings</a> ». Cette page ne traite que du comportement de base de la recherche StructArray.</p>
</div>
<h2 id="Run-element-level-search" class="common-anchor-header">Lancer une recherche au niveau des éléments<button data-href="#Run-element-level-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilisez la recherche au niveau des éléments lorsque chaque élément Struct doit participer indépendamment à la recherche vectorielle. La requête est un vecteur standard, et le sous-champ du vecteur cible doit être indexé à l’aide d’une métrique vectorielle standard.</p>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">5</span>,
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
<p>Dans la recherche au niveau des éléments, chaque résultat correspond à un élément Struct trouvé. La valeur « <code translate="no">offset</code> » correspond à la position (à partir de zéro) de cet élément dans le champ StructArray. Une même entité peut apparaître plusieurs fois si plusieurs éléments Struct correspondent à la requête. La valeur « <code translate="no">limit</code> » s’applique aux résultats au niveau des éléments, et non aux entités parentes uniques.</p>
<h2 id="Interpret-results" class="common-anchor-header">Interprétation des résultats<button data-href="#Interpret-results" class="anchor-icon" translate="no">
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
<tr><th>Élément de résultat</th><th>Recherche dans EmbeddingList</th><th>Recherche au niveau des éléments</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">id</code></td><td>Clé primaire de l’entité correspondante.</td><td>Clé primaire de l’entité contenant l’élément Struct correspondant.</td></tr>
<tr><td><code translate="no">distance</code> ou score</td><td>Score ou distance entre la liste d'embeddings de la requête et la liste d'embeddings stockée.</td><td>Score ou distance entre le vecteur de requête et le vecteur de l'élément Struct correspondant.</td></tr>
<tr><td><code translate="no">offset</code></td><td>Sans objet.</td><td>Position (à partir de zéro) de l’élément Struct correspondant lors de son renvoi.</td></tr>
<tr><td>Clés primaires répétées</td><td>Non prévu pour une requête unique, car les résultats sont au niveau de l’entité.</td><td>Possible, car plusieurs éléments Struct d’une même entité peuvent correspondre.</td></tr>
<tr><td>Champs de sortie StructArray demandés</td><td>Renvoyés à partir de l’entité correspondante.</td><td>Renvoyés avec la forme de résultat au niveau des éléments prise en charge par l’API et le SDK cibles.</td></tr>
</tbody>
</table>
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
<li><p>Utilisation de « <code translate="no">chunks.emb</code> » au lieu de la syntaxe requise pour le chemin d’accès au sous-champ : « <code translate="no">chunks[emb]</code> ».</p></li>
<li><p>Utilisation d’une requête EmbeddingList sur un sous-champ vectoriel indexé avec une métrique vectorielle standard.</p></li>
<li><p>Utilisation d’une requête vectorielle standard sur un sous-champ vectoriel indexé avec une métrique de type « <code translate="no">MAX_SIM*</code> ».</p></li>
<li><p>S’attendre à ce qu’une recherche au niveau des éléments ( <code translate="no">limit</code> ) renvoie autant d’entités parentes uniques. Elle renvoie des résultats au niveau des éléments.</p></li>
<li><p>S’attendre à ce qu’une recherche EmbeddingList renvoie un décalage d’élément spécifique. Elle renvoie des correspondances au niveau de l’entité.</p></li>
<li><p>Réutilisation d’un même sous-champ vectoriel pour les deux modes de recherche. Utilisez des sous-champs vectoriels distincts, car chaque sous-champ vectoriel n’accepte qu’un seul index.</p></li>
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
<li><p>Pour restreindre la recherche au niveau des éléments à l’aide de conditions scalaires, consultez la section « <a href="/docs/fr/filtered-search-with-structarray.md">Recherche filtrée avec StructArray</a> ».</p></li>
<li><p>Pour effectuer une recherche par score ou par limites de distance, consultez la section « <a href="/docs/fr/range-search-with-structarray.md">Recherche par plage avec StructArray</a> ».</p></li>
<li><p>Pour renvoyer au maximum un résultat par entité parente après une recherche au niveau des éléments, consultez la section « <a href="/docs/fr/grouping-search-with-structarray.md">Recherche groupée avec StructArray</a> ».</p></li>
<li><p>Pour combiner la recherche StructArray avec d’autres recherches vectorielles, consultez la section « <a href="/docs/fr/hybrid-search-with-structarray.md">Recherche hybride avec StructArray</a> ».</p></li>
<li><p>Pour connaître les types de données, les métriques, les filtres et les limites spécifiques à chaque version pris en charge, consultez la section « <a href="/docs/fr/structarray-limits.md">Limites de StructArray</a> ».</p></li>
</ol>
