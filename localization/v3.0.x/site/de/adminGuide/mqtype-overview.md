---
id: mqtype-overview.md
title: Übersicht über die Nachrichtenwarteschlange
summary: >-
  Übersicht über die von Milvus unterstützten Optionen für die
  Nachrichtenwarteschlange (mqType) und darüber, welche Option für eigenständige
  bzw. verteilte Bereitstellungen verwendet werden sollte.
---
<h1 id="Message-Queue-Overview" class="common-anchor-header">Übersicht über die Nachrichtenwarteschlange<button data-href="#Message-Queue-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus nutzt eine Nachrichtenwarteschlange (Write-Ahead-Log, WAL), um Protokolle der letzten Änderungen und Ausgabestromprotokolle zu verwalten sowie Protokollabonnements bereitzustellen. In Milvus 3.x ist <strong>Woodpecker</strong> die Standard-Nachrichtenwarteschlange und erfordert keine separate Messaging-Infrastruktur. Pulsar, Kafka und RocksMQ werden weiterhin für bestimmte Szenarien unterstützt.</p>
<h2 id="Supported-message-queues" class="common-anchor-header">Unterstützte Nachrichtenwarteschlangen<button data-href="#Supported-message-queues" class="anchor-icon" translate="no">
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
<tr><th>Nachrichtenwarteschlange</th><th style="text-align:center">Milvus Standalone</th><th style="text-align:center">Milvus Distributed (Cluster)</th><th>Standard in</th><th>Hinweise</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/de/woodpecker.md">Woodpecker</a></td><td style="text-align:center">✔️ (eingebettet)</td><td style="text-align:center">✔️ (eingebettet oder als Dienst)</td><td><strong>Milvus 3.x</strong> (beide Modi)</td><td>Standard und empfohlen. Cloud-natives WAL auf Objektspeicher; kein externer Dienst erforderlich.</td></tr>
<tr><td><a href="/docs/de/mq_pulsar.md">Pulsar</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td>≤ 2.5.x (Cluster-Standard)</td><td>Unterstützt, extern oder im Lieferumfang enthalten.</td></tr>
<tr><td><a href="/docs/de/mq_kafka.md">Kafka</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td>—</td><td>Unterstützt. Nur Kafka 2.x oder 3.x.</td></tr>
<tr><td><a href="/docs/de/mq_rocksmq.md">RocksMQ</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✖️</td><td>≤ 2.5.x (Standard für Standalone)</td><td>Wird <strong>nur</strong> für <strong>den Standalone-Modus</strong> unterstützt.</td></tr>
</tbody>
</table>
<div class="alert note">
<ul>
<li><p>Jede Milvus-Instanz verwendet genau eine Nachrichtenwarteschlange.</p></li>
<li><p><strong>Einschränkungen bei der Nachrichtenwarteschlange</strong>: Beim Upgrade auf Milvus v3.0-beta müssen Sie Ihre aktuelle Auswahl der Nachrichtenwarteschlange beibehalten. Ein Wechsel zwischen verschiedenen Nachrichtenwarteschlangensystemen während des Upgrades wird nicht unterstützt. Die Unterstützung für den Wechsel des Nachrichtenwarteschlangensystems wird in zukünftigen Versionen verfügbar sein.</p></li>
<li><p>Informationen zum Ändern der Nachrichtenwarteschlange einer laufenden Instanz finden Sie unter <a href="/docs/de/switch-mq-type.md">„MQ-Typ wechseln</a>“. Die Funktion „MQ wechseln“ ist ab <strong>Milvus 3.0</strong> verfügbar – führen Sie <strong>daher</strong> zunächst ein Upgrade auf Milvus 3.0 oder <strong>höher</strong> durch.</p></li>
</ul>
</div>
<h2 id="Choosing-a-message-queue" class="common-anchor-header">Auswahl einer Nachrichtenwarteschlange<button data-href="#Choosing-a-message-queue" class="anchor-icon" translate="no">
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
<li><strong>Neue Bereitstellungen (Milvus 3.x):</strong> Verwenden Sie <strong>Woodpecker</strong> (Standard). Bei Standalone-Instanzen wird es eingebettet ausgeführt; für verteilte (Cluster-)Instanzen ist der empfohlene Standard ein dedizierter, mit Helm bereitgestellter <a href="/docs/de/woodpecker.md#Deployment-modes">Dienst</a>, wobei auch die eingebettete Ausführung unterstützt wird.</li>
<li><strong>Bestehende Pulsar- oder Kafka-Nutzer:</strong> Pulsar und Kafka werden weiterhin vollständig unterstützt. Behalten Sie diese bei oder <a href="/docs/de/switch-mq-type.md">wechseln Sie zu Woodpecker</a>.</li>
<li><strong>RocksMQ:</strong> nur im Standalone-Modus verfügbar und in Milvus 3.x durch den eingebetteten Woodpecker abgelöst.</li>
</ul>
