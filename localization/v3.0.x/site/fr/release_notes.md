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
    </button></h1><p>Découvrez les nouveautés de Milvus ! Cette page résume les nouvelles fonctionnalités, les améliorations, les problèmes connus et les corrections de bogues de chaque version. Nous vous recommandons de consulter régulièrement cette page pour vous tenir informé des mises à jour.</p>
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
<p>Milvus 3.0-beta étend la base de données vectorielle Milvus grâce à une nouvelle intégration dans l'écosystème Open Lake : External Collection permet à Milvus d'interroger des tables Lake externes sans copie, et Spark peut lire directement les collections Milvus via Snapshot. Cette version apporte également des capacités de recherche plus riches, un schéma plus expressif, une personnalisation plus poussée de la recherche textuelle, des contrôles plus précis sur le cycle de vie des données et des modèles, ainsi que davantage de contrôles côté opérateur. Milvus 3.0 est le noyau central de Zilliz Lakebase, qui alimente ses fonctionnalités unifiées de service, de découverte et de traitement par lots.</p>
<p>Regardez la vidéo ci-dessous pour en savoir plus sur Milvus 3.0 et participer à une session de questions-réponses avec les principaux responsables de la maintenance :</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">Collection externe</h4><p>Dans les pipelines de données d'IA classiques, des téraoctets d'embeddings et de métadonnées se trouvent déjà sur un stockage objet sous forme de tables Parquet, Lance ou Iceberg. Copier ces données dans Milvus double le coût de stockage, ajoute un pipeline ETL qui doit être synchronisé et éloigne la gouvernance des données du client.</p>
<p>La collecte externe supprime la copie. Une collection Milvus peut référencer des fichiers là où ils se trouvent déjà, et Milvus gère uniquement le schéma, les index et l'exécution des requêtes. Une actualisation incrémentielle permet de maintenir la collection alignée sur les fichiers sous-jacents. Les clients dont les données ne peuvent pas quitter le lac de données, tels que les équipes financières et de santé, peuvent effectuer une recherche vectorielle sur ces données là où elles se trouvent. Un seul ensemble de données résidant dans le lac peut également être servi à partir de plusieurs instances Milvus simultanément.</p>
<p>Pour plus d'informations, consultez la section <a href="/docs/fr/create-an-external-collection.md">Créer une collection externe</a>.</p>
<h4 id="Snapshot" class="common-anchor-header">Instantané</h4><p>La mise à disposition et la découverte par lots nécessitent souvent la même collection au même moment. L'évaluation de modèles A/B, la déduplication à grande échelle, la validation par backfill et la restauration de versions nécessitent toutes une vue stable de la collection alors que les écritures se poursuivent.</p>
<p>Snapshot crée une vue en lecture seule d'une collection à un instant donné en référençant les segments existants au lieu de copier les données, de sorte que le coût marginal de stockage est proche de zéro. Les tâches par lots peuvent lire à partir du Snapshot sous isolation de type MVCC tandis que la collection en production continue d'accepter les écritures.</p>
<p>Pour plus d'informations, consultez les sections <a href="/docs/fr/snapshots.md">Snapshots</a>, <a href="/docs/fr/manage-snapshots.md">Gestion des snapshots</a> et <a href="/docs/fr/snapshot-use-cases.md">Cas d'utilisation des snapshots</a>.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Requête / Recherche par ordre</h4><p>La recherche et la requête acceptent désormais le tri sur plusieurs champs, le tri étant déporté vers le noyau Milvus et les paramètres « <code translate="no">ASC</code> » / « <code translate="no">DESC</code> » pouvant être définis par champ. Cela comble une lacune courante en production : le classement Top-K basé uniquement sur la distance ne correspond souvent pas aux besoins métier lorsque l'élément le plus similaire n'est pas le moins cher, le plus récent ou le plus populaire.</p>
<p>Les applications n'ont plus besoin de récupérer un nombre excessif de résultats et de les trier à nouveau côté client pour afficher un classement composite.</p>
<p>Pour plus d'informations, consultez <a href="/docs/fr/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">Trier les résultats de recherche par champs scalaires</a> et <a href="/docs/fr/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">Trier les résultats de requête</a>.</p>
<h4 id="Query-Aggregation" class="common-anchor-header">Agrégation des requêtes</h4><p>La production de statistiques de répartition des locataires, de comptages d'exhaustivité des champs ou de la progression du déploiement des versions à partir d'une collection Milvus nécessitait auparavant de récupérer les entités correspondantes sur le client et de les agréger à cet endroit. Milvus 3.0 intègre l'agrégation scalaire de type SQL dans le noyau. Un appel de requête accepte des expressions d'<code translate="no">group_by_fields</code> s et d'agrégation dans <code translate="no">output_fields</code>, notamment <code translate="no">count(*)</code>, <code translate="no">count(&lt;field&gt;)</code>, <code translate="no">sum(&lt;field&gt;)</code>, <code translate="no">avg(&lt;field&gt;)</code>, <code translate="no">min(&lt;field&gt;)</code> et <code translate="no">max(&lt;field&gt;)</code>. L'agrégation est évaluée côté serveur après le filtrage.</p>
<p>Pour plus d'informations, consultez la section <a href="/docs/fr/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">Résultats des requêtes agrégées</a>.</p>
<h4 id="Null-Vector" class="common-anchor-header">Vecteur nul</h4><p>Les représentations sont souvent générées de manière asynchrone, de sorte qu'une entité peut arriver avant son vecteur. Les données multimodales présentent également des lacunes naturelles, comme une vidéo sans sous-titres ou un produit sans image. Les versions précédentes n'apportaient pas de solution satisfaisante : les applications retardaient l'écriture jusqu'à ce que le vecteur soit prêt ou inséraient un vecteur de remplacement, et ces deux choix nuisaient à la qualité de la recherche.</p>
<p>Milvus 3.0 prend en charge la valeur NULL sur les champs vectoriels pour les six types de vecteurs. La recherche ignore automatiquement les vecteurs NULL, la qualité de la recherche n'est pas affectée et les vecteurs NULL ne prennent pratiquement pas de place en stockage. L'<code translate="no">AddField</code> e s'étend également aux champs vectoriels dans le cadre de cette modification : grâce à l'<code translate="no">nullable=True</code>, une collection existante peut ajouter de nouveaux champs vectoriels en ligne sans reconstruction.</p>
<p>Pour plus d'informations, consultez la section <a href="/docs/fr/nullable-and-default.md">Champs pouvant prendre la valeur NULL</a>.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Dictionnaire personnalisé et dictionnaire de synonymes</h4><p>Les tokenizers prêts à l'emploi ne répondent pas toujours aux exigences de qualité de recherche en production. Le chinois, les domaines verticaux tels que la médecine, le droit et la chimie, ainsi que les corpus multilingues peuvent tirer un avantage considérable des dictionnaires personnalisés et des tables de synonymes. Jusqu'à présent, ces ressources existaient principalement sous forme de réécritures de requêtes côté application.</p>
<p>Milvus 3.0 ajoute un mécanisme FileResource permettant d'enregistrer des dictionnaires de tokenizers personnalisés, des listes de synonymes, des listes de mots vides et des règles de décomposition. Une fois enregistrée, une ressource peut être référencée depuis n'importe quel tokenizer ou filtre et s'applique à BM25, aux analyseurs et à Text Match. Les dictionnaires et les synonymes peuvent désormais être versionnés et gérés de manière centralisée au lieu d'être dispersés dans le code de l'application.</p>
<p>Pour plus d'informations, consultez la section <a href="/docs/fr/manage-file-resources.md">Gérer les ressources de fichiers</a>.</p>
<h4 id="Entity-TTL" class="common-anchor-header">Durée de vie des entités</h4><p>Les durées de vie (TTL) au niveau de la collection et au niveau de la partition sont trop grossières pour de nombreux scénarios de cycle de vie et de conformité. Différents locataires au sein d'une même collection ont souvent des règles de conservation différentes, et certaines entités peuvent devoir expirer selon un calendrier qui ne correspond pas au reste de la collection.</p>
<p>Milvus 3.0 prend en charge la durée de vie (TTL) par entité. Déclarez un champ « <code translate="no">TIMESTAMPTZ</code> » dans le schéma, marquez-le comme champ TTL via une propriété de collection, et Milvus récupère automatiquement les entités expirées. Cela couvre les demandes de droit à l'oubli, l'expiration des données de session et l'historique des conversations limité, sans nettoyage côté application.</p>
<p>Pour plus d'informations, consultez la section <a href="/docs/fr/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">Définir la durée de vie (TTL) au niveau de l'entité</a>.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6 a ajouté l'index <code translate="no">MINHASH_LSH</code> pour la détection des quasi-duplicatas basée sur des ensembles, mais les applications devaient toujours calculer les signatures MinHash avant d'écrire les données dans Milvus.</p>
<p>Milvus 3.0 ajoute une fonction MinHash côté serveur. Déclarez un champ d'entrée « <code translate="no">VARCHAR</code> » et un champ de sortie « <code translate="no">BINARY_VECTOR</code> » dans le schéma, associez une fonction « <code translate="no">FunctionType.MINHASH</code> », et Milvus calcule les signatures lors de l'insertion, de l'insertion en masse et de la recherche. Associé à « <code translate="no">MINHASH_LSH</code> », cela prend en charge les workflows de déduplication pour les grands ensembles de données, l'empreinte digitale et la détection de plagiat au sein de Milvus.</p>
<p>Pour plus d'informations, consultez la section <a href="/docs/fr/minhash-function.md">Fonction MinHash</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>L'hypothèse « une entité = un vecteur » ne correspond plus à la recherche moderne. Les longs documents sont divisés en plusieurs segments, les modèles à interaction tardive tels que ColBERT émettent un vecteur par token, et les entités multimodales peuvent comporter plusieurs vues.</p>
<p>EmbList stocke une liste de vecteurs de longueur variable par entité, avec l'<code translate="no">DISKANN</code> e comme index sur disque. Le chemin d'accès au disque permet de maîtriser l'utilisation de la RAM lorsque le corpus dépasse les limites de mémoire. EmbList + <code translate="no">DISKANN</code> est la première variante de la famille plus large StructList dans cette version RC. Le reste de la famille, y compris le filtrage StructList et l'accélération multivectorielle Muvera / Lemur, est prévu pour la version officielle 3.0.</p>
<p>Pour plus d'informations, consultez la section <a href="/docs/fr/search-with-embedding-lists.md">Recherche avec des listes d'embeddings</a>.</p>
<h4 id="Force-Merge" class="common-anchor-header">Force Merge</h4><p>Les charges de travail en production accumulent une fragmentation des segments au fil du temps, ce qui entraîne une instabilité de la latence des requêtes et une augmentation du stockage.</p>
<p>Milvus 3.0 ajoute la possibilité de déclencher explicitement la compaction des segments pendant les périodes creuses, en modes synchrone et asynchrone.</p>
<p>Pour plus d'informations, consultez la section « <a href="/docs/fr/force-merge.md">Compactage par fusion forcée</a> ».</p>
<h4 id="Storage-V3" class="common-anchor-header">Stockage V3</h4><p>Milvus 3.0 introduit Storage V3, un moteur de stockage en colonnes basé sur des manifestes où les données et les métadonnées résident sur un stockage objet compatible S3. Chaque version d'un ensemble de données est capturée sous la forme d'un instantané de manifeste immuable, un fichier encodé en Avro qui enregistre les groupes de colonnes, les journaux delta et les statistiques composant l'ensemble de données.</p>
<p>Les manifestes sont des fichiers Avro compacts, et les journaux delta enregistrent les suppressions au niveau des entités sans réécrire les fichiers de données. Cela permet de limiter la surcharge liée aux métadonnées à mesure que les ensembles de données s'agrandissent. Le manifeste dissocie également le suivi des métadonnées du chemin de requête, ce qui permet à une collection de gérer davantage de segments sans dégrader les performances des requêtes.</p>
<p>Comme les états sont stockés sur le stockage d'objets, l'ensemble de données est auto-descriptif : tout lecteur ayant accès au chemin de stockage peut le découvrir et l'interpréter sans catalogue central. Cette propriété sous-tend les intégrations External Collection, Snapshot et les futures intégrations de lac de données.</p>
