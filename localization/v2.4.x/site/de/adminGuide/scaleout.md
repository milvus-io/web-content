---
id: scaleout.md
related_key: scale Milvus cluster
summary: >-
  Erfahren Sie, wie Sie einen Milvus-Cluster manuell oder automatisch skalieren
  und skalieren können.
title: Skalieren eines Milvus-Clusters
---
<h1 id="Scale-a-Milvus-Cluster" class="common-anchor-header">Skalierung eines Milvus-Clusters<button data-href="#Scale-a-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus unterstützt die horizontale Skalierung seiner Komponenten. Das bedeutet, dass Sie die Anzahl der Arbeitsknoten jedes Typs je nach Bedarf entweder erhöhen oder verringern können.</p>
<p>Dieses Thema beschreibt, wie Sie einen Milvus-Cluster skalieren können. Wir gehen davon aus, dass Sie vor der Skalierung bereits <a href="/docs/de/v2.4.x/install_cluster-helm.md">einen Milvus-Cluster installiert</a> haben. Außerdem empfehlen wir Ihnen, sich mit der <a href="/docs/de/v2.4.x/architecture_overview.md">Milvus-Architektur</a> vertraut zu machen, bevor Sie beginnen.</p>
<p>In diesem Tutorial wird die Skalierung von drei Abfrageknoten als Beispiel verwendet. Um andere Knotentypen zu skalieren, ersetzen Sie <code translate="no">queryNode</code> durch den entsprechenden Knotentyp in der Befehlszeile.</p>
<div class="alert note">
<p>Informationen über die Skalierung eines Clusters mit Milvus Operator finden Sie unter <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/scale-a-milvus-cluster.md">Skalierung eines Clusters mit Milvus Operator</a>.</p>
</div>
<h2 id="What-is-horizontal-scaling" class="common-anchor-header">Was ist horizontale Skalierung?<button data-href="#What-is-horizontal-scaling" class="anchor-icon" translate="no">
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
    </button></h2><p>Die horizontale Skalierung umfasst die Skalierung nach außen und die Skalierung nach innen.</p>
<h3 id="Scaling-out" class="common-anchor-header">Skalierung nach außen</h3><p>Unter Skalierung nach außen versteht man die Erhöhung der Anzahl der Knoten in einem Cluster. Anders als bei der Skalierung nach oben müssen Sie bei der Skalierung nach außen nicht einem Knoten im Cluster mehr Ressourcen zuweisen. Stattdessen wird der Cluster durch das Hinzufügen weiterer Knoten horizontal erweitert.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scale_out.jpg" alt="Scaleout" class="doc-image" id="scaleout" />
   </span> <span class="img-wrapper"> <span>Scaleout</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scale_up.jpg" alt="Scaleup" class="doc-image" id="scaleup" />
   </span> <span class="img-wrapper"> <span>Hochskalieren</span> </span></p>
<p>Gemäß der <a href="/docs/de/v2.4.x/architecture_overview.md">Milvus-Architektur</a> umfassen die zustandslosen Arbeitsknoten Abfrageknoten, Datenknoten, Indexknoten und Proxy. Daher können Sie diese Art von Knoten entsprechend Ihren Geschäftsanforderungen und Anwendungsszenarien ausbauen. Sie können den Milvus-Cluster entweder manuell oder automatisch skalieren.</p>
<p>Im Allgemeinen müssen Sie den Milvus-Cluster, den Sie erstellt haben, skalieren, wenn er übermäßig ausgelastet ist. Nachfolgend sind einige typische Situationen aufgeführt, in denen Sie den Milvus-Cluster ausbauen müssen:</p>
<ul>
<li>Die CPU- und Speicherauslastung ist über einen bestimmten Zeitraum hinweg hoch.</li>
<li>Der Abfragedurchsatz wird höher.</li>
<li>Eine höhere Geschwindigkeit für die Indizierung ist erforderlich.</li>
<li>Massive Mengen an großen Datensätzen müssen verarbeitet werden.</li>
<li>Eine hohe Verfügbarkeit des Milvus-Dienstes muss gewährleistet sein.</li>
</ul>
<h3 id="Scaling-in" class="common-anchor-header">Skalierung nach innen</h3><p>Unter Skalierung versteht man die Verringerung der Anzahl der Knoten in einem Cluster. Im Allgemeinen müssen Sie den von Ihnen erstellten Milvus-Cluster skalieren, wenn er nicht ausgelastet ist. Im Folgenden sind einige typische Situationen aufgeführt, in denen Sie den Milvus-Cluster skalieren müssen:</p>
<ul>
<li>Die CPU- und Speicherauslastung ist über einen bestimmten Zeitraum hinweg niedrig.</li>
<li>Der Abfragedurchsatz wird geringer.</li>
<li>Eine höhere Geschwindigkeit für die Indizierung ist nicht erforderlich.</li>
<li>Die Größe des zu verarbeitenden Datensatzes ist gering.</li>
</ul>
<div class="alert note">
Es wird nicht empfohlen, die Anzahl der Worker-Knoten drastisch zu reduzieren. Wenn beispielsweise fünf Datenknoten im Cluster vorhanden sind, empfehlen wir, jeweils einen Datenknoten zu reduzieren, um die Verfügbarkeit des Dienstes sicherzustellen. Wenn der Dienst nach dem ersten Versuch der Skalierung verfügbar ist, können Sie die Anzahl der Datenknoten weiter reduzieren.</div>
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
    </button></h2><p>Führen Sie <code translate="no">kubectl get pods</code> aus, um eine Liste der Komponenten und ihres Arbeitsstatus in dem von Ihnen erstellten Milvus-Cluster zu erhalten.</p>
<pre><code translate="no">NAME                                            READY   STATUS       RESTARTS   AGE
my-release-etcd-0                               1/1     Running      0          1m
my-release-milvus-datacoord-7b5d84d8c6-rzjml    1/1     Running      0          1m
my-release-milvus-datanode-665d4586b9-525pm     1/1     Running      0          1m
my-release-milvus-indexcoord-9669d5989-kr5cm    1/1     Running      0          1m
my-release-milvus-indexnode-b89cc5756-xbpbn     1/1     Running      0          1m
my-release-milvus-proxy-7cbcc8ffbc-4jn8d        1/1     Running      0          1m
my-release-milvus-pulsar-6b9754c64d-4tg4m       1/1     Running      0          1m
my-release-milvus-querycoord-75f6c789f8-j28bg   1/1     Running      0          1m
my-release-milvus-querynode-7c7779c6f8-pnjzh    1/1     Running      0          1m
my-release-milvus-rootcoord-75585dc57b-cjh87    1/1     Running      0          1m
my-release-minio-5564fbbddc-9sbgv               1/1     Running      0          1m 
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Milvus unterstützt nur das Hinzufügen der Worker Nodes, nicht aber das Hinzufügen der Coordinator-Komponenten.</div>
<h2 id="Scale-a-Milvus-cluster" class="common-anchor-header">Skalieren eines Milvus-Clusters<button data-href="#Scale-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können Ihren Milvus-Cluster entweder manuell oder automatisch skalieren. Wenn die automatische Skalierung aktiviert ist, wird der Milvus-Cluster automatisch verkleinert oder vergrößert, wenn der Verbrauch von CPU- und Speicherressourcen den von Ihnen festgelegten Wert erreicht.</p>
<p>Derzeit unterstützt Milvus 2.1.0 nur die manuelle Ein- und Auslagerung.</p>
<h4 id="Scaling-out" class="common-anchor-header">Verkleinern</h4><p>Führen Sie <code translate="no">helm upgrade my-release milvus/milvus --set queryNode.replicas=3 --reuse-values</code> aus, um den Abfrageknoten manuell zu verkleinern.</p>
<p>Wenn dies erfolgreich ist, werden drei laufende Pods auf dem Abfrageknoten hinzugefügt, wie im folgenden Beispiel gezeigt.</p>
<pre><code translate="no">NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          2m
my-release-milvus-datacoord-7b5d84d8c6-rzjml    1/1     Running   0          2m
my-release-milvus-datanode-665d4586b9-525pm     1/1     Running   0          2m
my-release-milvus-indexcoord-9669d5989-kr5cm    1/1     Running   0          2m
my-release-milvus-indexnode-b89cc5756-xbpbn     1/1     Running   0          2m
my-release-milvus-proxy-7cbcc8ffbc-4jn8d        1/1     Running   0          2m
my-release-milvus-pulsar-6b9754c64d-4tg4m       1/1     Running   0          2m
my-release-milvus-querycoord-75f6c789f8-j28bg   1/1     Running   0          2m
my-release-milvus-querynode-7c7779c6f8-czq9f    1/1     Running   0          5s
my-release-milvus-querynode-7c7779c6f8-jcdcn    1/1     Running   0          5s
my-release-milvus-querynode-7c7779c6f8-pnjzh    1/1     Running   0          2m
my-release-milvus-rootcoord-75585dc57b-cjh87    1/1     Running   0          2m
my-release-minio-5564fbbddc-9sbgv               1/1     Running   0          2m
<button class="copy-code-btn"></button></code></pre>
<h4 id="Scaling-in" class="common-anchor-header">Skalierung nach innen</h4><p>Führen Sie <code translate="no">helm upgrade my-release milvus/milvus --set queryNode.replicas=1 --reuse-values</code> aus, um den Abfrageknoten zu vergrößern.</p>
<p>Bei Erfolg werden drei laufende Pods auf dem Abfrageknoten auf einen reduziert, wie im folgenden Beispiel dargestellt.</p>
<pre><code translate="no">NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          2m
my-release-milvus-datacoord-7b5d84d8c6-rzjml    1/1     Running   0          2m
my-release-milvus-datanode-665d4586b9-525pm     1/1     Running   0          2m
my-release-milvus-indexcoord-9669d5989-kr5cm    1/1     Running   0          2m
my-release-milvus-indexnode-b89cc5756-xbpbn     1/1     Running   0          2m
my-release-milvus-proxy-7cbcc8ffbc-4jn8d        1/1     Running   0          2m
my-release-milvus-pulsar-6b9754c64d-4tg4m       1/1     Running   0          2m
my-release-milvus-querycoord-75f6c789f8-j28bg   1/1     Running   0          2m
my-release-milvus-querynode-7c7779c6f8-pnjzh    1/1     Running   0          2m
my-release-milvus-rootcoord-75585dc57b-cjh87    1/1     Running   0          2m
my-release-minio-5564fbbddc-9sbgv               1/1     Running   0          2m
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">Wie geht es weiter?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Wenn Sie lernen möchten, wie Sie die Milvus-Dienste überwachen und Warnungen erstellen können:</p>
<ul>
<li>Lernen Sie <a href="/docs/de/v2.4.x/monitor.md">Monitor Milvus mit Prometheus Operator auf Kubernetes</a></li>
</ul></li>
<li><p>Wenn Sie bereit sind, Ihren Cluster in der Cloud einzusetzen:</p>
<ul>
<li>Lernen Sie, wie Sie <a href="/docs/de/v2.4.x/eks.md">Milvus auf Amazon EKS mit Terraform bereitstellen</a> können</li>
<li>Lernen Sie, wie Sie <a href="/docs/de/v2.4.x/gcp.md">Milvus Cluster auf GCP mit Kubernetes bereitstellen</a> können</li>
<li>Erfahren Sie, wie Sie <a href="/docs/de/v2.4.x/azure.md">Milvus auf Microsoft Azure mit Kubernetes bereitstellen</a> können</li>
</ul></li>
<li><p>Wenn Sie nach einer Anleitung für die Ressourcenzuweisung suchen:</p>
<ul>
<li><a href="/docs/de/v2.4.x/allocate.md#standalone">Ressourcen auf Kubernetes zuweisen</a></li>
</ul></li>
</ul>
