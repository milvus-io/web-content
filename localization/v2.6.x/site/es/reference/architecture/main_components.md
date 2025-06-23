---
id: main_components.md
summary: Conozca los principales componentes de Milvus standalone y cluster.
title: Componentes principales
---
<h1 id="Main-Components" class="common-anchor-header">Componentes principales<button data-href="#Main-Components" class="anchor-icon" translate="no">
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
    </button></h1><p>Un clúster Milvus consta de cinco componentes principales y tres dependencias de terceros. Cada componente puede desplegarse independientemente en Kubernetes:</p>
<h2 id="Milvus-components" class="common-anchor-header">Componentes de Milvus<button data-href="#Milvus-components" class="anchor-icon" translate="no">
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
<li>Coordinador: exactamente uno por clúster</li>
<li>Proxy: uno o más por clúster</li>
<li>Nodo de transmisión: uno o más por clúster</li>
<li>Nodo de consulta: uno o varios por clúster</li>
<li>Nodo de datos: uno o varios por clúster</li>
</ul>
<h2 id="Third-party-dependencies" class="common-anchor-header">Dependencias de terceros<button data-href="#Third-party-dependencies" class="anchor-icon" translate="no">
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
<li><strong>Meta Store:</strong> Almacena metadatos para varios componentes en el milvus, por ejemplo, etcd.</li>
<li><strong>Almacenamiento de objetos:</strong> Responsable de la persistencia de datos de archivos grandes en el milvus, como archivos de índice y de registro binario, p. ej. S3</li>
<li><strong>Almacenamiento WAL:</strong> Proporciona el servicio Write-Ahead Log (WAL) para el milvus, por ejemplo, woodpecker.<ul>
<li>En el modo de disco cero de woodpecker, <strong>WAL</strong> utiliza directamente el almacenamiento de objetos y el metaalmacenamiento sin otro despliegue, lo que reduce las dependencias de terceros.</li>
</ul></li>
</ul>
<h2 id="Milvus-deployment-modes" class="common-anchor-header">Modos de despliegue de Milvus<button data-href="#Milvus-deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Existen dos modos para ejecutar Milvus:</p>
<h3 id="Standalone" class="common-anchor-header">Independiente</h3><p>Una única instancia de Milvus que ejecuta todos los componentes en un proceso, lo que es adecuado para pequeños conjuntos de datos y baja carga de trabajo. Además, en modo autónomo, se puede elegir una implementación WAL más simple, como woodpecker y rocksmq, para eliminar el requisito de dependencias de almacenamiento WAL de terceros.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/standalone_architecture.png" alt="Standalone_architecture" class="doc-image" id="standalone_architecture" />
   </span> <span class="img-wrapper"> <span>Arquitectura autónoma</span> </span></p>
<p>Actualmente, no puede realizar una actualización en línea de una instancia Milvus autónoma a un cluster Milvus, incluso si el backend de almacenamiento WAL soporta el modo cluster.</p>
<h3 id="Cluster" class="common-anchor-header">Cluster</h3><p>Un modo de despliegue distribuido de Milvus en el que cada componente se ejecuta de forma independiente y puede escalarse para obtener elasticidad. Esta configuración es adecuada para grandes conjuntos de datos y escenarios de alta carga.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/distributed_architecture.png" alt="Distributed_architecture" class="doc-image" id="distributed_architecture" />
   </span> <span class="img-wrapper"> <span>Arquitectura_distribuida</span> </span></p>
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
<li>Lea <a href="/docs/es/v2.6.x/four_layers.md">Computing/Storage Disaggregation</a> para comprender el mecanismo y el principio de diseño de Milvus.</li>
</ul>
