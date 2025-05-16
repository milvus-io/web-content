---
id: allocate.md
title: Asignar recursos a Milvus en Kubernetes
summary: Aprenda a asignar recursos a Milvus en Kubernetes.
---
<h1 id="Allocate-Resources-on-Kubernetes" class="common-anchor-header">Asignar Recursos en Kubernetes<button data-href="#Allocate-Resources-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tema describe cómo asignar recursos a un clúster Milvus en Kubernetes.</p>
<p>Generalmente, los recursos que usted asigna a un cluster Milvus en producción deben ser proporcionales a la carga de trabajo de la máquina. También debe considerar el tipo de máquina al asignar recursos. Aunque puede actualizar las configuraciones cuando el clúster se está ejecutando, recomendamos establecer los valores antes de <a href="/docs/es/v2.4.x/install_cluster-helm.md">desplegar el clúster</a>.</p>
<div class="alert note">
<p>Para obtener información sobre cómo asignar recursos con <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/allocate-resources.md#allocate-resources-with-milvus-operator">Milvus Operator</a>, consulte <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/allocate-resources.md#allocate-resources-with-milvus-operator">Asignar recursos con Milvus Operator</a>.</p>
</div>
<h2 id="1-View-available-resources" class="common-anchor-header">1. Ver los recursos disponibles<button data-href="#1-View-available-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>Ejecute <code translate="no">kubectl describe nodes</code> para ver los recursos disponibles en las instancias que ha aprovisionado.</p>
<h2 id="2-Allocate-resources" class="common-anchor-header">2. Asignar recursos<button data-href="#2-Allocate-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilice Helm para asignar recursos de CPU y memoria a los componentes de Milvus.</p>
<div class="alert note">
El uso de Helm para actualizar recursos hará que los pods en ejecución realicen una actualización continua.</div>
<p>Hay dos formas de asignar recursos:</p>
<ul>
<li><a href="/docs/es/v2.4.x/allocate.md#Allocate-resources-with-commands">Utilice los comandos</a></li>
<li><a href="/docs/es/v2.4.x/allocate.md#Allocate-resources-by-setting-configuration-file">Establezca los parámetros en el archivo <code translate="no">YAML</code> </a></li>
</ul>
<h3 id="Allocate-resources-with-commands" class="common-anchor-header">Asignar recursos con comandos</h3><p>Debe establecer las variables de recursos para cada componente Milvus si utiliza <code translate="no">--set</code> para actualizar las configuraciones de recursos.</p>
<div class="filter">
 <a href="#cluster">Milvus</a><a href="#standalone">independiente</a> <a href="#cluster">Milvus cluster</a></div>
<div class="table-wrapper filter-standalone" markdown="block">
<pre><code translate="no" class="language-Shell">helm upgrade my-release milvus/milvus --reuse-values --<span class="hljs-built_in">set</span> standalone.resources.limits.cpu=2 --<span class="hljs-built_in">set</span> standalone.resources.limits.memory=4Gi --<span class="hljs-built_in">set</span> standalone.resources.requests.cpu=0.1 --<span class="hljs-built_in">set</span> standalone.resources.requests.memory=128Mi
<button class="copy-code-btn"></button></code></pre>
</div>
<div class="table-wrapper filter-cluster" markdown="block">
<pre><code translate="no" class="language-Shell">helm upgrade my-release milvus/milvus --reuse-values --<span class="hljs-built_in">set</span> dataNode.resources.limits.cpu=2 --<span class="hljs-built_in">set</span> dataNode.resources.limits.memory=4Gi --<span class="hljs-built_in">set</span> dataNode.resources.requests.cpu=0.1 --<span class="hljs-built_in">set</span> dataNode.resources.requests.memory=128Mi
<button class="copy-code-btn"></button></code></pre>
</div>
<h3 id="Allocate-resources-by-setting-configuration-file" class="common-anchor-header">Asignar recursos estableciendo el archivo de configuración</h3><p>También puede asignar recursos de CPU y memoria especificando los parámetros <code translate="no">resources.requests</code> y <code translate="no">resources.limits</code> en el archivo <code translate="no">resources.yaml</code>.</p>
<pre><code translate="no" class="language-Yaml"><span class="hljs-attr">dataNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">limits</span>:
      <span class="hljs-attr">cpu</span>: <span class="hljs-string">&quot;4&quot;</span>
      <span class="hljs-attr">memory</span>: <span class="hljs-string">&quot;16Gi&quot;</span>
    <span class="hljs-attr">requests</span>:
      <span class="hljs-attr">cpu</span>: <span class="hljs-string">&quot;1&quot;</span>
      <span class="hljs-attr">memory</span>: <span class="hljs-string">&quot;4Gi&quot;</span>
<span class="hljs-attr">queryNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">limits</span>:
      <span class="hljs-attr">cpu</span>: <span class="hljs-string">&quot;4&quot;</span>
      <span class="hljs-attr">memory</span>: <span class="hljs-string">&quot;16Gi&quot;</span>
    <span class="hljs-attr">requests</span>:
      <span class="hljs-attr">cpu</span>: <span class="hljs-string">&quot;1&quot;</span>
      <span class="hljs-attr">memory</span>: <span class="hljs-string">&quot;4Gi&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="3-Apply-configurations" class="common-anchor-header">3. Aplicar configuraciones<button data-href="#3-Apply-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Ejecute el siguiente comando para aplicar las nuevas configuraciones a su cluster Milvus.</p>
<pre><code translate="no" class="language-Shell">helm upgrade my-release milvus/milvus --reuse-values -f resources.yaml
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Si no se especifica <code translate="no">resources.limits</code>, los pods consumirán todos los recursos de CPU y memoria disponibles. Por lo tanto, asegúrese de especificar <code translate="no">resources.requests</code> y <code translate="no">resources.limits</code> para evitar la sobreasignación de recursos cuando otras tareas en ejecución en la misma instancia requieran un mayor consumo de memoria.</div>
<p>Consulte <a href="https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/">la documentación de Kubernetes</a> para obtener más información sobre la gestión de recursos.</p>
<h2 id="Whats-next" class="common-anchor-header">Lo que sigue<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Puede que también quiera aprender cómo<ul>
<li><a href="/docs/es/v2.4.x/scaleout.md">Escalar un clúster Milvus</a></li>
<li><a href="/docs/es/v2.4.x/upgrade_milvus_cluster-operator.md">Actualizar Milvus Cluster</a></li>
<li><a href="/docs/es/v2.4.x/upgrade_milvus_standalone-operator.md">Actualizar Milvus Standalone</a></li>
</ul></li>
<li>Si está listo para implementar su clúster en nubes:<ul>
<li>Aprenda a <a href="/docs/es/v2.4.x/eks.md">implementar Milvus en Amazon EKS con Terraform</a></li>
<li>Aprenda a <a href="/docs/es/v2.4.x/gcp.md">desplegar Milvus Cluster en GCP con Kubernetes</a></li>
<li>Aprenda a <a href="/docs/es/v2.4.x/azure.md">desplegar Milvus en Microsoft Azure con Kubernetes</a></li>
</ul></li>
</ul>
