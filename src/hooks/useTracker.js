import { nanoid } from "nanoid";

import { user } from "../widgets/stores/user";
import { useIP } from "./useIP";
import { useTransformIpDetails } from "./useTransformIpDetails";
const { fetchIP } = useIP();

import { identifyApi, sendEventApi } from "../api";

export const useTracker = (shopKey = "") => {
  const identify = async () => {
    let uid;
    const existingUid = localStorage.getItem("cl-pop-uid");
    const existingDetails = localStorage.getItem("cl-pop-details");

    if (existingUid) {
      uid = existingUid;
      user.set({ details: JSON.parse(existingDetails) });
    } else {
      uid = nanoid();
      const ip = await fetchIP();
      const details = await getLocation(ip);
      const os = getVisitorOs();
      delete details.status;
      const payload = {
        ...details,
        os,
        ip,
        id: uid,
        shopId: shopKey,
      };

      const res = await identifyApi(payload);
      if (res.success) {
        user.set({ details: payload });
        localStorage.setItem("cl-pop-uid", uid);
        localStorage.setItem("cl-pop-details", JSON.stringify(payload));
      }
    }
  };

  const trackEvent = async (eventType = "", widgetType = "") => {
    try {
      user.subscribe(handleTrackView);
      async function handleTrackView({ details }) {
        if (!details) {
          await identify();
          return;
        }

        const payload = {
          shopId: details.shopId,
          id: details.id,
          eventType,
          widgetType,
        };
        const res = await sendEventApi(payload);
      }
    } catch (error) {
      console.log("trackEvent-error --->", error);
    }
  };

  const getLocation = async (ip) => {
    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await res.json();
    const details = useTransformIpDetails(data);
    return details;
  };

  const getVisitorOs = () => {
    let name = "unknown";
    if (navigator.userAgent.indexOf("Win") != -1) name = "Windows OS";
    if (navigator.userAgent.indexOf("Mac") != -1) name = "Macintosh";
    if (navigator.userAgent.indexOf("Linux") != -1) name = "Linux OS";
    if (navigator.userAgent.indexOf("Android") != -1) name = "Android OS";
    if (navigator.userAgent.indexOf("like Mac") != -1) name = "iOS";

    return name;
  };

  return {
    identify,
    trackEvent,
  };
};
