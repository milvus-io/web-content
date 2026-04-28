---
id: configure_mq.md
related_key: configure
group: system_configuration.md
summary: Aprenda a configurar mq para Milvus.
---
<h1 id="mq-related-Configurations" class="common-anchor-header">Configuraciones relacionadas con mq<button data-href="#mq-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus soporta cuatro MQ: rocksmq(basado en RockDB), natsmq(servidor nats embebido), Pulsar y Kafka.</p>
<p>Puede cambiar su mq configurando el campo mq.type.</p>
<p>Si no estableces el campo mq.type como predeterminado, hay una nota sobre cómo habilitar la prioridad si configuramos múltiples mq en este archivo.</p>
<ol>
<li><p>modo standalone(local): rocksmq(por defecto) &gt; natsmq &gt; Pulsar &gt; Kafka</p></li>
<li><p>modo cluster:  Pulsar(por defecto) &gt; Kafka (rocksmq y natsmq no están soportados en modo cluster)</p></li>
</ol>
<h2 id="mqtype" class="common-anchor-header"><code translate="no">mq.type</code><button data-href="#mqtype" class="anchor-icon" translate="no">
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
    </button></h2><table id="mq.type">
  <thead>
    <tr>
      <th class="width80">Descripción</th>
      <th class="width20">Valor por defecto</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Valor por defecto: "default"</li>      
        <li>Valores válidos: [default, pulsar, kafka, rocksmq, natsmq]</li>      </td>
      <td>por defecto</td>
    </tr>
  </tbody>
</table>
<h2 id="mqenablePursuitMode" class="common-anchor-header"><code translate="no">mq.enablePursuitMode</code><button data-href="#mqenablePursuitMode" class="anchor-icon" translate="no">
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
    </button></h2><table id="mq.enablePursuitMode">
  <thead>
    <tr>
      <th class="width80">Descripción</th>
      <th class="width20">Valor por defecto</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Valor por defecto: "true"      </td>
      <td>verdadero</td>
    </tr>
  </tbody>
</table>
<h2 id="mqpursuitLag" class="common-anchor-header"><code translate="no">mq.pursuitLag</code><button data-href="#mqpursuitLag" class="anchor-icon" translate="no">
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
    </button></h2><table id="mq.pursuitLag">
  <thead>
    <tr>
      <th class="width80">Descripción</th>
      <th class="width20">Valor por defecto</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        umbral de retardo para entrar en modo de persecución, en segundos      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>
<h2 id="mqpursuitBufferSize" class="common-anchor-header"><code translate="no">mq.pursuitBufferSize</code><button data-href="#mqpursuitBufferSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="mq.pursuitBufferSize">
  <thead>
    <tr>
      <th class="width80">Descripción</th>
      <th class="width20">Valor por defecto</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        tamaño del búfer del modo de persecución, en bytes     </td>
      <td>8388608</td>
    </tr>
  </tbody>
</table>
<h2 id="mqmqBufSize" class="common-anchor-header"><code translate="no">mq.mqBufSize</code><button data-href="#mqmqBufSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="mq.mqBufSize">
  <thead>
    <tr>
      <th class="width80">Descripción</th>
      <th class="width20">Valor por defecto</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Longitud del búfer de consumidor de cliente MQ  </td>
      <td>16</td>
    </tr>
  </tbody>
</table>
<h2 id="mqdispatchermergeCheckInterval" class="common-anchor-header"><code translate="no">mq.dispatcher.mergeCheckInterval</code><button data-href="#mqdispatchermergeCheckInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="mq.dispatcher.mergeCheckInterval">
  <thead>
    <tr>
      <th class="width80">Descripción</th>
      <th class="width20">Valor por defecto</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        el tiempo de intervalo (en segundos) para que el despachador compruebe si fusionar      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>
<h2 id="mqdispatchertargetBufSize" class="common-anchor-header"><code translate="no">mq.dispatcher.targetBufSize</code><button data-href="#mqdispatchertargetBufSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="mq.dispatcher.targetBufSize">
  <thead>
    <tr>
      <th class="width80">Descripción</th>
      <th class="width20">Valor por defecto</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Longitud del búfer del canal para la fusión      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>
<h2 id="mqdispatchermaxTolerantLag" class="common-anchor-header"><code translate="no">mq.dispatcher.maxTolerantLag</code><button data-href="#mqdispatchermaxTolerantLag" class="anchor-icon" translate="no">
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
    </button></h2><table id="mq.dispatcher.maxTolerantLag">
  <thead>
    <tr>
      <th class="width80">Descripción</th>
      <th class="width20">Valor por defecto</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Valor por defecto: "3", el tiempo de espera(en segundos) que el objetivo envía msgPack      </td>
      <td>3</td>
    </tr>
  </tbody>
</table>
