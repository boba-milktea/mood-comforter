/**
 *
 * @param {*string} [str="happy"] string to find the message in data
 * @returns {string} a random message from the message data
 */
import { data } from "../data";

export const getMessage = (str = "happy") => {
  return data.moodMessages[str][
    Math.floor(Math.random() * data.moodMessages[str].length)
  ];
};
