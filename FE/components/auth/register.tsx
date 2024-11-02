"use client";

import { RegisterSchema } from "@/helpers/schemas";
import { RegisterFormType } from "@/helpers/types";
import { useRegisterMutation } from "@/store/queries/auth";
import { Button, Input } from "@nextui-org/react";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const Register = () => {
	const router = useRouter();
	const [register] = useRegisterMutation();

	const initialValues: RegisterFormType = {
		sid: "",
		email: "",
		password: "",
		confirmPassword: "",
	};

	const handleRegister = useCallback(
		async (values: RegisterFormType) => {
			// `values` contains name, email & password. You can use provider to register user
			console.log(values);
			// await createAuthCookie();
			// router.replace("/login");
			const data = await register(values).unwrap();
			console.log(data);
		},
		[register]
	);

	return (
		<>
			<div className="text-center text-[25px] font-bold mb-6">Register</div>

			<Formik initialValues={initialValues} validationSchema={RegisterSchema} onSubmit={handleRegister}>
				{({ values, errors, touched, handleChange, handleSubmit }) => (
					<>
						<div className="flex flex-col w-1/2 gap-4 mb-4">
							<Input
								variant="bordered"
								label="Username"
								value={values.sid}
								isInvalid={!!errors.sid && !!touched.sid}
								errorMessage={errors.sid}
								onChange={handleChange("sid")}
							/>
							<Input
								variant="bordered"
								label="Email"
								type="email"
								value={values.email}
								isInvalid={!!errors.email && !!touched.email}
								errorMessage={errors.email}
								onChange={handleChange("email")}
							/>
							<Input
								variant="bordered"
								label="Password"
								type="password"
								value={values.password}
								isInvalid={!!errors.password && !!touched.password}
								errorMessage={errors.password}
								onChange={handleChange("password")}
							/>
							<Input
								variant="bordered"
								label="Confirm password"
								type="password"
								value={values.confirmPassword}
								isInvalid={!!errors.confirmPassword && !!touched.confirmPassword}
								errorMessage={errors.confirmPassword}
								onChange={handleChange("confirmPassword")}
							/>
						</div>

						<Button onPress={() => handleSubmit()} type="submit" variant="flat" color="primary">
							Register
						</Button>
					</>
				)}
			</Formik>

			<div className="font-light text-slate-400 mt-4 text-sm">
				Already have an account ?{" "}
				<Link href="/login" className="font-bold">
					Login here
				</Link>
			</div>
		</>
	);
};
