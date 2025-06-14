---
id: birdwatcher_usage_guides.md
summary: Saiba como utilizar o Birdwatch para depurar o Milvus.
title: Utilizar o Birdwatcher
---
<h1 id="Use-Birdwatcher" class="common-anchor-header">Utilizar o Birdwatcher<button data-href="#Use-Birdwatcher" class="anchor-icon" translate="no">
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
    </button></h1><p>Este guia explica-lhe como utilizar o Birdwatcher para verificar o estado do seu Milvus e configurá-lo em tempo real.</p>
<h2 id="Start-Birdwatcher" class="common-anchor-header">Iniciar o Birdwatcher<button data-href="#Start-Birdwatcher" class="anchor-icon" translate="no">
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
    </button></h2><p>O Birdwatcher é uma ferramenta de linha de comandos, pode iniciá-lo da seguinte forma:</p>
<pre><code translate="no" class="language-shell">./birdwatcher
<button class="copy-code-btn"></button></code></pre>
<p>Depois será recebido com a seguinte mensagem:</p>
<pre><code translate="no" class="language-shell">Offline &gt;
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-to-etcd" class="common-anchor-header">Connect to etcd<button data-href="#Connect-to-etcd" class="anchor-icon" translate="no">
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
    </button></h2><p>É necessário utilizar o Birdwatcher para se ligar ao etcd antes de quaisquer outras operações.</p>
<ul>
<li><p>Conectar com as configurações padrão</p>
<pre><code translate="no" class="language-shell">Offline &gt; connect
Milvus(by-dev) &gt;
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Conectar a partir do Birdwatcher num pod</p>
<p>Se você optar por executar o Birdwatcher em um pod do Kubernetes, você precisa primeiro obter o endereço IP do etcd da seguinte forma:</p>
<pre><code translate="no" class="language-shell">kubectl get pod my-release-etcd-0 -o &#x27;jsonpath={.status.podIP}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Em seguida, acessar o shell do pod.</p>
<pre><code translate="no" class="language-shell">kubectl exec --stdin --tty birdwatcher-7f48547ddc-zcbxj -- /bin/sh
<button class="copy-code-btn"></button></code></pre>
<p>Finalmente, use o endereço IP retornado para se conectar ao etcd da seguinte forma:</p>
<pre><code translate="no" class="language-shell">Offline &gt; connect --etcd ${ETCD_IP_ADDR}:2379
Milvus(by-dev)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Conectar com um caminho de raiz diferente</p>
<p>Se o caminho de raiz do seu Milvus for diferente de <code translate="no">by-dev</code> e lhe for apresentado um erro a informar sobre um caminho de raiz incorreto, pode ligar-se ao etcd da seguinte forma:</p>
<pre><code translate="no" class="language-shell">Offline &gt; connect --rootPath my-release
Milvus(my-release) &gt;
<button class="copy-code-btn"></button></code></pre>
<p>Se não souber o caminho da raiz do seu Milvus, ligue-se ao etcd da seguinte forma:</p>
<pre><code translate="no" class="language-shell">Offline &gt; connect --dry
using dry mode, ignore rootPath and metaPath
Etcd(127.0.0.1:2379) &gt; find-milvus
1 candidates found:
my-release
Etcd(127.0.0.1:2379) &gt; use my-release
Milvus(my-release) &gt;
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Check-Milvus-status" class="common-anchor-header">Verificar o estado do Milvus<button data-href="#Check-Milvus-status" class="anchor-icon" translate="no">
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
    </button></h2><p>Você pode usar os comandos <code translate="no">show</code> para verificar o status do Milvus.</p>
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
<h3 id="List-sessions" class="common-anchor-header">Listar sessões</h3><p>Para listar as sessões associadas a diferentes componentes do Milvus:</p>
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
<p>Na saída do comando, cada entrada de sessão listada por <code translate="no">show session</code> corresponde a um nó ou serviço que está atualmente ativo e registado no <strong>etcd</strong>.</p>
<h3 id="Check-databases-and-collections" class="common-anchor-header">Verificar bases de dados e colecções</h3><p>É possível listar todas as bases de dados e colecções.</p>
<ul>
<li><p>Listar bases de dados</p>
<p>Na saída do comando, pode encontrar informações sobre cada base de dados.</p>
<pre><code translate="no" class="language-shell">Milvus(by-dev) &gt; show database
=============================
ID: 1   Name: default
TenantID:        State: DatabaseCreated
--- Total Database(s): 1
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Listar colecções</p>
<p>Na saída do comando, pode encontrar informações detalhadas sobre cada coleção.</p>
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
<li><p>Ver uma coleção específica</p>
<p>Pode ver uma coleção específica especificando o seu ID.</p>
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
<li><p>Ver todas as colecções carregadas</p>
<p>Pode fazer com que o Birdwatcher filtre todas as colecções carregadas.</p>
<pre><code translate="no" class="language-shell">Milvus(by-dev) &gt; show collection-loaded
Version: [&gt;= 2.2.0]     CollectionID: 443407225551410746
ReplicaNumber: 1        LoadStatus: Loaded
--- Collections Loaded: 1
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Listar todos os pontos de controlo dos canais de uma coleção</p>
<p>Pode fazer com que o Birdwatcher liste todos os pontos de controlo de uma coleção específica.</p>
<pre><code translate="no" class="language-shell">Milvus(by-dev) &gt; show checkpoint --collection 443407225551410746
vchannel by-dev-rootcoord-dml_0_443407225551410746v0 seek to 2023-08-08 09:36:09.54 +0000 UTC, cp channel: by-dev-rootcoord-dml_0_443407225551410746v0, Source: Channel Checkpoint
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Check-index-details" class="common-anchor-header">Verificar os detalhes do índice</h3><p>Execute o seguinte comando para listar todos os ficheiros de índice em detalhe.</p>
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
<h3 id="List-partitions" class="common-anchor-header">Listar partições</h3><p>Execute o seguinte comando para listar todas as partições de uma coleção específica.</p>
<pre><code translate="no" class="language-shell">Milvus(by-dev) &gt; show partition --collection 443407225551410746
Parition ID: 443407225551410747 Name: _default  State: PartitionCreated
--- Total Database(s): 1
<button class="copy-code-btn"></button></code></pre>
<h3 id="Check-channel-status" class="common-anchor-header">Verificar o estado do canal</h3><p>Execute o seguinte comando para ver o status do canal</p>
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
<h3 id="List-all-replicas-and-segments" class="common-anchor-header">Listar todas as réplicas e segmentos</h3><ul>
<li><p>Listar todas as réplicas</p>
<p>Execute o comando a seguir para listar todas as réplicas e suas coleções correspondentes.</p>
<pre><code translate="no" class="language-shell">Milvus(by-dev) &gt; show replica
================================================================================
ReplicaID: 443407225685278721 CollectionID: 443407225551410746 version:&gt;=2.2.0
All Nodes:[2]
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Listar todos os segmentos</p>
<p>Execute o seguinte comando para listar todos os segmentos e seu status</p>
<pre><code translate="no" class="language-shell">SegmentID: 443407225551610865 State: Flushed, Row Count:5979
--- Growing: 0, Sealed: 0, Flushed: 1
--- Total Segments: 1, row count: 5979
<button class="copy-code-btn"></button></code></pre>
<p>Execute o comando a seguir para listar todos os segmentos carregados em detalhes. Para Milvus 2.1.x, use <code translate="no">show segment-loaded</code>.</p>
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
<h3 id="List-configurations" class="common-anchor-header">Listar configurações</h3><p>Pode fazer com que o Birdwatcher liste as configurações actuais de cada componente do Milvus.</p>
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
<p>Como alternativa, pode visitar cada componente do Milvus para encontrar a sua configuração. O seguinte exemplo demonstra como listar a configuração do QueryCoord com ID 7.</p>
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
<h2 id="Backup-metrics" class="common-anchor-header">Backup de métricas<button data-href="#Backup-metrics" class="anchor-icon" translate="no">
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
    </button></h2><p>Pode fazer com que o Birdwatcher faça uma cópia de segurança das métricas de todos os componentes</p>
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
<p>Depois pode verificar o ficheiro no diretório onde iniciou o Birdwatcher.</p>
<h2 id="Probe-collections" class="common-anchor-header">Sondar colecções<button data-href="#Probe-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>Pode fazer com que o Birdwatcher verifique o estado das colecções carregadas com chaves primárias especificadas ou consultas simuladas.</p>
<h3 id="Probe-collection-with-known-primary-key" class="common-anchor-header">Sondar coleção com chave primária conhecida</h3><p>No comando <code translate="no">probe</code>, deve especificar a chave primária utilizando a flag <code translate="no">pk</code> e o ID da coleção utilizando a flag <code translate="no">collection</code>.</p>
<pre><code translate="no" class="language-shell">Milvus(by-dev) &gt; probe pk --pk 110 --collection 442844725212299747
PK 110 found on segment 442844725212299830
Field id, value: &amp;{long_data:&lt;data:110 &gt; }
Field title, value: &amp;{string_data:&lt;data:&quot;Human Resources Datafication&quot; &gt; }
Field title_vector, value: &amp;{dim:768 float_vector:&lt;data:0.022454707 data:0.007861045 data:0.0063843643 data:0.024065714 data:0.013782166 data:0.018483251 data:-0.026526336 ... data:-0.06579628 data:0.00033906146 data:0.030992996 data:-0.028134001 data:-0.01311325 data:0.012471594 &gt; }
Field article_meta, value: &amp;{json_data:&lt;data:&quot;{\&quot;link\&quot;:\&quot;https:\\/\\/towardsdatascience.com\\/human-resources-datafication-d44c8f7cb365\&quot;,\&quot;reading_time\&quot;:6,\&quot;publication\&quot;:\&quot;Towards Data Science\&quot;,\&quot;claps\&quot;:256,\&quot;responses\&quot;:0}&quot; &gt; }
<button class="copy-code-btn"></button></code></pre>
<h3 id="Probe-all-collections-with-mock-queries" class="common-anchor-header">Sondar todas as colecções com consultas simuladas</h3><p>Também pode fazer com que o Birdwatcher examine todas as colecções com consultas simuladas.</p>
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
