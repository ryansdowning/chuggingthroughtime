export const getSecondsSinceMidnight = (): number => {
  const now = new Date();
  return (
    now.getUTCHours() * 3600 + now.getUTCMinutes() * 60 + now.getUTCSeconds()
  );
};
