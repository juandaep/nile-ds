import type { AlertVariant } from "./Alert";

export interface AlertProps {
  variant?: AlertVariant;
  /** Content of the alert */
  children?: React.ReactNode;
  dismissible?: boolean;
  /** Called when the close button is clicked */
  onClose?: () => void;
}