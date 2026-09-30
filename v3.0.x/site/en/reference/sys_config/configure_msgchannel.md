---
id: configure_msgchannel.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure msgChannel for Milvus.
---

# msgChannel-related Configurations

This topic introduces the message channel-related configurations of Milvus.

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
        <li>To share a Pulsar instance among multiple Milvus instances, consider changing this to a name rather than the default one for each Milvus instance before you start them.</li>      </td>
      <td>by-dev</td>
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
        <li>The complete channel name prefix is ${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.rootCoordTimeTick}</li>      
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>      
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>      </td>
      <td>rootcoord-timetick</td>
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
        <li>The complete channel name prefix is ${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.rootCoordStatistics}</li>      
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>      
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>      </td>
      <td>rootcoord-statistics</td>
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
        <li>The complete channel name prefix is ${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.rootCoordDml}</li>      
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>      
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>      </td>
      <td>rootcoord-dml</td>
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
        <li>The complete channel name prefix is ${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.queryTimeTick}</li>      
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>      
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>      </td>
      <td>queryTimeTick</td>
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
        <li>The complete channel name prefix is ${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.dataCoordTimeTick}</li>      
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>      
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>      </td>
      <td>datacoord-timetick-channel</td>
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
        <li>The complete channel name prefix is ${msgChannel.chanNamePrefix.cluster}-${msgChannel.chanNamePrefix.dataCoordSegmentInfo}</li>      
        <li>Caution: Changing this parameter after using Milvus for a period of time will affect your access to old data.</li>      
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>      </td>
      <td>segment-info-channel</td>
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
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>      </td>
      <td>dataCoord</td>
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
        <li>It is recommended to change this parameter before starting Milvus for the first time.</li>      </td>
      <td>dataNode</td>
    </tr>
  </tbody>
</table>


