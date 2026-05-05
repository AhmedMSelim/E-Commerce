import * as z from "zod";

export const checkoutSchema = z.object({
  details: z
    .string("Address details required")
    .nonempty("Address details must be at least 10 characters"),
  phone: z
    .string()
    .nonempty("Please enter a valid Egyptian phone number")
    .regex(/^01[0125][0-9]{8}$/, "Invalid phone number"),
  city: z.string().nonempty("City name must be at least 2 characters"),
});

export type checkoutSchemaType = z.infer<typeof checkoutSchema>;
