---
id: architecture_overview.md
summary: >-
  Milvus fournit une base de données vectorielles rapide, fiable et stable,
  spécialement conçue pour la recherche de similarités et l'intelligence
  artificielle.
title: Présentation de l'architecture de Milvus
---
<h1 id="Milvus-Architecture-Overview" class="common-anchor-header">Présentation de l'architecture de Milvus<button data-href="#Milvus-Architecture-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Construit sur les bibliothèques de recherche vectorielle les plus populaires, notamment Faiss, HNSW, DiskANN et SCANN, Milvus a été conçu pour la recherche de similarités sur des ensembles de données vectorielles denses contenant des millions, des milliards, voire des trillions de vecteurs. Avant de poursuivre, familiarisez-vous avec les <a href="/docs/fr/v2.4.x/glossary.md">principes de base</a> de la recherche par incorporation.</p>
<p>Milvus prend également en charge le partage des données, l'ingestion de données en continu, les schémas dynamiques, la recherche combinant des données vectorielles et scalaires, la recherche multi-vectorielle et hybride, les vecteurs épars et de nombreuses autres fonctions avancées. La plateforme offre des performances à la demande et peut être optimisée pour s'adapter à n'importe quel scénario d'intégration et de recherche. Nous recommandons de déployer Milvus à l'aide de Kubernetes pour une disponibilité et une élasticité optimales.</p>
<p>Milvus adopte une architecture de stockage partagé qui présente une désagrégation du stockage et du calcul et une évolutivité horizontale pour ses nœuds de calcul. Suivant le principe de la désagrégation du plan de données et du plan de contrôle, Milvus comprend <a href="/docs/fr/v2.4.x/four_layers.md">quatre couches</a>: la couche d'accès, le service de coordination, le nœud de travail et le stockage. Ces couches sont mutuellement indépendantes en ce qui concerne la mise à l'échelle ou la reprise après sinistre.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvus_architecture.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" />
   </span> <span class="img-wrapper"> <span>Schéma de l'architecture</span> </span></p>
<p>Selon la figure, les interfaces peuvent être classées dans les catégories suivantes :</p>
<ul>
<li>DDL<strong>/ DCL :</strong> createCollection / createPartition / dropCollection / dropPartition / hasCollection / hasPartition</li>
<li><strong>DML / Produce :</strong> insert / delete / upsert</li>
<li><strong>DQL :</strong> recherche / requête</li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">Suite de l'article<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>En savoir plus sur la <a href="/docs/fr/v2.4.x/four_layers.md">désagrégation du calcul/stockage</a> dans Milvus</li>
<li>En savoir plus sur les <a href="/docs/fr/v2.4.x/main_components.md">principaux composants de</a> Milvus.</li>
</ul>
