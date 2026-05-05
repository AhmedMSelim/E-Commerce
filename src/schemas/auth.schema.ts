import * as zod from "zod";

export const myRegisterSchema = zod
  .object({
    name: zod
      .string("Name Must Be Text")
      .nonempty("*Please enter your name")
      .min(3, "Min Length Is 3 letters")
      .max(30, "Max Length Is 30 letters"),
    email: zod
      .email("*Invalid email address")
      .nonempty("*Please enter your email"),
    phone: zod
      .string()
      .nonempty("*Please enter your phone number")
      .regex(/^01[0125][0-9]{8}$/, "Invalid Phone Number"),
    password: zod
      .string()
      .nonempty("*Please enter your password")
      .regex(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
        `password must contain 1 number (0-9)
        password must contain 1 uppercase letters
        password must contain 1 lowercase letters
        password must contain 1 non-alpha numeric number
        password is 8-16 characters with no space`,
      ),
    rePassword: zod.string().nonempty("*Please confirm your password"),
  })
  .refine(
    (obj) => {
      return obj.password === obj.rePassword;
    },
    {
      error: "Password And Confirm Password Not Matched!",
      path: ["rePassword"],
    },
  );

export type RegisterSchemaType = zod.infer<typeof myRegisterSchema>;

export const myLoginSchema = zod.object({
  email: zod
    .email("*Invalid email address")
    .nonempty("*Please enter your email"),
  password: zod
    .string()
    .nonempty("*Please enter your password")
    .regex(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
      `Incorrect password`,
    ),
});

export type LoginSchemaType = zod.infer<typeof myLoginSchema>;
