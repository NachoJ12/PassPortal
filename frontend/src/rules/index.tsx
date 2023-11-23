import * as yup from "yup";

export const schemaLogin = yup.object().shape({
    email: yup.string().required("This input is required"),
    password: yup.string().required("This input is required"),
})

export const schemaRegister = yup.object().shape({
    name: yup
        .string()
        .required("Please enter aname"),
    lastName: yup
        .string()
        .required("Please enter a last name"),
    username: yup
        .string()
        .required("Please enter an username")
        .min(5, "At least should be five characters short"),
    email: yup
        .string()
        .required("Please enter an email")
        .matches(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            , "Please enter a valid email"),
    password: yup
        .string()
        .required('Please enter a password')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number'
        ),
    repeatPassword: yup
        .string()
        .required('Please re-enter your password')
        .oneOf([yup.ref('password')], 'Passwords must match')
})