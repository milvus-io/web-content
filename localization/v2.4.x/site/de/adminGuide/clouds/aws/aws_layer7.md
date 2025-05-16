---
id: aws_layer7.md
title: Einrichten eines Layer-7-Load-Balancers für Milvus auf AWS
related_key: cluster
summary: >-
  Erfahren Sie, wie Sie einen Milvus-Cluster hinter einem Layer-7-Loadbalancer
  auf AWS bereitstellen.
---
<h1 id="Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-AWS" class="common-anchor-header">Einrichten eines Layer-7-Load-Balancers für Milvus auf AWS<button data-href="#Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-AWS" class="anchor-icon" translate="no">
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
    </button></h1><p>Im Vergleich zu einem Layer-4-Load-Balancer bietet ein Layer-7-Load-Balancer intelligente Load-Balancing- und Caching-Funktionen und ist eine gute Wahl für Cloud-native Services.</p>
<p>Diese Anleitung führt Sie durch die Einrichtung eines Layer-7 Load Balancers für einen Milvus-Cluster, der bereits hinter einem Layer-4 Load Balancer läuft.</p>
<h3 id="Before-your-start" class="common-anchor-header">Bevor Sie beginnen</h3><ul>
<li>Sie haben <a href="/docs/de/v2.4.x/eks.md">einen Milvus-Cluster hinter einem Layer-4-Loadbalancer auf AWS bereitgestellt</a>.</li>
</ul>
<h3 id="Tweak-Milvus-configurations" class="common-anchor-header">Anpassen der Milvus-Konfigurationen</h3><p>In dieser Anleitung wird davon ausgegangen, dass Sie bereits <a href="/docs/de/v2.4.x/eks.md">einen Milvus-Cluster hinter einem Layer-4-Load-Balancer auf AWS bereitgestellt</a> haben.</p>
<p>Bevor Sie einen Layer-7-Loadbalancer für diesen Milvus-Cluster einrichten, führen Sie den folgenden Befehl aus, um den Layer-4-Loadbalancer zu entfernen.</p>
<pre><code translate="no" class="language-bash">helm upgrade milvus-demo milvus/milvus -n milvus --<span class="hljs-built_in">set</span> service.<span class="hljs-built_in">type</span>=ClusterIP
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-TLS-certificates" class="common-anchor-header">TLS-Zertifikate vorbereiten</h3><p>TLS erfordert Zertifikate, um zu funktionieren. Wir verwenden <a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html">ACM</a> zur Verwaltung von Zertifikaten und müssen ein vorhandenes Zertifikat in ACM importieren. Siehe <a href="https://docs.aws.amazon.com/acm/latest/userguide/import-certificate-api-cli.html#import-certificate-api">Zertifikat importieren</a>. Im Folgenden finden Sie ein Beispiel.</p>
<pre><code translate="no" class="language-bash"># If the <span class="hljs-keyword">import</span>-certificate command is successful, it returns the arn of the imported certificate.
aws acm <span class="hljs-keyword">import</span>-certificate --certificate fileb:<span class="hljs-comment">//Certificate.pem \</span>
      --certificate-chain fileb:<span class="hljs-comment">//CertificateChain.pem \</span>
      --private-key fileb:<span class="hljs-comment">//PrivateKey.pem  </span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-an-Ingress-to-generate-a-Layer-7-Load-Balancer" class="common-anchor-header">Erstellen Sie einen Ingress, um einen Layer-7 Load Balancer zu erzeugen</h3><p>Bereiten Sie die Ingress-Datei wie folgt vor und nennen Sie sie <code translate="no">ingress.yaml</code>. <strong>Ersetzen Sie das Zertifikat arn und host durch Ihr eigenes.</strong></p>
<pre><code translate="no" class="language-yaml">apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  namespace: milvus
  name: milvus-demo
  annotations:
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/backend-protocol-version: GRPC
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/listen-ports: <span class="hljs-string">&#x27;[{&quot;HTTPS&quot;:443}]&#x27;</span>
    alb.ingress.kubernetes.io/certificate-arn: <span class="hljs-string">&quot;arn:aws:acm:region:account-id:certificate/certificate-id&quot;</span>

spec:
  ingressClassName: alb
  rules:
    - host: milvus-demo.milvus.io
      http:
        paths:
        - path: /
          pathType: Prefix
          backend:
            service:
              name: milvus-demo
              port:
                number: 19530
<button class="copy-code-btn"></button></code></pre>
<p>Dann können Sie den Ingress erstellen, indem Sie die Datei auf Ihren EKS-Cluster anwenden.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ingress.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Warten Sie nun darauf, dass AWS den Layer-7-Loadbalancer einrichtet. Sie können den Fortschritt überprüfen, indem Sie</p>
<pre><code translate="no" class="language-bash">kubectl -f ingress.yaml <span class="hljs-keyword">get</span> -w
<button class="copy-code-btn"></button></code></pre>
<p>Die Ausgabe sollte in etwa so aussehen wie die folgende:</p>
<pre><code translate="no" class="language-shell">NAME          CLASS   HOSTS                   ADDRESS                                                                PORTS   AGE
milvus-demo   alb     milvus-demo.milvus.io   k8s-milvus-milvusde-2f72215c02-778371620.us-east-2.elb.amazonaws.com   80      10m
<button class="copy-code-btn"></button></code></pre>
<p>Sobald eine Adresse im Feld <strong>ADDRESS</strong> angezeigt wird, ist der Layer-7-Load-Balancer einsatzbereit.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    connections,
    utility,
    FieldSchema,
    CollectionSchema,
    DataType,
    Collection,
)

connections.connect(<span class="hljs-string">&quot;default&quot;</span>, host=<span class="hljs-string">&quot;k8s-milvus-milvusde-2f72215c02-778371620.us-east-2.elb.amazonaws.com&quot;</span>, port=<span class="hljs-string">&quot;443&quot;</span>, secure=<span class="hljs-literal">True</span>, server_name=<span class="hljs-string">&quot;milvus-demo.milvus.io&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Den <strong>host</strong> und <strong>server_name</strong> sollten Sie durch Ihren eigenen ersetzen.</li>
<li>Wenn Sie einen DNS-Eintrag eingerichtet haben, um den Domänennamen der alb zuzuordnen, ersetzen Sie <strong>host</strong> durch den Domänennamen und lassen Sie <strong>server_name</strong> weg.</li>
</ul>
</div>
