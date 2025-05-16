---
id: prerequisite-helm.md
label: Install on Kubernetes
related_key: Kubernetes
summary: Conozca los preparativos necesarios antes de instalar Milvus con Helm.
title: Requisitos para ejecutar Milvus en Kubernetes
---
<h1 id="Requirements-for-running-Milvus-on-Kubernetes" class="common-anchor-header">Requisitos para ejecutar Milvus en Kubernetes<button data-href="#Requirements-for-running-Milvus-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta página enumera los requisitos de hardware y software para poner en marcha Milvus.</p>
<h2 id="Hardware-requirements" class="common-anchor-header">Requisitos de hardware<button data-href="#Hardware-requirements" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Componente</th><th>Requisito</th><th>Recomendación</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td><ul><li>CPU Intel 2nd Gen Core o superior</li><li>Silicio Apple</li></ul></td><td><ul><li>Independiente: 4 núcleos o más</li><li>Clúster: 8 núcleos o más</li></ul></td><td></td></tr>
<tr><td>Conjunto de instrucciones de la CPU</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>La búsqueda de similitud vectorial y la creación de índices en Milvus requieren que la CPU soporte conjuntos de extensiones SIMD (instrucción única, datos múltiples). Asegúrese de que la CPU soporta al menos una de las extensiones SIMD listadas. Consulte <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">CPUs con AVX</a> para obtener más información.</td></tr>
<tr><td>RAM</td><td><ul><li>Independiente: 8G</li><li>Clúster: 32G</li></ul></td><td><ul><li>Independiente: 16G</li><li>Clúster: 128G</li></ul></td><td>El tamaño de la RAM depende del volumen de datos.</td></tr>
<tr><td>Disco duro</td><td>SSD SATA 3.0 o CloudStorage</td><td>NVMe SSD o superior</td><td>El tamaño del disco duro depende del volumen de datos.</td></tr>
</tbody>
</table>
<h2 id="Software-requirements" class="common-anchor-header">Requisitos de software<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>Se recomienda ejecutar el clúster Kubernetes en plataformas Linux.</p>
<p>kubectl es la herramienta de línea de comandos para Kubernetes. Utilice una versión de kubectl que esté dentro de una diferencia de versión menor de su clúster. El uso de la última versión de kubectl ayuda a evitar problemas imprevistos.</p>
<p>minikube es necesario cuando se ejecuta el clúster Kubernetes localmente. minikube requiere Docker como dependencia. Asegúrese de instalar Docker antes de instalar Milvus utilizando Helm. Consulte <a href="https://docs.docker.com/get-docker">Obtener Docker</a> para obtener más información.</p>
<table>
<thead>
<tr><th>Sistema operativo</th><th>Software</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>Plataformas Linux</td><td><ul><li>Kubernetes 1.16 o posterior</li><li>kubectl</li><li>Helm 3.0.0 o posterior</li><li>minikube (para Milvus independiente)</li><li>Docker 19.03 o posterior (para Milvus standalone)</li></ul></td><td>Consulte <a href="https://helm.sh/docs/">Helm Docs</a> para obtener más información.</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>Software</th><th>Versión</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>Consulte <a href="#Additional-disk-requirements">los requisitos de disco adicionales</a>.</td></tr>
<tr><td>MinIO</td><td>RELEASE.2023-03-20T20-16-18Z</td><td></td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td></td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">Requisitos adicionales del disco</h3><p>El rendimiento del disco es crítico para etcd. Se recomienda encarecidamente utilizar unidades SSD NVMe locales. Una respuesta más lenta del disco puede causar frecuentes elecciones de cluster que acabarán degradando el servicio etcd.</p>
<p>Para comprobar si su disco está cualificado, utilice <a href="https://github.com/axboe/fio">fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>Idealmente, su disco debería alcanzar más de 500 IOPS y por debajo de 10ms para el percentil 99 de latencia fsync. Lee <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">los Docs</a> de etcd para requisitos más detallados.</p>
<h2 id="FAQs" class="common-anchor-header">Preguntas frecuentes<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">¿Cómo puedo iniciar un clúster K8s localmente para realizar pruebas?</h3><p>Puede utilizar herramientas como <a href="https://minikube.sigs.k8s.io/docs/">minikube</a>, <a href="https://kind.sigs.k8s.io/">kind</a> y <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a> para configurar rápidamente un clúster Kubernetes de forma local. El siguiente procedimiento utiliza minikube como ejemplo.</p>
<ol>
<li>Descargar minikube</li>
</ol>
<p>Vaya a la página <a href="https://minikube.sigs.k8s.io/docs/start/">Get Started</a>, compruebe si cumple las condiciones enumeradas en la sección <strong>What you'll need</strong>, haga clic en los botones que describen su plataforma de destino y copie los comandos para descargar e instalar el binario.</p>
<ol start="2">
<li>Iniciar un clúster K8s utilizando minikube</li>
</ol>
<pre><code translate="no" class="language-shell">$ minikube start
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Compruebe el estado del clúster K8s</li>
</ol>
<p>Puede comprobar el estado del clúster K8s instalado utilizando el siguiente comando.</p>
<pre><code translate="no" class="language-shell">$ kubectl cluster-info
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Asegúrese de que puede acceder al cluster K8s a través de <code translate="no">kubectl</code>. Si no ha instalado <code translate="no">kubectl</code> localmente, consulte <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">Usar kubectl dentro de minikube</a>.</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">Qué hacer a continuación<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Si su hardware y software cumplen con los requisitos, usted puede:</p>
<ul>
<li><a href="/docs/es/v2.4.x/install_cluster-milvusoperator.md">Ejecutar Milvus en Kubernets con Milvus Operator</a></li>
<li><a href="/docs/es/v2.4.x/install_cluster-helm.md">Ejecutar Milvus en Kubernetes con Helm</a></li>
</ul></li>
<li><p>Consulte <a href="/docs/es/v2.4.x/system_configuration.md">Configuración del Sistema</a> para conocer los parámetros que puede establecer mientras instala Milvus.</p></li>
</ul>
