import "./panel.css";
import type { FC, ReactNode } from "react";

type Props = {
  label: string;
  header: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};

// Shared card layout used by both the source and the translation side
export const Panel: FC<Props> = ({ label, header, children, footer }) => (
  <section className="panel" aria-label={label}>
    <div className="panel__header">{header}</div>
    <div className="panel__body">{children}</div>
    {footer && <div className="panel__footer">{footer}</div>}
  </section>
);
