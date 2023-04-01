import localforage from "localforage";

export const setupLocalForage = () => {
  localforage.config({
    driver: [
      localforage.WEBSQL,
      localforage.INDEXEDDB,
      localforage.LOCALSTORAGE,
    ],
    name: "Bustion CMS",
  });
};
