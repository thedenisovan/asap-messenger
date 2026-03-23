export default function lastOnline(lastOnline: string) {
  if (!lastOnline) return 'Last online recently';

  const now = Date();
  const lastOnlineDate = new Date(lastOnline).toString();

  const nowArr = now.split(' ');
  const lastOnlineArr = lastOnlineDate.split(' ');

  // If online
  if (new Date().getTime() - new Date(lastOnline).getTime() < 180000) {
    return 'online';
    // If last online today
  } else if (
    nowArr[1] === lastOnlineArr[1] &&
    nowArr[2] === lastOnlineArr[2] &&
    nowArr[3] === lastOnlineArr[3]
  ) {
    return (
      'Last online ' +
      lastOnlineArr[4].split(':')[0] +
      ':' +
      lastOnlineArr[4].split(':')[1]
    );
    // If last online not today but this year
  } else if (
    (nowArr[1] !== lastOnlineArr[1] || nowArr[2] !== lastOnlineArr[2]) &&
    nowArr[3] === lastOnlineArr[3]
  ) {
    return 'Last online ' + lastOnlineArr[1] + ' ' + lastOnlineArr[2];
    // If last online more than year ago
  } else if (nowArr[3] > lastOnlineArr[3])
    return 'Last online more than year ago';
}
