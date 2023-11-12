const getCurrentTime = () => {
  const currentDate: Date = new Date();

  const hours: number = currentDate.getHours();
  const minutes: number = currentDate.getMinutes();
  const seconds: number = currentDate.getSeconds();

  // Add leading zeros if needed
  const formattedHours: string = hours < 10 ? "0" + hours : String(hours);
  const formattedMinutes: string =
    minutes < 10 ? "0" + minutes : String(minutes);
  const formattedSeconds: string =
    seconds < 10 ? "0" + seconds : String(seconds);

  const currentTime: string = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  return currentTime;
};

export { getCurrentTime };
