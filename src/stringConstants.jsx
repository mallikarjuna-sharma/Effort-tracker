const stringConstants = {
  ADDCONSTANTFIELDS: [
    {
      id: "Name",
      label: "Name",
      type: "string",
    },
    {
      id: "Phone",
      label: "Phone",
      type: "number",
    },
    {
      id: "Gmail",
      label: "Gmail",
      type: "email",
    },
    {
      id: "Company Name",
      label: "Company Name",
      type: "string",
    },
    {
      id: "ADDRESS",
      label: "ADDRESS",
      type: "string",
    },
  ],

  REGISTERFIELDS: [
    {
      id: "Gmail",
      label: "TCS_ID",
      type: "email",
    },
    {
      id: "Name",
      label: "Name",
      type: "string",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
    },
    {
      id: "confirmpassword",
      label: "Confirm Password",
      type: "password",
    },
    {
      id: "application",
      label: "Application Name",
      type: "string",
    },
  ],

  LOGINFIELDS: [
    {
      id: "TcsId",
      label: "TCS_ID",
      type: "string",
    },
    {
      id: "Password",
      label: "Password",
      type: "password",
    },
  ],

  EDIT_POPUP: [
    {
      id: "effort",
      label: "Effort",
      type: "number",
    },
    {
      id: "description",
      label: "Description",
      type: "string",
    },
    {
      id: "assyst",
      label: "Assyst",
      type: "string",
    },
  ],

  SERVICE_ELEMENT: [
    {
      id: "Change Management",
      label: "Change Management",
    },
    {
      id: "Problem Management",
      label: "Problem Management",
    },
    {
      id: "Incident Management",
      label: "Incident Management",
    },
    {
      id: "Internal Activity",
      label: "Internal Activity",
    },
    {
      id: "Lower Region Support",
      label: "Lower Region Support",
    },
    {
      id: "Meetings",
      label: "Meetings",
    },
    {
      id: "House keeping",
      label: "House Keeping",
    },
    {
      id: "Healthcheck and Monitoring",
      label: "Healthcheck and Monitoring",
    },
    {
      id: "Performance Tuning",
      label: "Performance Tuning",
    },
    {
      id: "Vulnerability Management",
      label: "Vulnerability Management",
    },
    {
      id: "Software Maintainance",
      label: "Software Maintainance",
    },
    {
      id: "Capacity Management",
      label: "Capacity Management",
    },
    {
      id: "Audit and compliance",
      label: "Audit and compliance",
    },
  ],
  ACTIVITYTYPE: [
    {
      id: "core",
      label: "Core",
    },
    {
      id: "noncore",
      label: "Non Core",
    },
  ],

  DEV_SERVICE_URL: "http://localhost:5000/",
};

export default stringConstants;
