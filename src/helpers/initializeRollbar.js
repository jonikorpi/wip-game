const env = (process && process.env && process.env.NODE_ENV) || "development";

export default () => {
  if (typeof window !== "undefined" && !window.rollbar) {
    window.rollbar = require("rollbar");
    window.Rollbar = new window.rollbar({
      accessToken: "TODO",
      captureUncaught: true,
      captureUnhandledRejections: true,
      payload: {
        environment: env,
      },
    });
  }
};
