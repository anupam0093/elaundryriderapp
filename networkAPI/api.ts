import axios from "axios";
import { API_URL } from "./env";
import { Login } from "./types";
import { getToken } from "./services/auth.service";

// export const login = (username: string, password: string): Promise<any> =>
//   axios
//     .post<Login>("/auth/signin", { username, password })
//     .then((response) => response.data);

//  ====================== signin =====================================================
export const handleLoginUser = async (username: string, password: string) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${API_URL}/auth/signin`,
      data: {
        username: username,
        password: password,
      },
    });

    return data;
  } catch (error) {
    console.log("Error:", error);
  }
};

//  ====================== loginSuccess =====================================================
export const getAccountInfo = async (
  accessToken: string,
  tokenType: string
) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${API_URL}/home/loginsuccess`,
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenType + " " + accessToken,
      },
    });

    return response;
  } catch (error) {
    console.log({ error });
  }
};

//=============================== AddnewCustomer========================================================================

export const handleAddCustomer = async (
  storeId: string,
  firstName: string,
  mobileNo: string,
  token: string
) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${API_URL}/auth/customer/store-customer/${storeId}`,
      data: {
        storeId: storeId,
        firstName: firstName,
        mobileNo: mobileNo,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic" + " " + token,
      },
    });

    return data;
  } catch (error) {
    console.log("Error:", error);
  }
};

// ============================= search store by mobile no ============4======================

export const searchStoreCustomerByMobile = async (
  mobileNo: string,
  storeId: string,
  token: string
) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${API_URL}/auth/customer/store-customer/${mobileNo}/${storeId}/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic" + " " + token,
      },
    });
    return data;
  } catch (error) {
    console.log("loveme", error);
  }
};

//================================== Get Garments Image/price/=======================================

export const searchGarmentByStoreId = async (
  storeId: string,
  accessToken: string
) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${API_URL}/auth/store/garment-price/${storeId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

//========================= Get Charge Store Id ===================================================================

export const getChargeByStoreId = async (
  storeId: string,
  accessToken: string
) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${API_URL}/auth/store/charges/${storeId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
//========================= Get Discount by Store Id ===================================================================

export const getDiscountByStoreId = async (
  storeId: string,
  accessToken: string
) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${API_URL}/auth/store/discount/${storeId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

//======================== Payment mode ============================================================================

export const getPaymentMode = async (accessToken: string) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${API_URL}/auth/store/payment-mode`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

//=============================== All Pickups by storeId ===============================================================

export const searchAllPickupbystoreId = async (
  storeId: string,
  accessToken: string,
  storeUserId: string
) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${API_URL}/auth/store/${storeId}/rider/${storeUserId}/pickup`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

// ============================ All deliver by storeId ===============================================================

export const searchAllDeliverybystoreId = async (
  storeId: string,
  accessToken: string,
  storeUserId: string
) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${API_URL}/auth/store/${storeId}/rider/${storeUserId}/delivery`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

// ======================================== Post OrderApi============================================================

export const handlPostOrder = async (
  token: string,
  id: number,
  priceListId: number,
  storeUserId: number,
  storeCustomerId: number,
  customer: null,
  store: null,
  orderChargeDiscount: null,
  totalQuantity: number,
  itemGarmentCount: number,
  remarks: null,
  totalAmount: number,
  gstType: string,
  orderSource: string,
  gstPercent: number,
  taxableAmount: number,
  gstAmount: number,
  paymentMode: string,
  discountAmount: number,
  chargeAmount: number,
  grandTotal:number,
  depressionAmount:null,
  status:string,
  deliveryOn:string,
  deliveredOn:null,
  prepareOn:null,
  sttleStatus:null,
  orderNo:string,
  invoiceNo:string,
  orderOn:string,
  orderItem:null,
  orderPackage:null,
  storeCustomerGstNo:string,
  paymentRefNo:null,
  deliveryRequest:null,
  urgentDelivery:null


) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${API_URL}/auth/order`,
      data: {
        token: token,
        id: id,
        priceListId: priceListId,
        storeUserId: store,
        storeCustomerId: storeCustomerId,
        customer: customer,
        store: store,
        orderChargeDiscount: orderChargeDiscount,
        totalQuantity: totalQuantity,
        itemGarmentCount: itemGarmentCount,
        remarks: remarks,
        totalAmount: totalAmount,
        gstType: gstType,
        orderSource: orderSource,
        gstPercent: gstPercent,
        taxableAmount: taxableAmount,
        gstAmount: gstAmount,
        paymentMode: paymentMode,
        discountAmount: discountAmount,
        chargeAmount: chargeAmount,
        grandTotal:grandTotal,
        depressionAmount:depressionAmount,
        status:status,
        deliveryOn:deliveryOn,
        deliveredOn:deliveredOn,
        prepareOn:prepareOn,
        sttleStatus:sttleStatus,
        orderNo:orderNo,
        invoiceNo:invoiceNo,
        orderOn:orderOn,
        orderItem:orderItem,
        orderPackage:orderPackage,
        storeCustomerGstNo:storeCustomerGstNo,
        paymentRefNo:paymentRefNo,
        deliveryRequest:deliveryRequest,
        urgentDelivery:urgentDelivery
      
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic" + " " + token,
      },
    });

    return data;
  } catch (error) {
    console.log("Error:", error);
  }
};
