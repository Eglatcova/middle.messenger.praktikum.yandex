import { UserData } from "../../../../services/Store/types";
import { BaseBlockProps } from "../../../../services/types";

export interface FormIncomingProps extends Omit<UserData, "avatar"> {}

export interface FormProps extends FormIncomingProps, BaseBlockProps {}
