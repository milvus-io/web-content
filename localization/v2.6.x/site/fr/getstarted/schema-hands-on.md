---
id: schema-hands-on.md
title: Conception d'un modèle de données pour la recherche
summary: >-
  Les systèmes de recherche d'informations, également connus sous le nom de
  moteurs de recherche, sont essentiels pour diverses applications
  d'intelligence artificielle telles que la génération augmentée par la
  recherche (RAG), la recherche visuelle et la recommandation de produits. Au
  cœur de ces systèmes se trouve un modèle de données soigneusement conçu pour
  organiser, indexer et récupérer les informations.
---
<h1 id="Data-Model-Design-for-Search" class="common-anchor-header">Conception d'un modèle de données pour la recherche<button data-href="#Data-Model-Design-for-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Les systèmes de recherche d'informations, également connus sous le nom de moteurs de recherche, sont essentiels pour diverses applications d'intelligence artificielle telles que la génération augmentée par la recherche (RAG), la recherche visuelle et la recommandation de produits. Au cœur de ces systèmes se trouve un modèle de données soigneusement conçu pour organiser, indexer et récupérer les informations.</p>
<p>Milvus vous permet de spécifier le modèle de données de recherche par le biais d'un schéma de collection, organisant les données non structurées, leurs représentations vectorielles denses ou éparses et les métadonnées structurées. Que vous travailliez avec du texte, des images ou d'autres types de données, ce guide pratique vous aidera à comprendre et à appliquer les concepts clés des schémas pour concevoir un modèle de données de recherche dans la pratique.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/data-model-anatomy.png" alt="Data Model Anatomy" class="doc-image" id="data-model-anatomy" />
   </span> <span class="img-wrapper"> <span>Anatomie du modèle de données</span> </span></p>
<h2 id="Data-Model" class="common-anchor-header">Modèle de données<button data-href="#Data-Model" class="anchor-icon" translate="no">
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
    </button></h2><p>La conception du modèle de données d'un système de recherche implique l'analyse des besoins de l'entreprise et l'abstraction des informations dans un modèle de données exprimé par un schéma. Un schéma bien défini est important pour aligner le modèle de données sur les objectifs de l'entreprise et garantir la cohérence des données et la qualité du service.  En outre, le choix de types de données et d'index appropriés est important pour atteindre l'objectif de l'entreprise de manière économique.</p>
<h3 id="Analyzing-Business-Needs" class="common-anchor-header">Analyse des besoins de l'entreprise</h3><p>Pour répondre efficacement aux besoins de l'entreprise, il faut d'abord analyser les types de requêtes que les utilisateurs effectueront et déterminer les méthodes de recherche les plus appropriées.</p>
<ul>
<li><p><strong>Requêtes des utilisateurs :</strong> Identifiez les types de requêtes que les utilisateurs sont censés effectuer. Cela permet de s'assurer que votre schéma prend en charge les cas d'utilisation réels et optimise les performances de recherche. Il peut s'agir de</p>
<ul>
<li><p>la récupération de documents correspondant à une requête en langage naturel</p></li>
<li><p>la recherche d'images similaires à une image de référence ou correspondant à une description textuelle</p></li>
<li><p>la recherche de produits en fonction d'attributs tels que le nom, la catégorie ou la marque</p></li>
<li><p>le filtrage d'éléments sur la base de métadonnées structurées (par exemple, la date de publication, les étiquettes, les évaluations)</p></li>
<li><p>Combinaison de plusieurs critères dans des requêtes hybrides (par exemple, dans le cas d'une recherche visuelle, prise en compte de la similarité sémantique des images et de leurs légendes).</p></li>
</ul></li>
<li><p><strong>Méthodes de recherche :</strong> Choisissez les techniques de recherche appropriées qui correspondent aux types de requêtes que vos utilisateurs effectueront. Les différentes méthodes ont des objectifs différents et peuvent souvent être combinées pour obtenir des résultats plus performants :</p>
<ul>
<li><p><strong>Recherche sémantique</strong>: Elle utilise la similarité vectorielle dense pour trouver des éléments ayant une signification similaire, ce qui est idéal pour les données non structurées telles que les textes ou les images.</p></li>
<li><p><strong>Recherche en texte intégral</strong>: Complète la recherche sémantique avec la recherche par mots-clés.  La recherche en texte intégral peut utiliser l'analyse lexicale pour éviter de diviser les mots longs en jetons fragmentés, en saisissant les termes spéciaux lors de la recherche.</p></li>
<li><p><strong>Filtrage des métadonnées</strong>: En plus de la recherche vectorielle, il s'agit d'appliquer des contraintes telles que des plages de dates, des catégories ou des étiquettes.</p></li>
</ul></li>
</ul>
<h3 id="Translates-Business-Requirements-into-a-Search-Data-Model" class="common-anchor-header">Traduire les besoins de l'entreprise en un modèle de données de recherche</h3><p>L'étape suivante consiste à traduire vos exigences professionnelles en un modèle de données concret, en identifiant les principaux composants de vos informations et leurs méthodes de recherche :</p>
<ul>
<li><p>Définir les données à stocker, telles que le contenu brut (texte, images, audio), les métadonnées associées (titres, balises, auteur) et les attributs contextuels (horodatage, comportement de l'utilisateur, etc.).</p></li>
<li><p>Déterminer les types et formats de données appropriés pour chaque élément. Par exemple :</p>
<ul>
<li><p>Description de texte → chaîne de caractères</p></li>
<li><p>Incrustations d'images ou de documents → vecteurs denses ou épars</p></li>
<li><p>Catégories, étiquettes ou drapeaux → chaîne, tableau et bool</p></li>
<li><p>Attributs numériques tels que le prix ou l'évaluation → integer ou float</p></li>
<li><p>Informations structurées telles que les détails de l'auteur -&gt; json</p></li>
</ul></li>
</ul>
<p>Une définition claire de ces éléments garantit la cohérence des données, la précision des résultats de recherche et la facilité d'intégration avec les logiques d'application en aval.</p>
<h2 id="Schema-Design" class="common-anchor-header">Conception du schéma<button data-href="#Schema-Design" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans Milvus, le modèle de données est exprimé par un schéma de collection. La conception des champs appropriés dans un schéma de collection est essentielle pour permettre une recherche efficace. Chaque champ définit un type particulier de données stockées dans la collection et joue un rôle distinct dans le processus de recherche. Au niveau le plus élevé, Milvus prend en charge deux types principaux de champs : les <strong>champs vectoriels</strong> et les <strong>champs scalaires</strong>.</p>
<p>Vous pouvez maintenant mapper votre modèle de données dans un schéma de champs, y compris les vecteurs et tous les champs scalaires auxiliaires. Assurez-vous que chaque champ est en corrélation avec les attributs de votre modèle de données, en accordant une attention particulière à votre type de vecteur (dense ou spase) et à sa dimension.</p>
<h3 id="Vector-Field" class="common-anchor-header">Champ vectoriel</h3><p>Les champs vectoriels stockent les données intégrées pour les types de données non structurées tels que le texte, les images et l'audio. Ces encastrements peuvent être denses, épars ou binaires, en fonction du type de données et de la méthode d'extraction utilisée. En règle générale, les vecteurs denses sont utilisés pour la recherche sémantique, tandis que les vecteurs épars conviennent mieux à la recherche plein texte ou à la recherche lexicale. Les vecteurs binaires sont utiles lorsque les ressources de stockage et de calcul sont limitées. Une collection peut contenir plusieurs champs de vecteurs pour permettre des stratégies de recherche multimodales ou hybrides. Pour un guide détaillé sur ce sujet, veuillez vous référer à la <a href="/docs/fr/multi-vector-search.md">Recherche hybride multi-vecteurs</a>.</p>
<p>Milvus prend en charge les types de données vectorielles : <code translate="no">FLOAT_VECTOR</code> pour <a href="/docs/fr/dense-vector.md">Dense Vector</a>, <code translate="no">SPARSE_FLOAT_VECTOR</code> pour <a href="/docs/fr/sparse_vector.md">Sparse Vector</a> et <code translate="no">BINARY_VECTOR</code> pour <a href="/docs/fr/binary-vector.md">Binary Vector</a>.</p>
<h3 id="Scalar-Field" class="common-anchor-header">Champ scalaire</h3><p>Les champs scalaires stockent des valeurs primitives et structurées, communément appelées métadonnées, telles que des nombres, des chaînes de caractères ou des dates. Ces valeurs peuvent être renvoyées avec les résultats d'une recherche vectorielle et sont essentielles pour le filtrage et le tri. Elles permettent de restreindre les résultats de la recherche en fonction d'attributs spécifiques, par exemple en limitant les documents à une catégorie particulière ou à une période définie.</p>
<p>Milvus prend en charge les types scalaires tels que <code translate="no">BOOL</code>, <code translate="no">INT8/16/32/64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code>, <code translate="no">JSON</code> et <code translate="no">ARRAY</code> pour le stockage et le filtrage des données non vectorielles. Ces types améliorent la précision et la personnalisation des opérations de recherche.</p>
<h2 id="Leverage-Advanced-Features-in-Schema-Design" class="common-anchor-header">Exploiter les fonctionnalités avancées dans la conception des schémas<button data-href="#Leverage-Advanced-Features-in-Schema-Design" class="anchor-icon" translate="no">
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
    </button></h2><p>Lors de la conception d'un schéma, il ne suffit pas de faire correspondre vos données aux champs en utilisant les types de données pris en charge. Il est essentiel de bien comprendre les relations entre les champs et les stratégies disponibles pour la configuration. Le fait de garder à l'esprit les caractéristiques clés au cours de la phase de conception garantit que le schéma répond non seulement aux exigences immédiates en matière de traitement des données, mais qu'il est également évolutif et adaptable aux besoins futurs. En intégrant soigneusement ces fonctionnalités, vous pouvez construire une architecture de données solide qui maximise les capacités de Milvus et prend en charge votre stratégie et vos objectifs plus larges en matière de données. Voici une vue d'ensemble des principales caractéristiques permettant de créer un schéma de collecte :</p>
<h3 id="Primary-Key" class="common-anchor-header">Clé primaire</h3><p>Un champ de clé primaire est un composant fondamental d'un schéma, car il identifie de manière unique chaque entité au sein d'une collection. La définition d'une clé primaire est obligatoire. Il doit s'agir d'un champ scalaire de type entier ou chaîne et marqué comme <code translate="no">is_primary=True</code>. En option, vous pouvez activer <code translate="no">auto_id</code> pour la clé primaire, qui se voit automatiquement attribuer des nombres entiers qui augmentent de façon monolithique au fur et à mesure que des données sont ingérées dans la collection.</p>
<p>Pour plus de détails, voir <a href="/docs/fr/primary-field.md">Champ primaire et AutoID</a>.</p>
<h3 id="Partitioning" class="common-anchor-header">Partitionnement</h3><p>Pour accélérer la recherche, vous pouvez activer le partitionnement. En désignant un champ scalaire spécifique pour le partitionnement et en spécifiant des critères de filtrage basés sur ce champ pendant les recherches, l'étendue de la recherche peut être efficacement limitée aux seules partitions pertinentes. Cette méthode améliore considérablement l'efficacité des opérations de recherche en réduisant le domaine de recherche.</p>
<p>Pour plus de détails, voir <a href="/docs/fr/use-partition-key.md">Utiliser la clé de partition</a>.</p>
<h3 id="Analyzer" class="common-anchor-header">Analyseur</h3><p>Un analyseur est un outil essentiel pour le traitement et la transformation des données textuelles. Sa fonction principale est de convertir le texte brut en jetons et de les structurer pour l'indexation et la recherche. Pour ce faire, l'analyseur procède à la tokenisation de la chaîne de caractères, à la suppression des mots vides et à la troncature des mots individuels en tokens.</p>
<p>Pour plus de détails, reportez-vous à la section <a href="/docs/fr/analyzer-overview.md">Vue d'ensemble de l'analyseur</a>.</p>
<h3 id="Function" class="common-anchor-header">Fonction</h3><p>Milvus vous permet de définir des fonctions intégrées dans le cadre du schéma pour dériver automatiquement certains champs. Par exemple, vous pouvez ajouter une fonction BM25 intégrée qui génère un vecteur épars à partir d'un champ <code translate="no">VARCHAR</code> pour prendre en charge la recherche en texte intégral. Ces champs dérivés de fonctions simplifient le prétraitement et garantissent que la collection reste autonome et prête à être interrogée.</p>
<p>Pour plus de détails, voir <a href="/docs/fr/full-text-search.md">Recherche en texte intégral</a>.</p>
<h2 id="A-Real-World-Example" class="common-anchor-header">Un exemple concret<button data-href="#A-Real-World-Example" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans cette section, nous décrirons la conception du schéma et l'exemple de code pour une application de recherche de documents multimédias illustrée dans le diagramme ci-dessus. Ce schéma est conçu pour gérer un ensemble de données contenant des articles dont les données correspondent aux champs suivants :</p>
<table>
   <tr>
     <th><p><strong>Champ</strong></p></th>
     <th><p><strong>Source des données</strong></p></th>
     <th><p><strong>Utilisé par les méthodes de recherche</strong></p></th>
     <th><p><strong>Clé primaire</strong></p></th>
     <th><p><strong>Clé de partition</strong></p></th>
     <th><p><strong>Analyseur</strong></p></th>
     <th><p><strong>Fonction Entrée/Sortie</strong></p></th>
   </tr>
   <tr>
     <td><p>article_id (<code translate="no">INT64</code>)</p></td>
     <td><p>auto-généré avec activé <code translate="no">auto_id</code></p></td>
     <td><p><a href="/docs/fr/get-and-scalar-query.md">Requête à l'aide de Get</a></p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>titre (<code translate="no">VARCHAR</code>)</p></td>
     <td><p>titre de l'article</p></td>
     <td><p><a href="/docs/fr/keyword-match.md">Correspondance de texte</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>horodatage (<code translate="no">INT32</code>)</p></td>
     <td><p>date de publication</p></td>
     <td><p><a href="/docs/fr/use-partition-key.md">Filtrer par clé de partition</a></p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>texte (<code translate="no">VARCHAR</code>)</p></td>
     <td><p>texte brut de l'article</p></td>
     <td><p><a href="/docs/fr/multi-vector-search.md">Recherche hybride multisectorielle</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>entrée</p></td>
   </tr>
   <tr>
     <td><p>vecteur_dense_texte (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>vecteur dense généré par un modèle d'intégration de texte</p></td>
     <td><p><a href="https://zilliverse.feishu.cn/wiki/BaGlwzDmyiyVvVk6NurcFclInCd?from=from_parent_docs">Recherche vectorielle de base</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>vecteur_sparse_texte (<code translate="no">SPARSE_FLOAT_VECTOR</code>)</p></td>
     <td><p>vecteur clairsemé généré automatiquement par une fonction BM25 intégrée</p></td>
     <td><p><a href="https://zilliverse.feishu.cn/wiki/RQTRwhOVPiwnwokqr4scAtyfnBf?from=from_parent_docs">Recherche de texte intégral</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>sortie</p></td>
   </tr>
</table>
<p>Pour plus d'informations sur les schémas et des conseils détaillés sur l'ajout de différents types de champs, veuillez vous référer au document <a href="/docs/fr/schema.md">Schema Explained.</a></p>
<h3 id="Initialize-schema" class="common-anchor-header">Initialisation du schéma</h3><p>Pour commencer, nous devons créer un schéma vide. Cette étape permet d'établir une structure de base pour définir le modèle de données.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

schema = MilvusClient.create_schema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 2. Create an empty schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">//Skip this step using JavaScript</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

schema := entity.NewSchema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Skip this step using cURL</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-fields" class="common-anchor-header">Ajouter des champs</h3><p>Une fois le schéma créé, l'étape suivante consiste à spécifier les champs qui composeront vos données. Chaque champ est associé à un type de données et à des attributs.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

schema.add_field(field_name=<span class="hljs-string">&quot;article_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article id&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, enable_analyzer=<span class="hljs-literal">True</span>, enable_match=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">200</span>, description=<span class="hljs-string">&quot;article title&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;timestamp&quot;</span>, datatype=DataType.INT32, description=<span class="hljs-string">&quot;publish date&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">2000</span>, enable_analyzer=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article text content&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;text dense vector&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;text sparse vector&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;article_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">200</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .enableMatch(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;timestamp&quot;</span>)
        .dataType(DataType.Int32)
        .build())
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">2000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_dense_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;article_id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">200</span>,
        <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;timestamp&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int32</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">2000</span>,
        <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_dense_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_sparse_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>
    }
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;article_id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article id&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;title&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">200</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithEnableMatch(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article title&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;timestamp&quot;</span>).
    WithDataType(entity.FieldTypeInt32).
    WithDescription(<span class="hljs-string">&quot;publish date&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">2000</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article text content&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_dense_vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">768</span>).
    WithDescription(<span class="hljs-string">&quot;text dense vector&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector).
    WithDescription(<span class="hljs-string">&quot;text sparse vector&quot;</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> fields=<span class="hljs-string">&#x27;[
    {
        &quot;fieldName&quot;: &quot;article_id&quot;,
        &quot;dataType&quot;: &quot;Int64&quot;,
        &quot;isPrimary&quot;: true
    },
    {
        &quot;fieldName&quot;: &quot;title&quot;,
        &quot;dataType&quot;: &quot;VarChar&quot;,
        &quot;elementTypeParams&quot;: {
            &quot;max_length&quot;: 200,
            &quot;enable_analyzer&quot;: true,
            &quot;enable_match&quot;: true
        }
    },
    {
        &quot;fieldName&quot;: &quot;timestamp&quot;,
        &quot;dataType&quot;: &quot;Int32&quot;
    },
    {
       &quot;fieldName&quot;: &quot;text&quot;,
       &quot;dataType&quot;: &quot;VarChar&quot;,
       &quot;elementTypeParams&quot;: {
            &quot;max_length&quot;: 2000,
            &quot;enable_analyzer&quot;: true
        }
    },
    {
       &quot;fieldName&quot;: &quot;text_dense_vector&quot;,
       &quot;dataType&quot;: &quot;FloatVector&quot;,
       &quot;elementTypeParams&quot;: {
            &quot;dim&quot;: 768
        }
    },
    {
       &quot;fieldName&quot;: &quot;text_sparse_vector&quot;,
       &quot;dataType&quot;: &quot;SparseFloatVector&quot;,
    }
]&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: <span class="hljs-variable">$fields</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dans cet exemple, les attributs suivants sont spécifiés pour les champs :</p>
<ul>
<li><p>Clé primaire : le site <code translate="no">article_id</code> est utilisé comme clé primaire, ce qui permet d'attribuer automatiquement des clés primaires aux entités entrantes.</p></li>
<li><p>Clé de partition : le site <code translate="no">timestamp</code> est attribué comme clé de partition, ce qui permet de filtrer les entités par partition. Il peut s'agir</p></li>
<li><p>Analyseur de texte : l'analyseur de texte est appliqué à deux champs de chaîne <code translate="no">title</code> et <code translate="no">text</code> pour prendre en charge respectivement la correspondance de texte et la recherche en texte intégral.</p></li>
</ul>
<h3 id="Optional-Add-functions" class="common-anchor-header">(Facultatif) Ajouter des fonctions</h3><p>Pour améliorer les capacités d'interrogation des données, des fonctions peuvent être incorporées dans le schéma. Par exemple, une fonction peut être créée pour traiter des champs spécifiques.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;text_sparse_vector&quot;</span>],
    function_type=FunctionType.BM25,
)

schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-keyword">import</span> java.util.*;

schema.addFunction(Function.builder()
        .functionType(FunctionType.BM25)
        .name(<span class="hljs-string">&quot;text_bm25&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">FunctionType</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> functions = [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;text_bm25&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;bm25 function&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">BM25</span>,
      <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&#x27;text&#x27;</span>],
      <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&#x27;text_sparse_vector&#x27;</span>],
      <span class="hljs-attr">params</span>: {},
    },
]；
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">function := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;text_bm25&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>).
    WithType(entity.FunctionTypeBM25)
schema.WithFunction(function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> myFunctions=<span class="hljs-string">&#x27;[
    {
        &quot;name&quot;: &quot;text_bm25&quot;,
        &quot;type&quot;: &quot;BM25&quot;,
        &quot;inputFieldNames&quot;: [&quot;text&quot;],
        &quot;outputFieldNames&quot;: [&quot;text_sparse_vector&quot;],
        &quot;params&quot;: {}
    }
]&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: <span class="hljs-variable">$fields</span>
    \&quot;functions\&quot;: <span class="hljs-variable">$myFunctions</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Cet exemple ajoute une fonction BM25 intégrée au schéma, utilisant le champ <code translate="no">text</code> comme entrée et stockant les vecteurs épars résultants dans le champ <code translate="no">text_sparse_vector</code>.</p>
<h2 id="Next-Steps" class="common-anchor-header">Prochaines étapes<button data-href="#Next-Steps" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/fr/create-collection.md">Créer une collection</a></p></li>
<li><p><a href="/docs/fr/alter-collection-field.md">Modifier le champ de la collection</a></p></li>
</ul>
