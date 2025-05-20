---
id: aws_layer7.md
title: Configurar un balanceador de carga de capa 7 para Milvus en AWS
related_key: cluster
summary: >-
  Aprenda a implementar un clúster Milvus detrás de un equilibrador de carga
  Layer-7 en AWS.
---
<h1 id="Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-AWS" class="common-anchor-header">Configurar un balanceador de carga de capa 7 para Milvus en AWS<button data-href="#Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-AWS" class="anchor-icon" translate="no">
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
    </button></h1><p>En comparación con un equilibrador de carga de capa 4, un equilibrador de carga de capa 7 ofrece capacidades inteligentes de equilibrio de carga y almacenamiento en caché y es una gran opción para los servicios nativos de la nube.</p>
<p>Esta guía le guía a través de la configuración de un equilibrador de carga de capa 7 para un clúster Milvus que ya se está ejecutando detrás de un equilibrador de carga de capa 4.</p>
<h3 id="Before-your-start" class="common-anchor-header">Antes de empezar</h3><ul>
<li>Ha <a href="/docs/es/v2.4.x/eks.md">implementado un clúster Milvus detrás de un equilibrador de carga de capa 4 en AWS</a>.</li>
</ul>
<h3 id="Tweak-Milvus-configurations" class="common-anchor-header">Ajustar las configuraciones de Milvus</h3><p>Esta guía asume que ya ha <a href="/docs/es/v2.4.x/eks.md">implementado un clúster Milvus detrás de un equilibrador de carga de capa 4 en AWS</a>.</p>
<p>Antes de configurar un equilibrador de carga de capa 7 para este clúster Milvus, ejecute el siguiente comando para eliminar el equilibrador de carga de capa 4.</p>
<pre><code translate="no" class="language-bash">helm upgrade milvus-demo milvus/milvus -n milvus --<span class="hljs-built_in">set</span> service.<span class="hljs-built_in">type</span>=ClusterIP
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-TLS-certificates" class="common-anchor-header">Preparar certificados TLS</h3><p>TLS requiere certificados para funcionar. Estamos utilizando <a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html">ACM</a> para gestionar certificados y necesitamos importar un certificado existente en ACM. Consulte <a href="https://docs.aws.amazon.com/acm/latest/userguide/import-certificate-api-cli.html#import-certificate-api">Importar certificado</a>. A continuación se muestra un ejemplo.</p>
<pre><code translate="no" class="language-bash"># If the <span class="hljs-keyword">import</span>-certificate command is successful, it returns the arn of the imported certificate.
aws acm <span class="hljs-keyword">import</span>-certificate --certificate fileb:<span class="hljs-comment">//Certificate.pem \</span>
      --certificate-chain fileb:<span class="hljs-comment">//CertificateChain.pem \</span>
      --private-key fileb:<span class="hljs-comment">//PrivateKey.pem  </span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-an-Ingress-to-generate-a-Layer-7-Load-Balancer" class="common-anchor-header">Crear un Ingress para generar un equilibrador de carga de capa 7</h3><p>Prepare el archivo ingress como se indica a continuación y nómbrelo <code translate="no">ingress.yaml</code>. <strong>Sustituya el arn y el host del certificado por los suyos propios.</strong></p>
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
<p>A continuación, puede crear el Ingress aplicando el archivo a su clúster EKS.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ingress.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Ahora, espera a que AWS configure el balanceador de carga de capa 7. Puedes comprobar el progreso ejecutando</p>
<pre><code translate="no" class="language-bash">kubectl -f ingress.yaml <span class="hljs-keyword">get</span> -w
<button class="copy-code-btn"></button></code></pre>
<p>La salida debería ser similar a la siguiente:</p>
<pre><code translate="no" class="language-shell">NAME          CLASS   HOSTS                   ADDRESS                                                                PORTS   AGE
milvus-demo   alb     milvus-demo.milvus.io   k8s-milvus-milvusde-2f72215c02-778371620.us-east-2.elb.amazonaws.com   80      10m
<button class="copy-code-btn"></button></code></pre>
<p>Una vez que aparezca una dirección en el campo <strong>ADDRESS</strong>, el equilibrador de carga Layer-7 estará listo para su uso.</p>
<h2 id="Verify-the-connection-through-the-Layer-7-load-balancer" class="common-anchor-header">Verificar la conexión a través del equilibrador de carga Layer-7<button data-href="#Verify-the-connection-through-the-Layer-7-load-balancer" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta guía utiliza PyMilvus para verificar la conexión al servicio Milvus detrás del equilibrador de carga Layer-7 que acabamos de crear. Para pasos detallados, <a href="https://milvus.io/docs/v2.3.x/example_code.md">lea esto</a>.</p>
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
<li>El <strong>host</strong> y <strong>server_name</strong> deben ser reemplazados por los tuyos.</li>
<li>Si ha configurado un registro DNS para asignar el nombre de dominio al alb, sustituya el <strong>host</strong> por el nombre de dominio y omita <strong>server_name</strong>.</li>
</ul>
</div>
