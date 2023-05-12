import { nanoid } from "nanoid";

import { user } from "../widgets/stores/user";
import { useIP } from "./useIP";
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

      console.log("identify --->", payload);

      await identifyApi(payload);
      await user.set({ details: payload });
      localStorage.setItem("cl-pop-uid", uid);
      localStorage.setItem("cl-pop-details", JSON.stringify(payload));
    }
  };

  const trackEvent = async (eventType = "", widgetType = "") => {
    try {
      user.subscribe(handleTrackView);
      console.log("step 1");
      async function handleTrackView({ details }) {
        if (!details) {
          await identify();
          return;
        }
        console.log("step 2");

        const payload = {
          shopId: details.shopId,
          createdAt: new Date().toISOString(),
          id: details.id,
          eventType,
          widgetType,
        };
        await sendEventApi(payload);
        console.log("trackEvent---->", payload);
      }
    } catch (error) {
      console.log("error --->", error);
    }
  };

  const getLocation = async (ip) => {
    const res = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await res.json();
    return data;
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
