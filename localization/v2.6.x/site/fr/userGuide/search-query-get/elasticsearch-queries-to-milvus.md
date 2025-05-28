---
id: elasticsearch-queries-to-milvus.md
title: Requêtes Elasticsearch vers Milvus
summary: >-
  Elasticsearch, basé sur Apache Lucene, est un moteur de recherche open-source
  de premier plan. Cependant, il est confronté à des défis dans les applications
  modernes d'intelligence artificielle, notamment des coûts de mise à jour
  élevés, des performances en temps réel médiocres, une gestion inefficace des
  blocs de données, une conception non native dans le nuage et des demandes de
  ressources excessives. En tant que base de données vectorielle native, Milvus
  surmonte ces problèmes grâce au stockage et au calcul découplés, à
  l'indexation efficace des données à haute dimension et à l'intégration
  transparente avec les infrastructures modernes. Elle offre des performances et
  une évolutivité supérieures pour les charges de travail d'IA.
---
<h1 id="Elasticsearch-Queries-to-Milvus" class="common-anchor-header">Requêtes Elasticsearch vers Milvus<button data-href="#Elasticsearch-Queries-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Elasticsearch, basé sur Apache Lucene, est un moteur de recherche open-source de premier plan. Cependant, il est confronté à des défis dans les applications d'IA modernes, notamment des coûts de mise à jour élevés, des performances en temps réel médiocres, une gestion inefficace des blocs de données, une conception non native dans le nuage et des demandes de ressources excessives. En tant que base de données vectorielle native, Milvus surmonte ces problèmes grâce au stockage et au calcul découplés, à l'indexation efficace des données à haute dimension et à l'intégration transparente avec les infrastructures modernes. Il offre des performances et une évolutivité supérieures pour les charges de travail d'IA.</p>
<p>Cet article vise à faciliter la migration de votre base de code d'Elasticsearch vers Milvus, en fournissant divers exemples de conversion de requêtes entre les deux.</p>
<h2 id="Overview" class="common-anchor-header">Vue d'ensemble<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans Elasticsearch, les opérations dans le contexte de la requête génèrent des scores de pertinence, alors que celles dans le contexte du filtre ne le font pas. De même, les recherches Milvus produisent des scores de similarité, alors que ses requêtes de type filtre n'en produisent pas. Lors de la migration de votre base de code d'Elasticsearch vers Milvus, le principe clé consiste à convertir les champs utilisés dans le contexte de requête d'Elasticsearch en champs vectoriels pour permettre la génération de scores de similarité.</p>
<p>Le tableau ci-dessous présente certains modèles de requête Elasticsearch et leurs équivalents correspondants dans Milvus.</p>
<table>
   <tr>
     <th><p>Requêtes Elasticsearch</p></th>
     <th><p>Équivalents Milvus</p></th>
     <th><p>Remarques</p></th>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Requêtes en texte intégral</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/elasticsearch-queries-to-milvus.md#Match-query">Requête de correspondance</a></p></td>
     <td><p>Recherche en texte intégral</p></td>
     <td><p>Les deux offrent des fonctionnalités similaires.</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Requêtes au niveau des termes</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/elasticsearch-queries-to-milvus.md#IDs">ID</a></p></td>
     <td><p><code translate="no">in</code> opérateur</p></td>
     <td rowspan="6"><p>Ces deux types de requêtes offrent des fonctionnalités identiques ou similaires lorsque ces requêtes Elasticsearch sont utilisées dans le contexte d'un filtre.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/elasticsearch-queries-to-milvus.md#Prefix-query">Requête par préfixe</a></p></td>
     <td><p><code translate="no">like</code> opérateur</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/elasticsearch-queries-to-milvus.md#Range-query">Requête de plage</a></p></td>
     <td><p>Opérateurs de comparaison tels que <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, et <code translate="no">&lt;=</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/elasticsearch-queries-to-milvus.md#Term-query">Requête par terme</a></p></td>
     <td><p>Opérateurs de comparaison comme <code translate="no">==</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/elasticsearch-queries-to-milvus.md#Terms-query">Requête de termes</a></p></td>
     <td><p><code translate="no">in</code> opérateur</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/elasticsearch-queries-to-milvus.md#Wildcard-query">L'opérateur de recherche</a></p></td>
     <td><p><code translate="no">like</code> opérateur</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/elasticsearch-queries-to-milvus.md#Boolean-query">Requête booléenne</a></p></td>
     <td><p>Opérateurs logiques comme <code translate="no">AND</code></p></td>
     <td><p>Ces deux opérateurs offrent des possibilités similaires lorsqu'ils sont utilisés dans le contexte d'un filtre.</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Requêtes vectorielles</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/elasticsearch-queries-to-milvus.md#Knn-query">Requête kNN</a></p></td>
     <td><p>Recherche</p></td>
     <td><p>Milvus offre des fonctionnalités de recherche vectorielle plus avancées.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/elasticsearch-queries-to-milvus.md#Reciprocal-rank-fusion">Fusion réciproque des rangs</a></p></td>
     <td><p>Recherche hybride</p></td>
     <td><p>Milvus prend en charge plusieurs stratégies de reclassement.</p></td>
   </tr>
</table>
<h2 id="Full-text-queries" class="common-anchor-header">Requêtes en texte intégral<button data-href="#Full-text-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans Elasticsearch, les requêtes en texte intégral vous permettent de rechercher des champs de texte analysés tels que le corps d'un courrier électronique. La chaîne de requête est traitée à l'aide du même analyseur que celui appliqué au champ lors de l'indexation.</p>
<h3 id="Match-query" class="common-anchor-header">Requête de correspondance</h3><p>Dans Elasticsearch, une requête de correspondance renvoie les documents qui correspondent à un texte, un nombre, une date ou une valeur booléenne. Le texte fourni est analysé avant la mise en correspondance.</p>
<p>Voici un exemple de requête de recherche Elasticsearch avec une requête de correspondance.</p>
<pre><code translate="no" class="language-bash">resp = client.search(
    query={
        <span class="hljs-string">&quot;match&quot;</span>: {
            <span class="hljs-string">&quot;message&quot;</span>: {
                <span class="hljs-string">&quot;query&quot;</span>: <span class="hljs-string">&quot;this is a test&quot;</span>
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus offre la même possibilité grâce à la fonction de recherche en texte intégral. Vous pouvez convertir la requête Elasticsearch ci-dessus dans Milvus comme suit :</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[<span class="hljs-string">&#x27;How is the weather in Jamaica?&#x27;</span>],
    anns_field=<span class="hljs-string">&quot;message_sparse&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;message&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans l'exemple ci-dessus, <code translate="no">message_sparse</code> est un champ de vecteurs clairsemés dérivé d'un champ VarChar nommé <code translate="no">message</code>. Milvus utilise le modèle d'intégration BM25 pour convertir les valeurs du champ <code translate="no">message</code> en intégrations de vecteurs éparses et les stocke dans le champ <code translate="no">message_sparse</code>. Lors de la réception de la demande de recherche, Milvus incorpore la charge utile de la requête en texte brut à l'aide du même modèle BM25 et effectue une recherche de vecteur clair et renvoie les champs <code translate="no">id</code> et <code translate="no">message</code> spécifiés dans le paramètre <code translate="no">output_fields</code> ainsi que les scores de similarité correspondants.</p>
<p>Pour utiliser cette fonctionnalité, vous devez activer l'analyseur sur le champ <code translate="no">message</code> et définir une fonction pour en déduire le champ <code translate="no">message_sparse</code>. Pour obtenir des instructions détaillées sur l'activation de l'analyseur et la création de la fonction dérivée dans Milvus, reportez-vous à la section <a href="/docs/fr/full-text-search.md">Recherche en texte intégral</a>.</p>
<h2 id="Term-level-queries" class="common-anchor-header">Requêtes au niveau des termes<button data-href="#Term-level-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans Elasticsearch, les requêtes au niveau du terme sont utilisées pour trouver des documents basés sur des valeurs exactes dans des données structurées, telles que des plages de dates, des adresses IP, des prix ou des identifiants de produits. Cette section présente les équivalents possibles de certaines requêtes de niveau terme d'Elasticsearch dans Milvus. Tous les exemples de cette section sont adaptés pour fonctionner dans le contexte du filtre afin de s'aligner sur les capacités de Milvus.</p>
<h3 id="IDs" class="common-anchor-header">ID</h3><p>Dans Elasticsearch, vous pouvez rechercher des documents en fonction de leur ID dans le contexte du filtre comme suit :</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;ids&quot;</span>: {
                    <span class="hljs-string">&quot;values&quot;</span>: [
                        <span class="hljs-string">&quot;1&quot;</span>,
                        <span class="hljs-string">&quot;4&quot;</span>,
                        <span class="hljs-string">&quot;100&quot;</span>
                    ]
                }            
            }
        }
    },
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans Milvus, vous pouvez également trouver des entités sur la base de leurs ID comme suit :</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the filter parameter</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id in [1, 4, 100]&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>]
)

<span class="hljs-comment"># Use the ids parameter</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    ids=[<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">100</span>],
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Vous trouverez l'exemple Elasticsearch sur <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-ids-query.html">cette page</a>. Pour plus de détails sur les requêtes et les demandes d'obtention ainsi que sur les expressions de filtrage dans Milvus, reportez-vous à <a href="/docs/fr/get-and-scalar-query.md">Requête</a> et <a href="/docs/fr/filtering">filtrage</a>.</p>
<h3 id="Prefix-query" class="common-anchor-header">Requête de préfixe</h3><p>Dans Elasticsearch, vous pouvez rechercher des documents qui contiennent un préfixe spécifique dans un champ fourni dans le contexte de filtrage comme suit :</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                 <span class="hljs-string">&quot;prefix&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;ki&quot;</span>
                    }
                }           
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Dans Milvus, vous pouvez trouver les entités dont les valeurs commencent par le préfixe spécifié comme suit :</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;ki%&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Vous trouverez l'exemple Elasticsearch sur <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-prefix-query.html">cette page</a>. Pour plus de détails sur l'opérateur <code translate="no">like</code> dans Milvus, reportez-vous à la section <a href="/docs/fr/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching">Utilisation de </a><code translate="no">LIKE</code><a href="/docs/fr/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching"> pour la recherche de motifs</a>.</p>
<h3 id="Range-query" class="common-anchor-header">Requête de plage</h3><p>Dans Elasticsearch, vous pouvez rechercher des documents qui contiennent des termes dans une plage donnée, comme suit : Dans Milvus, vous pouvez rechercher des documents qui contiennent des termes dans une plage donnée :</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;range&quot;</span>: {
                    <span class="hljs-string">&quot;age&quot;</span>: {
                        <span class="hljs-string">&quot;gte&quot;</span>: <span class="hljs-number">10</span>,
                        <span class="hljs-string">&quot;lte&quot;</span>: <span class="hljs-number">20</span>
                    }
                }           
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Dans Milvus, vous pouvez rechercher les entités dont les valeurs d'un champ spécifique se situent dans une plage donnée, comme suit :</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;10 &lt;= age &lt;= 20&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Vous trouverez l'exemple Elasticsearch sur <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html">cette page</a>. Pour plus de détails sur les opérateurs de comparaison dans Milvus, voir <a href="/docs/fr/basic-operators.md#Comparison-operators">Opérateurs de comparaison</a>.</p>
<h3 id="Term-query" class="common-anchor-header">Requête de terme</h3><p>Dans Elasticsearch, vous pouvez rechercher des documents qui contiennent un terme <strong>exact</strong> dans un champ fourni, comme suit :</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;status&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;retired&quot;</span>
                    }
                }            
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Dans Milvus, vous pouvez rechercher les entités dont les valeurs dans le champ spécifié correspondent exactement au terme spécifié comme suit :</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use ==</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;status==&quot;retired&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)

<span class="hljs-comment"># use TEXT_MATCH</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(status, &quot;retired&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Vous trouverez l'exemple Elasticsearch sur <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html">cette page</a>. Pour plus de détails sur les opérateurs de comparaison dans Milvus, voir <a href="/docs/fr/basic-operators.md#Comparison-operators">Opérateurs de comparaison</a>.</p>
<h3 id="Terms-query" class="common-anchor-header">Requête de termes</h3><p>Dans Elasticsearch, vous pouvez rechercher des documents qui contiennent un ou plusieurs termes <strong>exacts</strong> dans un champ fourni, comme suit :</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;terms&quot;</span>: {
                    <span class="hljs-string">&quot;degree&quot;</span>: [
                        <span class="hljs-string">&quot;graduate&quot;</span>,
                        <span class="hljs-string">&quot;post-graduate&quot;</span>
                    ]
                }        
            }
        }
    }
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus n'a pas d'équivalence complète de celle-ci. Cependant, vous pouvez trouver les entités dont les valeurs dans le champ spécifié sont l'un des termes spécifiés comme suit :</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use in</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;degree in [&quot;graduate&quot;, &quot;post-graduate&quot;]&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;degree&quot;</span>]
)

<span class="hljs-comment"># use TEXT_MATCH</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(degree, &quot;graduate post-graduate&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;degree&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Vous trouverez l'exemple Elasticsearch sur <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html">cette page</a>. Pour plus de détails sur les opérateurs de plage dans Milvus, reportez-vous à <a href="/docs/fr/basic-operators.md#Range-operators">Opérateurs de plage</a>.</p>
<h3 id="Wildcard-query" class="common-anchor-header">Requête de caractères génériques</h3><p>Dans Elasticsearch, vous pouvez rechercher des documents qui contiennent des termes correspondant à un motif de caractère générique, comme suit : Milvus ne prend pas en charge les caractères génériques :</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;wildcard&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;ki*y&quot;</span>
                    }
                }          
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus ne prend pas en charge les caractères génériques dans ses conditions de filtrage. Cependant, vous pouvez utiliser l'opérateur <code translate="no">like</code> pour obtenir un effet similaire, comme suit :</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;ki%&quot; AND user like &quot;%y&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Vous trouverez l'exemple Elasticsearch sur <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-wildcard-query.html">cette page</a>. Pour plus de détails sur les opérateurs de plage dans Milvus, reportez-vous à <a href="/docs/fr/basic-operators.md#Range-operators">Opérateurs de plage</a>.</p>
<h2 id="Boolean-query" class="common-anchor-header">Requête booléenne<button data-href="#Boolean-query" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans Elasticsearch, une requête booléenne est une requête qui fait correspondre des documents à des combinaisons booléennes d'autres requêtes.</p>
<p>L'exemple suivant est adapté d'un exemple de la documentation Elasticsearch sur <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html">cette page</a>. La requête renvoie les utilisateurs dont le nom contient <code translate="no">kimchy</code> avec une balise <code translate="no">production</code>.</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: <span class="hljs-string">&quot;kimchy&quot;</span>
                }
            },
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;tags&quot;</span>: <span class="hljs-string">&quot;production&quot;</span>
                }
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Dans Milvus, vous pouvez faire la même chose comme suit :</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = 

res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;%kimchy%&quot; AND ARRAY_CONTAINS(tags, &quot;production&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;tags&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>L'exemple ci-dessus suppose que vous disposez d'un champ <code translate="no">user</code> de type <strong>VarChar</strong> et d'un champ <code translate="no">tags</code> de type <strong>Array</strong> dans la collection cible. La requête renverra les utilisateurs dont le nom contient <code translate="no">kimchy</code> avec une balise <code translate="no">production</code>.</p>
<h2 id="Vector-queries" class="common-anchor-header">Requêtes vectorielles<button data-href="#Vector-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans Elasticsearch, les requêtes vectorielles sont des requêtes spécialisées qui utilisent des champs vectoriels pour effectuer une recherche sémantique efficace.</p>
<h3 id="Knn-query" class="common-anchor-header">Requête Knn</h3><p>Elasticsearch prend en charge les requêtes kNN approximatives et les requêtes kNN exactes à force brute. Vous pouvez trouver les <em>k</em> vecteurs les plus proches d'un vecteur de requête de l'une ou l'autre manière, mesurés par une métrique de similarité, comme suit :</p>
<pre><code translate="no" class="language-python">resp = client.search(
    index=<span class="hljs-string">&quot;my-image-index&quot;</span>,
    size=<span class="hljs-number">3</span>,
    query={
        <span class="hljs-string">&quot;knn&quot;</span>: {
            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;image-vector&quot;</span>,
            <span class="hljs-string">&quot;query_vector&quot;</span>: [
                -<span class="hljs-number">5</span>,
                <span class="hljs-number">9</span>,
                -<span class="hljs-number">12</span>
            ],
            <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">10</span>
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus, en tant que base de données vectorielle spécialisée, utilise des types d'index pour optimiser les recherches vectorielles. En règle générale, il donne la priorité à la recherche approximative du plus proche voisin (ANN) pour les données vectorielles de haute dimension. Bien que la recherche kNN par force brute avec le type d'index FLAT produise des résultats précis, elle est à la fois longue et gourmande en ressources. En revanche, la recherche ANN utilisant AUTOINDEX ou d'autres types d'index permet d'équilibrer la vitesse et la précision, offrant des performances nettement plus rapides et plus économes en ressources que le kNN.</p>
<p>Une équivalence similaire à la requête vectorielle ci-dessus dans Mlivus se présente comme suit :</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    anns_field=<span class="hljs-string">&quot;image-vector&quot;</span>
    data=[[-<span class="hljs-number">5</span>, <span class="hljs-number">9</span>, -<span class="hljs-number">12</span>]],
    limit=<span class="hljs-number">10</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Vous trouverez l'exemple Elasticsearch sur <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-knn-query.html">cette page</a>. Pour plus de détails sur les recherches ANN dans Milvus, lisez <a href="/docs/fr/single-vector-search.md">Basic ANN Search</a>.</p>
<h3 id="Reciprocal-Rank-Fusion" class="common-anchor-header">Fusion de rangs réciproques</h3><p>Elasticsearch propose la fonction Reciprocal Rank Fusion (RRF) pour combiner plusieurs ensembles de résultats avec différents indicateurs de pertinence en un seul ensemble de résultats classés.</p>
<p>L'exemple suivant illustre la combinaison d'une recherche traditionnelle basée sur les termes avec une recherche vectorielle k-nearest neighbors (kNN) pour améliorer la pertinence de la recherche :</p>
<pre><code translate="no" class="language-python">client.search(
    index=<span class="hljs-string">&quot;my_index&quot;</span>,
    size=<span class="hljs-number">10</span>,
    query={
        <span class="hljs-string">&quot;retriever&quot;</span>: {
            <span class="hljs-string">&quot;rrf&quot;</span>: {
                <span class="hljs-string">&quot;retrievers&quot;</span>: [
                    {
                        <span class="hljs-string">&quot;standard&quot;</span>: {
                            <span class="hljs-string">&quot;query&quot;</span>: {
                                <span class="hljs-string">&quot;term&quot;</span>: {
                                    <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;shoes&quot;</span>
                                }
                            }
                        }
                    },
                    {
                        <span class="hljs-string">&quot;knn&quot;</span>: {
                            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;vector&quot;</span>,
                            <span class="hljs-string">&quot;query_vector&quot;</span>: [<span class="hljs-number">1.25</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3.5</span>],  <span class="hljs-comment"># Example vector; replace with your actual query vector</span>
                            <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">50</span>,
                            <span class="hljs-string">&quot;num_candidates&quot;</span>: <span class="hljs-number">100</span>
                        }
                    }
                ],
                <span class="hljs-string">&quot;rank_window_size&quot;</span>: <span class="hljs-number">50</span>,
                <span class="hljs-string">&quot;rank_constant&quot;</span>: <span class="hljs-number">20</span>
            }
        }
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans cet exemple, RRF combine les résultats de deux moteurs de recherche :</p>
<ul>
<li><p>Une recherche standard basée sur les termes pour les documents contenant le terme <code translate="no">&quot;shoes&quot;</code> dans le champ <code translate="no">text</code>.</p></li>
<li><p>Une recherche kNN sur le champ <code translate="no">vector</code> à l'aide du vecteur de requête fourni.</p></li>
</ul>
<p>Chaque moteur de recherche fournit jusqu'à 50 correspondances, qui sont reclassées par RRF, et les 10 premiers résultats finaux sont renvoyés.</p>
<p>Dans Milvus, vous pouvez réaliser une recherche hybride similaire en combinant des recherches sur plusieurs champs vectoriels, en appliquant une stratégie de reclassement et en récupérant les K premiers résultats de la liste combinée. Milvus prend en charge les stratégies RRF et reranker pondéré. Pour plus de détails, voir <a href="/docs/fr/reranking.md">Reranking</a>.</p>
<p>L'exemple suivant est une équivalence non stricte de l'exemple Elasticsearch ci-dessus dans Milvus.</p>
<pre><code translate="no" class="language-python">search_params_dense = {
    <span class="hljs-string">&quot;data&quot;</span>: [[<span class="hljs-number">1.25</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3.5</span>]],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}, 
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">100</span>
}

req_dense = ANNSearchRequest(**search_params_dense)

search_params_sparse = {
    <span class="hljs-string">&quot;data&quot;</span>: [<span class="hljs-string">&quot;shoes&quot;</span>],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>}
    }
}

req_sparse = ANNSearchRequest(**search_params_sparse)

res = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    reqs=[req_dense, req_sparse],
    reranker=RRFRanker(),
    limit=<span class="hljs-number">10</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Cet exemple démontre une recherche hybride dans Milvus qui combine :</p>
<ol>
<li><p><strong>Recherche vectorielle dense</strong>: Utilisation de la métrique du produit intérieur (IP) avec <code translate="no">nprobe</code> fixé à 10 pour la recherche approximative du plus proche voisin (ANN) sur le champ <code translate="no">vector</code>.</p></li>
<li><p><strong>Recherche de vecteurs épars</strong>: Utilisation de la métrique de similarité BM25 avec un paramètre <code translate="no">drop_ratio_search</code> de 0,2 sur le champ <code translate="no">text_sparse</code>.</p></li>
</ol>
<p>Les résultats de ces recherches sont exécutés séparément, combinés et reclassés à l'aide du classificateur Reciprocal Rank Fusion (RRF). La recherche hybride renvoie les 10 premières entités de la liste reclassée.</p>
<p>Contrairement au classement RRF d'Elasticsearch, qui fusionne les résultats des requêtes textuelles standard et des recherches kNN, Milvus combine les résultats des recherches vectorielles éparses et denses, offrant ainsi une capacité de recherche hybride unique optimisée pour les données multimodales.</p>
<h2 id="Recap" class="common-anchor-header">Récapitulatif<button data-href="#Recap" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans cet article, nous avons abordé les conversions de requêtes Elasticsearch typiques en leurs équivalents Milvus, y compris les requêtes au niveau des termes, les requêtes booléennes, les requêtes en texte intégral et les requêtes vectorielles. Si vous avez d'autres questions sur la conversion d'autres requêtes Elasticsearch, n'hésitez pas à nous contacter.</p>
