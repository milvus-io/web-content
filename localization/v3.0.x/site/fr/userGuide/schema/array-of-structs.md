---
id: array-of-structs.md
title: Présentation de StructArray
summary: >-
  Utilisez StructArray lorsqu'une entité doit stocker une liste ordonnée
  d'éléments structurés, comme un document composé de plusieurs segments, une
  page comportant plusieurs éléments visuels ou une vidéo composée de plusieurs
  extraits. StructArray conserve ces éléments au sein de l'entité parente tout
  en permettant la recherche vectorielle et le filtrage scalaire sur les champs
  de chaque élément.
---
<h1 id="StructArray-Overview" class="common-anchor-header">Présentation de StructArray<button data-href="#StructArray-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilisez StructArray lorsqu'une entité doit stocker une liste ordonnée d'éléments structurés, tels qu'un document comportant plusieurs segments, une page comportant plusieurs éléments visuels ou une vidéo comportant plusieurs clips. StructArray conserve ces éléments au sein de l'entité parente tout en permettant la recherche vectorielle et le filtrage scalaire sur les champs de chaque élément.</p>
<h2 id="What-is-StructArray" class="common-anchor-header">Qu'est-ce qu'un StructArray ?<button data-href="#What-is-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p>Un <strong>StructArray</strong>, également appelé « tableau de structures », stocke un ensemble ordonné d’éléments Struct dans chaque entité. Chaque élément Struct du tableau suit le même schéma. Un élément Struct peut contenir des sous-champs scalaires, des sous-champs vectoriels, ou les deux.</p>
<p>Par exemple, une collection peut stocker un article en tant qu’entité et stocker ses segments dans un champ StructArray nommé « <code translate="no">chunks</code> ». Chaque segment peut inclure du texte, des métadonnées de section, des scores de qualité et un ou plusieurs vecteurs d’encodage.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;doc_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Vector search tuning guide&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;search&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.10</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.40</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Use HNSW efSearch to trade recall for latency.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.92</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.11</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.21</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.31</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.41</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.12</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.33</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.39</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Range search returns vectors within a distance boundary.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;search&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.86</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.18</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.23</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.29</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.36</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.19</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.24</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.37</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Les deux sous-champs vectoriels de cet exemple représentent le même fragment sous deux angles de recherche différents. ` <code translate="no">chunks[emb_list_vector]</code> ` est destiné à la recherche EmbeddingList avec des métriques de type « <code translate="no">MAX_SIM*</code> », tandis que ` <code translate="no">chunks[emb]</code> ` est destiné à la recherche au niveau des éléments avec des métriques vectorielles classiques telles que ` <code translate="no">COSINE</code>`, ` <code translate="no">IP</code>` ou ` <code translate="no">L2</code>`.</p>
</div>
<h2 id="When-to-use-StructArray" class="common-anchor-header">Quand utiliser StructArray<button data-href="#When-to-use-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilisez StructArray lorsque l'unité naturelle que vous souhaitez renvoyer est plus grande que l'unité naturelle que vous souhaitez rechercher ou filtrer.</p>
<table>
<thead>
<tr><th>Cas d'utilisation</th><th>Pourquoi StructArray est-il utile ?</th><th>Champ StructArray typique</th></tr>
</thead>
<tbody>
<tr><td>Récupération de documents</td><td>Stockez un document sous forme d’entité tout en effectuant des recherches sur ses segments.</td><td><code translate="no">chunks</code></td></tr>
<tr><td>Récupération par interaction tardive</td><td>Stockez un document ou une page sous forme de liste d'embeddings et évaluez-le à l'aide de l'<code translate="no">MAX_SIM*</code>.</td><td><code translate="no">chunks[emb_list_vector]</code> ou <code translate="no">patches[emb]</code></td></tr>
<tr><td>Récupération au niveau des éléments</td><td>Renvoyer le fragment, l'extrait, le patch ou l'observation le plus pertinent, y compris son décalage dans le tableau.</td><td><code translate="no">chunks[emb]</code></td></tr>
<tr><td>Filtrage structuré</td><td>Filtrer par sous-champs scalaires à l’intérieur d’éléments Struct, tels que section, score, page ou flags.</td><td><code translate="no">chunks[section]</code>, <code translate="no">chunks[quality_score]</code></td></tr>
<tr><td>Réduction des résultats parents en double</td><td>Conserver les éléments enfants sous la même entité parente au lieu de stocker chaque enfant dans une ligne distincte.</td><td><code translate="no">chunks</code>, <code translate="no">clips</code>, <code translate="no">patches</code></td></tr>
</tbody>
</table>
<h2 id="Decision-Matrix" class="common-anchor-header">Matrice de décision<button data-href="#Decision-Matrix" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilisez la matrice suivante pour choisir le chemin StructArray approprié.</p>
<table>
<thead>
<tr><th>Objectif</th><th>Chemin recommandé</th><th>Niveau de détail du résultat</th><th>Commencez par ici</th></tr>
</thead>
<tbody>
<tr><td>Modélisez un objet parent avec plusieurs enfants structurés.</td><td>Créez un champ StructArray.</td><td>L'entité contient des éléments Struct ordonnés.</td><td><a href="/docs/fr/create-structarray-field.md">Créer un champ StructArray</a></td></tr>
<tr><td>Insérez des enregistrements parents contenant des données enfants imbriquées.</td><td>Insérer des entités dont le champ StructArray est une liste d’objets Struct.</td><td>Insertion au niveau de l'entité.</td><td><a href="/docs/fr/insert-data-into-structarray-fields.md">Insérer des données dans des champs StructArray</a></td></tr>
<tr><td>Exécuter ColBERT, ColPali ou une recherche par interaction tardive au niveau du document.</td><td>Utiliser la recherche EmbeddingList avec un index « <code translate="no">MAX_SIM*</code> ».</td><td>Niveau de l’entité.</td><td><a href="/docs/fr/search-with-embedding-lists.md">Recherche avec des listes d’embeddings</a></td></tr>
<tr><td>Recherchez des segments, des extraits ou des fragments individuels.</td><td>Utilisez la recherche au niveau des éléments avec une métrique vectorielle standard.</td><td>Niveau des éléments de structure, avec décalage lorsque celui-ci est disponible.</td><td>Recherche vectorielle de base avec StructArray</td></tr>
<tr><td>Limitez la recherche vectorielle au niveau des éléments à ceux qui répondent à des conditions scalaires.</td><td>Utilisez ` <code translate="no">element_filter</code>`.</td><td>Filtrage au niveau des éléments ; la forme du résultat dépend du type de recherche.</td><td>Recherche filtrée avec StructArray</td></tr>
<tr><td>Sélectionnez des entités en fonction du nombre d’éléments Struct qui satisfont une condition.</td><td>Utilisez <code translate="no">MATCH_ANY</code>, <code translate="no">MATCH_ALL</code>, <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> ou <code translate="no">MATCH_EXACT</code>.</td><td>Niveau de l'entité.</td><td><a href="/docs/fr/struct-array-operators.md">Opérateurs StructArray</a></td></tr>
<tr><td>Utilisez des limites de score ou de distance sur les sous-champs vectoriels de StructArray.</td><td>Utilisez la recherche par plage au niveau des éléments.</td><td>Niveau des éléments de Struct.</td><td>Recherche par plage avec StructArray</td></tr>
<tr><td>Renvoie au maximum un résultat par entité parente après une recherche au niveau des éléments.</td><td>Utiliser la recherche par regroupement selon la clé primaire.</td><td>Niveau de l'entité après regroupement.</td><td>Recherche groupée avec StructArray</td></tr>
<tr><td>Combiner la recherche d'éléments StructArray avec un autre champ vectoriel.</td><td>Utiliser une recherche hybride avec une requête AnnSearchRequest ciblant un sous-champ vectoriel de StructArray.</td><td>Sous-recherche au niveau des éléments, reclassement au niveau de l'entité.</td><td>Recherche hybride avec StructArray</td></tr>
</tbody>
</table>
<h2 id="Understand-the-two-search-models" class="common-anchor-header">Comprendre les deux modèles de recherche<button data-href="#Understand-the-two-search-models" class="anchor-icon" translate="no">
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
<tr><th>### Recherche EmbeddingList La recherche EmbeddingList traite les vecteurs contenus dans un sous-champ vectoriel StructArray comme une seule liste d’embeddings pour l’entité parente. La requête est également une liste d’embeddings. Milvus compare la liste d’embeddings de la requête à la liste d’embeddings stockée à l’aide d’une métrique « <code translate="no">MAX_SIM*</code> » et renvoie les entités correspondantes. - Données de requête : liste d’embeddings. - Famille de métriques : <code translate="no">MAX_SIM*</code>. - Granularité des résultats : niveau de l’entité. - Idéal pour : la recherche à interaction tardive au niveau du document ou de la page.</th><th>### Recherche au niveau des éléments La recherche au niveau des éléments traite chaque élément Struct comme un candidat indépendant à la recherche vectorielle. Chaque résultat correspond à un élément apparié au sein du champ StructArray, et les résultats non regroupés peuvent indiquer le décalage de l’élément. - Données de requête : vecteur standard. - Famille de métriques : métriques vectorielles standard. - Granularité des résultats : niveau des éléments Struct. - Idéal pour : la recherche au niveau des blocs, des extraits ou des segments.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<div class="alert note">
<p>Avertissement</p>
<p>Si votre collection nécessite à la fois la recherche EmbeddingList et la recherche au niveau des éléments, utilisez deux sous-champs vectoriels distincts. Un champ vectoriel ou un sous-champ vectoriel n'accepte qu'un seul index, et les deux modes de recherche requièrent des familles de métriques différentes.</p>
</div>
<h2 id="Documentation-map" class="common-anchor-header">Plan de la documentation<button data-href="#Documentation-map" class="anchor-icon" translate="no">
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
    </button></h2><p>La documentation de StructArray est divisée en pages de modélisation et en pages de recherche. Utilisez les pages de modélisation pour définir et préparer les données. Utilisez les pages de recherche pour choisir le comportement de recherche et de filtrage approprié.</p>
<table>
<thead>
<tr><th>Zone</th><th>Page</th><th>À utiliser pour</th></tr>
</thead>
<tbody>
<tr><td>Modélisation</td><td><a href="/docs/fr/create-structarray-field.md">Créer un champ StructArray</a></td><td>Définir le schéma Struct et ajouter un champ StructArray.</td></tr>
<tr><td>Modélisation</td><td><a href="/docs/fr/insert-data-into-structarray-fields.md">Insérer des données dans les champs StructArray</a></td><td>Préparez et insérez des données StructArray imbriquées.</td></tr>
<tr><td>Modélisation</td><td><a href="/docs/fr/index-structarray-fields.md">Indexer les champs StructArray</a></td><td>Créer des index vectoriels et scalaires sur les sous-champs d’un StructArray.</td></tr>
<tr><td>Référence</td><td><a href="/docs/fr/structarray-limits.md">Limites de StructArray</a></td><td>Vérifier les limites relatives au schéma, au type de données, aux index, à la recherche, au filtrage et à la version.</td></tr>
<tr><td>Recherche</td><td>Recherche vectorielle de base avec StructArray</td><td>Comparez la recherche EmbeddingList et la recherche vectorielle au niveau des éléments.</td></tr>
<tr><td>Recherche</td><td>Recherche par plage avec StructArray</td><td>Utilisez des contraintes de plage avec les sous-champs vectoriels de StructArray.</td></tr>
<tr><td>Recherche</td><td>Recherche par regroupement avec StructArray</td><td>Regrouper les résultats de recherche au niveau des éléments par clé primaire.</td></tr>
<tr><td>Recherche</td><td>Recherche hybride avec StructArray</td><td>Combiner la recherche au niveau des éléments de StructArray avec d'autres recherches vectorielles.</td></tr>
<tr><td>Recherche</td><td>Recherche filtrée avec StructArray</td><td>Utilisez les filtres StructArray dans la recherche, la requête et la recherche hybride.</td></tr>
<tr><td>Recherche</td><td><a href="/docs/fr/search-with-embedding-lists.md">Recherche avec des listes d’embeddings</a></td><td>Créez des systèmes de recherche de type ColBERT et ColPali avec StructArray.</td></tr>
<tr><td>Filtre</td><td><a href="/docs/fr/struct-array-operators.md">Opérateurs StructArray</a></td><td>Syntaxe de référence pour les opérateurs « <code translate="no">element_filter</code> » et « <code translate="no">MATCH_*</code> ».</td></tr>
</tbody>
</table>
<h2 id="Key-limits-to-check-first" class="common-anchor-header">Limites clés à vérifier en premier lieu<button data-href="#Key-limits-to-check-first" class="anchor-icon" translate="no">
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
<li><p>Struct peut être utilisé comme type d'élément d'un champ Array. Il n'est pas utilisé comme champ de collection de niveau supérieur.</p></li>
<li><p>Tous les éléments Struct d’un même champ StructArray partagent un schéma prédéfini.</p></li>
<li><p>Les sous-champs de type « Vector » nécessitent des index. La recherche EmbeddingList utilise les métriques « <code translate="no">MAX_SIM*</code> », tandis que la recherche au niveau des éléments utilise les métriques vectorielles standard.</p></li>
<li><p><code translate="no">element_filter</code> et « <code translate="no">MATCH_*</code> » s’appliquent aux sous-champs scalaires à l’intérieur des champs StructArray. N’utilisez « <code translate="no">$[subfield]</code> » qu’à l’intérieur de ces opérateurs.</p></li>
<li><p>Certaines combinaisons de recherche dépendent de la version ou sont spécifiques à un mode. Consultez <a href="/docs/fr/structarray-limits.md">les limites de StructArray</a> avant d’utiliser la recherche par plage, la recherche par regroupement, la recherche hybride, les champs pouvant prendre la valeur null ou les champs ajoutés dynamiquement.</p></li>
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
<li><p>Pour concevoir un schéma, consultez la section <a href="/docs/fr/create-structarray-field.md">Créer un champ StructArray</a>.</p></li>
<li><p>Pour préparer les données, consultez la section « <a href="/docs/fr/insert-data-into-structarray-fields.md">Insérer des données dans des champs StructArray</a> ».</p></li>
<li><p>Pour choisir des index, consultez la section « <a href="/docs/fr/index-structarray-fields.md">Indexer des champs StructArray</a> ».</p></li>
<li><p>Pour effectuer une recherche dans les sous-champs vectoriels de StructArray, commencez par la section « Recherche vectorielle de base avec StructArray ».</p></li>
<li><p>Pour filtrer les sous-champs scalaires de StructArray, consultez les sections « <a href="/docs/fr/struct-array-operators.md">Opérateurs StructArray</a> » et « Recherche filtrée avec StructArray ».</p></li>
</ol>
