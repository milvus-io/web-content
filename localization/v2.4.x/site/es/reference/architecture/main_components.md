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
    </button></h1><p>Hay dos modos de ejecutar Milvus: Standalone y Cluster. Estos dos modos comparten las mismas características. Puede elegir el modo que mejor se adapte al tamaño de su conjunto de datos, datos de tráfico, etc. Por ahora, Milvus standalone no puede actualizarse "en línea" a Milvus cluster.</p>
<h2 id="Milvus-standalone" class="common-anchor-header">Milvus independiente<button data-href="#Milvus-standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus standalone incluye tres componentes:</p>
<ul>
<li><p><strong>Milvus:</strong> El componente funcional central.</p></li>
<li><p><strong>Meta Store:</strong> El motor de metadatos, que accede y almacena los metadatos de los componentes internos de Milvus, incluidos los proxies, los nodos de índice, etc.</p></li>
<li><p><strong>Almacenamiento de objetos:</strong> El motor de almacenamiento, que es responsable de la persistencia de datos para Milvus.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/standalone_architecture.jpg" alt="Standalone_architecture" class="doc-image" id="standalone_architecture" />
   </span> <span class="img-wrapper"> <span>Arquitectura_estándar</span> </span></p>
<h2 id="Milvus-cluster" class="common-anchor-header">Clúster Milvus<button data-href="#Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>El cluster Milvus</strong> incluye siete componentes de microservicios y tres dependencias de terceros. Todos los microservicios pueden desplegarse en Kubernetes, independientemente unos de otros.</p>
<h3 id="Microservice-components" class="common-anchor-header">Componentes de microservicios</h3><ul>
<li>Coordenada raíz</li>
<li>Proxy</li>
<li>Nodo de consulta</li>
<li>Nodo de consulta</li>
<li>Coordenada de datos</li>
<li>Nodo índice</li>
<li>Nodo de datos</li>
</ul>
<h3 id="Third-party-dependencies" class="common-anchor-header">Dependencias de terceros</h3><ul>
<li><strong>Meta Store:</strong> Almacena metadatos para varios componentes del clúster, por ejemplo, etcd.</li>
<li><strong>Almacenamiento de objetos:</strong> Responsable de la persistencia de datos de archivos grandes en el clúster, como archivos de índice y de registro binario, por ejemplo, S3.</li>
<li><strong>Log Broker:</strong> Gestiona los registros de las operaciones de mutación recientes, genera registros de flujo y proporciona servicios de publicación y suscripción de registros, por ejemplo, Pulsar.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/distributed_architecture.jpg" alt="Distributed_architecture" class="doc-image" id="distributed_architecture" />
   </span> <span class="img-wrapper"> <span>Arquitectura_distribuida</span> </span></p>
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
<li>Lea <a href="/docs/es/v2.4.x/four_layers.md">Computing/Storage Disaggregation</a> para comprender el mecanismo y el principio de diseño de Milvus.</li>
</ul>
