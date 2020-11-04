---
id: COMPATIBILITY.md
---

- 0.6.0: This version is no longer supported. 
- 0.7.0 ~ 0.91.: This version is no longer supported. We highly recommend migrating your data to v0.10.x. Before migrating your data: 
  1. Delete the **/db/wal** directory.
  2. Update your SDK to a version compatible with your current Milvus server version. 
  3. Refer to our API reference to upgrade your code for the client. 
  4. Reload and update your Milvus configuration file according to your current environment. 