---
id: multi_tenancy.md
related_key: multi-tenancy
summary: Multi-tenance dans Milvus.
title: Stratégies multi-locataires
---
<h1 id="Multi-tenancy-strategies" class="common-anchor-header">Stratégies multi-locataires<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h1><p>Dans de nombreux cas d'utilisation, les développeurs souhaitent exécuter un cluster Milvus et servir plusieurs locataires, tels que quelques équipes de produits ou des millions d'utilisateurs finaux. Ce guide explique quelques stratégies différentes pour parvenir à une multi-tenance sur Milvus.</p>
<p>Milvus est conçu pour prendre en charge le multi-tenant au niveau de la base de données, de la collection ou de la partition. L'objectif de la multi-location est de séparer les données et les ressources les unes des autres. La mise en œuvre de l'utilisation multiple à différents niveaux peut permettre d'atteindre différents degrés d'isolation, mais implique également différents frais généraux. Nous expliquons ici les compromis entre ces différents niveaux.</p>
<h2 id="Database-oriented-multi-tenancy" class="common-anchor-header">Multi-tenance orientée base de données<button data-href="#Database-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>Depuis la version 2.2.9 de Milvus, vous pouvez créer plusieurs bases de données dans un seul cluster Milvus. Cette fonctionnalité permet d'obtenir une multi-location orientée base de données en attribuant une base de données à chaque locataire, de sorte qu'ils puissent créer leurs propres collections. Cette approche offre la meilleure isolation des données et des ressources pour les locataires, mais elle est limitée à 64 bases de données au maximum dans un cluster.</p>
<h2 id="Collection-oriented-multi-tenancy" class="common-anchor-header">Multi-tenance orientée collection<button data-href="#Collection-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>Il existe deux façons d'obtenir une multi-location orientée collection.</p>
<h3 id="One-collection-for-all-tenants" class="common-anchor-header">Une collection pour tous les locataires</h3><p>L'utilisation d'une collection unique pour mettre en œuvre la multi-location en ajoutant un champ de locataire pour distinguer les locataires est une option simple. Lorsque vous effectuez des recherches ANN pour un locataire spécifique, ajoutez une expression de filtrage pour éliminer toutes les entités qui appartiennent à d'autres locataires. Il s'agit de la méthode la plus simple pour parvenir à la multi-location. Toutefois, sachez que les performances du filtre peuvent devenir le goulot d'étranglement des recherches ANN. Pour améliorer les performances de recherche, vous pouvez optimiser la multi-location orientée partition ci-dessous.</p>
<h3 id="One-collection-per-tenant" class="common-anchor-header">Une collection par locataire</h3><p>Une autre approche consiste à créer une collection pour chaque locataire afin de stocker ses propres données, au lieu de stocker les données de tous les locataires dans une seule collection. Cela permet de mieux isoler les données et d'améliorer les performances des requêtes. Cependant, il faut garder à l'esprit que cette approche nécessite plus de ressources pour la planification et qu'elle est limitée à 10 000 collections au maximum dans une grappe.</p>
<h2 id="Partition-oriented-multi-tenancy" class="common-anchor-header">Multi-tenance orientée partition<button data-href="#Partition-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>Il existe deux façons d'obtenir une multi-location orientée partition :</p>
<h3 id="One-partition-per-tenant" class="common-anchor-header">Une partition par locataire</h3><p>La gestion d'une seule collection est beaucoup plus facile que la gestion de plusieurs collections. Au lieu de créer plusieurs collections, envisagez d'attribuer une partition à chaque locataire afin d'obtenir une isolation des données et une gestion de la mémoire flexibles. Les performances de recherche de la multi-location orientée partition sont bien meilleures que celles de la multi-location orientée collection. Il convient toutefois de noter que le nombre de locataires de la collection ne doit pas dépasser le nombre maximal de partitions qu'une collection peut contenir.</p>
<h3 id="Partition-key-based-multi-tenancy" class="common-anchor-header">Multi-tenance basée sur les clés de partition</h3><p>Milvus 2.2.9 introduit une nouvelle fonctionnalité appelée clé de partition. Lors de la création d'une collection, nommez un champ de locataire et faites-en le champ de clé de partition. Milvus stocke les entités dans une partition en fonction de la valeur de hachage du champ de clé de partition. Lors des recherches ANN, Milvus ne recherche que la partition qui contient la clé de partition. Cela réduit considérablement la portée de la recherche et permet d'obtenir de meilleures performances qu'en l'absence de clé de partition.</p>
</div>
<p>Cette stratégie lève la limite du nombre maximum de locataires qu'une collection Milvus peut prendre en charge et simplifie considérablement la gestion des ressources car Milvus gère automatiquement les partitions pour vous.</p>
<p>Pour récapituler, vous pouvez utiliser l'une ou l'autre des stratégies multi-locataires ci-dessus, ou certaines d'entre elles, pour créer votre propre solution. Le tableau suivant établit des comparaisons entre ces stratégies en termes d'isolation des données, de performances de recherche et de nombre maximum de locataires.</p>
<table>
<thead>
<tr><th></th><th>Isolation des données</th><th>Performances de recherche</th><th>Nombre maximal de locataires</th><th>Scénarios recommandés</th></tr>
</thead>
<tbody>
<tr><td>Orienté base de données</td><td>Forte</td><td>Forte</td><td>64</td><td>Pour ceux qui ont besoin que les collections varient en fonction des projets, particulièrement adapté à l'isolation des données entre les départements de votre organisation.</td></tr>
<tr><td>Une seule collection pour tous</td><td>Faible</td><td>Moyenne</td><td>SANS OBJET</td><td>Pour ceux qui ont des ressources limitées et qui ne sont pas sensibles à l'isolation des données.</td></tr>
<tr><td>Une collection par locataire</td><td>Fort</td><td>Fort</td><td>Moins de 10 000</td><td>Pour ceux qui ont moins de 10 000 locataires par cluster.</td></tr>
<tr><td>Une partition par locataire</td><td>Moyenne</td><td>Fort</td><td>1,024</td><td>Pour ceux qui ont moins de 1 024 locataires par collection.</td></tr>
<tr><td>Basé sur une clé de partition</td><td>Moyen</td><td>Fort</td><td>10,000,000+</td><td>Pour ceux qui prévoient une augmentation rapide du nombre de locataires à plusieurs millions.</td></tr>
</tbody>
</table>
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
    </button></h2><p><a href="/docs/fr/manage_databases.md">Gérer le</a><a href="/docs/fr/schema.md">schéma des</a><a href="/docs/fr/manage_databases.md">bases de données</a></p>
