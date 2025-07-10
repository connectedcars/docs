## **Organization Key (`organizationKey`): Multi-Market and Region Isolation**

The Organization Key (`organizationKey`) is a globally unique identifier (GUID).
It defines which market or country your data belongs to and guarantees that all IDs are correctly scoped and isolated across regions. 


### **How to implement a Multi-Market or Multi-Region Integration**

---

### **1. Use the `globalOrganization` query**

Always start by calling the [`globalOrganization`](https://api.connectedcars.io/graphql/graphiql/) query.

* This query does **not require authentication** — you can always get the complete list of organizations and their configuration.
* It works globally, so any API endpoint returns the same results.
* Each `GlobalOrganization` includes a unique `key` — this is the `organizationKey` you will use to scope all IDs.
* The query also returns important domain information for each organization.

The most relevant domains are:

* **`apiDomain`** — the GraphQL API endpoint for that organization.
  [See API documentation](https://docs.connectedcars.io/#/?id=graphql-api)

* **`authDomain`** — the authorization endpoint for service account tokens and logins.
  [See Auth documentation](https://docs.connectedcars.io/#/?id=auth-api)

Other domains may be relevant depending on your use case.

---

### **2. Service account mapping and authentication**

Each organization must have its own service account.
You must:

* Select the correct service account based on the `organizationKey`.
* Authenticate using the correct `authDomain` for that organization.
* Send GraphQL queries to the correct `apiDomain`.
* Never reuse tokens across different `organizationKeys`.

---

### **3. Always store IDs with the `organizationKey`**

IDs like `vehicleId`, `fleetId`, and `workshopId` are only unique within their `organizationKey`.
You must always store every ID together with its `organizationKey`.

**Example:**
A vehicle with `"vehicleId": 1234` in `"organizationKey": "connectedcarsdk"` is a different from a vehicle with `"vehicleId": 1234` in `organizationKey: "connectedcarsde"`.

```json
{
  "vehicleId": 1234,
  "organizationKey": "connectedcarsdk"
}
```

```json
{
  "vehicleId": 1234,
  "organizationKey": "connectedcarsde"
}
```

If you drop the `organizationKey`, you lose the ability to route, scope, or link data correctly.

---

### **Receiving Data via Push (Data Streams)**

When you receive data from us through the push integration [See Push integration (Data Streams) documentation](https://docs.connectedcars.io/#/./push-v2)

* The `organizationKey` will always be included with every message.
* You must persist the `organizationKey` with every ID you store.
* If you link resources (for example, vehicles to fleets), they must always have the **same `organizationKey`**. Cross-org linking is not supported.

---

## **Key takeaway**

The `organizationKey` is your trusted scope.

* Always use the [`globalOrganization`](https://api.connectedcars.io/graphql/graphiql/) query to get accurate, up-to-date configuration for each market.
* Always store the `organizationKey` with every ID.
* Always route your API and auth calls to the correct domains for each organization.

This ensures your integration remains isolated, consistent, and ready to scale across multiple markets.