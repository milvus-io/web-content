---
id: upgrade_milvus_standalone-helm.md
label: Helm
order: 1
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: Descubre cómo actualizar Milvus en modo autónomo con Helm Chart.
title: Actualizar Milvus Standalone con Helm Chart
---
<div class="tab-wrapper"><a href="/docs/es/upgrade_milvus_standalone-operator.md" class=''>Milvus</a><a href="/docs/es/upgrade_milvus_standalone-docker.md" class=''>Operator</a>, Helm y Docker<a href="/docs/es/upgrade_milvus_standalone-docker.md" class=''>Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Helm-Chart" class="common-anchor-header">Actualizar Milvus Standalone con Helm Chart<button data-href="#Upgrade-Milvus-Standalone-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta guía describe cómo actualizar tu implementación independiente de Milvus 2.6.x a la versión 3.0.0 utilizando Helm.</p>
<div class="alert note">
<p>Este procedimiento se ha validado desde Milvus 2.6.20 hasta Milvus v3.0.0 con el Helm Chart de Milvus 5.0.22. Si utilizas otra versión de parche de Milvus 2.6.x u otra versión del Helm Chart, comprueba primero la actualización en un entorno que no sea de producción.</p>
</div>
<h2 id="Prerequisites" class="common-anchor-header">Requisitos previos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Helm 3.14.0 o posterior</li>
<li>Una implementación existente de Milvus 2.6.x gestionada por Helm</li>
<li>Los valores de Helm utilizados para la implementación existente</li>
<li>Una copia de seguridad actualizada de los metadatos y los datos persistentes de Milvus</li>
</ul>
<p><strong>Limitaciones de la cola de mensajes</strong>: al actualizar a Milvus v3.0.0, debes mantener tu elección actual de cola de mensajes. No se admite el cambio entre diferentes sistemas de colas de mensajes durante la actualización. La compatibilidad con el cambio de sistemas de colas de mensajes estará disponible en futuras versiones.</p>
<div class="alert warning">
<p>No modifique ni rebaje la versión del Helm Chart como parte de este procedimiento. Mantenga la versión del Chart ya instalada para su versión de Helm. La línea base probada conservó el Helm Chart 5.0.22 y solo cambió la etiqueta de la imagen de Milvus a <code translate="no">v3.0.0</code>.</p>
<p>Este procedimiento no valida una degradación o una reversión que implique cambiar la imagen de Milvus de nuevo a la versión 2.6.x. Una vez que la v3.0.0 haya escrito datos, una reversión que afecte únicamente a la imagen podría no leer correctamente el estado actualizado. Si la actualización falla, detén las operaciones de escritura y utiliza un plan de recuperación que restaure los metadatos previos a la actualización y las copias de seguridad de los datos persistentes. Valida primero el plan de recuperación en un entorno que no sea de producción.</p>
</div>
<h2 id="Upgrade-process" class="common-anchor-header">Proceso de actualización<button data-href="#Upgrade-process" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Update-the-Helm-repository" class="common-anchor-header">Paso 1: Actualizar el repositorio de Helm<button data-href="#Step-1-Update-the-Helm-repository" class="anchor-icon" translate="no">
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
    </button></h3><p>Añade o actualiza el repositorio Helm de Milvus:</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm --force-update
helm repo update zilliztech
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
El repositorio de gráficos Helm de Milvus en <code translate="no">https://milvus-io.github.io/milvus-helm/</code> ha sido archivado. Utilice el nuevo repositorio <code translate="no">https://zilliztech.github.io/milvus-helm/</code> para las versiones 4.0.31 y posteriores de los gráficos.
</div>
<h3 id="Step-2-Upgrade-Milvus" class="common-anchor-header">Paso 2: Actualizar Milvus<button data-href="#Step-2-Upgrade-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Comprueba la versión del gráfico instalada para tu versión de Helm:</p>
<pre><code translate="no" class="language-bash">helm list --namespace &lt;namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p>En la columna « <code translate="no">CHART</code> », elimina el prefijo « <code translate="no">milvus-</code> » del valor y utiliza la versión restante como « <code translate="no">&lt;current-chart-version&gt;</code> ». A continuación, ejecuta el comando de actualización:</p>
<pre><code translate="no" class="language-bash">helm upgrade &lt;release-name&gt; zilliztech/milvus \
  --namespace &lt;namespace&gt; \
  --version &lt;current-chart-version&gt; \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v3.0.0&quot;</span> \
  --reset-then-reuse-values \
  --<span class="hljs-built_in">wait</span> \
  --<span class="hljs-built_in">timeout</span> 20m
<button class="copy-code-btn"></button></code></pre>
<p>La opción « <code translate="no">--reset-then-reuse-values</code> » conserva los valores de la versión anterior al tiempo que aplica la sustitución explícita de la imagen frente a los valores predeterminados del Chart seleccionado.</p>
<h2 id="Verify-the-upgrade" class="common-anchor-header">Comprueba la actualización<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Comprueba la revisión de Helm, el estado del pod y las imágenes de contenedor:</p>
<pre><code translate="no" class="language-bash">helm <span class="hljs-built_in">history</span> &lt;release-name&gt; --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt; \
  -o jsonpath=<span class="hljs-string">&#x27;{range .items[*]}{.metadata.name}{&quot;\t&quot;}{range .spec.containers[*]}{.image}{&quot; &quot;}{end}{&quot;\n&quot;}{end}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Comprueba que todas las cargas de trabajo necesarias estén listas, que Milvus utilice « <code translate="no">v3.0.0</code> » y que tus colecciones existentes sigan siendo consultables y buscables. Realiza estas comprobaciones antes de habilitar cualquier función específica de la versión 3.0.0.</p>
<div class="alert note">
<p>La actualización a Milvus 3.0 no habilita Storage V3. Una vez verificada la actualización, revisa <a href="/docs/es/storage-v3.md">Storage V3</a> antes de habilitar las funciones que dependen de él. Una vez que Milvus haya escrito datos en Storage V3, no se admite la vuelta a una versión anterior de Milvus que no pueda leer Storage V3.</p>
</div>
