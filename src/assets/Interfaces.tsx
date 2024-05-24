export enum Status {
  initialized = "Initialized",
  inProcess = "In process",
  processed = "Processed",
  shipped = "Shipped",
  inCustoms = "In customs",
  delivered = "Delivered",
  returned = "Returned",
  error = "Error",
}

interface IAddress {
  id: string;
  streetNr: string;
  streetName: string;
  streetSuffix: string;
  postcode: string;
  city: string;
  country: string;
}

interface IOrder {
  id: string;
  href: string;
  name: string;
  referredType: string;
}

interface ICustomer {
  id: string;
  href: string;
  name: string;
  description: string;
}

export interface ISelectorComp {
  setFilter: Function;
}

export interface IShipment {
  id: string;
  carrier: string;
  trackingCode: string;
  carrierTrackingUrl: string;
  trackingDate: Date;
  status: Status;
  statusChangeDate: Date;
  statusChangeReason: string;
  weight: number;
  estimatedDeliveryDate: Date;
  addressFrom: IAddress;
  addressTo: IAddress;
  order: IOrder;
  relatedCustomer: ICustomer;
  createDate: Date;
}

export interface IShipmentsComp {
  shipmentArr: IShipment[];
  deleteFromShipmentArr: Function;
  setDetailsNotEdit: Function;
}

export interface ITrackingComp {
  shipmentArr: IShipment[];
  deleteFromShipmentArr: Function;
  setDetailsNotEdit: Function;
  setNotCreating: Function;
}

export interface IDetailedShipmentComp {
  shipmentArr: IShipment[];
  deleteFromShipmentArr: Function;
  setDetailsNotEdit: Function;
}

export interface IEditShipment {
  shipmentArr: IShipment[];
  editShipmentArr: Function;
  setDetailsNotEdit: Function;
}

export interface ICreateShipment {
  setNotCreating: Function;
}

export interface IHead {
  setNotCreating: Function;
}
