import { z } from "zod";

export const formSchema = z.object({
    name : z.string().min(3, "Name Required"),
    email : z.string().email("Invalid Email"),
    contact : z.string().nonempty().regex(/^[6-9]\d{9}$/, "Enter a valid mobile number"),
    whatsapp : z.string().nonempty().regex(/^[6-9]\d{9}$/, "Enter a valid mobile number"),
    college : z.string().optional()
});
