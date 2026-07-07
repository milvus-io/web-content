---
id: mqtype-overview.md
title: Présentation de la file d'attente de messages
summary: >-
  Présentation des options de file d'attente de messages (mqType) prises en
  charge par Milvus, et des options à utiliser selon qu'il s'agit d'un
  déploiement autonome ou distribué.
---
<h1 id="Message-Queue-Overview" class="common-anchor-header">Présentation de la file d'attente de messages<button data-href="#Message-Queue-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus s'appuie sur une file d'attente de messages (journal d'écriture anticipée, WAL) pour gérer les journaux des modifications récentes, les journaux de flux de sortie et fournir des abonnements aux journaux. Dans Milvus 3.x, <strong>Woodpecker</strong> est la file d'attente de messages par défaut et ne nécessite aucune infrastructure de messagerie distincte. Pulsar, Kafka et RocksMQ restent pris en charge pour des scénarios spécifiques.</p>
<h2 id="Supported-message-queues" class="common-anchor-header">Files d’attente de messages prises en charge<button data-href="#Supported-message-queues" class="anchor-icon" translate="no">
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
<tr><th>File d'attente de messages</th><th style="text-align:center">Milvus autonome</th><th style="text-align:center">Milvus distribué (cluster)</th><th>Par défaut dans</th><th>Remarques</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/fr/woodpecker.md">Woodpecker</a></td><td style="text-align:center">✔️ (intégré)</td><td style="text-align:center">✔️ (intégré ou en tant que service)</td><td><strong>Milvus 3.x</strong> (les deux modes)</td><td>Par défaut et recommandé. WAL natif du cloud sur stockage objet ; aucun service externe requis.</td></tr>
<tr><td><a href="/docs/fr/mq_pulsar.md">Pulsar</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td>≤ 2.5.x (par défaut du cluster)</td><td>Pris en charge, externe ou intégré.</td></tr>
<tr><td><a href="/docs/fr/mq_kafka.md">Kafka</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td>—</td><td>Pris en charge. Uniquement Kafka 2.x ou 3.x.</td></tr>
<tr><td><a href="/docs/fr/mq_rocksmq.md">RocksMQ</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✖️</td><td>≤ 2.5.x (par défaut en mode autonome)</td><td>Pris en charge <strong>uniquement</strong> pour <strong>le mode autonome</strong>.</td></tr>
</tbody>
</table>
<div class="alert note">
<ul>
<li><p>Chaque instance Milvus utilise exactement une file d’attente de messages.</p></li>
<li><p><strong>Limitations relatives aux files d’attente de messages</strong>: lors de la mise à niveau vers Milvus v3.0-beta, vous devez conserver votre choix actuel de file d’attente de messages. Le passage d’un système de file d’attente de messages à un autre pendant la mise à niveau n’est pas pris en charge. La prise en charge du changement de système de file d’attente de messages sera disponible dans les versions futures.</p></li>
<li><p>Pour modifier la file d’attente de messages d’une instance en cours d’exécution, consultez la section « <a href="/docs/fr/switch-mq-type.md">Changer de type de file d’attente de messages</a> ». La fonctionnalité « Changer de type de file d’attente de messages » est disponible à partir de <strong>Milvus 3.0 —</strong> effectuez d’abord la mise à niveau vers Milvus 3.0 ou <strong>une version ultérieure</strong>.</p></li>
</ul>
</div>
<h2 id="Choosing-a-message-queue" class="common-anchor-header">Choix d’une file d’attente de messages<button data-href="#Choosing-a-message-queue" class="anchor-icon" translate="no">
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
<li><strong>Nouveaux déploiements (Milvus 3.x) :</strong> utilisez <strong>Woodpecker</strong> (par défaut). En mode autonome, il est exécuté en mode intégré ; en mode distribué (cluster), la configuration par défaut recommandée est un <a href="/docs/fr/woodpecker.md#Deployment-modes">service</a> dédié déployé avec Helm, mais le mode intégré est également pris en charge.</li>
<li><strong>Utilisateurs actuels de Pulsar ou Kafka :</strong> Pulsar et Kafka restent entièrement pris en charge. Vous pouvez les conserver ou <a href="/docs/fr/switch-mq-type.md">passer à Woodpecker</a>.</li>
<li><strong>RocksMQ :</strong> disponible uniquement en mode autonome, et remplacé par Woodpecker intégré dans Milvus 3.x.</li>
</ul>
