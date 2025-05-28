---
id: elasticsearch-queries-to-milvus.md
title: Elasticsearch-Abfragen an Milvus
summary: >-
  Elasticsearch, das auf Apache Lucene basiert, ist eine führende
  Open-Source-Suchmaschine. In modernen KI-Anwendungen ist sie jedoch mit
  Herausforderungen konfrontiert, darunter hohe Aktualisierungskosten, schlechte
  Echtzeitleistung, ineffizientes Shard-Management, ein nicht cloud-natives
  Design und übermäßiger Ressourcenbedarf. Als Cloud-native Vektordatenbank
  überwindet Milvus diese Probleme mit entkoppelter Speicherung und Berechnung,
  effizienter Indexierung für hochdimensionale Daten und nahtloser Integration
  in moderne Infrastrukturen. Sie bietet überlegene Leistung und Skalierbarkeit
  für KI-Workloads.
---
<h1 id="Elasticsearch-Queries-to-Milvus" class="common-anchor-header">Elasticsearch-Abfragen an Milvus<button data-href="#Elasticsearch-Queries-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Elasticsearch, das auf Apache Lucene basiert, ist eine führende Open-Source-Suchmaschine. In modernen KI-Anwendungen ist sie jedoch mit Herausforderungen konfrontiert, darunter hohe Aktualisierungskosten, schlechte Echtzeit-Performance, ineffizientes Shard-Management, ein nicht cloud-natives Design und übermäßiger Ressourcenbedarf. Als Cloud-native Vektordatenbank überwindet Milvus diese Probleme mit entkoppelter Speicherung und Berechnung, effizienter Indexierung für hochdimensionale Daten und nahtloser Integration in moderne Infrastrukturen. Sie bietet überlegene Leistung und Skalierbarkeit für KI-Workloads.</p>
<p>Dieser Artikel zielt darauf ab, die Migration Ihrer Codebasis von Elasticsearch zu Milvus zu erleichtern und bietet verschiedene Beispiele für die Konvertierung von Abfragen.</p>
<h2 id="Overview" class="common-anchor-header">Überblick<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>In Elasticsearch erzeugen Operationen im Abfragekontext Relevanzwerte, während Operationen im Filterkontext dies nicht tun. In ähnlicher Weise erzeugen Milvus-Suchen Ähnlichkeitsbewertungen, während die filterähnlichen Abfragen dies nicht tun. Bei der Migration Ihrer Codebasis von Elasticsearch nach Milvus ist das Schlüsselprinzip die Konvertierung von Feldern, die im Abfragekontext von Elasticsearch verwendet werden, in Vektorfelder, um die Generierung von Ähnlichkeitsbewertungen zu ermöglichen.</p>
<p>In der folgenden Tabelle sind einige Elasticsearch-Abfragemuster und ihre entsprechenden Entsprechungen in Milvus aufgeführt.</p>
<table>
   <tr>
     <th><p>Elasticsearch-Abfragen</p></th>
     <th><p>Milvus-Entsprechungen</p></th>
     <th><p>Bemerkungen</p></th>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Volltext-Abfragen</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/elasticsearch-queries-to-milvus.md#Match-query">Match-Abfrage</a></p></td>
     <td><p>Volltext-Suche</p></td>
     <td><p>Beide bieten ähnliche Möglichkeiten.</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Abfragen auf Termebene</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/elasticsearch-queries-to-milvus.md#IDs">IDs</a></p></td>
     <td><p><code translate="no">in</code> Operator</p></td>
     <td rowspan="6"><p>Beide bieten die gleichen oder ähnliche Möglichkeiten, wenn diese Elasticsearch-Abfragen im Filterkontext verwendet werden.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/elasticsearch-queries-to-milvus.md#Prefix-query">Präfix-Abfrage</a></p></td>
     <td><p><code translate="no">like</code> Operator</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/elasticsearch-queries-to-milvus.md#Range-query">Bereichsabfrage</a></p></td>
     <td><p>Vergleichsoperatoren wie <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, und <code translate="no">&lt;=</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/elasticsearch-queries-to-milvus.md#Term-query">Term-Abfrage</a></p></td>
     <td><p>Vergleichsoperatoren wie <code translate="no">==</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/elasticsearch-queries-to-milvus.md#Terms-query">Term-Abfrage</a></p></td>
     <td><p><code translate="no">in</code> Operator</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/elasticsearch-queries-to-milvus.md#Wildcard-query">Platzhalter-Abfrage</a></p></td>
     <td><p><code translate="no">like</code> Operator</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/elasticsearch-queries-to-milvus.md#Boolean-query">Boolesche Abfrage</a></p></td>
     <td><p>Logische Operatoren wie <code translate="no">AND</code></p></td>
     <td><p>Beide bieten ähnliche Möglichkeiten, wenn sie im Filterkontext verwendet werden.</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Vektorielle Abfragen</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/elasticsearch-queries-to-milvus.md#Knn-query">kNN-Abfrage</a></p></td>
     <td><p>Suche</p></td>
     <td><p>Milvus bietet erweiterte Vektorsuchfunktionen.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/de/elasticsearch-queries-to-milvus.md#Reciprocal-rank-fusion">Reziproke Rangfusion</a></p></td>
     <td><p>Hybride Suche</p></td>
     <td><p>Milvus unterstützt mehrere Rangfusionsstrategien.</p></td>
   </tr>
</table>
<h2 id="Full-text-queries" class="common-anchor-header">Volltext-Abfragen<button data-href="#Full-text-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>In Elasticsearch ermöglichen die Volltextabfragen die Suche in analysierten Textfeldern, z. B. im Textkörper einer E-Mail. Die Abfragezeichenfolge wird mit demselben Analysator verarbeitet, der bei der Indizierung auf das Feld angewendet wurde.</p>
<h3 id="Match-query" class="common-anchor-header">Abgleichsabfrage</h3><p>In Elasticsearch gibt eine Match-Abfrage Dokumente zurück, die mit einem angegebenen Text, einer Zahl, einem Datum oder einem booleschen Wert übereinstimmen. Der angegebene Text wird vor dem Abgleich analysiert.</p>
<p>Es folgt ein Beispiel für eine Elasticsearch-Suchanfrage mit einer Match-Abfrage.</p>
<pre><code translate="no" class="language-bash">resp = client.search(
    query={
        <span class="hljs-string">&quot;match&quot;</span>: {
            <span class="hljs-string">&quot;message&quot;</span>: {
                <span class="hljs-string">&quot;query&quot;</span>: <span class="hljs-string">&quot;this is a test&quot;</span>
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus bietet die gleiche Möglichkeit durch die Volltextsuche. Sie können die obige Elasticsearch-Abfrage wie folgt in Milvus konvertieren:</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[<span class="hljs-string">&#x27;How is the weather in Jamaica?&#x27;</span>],
    anns_field=<span class="hljs-string">&quot;message_sparse&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;message&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Im obigen Beispiel ist <code translate="no">message_sparse</code> ein spärliches Vektorfeld, das von einem VarChar-Feld namens <code translate="no">message</code> abgeleitet ist. Milvus verwendet das BM25-Einbettungsmodell, um die Werte im Feld <code translate="no">message</code> in Sparse-Vektor-Einbettungen umzuwandeln und speichert sie im Feld <code translate="no">message_sparse</code>. Beim Empfang der Suchanfrage bettet Milvus die Nutzdaten der Klartextabfrage mit demselben BM25-Modell ein, führt eine Sparse-Vector-Suche durch und gibt die im Parameter <code translate="no">output_fields</code> angegebenen Felder <code translate="no">id</code> und <code translate="no">message</code> zusammen mit den entsprechenden Ähnlichkeitsbewertungen zurück.</p>
<p>Um diese Funktionalität zu nutzen, müssen Sie den Analyzer für das Feld <code translate="no">message</code> aktivieren und eine Funktion definieren, um das Feld <code translate="no">message_sparse</code> daraus abzuleiten. Detaillierte Anweisungen zur Aktivierung des Analyzers und zur Erstellung der Ableitungsfunktion in Milvus finden Sie unter <a href="/docs/de/full-text-search.md">Volltextsuche</a>.</p>
<h2 id="Term-level-queries" class="common-anchor-header">Abfragen auf Begriffsebene<button data-href="#Term-level-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>In Elasticsearch werden Abfragen auf Termebene verwendet, um Dokumente zu finden, die auf exakten Werten in strukturierten Daten basieren, wie z.B. Datumsbereiche, IP-Adressen, Preise oder Produkt-IDs. Dieser Abschnitt skizziert die möglichen Äquivalente einiger Elasticsearch-Abfragen auf Termebene in Milvus. Alle Beispiele in diesem Abschnitt sind so angepasst, dass sie im Filterkontext funktionieren, um den Fähigkeiten von Milvus gerecht zu werden.</p>
<h3 id="IDs" class="common-anchor-header">IDs</h3><p>In Elasticsearch können Sie Dokumente anhand ihrer IDs im Filterkontext wie folgt finden:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;ids&quot;</span>: {
                    <span class="hljs-string">&quot;values&quot;</span>: [
                        <span class="hljs-string">&quot;1&quot;</span>,
                        <span class="hljs-string">&quot;4&quot;</span>,
                        <span class="hljs-string">&quot;100&quot;</span>
                    ]
                }            
            }
        }
    },
)
<button class="copy-code-btn"></button></code></pre>
<p>In Milvus können Sie auch Entitäten auf der Basis ihrer IDs wie folgt finden:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the filter parameter</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id in [1, 4, 100]&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>]
)

<span class="hljs-comment"># Use the ids parameter</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    ids=[<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">100</span>],
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Das Elasticsearch-Beispiel finden Sie auf <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-ids-query.html">dieser Seite</a>. Details zu Query- und Get-Anfragen sowie zu den Filterausdrücken in Milvus finden Sie unter <a href="/docs/de/get-and-scalar-query.md">Query</a> und <a href="/docs/de/filtering">Filtering</a>.</p>
<h3 id="Prefix-query" class="common-anchor-header">Präfix-Abfrage</h3><p>In Elasticsearch können Sie Dokumente, die ein bestimmtes Präfix in einem angegebenen Feld enthalten, wie folgt im Filterkontext finden:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                 <span class="hljs-string">&quot;prefix&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;ki&quot;</span>
                    }
                }           
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>In Milvus können Sie die Entitäten, deren Werte mit dem angegebenen Präfix beginnen, wie folgt finden:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;ki%&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Das Elasticsearch-Beispiel finden Sie auf <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-prefix-query.html">dieser Seite</a>. Details zum <code translate="no">like</code> Operator in Milvus finden Sie unter <a href="/docs/de/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching">Verwendung von </a><code translate="no">LIKE</code><a href="/docs/de/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching"> für Pattern Matching</a>.</p>
<h3 id="Range-query" class="common-anchor-header">Bereichsabfrage</h3><p>In Elasticsearch können Sie wie folgt Dokumente finden, die Begriffe innerhalb eines angegebenen Bereichs enthalten:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;range&quot;</span>: {
                    <span class="hljs-string">&quot;age&quot;</span>: {
                        <span class="hljs-string">&quot;gte&quot;</span>: <span class="hljs-number">10</span>,
                        <span class="hljs-string">&quot;lte&quot;</span>: <span class="hljs-number">20</span>
                    }
                }           
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>In Milvus können Sie wie folgt die Entitäten finden, deren Werte in einem bestimmten Feld innerhalb eines angegebenen Bereichs liegen:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;10 &lt;= age &lt;= 20&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Das Elasticsearch-Beispiel finden Sie auf <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html">dieser Seite</a>. Für Details zu Vergleichsoperatoren in Milvus siehe <a href="/docs/de/basic-operators.md#Comparison-operators">Vergleichsoperatoren</a>.</p>
<h3 id="Term-query" class="common-anchor-header">Begriffsabfrage</h3><p>In Elasticsearch können Sie wie folgt Dokumente finden, die einen <strong>exakten</strong> Begriff in einem angegebenen Feld enthalten:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;status&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;retired&quot;</span>
                    }
                }            
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>In Milvus können Sie wie folgt die Entitäten finden, deren Werte in dem angegebenen Feld genau dem angegebenen Begriff entsprechen:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use ==</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;status==&quot;retired&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)

<span class="hljs-comment"># use TEXT_MATCH</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(status, &quot;retired&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Das Elasticsearch-Beispiel finden Sie auf <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html">dieser Seite</a>. Für Details zu Vergleichsoperatoren in Milvus siehe <a href="/docs/de/basic-operators.md#Comparison-operators">Vergleichsoperatoren</a>.</p>
<h3 id="Terms-query" class="common-anchor-header">Begriffe abfragen</h3><p>In Elasticsearch können Sie wie folgt Dokumente finden, die einen oder mehrere <strong>exakte</strong> Begriffe in einem angegebenen Feld enthalten:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;terms&quot;</span>: {
                    <span class="hljs-string">&quot;degree&quot;</span>: [
                        <span class="hljs-string">&quot;graduate&quot;</span>,
                        <span class="hljs-string">&quot;post-graduate&quot;</span>
                    ]
                }        
            }
        }
    }
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus verfügt nicht über eine vollständige Äquivalenz dieses Begriffs. Sie können jedoch die Entitäten, deren Werte im angegebenen Feld einen der angegebenen Begriffe enthalten, wie folgt finden:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use in</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;degree in [&quot;graduate&quot;, &quot;post-graduate&quot;]&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;degree&quot;</span>]
)

<span class="hljs-comment"># use TEXT_MATCH</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(degree, &quot;graduate post-graduate&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;degree&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Das Elasticsearch-Beispiel finden Sie auf <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html">dieser Seite</a>. Für Details zu Bereichsoperatoren in Milvus siehe <a href="/docs/de/basic-operators.md#Range-operators">Bereichsoperatoren</a>.</p>
<h3 id="Wildcard-query" class="common-anchor-header">Wildcard-Abfrage</h3><p>In Elasticsearch können Sie Dokumente finden, die Begriffe enthalten, die einem Wildcard-Muster entsprechen, wie folgt:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;wildcard&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;ki*y&quot;</span>
                    }
                }          
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus unterstützt keine Platzhalter in seinen Filterbedingungen. Sie können jedoch den <code translate="no">like</code> -Operator verwenden, um einen ähnlichen Effekt zu erzielen (siehe unten):</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;ki%&quot; AND user like &quot;%y&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Das Elasticsearch-Beispiel finden Sie auf <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-wildcard-query.html">dieser Seite</a>. Details zu den Bereichsoperatoren in Milvus finden Sie unter <a href="/docs/de/basic-operators.md#Range-operators">Bereichsoperatoren</a>.</p>
<h2 id="Boolean-query" class="common-anchor-header">Boolesche Abfrage<button data-href="#Boolean-query" class="anchor-icon" translate="no">
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
    </button></h2><p>In Elasticsearch ist eine boolesche Abfrage eine Abfrage, die Dokumente findet, die booleschen Kombinationen anderer Abfragen entsprechen.</p>
<p>Das folgende Beispiel ist einem Beispiel aus der Elasticsearch-Dokumentation auf <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html">dieser Seite</a> entnommen. Die Abfrage gibt Benutzer mit <code translate="no">kimchy</code> in ihrem Namen mit einem <code translate="no">production</code> Tag zurück.</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: <span class="hljs-string">&quot;kimchy&quot;</span>
                }
            },
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;tags&quot;</span>: <span class="hljs-string">&quot;production&quot;</span>
                }
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>In Milvus können Sie das Gleiche wie folgt tun:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = 

res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;%kimchy%&quot; AND ARRAY_CONTAINS(tags, &quot;production&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;tags&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>Das obige Beispiel geht davon aus, dass Sie ein <code translate="no">user</code> Feld vom Typ <strong>VarChar</strong> und ein <code translate="no">tags</code> Feld vom Typ <strong>Array</strong> in der Zielsammlung haben. Die Abfrage gibt Benutzer mit <code translate="no">kimchy</code> in ihrem Namen mit einem <code translate="no">production</code> Tag zurück.</p>
<h2 id="Vector-queries" class="common-anchor-header">Vektor-Abfragen<button data-href="#Vector-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>In Elasticsearch sind Vektorabfragen spezialisierte Abfragen, die auf Vektorfeldern arbeiten, um eine effiziente semantische Suche durchzuführen.</p>
<h3 id="Knn-query" class="common-anchor-header">Knn-Abfrage</h3><p>Elasticsearch unterstützt sowohl approximative kNN-Abfragen als auch exakte, brutale kNN-Abfragen. Sie können die <em>k</em> nächstgelegenen Vektoren zu einem Abfragevektor auf die eine oder andere Weise finden, gemessen durch eine Ähnlichkeitsmetrik, wie folgt:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    index=<span class="hljs-string">&quot;my-image-index&quot;</span>,
    size=<span class="hljs-number">3</span>,
    query={
        <span class="hljs-string">&quot;knn&quot;</span>: {
            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;image-vector&quot;</span>,
            <span class="hljs-string">&quot;query_vector&quot;</span>: [
                -<span class="hljs-number">5</span>,
                <span class="hljs-number">9</span>,
                -<span class="hljs-number">12</span>
            ],
            <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">10</span>
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Als spezialisierte Vektordatenbank verwendet Milvus Index-Typen, um die Vektorsuche zu optimieren. Typischerweise wird bei hochdimensionalen Vektordaten die ANN-Suche (approximate nearest neighbor) bevorzugt. Während die Brute-Force-KNN-Suche mit dem FLAT-Indextyp präzise Ergebnisse liefert, ist sie sowohl zeit- als auch ressourcenaufwändig. Im Gegensatz dazu bietet die ANN-Suche mit AUTOINDEX oder anderen Indextypen ein ausgewogenes Verhältnis zwischen Geschwindigkeit und Genauigkeit und damit eine deutlich schnellere und ressourcenschonendere Leistung als kNN.</p>
<p>Eine ähnliche Äquivalenz zur obigen Vektorabfrage in Mlivus sieht folgendermaßen aus:</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    anns_field=<span class="hljs-string">&quot;image-vector&quot;</span>
    data=[[-<span class="hljs-number">5</span>, <span class="hljs-number">9</span>, -<span class="hljs-number">12</span>]],
    limit=<span class="hljs-number">10</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Das Elasticsearch-Beispiel finden Sie auf <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-knn-query.html">dieser Seite</a>. Für Details zur ANN-Suche in Milvus lesen Sie bitte <a href="/docs/de/single-vector-search.md">Basic ANN Search</a>.</p>
<h3 id="Reciprocal-Rank-Fusion" class="common-anchor-header">Reciprocal Rank Fusion</h3><p>Elasticsearch bietet Reciprocal Rank Fusion (RRF), um mehrere Ergebnismengen mit unterschiedlichen Relevanzindikatoren zu einer einzigen gerankten Ergebnismenge zu kombinieren.</p>
<p>Das folgende Beispiel demonstriert die Kombination einer traditionellen begriffsbasierten Suche mit einer k-nearest neighbors (kNN) Vektorsuche zur Verbesserung der Suchrelevanz:</p>
<pre><code translate="no" class="language-python">client.search(
    index=<span class="hljs-string">&quot;my_index&quot;</span>,
    size=<span class="hljs-number">10</span>,
    query={
        <span class="hljs-string">&quot;retriever&quot;</span>: {
            <span class="hljs-string">&quot;rrf&quot;</span>: {
                <span class="hljs-string">&quot;retrievers&quot;</span>: [
                    {
                        <span class="hljs-string">&quot;standard&quot;</span>: {
                            <span class="hljs-string">&quot;query&quot;</span>: {
                                <span class="hljs-string">&quot;term&quot;</span>: {
                                    <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;shoes&quot;</span>
                                }
                            }
                        }
                    },
                    {
                        <span class="hljs-string">&quot;knn&quot;</span>: {
                            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;vector&quot;</span>,
                            <span class="hljs-string">&quot;query_vector&quot;</span>: [<span class="hljs-number">1.25</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3.5</span>],  <span class="hljs-comment"># Example vector; replace with your actual query vector</span>
                            <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">50</span>,
                            <span class="hljs-string">&quot;num_candidates&quot;</span>: <span class="hljs-number">100</span>
                        }
                    }
                ],
                <span class="hljs-string">&quot;rank_window_size&quot;</span>: <span class="hljs-number">50</span>,
                <span class="hljs-string">&quot;rank_constant&quot;</span>: <span class="hljs-number">20</span>
            }
        }
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>In diesem Beispiel kombiniert die RRF die Ergebnisse von zwei Retrievern:</p>
<ul>
<li><p>Eine standardmäßige begriffsbasierte Suche nach Dokumenten, die den Begriff <code translate="no">&quot;shoes&quot;</code> im Feld <code translate="no">text</code> enthalten.</p></li>
<li><p>Eine kNN-Suche nach dem Feld <code translate="no">vector</code> unter Verwendung des bereitgestellten Abfragevektors.</p></li>
</ul>
<p>Jeder Retriever trägt bis zu 50 Top-Treffer bei, die von RRF neu eingestuft werden, und die 10 besten Ergebnisse werden zurückgegeben.</p>
<p>In Milvus können Sie eine ähnliche hybride Suche durchführen, indem Sie Suchen über mehrere Vektorfelder kombinieren, eine Reranking-Strategie anwenden und die Top-K-Ergebnisse aus der kombinierten Liste abrufen. Milvus unterstützt sowohl RRF- als auch gewichtete Reranker-Strategien. Weitere Einzelheiten finden Sie unter <a href="/docs/de/reranking.md">Reranking</a>.</p>
<p>Das folgende Beispiel ist eine nicht-strikte Äquivalenz des obigen Elasticsearch-Beispiels in Milvus.</p>
<pre><code translate="no" class="language-python">search_params_dense = {
    <span class="hljs-string">&quot;data&quot;</span>: [[<span class="hljs-number">1.25</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3.5</span>]],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}, 
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">100</span>
}

req_dense = ANNSearchRequest(**search_params_dense)

search_params_sparse = {
    <span class="hljs-string">&quot;data&quot;</span>: [<span class="hljs-string">&quot;shoes&quot;</span>],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>}
    }
}

req_sparse = ANNSearchRequest(**search_params_sparse)

res = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    reqs=[req_dense, req_sparse],
    reranker=RRFRanker(),
    limit=<span class="hljs-number">10</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Dieses Beispiel demonstriert eine hybride Suche in Milvus, die kombiniert:</p>
<ol>
<li><p><strong>Dichte Vektorsuche</strong>: Verwendung der Metrik des inneren Produkts (IP) mit <code translate="no">nprobe</code> auf 10 für die ungefähre Suche nach dem nächsten Nachbarn (ANN) auf dem <code translate="no">vector</code> Feld.</p></li>
<li><p><strong>Suche über dünne Vektoren</strong>: Verwendung der BM25 Ähnlichkeitsmetrik mit einem <code translate="no">drop_ratio_search</code> Parameter von 0,2 auf dem <code translate="no">text_sparse</code> Feld.</p></li>
</ol>
<p>Die Ergebnisse dieser Suchvorgänge werden getrennt ausgeführt, kombiniert und mit Hilfe des RRF-Rankers (Reciprocal Rank Fusion) neu eingestuft. Die hybride Suche gibt die 10 besten Entitäten aus der neu bewerteten Liste zurück.</p>
<p>Im Gegensatz zum RRF-Ranking von Elasticsearch, das die Ergebnisse von standardmäßigen textbasierten Abfragen und kNN-Suchen zusammenführt, kombiniert Milvus die Ergebnisse von Sparse- und Dense-Vector-Suchen und bietet damit eine einzigartige hybride Suchfunktion, die für multimodale Daten optimiert ist.</p>
<h2 id="Recap" class="common-anchor-header">Rekapitulation<button data-href="#Recap" class="anchor-icon" translate="no">
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
    </button></h2><p>In diesem Artikel haben wir die Konvertierung typischer Elasticsearch-Abfragen in ihre Milvus-Äquivalente behandelt, einschließlich Abfragen auf Termebene, boolesche Abfragen, Volltextabfragen und Vektorabfragen. Wenn Sie weitere Fragen zur Konvertierung anderer Elasticsearch-Abfragen haben, können Sie sich gerne an uns wenden.</p>
