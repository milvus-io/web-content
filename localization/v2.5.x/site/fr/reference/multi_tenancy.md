---
id: multi_tenancy.md
title: Mise en œuvre de la multi-location
summary: >-
  Dans Milvus, la multi-location signifie que plusieurs clients ou équipes
  (appelés locataires) partagent le même cluster tout en conservant des
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
    </button></h1><p>Dans Milvus, la multi-location signifie que plusieurs clients ou équipes (appelés <strong>locataires)</strong>partagent le même cluster tout en conservant des environnements de données isolés.</p>
<p>Milvus prend en charge quatre stratégies de multi-location, chacune offrant un compromis différent entre l'évolutivité, l'isolation des données et la flexibilité. Ce guide vous présente chaque option et vous aide à choisir la stratégie la plus adaptée à votre cas d'utilisation.</p>
<h2 id="Multi-tenancy-strategies" class="common-anchor-header">Stratégies multi-tenant<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus prend en charge le multi-tenant à quatre niveaux : <strong>Base de données</strong>, <strong>Collection</strong>, <strong>Partition</strong> et <strong>Clé de partition</strong>.</p>
<h3 id="Database-level-multi-tenancy" class="common-anchor-header">Multi-tenance au niveau de la base de données</h3><p>Avec la location multiple au niveau de la base de données, chaque locataire reçoit une <a href="/docs/fr/manage_databases.md">base de données</a> correspondante contenant une ou plusieurs collections.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/database-level-multi-tenancy.png" alt="Database Level Multi Tenancy" class="doc-image" id="database-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>Multi-tenance au niveau de la base de données</span> </span></p>
<ul>
<li><p><strong>Évolutivité</strong>: La stratégie de multi-location au niveau de la base de données prend en charge un maximum de 64 locataires par défaut.</p></li>
<li><p><strong>Isolation des données</strong>: Les données de chaque base sont entièrement séparées, offrant une isolation des données de niveau entreprise, idéale pour les environnements réglementés ou les clients ayant des besoins de conformité stricts.</p></li>
<li><p><strong>Flexibilité</strong>: Chaque base de données peut avoir des collections avec des schémas différents, offrant une organisation des données très flexible et permettant à chaque locataire d'avoir son propre schéma de données.</p></li>
<li><p><strong>Autres</strong>: Cette stratégie prend également en charge le RBAC, ce qui permet de contrôler finement l'accès des utilisateurs par locataire. En outre, vous pouvez charger ou libérer des données de manière flexible pour des locataires spécifiques afin de gérer efficacement les données chaudes et froides.</p></li>
</ul>
<h3 id="Collection-level-multi-tenancy" class="common-anchor-header">Multi-tenance au niveau de la collection</h3><p>Avec la multi-location au niveau de la collection, chaque locataire se voit attribuer une <a href="/docs/fr/manage-collections.md">collection</a>, ce qui permet d'isoler fortement les données.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/collection-level-multi-tenancy.png" alt="Collection Level Multi Tenancy" class="doc-image" id="collection-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>Multi-tenance au niveau de la collection</span> </span></p>
<ul>
<li><p><strong>Évolutivité</strong>: Étant donné qu'un cluster peut contenir jusqu'à 65 536 collections par défaut, cette stratégie peut s'adapter au même nombre de locataires au sein du cluster.</p></li>
<li><p><strong>Isolation des données</strong>: Les collections sont physiquement isolées les unes des autres. Cette stratégie assure une forte isolation des données.</p></li>
<li><p><strong>Flexibilité</strong>: Cette stratégie permet à chaque collection d'avoir son propre schéma, ce qui permet d'accueillir des locataires ayant des schémas de données différents.</p></li>
<li><p><strong>Autres</strong>: Cette stratégie prend également en charge le RBAC, ce qui permet un contrôle d'accès granulaire sur les locataires. En outre, vous pouvez charger ou libérer des données de manière flexible pour des locataires spécifiques afin de gérer efficacement les données chaudes et froides.</p></li>
</ul>
<h3 id="Partition-level-multi-tenancy" class="common-anchor-header">Multi-tenance au niveau des partitions</h3><p>Dans la multi-location au niveau des partitions, chaque locataire est assigné à une <a href="/docs/fr/manage-partitions.md">partition</a> créée manuellement au sein d'une collection partagée.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/partition-level-multi-tenancy.png" alt="Partition Level Multi Tenancy" class="doc-image" id="partition-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>Multi-locations au niveau des partitions</span> </span></p>
<ul>
<li><p><strong>Évolutivité</strong>: Une collection peut contenir jusqu'à 1 024 partitions par collection, ce qui permet d'avoir le même nombre de locataires.</p></li>
<li><p><strong>Isolation des données</strong>: Les données de chaque locataire sont physiquement séparées par des partitions.</p></li>
<li><p><strong>Flexibilité</strong>: Cette stratégie exige que tous les locataires partagent le même schéma de données. De plus, les partitions doivent être créées manuellement.</p></li>
<li><p><strong>Autres</strong>: Le RBAC n'est pas pris en charge au niveau des partitions. Les locataires peuvent être interrogés individuellement ou à travers plusieurs partitions, ce qui rend cette approche bien adaptée aux scénarios impliquant des requêtes agrégées ou des analyses à travers des segments de locataires. En outre, vous pouvez charger ou libérer des données de manière flexible pour des locataires spécifiques afin de gérer efficacement les données chaudes et froides.</p></li>
</ul>
<h3 id="Partition-key-level-multi-tenancy" class="common-anchor-header">Multi-location au niveau de la clé de partition</h3><p>Avec cette stratégie, tous les locataires partagent une collection et un schéma uniques, mais les données de chaque locataire sont automatiquement acheminées vers 16 partitions physiquement isolées en fonction de la valeur de <a href="/docs/fr/use-partition-key.md">la clé de partition</a>. Bien que chaque partition physique puisse contenir plusieurs locataires, les données des différents locataires restent logiquement séparées.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/partition-key-level-multi-tenancy.png" alt="Partition Key Level Multi Tenancy" class="doc-image" id="partition-key-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>Niveau de la clé de partition Multi-locataires</span> </span></p>
<ul>
<li><p><strong>Évolutivité</strong>: La stratégie au niveau de la clé de partition offre l'approche la plus évolutive, prenant en charge des millions de locataires.</p></li>
<li><p><strong>Isolation des données</strong>: Cette stratégie offre une isolation des données relativement faible car plusieurs locataires peuvent partager une partition physique.</p></li>
<li><p><strong>Flexibilité</strong>: Étant donné que tous les locataires doivent partager le même schéma de données, cette stratégie offre une flexibilité limitée en matière de données.</p></li>
<li><p><strong>Autres</strong>: Le RBAC n'est pas pris en charge au niveau de la clé de partition. Les locataires peuvent être interrogés individuellement ou à travers plusieurs partitions, ce qui rend cette approche bien adaptée aux scénarios impliquant des requêtes agrégées ou des analyses à travers des segments de locataires.</p></li>
</ul>
<h2 id="Choosing-the-right-multi-tenancy-strategy" class="common-anchor-header">Choisir la bonne stratégie de multi-location<button data-href="#Choosing-the-right-multi-tenancy-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Le tableau ci-dessous propose une comparaison complète entre les quatre niveaux de stratégies de multi-location.</p>
<table>
   <tr>
     <th></th>
     <th><p><strong>Niveau base de données</strong></p></th>
     <th><p><strong>Niveau collection</strong></p></th>
     <th><p><strong>Niveau partition</strong></p></th>
     <th><p><strong>Niveau de la clé de partition</strong></p></th>
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
     <td><p>Par défaut, 64. Vous pouvez l'augmenter en modifiant le paramètre <code translate="no">maxDatabaseNum</code> dans le fichier de configuration Milvus.yaml. </p></td>
     <td><p>Par défaut, 65 536. Vous pouvez l'augmenter en modifiant le paramètre <code translate="no">maxCollectionNum</code> dans le fichier de configuration Milvus.yaml.</p></td>
     <td><p>Jusqu'à 1 024 par collection. </p></td>
     <td><p>Millions</p></td>
   </tr>
   <tr>
     <td><p><strong>Flexibilité du schéma de données</strong></p></td>
     <td><p>Élevée</p></td>
     <td><p>Moyenne</p></td>
     <td><p>Faible</p></td>
     <td><p>Faible</p></td>
   </tr>
   <tr>
     <td><p><strong>Prise en charge RBAC</strong></p></td>
     <td><p>Oui</p></td>
     <td><p>Oui</p></td>
     <td><p>Non</p></td>
     <td><p>Non</p></td>
   </tr>
   <tr>
     <td><p><strong>Performances de recherche</strong></p></td>
     <td><p>Forte</p></td>
     <td><p>Forte</p></td>
     <td><p>Moyenne</p></td>
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
     <td><p><strong>Prise en charge du traitement efficace des données chaudes et froides</strong></p></td>
     <td><p>Oui</p></td>
     <td><p>Oui</p></td>
     <td><p>Oui</p></td>
     <td><p>Non Actuellement, la stratégie au niveau des clés de partition n'est pas prise en charge.</p></td>
   </tr>
</table>
<p>Plusieurs facteurs doivent être pris en compte lors du choix de la stratégie de multi-location dans Milvus.</p>
<ol>
<li><p><strong>Évolutivité :</strong> Clé de partition &gt; Partition &gt; Collection &gt; Base de données</p>
<p>Si vous prévoyez de prendre en charge un très grand nombre de locataires (des millions ou plus), utilisez la stratégie au niveau de la clé de partition.</p></li>
<li><p><strong>Exigences élevées en matière d'isolation des données</strong>: Base de données = Collection &gt; Partition &gt; Clé de partition</p>
<p>Choisissez les stratégies au niveau de la base de données, de la collection ou de la partition si vous avez des exigences strictes en matière d'isolation physique des données.</p></li>
<li><p><strong>Schéma de données flexible pour les données de chaque locataire :</strong> Base de données &gt; Collection &gt; Partition = Clé de partition</p>
<p>Les stratégies au niveau de la base de données et de la collection offrent une flexibilité totale en matière de schémas de données. Si les structures de données de vos locataires sont différentes, choisissez la multi-location au niveau de la base de données ou de la collection.</p></li>
<li><p><strong>Autres</strong></p>
<ol>
<li><p><strong>Performances :</strong> Les performances de recherche sont déterminées par divers facteurs, notamment les index, les paramètres de recherche et les configurations des machines. Milvus prend également en charge le réglage des performances. Il est recommandé de tester les performances réelles avant de choisir une stratégie de multi-location.</p></li>
<li><p><strong>Traitement efficace des données chaudes et froides</strong>: Actuellement, les stratégies au niveau de la base de données, de la collection et de la partition prennent toutes en charge la gestion des données chaudes et froides.</p></li>
<li><p><strong>Recherches inter-locataires</strong>: Seules les stratégies au niveau de la partition et de la clé de partition prennent en charge les requêtes inter-locataires.</p></li>
</ol></li>
</ol>
