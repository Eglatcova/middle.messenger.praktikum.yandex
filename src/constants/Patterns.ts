export enum Patterns {
  LOGIN = "(?=.*[^0-9].*)[A-Za-z0-9_\\-]{3,20}",
  EMAIL = "[A-Za-z0-9_.+\\-]+@[A-Za-z0-9\\-]+.[A-Za-z0-9\\-.]+",
  PASSWORD = "(?=.*[A-Z])(?=.*[0-9]).{8,40}",
  NAME = "[A-ZА-ЯЁ][a-zA-Zа-яёА-ЯЁ\\-]*",
  PHONE = "(\\+?7|8)?\\d{10,15}",
}
