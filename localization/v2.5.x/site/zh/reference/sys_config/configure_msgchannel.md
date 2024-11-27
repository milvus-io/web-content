---
id: configure_msgchannel.md
related_key: configure
group: system_configuration.md
summary: 了解如何为 Milvus 配置 msgChannel。
---
<h1 id="msgChannel-related-Configurations" class="common-anchor-header">msgChannel 相关配置<button data-href="#msgChannel-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><p>本主题介绍 Milvus 的消息通道相关配置。</p>
<h2 id="msgChannelchanNamePrefixcluster" class="common-anchor-header"><code translate="no">msgChannel.chanNamePrefix.cluster</code><button data-href="#msgChannelchanNamePrefixcluster" class="anchor-icon" translate="no">
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
    </button></h2><table id="msgChannel.chanNamePrefix.cluster">
  <thead>
    <tr>
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>创建消息通道时通道的根名称前缀。</li>      
        <li>建议在首次启动 Milvus 前更改此参数。</li>      
        <li>若要在多个 Milvus 实例中共享一个 Pulsar 实例，可考虑在启动每个 Milvus 实例前将其更改为一个名称，而不是默认名称。</li>      </td>
      <td>by-dev</td>
    </tr>
  </tbody>
</table>
<h2 id="msgChannelchanNamePrefixrootCoordTimeTick" class="common-anchor-header"><code translate="no">msgChannel.chanNamePrefix.rootCoordTimeTick</code><button data-href="#msgChannelchanNamePrefixrootCoordTimeTick" class="anchor-icon" translate="no">
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
    </button></h2><table id="msgChannel.chanNamePrefix.rootCoordTimeTick">
  <thead>
    <tr>
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>根协调器发布时间刻度信息的信息通道的子名称前缀。</li>      
        <li>完整的通道名称前缀为 ${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.rootCoordTimeTick} 。</li>      
        <li>注意：在使用 Milvus 一段时间后更改此参数将影响您对旧数据的访问。</li>      
        <li>建议在首次启动 Milvus 之前更改此参数。</li>      </td>
      <td>根节点时间</td>
    </tr>
  </tbody>
</table>
<h2 id="msgChannelchanNamePrefixrootCoordStatistics" class="common-anchor-header"><code translate="no">msgChannel.chanNamePrefix.rootCoordStatistics</code><button data-href="#msgChannelchanNamePrefixrootCoordStatistics" class="anchor-icon" translate="no">
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
    </button></h2><table id="msgChannel.chanNamePrefix.rootCoordStatistics">
  <thead>
    <tr>
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>根协调器发布自身统计信息的信息通道的子名称前缀。</li>      
        <li>完整的频道名称前缀为 ${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.rootCoordStatistics} 。</li>      
        <li>注意：在使用 Milvus 一段时间后更改此参数将影响您对旧数据的访问。</li>      
        <li>建议在首次启动 Milvus 之前更改此参数。</li>      </td>
      <td>根节点统计</td>
    </tr>
  </tbody>
</table>
<h2 id="msgChannelchanNamePrefixrootCoordDml" class="common-anchor-header"><code translate="no">msgChannel.chanNamePrefix.rootCoordDml</code><button data-href="#msgChannelchanNamePrefixrootCoordDml" class="anchor-icon" translate="no">
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
    </button></h2><table id="msgChannel.chanNamePrefix.rootCoordDml">
  <thead>
    <tr>
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>根协调器发布数据处理语言（DML）信息的信息通道的子名称前缀。</li>      
        <li>完整的通道名称前缀为 ${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.rootCoordDml} 。</li>      
        <li>注意：在使用 Milvus 一段时间后更改此参数将影响您对旧数据的访问。</li>      
        <li>建议在首次启动 Milvus 之前更改此参数。</li>      </td>
      <td>根节点数据表</td>
    </tr>
  </tbody>
</table>
<h2 id="msgChannelchanNamePrefixqueryTimeTick" class="common-anchor-header"><code translate="no">msgChannel.chanNamePrefix.queryTimeTick</code><button data-href="#msgChannelchanNamePrefixqueryTimeTick" class="anchor-icon" translate="no">
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
    </button></h2><table id="msgChannel.chanNamePrefix.queryTimeTick">
  <thead>
    <tr>
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>查询节点发布时间刻度信息的信息通道的子名称前缀。</li>      
        <li>完整的通道名称前缀为 ${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.queryTimeTick} 。</li>      
        <li>注意：在使用 Milvus 一段时间后更改此参数将影响您对旧数据的访问。</li>      
        <li>建议在首次启动 Milvus 之前更改此参数。</li>      </td>
      <td>查询时间</td>
    </tr>
  </tbody>
</table>
<h2 id="msgChannelchanNamePrefixdataCoordTimeTick" class="common-anchor-header"><code translate="no">msgChannel.chanNamePrefix.dataCoordTimeTick</code><button data-href="#msgChannelchanNamePrefixdataCoordTimeTick" class="anchor-icon" translate="no">
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
    </button></h2><table id="msgChannel.chanNamePrefix.dataCoordTimeTick">
  <thead>
    <tr>
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>数据协调器发布时间刻度信息的信息通道的子名称前缀。</li>      
        <li>完整的通道名称前缀为 ${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.dataCoordTimeTick} 。</li>      
        <li>注意：在使用 Milvus 一段时间后更改此参数将影响您对旧数据的访问。</li>      
        <li>建议在首次启动 Milvus 之前更改此参数。</li>      </td>
      <td>数据记录-时间-通道</td>
    </tr>
  </tbody>
</table>
<h2 id="msgChannelchanNamePrefixdataCoordSegmentInfo" class="common-anchor-header"><code translate="no">msgChannel.chanNamePrefix.dataCoordSegmentInfo</code><button data-href="#msgChannelchanNamePrefixdataCoordSegmentInfo" class="anchor-icon" translate="no">
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
    </button></h2><table id="msgChannel.chanNamePrefix.dataCoordSegmentInfo">
  <thead>
    <tr>
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>数据协调器发布分段信息的信息通道的子名称前缀。</li>      
        <li>完整的信道名称前缀为 ${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.dataCoordSegmentInfo} 。</li>      
        <li>注意：在使用 Milvus 一段时间后更改此参数将影响您对旧数据的访问。</li>      
        <li>建议在首次启动 Milvus 之前更改此参数。</li>      </td>
      <td>段落信息通道</td>
    </tr>
  </tbody>
</table>
<h2 id="msgChannelsubNamePrefixdataCoordSubNamePrefix" class="common-anchor-header"><code translate="no">msgChannel.subNamePrefix.dataCoordSubNamePrefix</code><button data-href="#msgChannelsubNamePrefixdataCoordSubNamePrefix" class="anchor-icon" translate="no">
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
    </button></h2><table id="msgChannel.subNamePrefix.dataCoordSubNamePrefix">
  <thead>
    <tr>
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>数据坐标的订阅名称前缀。</li>      
        <li>注意：在使用 Milvus 一段时间后更改此参数将影响您对旧数据的访问。</li>      
        <li>建议在首次启动 Milvus 之前更改此参数。</li>      </td>
      <td>数据坐标</td>
    </tr>
  </tbody>
</table>
<h2 id="msgChannelsubNamePrefixdataNodeSubNamePrefix" class="common-anchor-header"><code translate="no">msgChannel.subNamePrefix.dataNodeSubNamePrefix</code><button data-href="#msgChannelsubNamePrefixdataNodeSubNamePrefix" class="anchor-icon" translate="no">
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
    </button></h2><table id="msgChannel.subNamePrefix.dataNodeSubNamePrefix">
  <thead>
    <tr>
      <th class="width80">说明</th>
      <th class="width20">默认值</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>数据节点的订阅名称前缀。</li>      
        <li>注意：在使用 Milvus 一段时间后更改此参数将影响您对旧数据的访问。</li>      
        <li>建议在首次启动 Milvus 前更改此参数。</li>      </td>
      <td>数据节点</td>
    </tr>
  </tbody>
</table>
