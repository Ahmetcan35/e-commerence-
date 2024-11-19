import "../css/RegisterPage.css"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useFormik } from 'formik';
import { registerSchema } from "../schemas/RegisterPageSchema";
import { useNavigate } from "react-router-dom";
import { UserType } from '../types/Types';
import registerPageService from "../services/RegisterPageService";
import { toast } from 'react-toastify';

function RegisterPage() {

    const navigate = useNavigate();

    const submit = async (values: any, actions: any) => {
        try {
            const payload: UserType = {
                id: String(Math.floor(Math.random() * 99999)),
                username: values.username,
                password: values.password,
                balance: 1000
            }
            const response = await registerPageService.register(payload)
            if (response) {
                clear();
                toast.success("Kullanıcı kaydedildi");
                navigate("/login");
            }
        } catch (error) {
            toast.error("Kullanıcı kaydedilirken hata oluştu");
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
        <div className='register'>

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
                            <Button type='submit' size='small' sx={{ textTransform: 'none', height: '28px', marginRight: '10px' }} variant='contained' color='info' >Kaydol</Button>
                            <Button onClick={clear} size='small' sx={{ textTransform: 'none', height: '28px', backgroundColor: '#CDA735' }} variant='contained'  >Temizle</Button>
                        </div>
                    </div>
                </form>


            </div>
        </div>
    )
}

export default RegisterPage