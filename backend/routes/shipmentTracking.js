const express = require("express");
const shipmentTrackingRouter = express.Router();
const db = require("../database.js");
const { v4: uuidv4 } = require("uuid");

shipmentTrackingRouter.get("/", async (req, res) => {
  try {
    const sql =
      "select id, status, carrier, orderid, relatedcustomerid from ShipmentTracking";

    const getOrderHref = (orderId) => {
      return new Promise((resolve, reject) => {
        const orderHrefSql = "select href from OrderRefType where id = ?";
        db.get(orderHrefSql, [orderId], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row ? row.href : null);
          }
        });
      });
    };

    const getCustomerHref = (customerId) => {
      return new Promise((resolve, reject) => {
        const customerHrefSql = "select href from CustomerRefType where id = ?";
        db.get(customerHrefSql, [customerId], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row ? row.href : null);
          }
        });
      });
    };

    const rows = await new Promise((resolve, reject) => {
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    const result = await Promise.all(
      rows.map(async (row) => {
        const [orderHref, customerHref] = await Promise.all([
          getOrderHref(row.orderId),
          getCustomerHref(row.relatedCustomerId),
        ]);

        return {
          id: row.id,
          status: row.status,
          carrier: row.carrier,
          orderId: row.orderId,
          relatedCustomerId: row.relatedCustomerId,
          orderHref: orderHref,
          relatedCustomerHref: customerHref,
        };
      })
    );

    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

shipmentTrackingRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const sql = "select * from ShipmentTracking where id = ?";
    const row = await new Promise((resolve, reject) => {
      db.get(sql, [id], (err, rows) => {
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

    const [addressFrom, addressTo, order, relatedCustomer] = await Promise.all([
      getAddress(row.addressFromId),
      getAddress(row.addressToId),
      getOrder(row.orderId),
      getCustomer(row.relatedCustomerId),
    ]);

    const result = {
      id: row.id,
      carrier: row.carrier,
      trackingCode: row.trackingCode,
      carrierTrackingUrl: row.carrierTrackingUrl,
      trackingDate: row.trackingDate,
      status: row.status,
      statusChangeDate: row.statusChangeDate,
      statusChangeReason: row.statusChangeReason,
      weight: row.weight,
      estimatedDeliveryDate: row.estimatedDeliveryDate,
      addressFrom: addressFrom,
      addressTo: addressTo,
      order: order,
      relatedCustomer: relatedCustomer,
      createDate: row.createDate,
    };

    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

shipmentTrackingRouter.post("/", async (req, res) => {
  const addressSql =
    "INSERT INTO Address (id, streetNr, streetName, streetSuffix, postcode, city, country) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const addressFromId = uuidv4();
  const addressToId = uuidv4();
  const addressFromParams = [
    addressFromId,
    req.body.addressFrom.streetNr,
    req.body.addressFrom.streetName,
    req.body.addressFrom.streetSuffix,
    req.body.addressFrom.postcode,
    req.body.addressFrom.city,
    req.body.addressFrom.country,
  ];
  const addressToParams = [
    addressToId,
    req.body.addressTo.streetNr,
    req.body.addressTo.streetName,
    req.body.addressTo.streetSuffix,
    req.body.addressTo.postcode,
    req.body.addressTo.city,
    req.body.addressTo.country,
  ];

  const orderSql =
    "INSERT INTO OrderRefType (id, href, name, referredType) VALUES (?, ?, ?, ?)";
  const orderId = uuidv4();
  const orderParams = [
    orderId,
    req.body.order.href,
    req.body.order.name,
    req.body.order.referredType,
  ];

  const customerSql =
    "INSERT INTO CustomerRefType (id, href, name, description) VALUES (?, ?, ?, ?)";
  const relatedCustomerId = uuidv4();
  const customerParams = [
    relatedCustomerId,
    req.body.relatedCustomer.href,
    req.body.relatedCustomer.name,
    req.body.relatedCustomer.description,
  ];

  const shipmentTrackingSql =
    "INSERT INTO ShipmentTracking (id, carrier, trackingCode, carrierTrackingUrl, trackingDate, status, statusChangeDate, weight, estimatedDeliveryDate, addressFromId, addressToId, orderId, relatedCustomerId, createDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const shipmentTrackingId = uuidv4();
  const shipmentTrackingParams = [
    shipmentTrackingId,
    req.body.carrier,
    req.body.trackingCode,
    req.body.carrierTrackingUrl,
    req.body.trackingDate,
    req.body.status,
    req.body.statusChangeDate,
    req.body.weight,
    req.body.estimatedDeliveryDate,
    addressFromId,
    addressToId,
    orderId,
    relatedCustomerId,
    req.body.createDate,
  ];

  const insertAddress = async (addressSql, addressParams) => {
    return new Promise((resolve, reject) => {
      db.run(addressSql, addressParams, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(addressParams[0]);
        }
      });
    });
  };

  const insertOrder = async (orderSql, orderParams) => {
    return new Promise((resolve, reject) => {
      db.run(orderSql, orderParams, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(orderParams[0]);
        }
      });
    });
  };

  const insertCustomer = async (customerSql, customerParams) => {
    return new Promise((resolve, reject) => {
      db.run(customerSql, customerParams, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(customerParams[0]);
        }
      });
    });
  };

  const insertShipment = async (
    shipmentTrackingSql,
    shipmentTrackingParams
  ) => {
    return new Promise((resolve, reject) => {
      db.run(shipmentTrackingSql, shipmentTrackingParams, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(shipmentTrackingParams[0]);
        }
      });
    });
  };

  try {
    const addressFromId = await insertAddress(addressSql, addressFromParams);
    const addressToId = await insertAddress(addressSql, addressToParams);
    const orderId = await insertOrder(orderSql, orderParams);
    const relatedCustomerId = await insertCustomer(customerSql, customerParams);

    shipmentTrackingParams[9] = addressFromId;
    shipmentTrackingParams[10] = addressToId;
    shipmentTrackingParams[11] = orderId;
    shipmentTrackingParams[12] = relatedCustomerId;

    const shipmentTrackingId = await insertShipment(
      shipmentTrackingSql,
      shipmentTrackingParams
    );

    const result = {
      shipmentTrackingId: shipmentTrackingId,
      carrier: req.body.carrier,
      trackingCode: req.body.trackingCode,
      carrierTrackingUrl: req.body.carrierTrackingUrl,
      trackingDate: req.body.trackingDate,
      status: req.body.status,
      statusChangeDate: req.body.statusChangeDate,
      statusChangeReason: req.body.statusChangeReason,
      weight: req.body.weight,
      estimatedDeliveryDate: req.body.estimatedDeliveryDate,
      addressFromId: addressFromId,
      addressToId: addressToId,
      orderId: orderId,
      relatedCustomerId: relatedCustomerId,
      createDate: req.body.createDate,
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

shipmentTrackingRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const deleteShipmentSql = "DELETE FROM ShipmentTracking WHERE id = ?";
  const deleteAddressSql = "DELETE FROM Address WHERE id = ?";
  const deleteOrderSql = "DELETE FROM OrderRefType WHERE id = ?";
  const deleteCustomerSql = "DELETE FROM CustomerRefType WHERE id = ?";

  try {
    const getShipmentSql = "SELECT * FROM ShipmentTracking WHERE id = ?";
    const shipment = await new Promise((resolve, reject) => {
      db.get(getShipmentSql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });

    if (!shipment) {
      return res.status(404).json({ error: "Shipment not found" });
    }

    const { addressFromId, addressToId, orderId, relatedCustomerId } = shipment;

    await new Promise((resolve, reject) => {
      db.run(deleteShipmentSql, [id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    await new Promise((resolve, reject) => {
      db.run(deleteAddressSql, [addressFromId], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    await new Promise((resolve, reject) => {
      db.run(deleteAddressSql, [addressToId], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    await new Promise((resolve, reject) => {
      db.run(deleteOrderSql, [orderId], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    await new Promise((resolve, reject) => {
      db.run(deleteCustomerSql, [relatedCustomerId], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    res
      .status(200)
      .json({ message: "Shipment and related records deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

shipmentTrackingRouter.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updateFields = req.body;

  const validFieldsShipment = [
    "carrier",
    "trackingCode",
    "carrierTrackingUrl",
    "trackingDate",
    "status",
    "statusChangeDate",
    "weight",
    "estimatedDeliveryDate",
    "createDate",
  ];

  const validFieldsAddress = [
    "streetNr",
    "streetName",
    "streetSuffix",
    "postcode",
    "city",
    "country",
  ];

  const validFieldsOrder = ["name", "referredType"];

  const validFieldsCustomer = ["name", "description"];

  const updatesShipment = [];
  const paramsShipment = [];

  const updatesAddressFrom = [];
  const paramsAddressFrom = [];

  const updatesAddressTo = [];
  const paramsAddressTo = [];

  const updatesOrder = [];
  const paramsOrder = [];

  const updatesRelatedCustomer = [];
  const paramsRelatedCustomer = [];

  for (const [key, value] of Object.entries(updateFields)) {
    if (validFieldsShipment.includes(key)) {
      updatesShipment.push(`${key} = ?`);
      paramsShipment.push(value);
    } else if (validFieldsAddress.includes("addressFrom." + key)) {
      updatesAddressFrom.push(`${key} = ?`);
      paramsAddressFrom.push(value);
    } else if (validFieldsAddress.includes("addressTo." + key)) {
      updatesAddressTo.push(`${key} = ?`);
      paramsAddressTo.push(value);
    } else if (validFieldsOrder.includes("order." + key)) {
      updatesOrder.push(`${key} = ?`);
      paramsOrder.push(value);
    } else if (validFieldsCustomer.includes("relatedCustomer." + key)) {
      updatesRelatedCustomer.push(`${key} = ?`);
      paramsRelatedCustomer.push(value);
    }
  }

  if (
    updatesShipment.length === 0 &&
    updatesAddressFrom.length === 0 &&
    updatesAddressTo.length === 0 &&
    updatesOrder.length === 0 &&
    updatesRelatedCustomer.length === 0
  ) {
    return res.status(400).json({ error: "No valid fields to update" });
  }

  const updateShipmentSql = `UPDATE ShipmentTracking SET ${updatesShipment.join(
    ", "
  )} WHERE id = ?`;
  paramsShipment.push(id);

  const updateAddressFromSql = `UPDATE Address SET ${updatesAddressFrom.join(
    ", "
  )} WHERE id = ?`;
  paramsAddressFrom.push;

  try {
    await new Promise((resolve, reject) => {
      db.run(updateShipmentSql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    res.status(200).json({ message: "Shipment updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = shipmentTrackingRouter;
