---
id: migrate_overview.md
summary: >-
  Dieser Artikel bietet einen Überblick über das Milvus-Migrationswerkzeug,
  einschließlich unterstützter Migrationen, Funktionen und Architektur.
title: Milvus Migration Übersicht
---
<h1 id="Milvus-Migration-Overview" class="common-anchor-header">Milvus Migration Übersicht<button data-href="#Milvus-Migration-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>In Anbetracht der vielfältigen Bedürfnisse der Benutzer hat Milvus seine Migrationswerkzeuge erweitert, um nicht nur Upgrades von früheren Milvus 1.x-Versionen zu erleichtern, sondern auch die nahtlose Integration von Daten aus anderen Systemen wie <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/elasticsearch-intro.html">Elasticsearch</a> und <a href="https://github.com/facebookresearch/faiss">Faiss</a> zu ermöglichen. Das <a href="https://github.com/zilliztech/milvus-migration">Milvus-Migrationsprojekt</a> wurde entwickelt, um die Lücke zwischen diesen unterschiedlichen Datenumgebungen und den neuesten Fortschritten in der Milvus-Technologie zu schließen und sicherzustellen, dass Sie die verbesserten Funktionen und Leistungen nahtlos nutzen können.</p>
<h2 id="Supported-migrations" class="common-anchor-header">Unterstützte Migrationen<button data-href="#Supported-migrations" class="anchor-icon" translate="no">
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
    </button></h2><p>Das <a href="https://github.com/zilliztech/milvus-migration">Milvus-Migrations-Tool</a> unterstützt eine Vielzahl von Migrationspfaden, um unterschiedlichen Benutzeranforderungen gerecht zu werden:</p>
<ul>
<li><a href="/docs/de/v2.4.x/es2m.md">Elasticsearch zu Milvus 2.x</a>: Ermöglicht Benutzern die Migration von Daten aus Elasticsearch-Umgebungen, um die Vorteile der optimierten Vektorsuchfunktionen von Milvus zu nutzen.</li>
<li><a href="/docs/de/v2.4.x/f2m.md">Faiss zu Milvus 2.x</a>: Experimentelle Unterstützung für die Übertragung von Daten aus Faiss, einer beliebten Bibliothek für effiziente Ähnlichkeitssuche.</li>
<li><a href="/docs/de/v2.4.x/m2m.md">Milvus 1.x zu Milvus 2.x</a>: Sicherstellung des reibungslosen Übergangs von Daten aus früheren Versionen in das neueste Framework.</li>
<li><a href="/docs/de/v2.4.x/from-m2x.md">Milvus 2.3.x zu Milvus 2.3.x oder höher</a>: Bereitstellung eines einmaligen Migrationspfads für Benutzer, die bereits auf 2.3.x migriert sind.</li>
</ul>
<h2 id="Features" class="common-anchor-header">Merkmale<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus-Migration wurde mit robusten Funktionen entwickelt, um verschiedene Migrationsszenarien zu bewältigen:</p>
<ul>
<li>Mehrere Interaktionsmethoden: Sie können Migrationen über eine Befehlszeilenschnittstelle oder über eine Restful-API durchführen, wobei Sie flexibel entscheiden können, wie die Migrationen ausgeführt werden.</li>
<li>Unterstützung für verschiedene Dateiformate und Cloud-Speicher: Das <a href="https://github.com/zilliztech/milvus-migration">Milvus-Migrationswerkzeug</a> kann Daten verarbeiten, die sowohl in lokalen Dateien als auch in Cloud-Speicherlösungen wie S3, OSS und GCP gespeichert sind, was eine breite Kompatibilität gewährleistet.</li>
<li>Behandlung von Datentypen: <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> kann sowohl mit Vektordaten als auch mit skalaren Feldern umgehen und ist damit eine vielseitige Wahl für unterschiedliche Datenmigrationsanforderungen.</li>
</ul>
<h2 id="Architecture" class="common-anchor-header">Architektur<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Architektur von <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> wurde strategisch entwickelt, um effizientes Daten-Streaming, Parsing und Schreibprozesse zu erleichtern und robuste Migrationsfähigkeiten über verschiedene Datenquellen hinweg zu ermöglichen.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvus-migration-architecture.jpeg" alt="Milvus-migration architecture" class="doc-image" id="milvus-migration-architecture" />
   </span> <span class="img-wrapper"> <span>Milvus-Migrationsarchitektur</span> </span></p>
<p>In der vorangehenden Abbildung:</p>
<ul>
<li><strong>Datenquelle</strong>: <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> unterstützt mehrere Datenquellen, darunter Elasticsearch über die <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/scroll-api.html">Scroll-API</a>, lokale oder Cloud-Speicherdateien und Milvus 1.x-Datenbanken. Auf diese wird zugegriffen und sie werden auf eine rationalisierte Weise gelesen, um den Migrationsprozess zu initiieren.</li>
<li><strong>Stream-Pipeline</strong>:<ul>
<li><strong>Parsing-Prozess</strong>: Die Daten aus den Quellen werden entsprechend ihrem Format geparst. So wird beispielsweise für eine Datenquelle aus Elasticsearch ein Parser für das Elasticsearch-Format verwendet, während für andere Formate entsprechende Parser eingesetzt werden. Dieser Schritt ist entscheidend für die Umwandlung von Rohdaten in ein strukturiertes Format, das weiterverarbeitet werden kann.</li>
<li><strong>Konvertierungsprozess</strong>: Nach dem Parsen werden die Daten einer Konvertierung unterzogen, bei der Felder gefiltert, Datentypen konvertiert und Tabellennamen an das Zielschema von Milvus 2.x angepasst werden. Dadurch wird sichergestellt, dass die Daten mit der erwarteten Struktur und den erwarteten Typen in Milvus übereinstimmen.</li>
</ul></li>
<li><strong>Schreiben und Laden von Daten</strong>:<ul>
<li><strong>Daten schreiben</strong>: Die verarbeiteten Daten werden in JSON- oder NumPy-Zwischendateien geschrieben, die dann in Milvus 2.x geladen werden können.</li>
<li><strong>Daten laden</strong>: Die Daten werden schließlich mit der <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">BulkInsert-Operation</a> in Milvus 2.x geladen, die große Datenmengen effizient in Milvus-Speichersysteme schreibt, entweder in die Cloud oder in einen Dateispeicher.</li>
</ul></li>
</ul>
<h2 id="Future-plans" class="common-anchor-header">Pläne für die Zukunft<button data-href="#Future-plans" class="anchor-icon" translate="no">
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
    </button></h2><p>Das Entwicklungsteam ist bestrebt, die <a href="https://github.com/zilliztech/milvus-migration">Milvus-Migration</a> um folgende Funktionen zu erweitern:</p>
<ul>
<li><strong>Unterstützung für weitere Datenquellen</strong>: Es ist geplant, die Unterstützung auf weitere Datenbanken und Dateisysteme wie Pinecone, Chroma, Qdrant zu erweitern. Wenn Sie Unterstützung für eine bestimmte Datenquelle benötigen, reichen Sie Ihre Anfrage bitte über diesen <a href="https://github.com/zilliztech/milvus-migration/issues">GitHub Issue-Link</a> ein.</li>
<li><strong>Vereinfachung der Befehle</strong>: Bemühungen zur Vereinfachung des Befehlsprozesses für eine einfachere Ausführung.</li>
<li><strong>SPI-Parser</strong> / <strong>Konvertierung</strong>: Die Architektur wird voraussichtlich SPI-Tools (Service Provider Interface) zum Parsen und Konvertieren enthalten. Diese Tools ermöglichen benutzerdefinierte Implementierungen, die Benutzer in den Migrationsprozess einfügen können, um bestimmte Datenformate oder Konvertierungsregeln zu handhaben.</li>
<li><strong>Wiederaufnahme von Kontrollpunkten</strong>: Ermöglicht die Wiederaufnahme von Migrationen ab dem letzten Kontrollpunkt, um die Zuverlässigkeit und Effizienz im Falle von Unterbrechungen zu erhöhen. Um die Datenintegrität zu gewährleisten, werden Speicherpunkte erstellt und in Datenbanken wie SQLite oder MySQL gespeichert, um den Fortschritt des Migrationsprozesses zu verfolgen.</li>
</ul>
