---
id: limitations.md
title: Einschränkungen von Milvus
related_key: Limitations
summary: Informieren Sie sich über die Einschränkungen bei der Nutzung von Milvus.
---
<h1 id="Milvus-Limits" class="common-anchor-header">Einschränkungen von Milvus<button data-href="#Milvus-Limits" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus hat es sich zum Ziel gesetzt, die besten Vektordatenbanken für KI-Anwendungen und die Suche nach Vektorähnlichkeiten bereitzustellen. Das Team arbeitet jedoch kontinuierlich daran, weitere Funktionen und die besten Hilfsmittel einzuführen, um die Benutzererfahrung zu verbessern. Auf dieser Seite sind einige bekannte Einschränkungen aufgeführt, auf die Nutzer bei der Verwendung von Milvus stoßen können.</p>
<h2 id="Length-of-a-resource-name" class="common-anchor-header">Länge eines Ressourcennamens<button data-href="#Length-of-a-resource-name" class="anchor-icon" translate="no">
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
<tr><th>Ressource</th><th>Beschränkung</th></tr>
</thead>
<tbody>
<tr><td>Datenbank</td><td>255 Zeichen</td></tr>
<tr><td>Sammlung</td><td>255 Zeichen</td></tr>
<tr><td>Feld</td><td>255 Zeichen</td></tr>
<tr><td>Index</td><td>255 Zeichen</td></tr>
<tr><td>Partition</td><td>255  Zeichen</td></tr>
</tbody>
</table>
<h2 id="Naming-rules" class="common-anchor-header">Namenskonventionen<button data-href="#Naming-rules" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Name einer Ressource, wie beispielsweise der Name einer Sammlung, einer Partition oder eines Index, darf Zahlen, Buchstaben und Unterstriche (_) enthalten. Ein Ressourcenname muss mit einem Buchstaben oder einem Unterstrich (_) beginnen.</p>
<h2 id="Number-of-resources" class="common-anchor-header">Anzahl der Ressourcen<button data-href="#Number-of-resources" class="anchor-icon" translate="no">
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
<tr><th>Ressource</th><th>Begrenzung</th></tr>
</thead>
<tbody>
<tr><td>Sammlung</td><td>65.536</td></tr>
</tbody>
</table>
<h2 id="Number-of-resources-in-a-collection" class="common-anchor-header">Anzahl der Ressourcen in einer Sammlung<button data-href="#Number-of-resources-in-a-collection" class="anchor-icon" translate="no">
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
<tr><th>Ressource</th><th>Begrenzung</th></tr>
</thead>
<tbody>
<tr><td>Partition</td><td>1.024</td></tr>
<tr><td>Shard</td><td>16</td></tr>
<tr><td>Feld</td><td>64</td></tr>
<tr><td>Index</td><td>1</td></tr>
<tr><td>Entität</td><td>unbegrenzt</td></tr>
</tbody>
</table>
<h2 id="Length-of-a-string" class="common-anchor-header">Länge einer Zeichenkette<button data-href="#Length-of-a-string" class="anchor-icon" translate="no">
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
<tr><th>Datentyp</th><th>Begrenzung</th></tr>
</thead>
<tbody>
<tr><td>VARCHAR</td><td>65.535</td></tr>
</tbody>
</table>
<h2 id="Dimensions-of-a-vector" class="common-anchor-header">Dimensionen eines Vektors<button data-href="#Dimensions-of-a-vector" class="anchor-icon" translate="no">
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
<tr><th>Eigenschaft</th><th>Grenzwert</th></tr>
</thead>
<tbody>
<tr><td>Dimension</td><td>32.768</td></tr>
</tbody>
</table>
<h2 id="Input-and-Output-per-RPC" class="common-anchor-header">Ein- und Ausgabe pro RPC<button data-href="#Input-and-Output-per-RPC" class="anchor-icon" translate="no">
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
<tr><th>Operation</th><th>Grenzwert</th></tr>
</thead>
<tbody>
<tr><td>Einfügen</td><td>64 MB</td></tr>
<tr><td>Suche</td><td>64 MB</td></tr>
<tr><td>Abfrage</td><td>64 MB</td></tr>
</tbody>
</table>
<h2 id="Load-limits" class="common-anchor-header">Lade-Limits<button data-href="#Load-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>In der aktuellen Version müssen die zu ladenden Daten unter 90 % der gesamten Speicherressourcen aller Abfrageknoten liegen, um Speicherressourcen für die Ausführungs-Engine zu reservieren.</p>
<h2 id="Search-limits" class="common-anchor-header">Suchbeschränkungen<button data-href="#Search-limits" class="anchor-icon" translate="no">
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
<tr><th>Vektoren</th><th>Begrenzung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">topk</code> (Anzahl der ähnlichsten Ergebnisse, die zurückgegeben werden sollen)</td><td>16.384</td></tr>
<tr><td><code translate="no">nq</code> (Anzahl der Suchanfragen)</td><td>16.384</td></tr>
</tbody>
</table>
<h2 id="Index-limits-on-different-search-types" class="common-anchor-header">Indexbeschränkungen bei verschiedenen Sucharten<button data-href="#Index-limits-on-different-search-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Die folgende Tabelle bietet einen Überblick über die Unterstützung verschiedener Suchverhalten bei unterschiedlichen Indextypen.</p>
<table>
<thead>
<tr><th></th><th>HNSW</th><th>DISKANN</th><th>FLAT</th><th>IVF_FLAT</th><th>IVF_SQ8</th><th>IVF_PQ</th><th>SCANN</th><th>GPU_IFV_FLAT</th><th>GPU_IVF_PQ</th><th>GPU_CAGRA</th><th>GPU_BRUTE_FORCE</th><th>SPARSE_INVERTED_INDEX</th><th>BIN_FLAT</th><th>BIN_IVF_FLAT</th></tr>
</thead>
<tbody>
<tr><td>Einfache Suche</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td></tr>
<tr><td>Partitionssuche</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td></tr>
<tr><td>Einfache Suche mit abgerufenen Rohdaten</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td></tr>
<tr><td>Einfache Suche mit Paginierung</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td></tr>
<tr><td>Gefilterte Suche</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td></tr>
<tr><td>Bereichssuche</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Nein</td><td>Nein</td><td>Nein</td><td>Nein</td><td>Ja</td><td>Ja</td><td>Ja</td></tr>
<tr><td>Gruppensuche</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Nein</td><td>Ja</td><td>Nein</td><td>Nein</td><td>Nein</td><td>Nein</td><td>Ja</td><td>Nein</td><td>Nein</td></tr>
<tr><td>Suche mit Iterator</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Nein</td><td>Nein</td><td>Nein</td><td>Nein</td><td>Ja</td><td>Ja</td><td>Ja</td></tr>
<tr><td>Hybridsuche</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja (nur RRFRanker)</td><td>Ja</td><td>Ja</td></tr>
<tr><td>Abfrage/Abruf</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td></tr>
<tr><td>Abfrage mit Iterator</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Ja</td><td>Nein</td><td>Nein</td><td>Nein</td><td>Nein</td><td>Ja</td><td>Ja</td><td>Ja</td></tr>
</tbody>
</table>
