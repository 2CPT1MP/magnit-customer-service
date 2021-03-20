import Header from "../components/header.component";
import LoginComponent from "../components/login.component";

const LoginPage = () => {
    return (
        <>
            <Header title={"Авторизация"} canLogOut={false}/>
            <LoginComponent />
        </>
    );
}

export default LoginPage;