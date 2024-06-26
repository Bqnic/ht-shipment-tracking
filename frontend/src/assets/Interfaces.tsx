export enum Status {
  Initialized = "Initialized",
  inProcess = "In process",
  processed = "Processed",
  shipped = "Shipped",
  inCustoms = "In customs",
  delivered = "Delivered",
  returned = "Returned",
  error = "Error",
}

export interface IAddress {
  id: string;
  streetNr: string;
  streetName: string;
  streetSuffix: string;
  postcode: string;
  city: string;
  country: string;
}

export interface IOrder {
  id: string;
  href: string;
  name: string;
  referredType: string;
}

export interface ICustomer {
  id: string;
  href: string;
  name: string;
  description: string;
}

export interface ISelectorComp {
  setFilter: Function;
  setSubFilter: Function;
  filter: string;
  subFilter: string;
}

export interface IShipment {
  id: string;
  carrier: string;
  status: keyof typeof Status;
  orderId: string;
  orderHref: string;
  relatedCustomerId: string;
  relatedCustomerHref: string;
}

export interface IDetailedShipment {
  id: string;
  carrier: string;
  trackingCode: string;
  carrierTrackingUrl: string;
  trackingDate: Date;
  status: keyof typeof Status;
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
  filter: string;
  subFilter: string;
}

export interface ITrackingComp {
  shipmentArr: IShipment[];
  deleteFromShipmentArr: Function;
  setDetailsNotEdit: Function;
  setNotCreating: Function;
  filter: string;
  setFilter: Function;
  subFilter: string;
  setSubFilter: Function;
}

export interface IDetailedShipmentComp {
  deleteFromShipmentArr: Function;
  setDetailsNotEdit: Function;
}

export interface IEditShipment {
  editShipmentArr: Function;
  setDetailsNotEdit: Function;
}

export interface ICreateShipment {
  setNotCreating: Function;
  addShipment: Function;
}

export interface IHead {
  setNotCreating: Function;
}

export const initialShipment: IDetailedShipment = {
  id: "",
  carrier: "",
  trackingCode: "",
  carrierTrackingUrl: "",
  trackingDate: new Date(),
  status: "Initialized",
  statusChangeDate: new Date(),
  statusChangeReason: "",
  weight: 0,
  estimatedDeliveryDate: new Date(),
  addressFrom: {
    id: "",
    streetNr: "",
    streetName: "",
    streetSuffix: "",
    postcode: "",
    city: "",
    country: "",
  },
  addressTo: {
    id: "",
    streetNr: "",
    streetName: "",
    streetSuffix: "",
    postcode: "",
    city: "",
    country: "",
  },
  order: {
    id: "",
    href: "",
    name: "",
    referredType: "",
  },
  relatedCustomer: {
    id: "",
    href: "",
    name: "",
    description: "",
  },
  createDate: new Date(),
};
