---
id: storage-v3.md
title: Stockage V3Compatible with Milvus 3.0.x
summary: >-
  Découvrez quelles fonctionnalités de Milvus 3.0 nécessitent Storage V3,
  comment l'activer et quelles sont les restrictions de compatibilité
  applicables.
beta: Milvus 3.0.x
---
<h1 id="Storage-V3" class="common-anchor-header">Stockage V3<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Storage-V3" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Présentation<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Les ensembles de données d’IA évoluent souvent après la création d’une collection. À mesure que les modèles et les workflows changent, les équipes peuvent avoir besoin d’ajouter du texte, de générer de nouveaux champs vectoriels pour des entités existantes ou d’utiliser des données stockées en dehors de Milvus. La prise en charge de ces workflows nécessite un modèle de stockage capable d’évoluer avec l’ensemble de données.</p>
<p>Le stockage V3 fournit ce modèle dans Milvus 3.0. Il utilise une structure de stockage versionnée pour intégrer les données ajoutées ou réécrites au fil du temps, tandis que les applications continuent d’accéder aux collections via les mêmes API Milvus.</p>
<p>Le stockage V3 est désactivé par défaut. Une fois l’ <code translate="no">common.storage.useLoonFFI</code> e prise en compte, les nouvelles écritures et les résultats de la compaction utilisent le stockage V3. Les données existantes conservent leur structure actuelle jusqu’à ce que les données éligibles soient réécrites par la compaction en arrière-plan. Milvus peut lire les deux structures pendant cette transition. Activez le stockage V3 pour utiliser les fonctionnalités qui en dépendent, plutôt que dans le but d’une optimisation générale des performances.</p>
<h2 id="Data-formats-in-Storage-V3" class="common-anchor-header">Formats de données dans Storage V3<button data-href="#Data-formats-in-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><p>Storage V3 utilise des manifestes pour décrire les données d’une collection indépendamment du format de données sous-jacent. Cela permet à la même couche de stockage de fonctionner à la fois avec les données gérées par Milvus et celles qui restent dans un système externe.</p>
<h3 id="Managed-collection-file-formats" class="common-anchor-header">Formats de fichiers des collections gérées<button data-href="#Managed-collection-file-formats" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour les collections gérées, l’option « <code translate="no">dataNode.storage.format</code> » (Utiliser le format de fichier de la collection) sélectionne le format de fichier pour les nouvelles données de Storage V3. Ce paramètre prend en charge les valeurs suivantes :</p>
<table>
<thead>
<tr><th>Format</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">parquet</code></td><td>Format de fichier en colonnes par défaut, largement adopté, offrant une grande compatibilité avec l’écosystème et des outils éprouvés. Parquet organise les données en groupes de lignes et prend en charge l’encodage et la compression par colonne, ce qui permet à Milvus de ne lire que les colonnes requises et de traiter efficacement les balayages séquentiels de grande envergure.</td></tr>
<tr><td><code translate="no">vortex</code></td><td>Un format de fichier en colonnes optionnel de nouvelle génération, basé sur des encodages extensibles et modulables ainsi que sur des statistiques riches. Dans Milvus, Vortex prend en charge la projection de colonnes, les lectures par plage et les lectures en accès aléatoire. Ces fonctionnalités permettent de réduire les lectures de données superflues pour les charges de travail adaptées.</td></tr>
</tbody>
</table>
<p>La modification de l’ <code translate="no">dataNode.storage.format</code> e affecte les nouvelles écritures dans Storage V3. Les fichiers existants conservent leur format actuel jusqu’à ce que la compaction réécrive les segments correspondants. La plupart des déploiements devraient conserver le format par défaut « <code translate="no">parquet</code> », à moins que des tests de performance représentatifs ne démontrent que « <code translate="no">vortex</code> » est mieux adapté à leurs données et à leurs modèles d’accès.</p>
<h3 id="External-collections-and-supported-source-formats" class="common-anchor-header">Collections externes et formats source pris en charge<button data-href="#External-collections-and-supported-source-formats" class="anchor-icon" translate="no">
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
    </button></h3><p>Les collections externes permettent à Milvus d’utiliser des données stockées dans des fichiers ou des tables externes. Storage V3 prend en charge les formats de source externes suivants :</p>
<table>
<thead>
<tr><th>Format</th><th>Catégorie</th><th>Source attendue</th><th>Prise en charge par Storage V3</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">parquet</code></td><td>Format de fichier</td><td>Un répertoire ou un préfixe de stockage d'objets contenant des fichiers Parquet.</td><td>Détecte les fichiers, lit leurs métadonnées et leurs groupes de lignes, puis les enregistre dans un manifeste Storage V3.</td></tr>
<tr><td><code translate="no">vortex</code></td><td>Format de fichier</td><td>Un répertoire ou un préfixe de stockage d'objets contenant des fichiers Vortex.</td><td>Détecte les fichiers et utilise la structure et les statistiques Vortex pour la projection, les lectures par plage et les lectures en accès aléatoire.</td></tr>
<tr><td><code translate="no">lance-table</code></td><td>Format de table</td><td>Un répertoire de jeu de données Lance.</td><td>Lit les métadonnées du jeu de données et mappe ses fragments dans un manifeste Storage V3.</td></tr>
<tr><td><code translate="no">iceberg-table</code></td><td>Format de table</td><td>Un fichier JSON de métadonnées Iceberg et un ID d’instantané.</td><td>Résout l’instantané spécifié, planifie ses fichiers de données et conserve les métadonnées de suppression par position. Les suppressions par égalité ne sont pas prises en charge et doivent être converties en suppressions par position avant l’actualisation de la collection externe.</td></tr>
</tbody>
</table>
<p>Les sources externes sont en lecture seule. Storage V3 crée et actualise son propre manifeste sans modifier ni copier les données sources. Milvus peut alors créer des index et effectuer des recherches et des requêtes sur les données via une collection externe.</p>
<h4 id="Cloud-storage-and-cross-account-authentication" class="common-anchor-header">Stockage dans le cloud et authentification inter-comptes</h4><p>Le tableau suivant décrit uniquement la manière dont une collection externe accède aux données sources stockées dans un autre compte cloud. Il ne décrit pas le stockage d’objets utilisé pour les données gérées par Milvus.</p>
<table>
<thead>
<tr><th>Stockage dans le cloud</th><th>Formats externes pris en charge</th><th>Authentification inter-comptes pour les collections externes</th></tr>
</thead>
<tbody>
<tr><td>Amazon S3</td><td>Les quatre formats répertoriés ci-dessus.</td><td>Spécifiez l’ARN du rôle IAM appartenant au client. Storage V3 utilise l’ <code translate="no">AssumeRole</code> AWS STS pour obtenir des identifiants temporaires et les actualise si nécessaire. Vous pouvez également fournir un identifiant externe lorsque la politique de confiance du rôle l’exige.</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td>Les quatre formats indiqués ci-dessus.</td><td>Spécifiez le compte de service cible. Storage V3 se fait passer pour ce compte de service, utilise ses jetons d’accès OAuth à durée de vie limitée pour accéder au compartiment source et actualise les jetons avant leur expiration.</td></tr>
<tr><td>Azure Blob Storage</td><td><code translate="no">parquet</code>, <code translate="no">vortex</code> et <code translate="no">lance-table</code>. Le format <code translate="no">iceberg-table</code> n’est pas pris en charge.</td><td>Milvus demande des informations d’identification SAS à durée de vie limitée via le service gRPC privé <code translate="no">milvus-tools</code>. Storage V3 utilise ces informations d’identification SAS pour accéder au conteneur source, et celles-ci sont renouvelées avant leur expiration.</td></tr>
<tr><td>Azure Data Lake Storage Gen2 (ADLS Gen2)</td><td>Les quatre formats mentionnés ci-dessus.</td><td>Milvus demande des identifiants SAS à durée de vie limitée via le service gRPC privé <code translate="no">milvus-tools</code>. Storage V3 utilise ces identifiants SAS pour accéder au conteneur source, et ceux-ci sont renouvelés avant leur expiration.</td></tr>
<tr><td>Alibaba Cloud Object Storage Service (OSS)</td><td>Les quatre formats répertoriés ci-dessus.</td><td>Spécifiez l’ARN du rôle RAM appartenant au client. Storage V3 endosse ce rôle à l’aide de l’identité de charge de travail du runtime ou du rôle RAM ECS, puis utilise des informations d’identification temporaires pour accéder au compartiment source.</td></tr>
</tbody>
</table>
<p>Pour obtenir des instructions sur la configuration et l’utilisation de la collecte externe, consultez la section <a href="/docs/fr/create-an-external-collection.md">Créer une collecte externe</a>.</p>
<h2 id="Features-that-require-Storage-V3" class="common-anchor-header">Fonctionnalités nécessitant Storage V3<button data-href="#Features-that-require-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Fonctionnalité</th><th>Description</th><th>Configuration requise</th></tr>
</thead>
<tbody>
<tr><td>Format de fichier Vortex</td><td>Écriture de nouvelles données de collection gérée au format de fichier Vortex.</td><td><ul><li><a href="/docs/fr/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><code translate="no">dataNode.storage.format=vortex</code></li></ul></td></tr>
<tr><td><a href="/docs/fr/text.md"><code translate="no">TEXT</code> champ</a></td><td>Stockez du texte source long, tel que des passages, des documents, des tickets ou des journaux, sans définir de longueur maximale fixe dans le schéma de la collection.</td><td><a href="/docs/fr/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
<tr><td><a href="/docs/fr/add-fields-to-an-existing-collection.md">Champs vectoriels générés par une fonction</a></td><td>Ajoutez une fonction BM25 ou MinHash à une collection existante afin que Milvus génère un nouveau champ vectoriel à partir d’un champ d’ <code translate="no">VARCHAR</code> s existant. Milvus remplit les valeurs générées pour les entités existantes de manière asynchrone via une compaction en arrière-plan.</td><td><ul><li><a href="/docs/fr/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><a href="/docs/fr/configure_datacoord.md#dataCoordcompactionbumpSchemaVersionenabled"><code translate="no">dataCoord.compaction.bumpSchemaVersion.enabled</code></a><code translate="no">=true</code></li><li><a href="/docs/fr/configure_datacoord.md#dataCoordcompactionstorageVersionenabled"><code translate="no">dataCoord.compaction.storageVersion.enabled</code></a><code translate="no">=true</code></li></ul></td></tr>
<tr><td><a href="/docs/fr/create-an-external-collection.md">Collections externes</a></td><td>Interrogez des données stockées en dehors de Milvus sans les copier dans une collection gérée. Actualisez la collection externe lorsque les données source changent. Pour exposer des champs source supplémentaires, consultez la section <a href="/docs/fr/alter-external-collection-schema.md">Modifier le schéma d’une collection externe</a>.</td><td><a href="/docs/fr/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
</tbody>
</table>
<h2 id="Before-you-enable-Storage-V3" class="common-anchor-header">Avant d’activer Storage V3<button data-href="#Before-you-enable-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert warning">
<p>Une fois que Milvus a écrit des données dans Storage V3, la rétrogradation vers une version de Milvus incapable de lire Storage V3 n’est pas prise en charge. La désactivation ultérieure de Storage V3 ne convertit pas immédiatement toutes les données Storage V3 existantes et ne rétablit pas la compatibilité avec l’ancienne version.</p>
</div>
<p>Avant d’activer Storage V3, tenez compte des comportements suivants des données :</p>
<ul>
<li><code translate="no">dataCoord.compaction.storageVersion.enabled</code> étant activé par défaut, les données existantes éligibles peuvent migrer progressivement vers Storage V3 via un processus de compaction en arrière-plan.</li>
<li>La désactivation de Storage V3 modifie la version de stockage cible pour les futures écritures et les résultats de compaction éligibles. Elle ne convertit pas de manière synchrone toutes les données Storage V3 existantes et ne garantit pas la sécurité d’un retour à une version antérieure.</li>
</ul>
<h2 id="Enable-Storage-V3" class="common-anchor-header">Activer Storage V3<button data-href="#Enable-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><p>Définissez « <code translate="no">common.storage.useLoonFFI</code> » sur « <code translate="no">true</code> » dans votre configuration Milvus :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">common:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">useLoonFFI:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus considère ce paramètre comme actualisable. Appliquez la modification via le workflow de mise à jour de la configuration pris en charge par votre déploiement. La simple modification d’un fichier de configuration statique ne garantit pas que le déploiement en cours d’exécution ait bien reçu la nouvelle valeur.</p>
<p>Si vous prévoyez d’ajouter une fonction et son champ vectoriel généré à une collection existante, activez également les deux paramètres de compactage requis pour le remplissage des données existantes :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">bumpSchemaVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">storageVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>La sortie de la fonction pour les entités existantes est générée de manière asynchrone via une compaction en arrière-plan. Une mise à jour réussie du schéma ne signifie pas que le remplissage des données existantes est terminé pour toutes les entités existantes.</p>
<h2 id="Related-documentation" class="common-anchor-header">Documentation associée<button data-href="#Related-documentation" class="anchor-icon" translate="no">
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
<li><a href="/docs/fr/text.md">Champ de texte</a></li>
<li><a href="/docs/fr/add-fields-to-an-existing-collection.md">Modifier le schéma d’une collection</a></li>
<li><a href="/docs/fr/create-an-external-collection.md">Créer une collection externe</a></li>
<li><a href="/docs/fr/install-overview.md">Présentation des options de déploiement de Milvus</a></li>
<li><a href="/docs/fr/upgrade_milvus_standalone-helm.md">Mettre à niveau Milvus Standalone avec Helm Chart</a></li>
<li><a href="/docs/fr/upgrade_milvus_cluster-helm.md">Mettre à niveau un cluster Milvus à l'aide d'un Helm Chart</a></li>
<li><a href="/docs/fr/configure_common.md">Configurations liées à « common »</a></li>
<li><a href="/docs/fr/configure_datacoord.md">Configurations liées à dataCoord</a></li>
<li><a href="https://milvus.io/blog/why-we-built-loon-a-storage-engine-for-ai-data-that-never-stops-changing.md">Pourquoi nous avons développé Loon : un moteur de stockage pour les données d’IA en constante évolution</a> — Contexte technique sur les motivations à l’origine de la conception de Storage V3.</li>
</ul>
