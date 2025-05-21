---
id: configure_mq.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure mq for Milvus.
---

# mq-related Configurations

Milvus supports four MQ: rocksmq(based on RockDB), natsmq(embedded nats-server), Pulsar and Kafka.

You can change your mq by setting mq.type field.

If you don't set mq.type field as default, there is a note about enabling priority if we config multiple mq in this file.

1. standalone(local) mode: rocksmq(default) > natsmq > Pulsar > Kafka

2. cluster mode:  Pulsar(default) > Kafka (rocksmq and natsmq is unsupported in cluster mode)

## `mq.type`

<table id="mq.type">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Default value: "default"</li>      
        <li>Valid values: [default, pulsar, kafka, rocksmq, natsmq]</li>      </td>
      <td>default</td>
    </tr>
  </tbody>
</table>


## `mq.enablePursuitMode`

<table id="mq.enablePursuitMode">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Default value: "true"      </td>
      <td>true</td>
    </tr>
  </tbody>
</table>


## `mq.pursuitLag`

<table id="mq.pursuitLag">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        time tick lag threshold to enter pursuit mode, in seconds      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>


## `mq.pursuitBufferSize`

<table id="mq.pursuitBufferSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        pursuit mode buffer size in bytes      </td>
      <td>8388608</td>
    </tr>
  </tbody>
</table>


## `mq.pursuitBufferTime`

<table id="mq.pursuitBufferTime">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        pursuit mode buffer time in seconds      </td>
      <td>60</td>
    </tr>
  </tbody>
</table>


## `mq.mqBufSize`

<table id="mq.mqBufSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        MQ client consumer buffer length      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>


## `mq.dispatcher.mergeCheckInterval`

<table id="mq.dispatcher.mergeCheckInterval">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the interval time(in seconds) for dispatcher to check whether to merge      </td>
      <td>1</td>
    </tr>
  </tbody>
</table>


## `mq.dispatcher.targetBufSize`

<table id="mq.dispatcher.targetBufSize">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        the lenth of channel buffer for targe      </td>
      <td>16</td>
    </tr>
  </tbody>
</table>


## `mq.dispatcher.maxTolerantLag`

<table id="mq.dispatcher.maxTolerantLag">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Default value: "3", the timeout(in seconds) that target sends msgPack      </td>
      <td>3</td>
    </tr>
  </tbody>
</table>


## `mq.dispatcher.maxDispatcherNumPerPchannel`

<table id="mq.dispatcher.maxDispatcherNumPerPchannel">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        The maximum number of dispatchers per physical channel, primarily to limit the number of consumers and prevent performance issues(e.g., during recovery when a large number of channels are watched).      </td>
      <td>5</td>
    </tr>
  </tbody>
</table>


## `mq.dispatcher.retrySleep`

<table id="mq.dispatcher.retrySleep">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        register retry sleep time in seconds      </td>
      <td>3</td>
    </tr>
  </tbody>
</table>


## `mq.dispatcher.retryTimeout`

<table id="mq.dispatcher.retryTimeout">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        register retry timeout in seconds      </td>
      <td>60</td>
    </tr>
  </tbody>
</table>


