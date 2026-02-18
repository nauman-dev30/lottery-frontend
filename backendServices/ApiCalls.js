import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}`;

// Validate that API_BASE_URL is properly configured
if (!API_BASE_URL || API_BASE_URL === "undefined") {
  console.error(
    "❌ API_BASE_URL is not configured. Please set NEXT_PUBLIC_BACKEND_BASE_URL in your environment variables."
  );
}

export function postRequest(url, params, callback, errorCallback) {
  if (!API_BASE_URL || API_BASE_URL === "undefined") {
    const error = new Error("API_BASE_URL is not configured");
    if (errorCallback) errorCallback(error);
    throw error;
  }

  axios
    .post(API_BASE_URL + "/api/v1/" + url, params)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (errorCallback) {
        errorCallback(error);
      }
    });
}

export function postRequestWithOutToken(url, params, callback, errorCallback) {
  if (!API_BASE_URL || API_BASE_URL === "undefined") {
    const error = new Error("API_BASE_URL is not configured");
    if (errorCallback) errorCallback(error);
    throw error;
  }

  return axios
    .post(API_BASE_URL + "/api/v1/" + url, params)
    .then((response) => {
      if (callback) {
        callback(response);
      }
      return response;
    })
    .catch((error) => {
      if (errorCallback) {
        errorCallback(error);
      }
      throw error;
    });
}

export function getRequest(url, callback, errorCallback) {
  if (!API_BASE_URL || API_BASE_URL === "undefined") {
    const error = new Error("API_BASE_URL is not configured");
    if (errorCallback) errorCallback(error);
    throw error;
  }

  axios
    .get(API_BASE_URL + "/api/v1/" + url)
    .then((response) => {
      if (callback) callback(response);
    })
    .catch((error) => {
      if (errorCallback) errorCallback(error);
    });
}

export function putRequest(url, params, callback, errorCallback) {
  if (!API_BASE_URL || API_BASE_URL === "undefined") {
    const error = new Error("API_BASE_URL is not configured");
    if (errorCallback) errorCallback(error);
    throw error;
  }

  axios
    .put(API_BASE_URL + "/api/v1/" + url, params)
    .then((response) => callback && callback(response))
    .catch((error) => errorCallback && errorCallback(error));
}

// Add this function to your ApiCalls.js file

export function putRequestWithFile(url, formData, callback, errorCallback) {
  if (!API_BASE_URL || API_BASE_URL === "undefined") {
    const error = new Error("API_BASE_URL is not configured");
    if (errorCallback) errorCallback(error);
    throw error;
  }

  console.log("📤 Uploading file to:", API_BASE_URL + "/api/v1/" + url);

  // Debug FormData
  console.log("📋 FormData entries:");
  for (let pair of formData.entries()) {
    console.log(`  ${pair[0]}:`, pair[1]);
  }

  axios
    .put(API_BASE_URL + "/api/v1/" + url, formData)
    .then((response) => {
      console.log("✅ File upload successful:", response.data);
      callback && callback(response);
    })
    .catch((error) => {
      console.error(
        "❌ File upload failed:",
        error.response?.data || error.message
      );
      errorCallback && errorCallback(error);
    });
}

export function deleteRequest(url, callback, errorCallback) {
  if (!API_BASE_URL || API_BASE_URL === "undefined") {
    const error = new Error("API_BASE_URL is not configured");
    if (errorCallback) errorCallback(error);
    throw error;
  }

  axios
    .delete(API_BASE_URL + "/api/v1/" + url)
    .then((response) => callback && callback(response))
    .catch((error) => errorCallback && errorCallback(error));
}

// Wallet Request API methods
export const walletRequestAPI = {
  // Create wallet update request
  createRequest: (data, onSuccess, onError) => {
    postRequest("wallet/request", data, onSuccess, onError);
  },

  // Get user's wallet requests
  getMyRequests: (walletAddress, onSuccess, onError) => {
    getRequest(
      `wallet/my-requests?walletAddress=${walletAddress}`,
      onSuccess,
      onError
    );
  },

  // Admin: Get all requests
  getAllRequests: (status = "", onSuccess, onError) => {
    const url = status
      ? `wallet/admin/all?status=${status}`
      : "wallet/admin/all";
    getRequest(url, onSuccess, onError);
  },

  // Admin: Approve/reject request
  updateRequestStatus: (requestId, data, onSuccess, onError) => {
    putRequest(`wallet/admin/${requestId}`, data, onSuccess, onError);
  },

  // Admin: Delete request
  deleteRequest: (requestId, onSuccess, onError) => {
    deleteRequest(`wallet/admin/${requestId}`, onSuccess, onError);
  },
};
