---
id: architecture_overview.md
summary: >-
  Milvus proporciona una base de datos vectorial rápida, fiable y estable
  construida específicamente para la búsqueda de similitudes y la inteligencia
  artificial.
title: Visión general de la arquitectura de Milvus
---
<h1 id="Milvus-Architecture-Overview" class="common-anchor-header">Visión general de la arquitectura de Milvus<button data-href="#Milvus-Architecture-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Construido sobre bibliotecas populares de búsqueda vectorial, incluyendo Faiss, HNSW, DiskANN, SCANN y más, Milvus fue diseñado para la búsqueda de similitud en conjuntos de datos vectoriales densos que contienen millones, miles de millones o incluso billones de vectores. Antes de continuar, familiarícese con los <a href="/docs/es/glossary.md">principios básicos</a> de la recuperación por incrustación.</p>
<p>Milvus también admite la fragmentación de datos, la ingestión de datos en flujo, el esquema dinámico, la búsqueda combinada de datos vectoriales y escalares, la búsqueda multivectorial e híbrida, el vector disperso y muchas otras funciones avanzadas. La plataforma ofrece rendimiento bajo demanda y puede optimizarse para adaptarse a cualquier escenario de recuperación de incrustación. Recomendamos desplegar Milvus utilizando Kubernetes para una disponibilidad y elasticidad óptimas.</p>
<p>Milvus adopta una arquitectura de almacenamiento compartido con capas de almacenamiento y computación totalmente desagregadas, lo que permite el escalado horizontal de los nodos de computación. Al implementar Woodpecker como una capa de registro de escritura anticipada (WAL) de disco cero, Milvus se vuelve cada vez más elástico y nativo de la nube, al tiempo que reduce la sobrecarga operativa. Siguiendo el principio de desagregación del plano de datos y el plano de control, Milvus consta de <a href="/docs/es/four_layers.md">cuatro capas</a>: capa de acceso, servicio de coordinación, nodo trabajador y almacenamiento, cada una de las cuales puede escalarse o recuperarse sin afectar a las demás.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus_architecture.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" />
   </span> <span class="img-wrapper"> <span>Diagrama_de_arquitectura</span> </span></p>
<p>Según la figura, las interfaces pueden clasificarse en las siguientes categorías:</p>
<ul>
<li><strong>DDL / DCL:</strong> createCollection / createPartition / dropCollection / dropPartition / hasCollection / hasPartition</li>
<li><strong>DML / Produce:</strong> insert / delete / upsert</li>
<li><strong>DQL:</strong> búsqueda / consulta</li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">Más información<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Más información sobre <a href="/docs/es/four_layers.md">la desagregación de cálculo/almacenamiento</a> en Milvus</li>
<li>Conozca los <a href="/docs/es/main_components.md">componentes principales</a> de Milvus.</li>
</ul>
