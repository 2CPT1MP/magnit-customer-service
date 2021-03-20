import {useHttp} from "../hooks/http.hook";
import {useContext, useState} from 'react';
import AuthContext from '../contexts/auth.context';

const LoginComponent = () => {
    const { request } = useHttp();
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const Auth = useContext(AuthContext);

    const onChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

    const onLogin = async(event) => {
        event.preventDefault();
        try {
            const data = await request('/auth/login', 'POST', {...form});
            Auth.login(data.jwtToken, data.userId);
        } catch (e) {

        }
    }

    return (
        <div className>
            <form className={"form login-form"} onSubmit={onLogin}>
                <div className={"form-group"}>
                    <label htmlFor="username"><i className="bi bi-person" /> Логин</label>
                    <input type="text"
                           name="username"
                           id={"username"}
                           className={"form-control mt-1"}
                           onChange={onChange}
                           value={form.username}
                           required
                           placeholder={"Введите имя пользователя"}
                    />
                </div>
                <div className={"form-group"}>
                    <label htmlFor="password" className={"mt-2"}><i className="bi bi-key"/> Пароль</label>
                    <input type="password"
                           name={"password"}
                           id={"password"}
                           className={"form-control mt-1"}
                           onChange={onChange}
                           value={form.password}
                           required
                           placeholder={"Введите пароль"}
                    />
                </div>
                <button type={"submit"} className={"btn btn-primary form-control mt-4"}><i
                    className="bi bi-box-arrow-in-right"/> Войти</button>
            </form>
        </div>
    );
}

export default LoginComponent;