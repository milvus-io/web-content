---
id: switch-mq-type.md
title: Changer de type de file d'attente de messages
summary: >-
  Basculer la file d'attente de messages d'un déploiement Milvus existant de
  Woodpecker vers une autre file d'attente de messages sans interruption de
  service.
---
<h1 id="Switch-MQ-Type" class="common-anchor-header">Changer de type de file d'attente de messages<button data-href="#Switch-MQ-Type" class="anchor-icon" translate="no">
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
    </button></h1><p>Ce guide décrit comment basculer la file d'attente de messages (MQ) d'un déploiement Milvus existant <strong>de Woodpecker vers une autre file d'attente de messages</strong>, en ligne et sans interruption de service.</p>
<div class="alert warning">
<p>Cette fonctionnalité n'est pas encore disponible et est susceptible d'être modifiée. Veuillez contacter le support Milvus si vous souhaitez la tester ou si vous avez des questions.</p>
</div>
<h2 id="Prerequisites" class="common-anchor-header">Prérequis<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><strong>La fonctionnalité « Changer de file d’attente de messages » est disponible à partir de Milvus 3.0.</strong> Mettez à jour votre instance Milvus vers la version 3.0 ou une version<strong>ultérieure</strong> avant de l’utiliser — cette fonctionnalité n’est pas disponible sur les versions antérieures.</li>
<li>L’instance fonctionne correctement.</li>
</ul>
<h2 id="Scope" class="common-anchor-header">Portée<button data-href="#Scope" class="anchor-icon" translate="no">
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
    </button></h2><p>Ce guide traite uniquement de la bascule <strong>entre Woodpecker et une autre file d’attente de messages</strong>. La bascule directe entre Pulsar et Kafka n’est pas couverte.</p>
<ul>
<li><a href="/docs/fr/switch-rocksmq-woodpecker.md">Basculer entre RocksMQ et Woodpecker</a> — Milvus autonome (Docker Compose)</li>
<li><a href="/docs/fr/switch-pulsar-woodpecker.md">Basculer entre Pulsar et Woodpecker</a> — Cluster Milvus (Helm / Milvus Operator)</li>
<li><a href="/docs/fr/switch-kafka-woodpecker.md">Basculer entre Kafka et Woodpecker</a> — Cluster Milvus (Helm / Milvus Operator)</li>
</ul>
<h2 id="General-workflow" class="common-anchor-header">Déroulement général<button data-href="#General-workflow" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Assurez-vous que l’instance Milvus fonctionne correctement.</li>
<li>Vérifiez le type de MQ source et le type de MQ cible.</li>
<li>Intégrez les paramètres d’accès de la file d’attente cible dans la configuration de Milvus <strong>sans</strong> modifier la valeur de l’ <code translate="no">mqType</code>.</li>
<li>Déclenchez la bascule en appelant l’API WAL alter sur MixCoord.</li>
<li>Surveillez les journaux pour vérifier que la bascule s’est bien effectuée.</li>
</ol>
<div class="alert note">
<p>Avant la bascule, assurez-vous que le MQ cible ne contient pas de sujets portant les mêmes noms que ceux utilisés par l’instance Milvus actuelle. Ceci est particulièrement important si le MQ cible a déjà été utilisé par une autre instance Milvus, car des noms de sujets en conflit peuvent entraîner un comportement inattendu.</p>
</div>
<h2 id="Support-matrix" class="common-anchor-header">Matrice de prise en charge<button data-href="#Support-matrix" class="anchor-icon" translate="no">
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
<tr><th>MQ source</th><th>MQ cible</th><th>Déploiement</th><th>Statut</th></tr>
</thead>
<tbody>
<tr><td>RocksMQ</td><td>Woodpecker (local/MinIO)</td><td>Autonome (Docker Compose)</td><td><strong>Prise en charge</strong></td></tr>
<tr><td>Woodpecker (local/MinIO)</td><td>RocksMQ</td><td>Autonome (Docker Compose)</td><td><strong>Pris en charge</strong></td></tr>
<tr><td>Pulsar (intégré/externe)</td><td>Woodpecker (MinIO)</td><td>Cluster (Helm / Operator)</td><td><strong>Pris en charge</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>Pulsar (externe)</td><td>Cluster (Helm / Operator)</td><td><strong>Prise en charge</strong></td></tr>
<tr><td>Kafka (intégré/externe)</td><td>Woodpecker (MinIO)</td><td>Cluster (Helm / Operator)</td><td><strong>Pris en charge</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>Kafka (externe)</td><td>Cluster (Helm / Operator)</td><td><strong>Pris en charge</strong></td></tr>
<tr><td>Woodpecker MinIO</td><td>Woodpecker local (ou inversement)</td><td>n'importe lequel</td><td><strong>Non pris en charge</strong></td></tr>
</tbody>
</table>
<div class="alert note">
<p>Évitez de changer de type de MQ à plusieurs reprises. Si vous devez changer de type, veillez à nettoyer les données associées avant chaque changement — les données résiduelles peuvent entraîner un comportement inattendu.</p>
</div>
