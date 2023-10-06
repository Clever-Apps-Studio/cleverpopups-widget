import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);
// Create formatter (English).
const timeAgo = new TimeAgo("en-US");

export const promisify = (data, time = 2000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
};

export function formatTimeAgo(date) {
  if (!date) return "";
  return timeAgo.format(date);
}

export function addDummySettings() {
  window.cleverpopups_current_widget = "orders";
  window.cleverpopups_widget_settings = {
    _id: "6454b54ecf6fb75ccfa21b75",
    shopId: "gid://shopify/Shop/75086659906",
    shopName: "TestStore1-cleverapps",
    myshopifyDomain: "teststore1-cleverapps.myshopify.com",
    primaryDomain: {
      id: "gid://shopify/Domain/112394305858",
      url: "https://teststore1-cleverapps.myshopify.com",
      sslEnabled: true,
    },
    orders: {
      title: "{{first_name}} in {{city}}, {{country}}",
      body: "purchased {{product_title}}",
      hideTimeAfter: 48,
      anonymousActive: true,
      anonymousFallback: "some person",
      backgroundColor: "#4a90e2",
      textColor: "#ffffff",
      iconColor: "#ec0e29",
      borderRadius: 16,
      borderColor: "#9013fe",
      borderWidth: 10,
      template: {
        isActive: false,
        isDarkMode: false,
        template: "christmas",
      },
      exclusion: [],
      isActive: true,
      layout: "horizontal",
      position: "bl",
      _id: "645abd287600d3983f8a5223",
    },
    orderSummary: {
      title: "{{first_name}} in {{city}}, {{province}} {{country}}",
      body: "purchased {{product_title}}",
      hideTimeAfter: 48,
      anonymousActive: true,
      anonymousFallback: "Someone",
      backgroundColor: "#ffffff",
      textColor: "#252525",
      iconColor: "#008060",
      borderRadius: 4,
      borderColor: "#ccc",
      borderWidth: 1,
      template: null,
      exclusion: [],
      isActive: false,
      layout: "pill",
      position: "br",
      _id: "6454b54ecf6fb75ccfa21b72",
    },
    addToCart: {
      title: "{{first_name}} in {{city}}, {{province}} {{country}}",
      body: "purchased {{product_title}}",
      hideTimeAfter: 48,
      anonymousActive: true,
      anonymousFallback: "Someone",
      backgroundColor: "#ffffff",
      textColor: "#252525",
      iconColor: "#008060",
      borderRadius: 4,
      borderColor: "#ccc",
      borderWidth: 1,
      template: null,
      exclusion: [],
      isActive: false,
      layout: "pill",
      position: "br",
      _id: "6454b54ecf6fb75ccfa21b73",
    },
    cartSummary: {
      title: "{{first_name}} in {{city}}, {{province}} {{country}}",
      body: "purchased {{product_title}}",
      hideTimeAfter: 48,
      anonymousActive: true,
      anonymousFallback: "Someone",
      backgroundColor: "#ffffff",
      textColor: "#252525",
      iconColor: "#008060",
      borderRadius: 4,
      borderColor: "#ccc",
      borderWidth: 1,
      template: null,
      exclusion: [],
      isActive: false,
      layout: "pill",
      position: "br",
      _id: "6454b54ecf6fb75ccfa21b74",
    },
    createdAt: "2023-05-05T07:50:38.086Z",
    updatedAt: "2023-06-25T12:30:13.112Z",
    __v: 0,
    appPlan: {
      name: "starter",
      test: true,
    },
  };
}
