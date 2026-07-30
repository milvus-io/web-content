---
id: prerequisite-helm.md
label: Install on Kubernetes
related_key: Kubernetes
summary: Infórmate sobre los preparativos necesarios antes de instalar Milvus con Helm.
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
    </button></h1><p>En esta página se enumeran los requisitos de hardware y software necesarios para poner en marcha Milvus.</p>
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
<tr><td>CPU</td><td><ul><li>CPU Intel Core de 2.ª generación o superior</li><li>Apple Silicon</li></ul></td><td><ul><li>Autónomo: 4 núcleos o más</li><li>Clúster: 8 núcleos o más</li></ul></td><td></td></tr>
<tr><td>Conjunto de instrucciones de la CPU</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>La búsqueda de similitud vectorial y la creación de índices en Milvus requieren que la CPU sea compatible con los conjuntos de extensiones de instrucción única, datos múltiples (SIMD). Asegúrate de que la CPU sea compatible con al menos una de las extensiones SIMD enumeradas. Consulta <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">«CPUs con AVX»</a> para obtener más información.</td></tr>
<tr><td>RAM</td><td><ul><li>Autónomo: 8 G</li><li>Clúster: 32 G</li></ul></td><td><ul><li>Sistema independiente: 16 G</li><li>Clúster: 128 G</li></ul></td><td>El tamaño de la RAM depende del volumen de datos.</td></tr>
<tr><td>Disco duro</td><td>SSD SATA 3.0 o CloudStorage</td><td>SSD NVMe o superior</td><td>El tamaño del disco duro depende del volumen de datos.</td></tr>
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
    </button></h2><p>Se recomienda ejecutar el clúster de Kubernetes en plataformas Linux.</p>
<p>kubectl es la herramienta de línea de comandos de Kubernetes. Utiliza una versión de kubectl que no difiera en más de una versión menor de la de tu clúster. Utilizar la última versión de kubectl ayuda a evitar problemas imprevistos.</p>
<p>Se necesita minikube para ejecutar un clúster de Kubernetes de forma local. minikube requiere Docker como dependencia. Asegúrate de instalar Docker antes de instalar Milvus mediante Helm. Consulta <a href="https://docs.docker.com/get-docker">«Obtener Docker»</a> para obtener más información.</p>
<table>
<thead>
<tr><th>Sistema operativo</th><th>Software</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>Plataformas Linux</td><td><ul><li>Kubernetes 1.16 o posterior</li><li>kubectl</li><li>Helm 3.0.0 o posterior</li><li>minikube (para Milvus autónomo)</li><li>Docker 19.03 o posterior (para Milvus autónomo)</li></ul></td><td>Consulta <a href="https://helm.sh/docs/">la documentación de Helm</a> para obtener más información.</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>Software</th><th>Versión</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>Consulta <a href="#Additional-disk-requirements">los requisitos adicionales de disco</a>.</td></tr>
<tr><td>MinIO</td><td>RELEASE.2024-12-18T13-15-44Z</td><td></td></tr>
<tr><td>Woodpecker</td><td>Incluido con Milvus (modo de servicio: <code translate="no">v0.1.36</code>+)</td><td>Cola de mensajes predeterminada. Para implementaciones distribuidas, Woodpecker puede ejecutarse como un <strong>servicio</strong> dedicado; fija su versión con <code translate="no">--set woodpecker.image.tag</code>. El modo de servicio es compatible a partir de la versión <code translate="no">v0.1.36</code> de Woodpecker.</td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td>Opcional: solo si se cambia la cola de mensajes a Pulsar; no se instala de forma predeterminada.</td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">Requisitos adicionales de disco<button data-href="#Additional-disk-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>El rendimiento del disco es fundamental para etcd. Se recomienda encarecidamente utilizar unidades SSD NVMe locales. Una respuesta del disco más lenta puede provocar elecciones de clúster frecuentes que, con el tiempo, degradarán el servicio etcd.</p>
<p>Para comprobar si tu disco cumple los requisitos, utiliza <a href="https://github.com/axboe/fio">fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>Lo ideal es que su disco alcance más de 500 IOPS y una latencia de fsync inferior a 10 ms en el percentil 99. Consulte la <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">documentación</a> de etcd para conocer los requisitos más detallados.</p>
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">¿Cómo puedo iniciar un clúster de K8s localmente con fines de prueba?<button data-href="#How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="anchor-icon" translate="no">
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
    </button></h3><p>Puedes utilizar herramientas como <a href="https://minikube.sigs.k8s.io/docs/">minikube</a>, <a href="https://kind.sigs.k8s.io/">kind</a> y <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a> para configurar rápidamente un clúster de Kubernetes de forma local. El siguiente procedimiento utiliza minikube a modo de ejemplo.</p>
<ol>
<li>Descargar minikube</li>
</ol>
<p>Ve a la página <a href="https://minikube.sigs.k8s.io/docs/start/">«Empezar»</a>, comprueba si cumples los requisitos que figuran en la sección <strong>«Lo que necesitarás»</strong>, haz clic en los botones correspondientes a tu plataforma de destino y copia los comandos para descargar e instalar el binario.</p>
<ol start="2">
<li>Iniciar un clúster de K8s con minikube</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">minikube start</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Comprueba el estado del clúster de K8s</li>
</ol>
<p>Puedes comprobar el estado del clúster de K8s instalado mediante el siguiente comando.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl cluster-info</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Asegúrate de que puedes acceder al clúster de K8s a través de <code translate="no">kubectl</code>. Si no has instalado <code translate="no">kubectl</code> localmente, consulta <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">«Usar kubectl dentro de minikube</a>».</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">Próximos pasos<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Si su hardware y software cumplen los requisitos, puede:</p>
<ul>
<li><a href="/docs/es/install_cluster-milvusoperator.md">Ejecutar Milvus en Kubernetes con Milvus Operator</a></li>
<li><a href="/docs/es/install_cluster-helm.md">Ejecutar Milvus en Kubernetes con Helm</a></li>
</ul></li>
<li><p>Consulta <a href="/docs/es/system_configuration.md">«Configuración del sistema</a> » para conocer los parámetros que puedes configurar durante la instalación de Milvus.</p></li>
</ul>
