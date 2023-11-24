import { ID_AUTH, PASSWORD_AUTH } from './ID_PSWD_AUTH';

function Signed_In() {
    const authInfo = JSON.parse(
        sessionStorage.getItem('authInfo'));
    if (authInfo) {
        if (authInfo.id !== ID_AUTH ||
            authInfo.password !== PASSWORD_AUTH) {
            alert("관리자 로그인 후 이용할 수 있는 페이지입니다.");
            window.location.href = '/';
        }
    } else{
        alert("관리자 로그인 후 이용할 수 있는 페이지입니다.");
        window.location.href = '/';
    }
}
export default Signed_In;