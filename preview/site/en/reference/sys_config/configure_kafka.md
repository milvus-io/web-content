---
id: configure_kafka.md
related_key: configure
group: system_configuration.md
summary: Learn how to configure Kafka for Milvus cluster.
title: Kafka-related Configurations
---

# Kafka-related Configurations

This topic introduces the Kafka-related configurations of Milvus.

Kafka is the underlying engine supporting Milvus cluster's reliable storage and publication/subscription of message streams.

Under this section, you can configure Kafka producer, consumer, sasl information and etc.

## `kafka.producer.client.id`

<table id="kafka.producer.client.id">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Producer Client ID of Kafka service.</li>
      </td>
    </tr>
  </tbody>
</table>

## `kafka.consumer.client.id`

<table id="kafka.consumer.client.id">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Consumer Client ID of Kafka service.</li>
      </td>
    </tr>
  </tbody>
</table>

## `kafka.brokerList`

<table id="kafka.brokerList">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>List of broker addresses of Kafka service.</li>
        <li>Each value is separated from each other by comma</li>
        <li>Eg: localhost1:9092,localhost2:9092,localhost3:9092</li>
      </td>
    </tr>
  </tbody>
</table>

## `kafka.saslUsername`

<table id="kafka.saslUsername">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Username of Kafka service if <code>Simple Authentication and Security Layer</code> is enabled. </li>
      </td>
    </tr>
  </tbody>
</table>

## `kafka.saslPassword`

<table id="kafka.saslPassword">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Password of Kafka service if <code>Simple Authentication and Security Layer</code> is enabled. </li>
      </td>
    </tr>
  </tbody>
</table>

## `kafka.saslMechanisms`

<table id="kafka.saslMechanisms">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Mechanisms of Kafka service if <code>Simple Authentication and Security Layer</code> is enabled. </li>
        <li>Valid values maybe: GSSAPI, PLAIN, SCRAM, OAUTHBEARER. </li>
      </td>
    </tr>
  </tbody>
</table>

## `kafka.securityProtocol`

<table id="kafka.securityProtocol">
  <thead>
    <tr>
      <th class="width80">Description</th>
      <th class="width20">Default Value</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Security protocol of Kafka service. </li>
        <li>Valid values maybe: PLAINTEXT, SSL, SASL_PLAINTEXT, SASL_SSL. </li>
      </td>
    </tr>
  </tbody>
</table>
