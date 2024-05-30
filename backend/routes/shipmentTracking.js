const express = require("express");
const shipmentTrackingRouter = express.Router();
const db = require("../database.js");

shipmentTrackingRouter.get("/", async (req, res) => {
  try {
    const sql = "select * from ShipmentTracking";
    const rows = await new Promise((resolve, reject) => {
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    const getAddress = (id) => {
      return new Promise((resolve, reject) => {
        const sql = "select * from Address where id = ?";
        db.get(sql, [id], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    };

    const getOrder = (id) => {
      return new Promise((resolve, reject) => {
        const sql = "select * from OrderRefType where id = ?";
        db.get(sql, [id], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    };

    const getCustomer = (id) => {
      return new Promise((resolve, reject) => {
        const sql = "select * from CustomerRefType where id = ?";
        db.get(sql, [id], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    };

    const result = await Promise.all(
      rows.map(async (row) => {
        const [addressFrom, addressTo, order, relatedCustomer] =
          await Promise.all([
            getAddress(row.addressFromId),
            getAddress(row.addressToId),
            getOrder(row.orderId),
            getCustomer(row.relatedCustomerId),
          ]);

        return {
          id: row.id,
          carrier: row.carrier,
          trackingCode: row.trackingCode,
          carrierTrackingUrl: row.carrierTrackingUrl,
          trackingDate: row.trackingDate,
          status: row.status,
          statusChangeDate: row.statusChangeDate,
          weight: row.weight,
          estimatedDeliveryDate: row.estimatedDeliveryDate,
          addressFrom: addressFrom,
          addressTo: addressTo,
          order: order,
          relatedCustomer: relatedCustomer,
          createDate: row.createDate,
        };
      })
    );

    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

shipmentTrackingRouter.post("/", (req, res) => {
  const addressSql =
    "insert into Address (streetNr, streetName, streetSuffix, postcode, city, country) values (?, ?, ?, ?, ?, ?)";
  const addressParams = [
    req.body.streetNr,
    req.body.streetName,
    req.body.streetSuffix,
    req.body.postcode,
    req.body.city,
    req.body.country,
  ];

  const orderSql =
    "insert into OrderRefType (href, name, refferedType) values (?, ?, ?)";
  const orderParams = [
    req.body.orderHref,
    req.body.orderName,
    req.body.orderReferredType,
  ];

  const customerSql =
    "insert into CustomerRefType (href, name, description) values (?, ?, ?)";
  const customerParams = [
    req.body.customerHref,
    req.body.customerName,
    req.body.customerDescription,
  ];

  const shipmentTrackingSql =
    "insert into ShipmentTracking (carrier, trackingCode, carrierTrackingUrl, trackingDate, status, statusChangeDate, weight, estimatedDeliveryDate, addressFromId, addressToId, orderId, relatedCustomerId, createDate) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const shipmentTrackingParams = [
    req.body.carrier,
    req.body.trackingCode,
    req.body.carrierTrackingUrl,
    req.body.trackingDate,
    req.body.status,
    req.body.statusChangeDate,
    req.body.weight,
    req.body.estimatedDeliveryDate,
    req.body.addressFromId,
    req.body.addressToId,
    req.body.orderId,
    req.body.relatedCustomerId,
    req.body.createDate,
  ];

  db.run(addressSql, addressParams, (err, res) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
  });
  db.run(orderSql, orderParams, (err, res) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
  });
  db.run(customerSql, customerParams, (err, res) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
  });
  db.run(shipmentTrackingSql, shipmentTrackingParams, (err, res) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json({ status: "success" });
    }
  });
});

module.exports = shipmentTrackingRouter;
