---
id: search-aggregation.md
title: Agrégation des résultats de rechercheCompatible with Milvus 3.0.x
summary: >-
  Regrouper les résultats de la recherche vectorielle dans des compartiments,
  calculer les métriques par compartiment, classer les compartiments et renvoyer
  des résultats représentatifs.
beta: Milvus 3.0.x
---
<h1 id="Search-Aggregation" class="common-anchor-header">Agrégation des résultats de recherche<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Search-Aggregation" class="anchor-icon" translate="no">
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
    </button></h1><p>Lorsqu'un acheteur recherche « des chaussures de course noires pour l'entraînement quotidien », la recherche par voisin le plus proche (ANN) classe les produits en fonction de la similarité de leurs vecteurs et renvoie une liste plate des Top-K. Les résultats peuvent être pertinents mais répétitifs : dans l'exemple ci-dessous, quatre des six premiers résultats sont des produits de la marque A, tandis que les marques B et C n'apparaissent qu'une seule fois chacune.</p>
<p>Une liste plate ne permet pas de fournir directement un résumé organisé par catégories. Une application peut avoir besoin de comparer les marques en fonction du nombre de candidats retenus ou du prix moyen, d’examiner un petit nombre de produits représentatifs de chaque marque, ou d’organiser les résultats en plusieurs niveaux de catégories.</p>
<p>L’agrégation de recherche organise les candidats ANN retenus en segments en fonction de champs scalaires sélectionnés. Dans cet exemple, chaque marque devient un segment distinct. Milvus peut calculer des statistiques pour chaque segment, classer les segments et y associer des produits représentatifs. L’application exploite cette réponse axée sur les segments via <code translate="no">result.agg_buckets</code>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-overview.png" alt="A flat running-shoe search result becomes a set of comparable brand buckets" class="doc-image" id="a-flat-running-shoe-search-result-becomes-a-set-of-comparable-brand-buckets" /> 
   <span>Un résultat de recherche plat sur les chaussures de course se transforme en un ensemble de catégories de marques comparables</span>
  
 </span></p>
<p>L’agrégation de recherche n’effectue pas d’agrégation exacte sur l’ensemble de la collection. L’existence des compartiments, leur nombre, leurs métriques, leur classement et les résultats représentatifs dépendent des candidats retenus par les étapes du réseau neuronal artificiel (ANN) et de regroupement.</p>
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-bucketing.png" alt="ANN candidates grouped by bucket keys and returned with counts, metrics, and representative hits" class="doc-image" id="ann-candidates-grouped-by-bucket-keys-and-returned-with-counts,-metrics,-and-representative-hits" /> 
   <span>Candidats ANN regroupés par clés de compartiment et renvoyés avec leurs nombres d’occurrences, leurs métriques et leurs résultats représentatifs</span>
  
 </span></p>
<ol>
<li><p><strong>Récupération des candidats.</strong> Milvus exécute une recherche ANN pour trouver les entités les plus proches du vecteur de requête. L’étape de regroupement retient ensuite un nombre limité de candidats pour chaque clé composite complète. Ce quota de candidats par clé correspond à la plus grande valeur de ` <code translate="no">TopHits.size</code> ` dans l’arborescence d’agrégation, ou à ` <code translate="no">1</code> ` lorsqu’aucun niveau ne configure ` <code translate="no">top_hits</code>`.</p></li>
<li><p><strong>Création des compartiments.</strong> <code translate="no">SearchAggregation.fields</code> définit la clé du compartiment. Chaque combinaison unique de valeurs de champs crée une clé distincte. Dans la figure, <code translate="no">fields=[&quot;brand&quot;]</code> génère les clés de compartiment <code translate="no">(Brand A)</code>, <code translate="no">(Brand B)</code> et <code translate="no">(Brand C)</code>. Les candidats retenus ayant la même clé appartiennent au même compartiment et contribuent à son <code translate="no">count</code>. <code translate="no">SearchAggregation.size</code> limite le nombre de compartiments renvoyés par Milvus.</p></li>
<li><p><strong>Calculer et renvoyer les résultats.</strong> Chaque compartiment renvoyé contient sa clé et le nombre de candidats conservés. Milvus peut également calculer les métriques configurées, trier les compartiments, renvoyer des entités représentatives et créer des compartiments enfants. Chaque <code translate="no">AggregationBucket</code> dans <code translate="no">result.agg_buckets</code> expose <code translate="no">key</code>, <code translate="no">count</code>, <code translate="no">metrics</code>, <code translate="no">hits</code> et <code translate="no">sub_groups</code>. Lorsque l’agrégation de recherche est activée, la liste habituelle des résultats de recherche est vide.</p></li>
</ol>
<p>Dans le schéma, <code translate="no">TopHits.size=4</code> fournit un budget de candidats de quatre par clé ; ainsi, les quatre candidats retenus pour la marque A produisent <code translate="no">count: 4</code>. La fiche complète de la marque A n’affiche que deux des quatre résultats représentatifs renvoyés afin de conserver une présentation concise.</p>
<p>Avec « <code translate="no">sub_aggregation</code> », Milvus répète les étapes 2 et 3 à l’intérieur de chaque compartiment parent. Les variations du rappel du réseau neuronal artificiel (ANN) ou du budget de candidats par clé peuvent modifier le nombre de compartiments, les métriques, l’ordre, les résultats et les résultats imbriqués.</p>
<h2 id="Limits" class="common-anchor-header">Limites<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Avant d’utiliser l’agrégation de recherche, veuillez prendre connaissance des limites suivantes :</p>
<ul>
<li><p><strong>Agrégations imbriquées :</strong> une requête peut contenir une agrégation racine « <code translate="no">SearchAggregation</code> » et jusqu’à trois niveaux imbriqués « <code translate="no">sub_aggregation</code> », pour un maximum de quatre niveaux au total. Sur l’ensemble des niveaux, 10 champs au maximum peuvent être utilisés pour créer des clés de compartiment.</p></li>
<li><p><strong>Champs utilisés pour créer des clés de compartiment :</strong> « <code translate="no">SearchAggregation.fields</code> » prend en charge les champs booléens, entiers, « <code translate="no">VARCHAR</code> » et « <code translate="no">TIMESTAMPTZ</code> ». Il ne prend pas en charge les champs « <code translate="no">FLOAT</code> », « <code translate="no">DOUBLE</code> », « <code translate="no">ARRAY</code> », « <code translate="no">JSON</code> », « <code translate="no">GEOMETRY</code> », « <code translate="no">TEXT</code> », vectoriels ou dynamiques.</p></li>
<li><p><strong>Champs métriques :</strong> <code translate="no">count</code> accepte les champs de type « <code translate="no">&quot;*&quot;</code> » ou tout champ non «<code translate="no">JSON</code> » et non dynamique, et ignore les valeurs de type « <code translate="no">NULL</code> » lorsqu’un champ est spécifié. <code translate="no">sum</code> et <code translate="no">avg</code> acceptent les champs de type entier et à virgule flottante. <code translate="no">min</code> et <code translate="no">max</code> acceptent en outre les champs de type chaîne de caractères et « <code translate="no">TIMESTAMPTZ</code> ».</p></li>
<li><p><strong>Champs de tri des meilleurs résultats :</strong> <code translate="no">TopHits.sort</code> accepte les champs comparables de type booléen, entier, à virgule flottante, chaîne de caractères et <code translate="no">TIMESTAMPTZ</code>, ainsi que <code translate="no">_score</code>. Il ne prend pas en charge les champs de type <code translate="no">ARRAY</code>, <code translate="no">JSON</code>, <code translate="no">GEOMETRY</code>, vectoriel ou dynamique.</p></li>
<li><p><strong>Budget de candidats :</strong> la plus grande valeur de ` <code translate="no">TopHits.size</code> ` dans l’arborescence d’agrégation correspond également au nombre de candidats conservés par clé composite complète. Si aucun niveau ne configure ` <code translate="no">top_hits</code>`, Milvus conserve un candidat par clé. Le ` <code translate="no">count</code> ` du compartiment et les métriques sont calculés à partir de ces candidats conservés ; par conséquent, la modification de ` <code translate="no">TopHits.size</code> ` peut les modifier.</p></li>
<li><p><strong>Champs de compartiment pouvant prendre la valeur null :</strong> une valeur « <code translate="no">NULL</code> » forme sa propre clé de compartiment. Pour exclure le compartiment null, ajoutez un filtre tel que « <code translate="no">brand is not null</code> » à la requête de recherche.</p></li>
<li><p><strong>Champs répétés :</strong> un même champ ne peut pas apparaître dans plusieurs listes d’ <code translate="no">SearchAggregation.fields</code>. Par exemple, si l’agrégation racine utilise <code translate="no">fields=[&quot;category&quot;]</code>, une agrégation imbriquée <code translate="no">sub_aggregation</code> ne peut pas également utiliser <code translate="no">fields=[&quot;category&quot;]</code>.</p></li>
<li><p><strong>Combinaisons non prises en charge :</strong> l’agrégation de recherche ne peut pas être combinée avec une agrégation de recherche de niveau supérieur ( <code translate="no">offset</code>) non nulle, des itérateurs de recherche (Search Iterators), la recherche hybride (Hybrid Search), un surligneur (Highlighter) ou la recherche par regroupement (Grouping Search). Une valeur de niveau supérieur <code translate="no">offset</code> égale à <code translate="no">0</code> équivaut à omettre le paramètre. Dans les requêtes de recherche REST v2, <code translate="no">searchAggregation</code> et <code translate="no">ids</code> ne peuvent pas être spécifiés ensemble.</p></li>
<li><p><strong>Entrées renvoyées :</strong> par défaut, Milvus rejette une requête d’agrégation de recherche lorsque le nombre maximal d’entrées de résultats calculé pour la requête dépasse 10 000. Ce seuil est contrôlé par <code translate="no">proxy.maxSearchAggregationResultEntries</code>. Définissez la valeur de configuration sur <code translate="no">0</code> ou sur un nombre négatif pour désactiver cette vérification.</p>
<p>Milvus calcule ce nombre maximal comme suit :</p>
<p><code translate="no">number of query vectors × product of the effective search_size at every aggregation level × largest TopHits.size at any level</code></p>
<p>Pour ce calcul côté serveur, la valeur effective de ` <code translate="no">search_size</code> ` à un niveau donné est la valeur explicitement configurée ` <code translate="no">search_size</code>`, ou la valeur ` <code translate="no">size</code> ` de ce niveau lorsque ` <code translate="no">search_size</code> ` est omis. L’API PyMilvus utilisée dans ce guide n’expose pas actuellement ` <code translate="no">search_size</code>` ; les requêtes PyMilvus utilisent donc la valeur ` <code translate="no">size</code> ` de chaque niveau pour ce calcul. Utilisez <code translate="no">1</code> pour le dernier facteur lorsqu’aucun niveau ne configure <code translate="no">TopHits</code>. Par exemple, un vecteur de requête, 10 compartiments racines, cinq compartiments enfants par compartiment racine et deux résultats par compartiment enfant produisent un maximum calculé de :</p>
<p><code translate="no">1 × 10 × 5 × 2 = 100</code></p></li>
</ul>
<h2 id="Use-Search-Aggregation" class="common-anchor-header">Utiliser l’agrégation de recherche<button data-href="#Use-Search-Aggregation" class="anchor-icon" translate="no">
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
    </button></h2><p>Choisissez un exemple en fonction de ce que vous souhaitez réaliser :</p>
<table>
<thead>
<tr><th>Accédez à</th><th>Description</th><th>Paramètres clés</th></tr>
</thead>
<tbody>
<tr><td><a href="#Compare-and-sort-buckets">Comparer et trier les compartiments</a></td><td>Calculez des statistiques par compartiment pour comparer les compartiments, puis triez les compartiments renvoyés par métriques, nombres ou clés.</td><td><code translate="no">fields</code>, <code translate="no">size</code>, <code translate="no">metrics</code>, <code translate="no">order</code></td></tr>
<tr><td><a href="#Show-representative-results-from-each-bucket">Afficher des résultats représentatifs de chaque compartiment</a></td><td>Renvoyer un nombre limité d’entités issues de chaque compartiment et trier ces entités indépendamment selon des champs scalaires ou un score vectoriel.</td><td><code translate="no">top_hits</code>, <code translate="no">TopHits.size</code>, <code translate="no">TopHits.sort</code></td></tr>
<tr><td><a href="#Group-results-at-multiple-levels">Regrouper les résultats à plusieurs niveaux</a></td><td>Organisez les résultats en niveaux de segments parents et enfants afin d’analyser plusieurs dimensions à la suite.</td><td><code translate="no">sub_aggregation</code></td></tr>
</tbody>
</table>
<p>Les exemples ci-dessous utilisent une collection de produits comportant des champs de marque, de catégorie, de couleur, de prix et de note. Tous les noms de marque, noms de produit, prix, notes et résultats de recherche sont des données d'exemple synthétiques. Développez la section suivante pour créer la collection et définir les variables de recherche partagées.</p>
<p><details></p>
<p><summary>Configurer la collection d’exemple</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient, SearchAggregation, TopHits

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

collection_name = <span class="hljs-string">&quot;product_search_aggregation&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;embedding&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
schema.add_field(<span class="hljs-string">&quot;name&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">200</span>)
schema.add_field(<span class="hljs-string">&quot;brand&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">100</span>)
schema.add_field(<span class="hljs-string">&quot;category&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">100</span>)
schema.add_field(<span class="hljs-string">&quot;color&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">50</span>)
schema.add_field(<span class="hljs-string">&quot;price&quot;</span>, DataType.DOUBLE)
schema.add_field(<span class="hljs-string">&quot;rating&quot;</span>, DataType.DOUBLE)
schema.add_field(<span class="hljs-string">&quot;in_stock&quot;</span>, DataType.BOOL)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
    <span class="hljs-comment"># Make preceding writes visible to searches from this client.</span>
    consistency_level=<span class="hljs-string">&quot;Session&quot;</span>,
)

client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.42</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.66</span>, <span class="hljs-number">0.31</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">129.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.7</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.39</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.61</span>, <span class="hljs-number">0.29</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Trail A2&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">139.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.6</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.14</span>, <span class="hljs-number">0.44</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.68</span>, <span class="hljs-number">0.33</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner B1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand B&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.41</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.62</span>, <span class="hljs-number">0.30</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner C1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand C&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">119.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.4</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">False</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.48</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.59</span>, <span class="hljs-number">0.15</span>, <span class="hljs-number">0.71</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Jacket A1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.5</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.45</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.55</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.69</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Jacket B1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand B&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">89.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.3</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.09</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.60</span>, <span class="hljs-number">0.27</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A3&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.13</span>, <span class="hljs-number">0.43</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.65</span>, <span class="hljs-number">0.32</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A4&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">149.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.9</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
    ],
)

client.load_collection(collection_name)

query_vector = [<span class="hljs-number">0.11</span>, <span class="hljs-number">0.40</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.64</span>, <span class="hljs-number">0.30</span>]
search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {},
}
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>La configuration ci-dessus définit <code translate="no">COSINE</code> à la fois pour l’index vectoriel et pour les paramètres de recherche. Par conséquent, les exemples suivants utilisent <code translate="no">{&quot;_score&quot;: &quot;desc&quot;}</code> pour placer en premier les similarités cosinus les plus élevées. Pour une métrique de distance telle que <code translate="no">L2</code>, utilisez <code translate="no">{&quot;_score&quot;: &quot;asc&quot;}</code>.</p>
<h3 id="Compare-and-sort-buckets" class="common-anchor-header">Comparer et trier les compartiments<button data-href="#Compare-and-sort-buckets" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilisez ce modèle lorsque vous devez comparer des groupes d’entités récupérées à l’aide de statistiques calculées et contrôler l’ordre dans lequel les groupes sont renvoyés. Dans cet exemple, Milvus regroupe les produits récupérés par <code translate="no">brand</code>, calcule des métriques de prix pour chaque groupe de marques, puis trie les groupes par prix moyen.</p>
<p>Si votre objectif est uniquement d’améliorer la diversité des résultats en renvoyant une ou plusieurs entités par valeur de champ, utilisez plutôt <a href="/docs/fr/grouping-search.md">la recherche par regroupement</a>.</p>
<p>La configuration suivante crée jusqu’à trois segments de marque, calcule des métriques pour chaque segment et trie les segments par prix moyen :</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
<span class="highlighted-comment-line">    <span class="hljs-comment"># Form one bucket for each distinct brand value.</span></span>
<span class="highlighted-comment-line">    fields=[<span class="hljs-string">&quot;brand&quot;</span>],</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Return up to three buckets at this aggregation level.</span></span>
<span class="highlighted-comment-line">    size=<span class="hljs-number">3</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Calculate named metrics for every selected bucket.</span></span>
<span class="highlighted-comment-line">    metrics={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;product_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;avg_price&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;min_price&quot;</span>: {<span class="hljs-string">&quot;min&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Sort buckets by average price, highest first.</span></span>
<span class="highlighted-comment-line">    order=[</span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;avg_price&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># If average prices are equal, sort by bucket key in ascending order.</span></span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;_key&quot;</span>: <span class="hljs-string">&quot;asc&quot;</span>},</span>
<span class="highlighted-comment-line">    ],</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Transmettez l’objet au paramètre « <code translate="no">search_aggregation</code> » de « <code translate="no">MilvusClient.search()</code> » :</p>
<pre><code translate="no" class="language-python">result = client.search(
    collection_name=collection_name,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    search_params=search_params,
    output_fields=[
        <span class="hljs-string">&quot;name&quot;</span>,
        <span class="hljs-string">&quot;brand&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;color&quot;</span>,
        <span class="hljs-string">&quot;price&quot;</span>,
        <span class="hljs-string">&quot;rating&quot;</span>,
        <span class="hljs-string">&quot;in_stock&quot;</span>,
    ],
<span class="highlighted-wrapper-line">    search_aggregation=aggregation,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Lorsque le paramètre « <code translate="no">search_aggregation</code> » est défini, PyMilvus ne renvoie aucun résultat d’entité ordinaire dans « <code translate="no">result[0]</code> ». Consultez plutôt la réponse du compartiment à l’adresse <code translate="no">result.agg_buckets[0]</code>. Le paramètre « <code translate="no">output_fields</code> » contrôle quels champs scalaires apparaissent dans chaque mappage « <code translate="no">AggregationHit.fields</code> » renvoyé ; Milvus peut toujours utiliser les champs « metric-source » et « sort » qui ne sont pas répertoriés dans « <code translate="no">output_fields</code> ».</p>
<p><details></p>
<p><summary>Afficher l’exemple de sortie du bucket</summary></p>
<p>La sortie suivante a été capturée à partir de la requête ci-dessus et sérialisée au format JSON pour plus de lisibilité. PyMilvus renvoie des objets ` <code translate="no">AggregationBucket</code> ` plutôt que du JSON. La valeur ` <code translate="no">key</code> ` est toujours une liste ordonnée de composants de clé, même lorsque ` <code translate="no">fields</code> ` ne contient qu’un seul champ. Cela permet de préserver l’ordre des champs pour les clés composites.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">[</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand C&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">119.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">119.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Pour le vecteur de requête unique présenté dans ce guide, lisez les compartiments de niveau supérieur renvoyés à partir de ` <code translate="no">result.agg_buckets[0]</code>`. Chaque compartiment expose ses composants de clé ordonnés, les candidats conservés ` <code translate="no">count</code>`, les valeurs calculées ` <code translate="no">metrics</code>`, les valeurs représentatives ` <code translate="no">hits</code>` et les compartiments imbriqués dans ` <code translate="no">sub_groups</code>`.</p>
<p>Lisez la configuration comme suit :</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Ce qu’il contrôle</th><th>Dans cet exemple</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">fields</code></td><td>Comment Milvus crée les clés de compartiment</td><td>Crée un compartiment pour chaque valeur distincte de « <code translate="no">brand</code> ».</td></tr>
<tr><td><code translate="no">size</code></td><td>Nombre maximal de compartiments renvoyés</td><td>Renvoie jusqu’à trois buckets de marque.</td></tr>
<tr><td><code translate="no">metrics</code></td><td>Les statistiques calculées pour chaque compartiment</td><td>Calcule le nombre de produits, le prix moyen et le prix minimum.</td></tr>
<tr><td><code translate="no">order</code></td><td>Comment Milvus trie les segments renvoyés</td><td>Trie par prix moyen, puis utilise la clé du segment pour départager les ex aequo.</td></tr>
</tbody>
</table>
<p>Milvus ignore l’ <code translate="no">limit</code> lorsque l’option « <code translate="no">search_aggregation</code> » est activée. Utilisez la valeur « <code translate="no">SearchAggregation.size</code> » de la racine pour contrôler le nombre de segments de premier niveau.</p>
<p>Avec ces paramètres, Milvus renvoie les compartiments « Marque B », « Marque A » et « Marque C » par ordre décroissant d’ <code translate="no">avg_price</code>. Le critère « <code translate="no">_key</code> » ne s’applique que lorsque les compartiments ont le même prix moyen. Comme cette configuration ne définit pas de « <code translate="no">top_hits</code> », la liste « <code translate="no">hits</code> » de chaque compartiment est vide et le budget candidat par clé est « <code translate="no">1</code> ». Les nombres et les métriques affichés décrivent donc un candidat retenu par marque. Configurez « <code translate="no">top_hits</code> » avec une valeur plus élevée de « <code translate="no">TopHits.size</code> » lorsque l’agrégation nécessite une fenêtre métrique plus large par clé.</p>
<p><details></p>
<p><summary>Métrique et règles de classement</summary></p>
<p>Chaque entrée de la table « <code translate="no">SearchAggregation.metrics</code> » associe un alias défini par l’utilisateur à une valeur de la table « <code translate="no">{operation: source}</code> » :</p>
<table>
<thead>
<tr><th>Source</th><th>Opérations prises en charge</th><th>Comportement</th></tr>
</thead>
<tbody>
<tr><td>Tout champ non «<code translate="no">JSON</code> » et non dynamique</td><td><code translate="no">count</code></td><td>Compte les candidats retenus dont le champ source n’est pas de type « <code translate="no">NULL</code> ».</td></tr>
<tr><td>Champ de type entier ou à virgule flottante</td><td><code translate="no">sum</code>, « <code translate="no">avg</code> », « <code translate="no">min</code> », <code translate="no">max</code></td><td>Effectue le calcul sur les valeurs retenues non nulles.</td></tr>
<tr><td>Champ de type chaîne de caractères ou « <code translate="no">TIMESTAMPTZ</code> »</td><td><code translate="no">min</code>, <code translate="no">max</code></td><td>Sélectionne la valeur conservée non nulle minimale ou maximale.</td></tr>
<tr><td><code translate="no">&quot;*&quot;</code></td><td><code translate="no">count</code></td><td>Compte chaque candidat conservé dans le compartiment. Le résultat correspond à <code translate="no">bucket.count</code>.</td></tr>
<tr><td><code translate="no">_score</code></td><td><code translate="no">sum</code>, <code translate="no">avg</code>, <code translate="no">min</code>, <code translate="no">max</code></td><td>Agrège les valeurs de similarité ou de distance ANN pour les candidats conservés.</td></tr>
</tbody>
</table>
<p><code translate="no">SearchAggregation.order</code> Accepte les clés suivantes :</p>
<table>
<thead>
<tr><th>Clé d’ordre</th><th>Signification</th></tr>
</thead>
<tbody>
<tr><td>Alias d’une métrique</td><td>Trie selon une valeur calculée dans l'<code translate="no">metrics</code> au même niveau d'agrégation, par exemple <code translate="no">avg_price</code>.</td></tr>
<tr><td><code translate="no">_count</code></td><td>Trie en fonction du nombre de candidats retenus dans chaque compartiment.</td></tr>
<tr><td><code translate="no">_key</code></td><td>Trie selon la clé du compartiment plutôt que selon un champ de collection nommé « <code translate="no">_key</code> ».</td></tr>
</tbody>
</table>
<p>Chaque entrée « <code translate="no">order</code> » associe une clé à « <code translate="no">&quot;asc&quot;</code> » ou « <code translate="no">&quot;desc&quot;</code> ». Milvus évalue plusieurs entrées de la première à la dernière. Si vous omettez « <code translate="no">order</code> », Milvus conserve l’ordre de découverte des compartiments issu de l’ensemble des candidats retenus.</p>
<p>Pour trier les compartiments en fonction de la qualité de la correspondance vectorielle, calculez d’abord une métrique au niveau du compartiment à partir de <code translate="no">_score</code>, puis utilisez l’alias de cette métrique dans <code translate="no">order</code>. Vous ne pouvez pas utiliser directement <code translate="no">_score</code> comme clé de tri des compartiments, car chaque compartiment peut contenir plusieurs scores d’entités. Par exemple, avec <code translate="no">COSINE</code> ou <code translate="no">IP</code>:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
    metrics={<span class="hljs-string">&quot;max_score&quot;</span>: {<span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-string">&quot;_score&quot;</span>}},
    order=[{<span class="hljs-string">&quot;max_score&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],
)
<button class="copy-code-btn"></button></code></pre>
<p>Avec <code translate="no">L2</code>, calculez la valeur minimale de <code translate="no">_score</code> et triez l’alias de métrique par ordre croissant afin que les compartiments présentant la distance la plus faible apparaissent en premier.</p>
<p></details></p>
<p><details></p>
<p><summary>Créer des clés de compartiment composites</summary></p>
<p>Pour créer une clé de compartiment composite, passez plusieurs noms de champs dans la même liste :</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
<span class="highlighted-comment-line">    <span class="hljs-comment"># Combine brand and color to form a composite bucket key.</span></span>
<span class="highlighted-comment-line">    fields=[<span class="hljs-string">&quot;brand&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],</span>
    size=<span class="hljs-number">6</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Cette configuration peut produire des clés telles que <code translate="no">(Brand A, black)</code>, <code translate="no">(Brand A, blue)</code> et <code translate="no">(Brand B, white)</code>. Deux entités ne partagent un compartiment que lorsque les deux valeurs correspondent. Milvus conserve l’ordre de la liste ; ainsi, <code translate="no">brand</code> est le premier composant de la clé et <code translate="no">color</code> le second. Lorsque <code translate="no">_key</code> est utilisé dans <code translate="no">order</code>, Milvus compare les composants de la clé composite dans le même ordre. Passez plusieurs chaînes de caractères dans une liste plate ; les listes imbriquées ne sont pas prises en charge.</p>
<p><code translate="no">size=6</code> correspond au nombre maximal de compartiments composés renvoyés à ce niveau d’agrégation. Les données d’exemple contiennent cinq combinaisons distinctes de marque et de couleur ; les cinq peuvent donc être renvoyées. Dans la <a href="#Limits">limite d’entrées renvoyées</a>, cette requête contribue à <code translate="no">1 query vector × 6 buckets × 1 = 6</code> entrées de résultat configurées.</p>
<p>Plusieurs champs dans une liste « <code translate="no">SearchAggregation.fields</code> » créent une clé de compartiment composite à ce niveau d’agrégation. Pour créer une hiérarchie de compartiments parent-enfant, utilisez une <a href="#Group-results-at-multiple-levels">agrégation imbriquée</a>.</p>
<p></details></p>
<p>Les exemples suivants redéfinissent ` <code translate="no">aggregation</code>`. Transmettez l’objet mis à jour au même paramètre ` <code translate="no">search_aggregation</code> ` et relancez l’appel de recherche.</p>
<h3 id="Show-representative-results-from-each-bucket" class="common-anchor-header">Afficher des résultats représentatifs de chaque compartiment<button data-href="#Show-representative-results-from-each-bucket" class="anchor-icon" translate="no">
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
    </button></h3><p>Incluez des entités représentatives lorsque l’application doit afficher des produits réels issus de chaque compartiment. Dans cet exemple, Milvus renvoie jusqu’à deux produits par compartiment de marque, classés par note puis par score vectoriel.</p>
<p>Configurez <code translate="no">TopHits</code> comme suit :</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
<span class="highlighted-comment-line">    <span class="hljs-comment"># Return and sort representative entities for each selected bucket.</span></span>
<span class="highlighted-comment-line">    top_hits=TopHits(</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># Return up to two entities per bucket.</span></span>
<span class="highlighted-comment-line">        size=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># Apply sort criteria in list order.</span></span>
<span class="highlighted-comment-line">        sort=[</span>
<span class="highlighted-comment-line">            {<span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">            {<span class="hljs-string">&quot;_score&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">        ],</span>
<span class="highlighted-comment-line">    ),</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Afficher un compartiment avec des résultats représentatifs</summary></p>
<p>Le compartiment « Marque A » suivant a été extrait de la requête ci-dessus et sérialisé au format JSON pour plus de lisibilité.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.99976646900177</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;black&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Runner A1&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.7</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9997048377990723</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;blue&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Trail A2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">139.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.6</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<table>
<thead>
<tr><th>Paramètre</th><th>Objectif</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">top_hits</code></td><td>Facultatif. Configure les entités représentatives pour ce niveau d’agrégation. S’il est omis, « <code translate="no">bucket.hits</code> » est vide et le budget candidat par clé est défini par défaut sur un.</td></tr>
<tr><td><code translate="no">TopHits.size</code></td><td>Renvoie jusqu’à deux entités représentatives de chaque segment sélectionné et définit le budget candidat par clé sur deux pour l’ensemble de l’arborescence d’agrégation.</td></tr>
<tr><td><code translate="no">TopHits.sort</code></td><td>Trie les entités au sein de chaque segment selon les critères indiqués.</td></tr>
</tbody>
</table>
<p>Configurez ` <code translate="no">top_hits</code> ` lorsque l’application a besoin d’entités représentatives ou lorsque les comptages et les métriques nécessitent une fenêtre de candidats par clé plus large. Une valeur plus élevée de ` <code translate="no">TopHits.size</code> ` augmente à la fois le budget de candidats et le calcul du nombre maximal d’entrées renvoyées dans <a href="#Limits">`Limits`</a>.</p>
<p><code translate="no">SearchAggregation.order</code> « sorts buckets » trie les compartiments, tandis que « <code translate="no">TopHits.sort</code> » trie les entités conservées à l’intérieur de chaque compartiment. L’ordre de tri ne modifie pas les candidats retenus pour l’ <code translate="no">count</code> et les métriques. « <code translate="no">TopHits.sort</code> » accepte les noms de champs scalaires comparables pris en charge ainsi que le champ intégré « <code translate="no">_score</code> », qui représente la similarité ou la distance ANN. Milvus évalue les entrées « <code translate="no">sort</code> » de la première à la dernière. Dans cet exemple, il classe les produits par <code translate="no">rating</code> du plus élevé au plus bas et n’utilise <code translate="no">_score</code> que lorsque deux notes sont égales. Comme la configuration utilise <code translate="no">COSINE</code>, un classement décroissant <code translate="no">_score</code> place le produit le plus similaire en premier.</p>
<p>Les champs utilisés par <code translate="no">metrics</code> ou <code translate="no">TopHits.sort</code> ne doivent pas nécessairement apparaître dans <code translate="no">output_fields</code>. Milvus récupère ces champs en interne, mais seuls les champs explicitement répertoriés dans <code translate="no">output_fields</code> sont inclus dans le mappage <code translate="no">fields</code> de chaque résultat renvoyé. Les clés primaires et les scores vectoriels restent disponibles via <code translate="no">AggregationHit.pk</code> et <code translate="no">AggregationHit.score</code>.</p>
<p>Chaque « <code translate="no">AggregationHit</code> » renvoyé expose sa clé primaire dans <code translate="no">pk</code>, son score vectoriel dans <code translate="no">score</code> et les champs de sortie demandés dans <code translate="no">fields</code>.</p>
<h3 id="Group-results-at-multiple-levels" class="common-anchor-header">Regroupement des résultats à plusieurs niveaux<button data-href="#Group-results-at-multiple-levels" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilisez l’agrégation imbriquée lorsque vous avez besoin d’un niveau de compartiments à l’intérieur d’un autre. Dans cet exemple, Milvus crée d’abord des compartiments de catégorie, puis des compartiments de marque au sein de chaque catégorie.</p>
<p>L’agrégation enfant ne reçoit que les entités attribuées à son compartiment parent. <code translate="no">fields</code> contrôle la clé du compartiment à chaque niveau d’agrégation, tandis que <code translate="no">sub_aggregation</code> crée la hiérarchie parent-enfant.</p>
<p>La configuration ci-dessous crée un compartiment de catégorie avec la clé <code translate="no">(running_shoes)</code>. Au sein de ce compartiment parent, l’agrégation enfant crée des compartiments de marque distincts avec des clés telles que <code translate="no">(Brand A)</code>, <code translate="no">(Brand B)</code> et <code translate="no">(Brand C)</code>.</p>
<pre><code translate="no" class="language-text">Parent bucket key:
(running_shoes)

Child bucket keys:
├── (Brand A)
├── (Brand B)
└── (Brand C)
<button class="copy-code-btn"></button></code></pre>
<p>Chaque niveau peut utiliser plusieurs champs de manière indépendante. Par exemple, l’utilisation de <code translate="no">fields=[&quot;brand&quot;, &quot;color&quot;]</code> dans l’agrégation enfant créerait des clés enfants composites telles que <code translate="no">(Brand A, black)</code>.</p>
<p>La configuration suivante met en œuvre cette hiérarchie :</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;category&quot;</span>],
    size=<span class="hljs-number">2</span>,
    metrics={
        <span class="hljs-string">&quot;product_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},
        <span class="hljs-string">&quot;avg_price&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},
    },
    order=[{<span class="hljs-string">&quot;product_count&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],
<span class="highlighted-comment-line">    <span class="hljs-comment"># For each category bucket, group only its entities by brand.</span></span>
<span class="highlighted-comment-line">    sub_aggregation=SearchAggregation(</span>
<span class="highlighted-comment-line">        fields=[<span class="hljs-string">&quot;brand&quot;</span>],</span>
<span class="highlighted-comment-line">        size=<span class="hljs-number">3</span>,</span>
<span class="highlighted-comment-line">        metrics={</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;brand_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;avg_rating&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;rating&quot;</span>},</span>
<span class="highlighted-comment-line">        },</span>
<span class="highlighted-comment-line">        order=[{<span class="hljs-string">&quot;avg_rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],</span>
<span class="highlighted-comment-line">        top_hits=TopHits(</span>
<span class="highlighted-comment-line">            size=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">            sort=[{<span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],</span>
<span class="highlighted-comment-line">        ),</span>
<span class="highlighted-comment-line">    ),</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Afficher le résultat d’un compartiment imbriqué</summary></p>
<p>L'extrait sérialisé suivant montre le compartiment parent <code translate="no">running_shoes</code> et son compartiment enfant « Brand B ». Les compartiments enfants « Brand A » et « Brand C » sont omis par souci de concision.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">104</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">137.49</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;avg_rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.8</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;brand_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9994542598724365</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;white&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Runner B1&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.8</span>
          <span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Le résultat affiché représente le chemin d’accès au compartiment <code translate="no">(running_shoes) → (Brand B)</code>, et non une clé de compartiment composite unique <code translate="no">(running_shoes, Brand B)</code>.</p>
<p>Milvus sélectionne d’abord jusqu’à deux compartiments de catégorie, classés par <code translate="no">product_count</code>. Il exécute ensuite <code translate="no">sub_aggregation</code> indépendamment au sein de chaque catégorie sélectionnée et renvoie jusqu’à trois compartiments de marque, classés par <code translate="no">avg_rating</code>.</p>
<p>Dans le résultat ci-dessus :</p>
<ul>
<li>Le groupe racine « <code translate="no">running_shoes</code> » contient quatre candidats retenus répartis entre ses clés composites enfants. Ses « <code translate="no">metrics</code> » contiennent les valeurs de niveau racine « <code translate="no">avg_price</code> » et « <code translate="no">product_count</code> ».</li>
<li>La liste « <code translate="no">sub_groups</code> » du compartiment racine contient les compartiments enfants de marque. Le compartiment « Brand B » affiché contient un candidat retenu ainsi que ses propres valeurs « <code translate="no">avg_rating</code> » et « <code translate="no">brand_count</code> ».</li>
<li>La liste « <code translate="no">hits</code> » du compartiment racine est vide, car l’agrégation racine ne configure pas « <code translate="no">top_hits</code> ». Le compartiment enfant « Marque B » contient un résultat représentatif, car « <code translate="no">top_hits</code> » est configuré dans « <code translate="no">sub_aggregation</code> ».</li>
</ul>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-accurate-are-bucket-counts-and-metrics" class="common-anchor-header">Quelle est la précision des comptages et des métriques des compartiments ?<button data-href="#How-accurate-are-bucket-counts-and-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>L’agrégation de recherche résume les candidats ANN conservés. Elle n’effectue pas d’agrégation sur l’ensemble de la collection.</p>
<p>La conservation des candidats comporte deux étapes d’approximation. La recherche ANN peut omettre des entités pertinentes de la collection, et l’étape de regroupement ne conserve au maximum que les candidats les plus grands <code translate="no">TopHits.size</code> pour chaque clé composite complète. Si aucun niveau ne configure <code translate="no">top_hits</code>, cette limite par clé est égale à un.</p>
<p>Par exemple, supposons qu’une collection contienne 5 000 produits de la marque A et que beaucoup d’entre eux soient pertinents pour la requête vectorielle. Si l’agrégation utilise l’option « <code translate="no">TopHits(size=4)</code> », le compartiment de la marque A peut retenir au maximum quatre candidats pour une clé composite complète. Ses paramètres « <code translate="no">count</code> » et ses métriques décrivent ces candidats retenus, et non l’ensemble des produits pertinents de la marque A ni l’ensemble des 5 000 entités de la collection.</p>
<p>L’approximation revêt une importance particulière lorsque l’ <code translate="no">order</code> utilise un alias de métrique. Les variations du taux de rappel de la recherche peuvent modifier les valeurs des métriques et, par conséquent, changer les compartiments qui répondent aux critères de l’ <code translate="no">SearchAggregation.size</code>. L’agrégation imbriquée peut amplifier cet effet, car chaque niveau enfant opère sur les entités disponibles dans son compartiment parent.</p>
<p>Si vous avez besoin de statistiques exactes sur chaque entité correspondante, utilisez un workflow d’agrégation de requêtes exactes plutôt que l’agrégation de recherche.</p>
<h3 id="How-does-Search-Aggregation-differ-from-Grouping-Search" class="common-anchor-header">En quoi l’agrégation de recherche diffère-t-elle de la recherche par regroupement ?<button data-href="#How-does-Search-Aggregation-differ-from-Grouping-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>Faites votre choix en fonction de la forme principale des résultats de l’application :</p>
<table>
<thead>
<tr><th>Besoin principal</th><th>Préférer</th><th>Réponse à exploiter</th></tr>
</thead>
<tbody>
<tr><td>Renvoie une liste d’entités classées standard avec moins de valeurs répétées dans un champ de regroupement</td><td><a href="/docs/fr/grouping-search.md">Recherche par regroupement</a></td><td>Résultats de recherche plats pour chaque vecteur de requête</td></tr>
<tr><td>Inspecter ou comparer les groupes sous forme de compartiments, avec des clés, des comptes, des métriques, un classement, des résultats représentatifs ou des compartiments enfants</td><td>Agrégation de recherche</td><td><code translate="no">AggregationBucket</code> objets dans <code translate="no">result.agg_buckets</code></td></tr>
</tbody>
</table>
<p>Même lorsque l’agrégation de recherche configure <code translate="no">top_hits</code>, sa réponse principale reste une arborescence de compartiments. La recherche par regroupement reste utile lorsque l’application traite déjà des résultats de recherche classiques et recherche avant tout la diversité des résultats.</p>
<p>Ces API s’excluent mutuellement. PyMilvus lève une exception « <code translate="no">ParamError</code> » lorsque « <code translate="no">search_aggregation</code> » est combiné avec « <code translate="no">group_by_field</code> » ou « <code translate="no">group_by_fields</code> » dans la même requête.</p>
