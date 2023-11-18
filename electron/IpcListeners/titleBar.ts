import { app, ipcMain } from "electron";
import path from "node:path";
const { spawn } = require("child_process");

const titleBarListener = (ipcMain: any) => {
  ipcMain.on(
    "initialize-engine",
    function (event: any, projectDirectory: string) {
      try {
        console.log(
          "Received initialize-engine message with project directory:",
          projectDirectory
        );
        const appPath = app.getAppPath();
        const enginePath = path.join(
          appPath,
          "..",
          "..",
          "Engine",
          "GameC++",
          "build",
          "main.exe"
        );

        const args = [projectDirectory];

        // Modify spawn options to capture stdout and stderr
        const engineProcess = spawn(enginePath, args, {
          detached: true,
          stdio: ["ignore", "pipe", "pipe"], // stdin, stdout, stderr
        });

        // Listen for data events on stdout and stderr
        engineProcess.stdout.on("data", (data: string) => {
          console.log(`Engine stdout: ${data}`);
          event.sender.send("engine-stdout", data);
          // You can send this data to the renderer process if needed
        });

        engineProcess.stderr.on("data", (data: string) => {
          console.error(`Engine stderr: ${data}`);
          event.sender.send("engine-stderr", data);
          // You can send this data to the renderer process if needed
        });

        // Handle process exit
        engineProcess.on("exit", (code: string) => {
          console.log(`Engine process exited with code ${code}`);
          event.sender.send("engine-exit", code);
        });

        // Make sure to unref both stdout and stderr to allow the app to exit
        engineProcess.stdout.unref();
        engineProcess.stderr.unref();

        event.sender.send("engine-initialized");
      } catch (err) {
        console.error(err);
        event.sender.send("error", `Error initializing engine: ${err}`);
      }
    }
  );
};
export default titleBarListener;
