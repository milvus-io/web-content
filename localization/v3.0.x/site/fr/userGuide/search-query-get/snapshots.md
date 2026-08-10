---
id: snapshots.md
title: InstantanésCompatible with Milvus 3.0.x
summary: >-
  Utilisez les instantanés pour enregistrer l'état d'une collection à un moment
  donné, à des fins de restauration, de gestion des versions et de tests.
beta: Milvus 3.0.x
---
<h1 id="Snapshots" class="common-anchor-header">Instantanés<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Snapshots" class="anchor-icon" translate="no">
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
    </button></h1><p>Un instantané est une image d’une collection Milvus à un moment donné, idéale pour les retours en arrière rapides, la gestion des versions et les tests. Il capture l’état de la collection à un horodatage spécifique et stocke uniquement les métadonnées et les fichiers de manifeste, tels que le schéma, les index et les fichiers de données vectorielles (binlogs), pour un stockage et une restauration efficaces.</p>
<p>Les instantanés sont des images rapides des données à un moment donné, adaptées aux restaurations rapides ou aux tests (<strong>de quelques jours à quelques semaines</strong>). Parallèlement, les sauvegardes sont des copies indépendantes et complètes stockées séparément pour la reprise après sinistre à long terme (<strong>de quelques semaines à plusieurs années</strong>) et pour une meilleure protection contre une défaillance totale du stockage.</p>
<p>Pour créer des sauvegardes, consultez la section <a href="/docs/fr/milvus_backup_overview.md">Sauvegarde Milvus</a>.</p>
<h2 id="Snapshot-anatomy" class="common-anchor-header">Anatomie d’un instantané<button data-href="#Snapshot-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus met en œuvre une architecture de snapshots basée sur des manifestes pour une capture, un stockage et une restauration efficaces des données à un instant donné, sans duplication des données vectorielles proprement dites. Cette architecture sépare la gestion des métadonnées du stockage physique des données, ce qui permet de créer des snapshots légers faisant référence à des fichiers de segments existants dans le stockage objet.</p>
<p>Lorsque vous créez un instantané pour une collection, Milvus collecte les éléments suivants :</p>
<ul>
<li><p><strong>Métadonnées du snapshot</strong></p>
<p>Elles fournissent les informations de base nécessaires à la création du snapshot, notamment le nom et la description du snapshot, l’ID de la collection cible et l’instant auquel le snapshot a été créé.</p></li>
<li><p><strong>Description de la collection</strong></p>
<p>Elle contient la description de la collection cible, notamment la définition de son schéma, les informations de partition et ses propriétés.</p></li>
<li><p><strong>Informations sur l'index</strong></p>
<p>Elles stockent les métadonnées d’index et les chemins d’accès aux fichiers d’index.</p></li>
<li><p><strong>Données de segment</strong></p>
<p>Elle regroupe les fichiers de données vectorielles (binlogs), les journaux de suppression (deltalogs) et les fichiers d’index.</p></li>
</ul>
<p>À partir des informations ci-dessus, Milvus génère un fichier manifeste Apache Avro pour chaque segment et stocke les métadonnées de l'instantané, la description de la collection, les informations d'index ainsi que les chemins d'accès aux fichiers manifestes dans un fichier JSON. Le diagramme suivant illustre la structure des dossiers de l'instantané.</p>
<pre><code translate="no" class="language-text">snapshots/{collection_id}/
├── metadata/
│   └── {snapshot_id}.json         # Snapshot metadata (JSON format)
│
└── manifests/
    └── {snapshot_id}/             # Directory for each snapshot
        ├── {segment_id_1}.avro    # Individual segment manifest (Avro format)
        ├── {segment_id_2}.avro
        └── ...
<button class="copy-code-btn"></button></code></pre>
<p>La création d’un instantané ne prend généralement que quelques millisecondes, et sa restauration prend de quelques secondes à quelques minutes, selon le volume de données.</p>
<h2 id="Storage-impacts-and-considerations" class="common-anchor-header">Impacts sur le stockage et considérations<button data-href="#Storage-impacts-and-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois que Milvus référence un segment ou un fichier d’index dans un instantané, il ne procède pas au ramassage des fichiers inutiles (garbage collection) à moins que vous ne supprimiez l’instantané. Les instantanés consomment de l’espace de stockage proportionnellement à la taille des collections cibles, et des coûts de stockage d’objets s’appliquent à la conservation des instantanés. Dans des cas extrêmes, un seul instantané peut même doubler vos coûts de stockage d’objets. Il est conseillé de</p>
<ul>
<li>supprimer régulièrement les anciens instantanés pour économiser de l’espace de stockage.</li>
<li>Utiliser des noms et des descriptions explicites pour faciliter la consultation ultérieure.</li>
<li>Toujours vérifier les résultats de la création et de la restauration des instantanés.</li>
<li>Suivre les horodatages de création des instantanés et l’utilisation du stockage à des fins de surveillance et de dépannage.</li>
<li>Conserver les identifiants des tâches de restauration à des fins de surveillance et de dépannage.</li>
</ul>
<h2 id="Limits-and-restrictions" class="common-anchor-header">Limites et restrictions<button data-href="#Limits-and-restrictions" class="anchor-icon" translate="no">
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
<li>Les instantanés deviennent immuables après leur création.</li>
<li>Vous ne pouvez restaurer un instantané que dans une nouvelle collection au sein du même cluster que l’original.</li>
<li>Les collections restaurées conservent le même schéma, le même nombre de shards et le même nombre de partitions.</li>
<li>Les données historiques restaurées peuvent entrer en conflit avec les politiques de TTL. Il est recommandé de désactiver le TTL ou d’ajuster ses paramètres avant de créer des instantanés.</li>
<li>Pour utiliser un instantané comme source externe d’ <code translate="no">milvus-table</code>, celui-ci doit provenir d’une collection Milvus StorageV3 standard. Les instantanés de collections externes ne sont pas pris en charge comme sources d’ <code translate="no">milvus-table</code>.</li>
</ul>
<h2 id="Further-readings" class="common-anchor-header">Pour en savoir plus<button data-href="#Further-readings" class="anchor-icon" translate="no">
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
<li><a href="/docs/fr/manage-snapshots.md">Gérer les instantanés</a> — créer, répertorier, décrire, épingler, restaurer et supprimer des instantanés.</li>
<li><a href="/docs/fr/snapshot-use-cases.md">Cas d’utilisation des instantanés</a> — modèles et workflows courants.</li>
<li><a href="/docs/fr/milvus_backup_overview.md">Sauvegarde Milvus</a> — sauvegarde et restauration à long terme entre clusters.</li>
</ul>
