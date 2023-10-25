import * as yup from "yup";

export const schemaLogin = yup.object().shape({
    username: yup.string().required("This input is required"),
    password: yup.string().required("This input is required"),
})

export const schemaRegister = yup.object().shape({
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
        .required('Please enter your password')
        // .matches(
        //     /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/,
        //     "Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        // )
        ,
    repeatPassword: yup
        .string()
        .required('Please re-enter your password')
        .oneOf([yup.ref('password')], 'Passwords must match')
})