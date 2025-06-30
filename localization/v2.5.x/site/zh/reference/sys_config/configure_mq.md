---
id: configure_mq.md
related_key: configure
group: system_configuration.md
summary: 了解如何为 Milvus 配置 mq。
---
<h1 id="mq-related-Configurations" class="common-anchor-header">mq 相关配置<button data-href="#mq-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 支持四种 MQ：rocksmq（基于 RockDB）、natsmq（嵌入式 nats-server）、Pulsar 和 Kafka。</p>
<p>您可以通过设置 mq.type 字段来更改您的 MQ。</p>
<p>如果不将 mq.type 字段设为默认值，那么如果我们在该文件中配置了多个 mq，就需要注意启用优先级。</p>
<ol>
<li><p>独立（本地）模式：Rocksmq（默认） &gt; Natsmq &gt; Pulsar &gt; Kafka</p></li>
<li><p>集群模式：  Pulsar（默认） &gt; Kafka（集群模式下不支持 rocksmq 和 natsmq）</p></li>
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
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>默认值："默认"</li>      
        <li>有效值：[默认、pulsar、kafka、rocksmq、natsmq］</li>      </td>
      <td>默认</td>
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
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        默认值："true     </td>
      <td>true</td>
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
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        进入追赶模式的时间勾选滞后阈值，单位为秒      </td>
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
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        追赶模式缓冲区大小（字节      </td>
      <td>8388608</td>
    </tr>
  </tbody>
</table>
<h2 id="mqpursuitBufferTime" class="common-anchor-header"><code translate="no">mq.pursuitBufferTime</code><button data-href="#mqpursuitBufferTime" class="anchor-icon" translate="no">
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
    </button></h2><table id="mq.pursuitBufferTime">
  <thead>
    <tr>
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        追赶模式缓冲时间（秒      </td>
      <td>60</td>
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
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MQ 客户端消费者缓冲区长度      </td>
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
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        派发器检查是否合并的间隔时间（秒）。      </td>
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
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        用于合并的通道缓冲区长度      </td>
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
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        默认值：3"，目标发送 msgPack 的超时（秒）。      </td>
      <td>3</td>
    </tr>
  </tbody>
</table>
