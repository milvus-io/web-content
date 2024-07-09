---
id: configure_nats.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure NATs for Milvus standalone.
title: NATS-related Configurations
---

# NATS-related Configurations

This topic introduces the NATs-related configurations of Milvus.

NATS is a message-oriented middleware that allows data exchange between applications and services, segmented in the form of messages. Milvus uses NATS as a underlying engine for reliable storage and pub/sub of message streams. You can use it as an alternative to RocksMQ.

Under this section, you can configure message size, retention time and size, etc.

## `natsmq.server.port`

<table id="rocksmq.path">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        Listening port of the NATS server.
      </td>
      <td><code>4222</code></td>
    </tr>
  </tbody>
</table>

## `natsmq.server.storeDir`

<table id="rocksmq.path">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        JetStream storage path.
      </td>
      <td><code>/var/lib/milvus/nats</code></td>
    </tr>
  </tbody>
</table>

## `natsmq.server.maxFileStore`

<table id="rocksmq.path">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        Maximum size of the <b>file</b> storage.
      </td>
      <td><code>17179869184</code> (16 GB)</td>
    </tr>
  </tbody>
</table>

## `natsmq.server.maxPayload`

<table id="rocksmq.path">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        Maximum size of the payload per message in bytes.
      </td>
      <td><code>8388608</code> (8 MB)</td>
    </tr>
  </tbody>
</table>

## `natsmq.server.maxPending`

<table id="rocksmq.path">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        Maximum buffer size per client connection in bytes.
      </td>
      <td><code>67108864</code> (64 MB)</td>
    </tr>
  </tbody>
</table>

## `natsmq.server.initializeTimeout`

<table id="rocksmq.path">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        Timeout duration for NATs to initialize in milliseconds.
      </td>
      <td><code>4000</code> (4 seconds)</td>
    </tr>
  </tbody>
</table>

## `natsmq.monitor.debug`

<table id="rocksmq.path">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        Whether to enable debug logs
      </td>
      <td><code>false</code></td>
    </tr>
  </tbody>
</table>

## `natsmq.monitor.logTime`

<table id="rocksmq.path">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        Whether to include timestamps in debug logs.
      </td>
      <td><code>true</code></td>
    </tr>
  </tbody>
</table>

## `natsmq.monitor.logFile`

<table id="rocksmq.path">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Storage path of the log files generated.</li>
        <li>If left unspecified, no log files are to be generated.</li>
      </td>
      <td>N/A</td>
    </tr>
  </tbody>
</table>

## `natsmq.monitor.logSizeLimit`

<table id="rocksmq.path">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Maximum size per log file in bytes.</li>
        <li>If it is set to <code>0</code>, no limit applies.</li>
      </td>
      <td><code>0</code></td>
    </tr>
  </tbody>
</table>

## `natsmq.rentention.maxAge`

<table id="rocksmq.path">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        Maximum age per message in the P-channel in minutes.
      </td>
      <td><code>4320</code> (3 days)</td>
    </tr>
  </tbody>
</table>

## `natsmq.rentention.maxBytes`

<table id="rocksmq.path">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Maximum age per message in the P-channel in minutes.</li>
        <li>If it is left unspecified, no limit applies.</li>
      </td>
      <td>N/A</td>
    </tr>
  </tbody>
</table>

## `natsmq.rentention.maxMsgs`

<table id="rocksmq.path">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Maximum number of messages per P-channel.</li>
        <li>If it is left unspecified, no limit applies.</li>
      </td>
      <td>N/A</td>
    </tr>
  </tbody>
</table>
