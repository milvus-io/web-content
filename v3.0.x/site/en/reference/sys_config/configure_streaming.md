---
id: configure_streaming.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure streaming for Milvus.
---

# streaming-related Configurations

Any configuration related to the streaming service.

## `streaming.walBalancer.triggerInterval`

<table id="streaming.walBalancer.triggerInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The interval of balance task trigger at background, 1 min by default. </li>      
        <li>It's ok to set it into duration string, such as 30s or 1m30s, see time.ParseDuration</li>      </td>
      <td>1m</td>
    </tr>
  </tbody>
</table>


## `streaming.walBalancer.backoffInitialInterval`

<table id="streaming.walBalancer.backoffInitialInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>The initial interval of balance task trigger backoff, 50 ms by default. </li>      
        <li>It's ok to set it into duration string, such as 30s or 1m30s, see time.ParseDuration</li>      </td>
      <td>50ms</td>
    </tr>
  </tbody>
</table>


## `streaming.walBalancer.backoffMultiplier`

<table id="streaming.walBalancer.backoffMultiplier">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The multiplier of balance task trigger backoff, 2 by default      </td>
      <td>2</td>
    </tr>
  </tbody>
</table>


## `streaming.walBroadcaster.concurrencyRatio`

<table id="streaming.walBroadcaster.concurrencyRatio">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The concurrency ratio based on number of CPU for wal broadcaster, 1 by default.      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>


## `streaming.txn.defaultKeepaliveTimeout`

<table id="streaming.txn.defaultKeepaliveTimeout">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The default keepalive timeout for wal txn, 10s by default      </td>
      <td>10s</td>
    </tr>
  </tbody>
</table>


