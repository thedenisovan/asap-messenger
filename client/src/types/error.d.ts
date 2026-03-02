export default interface ValidationResult {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}
