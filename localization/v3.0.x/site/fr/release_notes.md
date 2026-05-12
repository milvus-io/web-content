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
    </button></h1><p>Découvrez les nouveautés de Milvus ! Cette page résume les nouvelles fonctionnalités, les améliorations, les problèmes connus et les corrections de bogues de chaque version. Nous vous conseillons de consulter régulièrement cette page pour prendre connaissance des mises à jour.</p>
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
    </button></h2><p>Date de publication : 9 mai 2026</p>
<table>
<thead>
<tr><th>Version Milvus</th><th>Version SDK Python</th><th>Version SDK Node.js</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0-beta étend la base de données vectorielle Milvus avec une nouvelle intégration dans l'écosystème open lake : External Collection permet à Milvus d'interroger des tables lacustres externes sans copie, et Spark peut lire les collections Milvus directement via Snapshot. La version apporte également une extraction plus riche, un schéma plus expressif, une personnalisation plus poussée de la recherche de texte, des contrôles plus fins du cycle de vie des données et des modèles, et davantage de contrôles côté opérateur. Milvus 3.0 est le noyau central de Zilliz Lakebase, alimentant son service unifié, sa découverte et son traitement par lots.</p>
<h3 id="Key-Features" class="common-anchor-header">Caractéristiques principales<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">Collecte externe</h4><p>Dans les pipelines de données d'IA typiques, des téraoctets d'embeddings et de métadonnées se trouvent déjà sur le stockage d'objets sous forme de tables Parquet, Lance ou Iceberg. La copie de ces données dans Milvus double le coût de stockage, ajoute un pipeline ETL qui doit être synchronisé et déplace la gouvernance des données hors du client.</p>
<p>La collecte externe supprime la copie. Une collection Milvus peut référencer des fichiers là où ils se trouvent déjà, et Milvus ne gère que le schéma, les index et l'exécution des requêtes. Une actualisation incrémentielle permet de maintenir la collection alignée sur les fichiers sous-jacents. Les clients dont les données ne peuvent pas quitter le lac, tels que les équipes financières et de santé, peuvent exécuter une recherche vectorielle sur ces données là où elles se trouvent. Un ensemble de données unique résidant dans le lac peut également être servi à partir de plusieurs instances Milvus à la fois.</p>
<p>Pour plus d'informations, voir <a href="/docs/fr/create-an-external-collection.md">Créer une collection externe</a>.</p>
<h4 id="Snapshot" class="common-anchor-header">Instantané</h4><p>Le service et la découverte par lots ont souvent besoin de la même collection en même temps. L'évaluation de modèles A/B, la déduplication à grande échelle, la validation du backfill et le rollback de version ont tous besoin d'une vue stable de la collection pendant que les écritures sont encore en cours.</p>
<p>Snapshot crée une vue ponctuelle et en lecture seule d'une collection en référençant les segments existants au lieu de copier les données, de sorte que le coût marginal de stockage est proche de zéro. Les travaux par lots peuvent lire les données de l'instantané avec une isolation de type MVCC, tandis que la collection active continue d'accepter des écritures.</p>
<p>Pour plus d'informations, reportez-vous aux sections <a href="/docs/fr/snapshots.md">Instantanés</a>, <a href="/docs/fr/manage-snapshots.md">Gérer les instantanés</a> et <a href="/docs/fr/snapshot-use-cases.md">Cas d'utilisation des instantanés</a>.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Requête / Recherche - Ordre par</h4><p>Les fonctions de recherche et d'interrogation acceptent désormais l'ordre sur plusieurs champs, le tri étant poussé vers le bas dans le noyau Milvus et <code translate="no">ASC</code> / <code translate="no">DESC</code> pouvant être paramétré par champ. Cela comble une lacune courante dans la production : Le Top-K par distance seul ne répond souvent pas aux besoins de l'entreprise lorsque l'élément le plus similaire n'est pas le moins cher, le plus récent ou le plus populaire.</p>
<p>Les applications n'ont plus besoin d'extraire trop de résultats et d'effectuer un nouveau tri sur le client pour exprimer un classement composite.</p>
<p>Pour plus d'informations, voir <a href="/docs/fr/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">Trier les résultats de la recherche par champs scalaires</a> et <a href="/docs/fr/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">Trier les résultats de la requête</a>.</p>
<h4 id="Query-Aggregation" class="common-anchor-header">Agrégation de requêtes</h4><p>Pour produire des statistiques sur la répartition des locataires, des comptes d'exhaustivité des champs ou la progression du déploiement des versions à partir d'une collection Milvus, il fallait auparavant extraire les entités correspondantes vers le client et les y agréger. Milvus 3.0 introduit l'agrégation scalaire de style SQL dans le noyau. Un appel de requête accepte <code translate="no">group_by_fields</code> et les expressions d'agrégation dans <code translate="no">output_fields</code>, y compris <code translate="no">count(*)</code>, <code translate="no">count(&lt;field&gt;)</code>, <code translate="no">sum(&lt;field&gt;)</code>, <code translate="no">avg(&lt;field&gt;)</code>, <code translate="no">min(&lt;field&gt;)</code>, et <code translate="no">max(&lt;field&gt;)</code>. L'agrégation est évaluée côté serveur après le filtrage.</p>
<p>Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">Agrégation des résultats de la requête</a>.</p>
<h4 id="Null-Vector" class="common-anchor-header">Vecteur nul</h4><p>Les embeddings sont souvent produits de manière asynchrone, de sorte qu'une entité peut arriver avant son vecteur. Les données multimodales présentent également des lacunes naturelles, comme une vidéo sans légende ou un produit sans image. Les versions antérieures n'avaient pas de bonne réponse : les applications retardaient l'écriture jusqu'à ce que le vecteur soit prêt ou remplissaient un vecteur de remplacement, et les deux choix nuisaient à la qualité de la recherche.</p>
<p>Milvus 3.0 prend en charge NULL dans les champs vectoriels des six types de vecteurs. La recherche ignore automatiquement les vecteurs NULL, la qualité de la recherche n'est pas affectée et les vecteurs NULL ne prennent effectivement pas de place. <code translate="no">AddField</code> s'étend également aux champs vectoriels dans le cadre de cette modification : avec <code translate="no">nullable=True</code>, une collection existante peut développer de nouveaux champs vectoriels en ligne sans avoir à être reconstruite.</p>
<p>Pour plus d'informations, voir <a href="/docs/fr/nullable-and-default.md">Champs Nullables</a>.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Dictionnaire personnalisé et dictionnaire des synonymes</h4><p>Les tokenizers prêts à l'emploi ne répondent pas toujours aux exigences de qualité de la recherche de production. Le chinois, les domaines verticaux tels que la médecine, le droit et la chimie, ainsi que les corpus multilingues peuvent bénéficier de manière substantielle de dictionnaires personnalisés et de tables de synonymes. Jusqu'à présent, ces ressources existaient principalement sous la forme de réécritures de requêtes côté application.</p>
<p>Milvus 3.0 ajoute un mécanisme FileResource permettant d'enregistrer des dictionnaires de tokenizer, des listes de synonymes, des listes de mots vides et des règles de décompactage personnalisés. Une fois enregistrée, une ressource peut être référencée à partir de n'importe quel tokenizer ou filtre et prend effet sur BM25, les analyseurs et Text Match. Les dictionnaires et les synonymes peuvent désormais être versionnés et gérés de manière centralisée au lieu d'être dispersés dans le code de l'application.</p>
<p>Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/manage-file-resources.md">Gérer les ressources de fichiers</a>.</p>
<h4 id="Entity-TTL" class="common-anchor-header">TTL des entités</h4><p>Les TTL au niveau de la collection et de la partition sont trop grossiers pour de nombreux scénarios de cycle de vie et de conformité. Les différents locataires d'une même collection ont souvent des règles de conservation différentes et les entités individuelles peuvent avoir besoin d'expirer selon un calendrier qui ne correspond pas au reste de la collection.</p>
<p>Milvus 3.0 prend en charge le TTL par entité. Déclarez un champ <code translate="no">TIMESTAMPTZ</code> dans le schéma, marquez-le comme champ TTL par le biais d'une propriété de collection et Milvus récupère automatiquement les entités expirées. Cela couvre les demandes de droit à l'oubli, les données de session qui expirent et l'historique de conversation limité sans nettoyage du côté de l'application.</p>
<p>Pour plus d'informations, voir <a href="/docs/fr/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">Définir le TTL au niveau de l'entité</a>.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6 a ajouté l'index <code translate="no">MINHASH_LSH</code> pour la détection de quasi-doublons basée sur l'ensemble, mais les applications devaient toujours calculer les signatures MinHash avant d'écrire des données dans Milvus.</p>
<p>Milvus 3.0 ajoute une fonction MinHash côté serveur. Déclarez un champ d'entrée <code translate="no">VARCHAR</code> et un champ de sortie <code translate="no">BINARY_VECTOR</code> dans le schéma, attachez une fonction <code translate="no">FunctionType.MINHASH</code> et Milvus calcule les signatures pendant l'insertion, l'insertion en bloc et la recherche. Avec <code translate="no">MINHASH_LSH</code>, cette fonction prend en charge les flux de travail de déduplication pour les grands ensembles de données, l'empreinte digitale et la détection du plagiat dans Milvus.</p>
<p>Pour plus d'informations, voir la <a href="/docs/fr/minhash-function.md">fonction MinHash</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>L'hypothèse "une entité = un vecteur" n'est plus adaptée à la recherche moderne. Les documents longs sont divisés en plusieurs morceaux, les modèles d'interaction tardive tels que ColBERT émettent un vecteur par jeton et les entités multimodales peuvent comporter plusieurs vues.</p>
<p>EmbList stocke une liste de vecteurs de longueur variable par entité, avec <code translate="no">DISKANN</code> comme index sur disque. Le chemin d'accès au disque permet de contrôler l'utilisation de la RAM lorsque le corpus dépasse les budgets de mémoire. EmbList + <code translate="no">DISKANN</code> est la première variante de la famille plus large StructList dans ce CR. Le reste de la famille, y compris le filtrage StructList et l'accélération multi-vecteur Muvera / Lemur, est prévu pour la version officielle 3.0.</p>
<p>Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/search-with-embedding-lists.md">Recherche avec des listes intégrées</a>.</p>
<h4 id="Force-Merge" class="common-anchor-header">Forcer la fusion</h4><p>Les charges de travail de production accumulent la fragmentation des segments au fil du temps, ce qui entraîne une gigue au niveau de la latence des requêtes et une augmentation de l'espace de stockage.</p>
<p>Milvus 3.0 ajoute la possibilité de déclencher explicitement le compactage de segments pendant les fenêtres creuses, en modes synchrone et asynchrone.</p>
<p>Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/force-merge.md">Forcer le compactage par fusion</a>.</p>
<h4 id="Storage-V3" class="common-anchor-header">Stockage V3</h4><p>Milvus 3.0 présente Storage V3, un moteur de stockage en colonnes basé sur des manifestes où les données et les métadonnées vivent sur un stockage objet compatible S3. Chaque version d'un ensemble de données est capturée sous la forme d'un instantané de manifeste immuable, un fichier codé en Avro qui enregistre les groupes de colonnes, les journaux delta et les statistiques qui composent l'ensemble de données.</p>
<p>Les manifestes sont des fichiers Avro compacts, et les delta logs enregistrent les suppressions au niveau de l'entité sans réécrire les fichiers de données. Cela permet de limiter la surcharge des métadonnées au fur et à mesure que les ensembles de données augmentent. Le manifeste découple également le suivi des métadonnées du chemin d'accès aux requêtes, ce qui permet à une collection de gérer davantage de segments sans dégrader les performances des requêtes.</p>
<p>Comme les états sont stockés sur un support objet, l'ensemble de données est auto-descriptif : tout lecteur ayant accès au chemin de stockage peut le découvrir et l'interpréter sans avoir recours à un catalogue central. Cette propriété est à la base des collections externes, des instantanés et des futures intégrations de lacs.</p>
