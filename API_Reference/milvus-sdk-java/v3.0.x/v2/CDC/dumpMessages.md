# dumpMessages()

This operation streams WAL messages from a physical channel for data salvage and replication diagnostics. Use it with a checkpoint returned by `getReplicateInfo`.

```java
public DumpMessagesResp dumpMessages(DumpMessagesReq request)
```

## Request Syntax

```java
dumpMessages(DumpMessagesReq.builder()
    .pchannel(String pchannel)
    .startMessageID(GetReplicateInfoResp.MessageID startMessageID)
    .startTimetick(Long startTimetick)
    .endTimetick(Long endTimetick)
    .includeStartMessage(Boolean includeStartMessage)
    .build());
```

**BUILDER METHODS:**

- `pchannel(String pchannel)`

    The physical channel to dump messages from.

- `startMessageID(GetReplicateInfoResp.MessageID startMessageID)`

    The WAL start position. `walName` supports `RocksMQ`, `Pulsar`, `Kafka`, and `WoodPecker`.

- `startTimetick(Long startTimetick)`

    The inclusive lower timetick bound. Defaults to `0L`.

- `endTimetick(Long endTimetick)`

    The upper timetick bound. Defaults to `0L`.

- `includeStartMessage(Boolean includeStartMessage)`

    Whether to include the start message itself. Defaults to `Boolean.TRUE`.

**RETURN TYPE:**

*DumpMessagesResp*

**RETURNS:**

A **DumpMessagesResp** object that contains the dumped messages.

- `getMessages()` (*Iterable\<DumpMessageInfo\>*) -

    The dumped messages. Each **DumpMessageInfo** has the following getters:

    - `getMessageID()` (*MessageID*) -

        The ID of the message.

    - `getPayload()` (*byte[]*) -

        The payload of the message.

    - `getProperties()` (*Map\<String, String\>*) -

        The properties of the message.

**EXCEPTIONS