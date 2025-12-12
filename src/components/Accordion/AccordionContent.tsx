import { HugeiconsIcon } from "@hugeicons/react";
import Button from "../Button/Button";
import "./accordion.css";
import { BankIcon } from "@hugeicons/core-free-icons";

export const AccordionContent = () => {
  return (
    <div className="content-dummy-wrapper">
      <p>Component Placeholder</p>
      <Button
        leadIcon={<HugeiconsIcon icon={BankIcon} />}
        trailIcon={<HugeiconsIcon icon={BankIcon} />}>
          Button
        </Button>
    </div>
  );
};
