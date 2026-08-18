import { MoldStatus } from "../types/molds.types";

export const MOLD_STATUS_VARIANT_MAP: Record<
  MoldStatus,
  "default" | "destructive" | "success" | "warning" | "info"
> = {
  delivered: "success",
  in_production: "info",
  reserved: "warning",
  sent: "default",
  cancelled: "destructive",
};

export const MOLD_STATUS_COLOR_MAP: Record<MoldStatus, string> = {
  in_production: "info",
  reserved: "warning",
  delivered: "success",
  sent: "primary",
  cancelled: "destructive",
};

export const MOLD_STATUS_LABEL_MAP: Record<MoldStatus, string> = {
  in_production: "En producción",
  reserved: "Reservado",
  delivered: "Entregado",
  sent: "Enviado",
  cancelled: "Cancelado",
};
