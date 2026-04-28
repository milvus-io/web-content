---
id: snapshots.md
title: InstantanésCompatible with Milvus 3.0.x
summary: >-
  Utilisez des instantanés pour capturer les états de la collection à un moment
  donné afin de revenir en arrière, d'établir des versions et de tester.
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
    </button></h1><p>Un instantané est une image ponctuelle d'une collection Milvus, idéale pour les retours en arrière rapides, les versions et les tests. Il capture l'état de la collection à un moment précis et ne stocke que les métadonnées et les fichiers manifestes, tels que le schéma, les index et les fichiers de données vectorielles (binlogs), pour un stockage et une restauration efficaces.</p>
<div class="alert note">
<p>Les instantanés sont des images rapides et ponctuelles des données, qui conviennent à des retours en arrière rapides ou à des tests<strong>(de quelques jours à quelques semaines</strong>). Parallèlement, les sauvegardes sont des copies indépendantes et complètes stockées séparément pour la reprise après sinistre à long terme<strong>(de quelques semaines à quelques années</strong>) et pour une meilleure protection contre les pannes totales de stockage.</p>
<p>Pour créer des sauvegardes, voir <a href="/docs/fr/milvus_backup_overview.md">Milvus Backup</a>.</p>
</div>
<h2 id="Snapshot-anatomy" class="common-anchor-header">Anatomie des instantanés<button data-href="#Snapshot-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus met en œuvre une architecture d'instantanés basée sur des manifestes pour capturer, stocker et restaurer efficacement des données à un moment donné sans dupliquer les données vectorielles réelles. L'architecture sépare la gestion des métadonnées du stockage physique des données, ce qui permet de réaliser des instantanés légers qui font référence à des fichiers de segments existants dans le stockage d'objets.</p>
<p>Lorsque vous créez un instantané pour une collection, Milvus collecte les éléments suivants :</p>
<ul>
<li><p><strong>Métadonnées de l'instantané</strong></p>
<p>Elles fournissent des informations de base pour la création de l'instantané, notamment le nom et la description de l'instantané, l'ID de la collection cible et le moment de la création de l'instantané.</p></li>
<li><p><strong>Description de la collection</strong></p>
<p>Elle contient la description de la collection cible, y compris sa définition de schéma, ses informations de partition et ses propriétés.</p></li>
<li><p><strong>Informations sur l'index</strong></p>
<p>Elles stockent les métadonnées de l'index et les chemins d'accès aux fichiers d'index.</p></li>
<li><p><strong>Données de segment</strong></p>
<p>Elles capturent les fichiers de données vectorielles (binlogs), les journaux de suppression (deltalogs) et les fichiers d'index.</p></li>
</ul>
<p>Parmi les informations ci-dessus, Milvus génère un fichier manifeste Apache Avro pour chaque segment et stocke les métadonnées d'instantané, la description de la collection, les informations d'index et les chemins d'accès aux fichiers manifestes dans un fichier JSON. Le diagramme suivant illustre la structure du dossier de l'instantané.</p>
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
<p>La création d'un instantané prend généralement quelques millisecondes, et sa restauration quelques secondes à quelques minutes, en fonction du volume de données.</p>
<h2 id="Storage-impacts-and-considerations" class="common-anchor-header">Impacts et considérations en matière de stockage<button data-href="#Storage-impacts-and-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois que Milvus fait référence à un segment ou à un fichier d'index dans un instantané, il ne met pas ces fichiers au rebut, sauf si vous abandonnez l'instantané. Les instantanés consomment de l'espace de stockage proportionnellement à la taille des collections cibles et les coûts de stockage des objets s'appliquent à la conservation des instantanés. Dans des cas extrêmes, un seul instantané peut même doubler vos coûts de stockage d'objets. Il est conseillé de</p>
<ul>
<li>Supprimer régulièrement les anciens clichés pour économiser de l'espace de stockage.</li>
<li>d'utiliser des noms et des descriptions descriptifs pour toute référence ultérieure</li>
<li>Toujours vérifier les résultats de la création et de la restauration des instantanés.</li>
<li>Suivre les horodatages de création des instantanés, l'utilisation de l'espace de stockage et les identifiants des tâches de restauration à des fins de surveillance et de dépannage.</li>
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
<li>Vous pouvez restaurer un instantané uniquement dans une nouvelle collection au sein du même cluster que l'original.</li>
<li>Les collections restaurées conservent le même schéma, le même nombre de shards et le même nombre de partitions.</li>
<li>Les données historiques restaurées peuvent entrer en conflit avec les politiques de TTL. Il est conseillé de désactiver le TTL ou d'ajuster les paramètres du TTL avant de créer des instantanés.</li>
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
<li><a href="/docs/fr/manage-snapshots.md">Gérer les instantanés</a> - créer, lister, restaurer et supprimer des instantanés.</li>
<li><a href="/docs/fr/snapshot-use-cases.md">Cas d'utilisation des instantanés</a> - modèles et flux de travail courants.</li>
<li><a href="/docs/fr/milvus_backup_overview.md">Sauvegarde Milvus</a> - sauvegarde et restauration à long terme entre clusters.</li>
</ul>
