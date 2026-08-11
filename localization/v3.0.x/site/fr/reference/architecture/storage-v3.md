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
<tr><td><a href="/docs/fr/text.md"><code translate="no">TEXT</code> champ</a></td><td>Stocker du texte source long, tel que des passages, des documents, des tickets ou des journaux, sans définir de longueur maximale fixe dans le schéma de la collection.</td><td><a href="/docs/fr/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
<tr><td><a href="/docs/fr/add-fields-to-an-existing-collection.md">Champs vectoriels générés par des fonctions</a></td><td>Ajoutez une fonction BM25 ou MinHash à une collection existante afin que Milvus génère un nouveau champ vectoriel à partir d’un champ d’ <code translate="no">VARCHAR</code> s existant. Milvus complète les valeurs générées pour les entités existantes de manière asynchrone via une compaction en arrière-plan.</td><td><ul><li><a href="/docs/fr/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><a href="/docs/fr/configure_datacoord.md#dataCoordcompactionbumpSchemaVersionenabled"><code translate="no">dataCoord.compaction.bumpSchemaVersion.enabled</code></a><code translate="no">=true</code></li><li><a href="/docs/fr/configure_datacoord.md#dataCoordcompactionstorageVersionenabled"><code translate="no">dataCoord.compaction.storageVersion.enabled</code></a><code translate="no">=true</code></li></ul></td></tr>
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
<p>La sortie de la fonction pour les entités existantes est générée de manière asynchrone via une compaction en arrière-plan. Une mise à jour réussie du schéma n’indique pas que le remplissage des données existantes est terminé pour chaque entité existante.</p>
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
