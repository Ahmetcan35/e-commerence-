import "../css/LoginPage.css"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useFormik } from 'formik';
import { registerSchema } from "../schemas/RegisterPageSchema";
import { UserType } from '../types/Types';
import loginPageService from "../services/LoginPageService";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { setCurrentUser, setLoading } from "../redux/appSlice";
import { useNavigate } from "react-router-dom";

interface CheckUserType {
    result: boolean,
    currentUser: UserType | null
}
function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const checkUser = (userList: UserType[], username: string, password: string): CheckUserType => {
        const response: CheckUserType = { result: false, currentUser: null }

        userList.forEach((user: UserType) => {
            if (user.username === username && user.password === password) {
                response.result = true;
                response.currentUser = user;
            }
        })

        return response;
    }
    const submit = async () => {
        try {
            dispatch(setLoading(true));
            const response: UserType[] = await loginPageService.login();
            if (response) {
                const checkUserResponse: CheckUserType = checkUser(response, values.username, values.password);
                if (checkUserResponse.result && checkUserResponse.currentUser) {
                    //Kullanıcı adı ve şifre doğru
                    dispatch(setCurrentUser(checkUserResponse.currentUser));
                    localStorage.setItem("currentUser", JSON.stringify(checkUserResponse.currentUser));
                    navigate("/");
                } else {
                    //Yanlış baba
                    toast.error("Kullanıcı adı veya şifre hatalı")
                }
            }
        } catch (error) {
            toast.error("Giriş yapılırken haya oluştu:" + error);
        } finally {
            dispatch(setLoading(false));
        }
    }

    const { values, handleChange, errors, resetForm, handleSubmit } = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: submit,
        validationSchema: registerSchema
    });
    const clear = () => {
        resetForm();
    }
    return (
        <div className='login'>

            <div className="main">
                <form onSubmit={handleSubmit}>
                    <div className='form-div'>
                        <TextField
                            sx={{ width: '300px', marginBottom: '25px' }}
                            id="username"
                            placeholder='Kullanıcı adı'
                            value={values.username}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleIcon />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                            helperText={errors.username && errors.username}

                        />

                        <TextField
                            sx={{ width: '300px', marginBottom: '25px' }}
                            id="password"
                            type='password'
                            value={values.password}
                            onChange={handleChange}
                            placeholder='Şifre'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                            helperText={errors.password && errors.password}
                        />

                        <div>
                            <Button type='submit' size='small' sx={{ textTransform: 'none', height: '28px', marginRight: '10px' }} variant='contained' color='info' >Giriş Yap</Button>
                            <Button onClick={clear} size='small' sx={{ textTransform: 'none', height: '28px', backgroundColor: '#CDA735' }} variant='contained'  >Temizle</Button>
                        </div>
                    </div>
                </form>


            </div>
        </div>
    )
}

export default LoginPage