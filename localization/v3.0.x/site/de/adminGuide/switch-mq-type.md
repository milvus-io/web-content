---
id: switch-mq-type.md
title: MQ-Typ wechseln
summary: >-
  Wechseln Sie die Nachrichtenwarteschlange einer bestehenden
  Milvus-Bereitstellung ohne Ausfallzeit von Woodpecker zu einer anderen
  Nachrichtenwarteschlange.
---
<h1 id="Switch-MQ-Type" class="common-anchor-header">MQ-Typ wechseln<button data-href="#Switch-MQ-Type" class="anchor-icon" translate="no">
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
    </button></h1><p>In dieser Anleitung wird beschrieben, wie Sie die Nachrichtenwarteschlange (MQ) einer bestehenden Milvus-Bereitstellung online und ohne Ausfallzeit <strong>von Woodpecker auf eine andere Nachrichtenwarteschlange</strong> umstellen können.</p>
<div class="alert warning">
<p>Diese Funktion steht noch nicht zur Verfügung und kann sich ändern. Bitte wenden Sie sich an den Milvus-Support, wenn Sie sie ausprobieren möchten oder Fragen haben.</p>
</div>
<h2 id="Prerequisites" class="common-anchor-header">Voraussetzungen<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><strong>Die Funktion „MQ wechseln“ ist ab Milvus 3.0 verfügbar.</strong> Aktualisieren Sie Ihre Milvus-Instanz auf Milvus 3.0 oder<strong>höher</strong>, bevor Sie die Funktion nutzen – in früheren Versionen ist sie nicht verfügbar.</li>
<li>Die Instanz läuft ordnungsgemäß.</li>
</ul>
<h2 id="Scope" class="common-anchor-header">Geltungsbereich<button data-href="#Scope" class="anchor-icon" translate="no">
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
    </button></h2><p>Diese Anleitung behandelt ausschließlich den Wechsel <strong>zwischen Woodpecker und einer anderen Nachrichtenwarteschlange</strong>. Der direkte Wechsel zwischen Pulsar und Kafka liegt außerhalb des Geltungsbereichs.</p>
<ul>
<li><a href="/docs/de/switch-rocksmq-woodpecker.md">Wechsel zwischen RocksMQ und Woodpecker</a> – Milvus Standalone (Docker Compose)</li>
<li><a href="/docs/de/switch-pulsar-woodpecker.md">Wechsel zwischen Pulsar und Woodpecker</a> – Milvus-Cluster (Helm / Milvus Operator)</li>
<li><a href="/docs/de/switch-kafka-woodpecker.md">Wechsel zwischen Kafka und Woodpecker</a> – Milvus-Cluster (Helm / Milvus Operator)</li>
</ul>
<h2 id="General-workflow" class="common-anchor-header">Allgemeiner Arbeitsablauf<button data-href="#General-workflow" class="anchor-icon" translate="no">
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
<li>Stellen Sie sicher, dass die Milvus-Instanz ordnungsgemäß läuft.</li>
<li>Überprüfen Sie den Typ des Quell-MQ und den Typ des Ziel-MQ.</li>
<li>Übertragen Sie die Zugriffseinstellungen der Ziel-MQ in die Milvus-Konfiguration, <strong>ohne</strong> den Wert „ <code translate="no">mqType</code> “ zu ändern.</li>
<li>Lösen Sie den Wechsel aus, indem Sie die WAL-Alter-API auf MixCoord aufrufen.</li>
<li>Überwachen Sie die Protokolle, um sicherzustellen, dass die Umschaltung abgeschlossen ist.</li>
</ol>
<div class="alert note">
<p>Stellen Sie vor der Umschaltung sicher, dass die Ziel-MQ keine Themen enthält, deren Namen mit denen der aktuellen Milvus-Instanz übereinstimmen. Dies ist besonders wichtig, wenn die Ziel-MQ bereits von einer anderen Milvus-Instanz verwendet wurde, da widersprüchliche Themennamen zu unerwartetem Verhalten führen können.</p>
</div>
<h2 id="Support-matrix" class="common-anchor-header">Unterstützungsmatrix<button data-href="#Support-matrix" class="anchor-icon" translate="no">
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
<tr><th>Quell-MQ</th><th>Ziel-MQ</th><th>Bereitstellung</th><th>Status</th></tr>
</thead>
<tbody>
<tr><td>RocksMQ</td><td>Woodpecker (lokal/MinIO)</td><td>Standalone (Docker Compose)</td><td><strong>Unterstützt</strong></td></tr>
<tr><td>Woodpecker (lokal/MinIO)</td><td>RocksMQ</td><td>Standalone (Docker Compose)</td><td><strong>Unterstützt</strong></td></tr>
<tr><td>Pulsar (integriert/extern)</td><td>Woodpecker (MinIO)</td><td>Cluster (Helm / Operator)</td><td><strong>Unterstützt</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>Pulsar (extern)</td><td>Cluster (Helm / Operator)</td><td><strong>Unterstützt</strong></td></tr>
<tr><td>Kafka (integriert/extern)</td><td>Woodpecker (MinIO)</td><td>Cluster (Helm / Operator)</td><td><strong>Unterstützt</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>Kafka (extern)</td><td>Cluster (Helm / Operator)</td><td><strong>Unterstützt</strong></td></tr>
<tr><td>Woodpecker MinIO</td><td>Woodpecker lokal (oder umgekehrt)</td><td>beliebig</td><td><strong>Nicht unterstützt</strong></td></tr>
</tbody>
</table>
<div class="alert note">
<p>Vermeiden Sie es, wiederholt zwischen verschiedenen MQ-Typen hin und her zu wechseln. Falls ein Wechsel dennoch erforderlich ist, stellen Sie sicher, dass Sie vor jedem Wechsel die zugehörigen Daten bereinigen – verbleibende Daten können zu unerwartetem Verhalten führen.</p>
</div>
