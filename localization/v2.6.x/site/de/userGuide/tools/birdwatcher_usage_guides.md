---
id: birdwatcher_usage_guides.md
summary: 'Erfahren Sie, wie Sie Birdwatch zur Fehlersuche in Milvus verwenden.'
title: Birdwatcher verwenden
---
<h1 id="Use-Birdwatcher" class="common-anchor-header">Birdwatcher verwenden<button data-href="#Use-Birdwatcher" class="anchor-icon" translate="no">
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
    </button></h1><p>In dieser Anleitung erfahren Sie, wie Sie Birdwatcher verwenden, um den Status Ihres Milvus zu überprüfen und ihn im laufenden Betrieb zu konfigurieren.</p>
<h2 id="Start-Birdwatcher" class="common-anchor-header">Birdwatcher starten<button data-href="#Start-Birdwatcher" class="anchor-icon" translate="no">
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
    </button></h2><p>Birdwatcher ist ein Kommandozeilen-Tool, das Sie wie folgt starten können:</p>
<pre><code translate="no" class="language-shell">./birdwatcher
<button class="copy-code-btn"></button></code></pre>
<p>Sie werden dann mit der folgenden Eingabeaufforderung begrüßt:</p>
<pre><code translate="no" class="language-shell">Offline &gt;
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-to-etcd" class="common-anchor-header">Mit etcd verbinden<button data-href="#Connect-to-etcd" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie müssen Birdwatcher verwenden, um sich mit etcd zu verbinden, bevor Sie andere Operationen durchführen können.</p>
<ul>
<li><p>Verbinden mit Standardeinstellungen</p>
<pre><code translate="no" class="language-shell">Offline &gt; connect
Milvus(by-dev) &gt;
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Verbinden von Birdwatcher in einem Pod</p>
<p>Wenn Sie Birdwatcher in einem Kubernetes-Pod ausführen möchten, müssen Sie zunächst die IP-Adresse von etcd wie folgt ermitteln:</p>
<pre><code translate="no" class="language-shell">kubectl get pod my-release-etcd-0 -o &#x27;jsonpath={.status.podIP}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Dann greifen Sie auf die Shell des Pods zu.</p>
<pre><code translate="no" class="language-shell">kubectl exec --stdin --tty birdwatcher-7f48547ddc-zcbxj -- /bin/sh
<button class="copy-code-btn"></button></code></pre>
<p>Verwenden Sie schließlich die zurückgegebene IP-Adresse, um sich wie folgt mit etcd zu verbinden:</p>
<pre><code translate="no" class="language-shell">Offline &gt; connect --etcd ${ETCD_IP_ADDR}:2379
Milvus(by-dev)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Verbindung mit einem anderen Root-Pfad</p>
<p>Wenn der Root-Pfad Ihres Milvus nicht mit <code translate="no">by-dev</code> übereinstimmt und Sie eine Fehlermeldung über einen falschen Root-Pfad erhalten, können Sie sich wie folgt mit etcd verbinden:</p>
<pre><code translate="no" class="language-shell">Offline &gt; connect --rootPath my-release
Milvus(my-release) &gt;
<button class="copy-code-btn"></button></code></pre>
<p>Wenn Sie den Root-Pfad Ihres Milvus nicht kennen, verbinden Sie sich wie folgt mit etcd:</p>
<pre><code translate="no" class="language-shell">Offline &gt; connect --dry
using dry mode, ignore rootPath and metaPath
Etcd(127.0.0.1:2379) &gt; find-milvus
1 candidates found:
my-release
Etcd(127.0.0.1:2379) &gt; use my-release
Milvus(my-release) &gt;
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Check-Milvus-status" class="common-anchor-header">Milvus-Status prüfen<button data-href="#Check-Milvus-status" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können die Befehle <code translate="no">show</code> verwenden, um den Milvus-Status zu überprüfen.</p>
<pre><code translate="no" class="language-shell">Milvus(my-release) &gt; show -h
Usage:
   show [command]

Available Commands:
  alias               list alias meta info
  channel-watch       display channel watching info from data coord meta store
  checkpoint          list checkpoint collection vchannels
  collection-history  display collection change history
  collection-loaded   display information of loaded collection from querycoord
  collections         list current available collection from RootCoord
  config-etcd         list configuations set by etcd source
  configurations      iterate all online components and inspect configuration
  current-version     
  database            display Database info from rootcoord meta
  index               
  partition           list partitions of provided collection
  querycoord-channel  display querynode information from querycoord cluster
  querycoord-cluster  display querynode information from querycoord cluster
  querycoord-task     display task information from querycoord
  replica             list current replica information from QueryCoord
  segment             display segment information from data coord meta store
  segment-index       display segment index information
  segment-loaded      display segment information from querycoordv1 meta
  segment-loaded-grpc list segments loaded information
  session             list online milvus components

Flags:
  -h, --help   help for show

Use &quot; show [command] --help&quot; for more information about a command.
<button class="copy-code-btn"></button></code></pre>
<h3 id="List-sessions" class="common-anchor-header">Sitzungen auflisten</h3><p>Zum Auflisten von Sitzungen, die mit verschiedenen Komponenten in Milvus verbunden sind:</p>
<pre><code translate="no" class="language-shell">Milvus(by-dev) &gt; show session
Session:datacoord, ServerID: 3, Version: 2.2.11, Address: 10.244.0.8:13333
Session:datanode, ServerID: 6, Version: 2.2.11, Address: 10.244.0.8:21124
Session:indexcoord, ServerID: 4, Version: 2.2.11, Address: 10.244.0.8:31000
Session:indexnode, ServerID: 5, Version: 2.2.11, Address: 10.244.0.8:21121
Session:proxy, ServerID: 8, Version: 2.2.11, Address: 10.244.0.8:19529
Session:querycoord, ServerID: 7, Version: 2.2.11, Address: 10.244.0.8:19531
Session:querynode, ServerID: 2, Version: 2.2.11, Address: 10.244.0.8:21123
Session:rootcoord, ServerID: 1, Version: 2.2.11, Address: 10.244.0.8:53100
<button class="copy-code-btn"></button></code></pre>
<p>In der Befehlsausgabe entspricht jeder Sitzungseintrag, der von <code translate="no">show session</code> aufgelistet wird, einem Knoten oder Dienst, der derzeit aktiv und in <strong>etcd</strong> registriert ist.</p>
<h3 id="Check-databases-and-collections" class="common-anchor-header">Datenbanken und Sammlungen überprüfen</h3><p>Sie können alle Datenbanken und Sammlungen auflisten.</p>
<ul>
<li><p>Datenbanken auflisten</p>
<p>In der Befehlsausgabe finden Sie Informationen zu jeder Datenbank.</p>
<pre><code translate="no" class="language-shell">Milvus(by-dev) &gt; show database
=============================
ID: 1   Name: default
TenantID:        State: DatabaseCreated
--- Total Database(s): 1
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Sammlungen auflisten</p>
<p>In der Befehlsausgabe finden Sie detaillierte Informationen zu jeder Sammlung.</p>
<pre><code translate="no" class="language-shell">Milvus(by-dev) &gt; show collections
================================================================================
DBID: 1
Collection ID: 443407225551410746       Collection Name: medium_articles_2020
Collection State: CollectionCreated     Create Time: 2023-08-08 09:27:08
Fields:
- Field ID: 0   Field Name: RowID       Field Type: Int64
- Field ID: 1   Field Name: Timestamp   Field Type: Int64
- Field ID: 100         Field Name: id          Field Type: Int64
        - Primary Key: true, AutoID: false
- Field ID: 101         Field Name: title       Field Type: VarChar
        - Type Param max_length: 512
- Field ID: 102         Field Name: title_vector        Field Type: FloatVector
        - Type Param dim: 768
- Field ID: 103         Field Name: link        Field Type: VarChar
        - Type Param max_length: 512
- Field ID: 104         Field Name: reading_time        Field Type: Int64
- Field ID: 105         Field Name: publication         Field Type: VarChar
        - Type Param max_length: 512
- Field ID: 106         Field Name: claps       Field Type: Int64
- Field ID: 107         Field Name: responses   Field Type: Int64
Enable Dynamic Schema: false
Consistency Level: Bounded
Start position for channel by-dev-rootcoord-dml_0(by-dev-rootcoord-dml_0_443407225551410746v0): [1 0 28 175 133 76 39 6]
--- Total collections:  1        Matched collections:  1
--- Total channel: 1     Healthy collections: 1
================================================================================
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Eine bestimmte Sammlung anzeigen</p>
<p>Sie können eine bestimmte Sammlung anzeigen, indem Sie ihre ID angeben.</p>
<pre><code translate="no" class="language-shell">Milvus(by-dev) &gt; show collection-history --id 443407225551410746
================================================================================
DBID: 1
Collection ID: 443407225551410746       Collection Name: medium_articles_2020
Collection State: CollectionCreated     Create Time: 2023-08-08 09:27:08
Fields:
- Field ID: 0   Field Name: RowID       Field Type: Int64
- Field ID: 1   Field Name: Timestamp   Field Type: Int64
- Field ID: 100         Field Name: id          Field Type: Int64
        - Primary Key: true, AutoID: false
- Field ID: 101         Field Name: title       Field Type: VarChar
        - Type Param max_length: 512
- Field ID: 102         Field Name: title_vector        Field Type: FloatVector
        - Type Param dim: 768
- Field ID: 103         Field Name: link        Field Type: VarChar
        - Type Param max_length: 512
- Field ID: 104         Field Name: reading_time        Field Type: Int64
- Field ID: 105         Field Name: publication         Field Type: VarChar
        - Type Param max_length: 512
- Field ID: 106         Field Name: claps       Field Type: Int64
- Field ID: 107         Field Name: responses   Field Type: Int64
Enable Dynamic Schema: false
Consistency Level: Bounded
Start position for channel by-dev-rootcoord-dml_0(by-dev-rootcoord-dml_0_443407225551410746v0): [1 0 28 175 133 76 39 6]
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Alle geladenen Sammlungen anzeigen</p>
<p>Sie können Birdwatcher alle geladenen Sammlungen filtern lassen.</p>
<pre><code translate="no" class="language-shell">Milvus(by-dev) &gt; show collection-loaded
Version: [&gt;= 2.2.0]     CollectionID: 443407225551410746
ReplicaNumber: 1        LoadStatus: Loaded
--- Collections Loaded: 1
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Alle Channel-Checkpoints einer Sammlung auflisten</p>
<p>Sie können Birdwatcher veranlassen, alle Checkpoints einer bestimmten Sammlung aufzulisten.</p>
<pre><code translate="no" class="language-shell">Milvus(by-dev) &gt; show checkpoint --collection 443407225551410746
vchannel by-dev-rootcoord-dml_0_443407225551410746v0 seek to 2023-08-08 09:36:09.54 +0000 UTC, cp channel: by-dev-rootcoord-dml_0_443407225551410746v0, Source: Channel Checkpoint
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Check-index-details" class="common-anchor-header">Index-Details prüfen</h3><p>Führen Sie den folgenden Befehl aus, um alle Indexdateien im Detail aufzulisten.</p>
<pre><code translate="no" class="language-shell">Milvus(by-dev) &gt; show index
*************2.1.x***************
*************2.2.x***************
==================================================================
Index ID: 443407225551410801    Index Name: _default_idx_102    CollectionID:443407225551410746
Create Time: 2023-08-08 09:27:19.139 +0000      Deleted: false
Index Type: HNSW        Metric Type: L2
Index Params: 
==================================================================
<button class="copy-code-btn"></button></code></pre>
<h3 id="List-partitions" class="common-anchor-header">Partitionen auflisten</h3><p>Führen Sie den folgenden Befehl aus, um alle Partitionen in einer bestimmten Sammlung aufzulisten.</p>
<pre><code translate="no" class="language-shell">Milvus(by-dev) &gt; show partition --collection 443407225551410746
Parition ID: 443407225551410747 Name: _default  State: PartitionCreated
--- Total Database(s): 1
<button class="copy-code-btn"></button></code></pre>
<h3 id="Check-channel-status" class="common-anchor-header">Channel-Status prüfen</h3><p>Führen Sie den folgenden Befehl aus, um den Channel-Status anzuzeigen</p>
<pre><code translate="no" class="language-shell">Milvus(by-dev) &gt; show channel-watch
=============================
key: by-dev/meta/channelwatch/6/by-dev-rootcoord-dml_0_443407225551410746v0
Channel Name:by-dev-rootcoord-dml_0_443407225551410746v0         WatchState: WatchSuccess
Channel Watch start from: 2023-08-08 09:27:09 +0000, timeout at: 1970-01-01 00:00:00 +0000
Start Position ID: [1 0 28 175 133 76 39 6], time: 1970-01-01 00:00:00 +0000
Unflushed segments: []
Flushed segments: []
Dropped segments: []
--- Total Channels: 1
<button class="copy-code-btn"></button></code></pre>
<h3 id="List-all-replicas-and-segments" class="common-anchor-header">Alle Replikate und Segmente auflisten</h3><ul>
<li><p>Alle Replikate auflisten</p>
<p>Führen Sie den folgenden Befehl aus, um alle Replikate und ihre entsprechenden Sammlungen aufzulisten.</p>
<pre><code translate="no" class="language-shell">Milvus(by-dev) &gt; show replica
================================================================================
ReplicaID: 443407225685278721 CollectionID: 443407225551410746 version:&gt;=2.2.0
All Nodes:[2]
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Alle Segmente auflisten</p>
<p>Führen Sie den folgenden Befehl aus, um alle Segmente und ihren Status aufzulisten</p>
<pre><code translate="no" class="language-shell">SegmentID: 443407225551610865 State: Flushed, Row Count:5979
--- Growing: 0, Sealed: 0, Flushed: 1
--- Total Segments: 1, row count: 5979
<button class="copy-code-btn"></button></code></pre>
<p>Führen Sie den folgenden Befehl aus, um alle geladenen Segmente im Detail aufzulisten. Für Milvus 2.1.x verwenden Sie stattdessen <code translate="no">show segment-loaded</code>.</p>
<pre><code translate="no" class="language-shell">Milvus(by-dev) &gt; show segment-loaded-grpc
===========
ServerID 2
Channel by-dev-rootcoord-dml_0_443407225551410746v0, collection: 443407225551410746, version 1691486840680656937
Leader view for channel: by-dev-rootcoord-dml_0_443407225551410746v0
Growing segments number: 0 , ids: []
SegmentID: 443407225551610865 CollectionID: 443407225551410746 Channel: by-dev-rootcoord-dml_0_443407225551410746v0
Sealed segments number: 1    
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="List-configurations" class="common-anchor-header">Konfigurationen auflisten</h3><p>Sie können sich von Birdwatcher die aktuellen Konfigurationen der einzelnen Milvus-Komponenten auflisten lassen.</p>
<pre><code translate="no" class="language-shell">Milvus(by-dev) &gt; show configurations
client nil Session:proxy, ServerID: 8, Version: 2.2.11, Address: 10.244.0.8:19529
Component rootcoord-1
rootcoord.importtaskexpiration: 900
rootcoord.enableactivestandby: false
rootcoord.importtaskretention: 86400
rootcoord.maxpartitionnum: 4096
rootcoord.dmlchannelnum: 16
rootcoord.minsegmentsizetoenableindex: 1024
rootcoord.port: 53100
rootcoord.address: localhost
rootcoord.maxdatabasenum: 64
Component datacoord-3
...
querynode.gracefulstoptimeout: 30
querynode.cache.enabled: true
querynode.cache.memorylimit: 2147483648
querynode.scheduler.maxreadconcurrentratio: 2
<button class="copy-code-btn"></button></code></pre>
<p>Alternativ können Sie jede Milvus-Komponente besuchen, um ihre Konfiguration zu finden. Im Folgenden wird gezeigt, wie Sie die Konfiguration von QueryCoord mit der ID 7 auflisten können.</p>
<pre><code translate="no" class="language-shell">Milvus(by-dev) &gt; show session
Session:datacoord, ServerID: 3, Version: 2.2.11, Address: 10.244.0.8:13333
Session:datanode, ServerID: 6, Version: 2.2.11, Address: 10.244.0.8:21124
Session:indexcoord, ServerID: 4, Version: 2.2.11, Address: 10.244.0.8:31000
Session:indexnode, ServerID: 5, Version: 2.2.11, Address: 10.244.0.8:21121
Session:proxy, ServerID: 8, Version: 2.2.11, Address: 10.244.0.8:19529
Session:querycoord, ServerID: 7, Version: 2.2.11, Address: 10.244.0.8:19531
Session:querynode, ServerID: 2, Version: 2.2.11, Address: 10.244.0.8:21123
Session:rootcoord, ServerID: 1, Version: 2.2.11, Address: 10.244.0.8:53100

Milvus(by-dev) &gt; visit querycoord 7
QueryCoord-7(10.244.0.8:19531) &gt; configuration
Key: querycoord.enableactivestandby, Value: false
Key: querycoord.channeltasktimeout, Value: 60000
Key: querycoord.overloadedmemorythresholdpercentage, Value: 90
Key: querycoord.distpullinterval, Value: 500
Key: querycoord.checkinterval, Value: 10000
Key: querycoord.checkhandoffinterval, Value: 5000
Key: querycoord.taskexecutioncap, Value: 256
Key: querycoord.taskmergecap, Value: 8
Key: querycoord.autohandoff, Value: true
Key: querycoord.address, Value: localhost
Key: querycoord.port, Value: 19531
Key: querycoord.memoryusagemaxdifferencepercentage, Value: 30
Key: querycoord.refreshtargetsintervalseconds, Value: 300
Key: querycoord.balanceintervalseconds, Value: 60
Key: querycoord.loadtimeoutseconds, Value: 1800
Key: querycoord.globalrowcountfactor, Value: 0.1
Key: querycoord.scoreunbalancetolerationfactor, Value: 0.05
Key: querycoord.reverseunbalancetolerationfactor, Value: 1.3
Key: querycoord.balancer, Value: ScoreBasedBalancer
Key: querycoord.autobalance, Value: true
Key: querycoord.segmenttasktimeout, Value: 120000
<button class="copy-code-btn"></button></code></pre>
<h2 id="Backup-metrics" class="common-anchor-header">Metriken sichern<button data-href="#Backup-metrics" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können Birdwatcher die Metriken aller Komponenten sichern lassen</p>
<pre><code translate="no" class="language-shell">Milvus(my-release) &gt; backup
Backing up ... 100%(2452/2451)
backup etcd for prefix  done
http://10.244.0.10:9091/metrics
http://10.244.0.10:9091/metrics
http://10.244.0.10:9091/metrics
http://10.244.0.10:9091/metrics
http://10.244.0.10:9091/metrics
http://10.244.0.10:9091/metrics
http://10.244.0.10:9091/metrics
http://10.244.0.10:9091/metrics
backup for prefix done, stored in file: bw_etcd_ALL.230810-075211.bak.gz
<button class="copy-code-btn"></button></code></pre>
<p>Dann können Sie die Datei in dem Verzeichnis überprüfen, in dem Sie Birdwatcher starten.</p>
<h2 id="Probe-collections" class="common-anchor-header">Sammlungen prüfen<button data-href="#Probe-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können Birdwatcher veranlassen, den Status von geladenen Sammlungen mit bestimmten Primärschlüsseln oder Scheinabfragen zu prüfen.</p>
<h3 id="Probe-collection-with-known-primary-key" class="common-anchor-header">Sammlungen mit bekanntem Primärschlüssel prüfen</h3><p>Im Befehl <code translate="no">probe</code> sollten Sie den Primärschlüssel mit dem Flag <code translate="no">pk</code> und die Sammlungs-ID mit dem Flag <code translate="no">collection</code> angeben.</p>
<pre><code translate="no" class="language-shell">Milvus(by-dev) &gt; probe pk --pk 110 --collection 442844725212299747
PK 110 found on segment 442844725212299830
Field id, value: &amp;{long_data:&lt;data:110 &gt; }
Field title, value: &amp;{string_data:&lt;data:&quot;Human Resources Datafication&quot; &gt; }
Field title_vector, value: &amp;{dim:768 float_vector:&lt;data:0.022454707 data:0.007861045 data:0.0063843643 data:0.024065714 data:0.013782166 data:0.018483251 data:-0.026526336 ... data:-0.06579628 data:0.00033906146 data:0.030992996 data:-0.028134001 data:-0.01311325 data:0.012471594 &gt; }
Field article_meta, value: &amp;{json_data:&lt;data:&quot;{\&quot;link\&quot;:\&quot;https:\\/\\/towardsdatascience.com\\/human-resources-datafication-d44c8f7cb365\&quot;,\&quot;reading_time\&quot;:6,\&quot;publication\&quot;:\&quot;Towards Data Science\&quot;,\&quot;claps\&quot;:256,\&quot;responses\&quot;:0}&quot; &gt; }
<button class="copy-code-btn"></button></code></pre>
<h3 id="Probe-all-collections-with-mock-queries" class="common-anchor-header">Alle Sammlungen mit Mock-Queries prüfen</h3><p>Sie können Birdwatcher auch veranlassen, alle Sammlungen mit Scheinabfragen zu untersuchen.</p>
<pre><code translate="no" class="language-shell">Milvus(by-dev) &gt; probe query
probing collection 442682158191982314
Found vector field vector(103) with dim[384], indexID: 442682158191990455
failed to generated mock request probing index type IVF_FLAT not supported yet
probing collection 442844725212086932
Found vector field title_vector(102) with dim[768], indexID: 442844725212086936
Shard my-release-rootcoord-dml_1_442844725212086932v0 leader[298] probe with search success.
probing collection 442844725212299747
Found vector field title_vector(102) with dim[768], indexID: 442844725212299751
Shard my-release-rootcoord-dml_4_442844725212299747v0 leader[298] probe with search success.
probing collection 443294505839900248
Found vector field vector(101) with dim[256], indexID: 443294505839900251
Shard my-release-rootcoord-dml_5_443294505839900248v0 leader[298] probe with search success.
<button class="copy-code-btn"></button></code></pre>
