---
id: troubleshooting.md
summary: >-
  Conozca los problemas más comunes que puede encontrar con Milvus y cómo
  superarlos.
title: Solución de problemas
---
<h1 id="Troubleshooting" class="common-anchor-header">Solución de problemas<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta página enumera los problemas comunes que pueden ocurrir cuando se ejecuta Milvus, así como posibles consejos para solucionarlos. Los problemas de esta página se clasifican en las siguientes categorías:</p>
<ul>
<li><a href="#boot_issues">Problemas de arranque</a></li>
<li><a href="#runtime_issues">Problemas de tiempo de ejecución</a></li>
<li><a href="#api_issues">Problemas de API</a></li>
<li><a href="#etcd_crash_issues">Problemas de bloqueo de etcd</a></li>
</ul>
<h2 id="Boot-issues" class="common-anchor-header">Problemas de arranque<button data-href="#Boot-issues" class="anchor-icon" translate="no">
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
    </button></h2><p>Los errores de arranque suelen ser fatales. Ejecute el siguiente comando para ver los detalles del error:</p>
<pre><code translate="no">$ docker logs &lt;your milvus container <span class="hljs-built_in">id</span>&gt;
<button class="copy-code-btn"></button></code></pre>
<h2 id="Runtime-issues" class="common-anchor-header">Problemas en tiempo de ejecución<button data-href="#Runtime-issues" class="anchor-icon" translate="no">
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
    </button></h2><p>Los errores que se producen durante el tiempo de ejecución pueden causar la interrupción del servicio. Para solucionar este problema, compruebe la compatibilidad entre el servidor y su cliente antes de seguir adelante.</p>
<h2 id="API-issues" class="common-anchor-header">Problemas de API<button data-href="#API-issues" class="anchor-icon" translate="no">
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
    </button></h2><p>Estos problemas se producen durante las llamadas a métodos API entre el servidor Milvus y su cliente. Se devolverán al cliente de forma sincrónica o asincrónica.</p>
<h2 id="etcd-crash-issues" class="common-anchor-header">Problemas de bloqueo de etcd<button data-href="#etcd-crash-issues" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-etcd-pod-pending" class="common-anchor-header">1. pod etcd pendiente</h3><p>El cluster etcd utiliza pvc por defecto. StorageClass necesita ser preconfigurado para el cluster Kubernetes.</p>
<h3 id="2-etcd-pod-crash" class="common-anchor-header">2. etcd pod crash</h3><p>Cuando un pod etcd se bloquea con <code translate="no">Error: bad member ID arg (strconv.ParseUint: parsing &quot;&quot;: invalid syntax), expecting ID in Hex</code>, puede iniciar sesión en este pod y eliminar el archivo <code translate="no">/bitnami/etcd/data/member_id</code>.</p>
<h3 id="3-Multiple-pods-keep-crashing-while-etcd-0-is-still-running" class="common-anchor-header">3. Múltiples pods siguen fallando mientras <code translate="no">etcd-0</code> sigue ejecutándose</h3><p>Puede ejecutar el siguiente código si varios pods siguen fallando mientras <code translate="no">etcd-0</code> sigue ejecutándose.</p>
<pre><code translate="no">kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">1</span>
<span class="hljs-comment"># delete the pvc for etcd-1 and etcd-2</span>
kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">3</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="4-All-pods-crash" class="common-anchor-header">4. Todos los pods se bloquean</h3><p>Si se bloquean todos los pods, intente copiar el archivo <code translate="no">/bitnami/etcd/data/member/snap/db</code>. Utilice <code translate="no">https://github.com/etcd-io/bbolt</code> para modificar los datos de la base de datos.</p>
<p>Todos los metadatos de Milvus se guardan en el cubo <code translate="no">key</code>. Haga una copia de seguridad de los datos en este cubo y ejecute los siguientes comandos. Tenga en cuenta que los datos del prefijo en el archivo <code translate="no">by-dev/meta/session</code> no requieren una copia de seguridad.</p>
<pre><code translate="no">kubectl kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">0</span>
<span class="hljs-comment"># delete the pvc for etcd-0, etcd-1, etcd-2</span>
kubectl kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">1</span>
<span class="hljs-comment"># restore the backup data</span>
<button class="copy-code-btn"></button></code></pre>
<p><br/></p>
<p>Si necesitas ayuda para resolver un problema, no dudes en hacerlo:</p>
<ul>
<li>Únase a nuestro <a href="https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk">canal de Slack</a> y solicite ayuda al equipo de Milvus.</li>
<li><a href="https://github.com/milvus-io/milvus/issues/new/choose">Presentar una incidencia</a> en GitHub que incluya detalles sobre su problema.</li>
</ul>