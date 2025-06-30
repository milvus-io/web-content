---
id: main_components.md
summary: Découvrez les principaux composants de Milvus standalone et cluster.
title: Composants principaux
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
    </button></h1><p>Un cluster Milvus comprend cinq composants principaux et trois dépendances tierces. Chaque composant peut être déployé indépendamment sur Kubernetes :</p>
<h2 id="Milvus-components" class="common-anchor-header">Composants Milvus<button data-href="#Milvus-components" class="anchor-icon" translate="no">
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
<li>Coordinateur : le mode maître-esclave peut être activé pour fournir une haute disponibilité.</li>
<li>Proxy : un ou plusieurs par cluster</li>
<li>Nœud de streaming : un ou plusieurs par cluster</li>
<li>Nœud de requête : un ou plusieurs par cluster</li>
<li>Nœud de données : un ou plusieurs par cluster</li>
</ul>
<h2 id="Third-party-dependencies" class="common-anchor-header">Dépendances tierces<button data-href="#Third-party-dependencies" class="anchor-icon" translate="no">
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
<li><strong>Magasin de métadonnées :</strong> Stocke les métadonnées pour divers composants dans le milvus, par exemple etcd.</li>
<li><strong>Stockage d'objets :</strong> Responsable de la persistance des données des fichiers volumineux dans le milvus, tels que les fichiers d'index et les fichiers journaux binaires, par exemple S3.</li>
<li><strong>Stockage WAL :</strong> Fournit un service de journal en avance sur l'écriture (WAL) pour le milvus, par exemple woodpecker.<ul>
<li>Dans le mode zéro disque de woodpecker, le <strong>WAL</strong> utilise directement le stockage d'objets et le méta stockage sans autre déploiement, ce qui réduit les dépendances des tiers.</li>
</ul></li>
</ul>
<h2 id="Milvus-deployment-modes" class="common-anchor-header">Modes de déploiement de Milvus<button data-href="#Milvus-deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Il existe deux modes d'exécution de Milvus :</p>
<h3 id="Standalone" class="common-anchor-header">Autonome</h3><p>Une instance unique de Milvus qui exécute tous les composants dans un seul processus, ce qui convient aux petits ensembles de données et aux faibles charges de travail. En outre, en mode autonome, des implémentations WAL plus simples, telles que woodpecker et rocksmq, peuvent être choisies pour éliminer la nécessité de dépendances de stockage WAL tiers.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/standalone_architecture.png" alt="Standalone_architecture" class="doc-image" id="standalone_architecture" />
   </span> <span class="img-wrapper"> <span>Architecture autonome</span> </span></p>
<p>Actuellement, il n'est pas possible d'effectuer une mise à niveau en ligne d'une instance Milvus autonome vers un cluster Milvus, même si le backend de stockage WAL prend en charge le mode cluster.</p>
<h3 id="Cluster" class="common-anchor-header">Cluster</h3><p>Mode de déploiement distribué de Milvus dans lequel chaque composant s'exécute indépendamment et peut être mis à l'échelle pour plus d'élasticité. Cette configuration convient aux grands ensembles de données et aux scénarios à forte charge.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/distributed_architecture.png" alt="Distributed_architecture" class="doc-image" id="distributed_architecture" />
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
<li>Lire <a href="/docs/fr/four_layers.md">Disagrégation du calcul/stockage</a> pour comprendre le mécanisme et le principe de conception de Milvus.</li>
</ul>
