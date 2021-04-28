export const configApp = {
  env: process.env.REACT_APP_ENVIRONMENT,
  baseUrl: process.env.REACT_APP_BASE_URL,
  websiteUrl: process.env.REACT_APP_WEBSITE_URL,
}

export const toastDefaults = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}
