---
id: data-infra-integration-overview.md
title: Infrastructure et intégration des données
summary: >-
  Présentation des infrastructures tierces avec lesquelles Milvus s'intègre :
  métadonnées, stockage d'objets et files d'attente de messages.
---
<h1 id="Data-Infrastructure--Integration" class="common-anchor-header">Infrastructure et intégration des données<button data-href="#Data-Infrastructure--Integration" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus s'appuie sur une infrastructure de données ouverte pour ses dépendances principales. Ce chapitre présente les composants que vous pouvez intégrer et configurer :</p>
<ul>
<li><strong><a href="/docs/fr/etcd.md">Métadonnées</a></strong> — Milvus stocke les métadonnées (schémas de collection, état des nœuds, points de contrôle de consommation) dans etcd.</li>
<li><strong><a href="/docs/fr/object-storage.md">Stockage d’objets</a></strong> — Milvus stocke les fichiers d’index et les journaux binaires dans MinIO, AWS S3 ou tout autre système de stockage d’objets cloud compatible S3.</li>
<li><strong><a href="/docs/fr/mqtype-overview.md">File d’attente de messages</a></strong> — Milvus utilise un journal d’écriture anticipée (WAL) : Woodpecker (par défaut), Pulsar, Kafka ou RocksMQ.</li>
</ul>
<p>Par défaut, un nouveau déploiement de Milvus 3.x utilise <strong>Woodpecker</strong> comme file d’attente de messages, <strong>etcd</strong> pour les métadonnées et <strong>MinIO</strong> pour le stockage d’objets — aucune infrastructure de messagerie supplémentaire n’est requise.</p>
