---
id: main_components.md
summary: Découvrez les principaux composants de Milvus standalone et cluster.
title: Principaux éléments
---
<h1 id="Main-Components" class="common-anchor-header">Composants principaux<button data-href="#Main-Components" class="anchor-icon" translate="no">
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
    </button></h1><p>Il existe deux modes d'exécution de Milvus : autonome et en grappe. Ces deux modes partagent les mêmes fonctionnalités. Vous pouvez choisir le mode qui convient le mieux à la taille de votre ensemble de données, à vos données de trafic, etc. Pour l'instant, Milvus standalone ne peut pas être mis à niveau "en ligne" vers Milvus cluster.</p>
<h2 id="Milvus-standalone" class="common-anchor-header">Milvus autonome<button data-href="#Milvus-standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus standalone comprend trois composants :</p>
<ul>
<li><p><strong>Milvus :</strong> le composant fonctionnel de base.</p></li>
<li><p><strong>Meta Store :</strong> Le moteur de métadonnées, qui accède aux métadonnées des composants internes de Milvus et les stocke, y compris les proxies, les nœuds d'index, etc.</p></li>
<li><p><strong>Stockage d'objets :</strong> Le moteur de stockage, qui est responsable de la persistance des données pour Milvus.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/standalone_architecture.jpg" alt="Standalone_architecture" class="doc-image" id="standalone_architecture" />
   </span> <span class="img-wrapper"> <span>Architecture autonome</span> </span></p>
<h2 id="Milvus-cluster" class="common-anchor-header">Cluster Milvus<button data-href="#Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Le<strong>cluster Milvus</strong> comprend sept composants microservices et trois dépendances tierces. Tous les microservices peuvent être déployés sur Kubernetes, indépendamment les uns des autres.</p>
<h3 id="Microservice-components" class="common-anchor-header">Composants de microservices</h3><ul>
<li>Coordonnée racine</li>
<li>Proxy</li>
<li>Coordonnateur de requête</li>
<li>Nœud de requête</li>
<li>Coordonnée de données</li>
<li>Nœud d'index</li>
<li>Nœud de données</li>
</ul>
<h3 id="Third-party-dependencies" class="common-anchor-header">Dépendances de tiers</h3><ul>
<li><strong>Magasin de métadonnées :</strong> Stocke les métadonnées des différents composants du cluster, par exemple etcd.</li>
<li><strong>Stockage d'objets :</strong> Responsable de la persistance des données des fichiers volumineux dans le cluster, tels que les index et les fichiers journaux binaires, par exemple S3.</li>
<li><strong>Log Broker :</strong> Gère les journaux des opérations de mutation récentes, produit des journaux en continu et fournit des services de publication et d'abonnement aux journaux, par exemple Pulsar.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/distributed_architecture.jpg" alt="Distributed_architecture" class="doc-image" id="distributed_architecture" />
   </span> <span class="img-wrapper"> <span>Architecture distribuée</span> </span></p>
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
    </button></h2><ul>
<li>Lire <a href="/docs/fr/v2.4.x/four_layers.md">Computing/Storage Disaggregation</a> pour comprendre le mécanisme et le principe de conception de Milvus.</li>
</ul>
