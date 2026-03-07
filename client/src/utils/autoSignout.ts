function autoSignout() {
  const timeStamp = Date.now();
  const payload = localStorage.getItem('payload');

  if (!payload) return false;

  const parsedPayload = JSON.parse(payload);

  // If payload is expired remove it from loc store and return false
  if (parsedPayload.payload.exp <= Math.round(timeStamp / 1000)) {
    localStorage.removeItem('payload');
    localStorage.removeItem('token');
    return false;
  }

  return true;
}

export default autoSignout;
