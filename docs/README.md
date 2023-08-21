# Docs

## Current Implementation

Currently we use one **Lisk** node. It is deployed in Airport.

### Contract

To update contract statement (to which accounts should be made fee transfers and how much) you need to create transaction with `Airport Module` with `Contract` asset. Landlord and Airport operator should do it separately to update theirs statements. To do it you can use Airport and Landlord software.

### Drone Account

Drone account and private key is stored in Drone and currently hardcoded.

### Airport account

To update Airport account from which we need make transfer for Landlord fee you need to update it in `lisk-db` using Airport software. On payment transaction creating `Airport Plugin` uses this key.

## Info

### Contract

We store contract in blockchain and use transaction to update it to know history of contract changing.

### Payments

We need to store contract version in payment transactions to understand payed price.

We need to save for which Drone we pay to Airport and Landlord. When pay to Landlord we need to save for which Airport.

## Future Development

### Ground Cycle

We can use pub/sub and publish Drone landing/take off events to other Drone owners, so they can adjust Drone route on the fly.

Save Drone ID and Airport ID to transactions/payments/...

How Drone can get all info about node address and Airport account, protocol for Carpet?

### Contract Changes

We can use pub/sub and publish contract changing events to other Drone owners, so they can adjust Drone route and optimize finances. We can solve TSP problem for them automatically (on the fly).

### Airport Closing

### Carpet Usage

If Drone can't pay for carpet more than 5m, carpet can arrest Drone.

Drone can use carpet for free for 5m. If Drone didn't take off more than 5m, Drone should pay more, otherwise Drone can't take off.

### Audit

How to know all transactions about landing/take off we can check that all payments was ok?

### Contract

- How to store contract not in account but in chain? If we store contract not in account can someone publish own contract statements without access to contract? 
- Multisig? One transaction to update contract between Airport and Landlord. One participant can't update contract.

### Charging

Drone can charge itself in case of long path. Drone can choose near station to do it.
