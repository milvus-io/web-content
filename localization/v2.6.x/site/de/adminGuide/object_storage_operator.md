---
id: object_storage_operator.md
title: Konfigurieren Sie den Objektspeicher mit Milvus Operator
related_key: 'minio, s3, storage, etcd, pulsar'
summary: 'Erfahren Sie, wie Sie Objektspeicher mit Milvus Operator konfigurieren.'
---
<h1 id="Configure-Object-Storage-with-Milvus-Operator" class="common-anchor-header">Konfigurieren Sie den Objektspeicher mit Milvus Operator<button data-href="#Configure-Object-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus verwendet MinIO oder S3 als Objektspeicher, um große Dateien, wie Indexdateien und binäre Protokolle, zu speichern. In diesem Thema wird beschrieben, wie Sie Objektspeicher-Abhängigkeiten konfigurieren, wenn Sie Milvus mit Milvus Operator installieren. Weitere Details finden Sie unter <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/object-storage.md">Konfigurieren von Objektspeicher mit Milvus Operator</a> im Milvus Operator-Repository.</p>
<p>Dieses Thema setzt voraus, dass Sie Milvus Operator installiert haben.</p>
<div class="alert note">Weitere Informationen finden Sie unter <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Bereitstellen von Milvus Operator</a>. </div>
<p>Sie müssen eine Konfigurationsdatei für die Verwendung von Milvus Operator angeben, um einen Milvus-Cluster zu starten.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-string">kubectl</span> <span class="hljs-string">apply</span> <span class="hljs-string">-f</span> <span class="hljs-string">https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sie müssen nur die Codevorlage in <code translate="no">milvus_cluster_default.yaml</code> bearbeiten, um die Abhängigkeiten von Dritten zu konfigurieren. In den folgenden Abschnitten wird beschrieben, wie Sie Objektspeicher, etcd und Pulsar konfigurieren.</p>
<h2 id="Configure-object-storage" class="common-anchor-header">Konfigurieren von Objektspeicher<button data-href="#Configure-object-storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Ein Milvus-Cluster verwendet MinIO oder S3 als Objektspeicher, um große Dateien wie Indexdateien und binäre Protokolle aufzubewahren. Fügen Sie die erforderlichen Felder unter <code translate="no">spec.dependencies.storage</code> hinzu, um den Objektspeicher zu konfigurieren. Mögliche Optionen sind <code translate="no">external</code> und <code translate="no">inCluster</code>.</p>
<h3 id="Internal-object-storage" class="common-anchor-header">Interner Objektspeicher</h3><p>Standardmäßig setzt Milvus Operator eine clusterinterne MinIO für Milvus ein. Im Folgenden wird anhand einer Beispielkonfiguration gezeigt, wie diese MinIO als interner Objektspeicher verwendet werden kann.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-comment"># Omit other fields ...</span>
    <span class="hljs-attr">storage:</span>
      <span class="hljs-attr">inCluster:</span>
        <span class="hljs-attr">values:</span>
          <span class="hljs-attr">mode:</span> <span class="hljs-string">standalone</span>
          <span class="hljs-attr">resources:</span>
            <span class="hljs-attr">requests:</span>
              <span class="hljs-attr">memory:</span> <span class="hljs-string">100Mi</span>
        <span class="hljs-attr">deletionPolicy:</span> <span class="hljs-string">Delete</span> <span class="hljs-comment"># Delete | Retain, default: Retain</span>
        <span class="hljs-attr">pvcDeletion:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># default: false</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nach der obigen Konfiguration läuft die In-Cluster-MinIO im Standalone-Modus mit einer Speicherbegrenzung von bis zu 100Mi. Beachten Sie Folgendes</p>
<ul>
<li><p>Das Feld <code translate="no">deletionPolicy</code> gibt die Löschrichtlinie für die clusterinterne MinIO an. Der Standardwert ist <code translate="no">Delete</code> und die alternative Option ist <code translate="no">Retain</code>.</p>
<ul>
<li><code translate="no">Delete</code> gibt an, dass der In-Cluster-Objektspeicher gelöscht wird, wenn Sie Ihre Milvus-Instanz stoppen.</li>
<li><code translate="no">Retain</code> gibt an, dass der In-Cluster-Objektspeicher als Abhängigkeitsdienst für spätere Starts Ihrer Milvus-Instanz beibehalten wird.</li>
</ul></li>
<li><p>Das Feld <code translate="no">pvcDeletion</code> gibt an, ob der PVC (Persistent Volume Claim) gelöscht werden soll, wenn der In-Cluster-MINIO gelöscht wird.</p></li>
</ul>
<p>Die Felder unter <code translate="no">inCluster.values</code> sind die gleichen wie die in Milvus Helm Chart, und Sie finden sie <a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/minio/values.yaml">hier</a>.</p>
<h3 id="External-object-storage" class="common-anchor-header">Externer Objektspeicher</h3><p>Die Verwendung von <code translate="no">external</code> in der Vorlage YAML-Datei weist auf die Verwendung eines externen Objektspeicherdienstes hin. Um einen externen Objektspeicher zu verwenden, müssen Sie die Felder unter <code translate="no">spec.dependencies.storage</code> und <code translate="no">spec.config.minio</code> in der Milvus CRD richtig einstellen.</p>
<h4 id="Use-Amazon-Web-Service-AWS-S3-as-external-object-storage" class="common-anchor-header">Verwenden Sie Amazon Web Service (AWS) S3 als externen Objektspeicher</h4><ul>
<li><p>Konfigurieren Sie den AWS S3-Zugriff durch AK/SK</p>
<p>Auf einen S3-Bucket kann in der Regel mit einem Paar aus einem Zugriffsschlüssel und einem Zugriffsgeheimnisschlüssel zugegriffen werden. Sie können ein <code translate="no">Secret</code> Objekt erstellen, um sie in Ihrer Kubernetes wie folgt zu speichern:</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Secret</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-s3-secret</span>
<span class="hljs-attr">type:</span> <span class="hljs-string">Opaque</span>
<span class="hljs-attr">stringData:</span>
  <span class="hljs-attr">accesskey:</span> <span class="hljs-string">&lt;my-access-key&gt;</span>
  <span class="hljs-attr">secretkey:</span> <span class="hljs-string">&lt;my-secret-key&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dann können Sie einen AWS S3-Bucket als externen Objektspeicher konfigurieren:</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">minio:</span>
      <span class="hljs-comment"># your bucket name</span>
      <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&lt;my-bucket&gt;</span>
      <span class="hljs-comment"># Optional, config the prefix of the bucket milvus will use</span>
      <span class="hljs-attr">rootPath:</span> <span class="hljs-string">milvus/my-release</span>
      <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">storage:</span>
      <span class="hljs-comment"># enable external object storage</span>
      <span class="hljs-attr">external:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">type:</span> <span class="hljs-string">S3</span> <span class="hljs-comment"># MinIO | S3</span>
      <span class="hljs-comment"># the endpoint of AWS S3</span>
      <span class="hljs-attr">endpoint:</span> <span class="hljs-string">s3.amazonaws.com:443</span>
      <span class="hljs-comment"># the secret storing the access key and secret key</span>
      <span class="hljs-attr">secretRef:</span> <span class="hljs-string">&quot;my-release-s3-secret&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>AWS S3-Zugriff durch AssumeRole konfigurieren</p>
<p>Alternativ können Sie Milvus mit <a href="https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html">AssumeRole</a> auf Ihr AWS S3-Bucket zugreifen lassen, so dass nur temporäre Anmeldeinformationen anstelle Ihrer tatsächlichen AK/SK beteiligt sind.</p>
<p>Wenn Sie dies bevorzugen, müssen Sie eine Rolle in Ihrer AWS-Konsole vorbereiten und ihren ARN erhalten, der normalerweise die Form <code translate="no">arn:aws:iam::&lt;your account id&gt;:role/&lt;role-name&gt;</code> hat.</p>
<p>Erstellen Sie dann wie folgt ein <code translate="no">ServiceAccount</code> Objekt, um es in Ihrer Kubernetes zu speichern:</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">ServiceAccount</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-sa</span>
  <span class="hljs-attr">annotations:</span>
    <span class="hljs-attr">eks.amazonaws.com/role-arn:</span> <span class="hljs-string">&lt;my-role-arn&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Wenn Sie alles vorbereitet haben, verweisen Sie in der YAML-Vorlagendatei auf das obige <code translate="no">ServiceAccount</code> und setzen <code translate="no">spec.config.minio.useIAM</code> auf <code translate="no">true</code>, um AssumeRole zu aktivieren.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-comment"># use the above ServiceAccount</span>
    <span class="hljs-attr">serviceAccountName:</span> <span class="hljs-string">my-release-sa</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">minio:</span>
      <span class="hljs-comment"># enable AssumeRole</span>
      <span class="hljs-attr">useIAM:</span> <span class="hljs-literal">true</span>
      <span class="hljs-comment"># Omit other fields ...</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">storage:</span>
      <span class="hljs-comment"># Omit other fields ...</span>
      <span class="hljs-comment"># <span class="hljs-doctag">Note:</span> you must use regional endpoint here, otherwise the minio client that milvus uses will fail to connect</span>
      <span class="hljs-attr">endpoint:</span> <span class="hljs-string">s3.&lt;my-bucket-region&gt;.amazonaws.com:443</span>
      <span class="hljs-attr">secretRef:</span> <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># we don&#x27;t need to specify the secret here</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h4 id="Use-Google-Cloud-Storage-GCS-as-external-object-storage" class="common-anchor-header">Google Cloud Storage (GCS) als externen Objektspeicher verwenden</h4><p>AWS S3 Objektspeicher ist nicht die einzige Wahl. Sie können auch den Objektspeicherdienst von anderen öffentlichen Cloud-Anbietern, wie Google Cloud, verwenden.</p>
<ul>
<li><p>Konfigurieren des GCS-Zugriffs durch AK/SK</p>
<p>Die Konfiguration ist größtenteils ähnlich wie bei der Verwendung von AWS S3. Sie müssen immer noch ein <code translate="no">Secret</code> Objekt erstellen, um Ihre Anmeldeinformationen in Ihrer Kubernetes zu speichern.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Secret</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-gcp-secret</span>
<span class="hljs-attr">type:</span> <span class="hljs-string">Opaque</span>
<span class="hljs-attr">stringData:</span>
  <span class="hljs-attr">accesskey:</span> <span class="hljs-string">&lt;my-access-key&gt;</span>
  <span class="hljs-attr">secretkey:</span> <span class="hljs-string">&lt;my-secret-key&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dann müssen Sie nur noch <code translate="no">endpoint</code> in <code translate="no">storage.googleapis.com:443</code> ändern und <code translate="no">spec.config.minio.cloudProvider</code> in <code translate="no">gcp</code> umwandeln:</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-comment"># # change the &lt;parameters&gt; to match your environment</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">minio:</span>
      <span class="hljs-attr">cloudProvider:</span> <span class="hljs-string">gcp</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">storage:</span>
      <span class="hljs-comment"># Omit other fields ...</span>
      <span class="hljs-attr">endpoint:</span> <span class="hljs-string">storage.googleapis.com:443</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Konfigurieren des GCS-Zugriffs durch AssumeRole</p>
<p>Ähnlich wie bei AWS S3 können Sie auch <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity">Workload Identity</a> verwenden, um mit temporären Anmeldeinformationen auf GCS zuzugreifen, wenn Sie GKE als Ihren Kubernetes-Cluster verwenden.</p>
<p>Die Beschriftung von <code translate="no">ServiceAccount</code> unterscheidet sich von der von AWS EKS. Sie müssen den Namen des GCP-Service-Kontos anstelle des ARN der Rolle angeben.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">ServiceAccount</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-sa</span>
  <span class="hljs-attr">annotations:</span>
    <span class="hljs-attr">iam.gke.io/gcp-service-account:</span> <span class="hljs-string">&lt;my-gcp-service-account-name&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Anschließend können Sie Ihre Milvus-Instanz so konfigurieren, dass sie die oben genannte <code translate="no">ServiceAccount</code> verwendet und AssumeRole aktiviert, indem Sie <code translate="no">spec.config.minio.useIAM</code> wie folgt auf <code translate="no">true</code> setzen:</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-comment"># use the above ServiceAccount</span>
    <span class="hljs-attr">serviceAccountName:</span> <span class="hljs-string">my-release-sa</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">minio:</span>
      <span class="hljs-attr">cloudProvider:</span> <span class="hljs-string">gcp</span>
      <span class="hljs-comment"># enable AssumeRole</span>
      <span class="hljs-attr">useIAM:</span> <span class="hljs-literal">true</span>
      <span class="hljs-comment"># Omit other fields ...  </span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
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
    </button></h2><p>Erfahren Sie, wie Sie andere Milvus-Abhängigkeiten mit Milvus Operator konfigurieren können:</p>
<ul>
<li><a href="/docs/de/meta_storage_operator.md">Konfigurieren Sie Meta Storage mit Milvus Operator</a></li>
<li><a href="/docs/de/message_storage_operator.md">Konfigurieren Sie den Nachrichtenspeicher mit Milvus Operator</a></li>
</ul>
