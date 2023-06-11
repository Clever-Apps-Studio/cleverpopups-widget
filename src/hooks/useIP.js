export const useIP = () => {
  // const fetchIP = async () => {
  //   const res = await fetch("https://www.cloudflare.com/cdn-cgi/trace");
  //   const data = await res.text();

  //   let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;
  //   let ip = data.match(ipRegex)[0];

  //   return ip;
  // };

  const fetchIP = async () => {
    const res = await fetch("https://api.ipify.org/?format=json");
    const data = await res.json();

    return data.ip;
  };

  return {
    fetchIP,
  };
};
