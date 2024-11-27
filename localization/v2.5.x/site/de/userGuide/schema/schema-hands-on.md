---
id: schema-hands-on.md
title: Schema-Entwurf Hands-On
summary: >-
  Milvus unterstützt die Definition des Datenmodells durch ein Sammlungsschema.
  Eine Sammlung organisiert unstrukturierte Daten wie Text und Bilder, zusammen
  mit ihren Vektordarstellungen, einschließlich dichter und spärlicher Vektoren
  in verschiedenen Genauigkeiten, die für die semantische Suche verwendet
  werden. Zusätzlich unterstützt Milvus die Speicherung und Filterung von
  Nicht-Vektor-Datentypen, die als "Skalar" bezeichnet werden. Zu den
  Skalar-Typen gehören BOOL, INT8/16/32/64, FLOAT/DOUBLE, VARCHAR, JSON und
  Array.
---
<h1 id="Schema-Design-Hands-On​" class="common-anchor-header">Schema-Entwurf Hands-On<button data-href="#Schema-Design-Hands-On​" class="anchor-icon" translate="no">
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
    </button></h1><p>Information Retrieval (IR)-Systeme, auch bekannt als Suche, sind für verschiedene KI-Anwendungen wie Retrieval-augmented Generation (RAG), Bildsuche und Produktempfehlungen unerlässlich. Der erste Schritt bei der Entwicklung eines IR-Systems ist das Entwerfen des Datenmodells. Dazu gehört die Analyse der Geschäftsanforderungen, die Festlegung, wie Informationen organisiert werden sollen, und die Indizierung der Daten, um sie semantisch durchsuchbar zu machen.</p>
<p>Milvus unterstützt die Definition des Datenmodells durch ein Sammlungsschema. Eine Sammlung organisiert unstrukturierte Daten wie Text und Bilder zusammen mit ihren Vektordarstellungen, einschließlich dichter und spärlicher Vektoren in unterschiedlicher Präzision, die für die semantische Suche verwendet werden. Zusätzlich unterstützt Milvus die Speicherung und Filterung von Nicht-Vektor-Datentypen, die als &quot;Skalar&quot; bezeichnet werden. Zu den Skalar-Typen gehören BOOL, INT8/16/32/64, FLOAT/DOUBLE, VARCHAR, JSON und Array.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/schema-hands-on.png" alt="Example data schema designed for searching news article" class="doc-image" id="example-data-schema-designed-for-searching-news-article" />
   </span> <span class="img-wrapper"> <span>Beispiel eines Datenschemas für die Suche nach Nachrichtenartikeln</span> </span></p>
<p>Der Entwurf eines Datenmodells für ein Suchsystem beinhaltet die Analyse der Geschäftsanforderungen und die Abstraktion der Informationen in ein schemaexprimiertes Datenmodell. Um beispielsweise einen Text zu durchsuchen, muss er &quot;indiziert&quot; werden, indem die wörtliche Zeichenkette durch &quot;Einbettung&quot; in einen Vektor umgewandelt wird, was die Vektorsuche ermöglicht. Über diese Grundvoraussetzung hinaus kann es erforderlich sein, weitere Eigenschaften wie den Zeitstempel der Veröffentlichung und den Autor zu speichern. Mit diesen Metadaten kann die semantische Suche durch Filterung verfeinert werden, so dass nur Texte gefunden werden, die nach einem bestimmten Datum oder von einem bestimmten Autor veröffentlicht wurden. Möglicherweise müssen sie auch zusammen mit dem Haupttext abgerufen werden, damit das Suchergebnis in der Anwendung angezeigt werden kann. Um diese Textteile zu organisieren, sollte jedem ein eindeutiger Bezeichner zugewiesen werden, ausgedrückt als Ganzzahl oder Zeichenkette. Diese Elemente sind für eine ausgefeilte Suchlogik unerlässlich.</p>
<p>Ein gut durchdachtes Schema ist wichtig, da es das Datenmodell abstrahiert und entscheidet, ob die Geschäftsziele durch die Suche erreicht werden können. Da außerdem jede in die Sammlung eingefügte Datenzeile dem Schema entsprechen muss, trägt es wesentlich zur Wahrung der Datenkonsistenz und langfristigen Qualität bei. Aus technischer Sicht führt ein gut definiertes Schema zu einer gut organisierten Speicherung von Spaltendaten und einer sauberen Indexstruktur, was die Suchleistung steigern kann.</p>
<h1 id="An-Example-News-Search​" class="common-anchor-header">Ein Beispiel: Nachrichtensuche<button data-href="#An-Example-News-Search​" class="anchor-icon" translate="no">
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
    </button></h1><p>Nehmen wir an, wir wollen eine Suche für eine Nachrichten-Website entwickeln und haben einen Korpus von Nachrichten mit Text, Miniaturbildern und anderen Metadaten. Zunächst müssen wir analysieren, wie wir die Daten nutzen wollen, um die Geschäftsanforderungen der Suche zu unterstützen. Stellen Sie sich vor, die Anforderung besteht darin, die Nachrichten auf der Grundlage des Miniaturbildes und der Zusammenfassung des Inhalts abzurufen und die Metadaten wie Autoreninfo und Veröffentlichungszeitpunkt als Kriterien zum Filtern des Suchergebnisses zu verwenden. Diese Anforderungen lassen sich weiter aufschlüsseln.</p>
<ul>
<li><p>Um Bilder über Text zu suchen, können wir Bilder über ein multimodales Einbettungsmodell in Vektoren einbetten, die Text- und Bilddaten im selben latenten Raum abbilden können.</p></li>
<li><p>Der zusammenfassende Text eines Artikels wird über ein Text-Einbettungsmodell in Vektoren eingebettet.</p></li>
<li><p>Um nach dem Veröffentlichungszeitpunkt zu filtern, werden die Daten als skalares Feld gespeichert, und für eine effiziente Filterung ist ein Index für das skalare Feld erforderlich. Andere, komplexere Datenstrukturen wie JSON können in einem Skalarfeld gespeichert werden, und eine gefilterte Suche wird nach deren Inhalt durchgeführt (die Indizierung von JSON ist ein zukünftiges Feature).</p></li>
<li><p>Um die Bytes der Bildminiaturen abzurufen und auf der Suchergebnisseite darzustellen, wird auch die Bildurl gespeichert. Ähnliches gilt für den Zusammenfassungstext und den Titel. (Alternativ könnten wir die Rohdaten der Text- und Bilddateien als skalare Felder speichern, falls erforderlich).</p></li>
<li><p>Zur Verbesserung der Suchergebnisse für den Zusammenfassungstext entwickeln wir einen hybriden Suchansatz. Für einen Suchpfad verwenden wir ein reguläres Einbettungsmodell, um einen dichten Vektor aus dem Text zu generieren, wie z. B. das Modell von OpenAI <code translate="no">text-embedding-3-large</code> oder das Open-Source-Modell <code translate="no">bge-large-en-v1.5</code>. Diese Modelle sind gut geeignet, um die Gesamtsemantik des Textes darzustellen. Der andere Weg ist die Verwendung von spärlichen Einbettungsmodellen wie BM25 oder SPLADE, um einen spärlichen Vektor zu generieren, der der Volltextsuche ähnelt und gut geeignet ist, die Details und einzelnen Konzepte im Text zu erfassen. Milvus unterstützt dank seiner Multi-Vektor-Funktion die Verwendung beider in derselben Datensammlung. Die Suche in mehreren Vektoren kann in einer einzigen <code translate="no">hybrid_search()</code> Operation durchgeführt werden.</p></li>
<li><p>Schließlich benötigen wir auch ein ID-Feld zur Identifizierung jeder einzelnen Nachrichtenseite, die in der Milvus-Terminologie formell als "Entität" bezeichnet wird. Dieses Feld wird als Primärschlüssel (oder kurz "pk") verwendet.</p></li>
</ul>
<table data-block-token="EOxnd1GqhoODuWx4UyucOMahn0e"><thead><tr><th data-block-token="P2g0djnY5oRKT7xw7aSceiaQnRb" colspan="1" rowspan="1"><p data-block-token="TrIsdjxzooLqxUxiqkTcfN5pnHd">Feldname</p>
</th><th data-block-token="KVq4dDr4BovOHSxtWd5cZBnnnn5" colspan="1" rowspan="1"><p data-block-token="D9uYdwp8ToHqXmxqueVcBAi2n6b">article_id (Primärschlüssel)</p>
</th><th data-block-token="O6jTdN4rBouwtQxFNgpcM7GFnyp" colspan="1" rowspan="1"><p data-block-token="IJuldjRIeoNHRgx0ix5c2eBSn6f">Titel</p>
</th><th data-block-token="V4EKdYzLqoENTTxXuOwcVTIGnLg" colspan="1" rowspan="1"><p data-block-token="Tldydg7BboZeSUxiaTfcUnsfnqd">Autor_Info</p>
</th><th data-block-token="GHF6dqGRVoQ6Kpxv9tUcijFXnVc" colspan="1" rowspan="1"><p data-block-token="Ih0jdg4yToRJOkxyriwcKJ39nVd">veröffentlichen_ts</p>
</th><th data-block-token="Ui3ldA2BwovU8LxMHcIcrmVvnLg" colspan="1" rowspan="1"><p data-block-token="PJGJdX1efoo647xvgCDcuhkznye">bild_url</p>
</th><th data-block-token="VCskd6ySvocz8IxF5CVcpmF5n0b" colspan="1" rowspan="1"><p data-block-token="Cx7idKjgYoctpYxsnskc7OD0nxb">bild_vektor</p>
</th><th data-block-token="WSbhdTqglocn3KxpvBscFOh2n6d" colspan="1" rowspan="1"><p data-block-token="Q16ods013oZUOQxk9vicK0JGn2e">Zusammenfassung</p>
</th><th data-block-token="T5HAdXwado1qJpxCpf9cwDjmnhe" colspan="1" rowspan="1"><p data-block-token="ZG3odG5k2oMqFSxM8TFcE8kZnCh">zusammenfassung_dichter_vektor</p>
</th><th data-block-token="MWAHdYgIvogpIfxsRnscz5WWnOe" colspan="1" rowspan="1"><p data-block-token="MeU1dGziaodmTkxc5q9cvYR9ndd">zusammenfassung_sparse_vektor</p>
</th></tr></thead><tbody><tr><td data-block-token="V1x7d7y15oxxNSxpvRJcoW7VnWh" colspan="1" rowspan="1"><p data-block-token="X9old4LgooPgrexElIBc2JgNnac">Typ</p>
</td><td data-block-token="EWlPdiRtBoqrOYxLoWDcnPUQn3f" colspan="1" rowspan="1"><p data-block-token="TtABd1mq0o2ShTxtXfncI8i9n8g">INT64</p>
</td><td data-block-token="ZICad5qEYohcTvxo477cZIWInCh" colspan="1" rowspan="1"><p data-block-token="CBHWdVhLKo2wn1xR3Pocf43NnRs">VARCHAR</p>
</td><td data-block-token="VTwJdpuQboqurJxXbQUctG8fnNc" colspan="1" rowspan="1"><p data-block-token="OI1ldgzbAoEIOUx7boRcooR0nvb">JSON</p>
</td><td data-block-token="UVWKdd69Mo8hyyxOqLLcZn7kncc" colspan="1" rowspan="1"><p data-block-token="QJUZdxgzEora0PxAxf8c1axknbp">INT32</p>
</td><td data-block-token="Wf8AdfYj1on0OkxjHkocPiqInYe" colspan="1" rowspan="1"><p data-block-token="KE0QdVg3doF05Exq3fmccqOcnvc">VARCHAR</p>
</td><td data-block-token="JVHgd9P9aoSl9mxqoFfcM7ownXz" colspan="1" rowspan="1"><p data-block-token="TwotdcMshoE2TSxGIauclTZjnLh">FLOAT_VECTOR</p>
</td><td data-block-token="MUwwdyV4co3V2QxOxc1cMuD9nbc" colspan="1" rowspan="1"><p data-block-token="RpfxdP0AHoW0xhx8sfBclJvtnyc">VARCHAR</p>
</td><td data-block-token="P4bqdeIGOoV67FxhYmtclfBpn1d" colspan="1" rowspan="1"><p data-block-token="RyztdWGXzoP4IBxHd8Pcu0q2nbe">FLOAT_VECTOR</p>
</td><td data-block-token="AtJldXTWUoT5FPxY6EncUqWsnrc" colspan="1" rowspan="1"><p data-block-token="FJMJdqKeFodc73xGlnpcYgJanWg">SPARSE_FLOAT_VECTOR</p>
</td></tr><tr><td data-block-token="ZAKYdJAv6oj5IxxYUaUcLFOEnkh" colspan="1" rowspan="1"><p data-block-token="Frr0dWnzWo5UFDxLfqaceqvSnmg">Benötigter Index</p>
</td><td data-block-token="ONHadATa9ojiwAxEwUdcaJpOnbb" colspan="1" rowspan="1"><p data-block-token="ZGT8dgMGbo8r22xpFztcycKDn9c">N</p>
</td><td data-block-token="E3Hod6CkXozMt4x0xF6cPkdin4e" colspan="1" rowspan="1"><p data-block-token="Ha0PdI0byocer9xXJGac8QYdnPg">N</p>
</td><td data-block-token="NaJ5dcptooRPe8xk9VTcx6Amnld" colspan="1" rowspan="1"><p data-block-token="U57edD6zqoPY7LxQjPDcnNDVnxc">N (Unterstützung in Kürze)</p>
</td><td data-block-token="MqejdtkWboMHmZxWWCAcK7X0n1e" colspan="1" rowspan="1"><p data-block-token="NeNJdcEvloQ4E7xN9JeczCORnQX">Y</p>
</td><td data-block-token="VKy3driI9owHhCx1l4Iczj8Hnkb" colspan="1" rowspan="1"><p data-block-token="QRWQdK0J3oWYc0x8xT6c4Me5nXb">N</p>
</td><td data-block-token="EZR0dRNXpotMtdxAKG9cHj8zn2c" colspan="1" rowspan="1"><p data-block-token="LTyRduM2FoGmkVxa1HgceBFbnKf">Y</p>
</td><td data-block-token="W3MydyW7bod6UaxdNURcqTnBnFb" colspan="1" rowspan="1"><p data-block-token="EwbCdu2ZZop4zJxbyhZcR2HunUh">N</p>
</td><td data-block-token="XQdvd35mVov5cUxstzpcipmlni8" colspan="1" rowspan="1"><p data-block-token="SJoudzWmiouT20xXCCpcQR1Mnsz">Y</p>
</td><td data-block-token="MXntdRmaUo91QoxGeNgc9goanee" colspan="1" rowspan="1"><p data-block-token="Sxfzdk7VoocU6kxAV63cI3ObnTe">Y</p>
</td></tr></tbody></table>
<h1 id="How-to-Implement-the-Example-Schema​" class="common-anchor-header">So implementieren Sie das Beispielschema<button data-href="#How-to-Implement-the-Example-Schema​" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Create-Schema​" class="common-anchor-header">Schema erstellen<button data-href="#Create-Schema​" class="anchor-icon" translate="no">
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
    </button></h2><p>Zunächst erstellen wir eine Milvus-Client-Instanz, die zur Verbindung mit dem Milvus-Server und zur Verwaltung von Sammlungen und Daten verwendet werden kann. </p>
<p>Um ein Schema zu erstellen, verwenden wir <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a> um ein Schema-Objekt zu erstellen und <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a> um dem Schema Felder hinzuzufügen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
collection_name = <span class="hljs-string">&quot;my_collection&quot;</span>​
​
<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)​</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)​
​
schema = MilvusClient.create_schema(​
    auto_id=<span class="hljs-literal">False</span>,​
)​
​
schema.add_field(field_name=<span class="hljs-string">&quot;article_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article id&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">200</span>, description=<span class="hljs-string">&quot;article title&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;author_info&quot;</span>, datatype=DataType.JSON, description=<span class="hljs-string">&quot;author information&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>, datatype=DataType.INT32, description=<span class="hljs-string">&quot;publish timestamp&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;image_url&quot;</span>, datatype=DataType.VARCHAR,  max_length=<span class="hljs-number">500</span>, description=<span class="hljs-string">&quot;image URL&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;image_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;image vector&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;summary&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, description=<span class="hljs-string">&quot;article summary&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;summary dense vector&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;summary sparse vector&quot;</span>)​

<button class="copy-code-btn"></button></code></pre>
<p>Vielleicht fällt Ihnen das Argument <code translate="no">uri</code> in <code translate="no">MilvusClient</code> auf, das für die Verbindung mit dem Milvus-Server verwendet wird. Sie können die Argumente wie folgt setzen.</p>
<ul>
<li><p>Wenn Sie nur eine lokale Vektordatenbank für kleine Datenmengen oder Prototypen benötigen, ist die Angabe der Uri als lokale Datei, z. B.<code translate="no">./milvus.db</code>, die bequemste Methode, da <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> automatisch alle Daten in dieser Datei speichert.</p></li>
<li><p>Wenn Sie große Datenmengen haben, z. B. mehr als eine Million Vektoren, können Sie einen leistungsfähigeren Milvus-Server auf <a href="https://milvus.io/docs/quickstart.md">Docker oder Kubernetes</a> einrichten. Bei dieser Einrichtung verwenden Sie bitte die Serveradresse und den Port als Uri, z. B.<code translate="no">http://localhost:19530</code>. Wenn Sie die Authentifizierungsfunktion auf Milvus aktivieren, verwenden Sie "&lt;Ihr_Benutzername&gt;:&lt;Ihr_Passwort&gt;" als Token, andernfalls setzen Sie das Token nicht.</p></li>
<li><p>Wenn Sie <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, den vollständig verwalteten Cloud-Dienst für Milvus, verwenden, passen Sie die <code translate="no">uri</code> und <code translate="no">token</code> an, die dem <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">öffentlichen Endpunkt und dem API-Schlüssel</a> in Zilliz Cloud entsprechen.</p></li>
</ul>
<p>Was <code translate="no">auto_id</code> in <code translate="no">MilvusClient.create_schema</code> betrifft, so ist AutoID ein Attribut des Primärfeldes, das bestimmt, ob die automatische Erhöhung für das Primärfeld aktiviert werden soll.  Da wir das Feld<code translate="no">article_id</code> als Primärschlüssel festlegen und die Artikel-ID manuell hinzufügen wollen, setzen wir <code translate="no">auto_id</code> auf False, um diese Funktion zu deaktivieren.</p>
<p>Nachdem wir alle Felder zum Schemaobjekt hinzugefügt haben, stimmt unser Schemaobjekt mit den Einträgen in der obigen Tabelle überein.</p>
<h2 id="Define-Index​" class="common-anchor-header">Definieren des Index<button data-href="#Define-Index​" class="anchor-icon" translate="no">
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
    </button></h2><p>Nach der Definition des Schemas mit verschiedenen Feldern, einschließlich Metadaten und Vektorfeldern für Bild- und Zusammenfassungsdaten, besteht der nächste Schritt in der Vorbereitung der Indexparameter. Die Indexierung ist entscheidend für die Optimierung der Suche und des Abrufs von Vektoren und gewährleistet eine effiziente Abfrageleistung. Im folgenden Abschnitt werden wir die Indexparameter für die angegebenen Vektor- und Skalarfelder in der Sammlung definieren.</p>
<pre><code translate="no" class="language-python">index_params = client.<span class="hljs-title function_">prepare_index_params</span>()​
​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
)​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
)​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>,​
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
)​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>,​
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<p>Sobald die Indexparameter eingerichtet und angewendet sind, ist Milvus für die Bearbeitung komplexer Abfragen auf Vektor- und Skalardaten optimiert. Diese Indexierung verbessert die Leistung und Genauigkeit von Ähnlichkeitssuchen innerhalb der Sammlung und ermöglicht ein effizientes Abrufen von Artikeln auf der Grundlage von Bildvektoren und zusammenfassenden Vektoren. Durch die Nutzung des <a href="https://milvus.io/docs/glossary.md#Auto-Index"><code translate="no">AUTOINDEX</code></a> für dichte Vektoren, der <a href="https://milvus.io/docs/sparse_vector.md#Index-the-collection"><code translate="no">SPARSE_INVERTED_INDEX</code></a> für spärliche Vektoren und die <a href="https://milvus.io/docs/scalar_index.md#Inverted-indexing"><code translate="no">INVERTED_INDEX</code></a> für Skalare kann Milvus schnell die relevantesten Ergebnisse identifizieren und zurückgeben, was die allgemeine Benutzererfahrung und die Effektivität des Datenabrufs erheblich verbessert.</p>
<p>Es gibt viele Arten von Indizes und Metriken. Weitere Informationen dazu finden Sie unter <a href="https://milvus.io/docs/overview.md#Index-types">Milvus Index-Typ</a> und <a href="https://milvus.io/docs/glossary.md#Metric-type">Milvus Metrik-Typ</a>.</p>
<h2 id="Create-Collection​" class="common-anchor-header">Sammlung erstellen<button data-href="#Create-Collection​" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn das Schema und die Indizes definiert sind, erstellen wir eine "Sammlung" mit diesen Parametern. Eine Sammlung ist für Milvus wie eine Tabelle in einer relationalen DB.</p>
<pre><code translate="no" class="language-python">client.create_collection(​
    collection_name=collection_name,​
    schema=schema,​
    index_params=index_params,​
)​

<button class="copy-code-btn"></button></code></pre>
<p>Wir können überprüfen, ob die Sammlung erfolgreich erstellt wurde, indem wir die Sammlung beschreiben.</p>
<pre><code translate="no" class="language-python">collection_desc = client.describe_collection(​
    collection_name=collection_name​
)​
<span class="hljs-built_in">print</span>(collection_desc)​

<button class="copy-code-btn"></button></code></pre>
<h1 id="Other-Considerations​" class="common-anchor-header">Andere Überlegungen<button data-href="#Other-Considerations​" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Loading-Index​" class="common-anchor-header">Index laden<button data-href="#Loading-Index​" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn Sie eine Sammlung in Milvus erstellen, können Sie wählen, ob Sie den Index sofort laden wollen oder ob Sie dies bis nach der Massenaufnahme einiger Daten aufschieben wollen. Normalerweise müssen Sie sich nicht explizit dafür entscheiden, da die obigen Beispiele zeigen, dass der Index automatisch für alle eingelesenen Daten direkt nach der Erstellung der Sammlung erstellt wird. Dies ermöglicht eine sofortige Durchsuchbarkeit der aufgenommenen Daten. Wenn Sie jedoch nach der Sammlungserstellung eine große Menge an Daten einfügen und erst zu einem bestimmten Zeitpunkt nach diesen Daten suchen müssen, können Sie die Indexerstellung aufschieben, indem Sie index_params bei der Sammlungserstellung weglassen und den Index durch expliziten Aufruf von load erstellen, nachdem Sie alle Daten eingelesen haben. Diese Methode ist effizienter für den Aufbau des Index für eine große Sammlung, aber es können keine Suchvorgänge durchgeführt werden, bis load() aufgerufen wird.</p>
<h2 id="How-to-Define-Data-Model-For-Multi-tenancy​" class="common-anchor-header">Wie definiert man ein Datenmodell für mehrere Mandanten?<button data-href="#How-to-Define-Data-Model-For-Multi-tenancy​" class="anchor-icon" translate="no">
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
    </button></h2><p>Das Konzept mehrerer Mandanten wird häufig in Szenarien verwendet, in denen eine einzige Softwareanwendung oder ein einziger Dienst mehrere unabhängige Benutzer oder Organisationen bedienen muss, die jeweils über eine eigene isolierte Umgebung verfügen. Dies ist häufig bei Cloud Computing, SaaS-Anwendungen (Software as a Service) und Datenbanksystemen der Fall. Ein Cloud-Speicherdienst kann beispielsweise die Mandantenfähigkeit nutzen, um verschiedenen Unternehmen die Möglichkeit zu geben, ihre Daten getrennt zu speichern und zu verwalten, während sie dieselbe zugrunde liegende Infrastruktur nutzen. Dieser Ansatz maximiert die Ressourcennutzung und Effizienz und gewährleistet gleichzeitig die Datensicherheit und den Datenschutz für jeden Mieter.</p>
<p>Die einfachste Möglichkeit zur Unterscheidung von Mandanten besteht darin, ihre Daten und Ressourcen voneinander zu isolieren. Jeder Tenant hat entweder exklusiven Zugriff auf bestimmte Ressourcen oder teilt Ressourcen mit anderen, um Milvus-Entitäten wie Datenbanken, Sammlungen und Partitionen zu verwalten. Es gibt spezifische Methoden, die auf diese Entitäten abgestimmt sind, um Milvus Multi-Tenancy zu implementieren. Weitere Informationen finden Sie auf der <a href="https://milvus.io/docs/multi_tenancy.md#Multi-tenancy-strategies">Milvus-Multi-Tenancy-Seite</a>.</p>
