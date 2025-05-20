---
id: knowhere.md
summary: En savoir plus sur Knowhere à Milvus.
title: Knowhere
---
<h1 id="Knowhere" class="common-anchor-header">Knowhere<button data-href="#Knowhere" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette rubrique présente Knowhere, le moteur d'exécution vectorielle de Milvus.</p>
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
    </button></h2><p>Knowhere est le moteur d'exécution vectorielle central de Milvus, qui intègre plusieurs bibliothèques de recherche de similarités vectorielles, notamment <a href="https://github.com/facebookresearch/faiss">Faiss</a>, <a href="https://github.com/nmslib/hnswlib">Hnswlib</a> et <a href="https://github.com/spotify/annoy">Annoy</a>. Knowhere est également conçu pour prendre en charge l'informatique hétérogène. Il contrôle sur quel matériel (CPU ou GPU) exécuter la construction de l'index et les requêtes de recherche. C'est ainsi que Knowhere tire son nom : savoir où exécuter les opérations. D'autres types de matériel, notamment les DPU et TPU, seront pris en charge dans les prochaines versions.</p>
<h2 id="Knowhere-in-the-Milvus-architecture" class="common-anchor-header">Knowhere dans l'architecture Milvus<button data-href="#Knowhere-in-the-Milvus-architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>La figure ci-dessous illustre la position de Knowhere dans l'architecture Milvus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/knowhere_architecture.png" alt="Knowhere" class="doc-image" id="knowhere" />
   </span> <span class="img-wrapper"> <span>Knowhere</span> </span></p>
<p>La couche la plus basse est le matériel du système. Au-dessus se trouvent les bibliothèques d'indexation de tiers. À la couche supérieure, Knowhere interagit avec le nœud d'index et le nœud de requête via CGO, qui permet aux paquets Go d'appeler du code C.</p>
<h2 id="Knowhere-advantages" class="common-anchor-header">Avantages de Knowhere<button data-href="#Knowhere-advantages" class="anchor-icon" translate="no">
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
    </button></h2><p>Voici les avantages de Knowhere par rapport à Faiss.</p>
<h4 id="Support-for-BitsetView" class="common-anchor-header">Prise en charge de BitsetView</h4><p>Milvus introduit un mécanisme de bitset pour réaliser la &quot;suppression douce&quot;. Un vecteur supprimé en douceur existe toujours dans la base de données mais ne sera pas calculé lors d'une recherche ou d'une requête de similarité vectorielle.</p>
<p>Chaque bit d'un jeu de bits correspond à un vecteur indexé. Si un vecteur est marqué "1" dans l'ensemble de bits, cela signifie que ce vecteur est supprimé et qu'il ne sera pas pris en compte lors d'une recherche de vecteurs. Le paramètre de bitset est appliqué à toutes les API de requête d'index Faiss exposées dans Knowhere, y compris les index CPU et GPU.</p>
<p>Pour plus d'informations sur le mécanisme de bitset, consultez <a href="/docs/fr/v2.4.x/bitset.md">bitset</a>.</p>
<h4 id="Support-for-multiple-similarity-metrics-for-indexing-binary-vectors" class="common-anchor-header">Prise en charge de plusieurs mesures de similarité pour l'indexation de vecteurs binaires</h4><p>Knowhere supporte <a href="/docs/fr/v2.4.x/metric.md#Hamming-distance">Hamming</a>, <a href="/docs/fr/v2.4.x/metric.md#Jaccard-distance">Jaccard</a>, <a href="/docs/fr/v2.4.x/metric.md#Tanimoto-distance">Tanimoto</a>, <a href="/docs/fr/v2.4.x/metric.md#Superstructure">Superstructure</a> et <a href="/docs/fr/v2.4.x/metric.md#Substructure">Substructure</a>. Jaccard et Tanimoto peuvent être utilisés pour mesurer la similarité entre deux ensembles d'échantillons, tandis que Superstructure et Substructure peuvent être utilisés pour mesurer la similarité des structures chimiques.</p>
<h4 id="Support-for-AVX512-instruction-set" class="common-anchor-header">Prise en charge du jeu d'instructions AVX512</h4><p>Outre <a href="https://en.wikipedia.org/wiki/AArch64">AArch64</a>, <a href="https://en.wikipedia.org/wiki/SSE4#SSE4.2">SSE4.2</a> et <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions">AVX2</a>, les jeux d'instructions déjà pris en charge par Faiss, Knowhere prend également en charge <a href="https://en.wikipedia.org/wiki/AVX-512">AVX512</a>, qui peut <a href="https://milvus.io/blog/milvus-performance-AVX-512-vs-AVX2.md">améliorer les performances de construction d'index et d'interrogation de 20 à 30 %</a> par rapport à AVX2.</p>
<h4 id="Automatic-SIMD-instruction-selection" class="common-anchor-header">Sélection automatique des instructions SIMD</h4><p>Knowhere permet d'invoquer automatiquement les instructions SIMD appropriées (par exemple, SIMD SSE, AVX, AVX2 et AVX512) sur n'importe quel processeur (à la fois sur les plates-formes sur site et en nuage), de sorte que les utilisateurs n'ont pas besoin de spécifier manuellement le drapeau SIMD (par exemple, "-msse4") pendant la compilation.</p>
<p>Knowhere est construit en remaniant la base de code de Faiss. Les fonctions communes (par exemple, le calcul de similarité) qui dépendent des accélérations SIMD sont supprimées. Ensuite, pour chaque fonction, quatre versions (SSE, AVX, AVX2, AVX512) sont implémentées et chacune est placée dans un fichier source séparé. Les fichiers sources sont ensuite compilés individuellement avec le drapeau SIMD correspondant. Ainsi, au moment de l'exécution, Knowhere peut automatiquement choisir les instructions SIMD les mieux adaptées en fonction des drapeaux actuels de l'unité centrale et lier les bons pointeurs de fonction à l'aide de l'accrochage.</p>
<h4 id="Other-performance-optimization" class="common-anchor-header">Autres optimisations des performances</h4><p>Lisez <a href="https://www.cs.purdue.edu/homes/csjgwang/pubs/SIGMOD21_Milvus.pdf">Milvus : A Purpose-Built Vector Data Management System</a> pour en savoir plus sur l'optimisation des performances de Knowhere.</p>
<h2 id="Knowhere-code-structure" class="common-anchor-header">Structure du code de Knowhere<button data-href="#Knowhere-code-structure" class="anchor-icon" translate="no">
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
    </button></h2><p>Le calcul dans Milvus implique principalement des opérations vectorielles et scalaires. Knowhere ne gère que les opérations d'indexation des vecteurs.</p>
<p>Un index est une structure de données indépendante des données vectorielles d'origine. En général, l'indexation nécessite quatre étapes : créer un index, former des données, insérer des données et construire un index. Dans certaines applications d'intelligence artificielle, la formation des ensembles de données est séparée de la recherche vectorielle. Les données des ensembles de données sont d'abord formées, puis insérées dans une base de données vectorielles telle que Milvus pour la recherche de similarités. Par exemple, les jeux de données ouverts sift1M et sift1B différencient les données pour la formation et les données pour les tests.</p>
<p>Cependant, dans Knowhere, les données pour l'entraînement et pour la recherche sont les mêmes. Knowhere forme toutes les données d'un <a href="https://milvus.io/blog/deep-dive-1-milvus-architecture-overview.md#Segments">segment</a>, puis insère toutes les données formées et construit un index pour elles.</p>
<h4 id="DataObj-base-class" class="common-anchor-header"><code translate="no">DataObj</code>Classe de base</h4><p><code translate="no">DataObj</code> est la classe de base de toutes les structures de données dans Knowhere. <code translate="no">Size()</code> est la seule méthode virtuelle dans <code translate="no">DataObj</code>. La classe Index hérite de <code translate="no">DataObj</code> avec un champ nommé &quot;size_&quot;. La classe Index possède également deux méthodes virtuelles - <code translate="no">Serialize()</code> et <code translate="no">Load()</code>. La classe <code translate="no">VecIndex</code> dérivée de <code translate="no">Index</code> est la classe de base virtuelle pour tous les index vectoriels. <code translate="no">VecIndex</code> fournit des méthodes, notamment <code translate="no">Train()</code>, <code translate="no">Query()</code>, <code translate="no">GetStatistics()</code> et <code translate="no">ClearStatistics()</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Knowhere_base_classes.png" alt="base class" class="doc-image" id="base-class" />
   </span> <span class="img-wrapper"> <span>classe de base</span> </span></p>
<p>D'autres types d'index sont énumérés à droite dans la figure ci-dessus.</p>
<ul>
<li><p>L'index Faiss a deux classes de base : <code translate="no">FaissBaseIndex</code> pour tous les index sur les vecteurs à virgule flottante et <code translate="no">FaissBaseBinaryIndex</code> pour tous les index sur les vecteurs binaires.</p></li>
<li><p><code translate="no">GPUIndex</code> est la classe de base pour tous les index GPU de Faiss.</p></li>
<li><p><code translate="no">OffsetBaseIndex</code> est la classe de base pour tous les index auto-développés. Étant donné que seuls les ID des vecteurs sont stockés dans un fichier d'index, la taille du fichier pour les vecteurs à 128 dimensions peut être réduite de deux ordres de grandeur.</p></li>
</ul>
<h4 id="IDMAP-brute-force-search" class="common-anchor-header"><code translate="no">IDMAP</code>Recherche par force brute</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/IDMAP.png" alt="IDMAP" class="doc-image" id="idmap" />
   </span> <span class="img-wrapper"> <span>IDMAP</span> </span></p>
<p>Techniquement parlant, <code translate="no">IDMAP</code> n'est pas un index, mais est plutôt utilisé pour la recherche par force brute. Lorsque les vecteurs sont insérés dans la base de données, il n'est pas nécessaire de procéder à un apprentissage des données ni à la construction d'un index. Les recherches seront effectuées directement sur les données vectorielles insérées.</p>
<p>Toutefois, pour des raisons de cohérence du code, <code translate="no">IDMAP</code> hérite également de la classe <code translate="no">VecIndex</code> et de toutes ses interfaces virtuelles. L'utilisation de <code translate="no">IDMAP</code> est la même que celle des autres indices.</p>
<h4 id="IVF-indices" class="common-anchor-header">Indices IVF</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/IVF.png" alt="IVF" class="doc-image" id="ivf" />
   </span> <span class="img-wrapper"> <span>IVF</span> </span></p>
<p>Les indices IVF (fichier inversé) sont les plus fréquemment utilisés. La classe <code translate="no">IVF</code> est dérivée de <code translate="no">VecIndex</code> et <code translate="no">FaissBaseIndex</code>, et s'étend à <code translate="no">IVFSQ</code> et <code translate="no">IVFPQ</code>. <code translate="no">GPUIVF</code> est dérivée de <code translate="no">GPUIndex</code> et <code translate="no">IVF</code>. Puis <code translate="no">GPUIVF</code> s'étend à <code translate="no">GPUIVFSQ</code> et <code translate="no">GPUIVFPQ</code>.</p>
<p><code translate="no">IVFSQHybrid</code> est un indice hybride que nous avons développé nous-mêmes. Un quantificateur grossier est exécuté sur le GPU tandis que la recherche dans le seau est effectuée sur le CPU. Ce type d'index peut réduire la fréquence des copies de mémoire entre le CPU et le GPU en tirant parti de la puissance de calcul du GPU. <code translate="no">IVFSQHybrid</code> a le même taux de rappel que <code translate="no">GPUIVFSQ</code> mais offre de meilleures performances.</p>
<p>La structure des classes de base pour les indices binaires est relativement simple. <code translate="no">BinaryIDMAP</code> et <code translate="no">BinaryIVF</code> sont dérivés de <code translate="no">FaissBaseBinaryIndex</code> et <code translate="no">VecIndex</code>.</p>
<h4 id="Third-party-indices" class="common-anchor-header">Indices de tiers</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/third_party_index.png" alt="third-party indices" class="doc-image" id="third-party-indices" />
   </span> <span class="img-wrapper"> <span>Indices de tiers</span> </span></p>
<p>Actuellement, seuls deux types d'indices tiers sont pris en charge en dehors de Faiss : l'indice basé sur les arbres <code translate="no">Annoy</code> et l'indice basé sur les graphes <code translate="no">HNSW</code>. Ces deux indices tiers courants et fréquemment utilisés sont tous deux dérivés de <code translate="no">VecIndex</code>.</p>
<h2 id="Adding-indices-to-Knowhere" class="common-anchor-header">Ajout d'index à Knowhere<button data-href="#Adding-indices-to-Knowhere" class="anchor-icon" translate="no">
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
    </button></h2><p>Si vous souhaitez ajouter de nouveaux indices à Knowhere, vous pouvez d'abord vous référer aux indices existants :</p>
<ul>
<li><p>Pour ajouter des indices basés sur la quantification, consultez <code translate="no">IVF_FLAT</code>.</p></li>
<li><p>Pour ajouter des indices basés sur des graphes, consultez <code translate="no">HNSW</code>.</p></li>
<li><p>Pour ajouter des index basés sur des arbres, consultez <code translate="no">Annoy</code>.</p></li>
</ul>
<p>Après avoir fait référence à l'index existant, vous pouvez suivre les étapes ci-dessous pour ajouter un nouvel index à Knowhere.</p>
<ol>
<li><p>Ajoutez le nom du nouvel index dans <code translate="no">IndexEnum</code>. Le type de données est une chaîne.</p></li>
<li><p>Ajoutez un contrôle de validation des données sur le nouvel index dans le fichier <code translate="no">ConfAdapter.cpp</code>. Le contrôle de validation sert principalement à valider les paramètres de formation des données et de requête.</p></li>
<li><p>Créez un nouveau fichier pour le nouvel index. La classe de base du nouvel index doit inclure <code translate="no">VecIndex</code> et l'interface virtuelle nécessaire de <code translate="no">VecIndex</code>.</p></li>
<li><p>Ajoutez la logique de construction de l'index pour le nouvel index dans <code translate="no">VecIndexFactory::CreateVecIndex()</code>.</p></li>
<li><p>Ajoutez le test unitaire dans le répertoire <code translate="no">unittest</code>.</p></li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">Prochaines étapes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Après avoir appris comment Knowhere fonctionne dans Milvus, vous voudrez peut-être.. :</p>
<ul>
<li><p>Découvrir les <a href="/docs/fr/v2.4.x/index.md">différents types d'index pris en charge par Milvus</a>.</p></li>
<li><p>En savoir plus sur le <a href="/docs/fr/v2.4.x/bitset.md">mécanisme des bitsets</a>.</p></li>
<li><p>Comprendre <a href="/docs/fr/v2.4.x/data_processing.md">comment les données sont traitées</a> dans Milvus.</p></li>
</ul>
