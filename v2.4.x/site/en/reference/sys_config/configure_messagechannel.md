---
id: configure_messagechannel.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure message channels of Milvus.
title: Message Channel-related Configurations
---

# Message Channel-related Configurations

This topic introduces the message channel-related configurations of Milvus.

Under this section, you can configure the message channel name prefixes and component subscription name prefixes.

<div class="alert note">
<li>To share a Pulsar instance with multi-tenancy enabled among multiple Milvus instances, you need to change <code>pulsar.tenant</code> or <code>pulsar.namespace</code> to a unique value for each of the Milvus instances. </li>
<li>To share a Pulsar instance with multi-tenancy disabled among multiple Milvus instances, you need to change <code>msgChannel.chanNamePrefix.cluster</code> to a unique value for each of the Milvus instances.</li>
For details, refer to <a href="operational_faq.md#Can-I-share-a-Pulsar-instance-among-multiple-Milvus-instances">Operation FAQs</a>.
</div>

## `msgChannel.chanNamePrefix.cluster`

<table id="msgChannel.chanNamePrefix.cluster">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Root name prefix of the channel when a message channel is created.</li>
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>
        <li>To share a Pulsar instance among multiple Milvus instances, consider changing this to a name rather than the default one for each Milvus instance before you start them. For details, see <a href="operational_faq.md#Can-I-share-a-Pulsar-instance-among-multiple-Milvus-instances">Operational FAQs</a>.</li>
      </td>
      <td>"by-dev"</td>
    </tr>
  </tbody>
</table>

## `msgChannel.chanNamePrefix.rootCoordTimeTick`

<table id="msgChannel.chanNamePrefix.rootCoordTimeTick">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Sub-name prefix of the message channel where the root coord publishes time tick messages.</li>
        <li>The complete channel name prefix is <code>${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.rootCoordTimeTick}</code></li>
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>
      </td>
      <td>"rootcoord-timetick"</td>
    </tr>
  </tbody>
</table>

## `msgChannel.chanNamePrefix.rootCoordStatistics`

<table id="msgChannel.chanNamePrefix.rootCoordStatistics">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Sub-name prefix of the message channel where the root coord publishes its own statistics messages.</li>
        <li>The complete channel name prefix is <code>${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.rootCoordStatistics}</code></li>
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>
      </td>
      <td>"rootcoord-statistics"</td>
    </tr>
  </tbody>
</table>

## `msgChannel.chanNamePrefix.rootCoordDml`

<table id="msgChannel.chanNamePrefix.rootCoordDml">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Sub-name prefix of the message channel where the root coord publishes Data Manipulation Language (DML) messages.</li>
        <li>The complete channel name prefix is <code>${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.rootCoordDml}</code></li>
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>
      </td>
      <td>"rootcoord-dml"</td>
    </tr>
  </tbody>
</table>

## `msgChannel.chanNamePrefix.rootCoordDelta`

<table id="msgChannel.chanNamePrefix.rootCoordDelta">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Sub-name prefix of the message channel where the root coord publishes data deletion messages in sealed segment.</li>
        <li>The complete channel name prefix is <code>${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.rootCoordDelta}</code></li>
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>
      </td>
      <td>"rootcoord-delta"</td>
    </tr>
  </tbody>
</table>

## `msgChannel.chanNamePrefix.search`

<table id="msgChannel.chanNamePrefix.search">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Sub-name prefix of the message channel where the proxy publishes search messages.</li>
        <li>The complete channel name prefix is <code>${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.search}</code></li>
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>
      </td>
      <td>"search"</td>
    </tr>
  </tbody>
</table>

## `msgChannel.chanNamePrefix.searchResult`

<table id="msgChannel.chanNamePrefix.searchResult">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Sub-name prefix of the message channel where the query node publishes search result messages.</li>
        <li>The complete channel name prefix is <code>${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.searchResult}</code></li>
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>
      </td>
      <td>"searchResult"</td>
    </tr>
  </tbody>
</table>

## `msgChannel.chanNamePrefix.proxyTimeTick`

<table id="msgChannel.chanNamePrefix.proxyTimeTick">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Sub-name prefix of the message channel where the proxy publishes time tick messages.</li>
        <li>The complete channel name prefix is <code>${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.proxyTimeTick}</code></li>
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>
      </td>
      <td>"proxyTimeTick"</td>
    </tr>
  </tbody>
</table>

## `msgChannel.chanNamePrefix.queryTimeTick`

<table id="msgChannel.chanNamePrefix.queryTimeTick">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Sub-name prefix of the message channel where the query node publishes time tick messages.</li>
        <li>The complete channel name prefix is <code>${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.queryTimeTick}</code></li>
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>
      </td>
      <td>"queryTimeTick"</td>
    </tr>
  </tbody>
</table>

## `msgChannel.chanNamePrefix.queryNodeStats`

<table id="msgChannel.chanNamePrefix.queryNodeStats">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Sub-name prefix of the message channel where the query node publishes its own statistics messages.</li>
        <li>The complete channel name prefix is <code>${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.queryNodeStats}</code></li>
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>
      </td>
      <td>"query-node-stats"</td>
    </tr>
  </tbody>
</table>

## `msgChannel.chanNamePrefix.dataCoordInsertChannel`

<table id="msgChannel.chanNamePrefix.dataCoordInsertChannel">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Sub-name prefix of the message channel where the data coord publishes data insert messages.</li>
        <li>The complete channel name prefix is <code>${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.dataCoordInsertChannel}</code></li>
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>
      </td>
      <td>"insert-channel-"</td>
    </tr>
  </tbody>
</table>

## `msgChannel.chanNamePrefix.dataCoordStatistic`

<table id="msgChannel.chanNamePrefix.dataCoordStatistic">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Sub-name prefix of the message channel where the data coord publishes its own statistics messages.</li>
        <li>The complete channel name prefix is <code>${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.dataCoordStatistic}</code></li>
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>
      </td>
      <td>"datacoord-statistics-channel"</td>
    </tr>
  </tbody>
</table>

## `msgChannel.chanNamePrefix.dataCoordTimeTick`

<table id="msgChannel.chanNamePrefix.dataCoordTimeTick">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Sub-name prefix of the message channel where the data coord publishes time tick messages.</li>
        <li>The complete channel name prefix is <code>${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.dataCoordTimeTick}</code></li>
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>
      </td>
      <td>"datacoord-timetick-channel"</td>
    </tr>
  </tbody>
</table>

## `msgChannel.chanNamePrefix.dataCoordSegmentInfo`

<table id="msgChannel.chanNamePrefix.dataCoordSegmentInfo">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Sub-name prefix of the message channel where the data coord publishes segment information messages.</li>
        <li>The complete channel name prefix is <code>${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.dataCoordSegmentInfo}</code></li>
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>
      </td>
      <td>"segment-info-channel"</td>
    </tr>
  </tbody>
</table>


## `msgChannel.subNamePrefix.rootCoordSubNamePrefix`

<table id="msgChannel.subNamePrefix.rootCoordSubNamePrefix">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Subscription name prefix of the root coord.</li>
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>
      </td>
      <td>"rootCoord"</td>
    </tr>
  </tbody>
</table>

## `msgChannel.subNamePrefix.proxySubNamePrefix`

<table id="msgChannel.subNamePrefix.proxySubNamePrefix">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Subscription name prefix of the proxy.</li>
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>
      </td>
      <td>"proxy"</td>
    </tr>
  </tbody>
</table>

## `msgChannel.subNamePrefix.queryNodeSubNamePrefix`

<table id="msgChannel.subNamePrefix.queryNodeSubNamePrefix">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Subscription name prefix of the query node.</li>
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>
      </td>
      <td>"queryNode"</td>
    </tr>
  </tbody>
</table>

## `msgChannel.subNamePrefix.dataNodeSubNamePrefix`

<table id="msgChannel.subNamePrefix.dataNodeSubNamePrefix">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Subscription name prefix of the data node.</li>
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>
      </td>
      <td>"dataNode"</td>
    </tr>
  </tbody>
</table>

## `msgChannel.subNamePrefix.dataCoordSubNamePrefix`

<table id="msgChannel.subNamePrefix.dataCoordSubNamePrefix">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Subscription name prefix of the data coord.</li>
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>
      </td>
      <td>"dataCoord"</td>
    </tr>
  </tbody>
</table>

