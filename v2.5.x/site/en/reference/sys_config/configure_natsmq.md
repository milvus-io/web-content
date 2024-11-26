---
id: configure_natsmq.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure natsmq for Milvus.
---

# natsmq-related Configurations

natsmq configuration.

more detail: https://docs.nats.io/running-a-nats-service/configuration

## `natsmq.server.port`

<table id="natsmq.server.port">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Listening port of the NATS server.      </td>
      <td>4222</td>
    </tr>
  </tbody>
</table>


## `natsmq.server.storeDir`

<table id="natsmq.server.storeDir">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Directory to use for JetStream storage of nats      </td>
      <td>/var/lib/milvus/nats</td>
    </tr>
  </tbody>
</table>


## `natsmq.server.maxFileStore`

<table id="natsmq.server.maxFileStore">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximum size of the 'file' storage      </td>
      <td>17179869184</td>
    </tr>
  </tbody>
</table>


## `natsmq.server.maxPayload`

<table id="natsmq.server.maxPayload">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximum number of bytes in a message payload      </td>
      <td>8388608</td>
    </tr>
  </tbody>
</table>


## `natsmq.server.maxPending`

<table id="natsmq.server.maxPending">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximum number of bytes buffered for a connection Applies to client connections      </td>
      <td>67108864</td>
    </tr>
  </tbody>
</table>


## `natsmq.server.initializeTimeout`

<table id="natsmq.server.initializeTimeout">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        waiting for initialization of natsmq finished      </td>
      <td>4000</td>
    </tr>
  </tbody>
</table>


## `natsmq.server.monitor.trace`

<table id="natsmq.server.monitor.trace">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        If true enable protocol trace log messages      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `natsmq.server.monitor.debug`

<table id="natsmq.server.monitor.debug">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        If true enable debug log messages      </td>
      <td>false</td>
    </tr>
  </tbody>
</table>


## `natsmq.server.monitor.logTime`

<table id="natsmq.server.monitor.logTime">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        If set to false, log without timestamps.      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>


## `natsmq.server.monitor.logFile`

<table id="natsmq.server.monitor.logFile">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Log file path relative to .. of milvus binary if use relative path      </td>
      <td>/tmp/milvus/logs/nats.log</td>
    </tr>
  </tbody>
</table>


## `natsmq.server.monitor.logSizeLimit`

<table id="natsmq.server.monitor.logSizeLimit">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Size in bytes after the log file rolls over to a new one      </td>
      <td>536870912</td>
    </tr>
  </tbody>
</table>


## `natsmq.server.retention.maxAge`

<table id="natsmq.server.retention.maxAge">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Maximum age of any message in the P-channel      </td>
      <td>4320</td>
    </tr>
  </tbody>
</table>


## `natsmq.server.retention.maxBytes`

<table id="natsmq.server.retention.maxBytes">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        How many bytes the single P-channel may contain. Removing oldest messages if the P-channel exceeds this size      </td>
      <td></td>
    </tr>
  </tbody>
</table>


## `natsmq.server.retention.maxMsgs`

<table id="natsmq.server.retention.maxMsgs">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        How many message the single P-channel may contain. Removing oldest messages if the P-channel exceeds this limit      </td>
      <td></td>
    </tr>
  </tbody>
</table>


