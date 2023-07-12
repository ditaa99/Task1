import { atom } from "recoil";
// still trying, not actually doing
const smth = atom({
    key: "unique", //this has to be a unique key, nos used anywhere else in the app
    default: "default value", //this is the default value of the atom
});