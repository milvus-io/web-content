# LoadState

This Enum represents the load state of a collection or partition returned by `GetLoadState()`. A collection or partition must be in the `LOAD_STATE_LOADED` state before search and query operations can be performed on it.

**VALUES:**

- **LOAD_STATE_NOT_EXIST** (0) - The collection or partition does not exist.

- **LOAD_STATE_NOT_LOAD** (1) - The collection or partition exists but has not been loaded into query node memory. Call `LoadCollection()` or `LoadPartitions()` before searching.

- **LOAD_STATE_LOADING** (2) - The collection or partition is currently being loaded into query node memory. Wait for the state to transition to `LOAD_STATE_LOADED`.

- **LOAD_STATE_LOADED** (3) - Fully loaded and ready for `Search()` and `Query()` operations.

## Example

