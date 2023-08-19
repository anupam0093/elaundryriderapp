// export class AuthService {
//   sendToken(token: string) {
//     localStorage.setItem("userToken", "Basic " + token);
//   }
//   getToken() {
//     return localStorage.getItem("userToken");
//   }
//   isLoggednIn() {
//     return this.getToken() !== null;
//   }
//   // logout() {
//   //     localStorage.clear();
//   // localStorage.removeItem('userToken');
//   // localStorage.removeItem('storeId');
//   // localStorage.removeItem('storeUserId');
//   // localStorage.removeItem('wareHouseId');
//   // localStorage.removeItem('wareHouseUserId');
//   // localStorage.removeItem('brandId');
//   // localStorage.removeItem('loggedInUserInfo');
//   // localStorage.removeItem('email');
//   // localStorage.removeItem('mobileNo');
//   // localStorage.removeItem('name');

//   //     this.router.navigate(['authentication/login']);
//   // }
//   setStoreId(id: string) {
//     localStorage.setItem("storeId", id);
//   }

//   getStoreId() {
//     return localStorage.getItem("storeId");
//   }

//   setBrandId(id: string) {
//     localStorage.setItem("brandId", id);
//   }

//   getBrandId() {
//     return localStorage.getItem("brandId");
//   }

//   getWareHouseId() {
//     return localStorage.getItem("wareHouseId");
//   }

//   setWareHouseId(id: string) {
//     localStorage.setItem("wareHouseId", id);
//   }

//   getWareHouseUserId() {
//     return localStorage.getItem("wareHouseUserId");
//   }

//   setWareHouseUserId(id: string) {
//     localStorage.setItem("wareHouseUserId", id);
//   }

//   // setLoggedInUserInfo(loggedInUserInfo: any[]) {
//   //     localStorage.setItem('loggedInUserInfo', JSON.stringify(loggedInUserInfo));
//   // }

//   // getLoggedInUserInfo() {
//   //     return JSON.parse(localStorage.getItem('loggedInUserInfo'));
//   // }

//   setLoggedInUserInfo(loggedInUserInfo: any[]) {
//     localStorage.setItem("loggedInUserInfo", JSON.stringify(loggedInUserInfo));
//   }

//   // getLoggedInUserInfo() {
//   //     return JSON.parse(localStorage.getItem('loggedInUserInfo'));
//   // }

//   setAdminUserId(adminUserId: string) {
//     localStorage.setItem("adminUserId", adminUserId);
//   }

//   getAdminUserId() {
//     return localStorage.getItem("adminUserId");
//   }

//   setAdminEmailId(email: string) {
//     localStorage.setItem("email", email);
//   }

//   getAdminEmailId() {
//     return localStorage.getItem("email");
//   }

//   setAdminMobileNo(mobileNo: string) {
//     localStorage.setItem("mobileNo", mobileNo);
//   }

//   getAdminMobileNo() {
//     return localStorage.getItem("mobileNo");
//   }

//   setAdminName(name: string) {
//     localStorage.setItem("name", name);
//   }

//   getAdminName() {
//     return localStorage.getItem("name");
//   }

//   setStoreUserId(storeUserId: string) {
//     localStorage.setItem("storeUserId", storeUserId);
//   }

//   getStoreUserId() {
//     return localStorage.getItem("storeUserId");
//   }

//   // checkRequestIsValid(){
//   //     if (this.isLoggednIn()) {
//   //         console.log("===== logged in ======")
//   //         // return true;
//   //     } else {
//   //         console.log("===== not logged in ======")
//   //         this.router.navigate(['authentication/login']);
//   //         // return false;
//   //     }
//   // }

//   // getStorePrinterServiceSetUpStatus() {
//   //     return localStorage.getItem('storePrinterServiceSetUpStatus');
//   // }
//   // setStorePrinterServiceSetUpStatus(status){
//   //     localStorage.setItem('storePrinterServiceSetUpStatus', status);
//   // }

//   // getViewOrderType() {
//   //     return localStorage.getItem('orderType');
//   // }
//   // setViewOrderType(orderType){
//   //     localStorage.setItem('orderType', status);
//   // }

//   // getOrderType() {
//   //     return localStorage.getItem('orderType');
//   // }
//   // setOrderType(orderType){
//   //     localStorage.setItem('orderType', status);
//   // }

//   // getReportRequestDateBy() {
//   //     return localStorage.getItem('reportRequestDateBy');
//   // }
//   // setReportRequestDateBy(reportRequestDateBy){
//   //     localStorage.setItem('reportRequestDateBy', reportRequestDateBy);
//   // }

//   // getReportRequestDateValue() {
//   //     return localStorage.getItem('reportRequestDateValue');
//   // }
//   // setReportRequestDateValue(reportRequestDateValue){
//   //     localStorage.setItem('reportRequestDateValue', reportRequestDateValue);
//   // }

//   // getFilterEndDate() {
//   //     return localStorage.getItem('filterEndDate');
//   // }
//   // setFilterEndDate(filterEndDate){
//   //     localStorage.setItem('filterEndDate', filterEndDate);
//   // }

//   // getFilterStartDate() {
//   //     return localStorage.getItem('filterStartDate');
//   // }
//   // setFilterStartDate(filterStartDate){
//   //     localStorage.setItem('filterStartDate', filterStartDate);
//   // }

//   // getRecordType() {
//   //     return localStorage.getItem('recordType');
//   // }
//   // setRecordType(recordType){
//   //     localStorage.setItem('recordType', recordType);
//   // }
// }

export const sendToken = (token: string) => {
  localStorage.setItem("userToken", "Basic " + token);
};

export const getToken = () => {
  return localStorage.getItem("userToken");
};

export const setStoreId = (id: string) => {
  localStorage.setItem("storeId", id);
};

export const getStoreId = () => {
  return localStorage.getItem("storeId");
};

export const setStoreUserId = (storeUserId: string) => {
  localStorage.setItem("storeUserId", storeUserId);
};

export const getStoreUserId = () => {
  return localStorage.getItem("storeUserId");
};

export const setRiderMobileNo = (mobileNo: string) => {
  localStorage.setItem("mobileNo", mobileNo);
};

export const getRiderMobileNo = () => {
  return localStorage.getItem("mobileNo");
};
