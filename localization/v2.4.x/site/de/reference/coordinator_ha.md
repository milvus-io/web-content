---
id: coordinator_ha.md
summary: >-
  Erfahren Sie mehr über die Motivation und das Verfahren für
  Milvus-Koordinatoren, die im aktiven Bereitschaftsdienst arbeiten.
title: Koordinator HA
---
<h1 id="Coordinator-HA" class="common-anchor-header">Koordinator HA<button data-href="#Coordinator-HA" class="anchor-icon" translate="no">
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
    </button></h1><p>Wie in der <a href="/docs/de/v2.4.x/architecture_overview.md">Milvus-Architektur</a> dargestellt, besteht Milvus aus vielen Komponenten und lässt sie verteilt arbeiten. Von allen Komponenten stellt Milvus die hohe Verfügbarkeit der Arbeiter durch <a href="/docs/de/v2.4.x/scaleout.md">Auf- und Abwärtsskalierung</a> der Knoten sicher, so dass die Koordinatoren das einzige schwache Glied in der Kette sind.</p>
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
    </button></h2><p>In der Version 2.2.3 implementiert Milvus Hochverfügbarkeit für Koordinatoren, um sie im Aktiv-Standby-Modus arbeiten zu lassen und so mögliche Single Points of Failure (SPoFs) zu entschärfen, die zur Nichtverfügbarkeit von Diensten führen können.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/coordinator_ha.png" alt="Coordinator HA" class="doc-image" id="coordinator-ha" />
   </span> <span class="img-wrapper"> <span>Koordinator HA</span> </span></p>
<p>Die obige Abbildung veranschaulicht, wie Koordinatoren im Active-Standby-Modus arbeiten. Wenn ein Koordinatorenpaar startet, registrieren sie sich mit ihrer Server-ID bei etcd und konkurrieren um die aktive Rolle. Der Koordinator, dem es gelingt, die aktive Rolle vom etcd zu leasen, beginnt mit dem Dienst, während der andere Koordinator des Paares in Bereitschaft bleibt, die aktive Rolle überwacht und bereit ist, den Dienst zu übernehmen, wenn der aktive Koordinator ausfällt.</p>
<h2 id="Enable-coordinator-HA" class="common-anchor-header">Aktivieren von Koordinator-HA<button data-href="#Enable-coordinator-HA" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="With-Helm" class="common-anchor-header">Mit Helm</h3><p>Um mehrere Koordinatoren zu starten und sie im Aktiv-Standby-Modus arbeiten zu lassen, sollten Sie die folgenden Änderungen an Ihrer Datei <code translate="no">values.yaml</code> vornehmen.</p>
<ul>
<li>Setzen Sie <code translate="no">xxxCoordinator.replicas</code> auf <code translate="no">2</code>.</li>
<li>Setzen Sie <code translate="no">xxxCoordinator.activeStandby.enabled</code> auf <code translate="no">true</code>.</li>
</ul>
<p>Der folgende Codeschnipsel verwendet RootCoord als Beispiel. Sie können das Gleiche für Koordinatoren anderer Typen tun.</p>
<pre><code translate="no" class="language-yaml">rootCoordinator:
  enabled: true
  <span class="hljs-comment"># You can set the number of replicas greater than 1 only if you also need to set activeStandby.enabled to true.</span>
  replicas: <span class="hljs-number">2</span>  <span class="hljs-comment"># Otherwise, remove this configuration item.</span>
  resources: {}
  nodeSelector: {}
  affinity: {}
  tolerations: []
  extraEnv: []
  heaptrack:
    enabled: false
  profiling:
    enabled: false  <span class="hljs-comment"># Enable live profiling</span>
  activeStandby:
    enabled: true  <span class="hljs-comment"># Set this to true to have RootCoordinators work in active-standby mode.</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="With-Docker" class="common-anchor-header">Mit Docker</h3><p>Um mehrere Koordinatoren zu starten und sie im Aktiv-Standby-Modus arbeiten zu lassen, können Sie einige Definitionen in die Datei <code translate="no">docker-compose</code> einfügen, die Sie zum Starten Ihres Milvus-Clusters verwenden.</p>
<p>Der folgende Codeschnipsel verwendet RootCoord als Beispiel. Sie können das Gleiche für andere Koordinatoren tun.</p>
<pre><code translate="no" class="language-yaml">  rootcoord:
    container_name: milvus-rootcoord
    image: milvusdb/milvus:v2<span class="hljs-number">.2</span><span class="hljs-number">.3</span>
    command: [<span class="hljs-string">&quot;milvus&quot;</span>, <span class="hljs-string">&quot;run&quot;</span>, <span class="hljs-string">&quot;rootcoord&quot;</span>]
    environment:
      ETCD_ENDPOINTS: etcd:<span class="hljs-number">2379</span>
      MINIO_ADDRESS: minio:<span class="hljs-number">9000</span>
      PULSAR_ADDRESS: pulsar://pulsar:<span class="hljs-number">6650</span>
      ROOT_COORD_ADDRESS: rootcoord:<span class="hljs-number">53100</span>
      <span class="hljs-comment"># add ROOT_COORD_ENABLE_ACTIVE_STANDBY to enable active standby</span>
      ROOT_COORD_ENABLE_ACTIVE_STANDBY: true
    depends_on:
      - <span class="hljs-string">&quot;etcd&quot;</span>
      - <span class="hljs-string">&quot;pulsar&quot;</span>
      - <span class="hljs-string">&quot;minio&quot;</span>

<span class="hljs-comment">#   add the following to have RootCoords work in active-standby mode</span>
<span class="hljs-comment">#   rootcoord-1:</span>
<span class="hljs-comment">#    container_name: milvus-rootcoord-1</span>
<span class="hljs-comment">#    image: milvusdb/milvus:v2.2.3</span>
<span class="hljs-comment">#    command: [&quot;milvus&quot;, &quot;run&quot;, &quot;rootcoord&quot;]</span>
<span class="hljs-comment">#    environment:</span>
<span class="hljs-comment">#      ETCD_ENDPOINTS: etcd:2379</span>
<span class="hljs-comment">#      MINIO_ADDRESS: minio:9000</span>
<span class="hljs-comment">#      PULSAR_ADDRESS: pulsar://pulsar:6650</span>
<span class="hljs-comment">#      ROOT_COORD_ADDRESS: rootcoord-1:53100</span>
<span class="hljs-comment">#      # add ROOT_COORD_ENABLE_ACTIVE_STANDBY to enable active standby</span>
<span class="hljs-comment">#      ROOT_COORD_ENABLE_ACTIVE_STANDBY: true</span>
<span class="hljs-comment">#    depends_on:</span>
<span class="hljs-comment">#      - &quot;etcd&quot;</span>
<span class="hljs-comment">#      - &quot;pulsar&quot;</span>
<span class="hljs-comment">#      - &quot;minio&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="With-MacLinux-shell" class="common-anchor-header">Mit Mac/Linux-Shell</h3><p>Um mehrere Koordinatoren zu starten und sie im Aktiv-Standby-Modus arbeiten zu lassen, können Sie</p>
<ol>
<li><p>Laden Sie den Milvus-Quellcode auf Ihr lokales Laufwerk herunter, und <a href="https://github.com/milvus-io/milvus/blob/master/DEVELOPMENT.md">starten Sie einen Milvus-Cluster aus dem Quellcode</a> wie folgt:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">sudo</span> ./scripts/start_cluster.sh
<button class="copy-code-btn"></button></code></pre>
<p>Am Ende dieses Schrittes läuft Milvus mit nur einem Koordinator jedes Typs.</p></li>
<li><p>Aktualisieren Sie <code translate="no">milvus.yaml</code>, um die Portnummer des Koordinators jedes Typs zu ändern. Im Folgenden wird <strong>rootCoord</strong> als Beispiel verwendet.</p>
<pre><code translate="no" class="language-yaml">rootCoord:
  address: localhost
  port: <span class="hljs-number">53100</span> <span class="hljs-comment"># change to 53001</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Starten Sie den Standby-Koordinator.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">nohup</span> ./bin/milvus run rootcoord &gt; /tmp/rootcoord2.<span class="hljs-built_in">log</span> 2&gt;&amp;1 &amp;
<button class="copy-code-btn"></button></code></pre>
<p>Führen Sie am Ende dieses Schritts den folgenden Befehl aus, um zu überprüfen, ob zwei Coordinator-Prozesse vorhanden sind.</p>
<pre><code translate="no" class="language-shell">ps aux|grep milvus
<button class="copy-code-btn"></button></code></pre>
<p>Die Ausgabe sollte in etwa so aussehen</p>
<pre><code translate="no" class="language-shell">&gt; ps aux|grep milvus
root        12813   0.7 0.2 410709648   82432   ??  S   5:18PM  0:33.28 ./bin/milvus run rootcoord
root        12816   0.5 0.2 409487968   62352   ??  S   5:18PM  0:22.69 ./bin/milvus run proxy
root        17739   0.1 0.3 410289872   91792 s003  SN  6:01PM  0:00.30 ./bin/milvus run rootcoord
...
<button class="copy-code-btn"></button></code></pre>
<p>Und der Standby-Koordinator gibt alle zehn Sekunden einen Protokolleintrag wie folgt aus:</p>
<pre><code translate="no" class="language-shell">[INFO] [sessionutil/session_util.go:649] [<span class="hljs-string">&quot;serverName: rootcoord is in STANDBY ...&quot;</span>]
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Beenden Sie den aktiven Koordinator eines Paares und beobachten Sie das Verhalten des Standby-Koordinators.</p>
<p>Sie können feststellen, dass es 60 Sekunden dauert, bis der Standby-Koordinator die aktive Rolle übernommen hat.</p>
<pre><code translate="no" class="language-shell">[2022/09/21 11:58:33.855 +08:00] [DEBUG] [sessionutil/session_util.go:677] [<span class="hljs-string">&quot;watch the ACTIVE key&quot;</span>] [DELETE=<span class="hljs-string">&quot;key:\&quot;by-dev/meta/session/rootcoord\&quot; mod_revision:167 &quot;</span>]
[2022/09/21 11:58:33.856 +08:00] [DEBUG] [sessionutil/session_util.go:677] [<span class="hljs-string">&quot;watch the ACTIVE key&quot;</span>] [DELETE=<span class="hljs-string">&quot;key:\&quot;by-dev/meta/session/rootcoord-15\&quot; mod_revision:167 &quot;</span>]
[2022/09/21 11:58:33.856 +08:00] [INFO] [sessionutil/session_util.go:683] [<span class="hljs-string">&quot;stop watching ACTIVE key&quot;</span>]
[2022/09/21 11:58:33.856 +08:00] [INFO] [sessionutil/session_util.go:655] [<span class="hljs-string">&quot;start retrying to register as ACTIVE service...&quot;</span>]
[2022/09/21 11:58:33.859 +08:00] [INFO] [sessionutil/session_util.go:641] [<span class="hljs-string">&quot;register ACTIVE service successfully&quot;</span>] [ServerID=19]
[2022/09/21 11:58:33.859 +08:00] [INFO] [sessionutil/session_util.go:690] [<span class="hljs-string">&quot;quit STANDBY mode, this node will become ACTIVE&quot;</span>]
[2022/09/21 11:58:33.859 +08:00] [INFO] [rootcoord/root_coord.go:638] [<span class="hljs-string">&quot;rootcoord switch from standby to active, activating&quot;</span>]
[2022/09/21 11:58:33.859 +08:00] [INFO] [rootcoord/root_coord.go:306] [<span class="hljs-string">&quot;RootCoord Register Finished&quot;</span>]
[2022/09/21 11:58:33.859 +08:00] [DEBUG] [rootcoord/service.go:148] [<span class="hljs-string">&quot;RootCoord start done ...&quot;</span>]
[2022/09/21 11:58:33.859 +08:00] [DEBUG] [components/root_coord.go:58] [<span class="hljs-string">&quot;RootCoord successfully started&quot;</span>]
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Related-configuration-items" class="common-anchor-header">Zugehörige Konfigurationselemente<button data-href="#Related-configuration-items" class="anchor-icon" translate="no">
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
    </button></h2><p>Coordinator HA ist standardmäßig deaktiviert. Sie können diese Funktion manuell aktivieren, indem Sie die folgenden Elemente in Ihrer Milvus-Konfigurationsdatei ändern.</p>
<ul>
<li><a href="/docs/de/v2.4.x/configure_rootcoord.md#rootCoordactiveStandbyenabled">rootCoord.activeStandby.enabled</a></li>
<li><a href="/docs/de/v2.4.x/configure_querycoord.md#queryCoordactiveStandbyenabled">queryCoord.activeStandby.enabled</a></li>
<li><a href="/docs/de/v2.4.x/configure_datacoord.md#dataCoordactiveStandbyenabled">dataCoord.activeStandby.enabled</a></li>
</ul>
<h2 id="Limits" class="common-anchor-header">Begrenzt<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Derzeit gibt es keine starke Konsistenzgarantie zwischen dem aktiven und dem Standby-Dienst. Daher muss der Standby-Koordinator die Metadaten neu laden, wenn er die aktive Rolle übernimmt.</p>
<p>Etcd gibt einen Lease erst dann frei, wenn die aktuelle Sitzung eine Zeitüberschreitung aufweist. Der Standardwert für die Sitzungsdauer beträgt 60 Sekunden. Daher vergehen 60 Sekunden zwischen dem Tod des aktiven Koordinators und der Übernahme der aktiven Rolle durch den Standby-Koordinator.</p>
