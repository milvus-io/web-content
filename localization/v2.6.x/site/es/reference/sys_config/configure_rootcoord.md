---
id: configure_rootcoord.md
related_key: configure
group: system_configuration.md
summary: Aprenda a configurar rootCoord para Milvus.
---
<h1 id="rootCoord-related-Configurations" class="common-anchor-header">Configuraciones relacionadas con rootCoord<button data-href="#rootCoord-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><p>Configuración relacionada de rootCoord, utilizada para gestionar las solicitudes de lenguaje de definición de datos (DDL) y de lenguaje de control de datos (DCL).</p>
<h2 id="rootCoorddmlChannelNum" class="common-anchor-header"><code translate="no">rootCoord.dmlChannelNum</code><button data-href="#rootCoorddmlChannelNum" class="anchor-icon" translate="no">
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
    </button></h2><table id="rootCoord.dmlChannelNum">
  <thead>
    <tr>
      <th class="width80">Descripción</th>
      <th class="width20">Valor por defecto</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        El número de DML-Channels a crear en el inicio de rootCoord.      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>
<h2 id="rootCoordmaxPartitionNum" class="common-anchor-header"><code translate="no">rootCoord.maxPartitionNum</code><button data-href="#rootCoordmaxPartitionNum" class="anchor-icon" translate="no">
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
    </button></h2><table id="rootCoord.maxPartitionNum">
  <thead>
    <tr>
      <th class="width80">Descripción</th>
      <th class="width20">Valor por defecto</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>El número máximo de particiones en cada colección.</li>      
        <li>No se pueden crear nuevas particiones si este parámetro se establece como 0 o 1.</li>      
        <li>Rango: [0, INT64MAX]</li>      </td>
      <td>1024</td>
    </tr>
  </tbody>
</table>
<h2 id="rootCoordminSegmentSizeToEnableIndex" class="common-anchor-header"><code translate="no">rootCoord.minSegmentSizeToEnableIndex</code><button data-href="#rootCoordminSegmentSizeToEnableIndex" class="anchor-icon" translate="no">
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
    </button></h2><table id="rootCoord.minSegmentSizeToEnableIndex">
  <thead>
    <tr>
      <th class="width80">Descripción</th>
      <th class="width20">Valor por defecto</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>El número mínimo de filas de un segmento necesario para crear un índice.</li>      
        <li>Los segmentos con un tamaño inferior a este parámetro no se indexarán y se buscará en ellos por fuerza bruta.</li>      </td>
      <td>1024</td>
    </tr>
  </tbody>
</table>
<h2 id="rootCoordmaxDatabaseNum" class="common-anchor-header"><code translate="no">rootCoord.maxDatabaseNum</code><button data-href="#rootCoordmaxDatabaseNum" class="anchor-icon" translate="no">
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
    </button></h2><table id="rootCoord.maxDatabaseNum">
  <thead>
    <tr>
      <th class="width80">Descripción</th>
      <th class="width20">Valor por defecto</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Número máximo de bases de datos     </td>
      <td>64</td>
    </tr>
  </tbody>
</table>
<h2 id="rootCoordmaxGeneralCapacity" class="common-anchor-header"><code translate="no">rootCoord.maxGeneralCapacity</code><button data-href="#rootCoordmaxGeneralCapacity" class="anchor-icon" translate="no">
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
    </button></h2><table id="rootCoord.maxGeneralCapacity">
  <thead>
    <tr>
      <th class="width80">Descripción</th>
      <th class="width20">Valor por defecto</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Límite superior para la suma del producto de partitionNumber y shardNumber      </td>
      <td>65536</td>
    </tr>
  </tbody>
</table>
<h2 id="rootCoordgracefulStopTimeout" class="common-anchor-header"><code translate="no">rootCoord.gracefulStopTimeout</code><button data-href="#rootCoordgracefulStopTimeout" class="anchor-icon" translate="no">
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
    </button></h2><table id="rootCoord.gracefulStopTimeout">
  <thead>
    <tr>
      <th class="width80">Descripción</th>
      <th class="width20">Valor por defecto</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        segundos. forzar parada nodo sin graceful stop    </td>
      <td>5</td>
    </tr>
  </tbody>
</table>
<h2 id="rootCoordip" class="common-anchor-header"><code translate="no">rootCoord.ip</code><button data-href="#rootCoordip" class="anchor-icon" translate="no">
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
    </button></h2><table id="rootCoord.ip">
  <thead>
    <tr>
      <th class="width80">Descripción</th>
      <th class="width20">Valor por defecto</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Dirección TCP/IP de rootCoord. Si no se especifica, utiliza la primera dirección unicastable      </td>
      <td></td>
    </tr>
  </tbody>
</table>
<h2 id="rootCoordport" class="common-anchor-header"><code translate="no">rootCoord.port</code><button data-href="#rootCoordport" class="anchor-icon" translate="no">
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
    </button></h2><table id="rootCoord.port">
  <thead>
    <tr>
      <th class="width80">Descripción</th>
      <th class="width20">Valor por defecto</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Puerto TCP de rootCoord      </td>
      <td>53100</td>
    </tr>
  </tbody>
</table>
<h2 id="rootCoordgrpcserverMaxSendSize" class="common-anchor-header"><code translate="no">rootCoord.grpc.serverMaxSendSize</code><button data-href="#rootCoordgrpcserverMaxSendSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="rootCoord.grpc.serverMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Descripción</th>
      <th class="width20">Valor por defecto</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        El tamaño máximo de cada petición RPC que el rootCoord puede enviar, unidad: byte    </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>
<h2 id="rootCoordgrpcserverMaxRecvSize" class="common-anchor-header"><code translate="no">rootCoord.grpc.serverMaxRecvSize</code><button data-href="#rootCoordgrpcserverMaxRecvSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="rootCoord.grpc.serverMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Descripción</th>
      <th class="width20">Valor por defecto</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        El tamaño máximo de cada petición RPC que el rootCoord puede recibir, unidad: byte    </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>
<h2 id="rootCoordgrpcclientMaxSendSize" class="common-anchor-header"><code translate="no">rootCoord.grpc.clientMaxSendSize</code><button data-href="#rootCoordgrpcclientMaxSendSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="rootCoord.grpc.clientMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Descripción</th>
      <th class="width20">Valor por defecto</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        El tamaño máximo de cada petición RPC que los clientes en rootCoord pueden enviar, unidad: byte    </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>
<h2 id="rootCoordgrpcclientMaxRecvSize" class="common-anchor-header"><code translate="no">rootCoord.grpc.clientMaxRecvSize</code><button data-href="#rootCoordgrpcclientMaxRecvSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="rootCoord.grpc.clientMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Descripción</th>
      <th class="width20">Valor por defecto</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        El tamaño máximo de cada petición RPC que los clientes en rootCoord pueden recibir, unidad: byte    </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>
