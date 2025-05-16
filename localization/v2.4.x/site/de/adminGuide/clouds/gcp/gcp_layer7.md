---
id: gcp_layer7.md
title: Einrichten eines Layer-7 Load Balancers für Milvus auf GCP
related_key: cluster
summary: >-
  Erfahren Sie, wie Sie einen Milvus-Cluster hinter einem Layer-7-Loadbalancer
  auf GCP bereitstellen.
---
<h1 id="Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-GCP" class="common-anchor-header">Einrichten eines Layer-7-Load-Balancers für Milvus auf GCP<button data-href="#Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-GCP" class="anchor-icon" translate="no">
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
    </button></h1><p>Im Vergleich zu einem Layer-4-Load Balancer bietet ein Layer-7-Load Balancer intelligente Load Balancing- und Caching-Funktionen und ist eine gute Wahl für Cloud-native Dienste.</p>
<p>Diese Anleitung führt Sie durch die Einrichtung eines Layer-7 Load Balancers für einen Milvus-Cluster, der bereits hinter einem Layer-4 Load Balancer läuft.</p>
<h3 id="Before-your-start" class="common-anchor-header">Bevor Sie beginnen</h3><ul>
<li><p>In Ihrem GCP-Konto ist bereits ein Projekt vorhanden.</p>
<p>Wie Sie ein Projekt erstellen, erfahren Sie unter <a href="https://cloud.google.com/resource-manager/docs/creating-managing-projects">Erstellen und Verwalten von Projekten</a>. Der Name des in diesem Leitfaden verwendeten Projekts ist <strong>milvus-testing-nonprod</strong>.</p></li>
<li><p>Sie haben <a href="https://cloud.google.com/sdk/docs/quickstart#installing_the_latest_version">gcloud CLI</a>, <a href="https://kubernetes.io/docs/tasks/tools/">kubectl</a> und <a href="https://helm.sh/docs/intro/install/">Helm</a> lokal installiert oder sich entschieden, stattdessen die browserbasierte <a href="https://cloud.google.com/shell">Cloud Shell</a> zu verwenden.</p></li>
<li><p>Sie haben <a href="https://cloud.google.com/sdk/docs/install-sdk#initializing_the">die gcloud CLI</a> mit Ihren GCP-Kontoanmeldeinformationen <a href="https://cloud.google.com/sdk/docs/install-sdk#initializing_the">initialisiert</a>.</p></li>
<li><p>Sie haben <a href="/docs/de/v2.4.x/gcp.md">einen Milvus-Cluster hinter einem Layer-4-Loadbalancer auf GCP bereitgestellt</a>.</p></li>
</ul>
<h3 id="Tweak-Milvus-configurations" class="common-anchor-header">Anpassen der Milvus-Konfigurationen</h3><p>In dieser Anleitung wird davon ausgegangen, dass Sie bereits <a href="/docs/de/v2.4.x/gcp.md">einen Milvus-Cluster hinter einem Layer-4-Loadbalancer auf GCP bereitgestellt</a> haben.</p>
<p>Bevor Sie einen Layer-7-Loadbalancer für diesen Milvus-Cluster einrichten, führen Sie den folgenden Befehl aus, um den Layer-4-Loadbalancer zu entfernen.</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release milvus/milvus --<span class="hljs-built_in">set</span> service.<span class="hljs-built_in">type</span>=ClusterIP
<button class="copy-code-btn"></button></code></pre>
<p>Als Backend-Dienst des Layer-7-Loadbalancers muss Milvus <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/ingress-http2">bestimmte Verschlüsselungsanforderungen</a> erfüllen, damit es die HTTP/2-Anfragen vom Loadbalancer verstehen kann. Daher müssen Sie TLS auf Ihrem Milvus-Cluster wie folgt aktivieren.</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release milvus/milvus -f tls.yaml
<button class="copy-code-btn"></button></code></pre>
<p>den tls.yaml-Inhalt:</p>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    common:
      security:
        tlsMode: 1
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-up-a-health-check-endpoint" class="common-anchor-header">Einrichten eines Gesundheitsprüfungs-Endpunkts</h3><p>Um die Verfügbarkeit des Dienstes zu gewährleisten, erfordert der Layer-7-Lastenausgleich auf GCP die Überprüfung des Zustands des Backend-Dienstes. Daher müssen wir eine BackendConfig einrichten, um den Gesundheitsprüfungs-Endpunkt zu verpacken und die BackendConfig mit dem Milvus-Dienst durch Anmerkungen zu verknüpfen.</p>
<p>Das folgende Snippet zeigt die BackendConfig-Einstellungen. Speichern Sie ihn als <code translate="no">backendconfig.yaml</code> zur späteren Verwendung.</p>
<pre><code translate="no" class="language-yaml">apiVersion: cloud.google.com/v1
kind: BackendConfig
metadata:
  name: my-release-backendconfig
  namespace: default
spec:
  healthCheck:
    port: 9091
    requestPath: /healthz
    <span class="hljs-built_in">type</span>: HTTP
<button class="copy-code-btn"></button></code></pre>
<p>Führen Sie dann den folgenden Befehl aus, um den Gesundheitsprüfungsendpunkt zu erstellen.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f backendconfig.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Aktualisieren Sie schließlich die Anmerkungen des Milvus-Dienstes, um den Layer-7-Loadbalancer, den wir später erstellen werden, aufzufordern, Gesundheitsprüfungen über den soeben erstellten Endpunkt durchzuführen.</p>
<pre><code translate="no" class="language-bash">kubectl annotate service my-release-milvus \
    cloud.google.com/app-protocols=<span class="hljs-string">&#x27;{&quot;milvus&quot;:&quot;HTTP2&quot;}&#x27;</span> \
    cloud.google.com/backend-config=<span class="hljs-string">&#x27;{&quot;default&quot;: &quot;my-release-backendconfig&quot;}&#x27;</span> \
    cloud.google.com/neg=<span class="hljs-string">&#x27;{&quot;ingress&quot;: true}&#x27;</span> --overwrite
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>Was die erste Anmerkung betrifft,</p>
<p>Milvus ist nativ für gRPC, das auf HTTP/2 aufgebaut ist. Daher können wir HTTP/2 als Kommunikationsprotokoll zwischen dem Layer-7 Load Balancer und Milvus verwenden.</p></li>
<li><p>Was die zweite Anmerkung betrifft,</p>
<p>Milvus bietet nur den Endpunkt für die Gesundheitsprüfung über gRPC und HTTP/1 an. Wir müssen eine BackendConfig einrichten, um den Endpunkt für die Gesundheitsprüfung zu verpacken und ihn mit dem Milvus-Dienst zu verknüpfen, damit der Layer-7-Load-Balancer diesen Endpunkt auf den Gesundheitszustand von Milvus prüft.</p></li>
<li><p>Was die dritte Anmerkung betrifft,</p>
<p>Sie fordert die Erstellung einer Netzwerkendpunktgruppe (NEG), nachdem ein Ingress erstellt wurde. Wenn NEGs mit GKE-Ingress verwendet werden, erleichtert der Ingress-Controller die Erstellung aller Aspekte des Load Balancer. Dazu gehören die Erstellung der virtuellen IP-Adresse, Weiterleitungsregeln, Zustandsprüfungen, Firewall-Regeln und vieles mehr. Einzelheiten finden Sie in den <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/container-native-load-balancing">Google Cloud-Dokumenten</a>.</p></li>
</ul>
</div>
<h3 id="Prepare-TLS-certificates" class="common-anchor-header">Vorbereiten von TLS-Zertifikaten</h3><p>TLS erfordert Zertifikate, um zu funktionieren. <strong>Es gibt zwei Möglichkeiten, Zertifikate zu erstellen, nämlich selbstverwaltete und von Google verwaltete.</strong></p>
<p>In dieser Anleitung wird <strong>my-release.milvus.io</strong> als Domainname für den Zugriff auf unseren Milvus-Dienst verwendet.</p>
<h4 id="Create-self-managed-certificates" class="common-anchor-header">Selbstverwaltete Zertifikate erstellen</h4><p>Führen Sie die folgenden Befehle aus, um ein Zertifikat zu erstellen.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-meta"># Generates a tls.key.</span>
openssl genrsa -<span class="hljs-keyword">out</span> tls.key <span class="hljs-number">2048</span>

<span class="hljs-meta"># Creates a certificate and signs it with the preceding key.</span>
openssl req -<span class="hljs-keyword">new</span> -key tls.key -<span class="hljs-keyword">out</span> tls.csr \
    -subj <span class="hljs-string">&quot;/CN=my-release.milvus.io&quot;</span>

openssl x509 -req -days <span class="hljs-number">99999</span> -<span class="hljs-keyword">in</span> tls.csr -signkey tls.key \
    -<span class="hljs-keyword">out</span> tls.crt
<button class="copy-code-btn"></button></code></pre>
<p>Erstellen Sie dann ein Geheimnis in Ihrem GKE-Cluster mit diesen Dateien zur späteren Verwendung.</p>
<pre><code translate="no" class="language-bash">kubectl create secret tls my-release-milvus-tls --cert=./tls.crt --key=./tls.key
<button class="copy-code-btn"></button></code></pre>
<h4 id="Create-Google-managed-certificates" class="common-anchor-header">Google-verwaltete Zertifikate erstellen</h4><p>Das folgende Snippet ist eine ManagedCertificate-Einstellung. Speichern Sie sie als <code translate="no">managed-crt.yaml</code> für die spätere Verwendung.</p>
<pre><code translate="no" class="language-yaml">apiVersion: networking.gke.io/v1
kind: ManagedCertificate
metadata:
  name: my-release-milvus-tls
spec:
  domains:
    - my-release.milvus.io
<button class="copy-code-btn"></button></code></pre>
<p>Erstellen Sie ein verwaltetes Zertifikat, indem Sie die Einstellung wie folgt auf Ihren GKE-Cluster anwenden:</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ./managed-crt.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Dies kann eine Weile dauern. Sie können den Fortschritt überprüfen, indem Sie</p>
<pre><code translate="no" class="language-bash">kubectl get -f ./managed-crt.yaml -o yaml -w
<button class="copy-code-btn"></button></code></pre>
<p>Die Ausgabe sollte in etwa so aussehen wie die folgende:</p>
<pre><code translate="no" class="language-shell">status:
  certificateName: mcrt-34446a53-d639-4764-8438-346d7871a76e
  certificateStatus: Provisioning
  domainStatus:
  - domain: my-release.milvus.io
    status: Provisioning
<button class="copy-code-btn"></button></code></pre>
<p>Sobald <strong>certificateStatus</strong> auf <strong>Active</strong> wechselt, können Sie den Load Balancer einrichten.</p>
<h3 id="Create-an-Ingress-to-generate-a-Layer-7-Load-Balancer" class="common-anchor-header">Erstellen Sie einen Ingress, um einen Layer-7 Load Balancer zu generieren</h3><p>Erstellen Sie eine YAML-Datei mit einem der folgenden Snippets.</p>
<ul>
<li><p>Selbst verwaltete Zertifikate verwenden</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion</span>: networking.<span class="hljs-property">k8s</span>.<span class="hljs-property">io</span>/v1
<span class="hljs-attr">kind</span>: <span class="hljs-title class_">Ingress</span>
<span class="hljs-attr">metadata</span>:
  <span class="hljs-attr">name</span>: my-release-milvus
  <span class="hljs-attr">namespace</span>: <span class="hljs-keyword">default</span>
<span class="hljs-attr">spec</span>:
  <span class="hljs-attr">tls</span>:
  - <span class="hljs-attr">hosts</span>:
    - my-release.<span class="hljs-property">milvus</span>.<span class="hljs-property">io</span>
    <span class="hljs-attr">secretName</span>: my-release-milvus-tls
  <span class="hljs-attr">rules</span>:
  - <span class="hljs-attr">host</span>: my-release.<span class="hljs-property">milvus</span>.<span class="hljs-property">io</span>
    <span class="hljs-attr">http</span>:
      <span class="hljs-attr">paths</span>:
      - <span class="hljs-attr">path</span>: /
        <span class="hljs-attr">pathType</span>: <span class="hljs-title class_">Prefix</span>
        <span class="hljs-attr">backend</span>:
          <span class="hljs-attr">service</span>:
            <span class="hljs-attr">name</span>: my-release-milvus
            <span class="hljs-attr">port</span>:
              <span class="hljs-attr">number</span>: <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Verwendung von Google-verwalteten Zertifikaten</p>
<pre><code translate="no" class="language-yaml">apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-release-milvus
  namespace: default
  annotations:
    networking.gke.io/managed-certificates: <span class="hljs-string">&quot;my-release-milvus-tls&quot;</span>
spec:
  rules:
  - host: my-release.milvus.io
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: my-release-milvus
            port:
              number: 19530
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Anschließend können Sie den Ingress erstellen, indem Sie die Datei auf Ihren GKE-Cluster anwenden.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ingress.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Warten Sie nun darauf, dass Google den Layer-7-Loadbalancer einrichtet. Sie können den Fortschritt überprüfen, indem Sie</p>
<pre><code translate="no" class="language-bash">kubectl  -f ./config/samples/ingress.yaml get -w
<button class="copy-code-btn"></button></code></pre>
<p>Die Ausgabe sollte in etwa so aussehen wie die folgende:</p>
<pre><code translate="no" class="language-shell">NAME                CLASS    HOSTS                  ADDRESS   PORTS   AGE
my-release-milvus   &lt;none&gt;   my-release.milvus.io             80      4s
my-release-milvus   &lt;none&gt;   my-release.milvus.io   34.111.144.65   80, 443   41m
<button class="copy-code-btn"></button></code></pre>
<p>Sobald eine IP-Adresse im Feld <strong>ADDRESS</strong> angezeigt wird, ist der Layer-7-Load-Balancer einsatzbereit. In der obigen Ausgabe werden sowohl Port 80 als auch Port 443 angezeigt. Denken Sie daran, dass Sie zu Ihrem eigenen Wohl immer Port 443 verwenden sollten.</p>
<h2 id="Verify-the-connection-through-the-Layer-7-load-balancer" class="common-anchor-header">Überprüfen Sie die Verbindung durch den Layer-7-Load-Balancer<button data-href="#Verify-the-connection-through-the-Layer-7-load-balancer" class="anchor-icon" translate="no">
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
    </button></h2><p>In dieser Anleitung wird PyMilvus verwendet, um die Verbindung zum Milvus-Dienst hinter dem soeben erstellten Layer-7-Load-Balancer zu überprüfen. Für detaillierte Schritte, <a href="https://milvus.io/docs/v2.3.x/example_code.md">lesen Sie dies</a>.</p>
<p>Beachten Sie, dass die Verbindungsparameter von der Art und Weise abhängen, wie Sie die Zertifikate in <a href="#prepare-tls-certificates">Prepare TLS certificates</a> verwalten.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    connections,
    utility,
    FieldSchema,
    CollectionSchema,
    DataType,
    Collection,
)

<span class="hljs-comment"># For self-managed certificates, you need to include the certificate in the parameters used to set up the connection.</span>
connections.connect(<span class="hljs-string">&quot;default&quot;</span>, host=<span class="hljs-string">&quot;34.111.144.65&quot;</span>, port=<span class="hljs-string">&quot;443&quot;</span>, server_pem_path=<span class="hljs-string">&quot;tls.crt&quot;</span>, secure=<span class="hljs-literal">True</span>, server_name=<span class="hljs-string">&quot;my-release.milvus.io&quot;</span>)

<span class="hljs-comment"># For Google-managed certificates, there is not need to do so.</span>
connections.connect(<span class="hljs-string">&quot;default&quot;</span>, host=<span class="hljs-string">&quot;34.111.144.65&quot;</span>, port=<span class="hljs-string">&quot;443&quot;</span>, secure=<span class="hljs-literal">True</span>, server_name=<span class="hljs-string">&quot;my-release.milvus.io&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Die IP-Adresse und die Portnummer in <strong>host</strong> und <strong>port</strong> sollten mit denen übereinstimmen, die am Ende von <a href="#create-an-ingress-to-generate-a-layer-7-load-balancer">Create an Ingress to generate a Layer-7 Load Balancer</a> aufgeführt sind.</li>
<li>Wenn Sie einen DNS-Eintrag eingerichtet haben, um den Domänennamen der Host-IP-Adresse zuzuordnen, ersetzen Sie die IP-Adresse in <strong>host</strong> durch den Domänennamen und lassen Sie <strong>server_name</strong> weg.</li>
</ul>
</div>
