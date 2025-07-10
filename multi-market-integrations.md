## **Organization Key (`organizationKey`): Multi-Market and Region Isolation**

The Organization Key (`organizationKey`) is a globally unique identifier (GUID).
It defines which market or country your data belongs to and guarantees that all IDs are correctly scoped and isolated across regions. 


### **How to implement a Multi-Market or Multi-Region Integration**

---

### **1. Use the `globalOrganization` query**

Always start by calling the [`globalOrganizations`](https://api.connectedcars.io/graphql/graphiql/) query.

* This query does **not require authentication** — you can always get the complete list of organizations and their configuration.
* It works globally, so any API endpoint returns the same results.
* Each `GlobalOrganization` includes a unique `key` — this is the `organizationKey` you will use to scope all IDs.
* The query also returns important domain information for each organization.

The most relevant domains are:

* **`apiDomain`** — the GraphQL API endpoint for that organization.
  [See API documentation](https://docs.connectedcars.io/#/?id=graphql-api)

* **`authApiDomain`** — the authorization endpoint for service account tokens and logins.
  [See Auth documentation](https://docs.connectedcars.io/#/?id=auth-api)

Other domains may be relevant depending on your use case.

---

### **2. Service account mapping, organization namespaces, and authentication**

Each organization must have its own **service account**, tied to an **organization namespace**.
An **organization namespace** is simply the combination of your `organizationKey` and a product-specific suffix — for example:

```
${organizationKey}:workshop
```

**Example:**

```
"connectedcarsdk:workshop"
```

---

**Why this matters:**
If your integration uses **multiple products** under the same `organizationKey`, each product will have its own **organization namespace**.
For example:

* `${organizationKey}:workshop` — for the workshop product
* `${organizationKey}:default` — for the fleet product
* `${organizationKey}:leasing` — for the leasing product

Connected Cars will provide you with multiple service accounts if this is the case.

---

**Key point:**
If you operate more than one product, you must ensure your integration:

* Uses the **correct organization namespace** for each product.
* Uses the **matching service account** that is scoped to that namespace.
* Does not reuse a service account or token across different organization namespaces.

---

**How to handle this:**

* Map each **organization namespace** and service account in your configuration, based on the product you are using,
  
* The list of namespaces can be fetched from the `namespaces` field in the [`globalOrganizations`](https://api.connectedcars.io/graphql/graphiql/) query.

When you authenticate:

* Use the correct **service account** for the resolved organization namespace.
* Use the correct **`authApiDomain`** for that organization.
* Send GraphQL queries to the correct **`apiDomain`**.
* Never reuse tokens across different `organizationKeys` or namespaces.

> **Important:** If you work with multiple products, the **organization namespace** must always match the product.
> Always resolve the correct namespace based on the `organizationKey` **and** product context.
> Do not assume `:workshop` applies to every scenario.

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

* Always use the [`globalOrganizations`](https://api.connectedcars.io/graphql/graphiql/) query to get accurate, up-to-date configuration for each market.
* Always store the `organizationKey` with every ID.
* Always route your API and auth calls to the correct domains for each organization.

This ensures your integration remains isolated, consistent, and ready to scale across multiple markets.