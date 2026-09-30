---
id: configure_querycoord.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure queryCoord for Milvus.
---

# queryCoord-related Configurations

Related configuration of queryCoord, used to manage topology and load balancing for the query nodes, and handoff from growing segments to sealed segments.

## `queryCoord.autoHandoff`

<table id="queryCoord.autoHandoff">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Switch value to control if to automatically replace a growing segment with the corresponding indexed sealed segment when the growing segment reaches the sealing threshold.</li>      
        <li>If this parameter is set false, Milvus simply searches the growing segments with brute force.</li>      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>


## `queryCoord.autoBalance`

<table id="queryCoord.autoBalance">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Switch value to control if to automatically balance the memory usage among query nodes by distributing segment loading and releasing operations evenly.      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>


## `queryCoord.autoBalanceChannel`

<table id="queryCoord.autoBalanceChannel">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Enable auto balance channel      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>


## `queryCoord.balancer`

<table id="queryCoord.balancer">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        auto balancer used for segments on queryNodes      </td>
      <td>ScoreBasedBalancer</td>
    </tr>
  </tbody>
</table>


## `queryCoord.globalRowCountFactor`

<table id="queryCoord.globalRowCountFactor">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the weight used when balancing segments among queryNodes      </td>
      <td>0.1</td>
    </tr>
  </tbody>
</table>


## `queryCoord.scoreUnbalanceTolerationFactor`

<table id="queryCoord.scoreUnbalanceTolerationFactor">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the least value for unbalanced extent between from and to nodes when doing balance      </td>
      <td>0.05</td>
    </tr>
  </tbody>
</table>


## `queryCoord.reverseUnBalanceTolerationFactor`

<table id="queryCoord.reverseUnBalanceTolerationFactor">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the largest value for unbalanced extent between from and to nodes after doing balance      </td>
      <td>1.3</td>
    </tr>
  </tbody>
</table>


## `queryCoord.overloadedMemoryThresholdPercentage`

<table id="queryCoord.overloadedMemoryThresholdPercentage">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The threshold of memory usage (in percentage) in a query node to trigger the sealed segment balancing.      </td>
      <td>90</td>
    </tr>
  </tbody>
</table>


## `queryCoord.balanceIntervalSeconds`

<table id="queryCoord.balanceIntervalSeconds">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The interval at which query coord balances the memory usage among query nodes.      </td>
      <td>60</td>
    </tr>
  </tbody>
</table>


## `queryCoord.memoryUsageMaxDifferencePercentage`

<table id="queryCoord.memoryUsageMaxDifferencePercentage">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The threshold of memory usage difference (in percentage) between any two query nodes to trigger the sealed segment balancing.      </td>
      <td>30</td>
    </tr>
  </tbody>
</table>


## `queryCoord.rowCountFactor`

<table id="queryCoord.rowCountFactor">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the row count weight used when balancing segments among queryNodes      </td>
      <td>0.4</td>
    </tr>
  </tbody>
</table>


## `queryCoord.segmentCountFactor`

<table id="queryCoord.segmentCountFactor">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the segment count weight used when balancing segments among queryNodes      </td>
      <td>0.4</td>
    </tr>
  </tbody>
</table>


## `queryCoord.globalSegmentCountFactor`

<table id="queryCoord.globalSegmentCountFactor">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the segment count weight used when balancing segments among queryNodes      </td>
      <td>0.1</td>
    </tr>
  </tbody>
</table>


## `queryCoord.collectionChannelCountFactor`

<table id="queryCoord.collectionChannelCountFactor">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>the channel count weight used when balancing channels among queryNodes, </li>      
        <li>		A higher value reduces the likelihood of assigning channels from the same collection to the same QueryNode. Set to 1 to disable this feature.</li>      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>


## `queryCoord.segmentCountMaxSteps`

<table id="queryCoord.segmentCountMaxSteps">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        segment count based plan generator max steps      </td>
      <td>50</td>
    </tr>
  </tbody>
</table>


## `queryCoord.rowCountMaxSteps`

<table id="queryCoord.rowCountMaxSteps">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        segment count based plan generator max steps      </td>
      <td>50</td>
    </tr>
  </tbody>
</table>


## `queryCoord.randomMaxSteps`

<table id="queryCoord.randomMaxSteps">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        segment count based plan generator max steps      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>


## `queryCoord.growingRowCountWeight`

<table id="queryCoord.growingRowCountWeight">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the memory weight of growing segment row count      </td>
      <td>4</td>
    </tr>
  </tbody>
</table>


## `queryCoord.delegatorMemoryOverloadFactor`

<table id="queryCoord.delegatorMemoryOverloadFactor">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the factor of delegator overloaded memory      </td>
      <td>0.1</td>
    </tr>
  </tbody>
</table>


## `queryCoord.balanceCostThreshold`

<table id="queryCoord.balanceCostThreshold">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the threshold of balance cost, if the difference of cluster's cost after executing the balance plan is less than this value, the plan will not be executed      </td>
      <td>0.001</td>
    </tr>
  </tbody>
</table>


## `queryCoord.channelTaskTimeout`

<table id="queryCoord.channelTaskTimeout">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        1 minute      </td>
      <td>60000</td>
    </tr>
  </tbody>
</table>


## `queryCoord.segmentTaskTimeout`

<table id="queryCoord.segmentTaskTimeout">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        2 minute      </td>
      <td>120000</td>
    </tr>
  </tbody>
</table>


## `queryCoord.heartbeatAvailableInterval`

<table id="queryCoord.heartbeatAvailableInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        10s, Only QueryNodes which fetched heartbeats within the duration are available      </td>
      <td>10000</td>
    </tr>
  </tbody>
</table>


## `queryCoord.distRequestTimeout`

<table id="queryCoord.distRequestTimeout">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the request timeout for querycoord fetching data distribution from querynodes, in milliseconds      </td>
      <td>5000</td>
    </tr>
  </tbody>
</table>


## `queryCoord.heatbeatWarningLag`

<table id="queryCoord.heatbeatWarningLag">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the lag value for querycoord report warning when last heatbeat is too old, in milliseconds      </td>
      <td>5000</td>
    </tr>
  </tbody>
</table>


## `queryCoord.checkHealthInterval`

<table id="queryCoord.checkHealthInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        3s, the interval when query coord try to check health of query node      </td>
      <td>3000</td>
    </tr>
  </tbody>
</table>


## `queryCoord.checkHealthRPCTimeout`

<table id="queryCoord.checkHealthRPCTimeout">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        100ms, the timeout of check health rpc to query node      </td>
      <td>2000</td>
    </tr>
  </tbody>
</table>


## `queryCoord.brokerTimeout`

<table id="queryCoord.brokerTimeout">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        5000ms, querycoord broker rpc timeout      </td>
      <td>5000</td>
    </tr>
  </tbody>
</table>


## `queryCoord.collectionRecoverTimes`

<table id="queryCoord.collectionRecoverTimes">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        if collection recover times reach the limit during loading state, release it      </td>
      <td>3</td>
    </tr>
  </tbody>
</table>


## `queryCoord.observerTaskParallel`

<table id="queryCoord.observerTaskParallel">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the parallel observer dispatcher task number      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>


## `queryCoord.checkAutoBalanceConfigInterval`

<table id="queryCoord.checkAutoBalanceConfigInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the interval of check auto balance config      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>


## `queryCoord.checkNodeSessionInterval`

<table id="queryCoord.checkNodeSessionInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the interval(in seconds) of check querynode cluster session      </td>
      <td>60</td>
    </tr>
  </tbody>
</table>


## `queryCoord.gracefulStopTimeout`

<table id="queryCoord.gracefulStopTimeout">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        seconds. force stop node without graceful stop      </td>
      <td>5</td>
    </tr>
  </tbody>
</table>


## `queryCoord.enableStoppingBalance`

<table id="queryCoord.enableStoppingBalance">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        whether enable stopping balance      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>


## `queryCoord.channelExclusiveNodeFactor`

<table id="queryCoord.channelExclusiveNodeFactor">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the least node number for enable channel's exclusive mode      </td>
      <td>4</td>
    </tr>
  </tbody>
</table>


## `queryCoord.collectionObserverInterval`

<table id="queryCoord.collectionObserverInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the interval of collection observer      </td>
      <td>200</td>
    </tr>
  </tbody>
</table>


## `queryCoord.checkExecutedFlagInterval`

<table id="queryCoord.checkExecutedFlagInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the interval of check executed flag to force to pull dist      </td>
      <td>100</td>
    </tr>
  </tbody>
</table>


## `queryCoord.updateCollectionLoadStatusInterval`

<table id="queryCoord.updateCollectionLoadStatusInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        5m, max interval of updating collection loaded status for check health      </td>
      <td>5</td>
    </tr>
  </tbody>
</table>


## `queryCoord.cleanExcludeSegmentInterval`

<table id="queryCoord.cleanExcludeSegmentInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the time duration of clean pipeline exclude segment which used for filter invalid data, in seconds      </td>
      <td>60</td>
    </tr>
  </tbody>
</table>


## `queryCoord.ip`

<table id="queryCoord.ip">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        TCP/IP address of queryCoord. If not specified, use the first unicastable address      </td>
      <td></td>
    </tr>
  </tbody>
</table>


## `queryCoord.port`

<table id="queryCoord.port">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        TCP port of queryCoord      </td>
      <td>19531</td>
    </tr>
  </tbody>
</table>


## `queryCoord.grpc.serverMaxSendSize`

<table id="queryCoord.grpc.serverMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of each RPC request that the queryCoord can send, unit: byte      </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>


## `queryCoord.grpc.serverMaxRecvSize`

<table id="queryCoord.grpc.serverMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of each RPC request that the queryCoord can receive, unit: byte      </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>


## `queryCoord.grpc.clientMaxSendSize`

<table id="queryCoord.grpc.clientMaxSendSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of each RPC request that the clients on queryCoord can send, unit: byte      </td>
      <td>268435456</td>
    </tr>
  </tbody>
</table>


## `queryCoord.grpc.clientMaxRecvSize`

<table id="queryCoord.grpc.clientMaxRecvSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum size of each RPC request that the clients on queryCoord can receive, unit: byte      </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>


