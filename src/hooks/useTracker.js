import { user } from "../widgets/stores/user";
import { useIP } from "./useIP";
const { fetchIP } = useIP();

import { addVisitorApi, addVisitApi, addViewApi, addClickApi } from "../api";

export const useTracker = () => {
  const trackVisit = async () => {
    const ip = await fetchIP();
    const details = await getLocation(ip);
    const os = getVisitorOs();
    user.set({ visitorIP: ip, ipDetails: details, os: os });
  };

  const trackView = () => {
    user.subscribe(handleTrackView);
    console.log("step 1");
    function handleTrackView({ visitorIP, ipDetails, os }) {
      if (!visitorIP) return;
      console.log("step 2");
      const payload = {
        ip: visitorIP,
        details: ipDetails,
        os: os,
      };

      console.log("detailss---->>>", payload);
    }
  };

  const trackClick = () => {};

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
    trackVisit,
    trackView,
    trackClick,
  };
};
