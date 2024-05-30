BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Address" (
	"id"	TEXT,
	"streetNr"	TEXT NOT NULL,
	"streetName"	TEXT NOT NULL,
	"streetSuffix"	TEXT,
	"postcode"	TEXT NOT NULL,
	"city"	TEXT NOT NULL,
	"country"	TEXT NOT NULL,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "CustomerRefType" (
	"id"	TEXT,
	"href"	TEXT,
	"name"	TEXT,
	"description"	TEXT,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "OrderRefType" (
	"id"	TEXT,
	"href"	TEXT,
	"name"	TEXT,
	"refferedType"	TEXT,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "ShipmentTracking" (
	"id"	TEXT,
	"carrier"	TEXT NOT NULL,
	"trackingCode"	TEXT NOT NULL,
	"carrierTrackingUrl"	TEXT,
	"trackingDate"	TEXT NOT NULL,
	"status"	TEXT NOT NULL,
	"statusChangeDate"	TEXT NOT NULL,
	"weight"	NUMERIC NOT NULL,
	"estimatedDeliveryDate"	TEXT NOT NULL,
	"addressFromId"	TEXT,
	"addressToId"	TEXT,
	"orderId"	TEXT,
	"relatedCustomerId"	TEXT,
	"createDate"	TEXT NOT NULL,
	FOREIGN KEY("orderId") REFERENCES "OrderRefType"("id"),
	PRIMARY KEY("id"),
	FOREIGN KEY("relatedCustomerId") REFERENCES "CustomerRefType"("id"),
	FOREIGN KEY("addressToId") REFERENCES "Address"("id"),
	FOREIGN KEY("addressFromId") REFERENCES "Address"("id")
);
COMMIT;
