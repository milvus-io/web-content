---
id: troubleshoot.md
---

# Troubleshooting

This page describes the common issues you may run into with Milvus. The issues fall into the following categories:

## Startup issues {#1}

Issues that occur at the startup of Milvus server, and that generally lead to server startup failures. You can check the corresponding error messages by below command:

```shell
$ docker logs <milvus container id>
```

## Operational issues {#2}

Issues that occur during the server operation, which may cause server down. If you encounter issues during operation, first confirm that whether the issue is caused by the incompatibility of Milvus and SDK versions. Then check the error messages that are recorded in **/home/$USER/milvus/logs**.

## API issues {#3}

Issues that occur during the operation with Milvus through APIs. Corresponding error messages will be returned to the client in real time.

If you cannot resolve the issue by yourself, you can:

- [Join our Slack channel](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk) and reach out for support from Milvus team.
- [File an Issue](https://github.com/milvus-io/milvus/issues/new/choose) on GitHub and describe the problem in detail.
