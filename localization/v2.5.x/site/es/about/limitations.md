---
id: limitations.md
title: Límites de Milvus
related_key: Limitations
summary: Conozca los límites durante el uso de Milvus.
---
<h1 id="Milvus-Limits" class="common-anchor-header">Límites de Milvus<button data-href="#Milvus-Limits" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus se compromete a proporcionar las mejores bases de datos vectoriales para potenciar las aplicaciones de IA y la búsqueda de similitud vectorial. Sin embargo, el equipo trabaja continuamente para incorporar más funciones y las mejores utilidades para mejorar la experiencia del usuario. Esta página enumera algunas limitaciones conocidas que los usuarios pueden encontrar al utilizar Milvus.</p>
<h2 id="Length-of-a-resource-name" class="common-anchor-header">Longitud del nombre de un recurso<button data-href="#Length-of-a-resource-name" class="anchor-icon" translate="no">
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
<tr><th>Recurso</th><th>Límite</th></tr>
</thead>
<tbody>
<tr><td>Colección</td><td>255 caracteres</td></tr>
<tr><td>Campo</td><td>255 caracteres</td></tr>
<tr><td>Índice</td><td>255 caracteres</td></tr>
<tr><td>Partición</td><td>255 caracteres</td></tr>
</tbody>
</table>
<h2 id="Naming-rules" class="common-anchor-header">Reglas de denominación<button data-href="#Naming-rules" class="anchor-icon" translate="no">
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
    </button></h2><p>El nombre de un recurso puede contener números, letras y guiones bajos (_). El nombre de un recurso debe empezar por una letra o un guión bajo (_).</p>
<h2 id="Number-of-resources" class="common-anchor-header">Número de recursos<button data-href="#Number-of-resources" class="anchor-icon" translate="no">
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
<tr><th>Recurso</th><th>Límite</th></tr>
</thead>
<tbody>
<tr><td>Colección</td><td>65,536</td></tr>
<tr><td>Conexión / proxy</td><td>65,536</td></tr>
</tbody>
</table>
<h2 id="Number-of-resources-in-a-collection" class="common-anchor-header">Número de recursos en una colección<button data-href="#Number-of-resources-in-a-collection" class="anchor-icon" translate="no">
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
<tr><th>Recurso</th><th>Límite</th></tr>
</thead>
<tbody>
<tr><td>Partición</td><td>4,096</td></tr>
<tr><td>Partición</td><td>16</td></tr>
<tr><td>Campo</td><td>64</td></tr>
<tr><td>Índice</td><td>1</td></tr>
<tr><td>Entidad</td><td>ilimitada</td></tr>
</tbody>
</table>
<h2 id="Length-of-a-string" class="common-anchor-header">Longitud de una cadena<button data-href="#Length-of-a-string" class="anchor-icon" translate="no">
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
<tr><th>Tipo de datos</th><th>Límite</th></tr>
</thead>
<tbody>
<tr><td>VARCHAR</td><td>65,535</td></tr>
</tbody>
</table>
<h2 id="Dimensions-of-a-vector" class="common-anchor-header">Dimensiones de un vector<button data-href="#Dimensions-of-a-vector" class="anchor-icon" translate="no">
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
<tr><th>Propiedad</th><th>Límite</th></tr>
</thead>
<tbody>
<tr><td>Dimensión</td><td>32,768</td></tr>
</tbody>
</table>
<h2 id="Input-and-Output-per-RPC" class="common-anchor-header">Entrada y salida por RPC<button data-href="#Input-and-Output-per-RPC" class="anchor-icon" translate="no">
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
<tr><th>Operación</th><th>Límite</th></tr>
</thead>
<tbody>
<tr><td>Insertar</td><td>64 MB</td></tr>
<tr><td>Buscar en</td><td>64 MB</td></tr>
<tr><td>Consulta</td><td>64 MB</td></tr>
</tbody>
</table>
<h2 id="Load-limits" class="common-anchor-header">Límites de carga<button data-href="#Load-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>En la versión actual, los datos que se van a cargar deben estar por debajo del 90% de los recursos de memoria totales de todos los nodos de consulta para reservar recursos de memoria para el motor de ejecución.</p>
<h2 id="Search-limits" class="common-anchor-header">Límites de búsqueda<button data-href="#Search-limits" class="anchor-icon" translate="no">
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
<tr><th>Vectores</th><th>Límite</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">topk</code> (número del resultado más similar a devolver)</td><td>16,384</td></tr>
<tr><td><code translate="no">nq</code> (número de peticiones de búsqueda)</td><td>16,384</td></tr>
</tbody>
</table>
<h2 id="Index-limits-on-different-search-types" class="common-anchor-header">Límites de índice en distintos tipos de búsqueda<button data-href="#Index-limits-on-different-search-types" class="anchor-icon" translate="no">
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
    </button></h2><p>La siguiente tabla ofrece una visión general de la compatibilidad con diversos comportamientos de búsqueda en los distintos tipos de índice.</p>
<table>
<thead>
<tr><th></th><th>HNSW</th><th>DISKANN</th><th>FLAT</th><th>IVF_FLAT</th><th>IVF_SQ8</th><th>IVF_PQ</th><th>SCANN</th><th>GPU_IFV_FLAT</th><th>GPU_IVF_PQ</th><th>GPU_CAGRA</th><th>GPU_BRUTE_FORCE</th><th>SPARSE_INVERTED_INDEX</th><th>SPARSE_WAND</th><th>BIN_FLAT</th><th>BIN_IVF_FLAT</th></tr>
</thead>
<tbody>
<tr><td>Búsqueda básica</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td></tr>
<tr><td>Búsqueda de particiones</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td></tr>
<tr><td>Búsqueda básica con datos brutos recuperados</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td></tr>
<tr><td>Búsqueda básica con paginación</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td></tr>
<tr><td>Búsqueda filtrada</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td></tr>
<tr><td>Búsqueda por rangos</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Sí</td><td>Sí</td></tr>
<tr><td>Búsqueda por grupos</td><td>Sí</td><td>No</td><td>Sí</td><td>Sí</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td></tr>
<tr><td>Búsqueda con iterador</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td><td>No</td></tr>
<tr><td>Búsqueda híbrida</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí(Sólo RRFRanker)</td><td>Sí(Sólo RRFRanker)</td><td>Sí</td><td>Sí</td></tr>
<tr><td>Consultar/Obtener</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td></tr>
<tr><td>Consulta con iterador</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Sí</td><td>Sí</td><td>Sí</td><td>Sí</td></tr>
</tbody>
</table>
