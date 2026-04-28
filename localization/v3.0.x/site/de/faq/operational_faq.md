---
id: operational_faq.md
summary: Hier finden Sie Antworten auf häufig gestellte Fragen zum Betrieb in Milvus.
title: Häufig gestellte Fragen zum Betrieb
---
<h1 id="Operational-FAQ" class="common-anchor-header">Häufig gestellte Fragen zum Betrieb<button data-href="#Operational-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="What-is-a-QueryNode-delegator-and-what-are-its-responsibilities" class="common-anchor-header">Was ist ein QueryNode-Delegator, und was sind seine Aufgaben?</h4><p>Wenn eine Sammlung geladen wird, abonniert ein QueryNode DML-Kanäle für Einfüge- und Löschnachrichten, die aus der Nachrichtenwarteschlange kommen. Der QueryNode, der diese Kanäle abonniert, der so genannte Delegator, ist verantwortlich für:</p>
<ul>
<li>Verwaltung zunehmender Segmente, die aufgrund laufender Einfügungen zusätzlichen Speicher benötigen.</li>
<li>Empfang von Löschnachrichten und deren Weitergabe an andere QueryNodes, die die entsprechenden Segmente halten.</li>
</ul>
<h4 id="How-to-identify-delegator-nodes-for-a-collection" class="common-anchor-header">Wie kann man Delegator-Knoten für eine Sammlung identifizieren?</h4><p>Verwenden Sie Birdwatcher.</p>
<p>Installieren Sie Birdwatcher wie <a href="https://milvus.io/docs/birdwatcher_install_guides.md#Install-Birdwatcher">folgt</a> und führen Sie dann den folgenden Befehl aus:</p>
<pre><code translate="no" class="language-shell">./birdwatcher
<span class="hljs-meta prompt_"># </span><span class="language-bash">Find delegator nodes <span class="hljs-keyword">for</span> your collection</span>
Milvus(my-release) &gt; show segment-loaded-grpc --collection &lt;your-collectionID&gt;

ServerID 2
Channel by-dev-rootcoord-dml_2, collection: 430123456789, version 1
Leader view for channel: by-dev-rootcoord-dml_2
Growing segments count: 1, ids: [430123456789_4]
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Map server ID to pod IP</span>
Milvus(my-release) &gt; show session

Node(s) querynode
        ID: 1        Version: 2.4.0        Address: 10.0.0.4:19530
        ID: 2        Version: 2.4.0        Address: 10.0.0.5:19530
        ID: 3        Version: 2.4.0        Address: 10.0.0.6:19530
<button class="copy-code-btn"></button></code></pre>
<h4 id="What-parameters-can-be-adjusted-if-query-node-memory-usage-is-unbalanced" class="common-anchor-header">Welche Parameter können angepasst werden, wenn der Abfrageknoten-Speicher unausgeglichen ist?</h4><p>Manchmal variiert der Abfrageknotenspeicher, weil einige als Delegatoren agieren und mehr RAM benötigen. Wenn der Speicher eines Delegators hoch ist, passen Sie queryCoord.delegatorMemoryOverloadFactor an, um versiegelte Segmente auf andere Knoten auszulagern und die RAM-Nutzung zu reduzieren.</p>
<ul>
<li>Der Standardwert ist 0.1.</li>
<li>Eine Erhöhung dieses Wertes (z. B. auf 0,3 oder höher) führt dazu, dass das System mehr versiegelte Segmente von dem überlasteten Delegator auf andere QueryNodes auslagert, was zu einem Ausgleich der Speichernutzung beiträgt. Sie können auch versuchen, den Wert auf 1 zu erhöhen, was bedeutet, dass keine versiegelten Segmente in den Delegator-Knoten geladen werden.</li>
</ul>
<p>Wenn Sie den Cluster nicht neu starten wollen, können Sie die Konfiguration von milvus mit birdwatcher ändern:</p>
<pre><code translate="no">.<span class="hljs-operator">/</span>birdwatcher
Offline <span class="hljs-operator">&gt;</span> <span class="hljs-keyword">connect</span> <span class="hljs-comment">--etcd &lt;your-etcd-ip&gt;:2379 --auto</span>

# Change delegatorMemoryOverloadFactor <span class="hljs-keyword">to</span> <span class="hljs-number">0.3</span> <span class="hljs-keyword">without</span> restart, <span class="hljs-keyword">default</span> <span class="hljs-keyword">value</span> <span class="hljs-keyword">is</span> <span class="hljs-number">0.1</span>
<span class="hljs-keyword">set</span> config<span class="hljs-operator">-</span>etcd <span class="hljs-comment">--key queryCoord.delegatorMemoryOverloadFactor --value 0.3</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="How-to-set-shardnum-for-a-collection" class="common-anchor-header">Wie setzt man shard_num für eine Sammlung?</h4><p>Als Best Practice wird für eine Sammlung mit Vektoren der Dimension 768 empfohlen, mindestens 1 Shard pro ~100 Millionen Vektoren zu verwenden. Für häufige Schreibvorgänge sollten Sie 4 Shards pro ~100 Millionen Vektoren verwenden.</p>
<p>Wenn Sie z. B. 100 Millionen Vektoren haben, verwenden Sie 1-4 Scherben. Wenn Sie 500 Millionen Vektoren haben, verwenden Sie 5-10 Scherben.</p>
<h4 id="What-if-I-failed-to-pull-the-Milvus-Docker-image-from-Docker-Hub" class="common-anchor-header">Was passiert, wenn ich das Milvus-Docker-Image nicht von Docker Hub abrufen kann?</h4><p>Wenn Sie das Milvus-Docker-Abbild nicht von Docker Hub abrufen konnten, versuchen Sie, andere Registry-Mirrors hinzuzufügen.</p>
<p>Benutzer aus Festlandchina können die URL "https://registry.docker-cn.com" zum Array registry-mirrors in <strong>/etc.docker/daemon.json</strong> hinzufügen.</p>
<pre><code translate="no"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;registry-mirrors&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;https://registry.docker-cn.com&quot;</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Is-Docker-the-only-way-to-install-and-run-Milvus" class="common-anchor-header">Ist Docker die einzige Möglichkeit, Milvus zu installieren und auszuführen?</h4><p>Docker ist ein effizienter Weg, Milvus zu installieren, aber nicht der einzige Weg. Sie können Milvus auch aus dem Quellcode bereitstellen. Dies erfordert Ubuntu (18.04 oder höher) oder CentOS (7 oder höher). Weitere Informationen finden Sie unter <a href="https://github.com/milvus-io/milvus#build-milvus-from-source-code">Erstellen von Milvus aus dem Quellcode</a>.</p>
<h4 id="What-are-the-main-factors-affecting-recall" class="common-anchor-header">Welches sind die Hauptfaktoren, die den Abruf beeinflussen?</h4><p>Der Abruf wird hauptsächlich durch den Indextyp und die Suchparameter beeinflusst.</p>
<p>Bei FLAT-Indizes führt Milvus einen vollständigen Scan innerhalb einer Sammlung durch, mit einer 100%igen Rückgabe.</p>
<p>Bei IVF-Indizes bestimmt der Parameter nprobe den Umfang einer Suche innerhalb der Sammlung. Eine Erhöhung von nprobe erhöht den Anteil der durchsuchten Vektoren und den Rücklauf, verschlechtert aber die Abfrageleistung.</p>
<p>Beim HNSW-Index bestimmt der Parameter ef die Breite der Graphensuche. Eine Erhöhung von ef erhöht die Anzahl der gesuchten Punkte im Graphen und die Wiederauffindbarkeit, verschlechtert jedoch die Abfrageleistung.</p>
<p>Weitere Informationen finden Sie unter <a href="https://www.zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">Vektorindizierung</a>.</p>
<h4 id="Why-did-my-changes-to-the-configuration-files-not-take-effect" class="common-anchor-header">Warum sind meine Änderungen an den Konfigurationsdateien nicht wirksam geworden?</h4><p>Milvus unterstützt keine Änderungen an den Konfigurationsdateien während der Laufzeit. Sie müssen Milvus Docker neu starten, damit Änderungen an den Konfigurationsdateien wirksam werden.</p>
<h4 id="How-do-I-know-if-Milvus-has-started-successfully" class="common-anchor-header">Woher weiß ich, ob Milvus erfolgreich gestartet wurde?</h4><p>Wenn Milvus unter Verwendung von Docker Compose gestartet wurde, führen Sie <code translate="no">docker ps</code> aus, um zu beobachten, wie viele Docker-Container ausgeführt werden, und um zu überprüfen, ob die Milvus-Dienste korrekt gestartet wurden.</p>
<p>Bei Milvus standalone sollten Sie mindestens drei laufende Docker-Container beobachten können, von denen einer der Milvus-Dienst und die beiden anderen der etcd-Verwaltungs- und Speicherdienst sind. Weitere Informationen finden Sie unter <a href="/docs/de/install_standalone-docker.md">Installieren von Milvus Standalone</a>.</p>
<h4 id="Why-is-the-time-in-the-log-files-different-from-the-system-time" class="common-anchor-header">Warum weicht die Zeit in den Protokolldateien von der Systemzeit ab?</h4><p>Der Zeitunterschied ist in der Regel darauf zurückzuführen, dass der Host-Rechner nicht die Coordinated Universal Time (UTC) verwendet.</p>
<p>Die Protokolldateien im Docker-Image verwenden standardmäßig die UTC-Zeit. Wenn Ihr Host-Rechner nicht UTC verwendet, kann dieses Problem auftreten.</p>
<h4 id="How-do-I-know-if-my-CPU-supports-Milvus" class="common-anchor-header">Woher weiß ich, ob meine CPU Milvus unterstützt?</h4><p>Die Rechenoperationen von Milvus hängen von der Unterstützung der CPU für den SIMD (Single Instruction, Multiple Data) Erweiterungsbefehlssatz ab. Ob Ihre CPU den SIMD-Erweiterungsbefehlssatz unterstützt, ist entscheidend für die Indexerstellung und die Vektorähnlichkeitssuche in Milvus. Stellen Sie sicher, dass Ihre CPU mindestens einen der folgenden SIMD-Befehlssätze unterstützt:</p>
<ul>
<li>SSE4.2</li>
<li>AVX</li>
<li>AVX2</li>
<li>AVX512</li>
</ul>
<p>Führen Sie den Befehl lscpu aus, um zu überprüfen, ob Ihre CPU die oben genannten SIMD-Befehlssätze unterstützt:</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>lscpu |<span class="hljs-params"> grep -e sse4_2 -e avx -e avx2 -e avx512
</span><button class="copy-code-btn"></button></code></pre>
<h4 id="Why-does-Milvus-return-illegal-instruction-during-startup" class="common-anchor-header">Warum gibt Milvus während des Starts <code translate="no">illegal instruction</code> zurück?</h4><p>Milvus setzt voraus, dass Ihre CPU einen SIMD-Befehlssatz unterstützt: SSE4.2, AVX, AVX2, oder AVX512. Die CPU muss mindestens einen dieser Befehle unterstützen, um sicherzustellen, dass Milvus normal funktioniert. Ein <code translate="no">illegal instruction</code> Fehler, der während des Starts zurückgegeben wird, deutet darauf hin, dass Ihre CPU keinen der vier oben genannten Befehlssätze unterstützt.</p>
<p>Siehe <a href="/docs/de/prerequisite-docker.md">CPU-Unterstützung für SIMD-Befehlssatz</a>.</p>
<h4 id="Can-I-install-Milvus-on-Windows" class="common-anchor-header">Kann ich Milvus unter Windows installieren?</h4><p>Ja. Sie können Milvus unter Windows entweder durch Kompilieren aus dem Quellcode oder aus einem Binärpaket installieren.</p>
<p>Siehe <a href="https://milvus.io/blog/2021-11-19-run-milvus-2.0-on-windows.md">Milvus unter Windows ausführen</a>, um zu erfahren, wie man Milvus unter Windows installiert.</p>
<h4 id="I-got-an-error-when-installing-pymilvus-on-Windows-What-shall-I-do" class="common-anchor-header">Ich habe einen Fehler bei der Installation von pymilvus unter Windows erhalten. Was soll ich tun?</h4><p>Bitte versuchen Sie, pymilvus mit dem folgenden Befehl auf die neueste Version zu aktualisieren.</p>
<pre><code translate="no" class="language-shell">pip install --upgrade pymilvus
<button class="copy-code-btn"></button></code></pre>
<h4 id="Can-I-deploy-Milvus-when-disconnected-from-the-Internet" class="common-anchor-header">Kann ich Milvus installieren, wenn ich nicht mit dem Internet verbunden bin?</h4><p>Ja, Sie können Milvus in einer Offline-Umgebung installieren. Weitere Informationen finden Sie unter <a href="/docs/de/install_offline-helm.md">Milvus offline installieren</a>.</p>
<h4 id="Where-can-I-find-the-logs-generated-by-Milvus" class="common-anchor-header">Wo kann ich die von Milvus erzeugten Protokolle finden?</h4><p>Das Milvus-Protokoll wird standardmäßig auf stout (Standardausgabe) und stderr (Standardfehler) ausgegeben. Wir empfehlen jedoch dringend, Ihr Protokoll in der Produktion auf ein persistentes Volume umzuleiten. Um dies zu tun, aktualisieren Sie <code translate="no">log.file.rootPath</code> in <strong>milvus.yaml</strong>. Und wenn Sie Milvus mit <code translate="no">milvus-helm</code> chart einsetzen, müssen Sie auch zuerst die Log-Persistenz über <code translate="no">--set log.persistence.enabled=true</code> aktivieren.</p>
<p>Wenn Sie die Konfiguration nicht geändert haben, kann Ihnen auch die Verwendung von kubectl logs <pod-name> oder docker logs CONTAINER helfen, das Protokoll zu finden.</p>
<h4 id="Can-I-create-index-for-a-segment-before-inserting-data-into-it" class="common-anchor-header">Kann ich einen Index für ein Segment erstellen, bevor ich Daten in das Segment einfüge?</h4><p>Ja, das können Sie. Wir empfehlen jedoch, Daten in Stapeln einzufügen, von denen jeder 256 MB nicht überschreiten sollte, bevor jedes Segment indiziert wird.</p>
<h4 id="Can-I-share-an-etcd-instance-among-multiple-Milvus-instances" class="common-anchor-header">Kann ich eine etcd-Instanz für mehrere Milvus-Instanzen freigeben?</h4><p>Ja, Sie können eine etcd-Instanz für mehrere Milvus-Instanzen freigeben. Dazu müssen Sie in den Konfigurationsdateien der einzelnen Milvus-Instanzen <code translate="no">etcd.rootPath</code> auf einen separaten Wert für jede Instanz ändern, bevor Sie sie starten.</p>
<h4 id="Can-I-share-a-Pulsar-instance-among-multiple-Milvus-instances" class="common-anchor-header">Kann ich eine Pulsar-Instanz für mehrere Milvus-Instanzen freigeben?</h4><p>Ja, Sie können eine Pulsar-Instanz für mehrere Milvus-Instanzen freigeben. Um dies zu tun, können Sie</p>
<ul>
<li>Wenn Multi-Tenancy auf Ihrer Pulsar-Instanz aktiviert ist, sollten Sie einen separaten Tenant oder Namespace für jede Milvus-Instanz zuweisen. Dazu müssen Sie <code translate="no">pulsar.tenant</code> oder <code translate="no">pulsar.namespace</code> in den Konfigurationsdateien Ihrer Milvus-Instanzen auf einen eindeutigen Wert für jede Instanz ändern, bevor Sie sie starten.</li>
<li>Wenn Sie nicht vorhaben, Multi-Tenancy auf Ihrer Pulsar-Instanz zu aktivieren, sollten Sie <code translate="no">msgChannel.chanNamePrefix.cluster</code> in den Konfigurationsdateien Ihrer Milvus-Instanzen auf einen eindeutigen Wert für jede Instanz ändern, bevor Sie sie starten.</li>
</ul>
<h4 id="Can-I-share-a-MinIO-instance-among-multiple-Milvus-instances" class="common-anchor-header">Kann ich eine MinIO-Instanz für mehrere Milvus-Instanzen freigeben?</h4><p>Ja, Sie können eine MinIO-Instanz für mehrere Milvus-Instanzen freigeben. Dazu müssen Sie in den Konfigurationsdateien der einzelnen Milvus-Instanzen <code translate="no">minio.rootPath</code> auf einen eindeutigen Wert für jede Instanz ändern, bevor Sie sie starten.</p>
<h4 id="How-do-I-handle-the-error-message-pymilvusexceptionsConnectionConfigException-ConnectionConfigException-code1-messageIllegal-uri-exampledb-expected-form-httpsuserpwdexamplecom12345" class="common-anchor-header">Wie gehe ich mit der Fehlermeldung <code translate="no">pymilvus.exceptions.ConnectionConfigException: &lt;ConnectionConfigException: (code=1, message=Illegal uri: [example.db], expected form 'https://user:pwd@example.com:12345')&gt;</code> um?</h4><p>Die Fehlermeldung <code translate="no">Illegal uri [example.db]</code> zeigt an, dass Sie versuchen, eine Verbindung zu Milvus Lite herzustellen, indem Sie eine frühere Version von PyMilvus verwenden, die diesen Verbindungstyp nicht unterstützt. Um dieses Problem zu beheben, aktualisieren Sie Ihre PyMilvus-Installation auf mindestens Version 2.4.2, die Unterstützung für die Verbindung zu Milvus Lite enthält.</p>
<p>Sie können PyMilvus mit dem folgenden Befehl aktualisieren:</p>
<pre><code translate="no" class="language-shell">pip install pymilvus&gt;=2.4.2
<button class="copy-code-btn"></button></code></pre>
<h4 id="Why-am-I-getting-fewer-results-than-the-limit-I-set-in-my-searchquery" class="common-anchor-header">Warum erhalte ich weniger Ergebnisse als die <code translate="no">limit</code>, die ich in meiner Suche/Abfrage eingestellt habe?</h4><p>Es gibt mehrere Gründe, warum Sie weniger Ergebnisse als die von Ihnen angegebene <code translate="no">limit</code> erhalten können:</p>
<ul>
<li><p><strong>Begrenzte Daten</strong>: Die Sammlung enthält möglicherweise nicht genügend Entitäten, um das von Ihnen angeforderte Limit zu erreichen. Wenn die Gesamtzahl der Entitäten in der Sammlung geringer ist als der Grenzwert, erhalten Sie natürlich weniger Ergebnisse.</p></li>
<li><p><strong>Doppelte Primärschlüssel</strong>: Milvus priorisiert bestimmte Entitäten, wenn bei einer Suche doppelte Primärschlüssel gefunden werden. Dieses Verhalten variiert je nach Suchtyp:</p></li>
<li><p><strong>Abfrage (exakte Übereinstimmung)</strong>: Milvus wählt die letzte Entität mit dem passenden PK aus. ANN-Suche: Milvus wählt die Entität mit dem höchsten Ähnlichkeitsscore aus, auch wenn die Entitäten denselben PK haben. Diese Priorisierung kann zu weniger eindeutigen Ergebnissen als dem Limit führen, wenn Ihre Sammlung viele doppelte Primärschlüssel hat.</p></li>
<li><p><strong>Unzureichende Übereinstimmungen</strong>: Ihre Suchfilterausdrücke könnten zu streng sein, was dazu führt, dass weniger Entitäten den Ähnlichkeitsschwellenwert erfüllen. Wenn die für die Suche festgelegten Bedingungen zu restriktiv sind, werden nicht genügend Entitäten übereinstimmen, was zu weniger Ergebnissen als erwartet führt.</p></li>
</ul>
<h4 id="MilvusClientmilvusdemodb-gives-an-error-ModuleNotFoundError-No-module-named-milvuslite-What-causes-this-and-how-can-it-be-solved" class="common-anchor-header"><code translate="no">MilvusClient(&quot;milvus_demo.db&quot;) gives an error: ModuleNotFoundError: No module named 'milvus_lite'</code>. Was ist die Ursache für diesen Fehler und wie kann er behoben werden?</h4><p>Dieser Fehler tritt auf, wenn Sie versuchen, Milvus Lite auf einer Windows-Plattform zu verwenden. Milvus Lite wurde in erster Linie für Linux-Umgebungen entwickelt und bietet möglicherweise keine native Unterstützung für Windows.</p>
<p>Die Lösung besteht darin, eine Linux-Umgebung zu verwenden:</p>
<ul>
<li>Verwenden Sie ein Linux-basiertes Betriebssystem oder eine virtuelle Maschine, um Milvus Lite auszuführen.</li>
<li>Auf diese Weise wird die Kompatibilität mit den Abhängigkeiten und Funktionen der Bibliothek sichergestellt.</li>
</ul>
<h4 id="What-are-the-length-exceeds-max-length-errors-in-Milvus-and-how-can-they-be-understood-and-addressed" class="common-anchor-header">Was sind die "Länge überschreitet maximale Länge"-Fehler in Milvus, und wie können sie verstanden und behoben werden?</h4><p>"Length exceeds max length"-Fehler treten in Milvus auf, wenn die Größe eines Datenelements die maximal zulässige Größe für eine Sammlung oder ein Feld überschreitet. Hier sind einige Beispiele und Erklärungen:</p>
<ul>
<li><p>JSON-Feld-Fehler: <code translate="no">&lt;MilvusException: (code=1100, message=the length (398324) of json field (metadata) exceeds max length (65536): expected=valid length json string, actual=length exceeds max length: invalid parameter)&gt;</code></p></li>
<li><p>String-Längenfehler: <code translate="no">&lt;ParamError: (code=1, message=invalid input, length of string exceeds max length. length: 74238, max length: 60535)&gt;</code></p></li>
<li><p>VarChar-Feldfehler: <code translate="no">&lt;MilvusException: (code=1100, message=the length (60540) of 0th VarChar paragraph exceeds max length (0)%!(EXTRA int64=60535): invalid parameter)&gt;</code></p></li>
</ul>
<p>Um diese Fehler zu verstehen und zu beheben:</p>
<ul>
<li>Verstehen Sie, dass <code translate="no">len(str)</code> in Python die Anzahl der Zeichen und nicht die Größe in Bytes angibt.</li>
<li>Für String-basierte Datentypen wie VARCHAR und JSON verwenden Sie <code translate="no">len(bytes(str, encoding='utf-8'))</code>, um die tatsächliche Größe in Bytes zu bestimmen, die Milvus für "max-length" verwendet.</li>
</ul>
<p>Beispiel in Python:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Python Example: result of len() str cannot be used as &quot;max-length&quot; in Milvus </span>
<span class="hljs-meta">&gt;&gt;&gt; </span>s = <span class="hljs-string">&quot;你好，世界！&quot;</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">len</span>(s) <span class="hljs-comment"># Number of characters of s.</span>
<span class="hljs-number">6</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">len</span>(<span class="hljs-built_in">bytes</span>(s, <span class="hljs-string">&quot;utf-8&quot;</span>)) <span class="hljs-comment"># Size in bytes of s, max-length in Milvus.</span>
<span class="hljs-number">18</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="pymilvusexceptionsConnectionConfigException-ConnectionConfigException-code1-messageIllegal-uri-exampledb-expected-form-httpsuserpwdexamplecom12345-What-causes-this-and-how-can-it-be-solved" class="common-anchor-header"><code translate="no">pymilvus.exceptions.ConnectionConfigException: &lt;ConnectionConfigException: (code=1, message=Illegal uri: [example.db], expected form 'https://user:pwd@example.com:12345')&gt;</code>. Was ist die Ursache für diesen Fehler und wie kann er behoben werden?</h4><p>Dieser Fehler deutet darauf hin, dass Sie versuchen, eine Verbindung zu Milvus Lite herzustellen, indem Sie eine frühere Version von pymilvus verwenden, die dies nicht unterstützt. Um diesen Fehler zu beheben, aktualisieren Sie Ihre pymilvus-Installation auf mindestens Version 2.4.2. Diese Version unterstützt die Verbindung zu Milvus Lite. Verwenden Sie zum Upgrade den folgenden Befehl:</p>
<pre><code translate="no" class="language-shell">pip install pymilvus&gt;=2.4.2
<button class="copy-code-btn"></button></code></pre>
<h4 id="Still-have-questions" class="common-anchor-header">Haben Sie noch Fragen?</h4><p>Sie können:</p>
<ul>
<li>Schauen Sie sich <a href="https://github.com/milvus-io/milvus/issues">Milvus</a> auf GitHub an. Hier können Sie Fragen stellen, Ideen austauschen und anderen helfen.</li>
<li>Treten Sie unserem <a href="https://discuss.milvus.io/">Milvus-Forum</a> oder <a href="https://discord.com/invite/8uyFbECzPX">Discord-Kanal</a> bei, um Unterstützung zu erhalten und sich mit unserer Open-Source-Community auszutauschen.</li>
</ul>
