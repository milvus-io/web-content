---
id: gcp_layer7.md
title: Configurar un equilibrador de carga de capa 7 para Milvus en GCP
related_key: cluster
summary: >-
  Aprenda a desplegar un clúster Milvus detrás de un equilibrador de carga
  Layer-7 en GCP.
---
<h1 id="Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-GCP" class="common-anchor-header">Configurar un equilibrador de carga de capa 7 para Milvus en GCP<button data-href="#Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-GCP" class="anchor-icon" translate="no">
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
<p>Esta guía le guía a través de la configuración de un equilibrador de carga de capa 7 para un cluster Milvus que ya se está ejecutando detrás de un equilibrador de carga de capa 4.</p>
<h3 id="Before-your-start" class="common-anchor-header">Antes de empezar</h3><ul>
<li><p>Ya existe un proyecto en su cuenta GCP.</p>
<p>Para crear un proyecto, consulte <a href="https://cloud.google.com/resource-manager/docs/creating-managing-projects">Creación y gestión de proyectos</a>. El nombre del proyecto utilizado en esta guía es <strong>milvus-testing-nonprod</strong>.</p></li>
<li><p>Ha instalado localmente <a href="https://cloud.google.com/sdk/docs/quickstart#installing_the_latest_version">gcloud CLI</a>, <a href="https://kubernetes.io/docs/tasks/tools/">kubectl</a> y <a href="https://helm.sh/docs/intro/install/">Helm</a>, o ha decidido utilizar en su lugar <a href="https://cloud.google.com/shell">Cloud Shell</a> basado en navegador.</p></li>
<li><p>Ha <a href="https://cloud.google.com/sdk/docs/install-sdk#initializing_the">inicializado gcloud CLI</a> con las credenciales de su cuenta GCP.</p></li>
<li><p>Ha <a href="/docs/es/v2.4.x/gcp.md">desplegado un clúster Milvus detrás de un equilibrador de carga Layer-4 en GCP</a>.</p></li>
</ul>
<h3 id="Tweak-Milvus-configurations" class="common-anchor-header">Ajustar las configuraciones de Milvus</h3><p>Esta guía asume que ya ha <a href="/docs/es/v2.4.x/gcp.md">desplegado un clúster Milvus detrás de un equilibrador de carga de Capa 4 en GCP</a>.</p>
<p>Antes de configurar un equilibrador de carga de Capa-7 para este clúster Milvus, ejecute el siguiente comando para eliminar el equilibrador de carga de Capa-4.</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release milvus/milvus --<span class="hljs-built_in">set</span> service.<span class="hljs-built_in">type</span>=ClusterIP
<button class="copy-code-btn"></button></code></pre>
<p>Como servicio backend del equilibrador de carga Layer-7, Milvus tiene que cumplir <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/ingress-http2">ciertos requisitos de encriptación</a> para que pueda entender las peticiones HTTP/2 del equilibrador de carga. Por lo tanto, necesita habilitar TLS en su cluster Milvus como se indica a continuación.</p>
<pre><code translate="no" class="language-bash">helm upgrade my-release milvus/milvus -f tls.yaml
<button class="copy-code-btn"></button></code></pre>
<p>el contenido de tls.yaml:</p>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    common:
      security:
        tlsMode: 1
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-up-a-health-check-endpoint" class="common-anchor-header">Configurar un punto final de comprobación de estado</h3><p>Para garantizar la disponibilidad del servicio, el equilibrio de carga de Capa 7 en GCP requiere sondear las condiciones de salud del servicio backend. Por lo tanto, necesitamos configurar una BackendConfig para envolver el punto final de comprobación de salud y asociar la BackendConfig con el servicio Milvus mediante anotaciones.</p>
<p>El siguiente fragmento es la configuración de BackendConfig. Guárdelo como <code translate="no">backendconfig.yaml</code> para su uso posterior.</p>
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
<p>A continuación, ejecute el siguiente comando para crear el punto final de comprobación de estado.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f backendconfig.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Por último, actualice las anotaciones del servicio Milvus para pedir al equilibrador de carga Layer-7 que crearemos más adelante que realice comprobaciones de salud utilizando el endpoint que acabamos de crear.</p>
<pre><code translate="no" class="language-bash">kubectl annotate service my-release-milvus \
    cloud.google.com/app-protocols=<span class="hljs-string">&#x27;{&quot;milvus&quot;:&quot;HTTP2&quot;}&#x27;</span> \
    cloud.google.com/backend-config=<span class="hljs-string">&#x27;{&quot;default&quot;: &quot;my-release-backendconfig&quot;}&#x27;</span> \
    cloud.google.com/neg=<span class="hljs-string">&#x27;{&quot;ingress&quot;: true}&#x27;</span> --overwrite
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>En cuanto a la primera anotación,</p>
<p>Milvus es nativo de gRPC, que se basa en HTTP/2. Por lo tanto, podemos utilizar HTTP/2 como protocolo de comunicación entre el equilibrador de carga Layer-7 y Milvus.</p></li>
<li><p>En cuanto a la segunda anotación,</p>
<p>Milvus sólo ofrece el punto final de comprobación de salud a través de gRPC y HTTP/1. Tenemos que configurar un BackendConfig para envolver el punto final de comprobación de salud y asociarlo con el servicio Milvus para que el equilibrador de carga Layer-7 sondee este punto final para conocer el estado de salud de Milvus.</p></li>
<li><p>En cuanto a la tercera anotación,</p>
<p>Solicita la creación de un grupo de extremos de red (NEG) después de crear un Ingress. Cuando se utilizan NEG con GKE Ingress, el controlador Ingress facilita la creación de todos los aspectos del equilibrador de carga. Esto incluye la creación de la dirección IP virtual, las reglas de reenvío, las comprobaciones de estado, las reglas de cortafuegos, etc. Para obtener más información, consulte <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/container-native-load-balancing">los documentos de Google Cloud</a>.</p></li>
</ul>
</div>
<h3 id="Prepare-TLS-certificates" class="common-anchor-header">Preparar certificados TLS</h3><p>TLS requiere certificados para funcionar. <strong>Existen dos formas de crear certificados: autogestionados y gestionados por Google.</strong></p>
<p>En esta guía se utiliza <strong>my-release.milvus.io</strong> como nombre de dominio para acceder a nuestro servicio Milvus.</p>
<h4 id="Create-self-managed-certificates" class="common-anchor-header">Crear certificados autogestionados</h4><p>Ejecute los siguientes comandos para crear un certificado.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-meta"># Generates a tls.key.</span>
openssl genrsa -<span class="hljs-keyword">out</span> tls.key <span class="hljs-number">2048</span>

<span class="hljs-meta"># Creates a certificate and signs it with the preceding key.</span>
openssl req -<span class="hljs-keyword">new</span> -key tls.key -<span class="hljs-keyword">out</span> tls.csr \
    -subj <span class="hljs-string">&quot;/CN=my-release.milvus.io&quot;</span>

openssl x509 -req -days <span class="hljs-number">99999</span> -<span class="hljs-keyword">in</span> tls.csr -signkey tls.key \
    -<span class="hljs-keyword">out</span> tls.crt
<button class="copy-code-btn"></button></code></pre>
<p>A continuación, cree un secreto en su clúster GKE con estos archivos para su uso posterior.</p>
<pre><code translate="no" class="language-bash">kubectl create secret tls my-release-milvus-tls --cert=./tls.crt --key=./tls.key
<button class="copy-code-btn"></button></code></pre>
<h4 id="Create-Google-managed-certificates" class="common-anchor-header">Crear certificados gestionados por Google</h4><p>El siguiente fragmento es una configuración de ManagedCertificate. Guárdalo como <code translate="no">managed-crt.yaml</code> para su uso posterior.</p>
<pre><code translate="no" class="language-yaml">apiVersion: networking.gke.io/v1
kind: ManagedCertificate
metadata:
  name: my-release-milvus-tls
spec:
  domains:
    - my-release.milvus.io
<button class="copy-code-btn"></button></code></pre>
<p>Crea un certificado gestionado aplicando la configuración a tu clúster de GKE como se indica a continuación:</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ./managed-crt.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Esto puede durar un rato. Puede comprobar el progreso ejecutando</p>
<pre><code translate="no" class="language-bash">kubectl get -f ./managed-crt.yaml -o yaml -w
<button class="copy-code-btn"></button></code></pre>
<p>El resultado debería ser similar al siguiente:</p>
<pre><code translate="no" class="language-shell">status:
  certificateName: mcrt-34446a53-d639-4764-8438-346d7871a76e
  certificateStatus: Provisioning
  domainStatus:
  - domain: my-release.milvus.io
    status: Provisioning
<button class="copy-code-btn"></button></code></pre>
<p>Una vez que <strong>certificateStatus</strong> cambie a <strong>Active</strong>, estará listo para configurar el equilibrador de carga.</p>
<h3 id="Create-an-Ingress-to-generate-a-Layer-7-Load-Balancer" class="common-anchor-header">Crear un Ingress para generar un equilibrador de carga de capa 7</h3><p>Cree un archivo YAML con uno de los siguientes fragmentos.</p>
<ul>
<li><p>Uso de certificados autogestionados</p>
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
<li><p>Usando certificados gestionados por Google</p>
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
<p>A continuación, puede crear el Ingress aplicando el archivo a su clúster GKE.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ingress.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Ahora, espere a que Google configure el equilibrador de carga de capa 7. Puede comprobar el progreso ejecutando</p>
<pre><code translate="no" class="language-bash">kubectl  -f ./config/samples/ingress.yaml get -w
<button class="copy-code-btn"></button></code></pre>
<p>El resultado debería ser similar al siguiente:</p>
<pre><code translate="no" class="language-shell">NAME                CLASS    HOSTS                  ADDRESS   PORTS   AGE
my-release-milvus   &lt;none&gt;   my-release.milvus.io             80      4s
my-release-milvus   &lt;none&gt;   my-release.milvus.io   34.111.144.65   80, 443   41m
<button class="copy-code-btn"></button></code></pre>
<p>Una vez que aparezca una dirección IP en el campo <strong>DIRECCIÓN</strong>, el equilibrador de carga Layer-7 estará listo para su uso. Tanto el puerto 80 como el 443 se muestran en la salida anterior. Recuerde que siempre debe utilizar el puerto 443 por su propio bien.</p>
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
<p>Observe que los parámetros de conexión varían según la forma que elija para gestionar los <a href="#prepare-tls-certificates">certificados</a> en <a href="#prepare-tls-certificates">Preparar certificados TLS</a>.</p>
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
<li>La dirección IP y el número de puerto en <strong>host</strong> y <strong>port</strong> deben coincidir con los que se indican al final de <a href="#create-an-ingress-to-generate-a-layer-7-load-balancer">Crear una entrada para generar un equilibrador de carga de capa 7</a>.</li>
<li>Si ha configurado un registro DNS para asignar el nombre de dominio a la dirección IP del host, sustituya la dirección IP en <strong>host</strong> por el nombre de dominio y omita <strong>server_name</strong>.</li>
</ul>
</div>
