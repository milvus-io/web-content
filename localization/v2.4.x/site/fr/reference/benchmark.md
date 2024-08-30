---
id: benchmark.md
summary: En savoir plus sur le résultat de référence de Milvus.
title: Rapport du test d'évaluation comparative de Milvus 2.2
---
<h1 id="Milvus-22-Benchmark-Test-Report" class="common-anchor-header">Rapport sur les tests d'évaluation comparative de Milvus 2.2<button data-href="#Milvus-22-Benchmark-Test-Report" class="anchor-icon" translate="no">
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
    </button></h1><p>Ce rapport présente les principaux résultats des tests de Milvus 2.2.0. Il vise à fournir une image des performances de recherche de Milvus 2.2.0, en particulier en ce qui concerne la capacité de mise à l'échelle et d'extension.</p>
<div class="alert note">
  <div style="display: flex;">
      <div style="flex:0.3;">
        <img translate="no" src="https://zilliz.com/images/whitepaper/performance.png" alt="Milvus Performance Evaluation 2023" />
      </div>
  </div>
  <div style="flex:1;padding: 10px;">
    <p>Nous avons récemment effectué une analyse comparative avec Milvus 2.2.3 et avons obtenu les résultats clés suivants :</p>
    <ul>
      <li>Une réduction de 2,5 fois de la latence de recherche</li>
      <li>Augmentation de 4,5 fois du QPS</li>
      <li>Recherche de similarités à l'échelle du milliard avec une faible dégradation des performances</li>
      <li>Évolutivité linéaire lors de l'utilisation de répliques multiples</li>
    </ul>
    <p>Pour plus de détails, nous vous invitons à consulter <a href="https://zilliz.com/resources/whitepaper/milvus-performance-benchmark">ce livre blanc</a> et le <a href="https://github.com/zilliztech/VectorDBBench">code de test de référence correspondant</a>. </p>
  </div>
</div>
<h2 id="Summary" class="common-anchor-header">Résumé<button data-href="#Summary" class="anchor-icon" translate="no">
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
<li>Par rapport à Milvus 2.1, le QPS de Milvus 2.2.0 augmente de plus de 48 % en mode cluster et de plus de 75 % en mode autonome.</li>
<li>Milvus 2.2.0 a une capacité impressionnante à s'étendre et à s'extraire :<ul>
<li>Le QPS augmente de façon linéaire lorsque le nombre de cœurs de CPU passe de 8 à 32.</li>
<li>Le QPS augmente linéairement lorsque les répliques Querynode passent de 1 à 8.</li>
</ul></li>
</ul>
<h2 id="Terminology" class="common-anchor-header">Terminologie<button data-href="#Terminology" class="anchor-icon" translate="no">
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
    </button></h2><p><details>
<summary>Cliquez pour voir les détails des termes utilisés dans le test.</summary>
<table class="terminology">
<thead>
<tr>
<th>Terme</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>nq</td>
<td>Nombre de vecteurs à rechercher dans une demande de recherche</td>
</tr>
<tr>
<td>topk</td>
<td>Nombre de vecteurs les plus proches à récupérer pour chaque vecteur (dans nq) dans une requête de recherche</td>
</tr>
<tr>
<td>ef</td>
<td>Paramètre de recherche spécifique à l'<a href="https://milvus.io/docs/v2.2.x/index.md">index HNSW</a></td>
</tr>
<tr>
<td>RT</td>
<td>Temps de réponse entre l'envoi de la demande et la réception de la réponse</td>
</tr>
<tr>
<td>QPS</td>
<td>Nombre de demandes de recherche traitées avec succès par seconde</td>
</tr>
</tbody>
</table>
</details></p>
<h2 id="Test-environment" class="common-anchor-header">Environnement de test<button data-href="#Test-environment" class="anchor-icon" translate="no">
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
    </button></h2><p>Tous les tests sont effectués dans les environnements suivants.</p>
<h3 id="Hardware-environment" class="common-anchor-header">Environnement matériel</h3><table>
<thead>
<tr><th>Matériel</th><th>Spécification</th></tr>
</thead>
<tbody>
<tr><td>UNITÉ CENTRALE</td><td>Intel® Xeon® Gold 6226R CPU @ 2.90GHz</td></tr>
<tr><td>Mémoire</td><td>16*\32 Go RDIMM, 3200 MT/s</td></tr>
<tr><td>SSD</td><td>SATA 6 Gbps</td></tr>
</tbody>
</table>
<h3 id="Software-environment" class="common-anchor-header">Environnement logiciel</h3><table>
<thead>
<tr><th>Logiciel</th><th>Version du logiciel</th></tr>
</thead>
<tbody>
<tr><td>Milvus</td><td>v2.2.0</td></tr>
<tr><td>Milvus GO SDK</td><td>v2.2.0</td></tr>
</tbody>
</table>
<h3 id="Deployment-scheme" class="common-anchor-header">Schéma de déploiement</h3><ul>
<li>Les instances Milvus (autonomes ou en cluster) sont déployées via <a href="https://milvus.io/docs/install_standalone-helm.md">Helm</a> sur un cluster Kubernetes basé sur des machines physiques ou virtuelles.</li>
<li>Les différents tests varient simplement dans le nombre de cœurs de CPU, la taille de la mémoire et le nombre de répliques (nœuds de travail), ce qui ne s'applique qu'aux clusters Milvus.</li>
<li>Les configurations non spécifiées sont identiques aux <a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/milvus/values.yaml">configurations par défaut</a>.</li>
<li>Les dépendances Milvus (MinIO, Pulsar et Etcd) stockent les données sur le disque SSD local de chaque nœud.</li>
<li>Les demandes de recherche sont envoyées aux instances Milvus via le <a href="https://github.com/milvus-io/milvus-sdk-go/tree/master/tests">SDK Milvus GO</a>.</li>
</ul>
<h3 id="Data-sets" class="common-anchor-header">Ensembles de données</h3><p>Le test utilise l'ensemble de données open-source SIFT (128 dimensions) de <a href="https://github.com/erikbern/ann-benchmarks/#data-sets">ANN-Benchmarks.</a></p>
<h2 id="Test-pipeline" class="common-anchor-header">Pipeline de test<button data-href="#Test-pipeline" class="anchor-icon" translate="no">
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
<li>Démarrer une instance Milvus par Helm avec les configurations de serveur respectives comme indiqué dans chaque test.</li>
<li>Se connecter à l'instance Milvus via Milvus GO SDK et obtenir les résultats des tests correspondants.</li>
<li>Créer une collection.</li>
<li>Insérer 1 million de vecteurs SIFT. Construire un index HNSW et configurer les paramètres de l'index en définissant <code translate="no">M</code> sur <code translate="no">8</code> et <code translate="no">efConstruction</code> sur <code translate="no">200</code>.</li>
<li>Chargez la collection.</li>
<li>Effectuez une recherche avec différents nombres simultanés avec les paramètres de recherche <code translate="no">nq=1, topk=1, ef=64</code>, la durée de chaque concurrence est d'au moins 1 heure.</li>
</ol>
<h2 id="Test-results" class="common-anchor-header">Résultats des tests<button data-href="#Test-results" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Milvus-220-vs-Milvus-210" class="common-anchor-header">Milvus 2.2.0 v.s. Milvus 2.1.0</h3><h4 id="Cluster" class="common-anchor-header">Cluster</h4><p><details>
<summary><b>Configurations de serveur (cluster)</b></summary><code translate="no">yaml queryNode: replicas: 1 resources: limits: cpu: &quot;12.0&quot; memory: 8Gi requests: cpu: &quot;12.0&quot; memory: 8Gi</code></details></p>
<p><strong>Performances de recherche</strong></p>
<table>
<thead>
<tr><th>Milvus</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>échec/s</th></tr>
</thead>
<tbody>
<tr><td>2.1.0</td><td>6904</td><td>59</td><td>28</td><td>0</td></tr>
<tr><td>2.2.0</td><td>10248</td><td>63</td><td>24</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/cluster_search_performance_210_vs_220.png" alt="Cluster search performance" class="doc-image" id="cluster-search-performance" />
   </span> <span class="img-wrapper"> <span>Performances de la recherche en grappe</span> </span></p>
<h4 id="Standalone" class="common-anchor-header">Autonome</h4><p><details>
<summary><b>Configurations de serveurs (autonomes)</b></summary><code translate="no">yaml standalone: replicas: 1 resources: limits: cpu: &quot;12.0&quot; memory: 16Gi requests: cpu: &quot;12.0&quot; memory: 16Gi</code></details></p>
<p><strong>Performances de recherche</strong></p>
<table>
<thead>
<tr><th>Milvus</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>échec/s</th></tr>
</thead>
<tbody>
<tr><td>2.1.0</td><td>4287</td><td>104</td><td>76</td><td>0</td></tr>
<tr><td>2.2.0</td><td>7522</td><td>127</td><td>79</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/standalone_search_performance_210_vs_220.png" alt="Standalone search performance" class="doc-image" id="standalone-search-performance" />
   </span> <span class="img-wrapper"> <span>Performances de la recherche autonome</span> </span></p>
<h3 id="Milvus-220-Scale-up" class="common-anchor-header">Milvus 2.2.0 Mise à l'échelle</h3><p>Augmenter les cœurs de CPU dans un Querynode pour vérifier la capacité de montée en charge.</p>
<p><details>
<summary><b>Configurations de serveur (cluster)</b></summary><code translate="no">yaml queryNode: replicas: 1 resources: limits: cpu: &quot;8.0&quot; /&quot;12.0&quot; /&quot;16.0&quot; /&quot;32.0&quot; memory: 8Gi requests: cpu: &quot;8.0&quot; /&quot;12.0&quot; /&quot;16.0&quot; /&quot;32.0&quot; memory: 8Gi</code></details></p>
<p><strong>Performances de recherche</strong></p>
<table>
<thead>
<tr><th>Cœurs de CPU</th><th>Nombre simultané</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>fail/s</th></tr>
</thead>
<tbody>
<tr><td>8</td><td>500</td><td>7153</td><td>127</td><td>83</td><td>0</td></tr>
<tr><td>12</td><td>300</td><td>10248</td><td>63</td><td>24</td><td>0</td></tr>
<tr><td>16</td><td>600</td><td>14135</td><td>85</td><td>42</td><td>0</td></tr>
<tr><td>32</td><td>600</td><td>20281</td><td>63</td><td>28</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/search_performance_by_querynode_cpu_cores.png" alt="Search performance by Querynode CPU cores" class="doc-image" id="search-performance-by-querynode-cpu-cores" />
   </span> <span class="img-wrapper"> <span>Performances de recherche par cœur d'unité centrale Querynode</span> </span></p>
<h3 id="Milvus-220-Scale-out" class="common-anchor-header">Milvus 2.2.0 Scale-out</h3><p>Développez plus de répliques avec plus de Querynodes pour vérifier la capacité de mise à l'échelle.</p>
<div class="alert note">
<p>Remarque : le nombre de Querynodes est égal à <code translate="no">replica_number</code> lors du chargement de la collection.</p>
</div>
<p><details>
<summary><b>Configurations de serveur (cluster)</b></summary><code translate="no">yaml queryNode: replicas: 1 / 2 / 4 / 8 resources: limits: cpu: &quot;8.0&quot; memory: 8Gi requests: cpu: &quot;8.0&quot; memory: 8Gi</code></details></p>
<table>
<thead>
<tr><th>Répliques</th><th>Nombre simultané</th><th>QPS</th><th>RT(TP99) / ms</th><th>RT(TP50) / ms</th><th>fail/s</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>500</td><td>7153</td><td>127</td><td>83</td><td>0</td></tr>
<tr><td>2</td><td>500</td><td>15903</td><td>105</td><td>27</td><td>0</td></tr>
<tr><td>4</td><td>800</td><td>19281</td><td>109</td><td>40</td><td>0</td></tr>
<tr><td>8</td><td>1200</td><td>30655</td><td>93</td><td>38</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/search_performance_by_querynode_replicas.png" alt="Search performance by Querynode replicas" class="doc-image" id="search-performance-by-querynode-replicas" />
   </span> <span class="img-wrapper"> <span>Performances de recherche par réplicas Querynode</span> </span></p>
<h2 id="Whats-next" class="common-anchor-header">Prochaine étape<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Essayez d'effectuer les tests de référence de Milvus 2.2.0 par vous-même en vous référant à <a href="https://milvus.io/blog/2022-08-16-A-Quick-Guide-to-Benchmarking-Milvus-2-1.md">ce</a> guide, sauf que vous devez utiliser Milvus 2.2 et Pymilvus 2.2 dans ce guide.</li>
</ul>
