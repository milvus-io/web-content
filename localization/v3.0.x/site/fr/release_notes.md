---
id: release_notes.md
summary: Notes de mise à jour de Milvus
title: Notes de mise à jour
---
<h1 id="Release-Notes" class="common-anchor-header">Notes de mise à jour<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>Découvrez les nouveautés de Milvus ! Cette page présente un résumé des nouvelles fonctionnalités, des améliorations, des problèmes connus et des corrections de bogues de chaque version. Nous vous recommandons de consulter régulièrement cette page pour vous tenir informé des mises à jour.</p>
<h2 id="v30-beta" class="common-anchor-header">v3.0-beta<button data-href="#v30-beta" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de sortie : 9 mai 2026</p>
<table>
<thead>
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version du SDK Node.js</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus v3.0-beta marque le début de la transition de Milvus d’une base de données vectorielle vers un moteur de lac de données sémantique natif. Le noyau Milvus peut désormais opérer directement sur des données au format « open lake », et les capacités principales de Milvus ont été étendues aux domaines de la récupération, du schéma, du cycle de vie, du langage et des opérations.</p>
<p>La collecte externe et les instantanés constituent les principales nouveautés du côté du lac de données. Ce même noyau alimente également Zilliz Lakebase, une plateforme de données native sémantique construite sur Milvus 3.0.</p>
<h3 id="Key-Features" class="common-anchor-header">Principales fonctionnalités<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">Collecte externe</h4><p>Dans les pipelines de données d’IA classiques, des téraoctets d’embeddings et de métadonnées se trouvent déjà sur un stockage objet sous forme de tables Parquet, Lance ou Iceberg. Copier ces données dans Milvus double le coût de stockage, ajoute un pipeline ETL qui doit être maintenu synchronisé et soustrait la gouvernance des données au contrôle du client.</p>
<p>La collecte externe élimine cette copie. Une collection Milvus peut référencer les fichiers là où ils se trouvent déjà, et Milvus ne gère que le schéma, les index et l’exécution des requêtes. Une actualisation incrémentielle assure l’alignement de la collection avec les fichiers sous-jacents. Les clients dont les données ne peuvent pas quitter le lac de données, tels que les équipes des secteurs de la finance et de la santé, peuvent effectuer des recherches vectorielles sur ces données là où elles se trouvent. Un même ensemble de données résidant dans le lac de données peut également être mis à disposition simultanément par plusieurs instances Milvus.</p>
<p>Pour plus d’informations, consultez la section <a href="/docs/fr/create-an-external-collection.md">Créer une collection externe</a>.</p>
<h4 id="Snapshot" class="common-anchor-header">Instantané</h4><p>La mise à disposition et la découverte par lots nécessitent souvent d’accéder à la même collection simultanément. L’évaluation de modèles A/B, la déduplication à grande échelle, la validation par backfill et la restauration de versions antérieures requièrent toutes une vue stable de la collection alors que les écritures se poursuivent.</p>
<p>Le « Snapshot » crée une vue à un instant donné et en lecture seule d’une collection en référençant des segments existants au lieu de copier les données, ce qui rend le coût marginal de stockage quasi nul. Les tâches par lots peuvent lire à partir du « Snapshot » sous isolation de type MVCC tandis que la collection active continue d’accepter les écritures.</p>
<p>Pour plus d’informations, consultez les sections « <a href="/docs/fr/snapshots.md">Snapshots</a> », « <a href="/docs/fr/manage-snapshots.md">Gestion des snapshots</a> » et « <a href="/docs/fr/snapshot-use-cases.md">Cas d’utilisation des snapshots</a> ».</p>
<h4 id="External-Backfill" class="common-anchor-header">Remplissage externe</h4><p>La mise à niveau d’un modèle d’embedding, comme le passage des embeddings v1 aux embeddings v2 sur une collection existante, impliquait auparavant une reconstruction complète. Cela entraînait soit une interruption de service, soit la mise en place d’une logique de double écriture côté application.</p>
<p>Milvus 3.0 prend en charge cette mise à niveau sous forme de workflow à chaud. Vous pouvez ajouter un nouveau champ vectoriel à l’aide de ` <code translate="no">AddCollectionField</code>`, utiliser un instantané pour figer un point de départ cohérent, exécuter la tâche d’encodage hors ligne sur l’instantané, puis réécrire les valeurs via les chemins d’ingestion normaux. Une fois le nouveau champ indexé en ligne, l’application peut basculer vers celui-ci sans interruption de service.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Requête / Recherche « Order By »</h4><p>La recherche et les requêtes acceptent désormais le tri sur plusieurs champs, le tri étant délégué au noyau de Milvus et les paramètres « <code translate="no">ASC</code> » / « <code translate="no">DESC</code> » pouvant être définis par champ. Cela comble une lacune courante en production : le classement Top-K basé uniquement sur la distance ne répond souvent pas aux besoins métier lorsque l’élément le plus similaire n’est pas le moins cher, le plus récent ou le plus populaire.</p>
<p>Les applications n’ont plus besoin de récupérer un nombre excessif de résultats et de les trier à nouveau côté client pour établir un classement composite.</p>
<p>Pour plus d’informations, consultez les sections « <a href="/docs/fr/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">Trier les résultats de recherche par champs scalaires</a> » et « <a href="/docs/fr/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">Trier les résultats de requête</a> ».</p>
<h4 id="Null-Vector" class="common-anchor-header">Vecteur nul</h4><p>Les représentations vectorielles sont souvent générées de manière asynchrone, de sorte qu’une entité peut arriver avant son vecteur. Les données multimodales présentent également des lacunes naturelles, comme une vidéo sans sous-titres ou un produit sans image. Les versions antérieures n’apportaient pas de solution satisfaisante : les applications retardaient l’écriture jusqu’à ce que le vecteur soit prêt ou inséraient un vecteur de remplacement, et ces deux choix nuisaient à la qualité de la recherche.</p>
<p>Milvus 3.0 prend en charge la valeur NULL sur les champs vectoriels pour les six types de vecteurs. La recherche ignore automatiquement les vecteurs NULL, la qualité de la recherche n’en est pas affectée et les vecteurs NULL ne prennent pratiquement pas de place en stockage. L’ <code translate="no">AddField</code> s s’étend également aux champs vectoriels dans le cadre de cette modification : grâce à l’ <code translate="no">nullable=True</code>, une collection existante peut ajouter de nouveaux champs vectoriels en ligne sans avoir besoin d’être reconstruite.</p>
<p>Pour plus d’informations, consultez la section « <a href="/docs/fr/nullable-and-default.md">Champs pouvant prendre la valeur NULL</a> ».</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Dictionnaire personnalisé et dictionnaire de synonymes</h4><p>Les tokenizers prêts à l’emploi ne répondent pas toujours aux exigences de qualité de recherche en production. Le chinois, les domaines verticaux tels que la médecine, le droit et la chimie, ainsi que les corpus multilingues peuvent tirer un avantage considérable des dictionnaires personnalisés et des tables de synonymes. Jusqu’à présent, ces ressources se présentaient principalement sous la forme de réécritures de requêtes côté application.</p>
<p>Milvus 3.0 ajoute un mécanisme FileResource permettant d’enregistrer des dictionnaires de tokeniseurs personnalisés, des listes de synonymes, des listes de mots vides et des règles de décomposition des mots composés. Une fois enregistrée, une ressource peut être référencée depuis n’importe quel tokeniseur ou filtre et s’applique à BM25, aux analyseurs et à Text Match. Les dictionnaires et les synonymes peuvent désormais faire l’objet d’un contrôle de version et être gérés de manière centralisée, au lieu d’être dispersés dans le code de l’application.</p>
<p>Pour plus d’informations, consultez la section « <a href="/docs/fr/manage-file-resources.md">Gérer les ressources de fichiers</a> ».</p>
<h4 id="Entity-TTL" class="common-anchor-header">Durée de vie (TTL) des entités</h4><p>Les durées de vie (TTL) au niveau de la collection et au niveau de la partition sont trop grossières pour de nombreux scénarios de cycle de vie et de conformité. Les différents locataires au sein d’une même collection ont souvent des règles de conservation différentes, et certaines entités peuvent devoir expirer selon un calendrier qui ne correspond pas à celui du reste de la collection.</p>
<p>Milvus 3.0 prend en charge le TTL par entité. Déclarez un champ « <code translate="no">TIMESTAMPTZ</code> » dans le schéma, marquez-le comme champ TTL via une propriété de collection, et Milvus récupère automatiquement les entités expirées. Cela couvre les demandes de « droit à l’oubli », l’expiration des données de session et l’historique des conversations limité, sans nécessiter de nettoyage côté application.</p>
<p>Pour plus d’informations, consultez la section « <a href="/docs/fr/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">Définir la durée de vie (TTL) au niveau de l’entité</a> ».</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6 a ajouté l’index « <code translate="no">MINHASH_LSH</code> » pour la détection des quasi-duplicatas basée sur des ensembles, mais les applications devaient encore calculer les signatures MinHash avant d’écrire les données dans Milvus.</p>
<p>Milvus 3.0 ajoute une fonction MinHash côté serveur. Il suffit de déclarer un champ d’entrée « <code translate="no">VARCHAR</code> » et un champ de sortie « <code translate="no">BINARY_VECTOR</code> » dans le schéma, d’associer une fonction « <code translate="no">FunctionType.MINHASH</code> », et Milvus calcule les signatures lors de l’insertion, de l’insertion en masse et de la recherche. Associée à la fonction « <code translate="no">MINHASH_LSH</code> », cette fonctionnalité prend en charge les workflows de déduplication pour les grands ensembles de données, la création d’empreintes numériques et la détection de plagiat au sein de Milvus.</p>
<p>Pour plus d’informations, consultez la section <a href="/docs/fr/minhash-function.md">Fonction MinHash</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>L’hypothèse « une entité = un vecteur » ne correspond plus aux techniques modernes de recherche. Les longs documents sont divisés en plusieurs segments, les modèles à interaction tardive tels que ColBERT génèrent un vecteur par token, et les entités multimodales peuvent comporter plusieurs vues.</p>
<p>EmbList stocke une liste de vecteurs de longueur variable par entité, avec <code translate="no">DISKANN</code> comme index sur disque. Le chemin d’accès au disque permet de maîtriser l’utilisation de la RAM lorsque le corpus dépasse les limites de mémoire disponibles. EmbList + <code translate="no">DISKANN</code> constitue la première variante de la famille plus large StructList dans cette version RC. Le reste de la famille, notamment le filtrage StructList et l’accélération multivectorielle Muvera / Lemur, est prévu pour la version officielle 3.0.</p>
<p>Pour plus d’informations, consultez la section « <a href="/docs/fr/search-with-embedding-lists.md">Recherche avec des listes d’embeddings</a> ».</p>
<h4 id="Force-Merge" class="common-anchor-header">Fusion forcée</h4><p>Les charges de travail en production accumulent une fragmentation des segments au fil du temps, ce qui entraîne une instabilité de la latence des requêtes et une surconsommation de stockage.</p>
<p>Milvus 3.0 ajoute la possibilité de déclencher explicitement la compaction des segments pendant les périodes creuses, en modes synchrone et asynchrone.</p>
<p>Pour plus d’informations, consultez la section « <a href="/docs/fr/force-merge.md">Compactage par fusion forcée</a> ».</p>
