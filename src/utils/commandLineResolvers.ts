import { ProjectState } from "./types";

export const commandLineResolvers = (command: string) => {
  switch (command) {
    default:
      return `"${command}" is not a valid command.`;
  }
};
