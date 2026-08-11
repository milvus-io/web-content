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
<h2 id="v300" class="common-anchor-header">v3.0.0<button data-href="#v300" class="anchor-icon" translate="no">
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
    </button></h2><p>Date de sortie : 29 juillet 2026</p>
<table>
<thead>
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version du SDK Node.js</th><th>Version du SDK Java</th><th>Version du SDK Go</th></tr>
</thead>
<tbody>
<tr><td>3.0.0</td><td>3.0.1</td><td>3.0.3</td><td>3.0.5</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0.0 est officiellement disponible ! S'appuyant sur l'architecture « lake-native » introduite dans <a href="https://milvus.io/docs/release_notes.md#v30-beta">la version 3.0-beta</a>, cette version achève ce que la version bêta avait commencé : External Collection couvre davantage de workflows « lakehouse » ; le schéma prend en charge l'ajout, le remplissage et la suppression en ligne ; l'index clairsemé est reconstruit autour de SINDI ; StructArray et la recherche à facettes viennent compléter le moteur de recherche ; le passthrough FAISS et TEXT élargissent les choix d’index et de modalités ; et Woodpecker fonctionne désormais comme un service autonome.</p>
<p>Regardez la vidéo ci-dessous pour en savoir plus sur Milvus 3.0 et participer à une session de questions-réponses avec les responsables du noyau :</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<p>Si vous découvrez la version 3.0, la section « Rappel des fonctionnalités de Core 3.0 » ci-dessous résume les capacités introduites dans la version 3.0-beta ; les <a href="https://milvus.io/docs/release_notes.md#v30-beta">notes de mise à jour de la version 3.0-beta</a> contiennent les descriptions complètes.</p>
<h3 id="Whats-new-in-300-since-30-beta" class="common-anchor-header">Nouveautés de la version 3.0.0 (par rapport à la version 3.0-beta)<button data-href="#Whats-new-in-300-since-30-beta" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection-more-complete-lakehouse-workflows" class="common-anchor-header">Collection externe : des workflows « lakehouse » plus complets</h4><p>La version 3.0-beta a introduit la fonctionnalité « External Collection » : référencez des fichiers de lac de données sur place, créez des index et effectuez des recherches sans copier les données dans Milvus. Cette version étend cette fonctionnalité pour offrir des workflows complets de recherche « lakehouse ». Les champs externes peuvent désormais alimenter des champs de sortie de fonctions tels que les vecteurs clairsemés BM25, les signatures MinHash et les plongements de texte ; ainsi, les champs de recherche textuels et dérivés de modèles sont créés au sein de Milvus sans copie de la table source. La fonctionnalité « Refresh » prend également en charge l’évolution additive du schéma : lorsque la table externe se dote de nouvelles colonnes, Milvus met à jour les segments concernés au lieu de reconstruire la collection.</p>
<p>Cette version ajoute également un format externe « <code translate="no">milvus-table</code> » qui traite les métadonnées Milvus Snapshot et les manifestes Storage V3 comme une source externe, de sorte qu’un instantané de collection peut lui-même être utilisé comme table externe — les systèmes de traitement par lots et de mise à disposition bénéficient ainsi d’une vue partagée, étayée par un manifeste, des mêmes données.</p>
<p>Pour plus d’informations, consultez les sections « <a href="/docs/fr/create-an-external-collection.md">Créer une collection externe</a> » et « <a href="/docs/fr/snapshots.md">Instantanés</a> ».</p>
<h4 id="Flexible-schema-add-backfill-and-drop-columns-online" class="common-anchor-header">Schéma flexible : ajouter, compléter et supprimer des colonnes en ligne</h4><p>Les schémas ne restent pas statiques en production — les modèles intégrés sont remplacés, les fonctionnalités évoluent, les champs sont obsolètes — et cela impliquait auparavant de reconstruire l’intégralité de la collection, avec des temps d’arrêt ou des écritures en double. La version 3.0.0 boucle la boucle : les colonnes peuvent être ajoutées, renseignées et supprimées sans interrompre la mise à disposition des données.</p>
<p>Le remplissage fonctionne dans les deux sens. Le remplissage externe gère les valeurs calculées en dehors de Milvus : ajoutez une colonne, effectuez un instantané de la collection comme point de départ cohérent, exécutez la tâche hors ligne, réécrivez les valeurs, et Milvus indexe la nouvelle colonne de manière incrémentielle — une mise à niveau du modèle d’embedding sur des centaines de millions de lignes devient ainsi une opération à chaud sans temps d’arrêt. Le « backfill » interne couvre les valeurs dérivées du noyau : associez une fonction BM25 ou MinHash à une collection existante et son champ de sortie est calculé automatiquement à partir des données existantes.</p>
<p>Pour plus d’informations, consultez la section « <a href="/docs/fr/add-fields-to-an-existing-collection.md">Ajouter des champs à une collection existante</a> ».</p>
<h4 id="Sparse-index-overhaul-SINDI-Block-Max-WAND-and-Block-Max-MaxScore" class="common-anchor-header">Refonte de l’index clairsemé : SINDI, Block-Max WAND et Block-Max MaxScore</h4><p>Milvus 3.0 améliore l’index des vecteurs clairsemés à tous les niveaux. Il introduit de nouveaux algorithmes de recherche — <a href="https://arxiv.org/abs/2509.08395">SINDI</a>, Block-Max WAND et Block-Max MaxScore — ainsi que la compression par liste inversée, la quantification configurable et la sélection d’algorithmes de recherche par charge de travail. Le chargement via mmap, la sérialisation et le calcul du score BM25 sont également optimisés, ce qui réduit l’encombrement de stockage des index et la surcharge de chargement pour la recherche de vecteurs clairsemés et en texte intégral à grande échelle. Lors de tests de performance internes, l’index BM25 compressé est environ trois fois plus petit que l’index clairsemé 2.6 pour un rappel comparable, et SINDI atteint jusqu’à environ dix fois le QPS de MaxScore sur des plongements clairsemés appris. Une fois la nouvelle version de l’index activée (voir les remarques sur la compatibilité et le comportement), SINDI devient la valeur par défaut pour la recherche IP clairsemée, et MaxScore celle pour BM25.</p>
<h4 id="StructArray-coverage" class="common-anchor-header">Prise en charge de StructArray</h4><p>StructArray prend désormais en charge les valeurs nulles, les index bitmap, l’ajout dynamique de champs sur des collections actives et la mise à jour partielle des champs de structure via upsert, avec une prise en charge correspondante de REST et de l’importation en masse.</p>
<p>La recherche au niveau des éléments ajoute une recherche hybride sur les sous-champs vectoriels avec regroupement configurable par entité (variantes max / sum / avg / top-k), ainsi que la recherche par plage et le regroupement au sein de celle-ci. Le filtrage imbriqué couvre les prédicats <code translate="no">element_filter</code>, les quantificateurs <code translate="no">MATCH_ANY</code> / <code translate="no">MATCH_ALL</code> / <code translate="no">MATCH_LEAST</code> / <code translate="no">MATCH_MOST</code> / <code translate="no">MATCH_EXACT</code>, l’accès positionnel aux sous-champs tel que <code translate="no">tags[0][name]</code>, ainsi que <code translate="no">array_length()</code> sur la colonne struct.</p>
<p>Pour plus d’informations, reportez-vous aux sections <a href="/docs/fr/array-of-structs.md">StructArray</a> et <a href="/docs/fr/struct-array-operators.md">Opérateurs StructArray</a>.</p>
<h4 id="Search-Aggregation-and-faceted-search" class="common-anchor-header">Agrégation de recherche et recherche à facettes</h4><p>L’agrégation de requêtes de la version bêta calcule des statistiques exactes sur les données filtrées ; la version 3.0.0 ajoute la facettisation au chemin de recherche. Spécifiez un champ de facettisation au moment de la recherche et Milvus renvoie les valeurs de facettisation les plus pertinentes, chacune représentée par son élément le mieux correspondant dans le classement ANN et annotée avec des agrégats tels que COUNT et AVG — la barre latérale de recherche à facettes (marque, fourchette de prix, attributs) en une seule requête, au lieu d’effectuer une récupération excessive et un comptage côté client.</p>
<h4 id="Function-Chain-reranking" class="common-anchor-header">Re-classement via la chaîne de fonctions</h4><p>Le reclassement est désormais composable via l’API « Function Chain », qui exécute un pipeline ordonné et typé dans le cadre d’une seule requête de recherche. Une chaîne peut combiner un réévaluation L0 précoce sur QueryNode avec un reclassement L2 post-réduction sur Proxy, prenant en charge la transformation et la combinaison des scores, le reclassement basé sur des modèles, le tri et la réduction des candidats sans orchestration côté client. Cette version ajoute également un calcul de score XGBoost natif pour le reclassement L0 à l’aide de modèles UBJ enregistrés en tant que FileResources, ainsi que des fournisseurs d’inférence Hugging Face pour l’intégration de texte gérée par le serveur et le reclassement par similarité de phrases.</p>
<h4 id="TEXT-long-text-fields" class="common-anchor-header">Champs de texte long TEXT</h4><p>Les champs TEXT accordent une place de choix aux textes longs, en supprimant les limites de longueur côté stockage : ils prennent en charge l’ <code translate="no">text_match</code>, l’ <code translate="no">phrase_match</code> et BM25. Les valeurs inférieures à 64 Ko restent en ligne ; les valeurs plus volumineuses sont transférées vers des fichiers LOB au niveau des partitions au format Vortex, la colonne ne stockant que des références d’ <code translate="no">(file_id, offset)</code>. Les fichiers LOB sont partagés entre les segments ; ainsi, la compaction déplace les références au lieu de réécrire le texte. Pour RAG, cela signifie récupérer les vecteurs et le texte source à partir du même magasin en une seule opération d’E/S — aucun magasin de blobs externe n’est nécessaire.</p>
<h4 id="FAISS-index-passthrough" class="common-anchor-header">Pass-through de l’index FAISS</h4><p>Un nouveau type d’index « <code translate="no">FAISS</code> » accepte des chaînes arbitraires de la fabrique d’index Faiss via le paramètre « <code translate="no">faiss_index_name</code> » — <code translate="no">IVF64,Flat</code>, <code translate="no">HNSW16,Flat</code>, <code translate="no">OPQ16,IVF64,PQ16x4</code> — avec transmission des paramètres de recherche, ce qui permet aux recettes Faiss de s’exécuter directement sur Milvus.</p>
<h4 id="Vortex-and-Lance-format-support" class="common-anchor-header">Prise en charge des formats Vortex et Lance</h4><p>La couche de stockage s’enrichit de deux formats colonnaires ouverts : Vortex, en tant que format interne de nouvelle génération — encodages adaptatifs (dictionnaire, RLE, bit-packing, compression spécifique aux nombres à virgule flottante), décompression sans copie, optimisé pour les charges de travail mixtes vecteur + scalaire — et Lance, aux côtés de Parquet, pour l’interopérabilité au sein d’un écosystème ouvert. Vortex est appelé à devenir le format interne par défaut, avec la descente de filtre et une variante locale prévues dans la feuille de route.</p>
<h4 id="Woodpecker-standalone-deployment" class="common-anchor-header">Déploiement autonome de Woodpecker</h4><p>Woodpecker, le WAL au cœur du chemin d’écriture en continu, peut désormais être déployé en tant que service indépendant plutôt que d’être intégré à d’autres nœuds — avec une évolutivité, une isolation des pannes et une observabilité indépendantes, comme n’importe quel autre microservice. Cela revêt une importance particulière pour les grands clusters et les charges de travail à forte intensité d’écriture.</p>
<h3 id="Core-30-features-recall" class="common-anchor-header">Récapitulatif des fonctionnalités principales de la version 3.0<button data-href="#Core-30-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><p>Les fonctionnalités ci-dessous ont été introduites dans la <a href="https://milvus.io/docs/release_notes.md#v30-beta">version 3.0-beta</a> et font partie de la version 3.0.0 ; consultez les notes de la version bêta pour les descriptions complètes.</p>
<ul>
<li><strong>Collection externe</strong> — interrogez les données du lakehouse (Parquet, Lance, Iceberg, Vortex) sur place : sans copie, en lecture seule, synchronisées via un rafraîchissement incrémental.</li>
<li><strong>Snapshot</strong> — vues de collection en lecture seule à un instant donné par référence de segment, avec un coût de stockage marginal quasi nul.</li>
<li><strong>Stockage V3 (Loon)</strong> — stockage en colonnes basé sur un manifeste sur un système de stockage d’objets ; base technique des fonctionnalités « Snapshot » et « Collection externe ».</li>
<li><strong>Requête / Recherche ORDER BY</strong> — tri multi-champs côté serveur avec ASC / DESC par champ.</li>
<li><strong>Agrégation de requêtes</strong> — COUNT / SUM / AVG / MIN / MAX avec regroupement, évaluées côté serveur.</li>
<li><strong>EmbList + DiskANN</strong> — indexation multivectorielle sur disque pour les listes d’intégration StructArray, avec des chemins d’accélération tels que Muvera et Lemur.</li>
<li><strong>Fonction MinHash (doc-in, doc-out)</strong> — signatures MinHash côté serveur et « <code translate="no">MINHASH_LSH</code> » pour la détection de quasi-duplicatas.</li>
<li><strong>Vecteurs pouvant contenir des valeurs NULL</strong> — NULL sur les six types de vecteurs ; la recherche ignore les lignes NULL, et AddField s’étend aux champs vectoriels.</li>
<li><strong>TTL d’entité</strong> — expiration par ligne pilotée par un champ TIMESTAMPTZ.</li>
<li><strong>FileResource</strong> — dictionnaires, listes de synonymes et listes de mots vides gérés au niveau du cluster pour les analyseurs, BM25 et Text Match.</li>
<li><strong>Force Merge</strong> — compactage des segments déclenché par un opérateur, en mode synchrone ou asynchrone.</li>
</ul>
<h3 id="Compatibility-and-behavior-notes" class="common-anchor-header">Remarques sur la compatibilité et le comportement<button data-href="#Compatibility-and-behavior-notes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong>Storage V3 (Loon) est désactivé par défaut.</strong> Les fonctionnalités qui en dépendent — telles que les champs Snapshot et TEXT — nécessitent une activation manuelle via <code translate="no">common.storage.useLoonFFI</code>. Storage V3 sera activé par défaut dans une version ultérieure.</li>
<li><strong>La compatibilité et la réversion entre les versions 2.6 et 3.0 sont garanties</strong>: un déploiement en version 3.0 peut être réversé vers la version 2.6. Cependant, une fois que vous activez ou utilisez des fonctionnalités qui modifient le format de données sérialisées (par exemple Storage V3), la réversion n’est plus possible.</li>
<li><strong>Les nouvelles versions d’index sont pour l’instant optionnelles.</strong> Les algorithmes d’indexation récemment introduits nécessitent d’augmenter manuellement la version cible de l’index (<code translate="no">dataCoord.targetVecIndexVersion</code> à 10, <code translate="no">dataCoord.targetScalarIndexVersion</code> à 4) avant qu’ils ne prennent effet ; une version ultérieure les activera par défaut.</li>
<li><strong>Les images GPU passent à CUDA 12.9</strong> et ne conservent plus la compatibilité GPU avec Ubuntu 20.04.</li>
</ul>
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
<tr><th>Version de Milvus</th><th>Version du SDK Python</th><th>Version du SDK Node.js</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0-beta étend la base de données vectorielle Milvus grâce à une nouvelle intégration dans l’écosystème Open Lake : la fonctionnalité « External Collection » permet à Milvus d’interroger des tables externes d’Open Lake sans copie (zero-copy), et Spark peut lire directement les collections Milvus via Snapshot. Cette version apporte également des fonctionnalités de recherche plus riches, un schéma plus expressif, une personnalisation plus poussée de la recherche textuelle, des contrôles plus précis sur le cycle de vie des données et des modèles, ainsi que davantage de contrôles côté opérateur. Milvus 3.0 constitue le noyau central de Zilliz Lakebase, alimentant ses fonctionnalités unifiées de service, de découverte et de traitement par lots.</p>
<h3 id="Key-Features" class="common-anchor-header">Fonctionnalités clés<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">Collection externe</h4><p>Dans les pipelines de données d’IA classiques, des téraoctets d’embeddings et de métadonnées se trouvent déjà sur un stockage objet sous forme de tables Parquet, Lance ou Iceberg. Copier ces données dans Milvus double le coût de stockage, ajoute un pipeline ETL qui doit être maintenu synchronisé et soustrait la gouvernance des données au client.</p>
<p>La collecte externe élimine cette copie. Une collection Milvus peut référencer les fichiers là où ils se trouvent déjà, et Milvus ne gère que le schéma, les index et l’exécution des requêtes. Une actualisation incrémentielle assure l’alignement de la collection avec les fichiers sous-jacents. Les clients dont les données ne peuvent pas quitter le lac de données, tels que les équipes des secteurs de la finance et de la santé, peuvent effectuer des recherches vectorielles sur ces données là où elles se trouvent. Un même ensemble de données résidant dans le lac de données peut également être mis à disposition simultanément par plusieurs instances Milvus.</p>
<p>Pour plus d’informations, consultez la section <a href="/docs/fr/create-an-external-collection.md">Créer une collection externe</a>.</p>
<h4 id="Snapshot" class="common-anchor-header">Instantané</h4><p>La mise à disposition et la découverte par lots nécessitent souvent d’accéder à la même collection simultanément. L’évaluation de modèles A/B, la déduplication à grande échelle, la validation par backfill et la restauration de versions antérieures requièrent toutes une vue stable de la collection alors que les écritures se poursuivent.</p>
<p>Le « Snapshot » crée une vue à un instant donné et en lecture seule d’une collection en référençant des segments existants au lieu de copier les données, ce qui rend le coût marginal de stockage quasi nul. Les tâches par lots peuvent lire à partir du « Snapshot » sous isolation de type MVCC tandis que la collection active continue d’accepter les écritures.</p>
<p>Pour plus d’informations, consultez les sections « <a href="/docs/fr/snapshots.md">Snapshots</a> », « <a href="/docs/fr/manage-snapshots.md">Gestion des snapshots</a> » et « <a href="/docs/fr/snapshot-use-cases.md">Cas d’utilisation des snapshots</a> ».</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Requête / Recherche « Order By »</h4><p>La recherche et les requêtes acceptent désormais le tri sur plusieurs champs, le tri étant délégué au noyau Milvus et les paramètres « <code translate="no">ASC</code> » et « <code translate="no">DESC</code> » pouvant être définis pour chaque champ. Cela comble une lacune courante en production : le classement Top-K basé uniquement sur la distance ne répond souvent pas aux besoins métier lorsque l’élément le plus similaire n’est pas le moins cher, le plus récent ou le plus populaire.</p>
<p>Les applications n’ont plus besoin de récupérer un nombre excessif de résultats et de les trier à nouveau côté client pour obtenir un classement composite.</p>
<p>Pour plus d’informations, consultez les sections « <a href="/docs/fr/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">Trier les résultats de recherche par champs scalaires</a> » et « <a href="/docs/fr/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">Trier les résultats de requête</a> ».</p>
<h4 id="Query-Aggregation" class="common-anchor-header">Agrégation des requêtes</h4><p>Auparavant, pour générer des statistiques de répartition des locataires, des comptages d’exhaustivité des champs ou la progression du déploiement d’une version à partir d’une collection Milvus, il fallait récupérer les entités correspondantes côté client et les agréger à cet endroit. Milvus 3.0 intègre l’agrégation scalaire de type SQL au cœur du système. Un appel de requête accepte des expressions d’ <code translate="no">group_by_fields</code> s et d’agrégation au format <code translate="no">output_fields</code>, notamment <code translate="no">count(*)</code>, <code translate="no">count(&lt;field&gt;)</code>, <code translate="no">sum(&lt;field&gt;)</code>, <code translate="no">avg(&lt;field&gt;)</code>, <code translate="no">min(&lt;field&gt;)</code> et <code translate="no">max(&lt;field&gt;)</code>. L’agrégation est évaluée côté serveur après le filtrage.</p>
<p>Pour plus d’informations, consultez la section « <a href="/docs/fr/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">Agrégation des résultats de requête</a> ».</p>
<h4 id="Null-Vector" class="common-anchor-header">Vecteur nul</h4><p>Les représentations sont souvent générées de manière asynchrone ; une entité peut donc arriver avant son vecteur. Les données multimodales présentent également des lacunes naturelles, comme une vidéo sans sous-titres ou un produit sans image. Les versions antérieures n’apportaient pas de solution satisfaisante : les applications retardaient l’écriture jusqu’à ce que le vecteur soit prêt ou inséraient un vecteur de remplacement, deux choix qui nuisaient à la qualité de la recherche.</p>
<p>Milvus 3.0 prend en charge la valeur NULL sur les champs vectoriels pour les six types de vecteurs. La recherche ignore automatiquement les vecteurs NULL, la qualité de la recherche n’en est pas affectée et les vecteurs NULL ne prennent pratiquement pas de place en stockage. L’ <code translate="no">AddField</code> s s’étend également aux champs vectoriels dans le cadre de cette modification : grâce à l’ <code translate="no">nullable=True</code>, une collection existante peut ajouter de nouveaux champs vectoriels en ligne sans avoir à être reconstruite.</p>
<p>Pour plus d’informations, consultez la section « <a href="/docs/fr/nullable-and-default.md">Champs pouvant prendre la valeur NULL</a> ».</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Dictionnaire personnalisé et dictionnaire de synonymes</h4><p>Les tokenizers prêts à l’emploi ne répondent pas toujours aux exigences de qualité de recherche en production. Le chinois, les domaines verticaux tels que la médecine, le droit et la chimie, ainsi que les corpus multilingues peuvent tirer un avantage considérable des dictionnaires personnalisés et des tables de synonymes. Jusqu’à présent, ces ressources se présentaient principalement sous la forme de réécritures de requêtes côté application.</p>
<p>Milvus 3.0 ajoute un mécanisme FileResource permettant d’enregistrer des dictionnaires de tokeniseurs personnalisés, des listes de synonymes, des listes de mots vides et des règles de décomposition des mots composés. Une fois enregistrée, une ressource peut être référencée depuis n’importe quel tokenizer ou filtre et s’applique à BM25, aux analyseurs et à Text Match. Les dictionnaires et les synonymes peuvent désormais faire l’objet d’un contrôle de version et être gérés de manière centralisée, au lieu d’être dispersés dans le code de l’application.</p>
<p>Pour plus d’informations, consultez la section « <a href="/docs/fr/manage-file-resources.md">Gérer les ressources de fichiers</a> ».</p>
<h4 id="Entity-TTL" class="common-anchor-header">Durée de vie (TTL) des entités</h4><p>Les durées de vie (TTL) au niveau de la collection et au niveau de la partition sont trop grossières pour de nombreux scénarios de cycle de vie et de conformité. Les différents locataires au sein d’une même collection ont souvent des règles de conservation différentes, et certaines entités peuvent devoir expirer selon un calendrier qui ne correspond pas à celui du reste de la collection.</p>
<p>Milvus 3.0 prend en charge le TTL par entité. Déclarez un champ « <code translate="no">TIMESTAMPTZ</code> » dans le schéma, marquez-le comme champ TTL via une propriété de collection, et Milvus récupère automatiquement les entités expirées. Cela couvre les demandes relatives au droit à l’oubli, l’expiration des données de session et l’historique des conversations limité, sans nécessiter de nettoyage côté application.</p>
<p>Pour plus d’informations, consultez la section « <a href="/docs/fr/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">Définir la durée de vie (TTL) au niveau de l’entité</a> ».</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6 a ajouté l’index « <code translate="no">MINHASH_LSH</code> » pour la détection des quasi-duplicatas par ensembles, mais les applications devaient encore calculer les signatures MinHash avant d’écrire les données dans Milvus.</p>
<p>Milvus 3.0 ajoute une fonction MinHash côté serveur. Il suffit de déclarer un champ d’entrée « <code translate="no">VARCHAR</code> » et un champ de sortie « <code translate="no">BINARY_VECTOR</code> » dans le schéma, d’associer une fonction « <code translate="no">FunctionType.MINHASH</code> », et Milvus calcule les signatures lors de l’insertion, de l’insertion en masse et de la recherche. Associée à la fonction « <code translate="no">MINHASH_LSH</code> », cette fonctionnalité prend en charge les workflows de déduplication pour les grands ensembles de données, la création d’empreintes numériques et la détection de plagiat au sein de Milvus.</p>
<p>Pour plus d’informations, consultez la section <a href="/docs/fr/minhash-function.md">Fonction MinHash</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>L’hypothèse « une entité = un vecteur » ne correspond plus aux techniques modernes de recherche. Les longs documents sont fractionnés en plusieurs segments, les modèles à interaction tardive tels que ColBERT génèrent un vecteur par token, et les entités multimodales peuvent comporter plusieurs vues.</p>
<p>EmbList stocke une liste de vecteurs de longueur variable par entité, avec un index « <code translate="no">DISKANN</code> » sur disque. Le chemin d’accès au disque permet de maîtriser l’utilisation de la RAM lorsque le corpus dépasse les limites de mémoire disponibles. EmbList + « <code translate="no">DISKANN</code> » constitue la première variante de la famille plus large de StructList dans cette version RC. Le reste de la famille, notamment le filtrage StructList et l’accélération multi-vecteurs Muvera / Lemur, est prévu pour la version officielle 3.0.</p>
<p>Pour plus d’informations, consultez la section « <a href="/docs/fr/search-with-embedding-lists.md">Recherche avec des listes d’embedding</a> ».</p>
<h4 id="Force-Merge" class="common-anchor-header">Fusion forcée</h4><p>Les charges de travail en production accumulent une fragmentation des segments au fil du temps, ce qui entraîne une instabilité de la latence des requêtes et une augmentation de l’espace de stockage.</p>
<p>Milvus 3.0 ajoute la possibilité de déclencher explicitement la compaction des segments pendant les périodes creuses, aussi bien en mode synchrone qu’asynchrone.</p>
<p>Pour plus d’informations, consultez la section « <a href="/docs/fr/force-merge.md">Compactage par fusion forcée</a> ».</p>
<h4 id="Storage-V3" class="common-anchor-header">Stockage V3</h4><p>Milvus 3.0 introduit Storage V3, un moteur de stockage en colonnes basé sur des manifestes, dans lequel les données et les métadonnées résident sur un stockage d’objets compatible S3. Chaque version d’un ensemble de données est capturée sous la forme d’un instantané de manifeste immuable, un fichier encodé en Avro qui enregistre les groupes de colonnes, les journaux delta et les statistiques composant l’ensemble de données.</p>
<p>Les manifestes sont des fichiers Avro compacts, et les journaux delta enregistrent les suppressions au niveau des entités sans réécrire les fichiers de données. Cela permet de limiter la surcharge liée aux métadonnées à mesure que les ensembles de données s’étoffent. Le manifeste dissocie également le suivi des métadonnées du chemin de requête, ce qui permet à une collection de gérer davantage de segments sans nuire aux performances des requêtes.</p>
<p>Les états étant stockés sur un système de stockage d’objets, le jeu de données est auto-descriptif : tout lecteur ayant accès au chemin de stockage peut le découvrir et l’interpréter sans avoir recours à un catalogue central. Cette propriété est à la base des intégrations avec les collections externes, les instantanés et les futurs lacs de données.</p>
