import { UserData } from "../../api/AuthAPI";
import { BaseBlockProps } from "../../services/types";

export type ProfileConnectedProps = BaseBlockProps & UserData;
