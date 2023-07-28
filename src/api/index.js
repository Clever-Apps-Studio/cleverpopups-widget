const contactsUrl = `apps/api/contacts`;
const eventsUrl = `apps/api/events`;

export const identifyApi = async (details) => {
  try {
    const res = await fetch(contactsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });
    const data = await res.json();

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const sendEventApi = async (details) => {
  try {
    const res = await fetch(eventsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });
    const data = await res.json();

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};
