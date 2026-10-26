---
id: multi_tenancy.md
title: Mise en œuvre de la multi-location
summary: >-
  Dans Milvus, la multi-location signifie que plusieurs clients ou équipes —
  appelés « locataires » — partagent le même cluster tout en conservant des
  environnements de données isolés.
---
<h1 id="Implement-Multi-tenancy" class="common-anchor-header">Mise en œuvre de la multi-location<button data-href="#Implement-Multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h1><p>Dans Milvus, la multi-location signifie que plusieurs clients ou équipes — appelés « <strong>locataires</strong>» — partagent le même cluster tout en conservant des environnements de données isolés.</p>
<p>Milvus prend en charge quatre stratégies de multi-locataires, chacune offrant un compromis différent entre évolutivité, isolation des données et flexibilité. Ce guide vous présente chacune de ces options afin de vous aider à choisir la stratégie la mieux adaptée à votre cas d'utilisation.</p>
<h2 id="Multi-tenancy-strategies" class="common-anchor-header">Stratégies de multi-locataires<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus prend en charge la multi-location à quatre niveaux : <strong>base de données</strong>, <strong>collection</strong>, <strong>partition</strong> et <strong>clé de partition</strong>.</p>
<h3 id="Database-level-multi-tenancy" class="common-anchor-header">Multitenance au niveau de la base de données<button data-href="#Database-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>Avec la multi-location au niveau de la base de données, chaque locataire dispose d’une <a href="/docs/fr/v2.6.x/manage_databases.md">base de données</a> qui lui est propre, contenant une ou plusieurs collections.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/database-level-multi-tenancy.png" alt="Database Level Multi Tenancy" class="doc-image" id="database-level-multi-tenancy" /> 
   <span>Multilocataires au niveau de la base de données</span>
  
 </span></p>
<ul>
<li><p><strong>Évolutivité</strong>: la stratégie de multi-location au niveau de la base de données prend en charge jusqu’à 64 locataires par défaut.</p></li>
<li><p><strong>Isolation des données</strong>: les données de chaque base de données sont entièrement séparées, offrant une isolation des données de niveau entreprise, idéale pour les environnements réglementés ou les clients ayant des exigences strictes en matière de conformité.</p></li>
<li><p><strong>Flexibilité</strong>: chaque base de données peut contenir des collections avec des schémas différents, ce qui offre une organisation des données très flexible et permet à chaque locataire de disposer de son propre schéma de données.</p></li>
<li><p><strong>Autres</strong>: cette stratégie prend également en charge le modèle RBAC (RBAC), permettant un contrôle granulaire des accès utilisateur par locataire. De plus, vous pouvez charger ou décharger de manière flexible des données pour des locataires spécifiques afin de gérer efficacement les données « chaudes » et « froides ».</p></li>
</ul>
<h3 id="Collection-level-multi-tenancy" class="common-anchor-header">Multitenance au niveau des collections<button data-href="#Collection-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>Avec la multi-location au niveau des collections, chaque locataire se voit attribuer une <a href="/docs/fr/v2.6.x/manage-collections.md">collection</a>, ce qui garantit une isolation solide des données.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/collection-level-multi-tenancy.png" alt="Collection Level Multi Tenancy" class="doc-image" id="collection-level-multi-tenancy" /> 
   <span>Multitenance au niveau des collections</span>
  
 </span></p>
<ul>
<li><p><strong>Évolutivité</strong>: un cluster pouvant contenir jusqu’à 65 536 collections par défaut, cette stratégie permet d’accueillir le même nombre de locataires au sein du cluster.</p></li>
<li><p><strong>Isolation des données</strong>: les collections sont physiquement isolées les unes des autres. Cette stratégie offre une isolation solide des données.</p></li>
<li><p><strong>Flexibilité</strong>: cette stratégie permet à chaque collection de disposer de son propre schéma, ce qui s'adapte aux locataires ayant des schémas de données différents.</p></li>
<li><p><strong>Autres</strong>: cette stratégie prend également en charge le RBAC (contrôle d’accès basé sur les rôles), ce qui permet un contrôle d’accès granulaire sur les locataires. De plus, vous pouvez charger ou libérer de manière flexible des données pour des locataires spécifiques afin de gérer efficacement les données « chaudes » et « froides ».</p></li>
</ul>
<h3 id="Partition-level-multi-tenancy" class="common-anchor-header">Multitenance au niveau des partitions<button data-href="#Partition-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>Dans la multi-location au niveau des partitions, chaque locataire est affecté à une <a href="/docs/fr/v2.6.x/manage-partitions.md">partition</a> créée manuellement au sein d’une collection partagée.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/partition-level-multi-tenancy.png" alt="Partition Level Multi Tenancy" class="doc-image" id="partition-level-multi-tenancy" /> 
   <span>Multitenance au niveau des partitions</span>
  
 </span></p>
<ul>
<li><p><strong>Évolutivité</strong>: une collection peut contenir jusqu’à 1 024 partitions, ce qui permet d’accueillir autant de locataires.</p></li>
<li><p><strong>Isolation des données</strong>: les données de chaque locataire sont physiquement séparées par des partitions.</p></li>
<li><p><strong>Flexibilité</strong>: cette stratégie exige que tous les locataires partagent le même schéma de données. De plus, les partitions doivent être créées manuellement.</p></li>
<li><p><strong>Autres</strong>: le RBAC n’est pas pris en charge au niveau des partitions. Les locataires peuvent faire l’objet de requêtes soit individuellement, soit sur plusieurs partitions, ce qui rend cette approche particulièrement adaptée aux scénarios impliquant des requêtes agrégées ou des analyses sur plusieurs segments de locataires. De plus, vous pouvez charger ou libérer des données de manière flexible pour des locataires spécifiques afin de gérer efficacement les données « chaudes » et « froides ».</p></li>
</ul>
<h3 id="Partition-key-level-multi-tenancy" class="common-anchor-header">Multitenance au niveau de la clé de partition<button data-href="#Partition-key-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>Avec cette stratégie, tous les locataires partagent une seule collection et un seul schéma, mais les données de chaque locataire sont automatiquement acheminées vers 16 partitions physiquement isolées en fonction de la valeur <a href="/docs/fr/v2.6.x/use-partition-key.md">de la clé de partition</a>. Bien que chaque partition physique puisse contenir plusieurs locataires, les données des différents locataires restent logiquement séparées.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/partition-key-level-multi-tenancy.png" alt="Partition Key Level Multi Tenancy" class="doc-image" id="partition-key-level-multi-tenancy" /> 
   <span>Multitenance au niveau de la clé de partition</span>
  
 </span></p>
<ul>
<li><p><strong>Évolutivité</strong>: la stratégie au niveau de la clé de partition offre l’approche la plus évolutive, prenant en charge des millions de locataires.</p></li>
<li><p><strong>Isolation des données</strong>: cette stratégie offre une isolation des données relativement faible, car plusieurs locataires peuvent partager une même partition physique.</p></li>
<li><p><strong>Flexibilité</strong>: comme tous les locataires doivent partager le même schéma de données, cette stratégie offre une flexibilité limitée en matière de données.</p></li>
<li><p><strong>Autres</strong>: le RBAC n’est pas pris en charge au niveau de la clé de partition. Les locataires peuvent faire l’objet de requêtes soit individuellement, soit sur plusieurs partitions, ce qui rend cette approche particulièrement adaptée aux scénarios impliquant des requêtes agrégées ou des analyses sur plusieurs segments de locataires.</p></li>
</ul>
<div class="alert note">
<p>Nous vous recommandons de créer un index scalaire sur le champ de clé de partition. Chaque partition physique hébergeant plusieurs locataires, Milvus évalue le filtre de locataire par rapport à chaque entité des partitions recherchées ; sans index, cela implique un balayage complet. Pour plus de détails, consultez la section « <a href="/docs/fr/v2.6.x/use-partition-key.md#Index-Partition-Key">Indexer la clé de partition</a> ».</p>
</div>
<h2 id="Choosing-the-right-multi-tenancy-strategy" class="common-anchor-header">Choisir la bonne stratégie de multi-locataires<button data-href="#Choosing-the-right-multi-tenancy-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Le tableau ci-dessous présente une comparaison complète des quatre niveaux de stratégies de multi-locataires.</p>
<table>
   <tr>
     <th></th>
     <th><p><strong>Au niveau de la base de données</strong></p></th>
     <th><p><strong>Au niveau de la collection</strong></p></th>
     <th><p><strong>Au niveau de la partition</strong></p></th>
     <th><p><strong>Au niveau de la clé de partition</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>Isolation des données</strong></p></td>
     <td><p>Physique</p></td>
     <td><p>Physique</p></td>
     <td><p>Physique</p></td>
     <td><p>Physique + logique</p></td>
   </tr>
   <tr>
     <td><p><strong>Nombre maximal de locataires</strong></p></td>
     <td><p>Par défaut, 64. Vous pouvez augmenter ce nombre en modifiant le paramètre ` <code translate="no">maxDatabaseNum</code> ` dans le fichier de configuration `Milvus.yaml`. </p></td>
     <td><p>Par défaut, 65 536. Vous pouvez augmenter ce nombre en modifiant le paramètre « <code translate="no">maxCollectionNum</code> » dans le fichier de configuration Milvus.yaml.</p></td>
     <td><p>Jusqu’à 1 024 par collection. </p></td>
     <td><p>Des millions</p></td>
   </tr>
   <tr>
     <td><p><strong>Flexibilité du schéma de données</strong></p></td>
     <td><p>Élevée</p></td>
     <td><p>Moyenne</p></td>
     <td><p>Faible</p></td>
     <td><p>Faible</p></td>
   </tr>
   <tr>
     <td><p><strong>Prise en charge du modèle RBAC</strong></p></td>
     <td><p>Oui</p></td>
     <td><p>Oui</p></td>
     <td><p>Non</p></td>
     <td><p>Non</p></td>
   </tr>
   <tr>
     <td><p><strong>Performances de recherche</strong></p></td>
     <td><p>Élevées</p></td>
     <td><p>Élevées</p></td>
     <td><p>Moyens</p></td>
     <td><p>Moyenne</p></td>
   </tr>
   <tr>
     <td><p><strong>Prise en charge de la recherche inter-locataires</strong></p></td>
     <td><p>Non</p></td>
     <td><p>Non</p></td>
     <td><p>Oui</p></td>
     <td><p>Oui</p></td>
   </tr>
   <tr>
     <td><p><strong>Prise en charge d'une gestion efficace des données « chaudes » et « froides »</strong></p></td>
     <td><p>Oui</p></td>
     <td><p>Oui</p></td>
     <td><p>Oui</p></td>
     <td><p>Non Actuellement, cette fonctionnalité n'est pas prise en charge pour la stratégie au niveau de la clé de partition.</p></td>
   </tr>
</table>
<p>Plusieurs facteurs doivent être pris en compte lorsque vous choisissez la stratégie de multi-location dans Milvus.</p>
<ol>
<li><p><strong>Évolutivité :</strong> clé de partition &gt; partition &gt; collection &gt; base de données</p>
<p>Si vous prévoyez de prendre en charge un très grand nombre de locataires (des millions ou plus), utilisez la stratégie au niveau de la clé de partition.</p></li>
<li><p><strong>Exigences strictes en matière d’isolation des données</strong>: base de données = collection &gt; partition &gt; clé de partition</p>
<p>Optez pour des stratégies au niveau de la base de données, de la collection ou de la partition si vous avez des exigences strictes en matière d’isolation physique des données.</p></li>
<li><p><strong>Schéma de données flexible pour les données de chaque locataire :</strong> base de données &gt; collection &gt; partition = clé de partition</p>
<p>Les stratégies au niveau de la base de données et de la collection offrent une flexibilité totale en matière de schémas de données. Si les structures de données de vos locataires sont différentes, optez pour la multi-location au niveau de la base de données ou de la collection.</p></li>
<li><p><strong>Autres</strong></p>
<ol>
<li><p><strong>Performances :</strong> les performances de recherche dépendent de divers facteurs, notamment les index, les paramètres de recherche et les configurations matérielles. Milvus prend également en charge l’optimisation des performances. Il est recommandé de tester les performances réelles avant de choisir une stratégie de multi-location.</p></li>
<li><p><strong>Gestion efficace des données « chaudes » et « froides »</strong>: Actuellement, les stratégies au niveau de la base de données, au niveau de la collection et au niveau de la partition prennent toutes en charge la gestion des données « chaudes » et « froides ».</p></li>
<li><p><strong>Recherches inter-locataires</strong>: seules les stratégies au niveau des partitions et au niveau des clés de partition prennent en charge les requêtes inter-locataires.</p></li>
</ol></li>
</ol>
