import { FullMold } from "../types/molds.types";
import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  MOLD_STATUS_COLOR_MAP,
  MOLD_STATUS_LABEL_MAP,
  MOLD_STATUS_VARIANT_MAP,
} from "../helpers/utils";
import { formatMXN } from "@/shared/lib/currency";

export function MoldCard({
  mold: {
    deliveryDate,
    design,
    shape,
    status,
    amountPaid,
    totalPrice,
    customer,
  },
}: {
  mold: FullMold;
}) {
  const remainingAmount = +totalPrice - +amountPaid;
  const priceLabel =
    remainingAmount > 0
      ? `faltan ${formatMXN(remainingAmount)}`
      : `pagado ${formatMXN(+amountPaid)}`;

  return (
    <Card className={`border-l-4 border-${MOLD_STATUS_COLOR_MAP[status]}`}>
      <CardHeader className="flex flex-row gap- justify-between">
        <div>
          <CardTitle>
            {customer.name} {customer.lastName}
          </CardTitle>
          <CardDescription>
            {design} - {shape}
          </CardDescription>
        </div>
        <Badge variant="outline">
          {format(deliveryDate, "eee d MMM", {
            locale: es,
          })}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-row justify-between gap-4 flex-1 items-end">
        <Badge variant={MOLD_STATUS_VARIANT_MAP[status]}>
          {MOLD_STATUS_LABEL_MAP[status]}
        </Badge>
        <span
          className={cn("font-bold text-xs", {
            "text-primary": remainingAmount > 0,
            "text-success": remainingAmount === 0,
          })}
        >
          {priceLabel}
        </span>
      </CardContent>
    </Card>
  );
}
