export default function signOut() {
  localStorage.removeItem('payload');
  localStorage.removeItem('token');
  localStorage.removeItem('uid');
}
